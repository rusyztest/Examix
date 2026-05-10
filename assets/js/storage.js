export const KEY_PREFIX = 'examix_lobby_';
const RESULTS_PREFIX = 'examix_results_';
export const CREATOR_KEY = 'examix_creator_id';
export const USER_KEY = 'examix_user_id';

export function normalizeCode(value = '') {
  return String(value).trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
}

export function getUserId() {
  let id = localStorage.getItem(USER_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(USER_KEY, id);
  }
  return id;
}

export function saveLobby(lobby) {
  const code = normalizeCode(lobby.code);
  localStorage.setItem(KEY_PREFIX + code, JSON.stringify({ ...lobby, code }));
}

export function getLobby(code) {
  const normalized = normalizeCode(code);
  if (!normalized) return null;
  const direct = localStorage.getItem(KEY_PREFIX + normalized);
  if (direct) return JSON.parse(direct);
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key || !key.startsWith(KEY_PREFIX)) continue;
    const candidate = key.slice(KEY_PREFIX.length);
    if (normalizeCode(candidate) === normalized) {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    }
  }
  return null;
}

export function saveResult(code, payload) {
  const normalized = normalizeCode(code);
  const key = RESULTS_PREFIX + normalized;
  const data = JSON.parse(localStorage.getItem(key) || '[]').filter((item) => Date.now() - item.savedAt < 7 * 24 * 3600 * 1000);
  data.push({ ...payload, savedAt: Date.now() });
  localStorage.setItem(key, JSON.stringify(data));
}

export function getResults(code) {
  const normalized = normalizeCode(code);
  const key = RESULTS_PREFIX + normalized;
  return JSON.parse(localStorage.getItem(key) || '[]').filter((item) => Date.now() - item.savedAt < 7 * 24 * 3600 * 1000);
}
