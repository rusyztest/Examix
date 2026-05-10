import { getLobby, saveLobby, getUserId, CREATOR_KEY, normalizeCode } from './storage.js';

export function createLobby({ timeLimit, maxPlayers, mode }) {
  const code = normalizeCode(Math.random().toString(36).slice(2, 8));
  const creatorId = getUserId();
  localStorage.setItem(CREATOR_KEY, creatorId);
  const lobby = { code, creatorId, timeLimit: Number(timeLimit), maxPlayers: Number(maxPlayers), mode, createdAt: Date.now(), started: false, players: [], answers: {} };
  saveLobby(lobby);
  return lobby;
}

export function joinLobby(code, nickname) {
  const normalizedCode = normalizeCode(code);
  const cleanedNick = String(nickname || '').trim();
  const lobby = getLobby(normalizedCode);
  if (!lobby) return { error: 'Неверный код' };
  if (Date.now() - lobby.createdAt > 24 * 3600 * 1000) return { error: 'Лобби истекло' };
  if (lobby.players.length >= lobby.maxPlayers) return { error: 'Лобби переполнено' };
  if (!cleanedNick) return { error: 'Введите ник' };
  if (lobby.players.some((p) => p.nickname.toLowerCase() === cleanedNick.toLowerCase())) return { error: 'Ник уже занят' };
  const userId = getUserId();
  if (!lobby.players.some((p) => p.userId === userId)) {
    lobby.players.push({ userId, nickname: cleanedNick, joinedAt: Date.now(), finished: false });
    saveLobby(lobby);
  }
  return { lobby };
}

export function startLobby(code) {
  const lobby = getLobby(code);
  if (!lobby) return null;
  lobby.started = true;
  lobby.startedAt = Date.now();
  saveLobby(lobby);
  return lobby;
}
