/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAIL_PUBLIC_KEY: string;
  readonly VITE_EMAIL_SERVICE_ID: string;
  readonly VITE_EMAIL_TEMPLATE_ID_CONTACT: string;
  readonly VITE_EMAIL_TEMPLATE_ID_ORDER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
