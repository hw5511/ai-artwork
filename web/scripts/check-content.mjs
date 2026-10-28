// Native content gate, adapted from ai-agent-class's check-content.mjs.
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const partsDir = join(root, 'src/content/parts')
const sessionsDir = join(root, 'src/content/sessions/artwork')
let errors = 0
const err = (where, msg) => { errors++; console.log(`  ${where}: ${msg}`) }
const read = p => JSON.parse(readFileSync(p, 'utf8'))
const hash = s => createHash('sha256').update(s).digest('hex')
const templates = new Set(['screen', 'compare', 'table', 'illustration'])
const kinds = new Set(['copy', 'link', 'download'])
// Canonical media live in the repository; build stages identical copies into public/.
function localAsset(src) {
  if (!src?.startsWith('/') || src.startsWith('//') || src.includes('..')) return false
  const base = src.startsWith('/lectures/images/') || src.startsWith('/downloads/') ? join(root, '..') : join(root, 'public')
  let at = base
  for (const segment of src.slice(1).split('/')) {
    // Windows preview is case-insensitive; GitHub Pages/Linux is not.
    if (!existsSync(at) || !readdirSync(at).includes(segment)) return false
    at = join(at, segment)
  }
  return existsSync(at)
}
function keyword(where, text) {
  if (!text?.trim()) return err(where, 'missing keyword title')
  if (/(다|니다|[^필]요)[.!]?$|[.。]$/.test(text.trim())) err(where, `sentence title: ${text}`)
  if (/[—–]/.test(text)) err(where, 'dash chain')
}
function checkScreen(where, screen, badges) {
  if (!screen || !['shot', 'video'].includes(screen.kind)) return err(where, `unsupported screen ${screen?.kind}`)
  if (!localAsset(screen.src)) err(where, `missing media ${screen.src}`)
  if (screen.poster && !localAsset(screen.poster)) err(where, `missing poster ${screen.poster}`)
  for (const b of screen.badges ?? []) {
    if (![b.x, b.y].every(v => Number.isFinite(v) && v >= 0 && v <= 100)) err(where, 'badge coordinates outside image')
    badges.push(b.n)
  }
}
const parts = new Map()
const slideIds = new Set()
for (const f of readdirSync(partsDir).filter(f => f.endsWith('.json'))) {
  let part
  try { part = read(join(partsDir, f)) } catch (e) { err(f, e.message); continue }
  if (f !== `${part.id}.json`) err(f, 'part id differs from filename')
  keyword(f, part.title)
  if (/^(정리|마무리)/.test(part.title)) err(f, 'wrap-up part')
  if (!part.slides?.length) err(f, 'empty part')
  if (part.coverArt && !localAsset(part.coverArt)) err(f, `missing cover art ${part.coverArt}`)
  parts.set(part.id, part)
  for (const s of part.slides ?? []) {
    const w = `${f}#${s.id}`
    if (!s.id || slideIds.has(s.id)) err(w, 'missing/duplicate slide id')
    slideIds.add(s.id)
    keyword(w, s.title)
    if (!templates.has(s.template)) err(w, `unsupported template ${s.template}`)
    const badges = []
    if (s.template === 'screen') checkScreen(w, s.screen, badges)
    if (s.template === 'compare') {
      for (const k of ['left', 'right']) { keyword(w, s[k]?.label); checkScreen(w, s[k]?.screen, badges) }
      if (s.notes?.length && !s.notes.some(n => n.n === 1)) err(w, 'compare label badge 1 without note')
      if (s.notes?.length && !s.notes.some(n => n.n === 2)) err(w, 'compare label badge 2 without note')
    }
    if (s.template === 'illustration' && !localAsset(s.illustration)) err(w, `missing illustration ${s.illustration}`)
    if (s.template === 'table') {
      if (!s.columns?.length || !s.rows?.length) err(w, 'table needs columns and rows')
      for (const r of s.rows ?? []) {
        if (r.cells?.length !== s.columns.length) err(w, 'table row width')
        for (const c of r.cells ?? []) {
          if (c.length > 40) err(w, `long table cell ${c}`)
          keyword(w, c)
        }
      }
    }
    const notes = s.notes ?? []
    if (notes.length > 4) err(w, 'more than four notes')
    const nums = new Set()
    for (const n of notes) {
      keyword(w, n.head)
      if (nums.has(n.n)) err(w, `duplicate note number ${n.n}`)
      nums.add(n.n)
      if (/[—–]/.test(n.body ?? '')) err(w, 'note body dash')
    }
    for (const b of badges) if (!nums.has(b)) err(w, `badge ${b} without note`)
    if (s.action && (!s.action.label || !s.action.items?.length)) err(w, 'action needs label and items')
    for (const it of s.action?.items ?? []) {
      if (!kinds.has(it.kind)) err(w, `unsupported action ${it.kind}`)
      if (it.kind === 'copy') {
        if (!it.value || /^(Enter|Esc|Space|Tab|Shift\s*\+|Ctrl\s*\+|Cmd\s*\+|[↑↓←→])$/i.test(it.value.trim())) err(w, 'empty copy or bare keypress')
      } else {
        if (!it.text || !it.href) err(w, 'link needs text and href')
        if (!/^(https?:|mailto:)/.test(it.href ?? '') && !localAsset(it.href)) err(w, `missing/relative action target ${it.href}`)
      }
    }
  }
  console.log(`${f}: ${part.slides?.length ?? 0} slides`)
}
const used = new Set()
if (readdirSync(sessionsDir).filter(f => f.endsWith('.json')).length !== 8) err('sessions', 'expected exactly eight sessions')
for (let step = 1; step <= 8; step++) {
  const sf = `step${String(step).padStart(2, '0')}.json`
  const file = join(sessionsDir, sf)
  if (!existsSync(file)) { err(sf, 'missing session'); continue }
  const s = read(file)
  if (s.step !== step || !s.title || !Array.isArray(s.parts)) err(sf, 'invalid session metadata')
  if (step <= 4 && !s.parts.length) err(sf, 'teaching session needs real slides')
  if (step >= 5 && s.parts.length) err(sf, 'sessions 5-8 must remain pending')
  for (const id of s.parts) {
    if (!parts.has(id)) err(sf, `missing part ${id}`)
    if (used.has(id)) err(sf, `part reused ${id}`)
    used.add(id)
  }
}
for (const id of parts.keys()) if (!used.has(id)) err(id, 'orphan part')
// Freeze the rehearsed copy text and links from the migration. JSON is the editable source of truth;
// this inventory is a preservation assertion, not a second rendering input.
for (const entry of read(join(root, 'scripts/migration-manifest.json'))) {
  const p = parts.get(entry.part)
  if (!p) { err(entry.source, 'missing migrated part'); continue }
  const items = p.slides.flatMap(s => s.action?.items ?? [])
  const copies = new Set(items.filter(it => it.kind === 'copy').map(it => hash(it.value)))
  const hrefs = new Set(items.map(it => it.href))
  for (const h of entry.copyHashes) if (!copies.has(h)) err(entry.part, `rehearsed copy text missing/changed: ${h.slice(0, 12)}`)
  for (const href of entry.hrefs) if (!hrefs.has(href)) err(entry.part, `original link missing ${href}`)
}
console.log(`content check: ${errors} error(s) in ${parts.size} part(s), ${slideIds.size} content slides`)
process.exit(errors ? 1 : 0)
