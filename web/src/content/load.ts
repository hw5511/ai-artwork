import type { Part, Session, Site, Slide } from './schema'

type NativeSession = Omit<Session, 'parts'> & { parts: string[] }
const sessions = import.meta.glob<NativeSession>('./sessions/artwork/step*.json', { eager: true, import: 'default' })
const parts = import.meta.glob<Part>('./parts/*.json', { eager: true, import: 'default' })
export function loadSite(): Site {
  return {
    title: 'AI 아트웍',
    courses: [{ id: 'artwork', label: 'AI 아트웍', title: 'AI 아트웍 · 8회차', sessions: Object.values(sessions)
      .sort((a, b) => a.step - b.step)
      .map(s => ({ ...s, parts: s.parts.map(id => {
        const part = parts[`./parts/${id}.json`]
        if (!part) throw new Error(`Missing part: ${id}`)
        return part
      }) })) }],
  }
}

// Covers and their slide counts derive from the same part data as the sidebar.
export const flatSlides = (s: Session) => {
  const covered = s.parts.filter(p => p.cover !== false)
  const toc = covered.map(p => ({ title: p.title, count: p.slides.length }))
  return s.parts.flatMap(p => {
    const items = p.slides.map(slide => ({ part: p, slide }))
    if (s.parts.length < 2 || p.cover === false) return items
    const pi = covered.indexOf(p)
    const cover: Slide = { id: `${p.id}-cover`, template: 'part-cover', title: p.title,
      partIndex: pi, parts: toc, slideTitles: p.slides.map(x => x.title), sections: p.sections,
      art: p.coverArt, notes: p.summary ? [{ n: pi + 1, head: p.title, body: p.summary }] : undefined }
    return [{ part: p, slide: cover }, ...items]
  })
}
