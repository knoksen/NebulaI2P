# NebulaI2P - TODO

## Fase F: Kosmisk Symfoni (Web Audio API)

- [x] Opprette `apps/star-map-web/src/NebulaAudioEngine.js` (ES6-klasse)
- [x] Integrere `NebulaAudioEngine` i `apps/star-map-web/src/main.js`
- [ ] Implementere ADSR-envelope for rolige, meditative lydkurver
- [ ] Koble sonar-retning til to lydsignaturer:
  - [ ] Outgoing "pling" (sine, lys)
  - [ ] Incoming bassromling (triangle, dyp)
- [x] Aktivere lyd først ved brukerinteraksjon (autoplay policy-safe)
- [x] Oppdatere HUD i `apps/star-map-web/index.html` med "Engage Audio"-knapp
- [x] Implementere taktisk sci-fi HUD-overlegg (`#nebula-hud`) over Three.js canvas
- [x] Style HUD med glassmorfisme, statusfelt og `.sci-fi-btn` med `audio-active` state
- [x] Koble `#audio-toggle` i `main.js` til `NebulaAudioEngine.unlock()` + mute/unmute-logikk
- [ ] (Valgfritt senere) Legge inn anti-støy mekanismer:
  - [ ] Cooldown/rate-limit per sonar-trigger
  - [ ] Ekstra volumtak/kompresjon ved behov
- [ ] Verifisere at eksisterende kollisjon/parallakseflyt fortsatt fungerer

## Fase G: Interstellar gravitasjonslinsing (Three.js Shader)

- [x] Lage render target + postprocess-pass i `apps/star-map-web/src/main.js`
- [x] Implementere fullskjerms shader (vertex + fragment) for gravitasjonslinsing
- [x] Legge inn hendelseshorisont (svart kjerne), UV-forvrengning og varm akkresjonsglød
- [x] Koble uniforms `center`, `mass`, `time` for runtime-styring
- [x] Rendrere scene -> renderTarget -> lensing pass til skjerm i render-loop
- [x] Eksponere enkel onboarding-hook for å animere `mass` opp/ned
- [x] Oppdatere resize-håndtering for både renderer og renderTarget
- [ ] Verifisere visuelt at stjernekartet bøyes rundt sentrum uten å bryte eksisterende interaksjon

## Fase H: GitHub-presentasjon og videre utvikling (Repo-wide)

### Dokumentasjon og profilering
- [ ] Legge inn prosjektbanner/logo for README (assets/mappe)
- [ ] Legge til demo-gif/video av star-map interaksjon
- [ ] Legge til skjermbilder for mobilskjermer (Dashboard/Telescope/Pairing/Settings)
- [ ] Lage norsk + engelsk README-variant ved behov
- [ ] Legge til arkitekturdiagram (UI ↔ Contracts ↔ Rust Core ↔ I2P)

### Produkt og funksjonelle milepæler
- [ ] Implementere ekte `core.node.bootstrap()` flyt i Rust + bridge
- [ ] Koble `core.node.status()` til Dashboard live-telemetri
- [ ] Implementere QR invite-generering og validering ende-til-ende
- [ ] Implementere første P2P sync av bookmark-entity med konfliktstrategi
- [ ] Implementere første versjon av `triggerSingularity()` med sikker state wipe

### Kvalitet, test og sikkerhet
- [ ] Sette opp enhetstester for Rust-moduler (`i2p_manager`, `pairing`, `sync_engine`)
- [ ] Sette opp kontrakttester for `contracts/core-api.ts`
- [ ] Definere logging-policy med metadata-minimering
- [ ] Legge til trusselmodell og security-checklist i `docs/`
- [ ] Innføre CI for lint, test og bygg-status badges

### Developer Experience
- [ ] Lage `CONTRIBUTING.md` med branch/commit/PR-konvensjoner
- [ ] Lage issue- og PR-templates i `.github/`
- [ ] Dokumentere lokal oppstart for hver app (`mobile`, `desktop-shell`, `star-map-web`)
- [ ] Standardisere kodeformattering/linting i hele repoet
- [ ] Lage versjonert changelog (`CHANGELOG.md`)
