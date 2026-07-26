# Nebula Tauri + Three.js Integration TODO

- [x] Add `apps/star-map-web/package.json` with Vite + Three scripts/deps
- [x] Update `apps/star-map-web/src/main.js` for npm Three import and Tauri IPC listener
- [x] Update `apps/desktop-shell-tauri/src-tauri/src/lib.rs` to emit `incoming-collision` events
- [x] Update `apps/desktop-shell-tauri/src-tauri/tauri.conf.json` for borderless transparent sci-fi window
- [x] Update `apps/desktop-shell-tauri/package.json` scripts for smoother dev workflow
- [x] Update desktop shell README with setup/run guide
- [x] Run install/dev commands to validate setup

## Hologram Window Refactor (desktop-shell-tauri)

- [x] Ensure `three` exists in `apps/desktop-shell-tauri/package.json`
- [x] Replace `apps/desktop-shell-tauri/src/index.html` with HUD + `canvas#bg` + `data-tauri-drag-region`
- [x] Replace `apps/desktop-shell-tauri/src/main.js` with transparent Three.js renderer (`alpha: true`)
- [x] Update `apps/desktop-shell-tauri/src/styles.css` to enforce transparent page background
- [x] Mark all items complete after implementation
