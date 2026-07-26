# Nebula Homebase (Tauri + Three.js)

Desktop-shell for Nebula Homebase:
- Frontend: `apps/star-map-web` (Three.js + HUD + audio)
- Backend: `apps/desktop-shell-tauri/src-tauri` (Rust + Tauri IPC)

## Forhåndskrav

- Node.js (LTS anbefales)
- Rust (`rustup`)
- På Windows: Visual Studio C++ Build Tools (for Rust/Tauri native build)

## Prosjektstruktur

- `apps/star-map-web`:
  - kjører med Vite i dev (`http://localhost:5173`)
  - renderer stjernekart/HUD/lyd
- `apps/desktop-shell-tauri`:
  - Tauri desktop shell
  - sender demo-event `incoming-collision` fra Rust til frontend

## Kjør i utvikling

Åpne to terminaler.

### Terminal 1: Frontend (Vite)

```bash
cd apps/star-map-web
npm install
npm run dev
```

### Terminal 2: Tauri desktop

```bash
cd apps/desktop-shell-tauri
npm install
npm run dev
```

Da starter Nebula Homebase som desktop-app med borderless/transparent vindu.

## IPC-bridge (Rust -> JS)

Rust emitter periodisk event:
- Event: `incoming-collision`
- Payload: `{ size: number }`

Frontend lytter på eventet via `@tauri-apps/api/event` og trigger:
- dyp basslyd (`playIncomingBass`)
- visuell respons i Three.js (`triggerThreeJsExplosion(size)`)

## Notater

- `tauri.conf.json` er satt med:
  - `decorations: false`
  - `transparent: true`
- `apps/star-map-web` bruker npm-pakken `three` (ikke CDN import).
