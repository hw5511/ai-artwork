# Content rules: AI 아트웍 slide viewer

Adapted from ai-agent-class/web/CONTENT_RULES.md. The viewer keeps the template's type,
spacing, white surfaces and #1273c4 accent. The artwork port uses native JSON only.

## Source and structure

`src/content/sessions/artwork/stepNN.json` lists ordered part IDs.
`src/content/parts/<id>.json` holds each part and its slides. One original md step is one part.
The viewer derives the part covers, sidebar and counters from this data.
No 정리 or 마무리 parts. Sessions 5-8 have empty part lists and display 준비 중.

## Slides and explanations

The slide area contains a short keyword title and a visual: a real screenshot or image,
a video, a comparison, a genuinely tabular set of facts, or a static vector illustration.
Explanations go in `notes` in the right-hand 설명 panel. No paragraphs or explanatory
bullets on slides. Titles and table cells use keywords, never Korean sentence endings.
A visual badge number always matches the same note number. At most four notes per slide.
Note heads are short keyword phrases; artwork notes also use concise keyword bodies.
No dash chains, filler, jargon for its own sake, invented metaphors, or AI phrasing.
A note describes what the student sees or does, with facts matching the visual.

## Real visuals

Supported templates: `screen`, `compare`, `table`, `illustration`; `part-cover` is generated.
Supported screen kinds: `shot` and `video`. Unused Claude, phone, Office and browser mocks
are removed. Do not invent an app state or sample output. Use the real captures and images
under `lectures/images/` and `downloads/`. An official template preview must be labelled
as a preview, distinct from the park exercise's output. Keep provenance and limitations.
Concept illustrations use physical objects and plenty of space, consistent with the template.
SVGs containing Korean text embed a Pretendard subset; an SVG image cannot inherit page fonts.
No animation in illustrations. Videos keep ordinary playback controls.

## Colour and decoration

Pure white slide surfaces; no warm off-white or tinted content blocks. Accent: #1273c4.
Owner override: no decorative colour bars, border-line accents or underlines. Part covers
use plain part numerals instead of progress bars. Neutral table dividers and the viewer's
structural panel borders remain functional separators. Do not redesign the template.

## Actions and paths

Only three actions: copy a prompt/command, open a link, download a file. No bare keypresses
or folder names in action boxes. Long copy text truncates on screen and copies in full.
Preserve every rehearsed student prompt and command exactly, including line breaks.
Do not apply prose editing to quoted copy text. `scripts/migration-manifest.json` freezes
its hashes and the original links as migration assertions, not as rendering inputs.

Media stay at their original repository paths. JSON uses `/lectures/images/...` and
`/downloads/...`; `asset()` adds `/ai-artwork/`. `prepare-assets.mjs` stages identical
ignored copies in `public/` for dev/build. Do not edit staged files or `dist/`.

## Check

`node web/scripts/check-content.mjs` must report 0 errors; `cd web && npm run build` must pass.
Review all changed slides using playwright-tool at 1920x1080 and 390px, including clipboard,
links, hashes, image loading and overflow. Review Korean text with korean-natural-prose/deslop.
The mobile viewer puts the same slide above the same notes panel and reserves room for the
contents button. Desktop keeps the template's left list, middle slide and right notes.
