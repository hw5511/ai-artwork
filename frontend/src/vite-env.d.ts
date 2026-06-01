/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SESSION_FILTER?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
