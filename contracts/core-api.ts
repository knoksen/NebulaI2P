export type DeviceRole = "desktop" | "mobile";

export interface NodeStatus {
  online: boolean;
  peers: number;
  bandwidthKbps: number;
  tunnels: number;
}

export interface InvitePayload {
  token: string;
  expiresAtUnix: number;
}

export interface PairedDevice {
  deviceId: string;
  deviceName: string;
  role: DeviceRole;
  trustLevel: number;
}

export interface SyncResult {
  sent: number;
  received: number;
  conflicts: number;
}

export interface WipeResult {
  tunnelsTerminated: boolean;
  volatileMemoryWiped: boolean;
  tempKeysDeleted: boolean;
  cacheCleared: boolean;
  blackoutMs: number;
}

export interface CoreApi {
  node: {
    bootstrap(): Promise<NodeStatus>;
    status(): Promise<NodeStatus>;
    shutdown(): Promise<void>;
  };
  pairing: {
    generateInvite(): Promise<InvitePayload>;
    acceptInvite(token: string, deviceName: string, role: DeviceRole): Promise<PairedDevice>;
  };
  sync: {
    push(): Promise<SyncResult>;
    pull(): Promise<SyncResult>;
    resolveConflict(conflictId: string, strategy: string): Promise<void>;
  };
  privacy: {
    triggerSingularity(): Promise<WipeResult>;
  };
}
