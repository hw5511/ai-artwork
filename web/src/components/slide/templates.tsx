// Slide templates. The slide area shows visuals only (CEO 2026-09-21): screens, tables, diagrams,
// illustrations and a keyword title. Explanations live in slide.notes and render in the right panel
// (NotesPanel), numbered to match the badges drawn on the visual. Everything is flex; no coordinates.
import type { CompareSlide, IllustrationSlide, PartCoverSlide, ScreenSlide, Slide, TableSlide } from "@/content/schema"
import { NumberBadge } from "./NumberBadge"
import { ScreenView } from "./ScreenView"
import { asset, cn } from "@/lib/utils"
import type { ReactNode } from "react"

export function SlideBody({ slide }: { slide: Slide }) {
  switch (slide.template) {
    case "screen":
      return <ScreenT s={slide} />
    case "compare":
      return <CompareT s={slide} />
    case "table":
      return <TableT s={slide} />
    case "illustration":
      return <IllustrationT s={slide} />
    case "part-cover":
      return <PartCoverT s={slide} />

  }
}

function ScreenT({ s }: { s: ScreenSlide }) {
  return <div className="h-full min-h-0"><ScreenView key={s.id} screen={s.screen} /></div>
}

function CompareT({ s }: { s: CompareSlide }) {
  return (
    <div className="flex h-full min-h-0 gap-12">
      {[s.left, s.right].map((side, i) => (
        <div key={i} className="flex min-w-0 flex-1 flex-col gap-5" style={s.ratio ? { flexGrow: s.ratio[i] } : undefined}>
          <div className="flex items-center gap-4">
            {s.notes?.length ? <NumberBadge n={i + 1} /> : null}
            <span className="font-display text-[32px] font-bold text-[#101113]">{side.label}</span>
          </div>
          <div className="min-h-0 flex-1"><ScreenView key={`${s.id}-${i}`} screen={side.screen} /></div>
        </div>
      ))}
    </div>
  )
}

// Template table typography and row spacing; neutral structural dividers only. Row height and type size step
// down as rows grow so a long table (a /config list) still fits the body; 9+ rows keep the old compact
// sizing (min 20px) since a fixed row height would no longer read as generous. Anchored to the body's
// bottom edge (DESIGN.md principle 3), not vertically centred.
const isPositiveCell = (v: string) => ["가능", "접근 가능", "있음", "O", "예"].includes(v.trim())
const isNegativeCell = (v: string) => ["불가", "접근 불가", "없음", "안 됨", "X", "아니오"].includes(v.trim())
// A command / file name: one ASCII token, no spaces, that starts with "/" or "-" or contains "." or "_".
const isTermCell = (v: string) => {
  const s = v.trim()
  if (!s || /\s/.test(s) || !/^[\x00-\x7F]+$/.test(s)) return false
  return s.startsWith("/") || s.startsWith("-") || s.includes(".") || s.includes("_")
}

// Concept templates share one vertical composition (DESIGN.md principle 3): the block sits in the lower
// part of the body on an optical line, free space split 3:1 above/below, with a bottom margin at least
// the side margin so it never "falls to the floor".
function Lower({ children, tight }: { children: ReactNode; tight?: boolean }) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <div className="min-h-0 flex-[3]" />
      <div className="shrink-0">{children}</div>
      <div className={cn("flex-[1]", tight ? "min-h-0" : "min-h-[64px]")} />
    </div>
  )
}

function TableT({ s }: { s: TableSlide }) {
  const n = s.rows.length
  const cols = s.columns.length
  const split = s.split && cols === 4
  const firstW = split ? 20 : cols >= 4 ? 34 : cols === 3 ? 40 : cols === 2 ? 50 : 100 / Math.max(cols, 1)
  const colWidths = split ? [20, 30, 20, 30] : null
  const restW = cols > 1 ? (100 - firstW) / (cols - 1) : 0
  const compact = n > 8
  const rowH = n <= 3 ? 140 : n <= 5 ? 120 : n <= 8 ? 92 : undefined
  const firstSize = n <= 3 ? 38 : n <= 5 ? 34 : n <= 8 ? 28 : n <= 12 ? 22 : 20
  const valueSize = n <= 3 ? 32 : n <= 5 ? 28 : n <= 8 ? 26 : n <= 12 ? 22 : 20
  const cellPy = compact ? (n <= 12 ? "py-2.5" : "py-1.5") : undefined
  // "Name" columns (0, and 2 when split): bold, same size/style as the classic first column. Column 2
  // gets a left hairline + left padding so it reads as the second half's own name column.
  const isNameCol = (ci: number) => ci === 0 || (split && ci === 2)
  return (
    <Lower tight={compact}>
      <table className="w-full table-fixed border-collapse font-display">
        <colgroup>
          {s.columns.map((_, i) => (
            <col key={i} style={{ width: `${colWidths ? colWidths[i] : i === 0 ? firstW : restW}%` }} />
          ))}
        </colgroup>
        <thead>
          <tr className="border-b border-[#e3e5e8]" style={{ height: 80 }}>
            {s.columns.map((c, i) => (
              <th key={i} className={cn("align-middle text-left font-semibold text-[28px] text-[#7c8288]", i === 0 ? "pl-8" : "px-6", split && i === 2 ? "border-l border-[#e3e5e8] pl-8" : undefined, cellPy)}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {s.rows.map((r, ri) => (
            <tr key={ri} className="border-b border-[#e3e5e8]" style={rowH ? { height: rowH } : undefined}>
              {r.cells.map((c, ci) => {
                if (isNameCol(ci)) {
                  const term = isTermCell(c)
                  const accent = ci === 0 && r.highlight
                  return (
                    <td
                      key={ci}
                      className={cn(
                        "relative align-middle pl-8 break-keep font-bold",
                        s.verbatim && "whitespace-pre-line",
                        term ? "font-term" : "font-display",
                        accent ? "text-slide-accent" : "text-[#101113]",
                        ci === 2 ? "border-l border-[#e3e5e8]" : undefined,
                        cellPy,
                      )}
                      style={{ fontSize: firstSize }}
                    >

                      {c}
                    </td>
                  )
                }
                const positive = isPositiveCell(c)
                const negative = isNegativeCell(c)
                return (
                  <td
                    key={ci}
                    className={cn("align-middle px-6 text-left break-keep", s.verbatim && "whitespace-pre-line", positive ? "font-semibold text-[#101113]" : negative ? "text-[#a3a8ad]" : "text-[#43474b]", cellPy)}
                    style={{ fontSize: valueSize }}
                  >
                    {positive ? <span className="mr-[14px] inline-block size-[12px] shrink-0 rounded-full bg-slide-accent align-middle" /> : null}
                    {c}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </Lower>
  )
}

// A static vector illustration, centred in the body. No animation in the lecture slides (CEO 2026-09-21).
function IllustrationT({ s }: { s: IllustrationSlide }) {
  if (!s.illustration.startsWith("/")) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl border-2 border-dashed border-neutral-300 font-display text-[30px] text-[#7c8288]">
        일러스트 자리 · {s.illustration}
      </div>
    )
  }
  return (
    <div className="flex h-full min-h-0 items-center justify-center">
      <img src={asset(s.illustration)} alt={s.title} className="h-full max-h-full w-auto max-w-full object-contain" />
    </div>
  )
}

// Full-bleed part opener: the session's table of contents as a strip (this part highlighted), the part
// number and title large, and the slides it covers as short chips. No explanatory text.
export function PartCoverT({ s }: { s: PartCoverSlide }) {
  return (
    <div className="flex size-full flex-col bg-white px-[120px] py-[90px]">
      <div className="flex gap-3">
        {s.parts.map((p, i) => (
          <div key={i} className="flex min-w-0 flex-1 flex-col gap-3">
            <span className={cn("font-num text-[20px]", i === s.partIndex ? "text-slide-accent" : "text-[#9a9ea3]")}>{String(i + 1).padStart(2, "0")}</span>
            <span className={cn("truncate font-display text-[18px]", i === s.partIndex ? "font-bold text-[#101113]" : "text-[#9a9ea3]")}>{p.title}</span>
          </div>
        ))}
      </div>
      {s.art ? (
        <div className="flex min-h-0 flex-1 items-center gap-16 pt-10">
          <div className="flex w-[34%] shrink-0 flex-col gap-6">
            <span className="font-num text-[40px] font-medium tracking-[0.1em] text-slide-accent">PART {String(s.partIndex + 1).padStart(2, "0")}</span>
            <h1 className="font-display text-[96px] leading-[1.08] font-bold tracking-[-0.03em] break-keep text-balance text-[#101113]">{s.title}</h1>
          </div>
          <div className="flex h-full min-h-0 min-w-0 flex-1 items-center justify-center">
            <img src={asset(s.art)} alt={s.title} className="max-h-full w-full object-contain" />
          </div>
        </div>
      ) : (
      <div className="flex flex-1 flex-col justify-center gap-6">
        <span className="font-num text-[40px] font-medium tracking-[0.1em] text-slide-accent">PART {String(s.partIndex + 1).padStart(2, "0")}</span>
        <h1 className="font-display text-[120px] leading-[1.05] font-bold tracking-[-0.03em] break-keep text-balance text-[#101113]">{s.title}</h1>
      </div>
      )}
      {s.art ? null : s.sections?.length ? (
        <div className="grid grid-cols-2 gap-x-12 gap-y-4">
          {s.sections.map((sec, i) => (
            <div key={i} className="flex items-center gap-5  pb-4">
              <span className="font-num text-[26px] font-medium text-slide-accent">{String(i + 1).padStart(2, "0")}</span>
              <span className="min-w-0 flex-1 truncate font-display text-[32px] font-bold text-[#101113]">{sec.title}</span>
              <span className="font-num text-[24px] text-[#9a9ea3]">{sec.count}</span>
            </div>
          ))}
        </div>
      ) : s.slideTitles.length <= 12 ? (
      <div className="flex flex-wrap gap-4">
        {s.slideTitles.map((t, i) => (
          <span key={i} className="flex items-center gap-3 rounded-full border border-neutral-200 bg-white py-3 pr-7 pl-4 font-display text-[26px] text-[#43474b]">
            <span className="font-num text-[22px] text-[#9a9ea3]">{String(i + 1).padStart(2, "0")}</span>
            {t}
          </span>
        ))}
      </div>
      ) : null}
    </div>
  )
}
