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
  template: "table"; columns: string[]; rows: {cells: string[]; highlight?: boolean}[]; split?: boolean; verbatim?: boolean
}
export interface IllustrationSlide extends SlideBase { template: "illustration"; illustration: string }
// Covers are derived by flatSlides(), never maintained as duplicate JSON content.
export interface PartCoverSlide extends SlideBase {
  template: "part-cover"; partIndex: number; parts: {title: string; count: number}[];
  slideTitles: string[]; sections?: {title: string; count: number}[]; art?: string
}
export interface Note { n: number | "!"; head: string; body?: string }
export type Screen = ShotScreen | VideoScreen | BrowserScreen | DesktopScreen | TerminalScreen
export interface ShotScreen { kind: "shot"; src: string; badges?: {n: number; x: number; y: number}[] }
export interface VideoScreen { kind: "video"; src: string; poster?: string; loop?: boolean }
export interface ScreenPin { n: number; x: number; y: number }
// Capture paths are provenance, not optional decoration. These are read-only redraws of observed UI.
export interface BrowserScreen {
  kind: "browser"; capture: string; url: string; src: string; badges?: ScreenPin[]
  page?: { kind: "comfy-auth"; workspace: string; permissions: string[]; callback: string; logo: string; workspaceBadge?: number; continueBadge?: number }
}
export interface DesktopScreen {
  kind: "desktop"; capture: string; project: string; prompt?: string;
  dialog?: { title: string; path: string; selected: string; emptyText: string };
  menu?: {
    placement: "product" | "model" | "permissions"; title?: string;
    items: { label: string; detail?: string; selected?: boolean; badge?: number }[]
  };
  badges?: ScreenPin[]
}
export interface TerminalScreen {
  kind: "terminal"; capture: string; transcript: string; title: string;
  command: string; lines: { text: string; badge?: number }[]
}
export interface ActionBox { label: string; items: ActionItem[] }
export type ActionItem =
  | {kind: "copy"; value: string; desc?: string}
  | {kind: "link"; href: string; text: string; desc?: string}
  | {kind: "download"; href: string; text: string; desc?: string}
