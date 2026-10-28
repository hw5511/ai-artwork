// The viewer consumes native session and part JSON only. Paths starting with / go through asset().
export type CourseId = "artwork"
export interface Site { title: string; courses: Course[] }
export interface Course { id: CourseId; label: string; title: string; sessions: Session[] }
export interface Session {
  step: number; title: string; hours: string; goal: string; topics: string[]; practice: string; parts: Part[]
}
export interface Part {
  id: string; title: string; summary?: string; sections?: {title: string; count: number}[];
  coverArt?: string; cover?: false; slides: Slide[]
}
interface SlideBase { id: string; title: string; notes?: Note[]; action?: ActionBox }
export type Slide = ScreenSlide | CompareSlide | TableSlide | IllustrationSlide | PartCoverSlide
export interface ScreenSlide extends SlideBase { template: "screen"; screen: Screen }
export interface CompareSlide extends SlideBase {
  template: "compare"; left: {label: string; screen: Screen}; right: {label: string; screen: Screen}; ratio?: [number, number]
}
export interface TableSlide extends SlideBase {
  template: "table"; columns: string[]; rows: {cells: string[]; highlight?: boolean}[]; split?: boolean
}
export interface IllustrationSlide extends SlideBase { template: "illustration"; illustration: string }
// Covers are derived by flatSlides(), never maintained as duplicate JSON content.
export interface PartCoverSlide extends SlideBase {
  template: "part-cover"; partIndex: number; parts: {title: string; count: number}[];
  slideTitles: string[]; sections?: {title: string; count: number}[]; art?: string
}
export interface Note { n: number | "!"; head: string; body?: string }
export type Screen = ShotScreen | VideoScreen
export interface ShotScreen { kind: "shot"; src: string; badges?: {n: number; x: number; y: number}[] }
export interface VideoScreen { kind: "video"; src: string; poster?: string; loop?: boolean }
export interface ActionBox { label: string; items: ActionItem[] }
export type ActionItem =
  | {kind: "copy"; value: string; desc?: string}
  | {kind: "link"; href: string; text: string; desc?: string}
  | {kind: "download"; href: string; text: string; desc?: string}
