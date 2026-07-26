# Nebula Desktop Shell

Desktop-shell for Nebula kjøres via Tauri-prosjektet i `apps/desktop-shell-tauri` og laster frontend fra `apps/star-map-web`.

## Struktur
- `apps/desktop-shell`: dokumentasjon og plan
- `apps/desktop-shell-tauri`: faktisk Tauri-app (Rust + host-vindu)
- `apps/star-map-web`: frontend som vises i desktop shell

## Kjøreinstruksjoner

### Forutsetninger
- Node.js (LTS)
- Rust toolchain
- Tauri system dependencies (per OS)

### Installer dependencies
Fra repo root:

```bash
cd apps/desktop-shell-tauri && npm install
```

### Lokal utvikling (`tauri dev`)
Start frontend (star-map-web) separat på port 5173, deretter start Tauri:

Terminal 1 (fra repo root):
```bash
cd apps/star-map-web
python -m http.server 5173
```

Terminal 2 (fra repo root):
```bash
cd apps/desktop-shell-tauri
npm run tauri dev
```

## Status
- Tauri v2 scaffold er initialisert
- Minimal Rust command (sanity check) finnes i `src-tauri/src/lib.rs`
- Tauri config peker mot `apps/star-map-web` via `devUrl` og `frontendDist`
