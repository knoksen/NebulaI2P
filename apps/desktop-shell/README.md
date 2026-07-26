# Nebula Desktop Shell (Scaffold)

Denne mappen er et scaffold for desktop-hosten som skal:
- kjøre UI-skall for Nebula på desktop
- snakke med Rust core via en sikker lokal bridge
- fungere som "hjemmebase"-node for mobil speider-klienter

## Planlagt innhold
- `src/main` for app bootstrap
- `src/bridge` for IPC/FFI-lag mot Rust core
- `src/security` for policy og hardening

## Neste steg
- Velg desktop runtime (Tauri anbefalt)
- Implementer bridge-kontrakter definert i `contracts/`
- Koble lifecycle til Rust-moduler:
  - i2p_manager
  - tunnel_bridge
  - pairing
  - sync_engine
  - privacy_wipe
