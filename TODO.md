# NebulaI2P - TODO

## Fase F: Kosmisk Symfoni (Web Audio API)

- [ ] Legge til AudioContext-basert lydmotor i `apps/star-map-web/src/main.js`
- [ ] Implementere ADSR-envelope for rolige, meditative lydkurver
- [ ] Koble sonar-retning til to lydsignaturer:
  - [ ] Outgoing "pling" (sine/triangle, lys)
  - [ ] Incoming bassromling (triangle + lowpass)
- [ ] Legge inn anti-støy mekanismer:
  - [ ] Cooldown/rate-limit per sonar-trigger
  - [ ] Volumtak for å unngå clipping
- [ ] Aktivere lyd først ved brukerinteraksjon (autoplay policy-safe)
- [ ] Oppdatere HUD i `apps/star-map-web/index.html` med lydstatus
- [ ] Style lydindikator/toggle i `apps/star-map-web/src/styles.css`
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
