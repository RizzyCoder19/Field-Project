const FACE_HASH_PREFIX = "face-";

export function faceIdToHash(id: string): string {
  if (id.startsWith(FACE_HASH_PREFIX)) return id;
  return `${FACE_HASH_PREFIX}${id}`;
}

export function getFaceIdFromHash(knownFaceIds?: string[]): string | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.replace(/^#/, "");
  if (!hash) return null;

  if (knownFaceIds && knownFaceIds.length > 0) {
    const match = knownFaceIds.find((id) => faceIdToHash(id) === hash);
    if (match) return match;
    return null;
  }

  if (!hash.startsWith(FACE_HASH_PREFIX)) return null;
  const stripped = hash.slice(FACE_HASH_PREFIX.length);
  return stripped || null;
}

export function setFaceIdInHash(
  faceId: string | null,
  options: { silent?: boolean } = {},
): void {
  if (typeof window === "undefined") return;
  const nextHash = faceId ? `#${faceIdToHash(faceId)}` : "";
  if (window.location.hash === nextHash) return;

  const url = new URL(window.location.href);
  url.hash = nextHash;
  window.history.replaceState(null, "", url.toString());

  if (!options.silent) {
    window.dispatchEvent(new Event("hashchange"));
  }
}
