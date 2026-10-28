# AI 아트웍 slide viewer

The class site uses the AI 에이전트 수업 React/TypeScript/Tailwind/shadcn template.
Native session and part JSON in `src/content/` is the editable source of truth.
Read [CONTENT_RULES.md](CONTENT_RULES.md) before editing content and [../AGENTS.md](../AGENTS.md)
for the repository workflow.

From this directory:

```sh
npm ci
npm run check
npm run build
npm run preview -- --host 127.0.0.1 --port 4174
```

Preview: http://127.0.0.1:4174/ai-artwork/#artwork/1/1
Dev: `npm run dev`, with the same `/ai-artwork/` base. Dev/build stage ignored copies of
repository media into `public/`; edit the originals under `../lectures/images/` and `../downloads/`.

The Pages workflow checks content, builds this directory and publishes only `dist/`.
Yuki must change Settings → Pages → Build and deployment → Source from **Deploy from a branch**
to **GitHub Actions** when deploying. No generated root `index.html` or MUI viewer is used.
