import type { ReactNode } from "react";

export type PresenterPhase = "idle" | "connecting" | "live" | "error";

export interface SessionCredentials {
  sessionId: string;
  serverUrl: string;
  token: string;
  roomName: string;
}

export interface PresenterHandle {
  isAvailable: boolean;
  phase: PresenterPhase;
  error: string | null;
  credentials: SessionCredentials | null;
  start: () => Promise<void>;
  stop: () => void;
}

const exportedPresenterHandle: PresenterHandle = {
  isAvailable: false,
  phase: "idle",
  error: null,
  credentials: null,
  async start() {},
  stop() {},
};

export function usePresenterPlugin(localName: string): PresenterHandle {
  void localName;
  return exportedPresenterHandle;
}

export function PresenterRoom(props: {
  credentials: SessionCredentials;
  children?: ReactNode;
  onEnded?: () => void;
  onError?: (err: Error) => void;
}): null {
  void props;
  return null;
}

export function AvatarVideo(props: Record<string, unknown>): null {
  void props;
  return null;
}

export function useAvatarSession(): never {
  throw new Error("Presenter is not available in exported projects");
}

export function useLocalMedia(): never {
  throw new Error("Presenter is not available in exported projects");
}
