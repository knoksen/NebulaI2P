# Nebula – Master Plan (Phase 0/1 Foundation)

## 1) Fastlåst stack for første leveranse
Siden bruker svarte "proceed" uten spesifikk preferanse, låses første iterasjon til:

- **Frontend (Desktop + Mobil):** React Native (Expo for mobil + React Native Web/Tauri bridge senere)
- **Core/Backend lokalt:** Rust
- **Nettverk:** Innebygd I2P-router-prosess (wrapper/manager), lokale sikre tunneler
- **P2P sync:** Rust-basert replikeringsmotor over I2P
- **Visualisering:** React Native + Skia/Lottie i første versjon, utvidbar til WebGL/Three via desktop-view

---

## 2) Målbildet
Nebula skal være en ekstremt brukervennlig I2P-klient med sci-fi UI, sikkerhetsfokus og gamifisert personvern:
- Ett-klikk oppstart av I2P
- Desktop = tung node (hjemmebase)
- Mobil = lett speider-klient via desktop
- Serverløs sync av bokmerker/innstillinger
- QR-basert kryptografisk paring
- Modulært UI: Stjernekartet, Teleskopet, Singularitet-knappen

---

## 3) Arkitektur (høynivå)

## 3.1 Lagdeling
1. **UI-lag (React Native)**
   - Screens, komponenter, animasjoner, state
2. **Application-lag**
   - Use-cases, policy, kommandoer (start node, pair, sync, panic wipe)
3. **Core-lag (Rust)**
   - I2P manager, tunnel manager, key manager, sync engine, secure storage adapter
4. **Infrastructure-lag**
   - OS-prosesshåndtering, filsystem, kryptert lagring, nettverk, QR codec

## 3.2 Runtime-roller
- **Desktop Node Runtime**
  - Kjør I2P daemon
  - Holder private keys sikkert
  - Eksponerer lokal kontrollkanal til UI
  - Terminates mobil-forespørsler via autoriserte tunneler
- **Mobile Scout Runtime**
  - Kjører lett klientmodus
  - Bruker paret desktop node som gateway til I2P
  - Har minimal sensitiv cache + rask purge-støtte

## 3.3 Tillitsmodell
- Ingen ekstern sentral server for paring/sync
- Enheter pares med engangs-ephemeral handshake over QR
- Langsiktig tillit basert på enhetsnøkler og signerte capabilities
- Alt lokalt lagret krypteres

---

## 4) Datastrukturer (første utkast)

## 4.1 Enhet
- `device_id` (UUID)
- `device_pubkey` (Ed25519)
- `device_name`
- `role` (`desktop` | `mobile`)
- `paired_at`
- `trust_level`

## 4.2 Bookmark ("Solsystemet")
- `bookmark_id`
- `title`
- `i2p_address`
- `category`
- `orbit_index` (for visuell plassering)
- `created_at`
- `updated_at`
- `tags[]`

## 4.3 Settings
- `theme_mode`
- `privacy_level`
- `routing_profile`
- `kill_switch_armed` (bool)

## 4.4 Sync-log
- `entry_id`
- `entity_type` (`bookmark` | `settings`)
- `entity_id`
- `op` (`upsert` | `delete`)
- `lamport_clock`
- `author_device_id`
- `signature`

---

## 5) API-kontrakter mellom UI og Rust Core (lokal bridge)

## 5.1 Node lifecycle
- `core.node.bootstrap() -> { status, i2p_version }`
- `core.node.status() -> { online, peers, bandwidth, tunnels }`
- `core.node.shutdown() -> { ok }`

## 5.2 Pairing
- `core.pairing.generateInvite() -> { qr_payload, expires_at }`
- `core.pairing.acceptInvite(qr_payload) -> { paired_device }`
- `core.pairing.listDevices() -> Device[]`
- `core.pairing.revoke(device_id) -> { ok }`

## 5.3 Sync
- `core.sync.push() -> { sent, conflicts }`
- `core.sync.pull() -> { received, conflicts }`
- `core.sync.resolve(conflict_id, strategy) -> { ok }`

## 5.4 Privacy / Kill switch
- `core.privacy.armSingularity() -> { armed: true }`
- `core.privacy.triggerSingularity() -> { wiped, restarted }`

---

## 6) Faseplan (implementasjon)

## Fase 1 – Kjerneinfrastruktur
1. **Ett-klikks I2P-ruter**
   - Rust `I2PManager`:
     - detect OS
     - hente/validere I2P binaries
     - første-gangs konfig
     - bakgrunnsoppstart
   - Persist status + health checks

2. **Desktop hjemmebase + mobil speider**
   - Device role policy
   - Desktop gateway tunnel service
   - Mobil klient som proxier via desktop tunnel

3. **Sikker tunnel-bro**
   - Mutual auth med device keys
   - Session keys (ephemeral)
   - Replay protection (nonce/timestamp)

4. **Serverløs P2P sync**
   - CRDT/operasjonslogg-light
   - Signerte updates
   - Konfliktløsing (LWW + manuell override ved behov)

5. **QR-autentisering**
   - QR payload med ephemeral pubkey + invite token + expiry
   - Pairing handshake og capability grant
   - Persist trusted device profile

## Fase 2 – Tema + karantene-nettleser
- Global sci-fi theme tokens
- Isolert webview policy:
  - blokkere eksterne scripts der mulig
  - blokkere WebRTC leaks
  - isolert cookie/storage scope

## Fase 3 – Stjernekartet
- Nettverksdashboard + node-visualisering
- "Kosmisk Energi" health meter
- Trafikk-animasjoner + rute-modal

## Fase 4 – Teleskopet
- Katalog som stjernesystemer
- Dynamisk "tyngdekraft"-søk
- Drag-and-drop bokmerke-orbits
- Adressebok-abonnement med tillitsindikator

## Fase 5 – Singularitet-knappen
- 2-sekunders long-press + haptics
- Visuell forvrengning til singularitet
- Hard kill av tunneler, nøkkel/cacherens
- 1 sekund blackout, deretter ren restart

---

## 7) Sikkerhetskrav (minimum)
- Ed25519 identitetsnøkler per enhet
- X25519 session key exchange for tunneler
- AES-GCM for lokal sensitiv data
- Nøkkelmateriale i OS secure enclave/keystore når tilgjengelig
- Minimering av metadata i logger
- "Secure by default": mest restriktive profil aktiv ved installasjon

---

## 8) UI-komponentkart (første leveranse)
- `NebulaThemeProvider`
- `StarfieldBackground`
- `CosmicHealthCore`
- `TrafficConstellationOverlay`
- `EepsiteSystemMap`
- `GravitySearchPanel`
- `OrbitBookmarkDock`
- `AddressBookStationCard`
- `SingularityButton`

---

## 9) Leveranse-artefakter neste steg
I neste steg opprettes:
1. Repo-struktur (`apps/mobile`, `apps/desktop-shell`, `core/rust`, `docs`)
2. Rust core skeleton med moduler:
   - `i2p_manager.rs`
   - `tunnel_bridge.rs`
   - `pairing.rs`
   - `sync_engine.rs`
   - `privacy_wipe.rs`
3. React Native app skeleton med screen-ruter:
   - Dashboard (Stjernekart)
   - Telescope
   - Settings
   - Pairing
4. Kontraktfiler (`/contracts`) for typed bridge API

---

## 10) Definisjon av "done" for Phase 0/1
- Kan starte I2P node via ett kall
- Kan vise node status i UI
- Kan generere QR invite
- Kan pare minst én mobil/desktop i lokal test
- Kan sync’e én bookmark-entity P2P
- Kan trigge "Singularity" som stopper node + renser volatile state
