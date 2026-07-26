<div align="center">

# 🌌 NebulaI2P
### *A sci-fi inspired, privacy-first, user-friendly I2P experience*

[![Rust](https://img.shields.io/badge/Core-Rust-000000?style=for-the-badge&logo=rust)](core/rust/)
[![React Native](https://img.shields.io/badge/UI-React_Native-20232A?style=for-the-badge&logo=react)](apps/mobile/)
[![Web](https://img.shields.io/badge/Star_Map-Web-0ea5e9?style=for-the-badge&logo=googlechrome)](apps/star-map-web/)
[![I2P](https://img.shields.io/badge/Network-I2P-7c3aed?style=for-the-badge)](https://geti2p.net/)
[![Status](https://img.shields.io/badge/Phase-Foundation-orange?style=for-the-badge)](docs/NEBULA_MASTER_PLAN.md)

<br/>

[![Open Master Plan](https://img.shields.io/badge/Open-Master%20Plan-111827?style=for-the-badge&logo=readthedocs)](docs/NEBULA_MASTER_PLAN.md)
[![Desktop Shell](https://img.shields.io/badge/Open-Desktop%20Shell-0f766e?style=for-the-badge&logo=electron)](apps/desktop-shell/README.md)
[![Mobile App](https://img.shields.io/badge/Open-Mobile%20Screens-1d4ed8?style=for-the-badge&logo=react)](apps/mobile/src/screens/)
[![Rust Core](https://img.shields.io/badge/Open-Rust%20Core-7f1d1d?style=for-the-badge&logo=rust)](core/rust/src/)
[![Contracts](https://img.shields.io/badge/Open-Contracts-4c1d95?style=for-the-badge&logo=typescript)](contracts/)
[![Roadmap TODO](https://img.shields.io/badge/Open-TODO-334155?style=for-the-badge&logo=todoist)](TODO.md)

</div>

---

## ✨ Vision

NebulaI2P aims to make anonymous networking feel **beautiful, intuitive, and powerful**:

- 🚀 One-click I2P startup
- 🖥️ Desktop as secure “homebase” node
- 📱 Mobile as paired scout client
- 🔐 QR-based cryptographic pairing
- 🔄 Serverless P2P sync
- 🌀 “Singularity Button” for privacy wipe / emergency reset
- 🌠 Cosmic, gamified interface (Star Map + Telescope metaphors)

---

## 🧱 Project Structure

```text
apps/
  desktop-shell/      # Desktop host scaffold (homebase runtime)
  mobile/             # React Native screens and app shell
  star-map-web/       # Web visualization playground
core/
  rust/               # Core engine: i2p, pairing, sync, tunnel, privacy
contracts/            # Typed contracts/events between UI and core
docs/
  NEBULA_MASTER_PLAN.md
TODO.md
```

---

## 🔭 Core Modules (Rust)

- `i2p_manager.rs` → Node lifecycle and bootstrap
- `tunnel_bridge.rs` → Secure tunnel bridging
- `pairing.rs` → Device invite, pairing, trust
- `sync_engine.rs` → Replication/sync logic
- `privacy_wipe.rs` → Singularity/privacy reset flow

---

## 📱 UI Surfaces

### Mobile Screens
- `DashboardScreen.tsx`
- `TelescopeScreen.tsx`
- `PairingScreen.tsx`
- `SettingsScreen.tsx`

### Desktop Shell
- Secure bridge host scaffold in `apps/desktop-shell/`

### Star Map Web
- Visual layer experiments in `apps/star-map-web/`

---

## 🧠 Architecture at a Glance

1. **UI Layer** (React Native / web views)
2. **Application Layer** (commands, policy, flows)
3. **Core Layer** (Rust modules)
4. **Infrastructure Layer** (process, storage, crypto, network)

See full details in:  
👉 [`docs/NEBULA_MASTER_PLAN.md`](docs/NEBULA_MASTER_PLAN.md)

---

## 🗺️ Roadmap Snapshot

- ✅ Foundation scaffolding
- 🟡 Node lifecycle + health checks
- 🟡 QR invite + trusted pairing
- 🟡 P2P sync for bookmarks/settings
- 🔜 Sci-fi theme expansion and visual polish
- 🔜 Singularity production hardening

Track active technical tasks in [`TODO.md`](TODO.md).

---

## 🤝 Contribution Flow

1. Fork / branch from `main`
2. Implement focused change
3. Keep contracts and docs in sync
4. Add/update TODO checkpoints
5. Submit PR with clear technical notes

---

## 🛡️ Security Principles

- Device identity keys per device
- Ephemeral session keys for tunnels
- Encrypted local sensitive data
- Minimal metadata logging
- Secure-by-default profiles

---

<div align="center">

### 🌌 *NebulaI2P — Privacy with gravity.*

</div>
