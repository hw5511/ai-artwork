// The same restrained window frames as ai-agent-class. UI text comes from the referenced captures.
// These are static lesson visuals; none of the depicted controls execute anything.
import { ArrowLeft, ArrowRight, ArrowUp, Check, ChevronDown, Folder, Laptop, Minus, Plus, RotateCw, Square, X } from "lucide-react"
import type { BrowserScreen, DesktopScreen, TerminalScreen } from "@/content/schema"
import { NumberBadge } from "./NumberBadge"
import { asset } from "@/lib/utils"

export function BrowserEvidence({ screen, children }: { screen: BrowserScreen; children: React.ReactNode }) {
  return <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-neutral-300 bg-white shadow-[0_18px_40px_rgba(16,17,19,0.16)]" data-capture={screen.capture}>
    <div className="flex h-12 shrink-0 items-center gap-4 bg-neutral-100 px-5 text-neutral-600">
      <span className="flex-1 truncate font-display text-[20px]">{new URL(screen.url).hostname}</span>
      <Minus size={18}/><Square size={16}/><X size={18}/>
    </div>
    <div className="flex h-16 shrink-0 items-center gap-5 border-b border-neutral-200 px-5 text-neutral-600">
      <ArrowLeft size={24}/><ArrowRight size={24}/><RotateCw size={22}/>
      <span className="min-w-0 flex-1 truncate rounded-full bg-neutral-100 px-6 py-2 font-display text-[22px]">{screen.url}</span>
    </div>
    {screen.page ? <ComfyAuthorization screen={screen}/> : <div className="min-h-0 flex-1 p-4">{children}</div>}
  </div>
}

// Same hierarchy and labels as the captured pre-approval form. The permission box remains a scroll pane.
function ComfyAuthorization({ screen }: { screen: BrowserScreen }) {
  const p=screen.page!
  return <div className="flex min-h-0 flex-1 items-center justify-center bg-[#211b29] p-6 font-display text-white">
    <div className="flex h-full min-h-0 w-[660px] flex-col gap-4 text-[21px]">
      <div className="flex shrink-0 flex-col items-center gap-1">
        <img src={asset(p.logo)} alt="" className="h-12 w-auto object-contain"/>
        <div className="text-[28px] font-bold">Comfy CLI wants access</div>
        <div className="text-[17px] text-[#aaa4b0]">Sign in to Comfy Cloud to continue</div>
      </div>
      <div className="shrink-0"><div className="mb-2 text-[18px] text-[#aaa4b0]">Your Workspaces</div><div className="flex items-center gap-4 rounded-lg bg-[#514a59] px-4 py-3">{p.workspaceBadge && <NumberBadge n={p.workspaceBadge}/>}<span className="rounded bg-[#302a37] px-3 py-1 text-[17px]">P</span><div className="flex-1"><div>{p.workspace}</div><div className="text-[16px] text-[#aaa4b0]">Personal</div></div><Check size={24}/></div></div>
      <div className="flex min-h-0 flex-1 flex-col gap-2"><div className="shrink-0 text-[18px] text-[#aaa4b0]">Details</div><div className="min-h-0 flex-1 overflow-y-auto rounded-lg bg-[#37313f] p-4 text-[18px]"><div className="mb-2 text-[16px] text-[#aaa4b0]">Permissions</div>{p.permissions.map(t=><div key={t} className="flex items-center gap-3 py-1"><Check size={17} className="shrink-0 text-[#d0d445]"/>{t}</div>)}</div></div>
      <div className="shrink-0 rounded-lg bg-[#37313f] p-3 text-[16px] text-[#aaa4b0]">You'll be redirected to<div className="mt-2 rounded bg-[#514a59] px-3 py-1 font-term text-[18px] text-white">{p.callback}</div></div>
      <div className="relative flex h-12 shrink-0 items-center justify-center rounded-lg bg-[#37313f] font-semibold">Continue{p.continueBadge && <span className="absolute right-4"><NumberBadge n={p.continueBadge}/></span>}</div>
      <div className="flex h-10 shrink-0 items-center justify-center rounded-lg bg-[#302a37] text-[19px]">Cancel</div>
    </div>
  </div>
}

export function DesktopEvidence({ screen: s }: { screen: DesktopScreen }) {
  if (s.dialog) return <div className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-neutral-300 bg-white font-display text-neutral-700 shadow-[0_18px_40px_rgba(16,17,19,0.16)]" data-capture={s.capture}>
    <div className="flex h-14 shrink-0 items-center justify-between border-b border-neutral-200 px-6 text-[24px]"><span>{s.dialog.title}</span><X size={24}/></div>
    <div className="flex h-20 shrink-0 items-center gap-5 px-6 text-[25px]"><ArrowLeft size={24}/><ArrowRight size={24}/><span className="flex min-w-0 flex-1 items-center gap-4 border border-neutral-200 px-5 py-3"><Folder size={25}/>{s.dialog.path}</span></div>
    <div className="flex h-14 shrink-0 items-center gap-8 border-y border-neutral-200 px-6 text-[22px]"><span className="flex-1">이름</span><span>수정한 날짜</span><span className="w-32">유형</span><span className="w-20">크기</span></div>
    <div className="flex min-h-0 flex-1 items-start justify-center pt-10 text-[25px] text-neutral-500">{s.dialog.emptyText}</div>
    <div className="shrink-0 border-t border-neutral-200 p-6 text-[25px]"><div className="flex items-center gap-5"><span>폴더:</span><span className="flex-1 border border-neutral-300 px-4 py-2">{s.dialog.selected}</span></div><div className="mt-5 flex justify-end gap-5"><span className="rounded-md border border-neutral-400 px-8 py-2">폴더 선택</span><span className="rounded-md border border-neutral-300 px-8 py-2">취소</span></div></div>
    {s.badges?.map(b=><span key={b.n} className="absolute -translate-x-1/2 -translate-y-1/2" style={{left:`${b.x}%`,top:`${b.y}%`}}><NumberBadge n={b.n}/></span>)}
  </div>
  const product = s.menu?.placement === "product"
  const permissions = s.menu?.placement === "permissions"
  return <div className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-neutral-700 bg-[#181818] font-display text-[#eeeeee] shadow-[0_18px_40px_rgba(16,17,19,0.16)]" data-capture={s.capture}>
    <div className="flex h-12 shrink-0 items-center gap-6 border-b border-white/10 px-5 text-[20px] text-[#a0a0a0]">
      <ArrowLeft size={20}/><ArrowRight size={20}/><span>File</span><span>Edit</span><span>View</span><span>Help</span>
      <Minus className="ml-auto" size={18}/><Square size={16}/><X size={18}/>
    </div>
    <div className="relative min-h-0 flex-1">
      {product && <div className="absolute inset-y-0 left-0 w-[310px] border-r border-white/10 p-6 text-[24px]">
        <div className="flex items-center gap-2 font-semibold">Codex <ChevronDown size={20}/></div>
        <div className="mt-7 text-[22px]">New chat</div>
        <div className="mt-10 text-[19px] text-[#999999]">Projects</div>
        <div className="mt-4 flex items-center gap-3"><Folder size={21}/>{s.project}</div>
        <div className="mt-10 text-[19px] text-[#999999]">Recents</div>
        <div className="mt-4 text-[22px]">새 채팅</div>
      </div>}
      <div className="absolute inset-0 flex flex-col justify-end px-[8%] pb-8" style={product ? {left:310,paddingLeft:40,paddingRight:40} : undefined}>
        <div className="flex min-h-0 flex-1 items-center justify-center pb-16 text-center text-[34px] font-medium">
          <span>What should we work on in {s.project}?</span>
        </div>
        <div className="shrink-0">
          <div className="mx-4 flex h-12 items-center gap-4 rounded-t-2xl bg-[#242424] px-6 text-[21px]"><Folder size={22}/>{s.project}<Laptop className="ml-3" size={22}/>This computer</div>
          <div className="rounded-3xl bg-[#303030] px-6 pt-5 pb-4">
            <div className="mb-8 text-[24px] text-[#999999]">Do anything</div>
            <div className="flex items-center gap-4 text-[21px]">
              <Plus size={25}/><span className="text-[#e99b58]">Full access</span><ChevronDown size={18}/>
              <span className="ml-auto">GPT-6.1 Sol High</span><ChevronDown size={18}/><ArrowUp className="ml-3 rounded-full bg-[#3e6cb4] p-1.5" size={36}/>
            </div>
          </div>
        </div>
      </div>
      {s.menu && <div className="absolute z-10 rounded-2xl border border-white/10 bg-[#282828] p-3 shadow-xl" style={product ? {left:20,top:65,width:340} : permissions ? {left:'10%',bottom:95,width:660} : {right:'8%',bottom:95,width:390}}>
        {s.menu.title && <div className="px-3 pb-3 text-[19px] text-[#a4a4a4]">{s.menu.title}</div>}
        {s.menu.items.map((it,i)=><div key={i} className="relative flex min-h-12 items-center gap-3 rounded-xl px-3 py-2 text-[23px]" style={permissions && it.selected ? {color:'#e99b58'} : undefined}>
          {it.badge && <NumberBadge n={it.badge}/>}
          <div className="min-w-0 flex-1"><div>{it.label}</div>{it.detail && <div className="mt-1 text-[17px] leading-snug text-[#a4a4a4]">{it.detail}</div>}</div>
          {it.selected && <Check size={24} className="shrink-0"/>}
        </div>)}
      </div>}
      {s.badges?.map(b=><span key={b.n} className="absolute z-20 -translate-x-1/2 -translate-y-1/2" style={{left:`${b.x}%`,top:`${b.y}%`}}><NumberBadge n={b.n}/></span>)}
    </div>
  </div>
}

export function TerminalEvidence({ screen: s }: { screen: TerminalScreen }) {
  return <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-neutral-700 bg-[#16181c] text-[#e9edf3] shadow-[0_18px_40px_rgba(16,17,19,0.16)]" data-capture={s.capture}>
    <div className="flex h-14 shrink-0 items-center gap-5 border-b border-white/10 px-6 font-display text-[21px] text-[#b4bac5]"><span className="flex-1">{s.title}</span><Minus size={18}/><Square size={16}/><X size={18}/></div>
    <div className="flex min-h-0 flex-1 flex-col justify-center gap-8 px-10 py-8 font-term text-[27px] leading-relaxed">
      <div className="whitespace-pre-wrap break-words">{s.command}</div>
      <div className="flex flex-col gap-1">{s.lines.map((line,i)=><div key={i} className="flex items-start gap-4"><span className="w-10 shrink-0 pt-1">{line.badge && <NumberBadge n={line.badge}/>}</span><pre className="min-w-0 whitespace-pre-wrap break-words font-term">{line.text}</pre></div>)}</div>
    </div>
  </div>
}
