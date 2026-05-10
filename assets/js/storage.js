export const KEY_PREFIX = 'examix_lobby_';
const RESULTS_PREFIX = 'examix_results_';
export const CREATOR_KEY = 'examix_creator_id';
export const USER_KEY = 'examix_user_id';
export function getUserId(){let id=localStorage.getItem(USER_KEY);if(!id){id=crypto.randomUUID();localStorage.setItem(USER_KEY,id);}return id;}
export function saveLobby(lobby){localStorage.setItem(KEY_PREFIX+lobby.code,JSON.stringify(lobby));}
export function getLobby(code){const v=localStorage.getItem(KEY_PREFIX+code.toUpperCase());return v?JSON.parse(v):null;}
export function saveResult(code, payload){const key=RESULTS_PREFIX+code.toUpperCase();const data=JSON.parse(localStorage.getItem(key)||'[]').filter(i=>Date.now()-i.savedAt<7*24*3600*1000);data.push({...payload,savedAt:Date.now()});localStorage.setItem(key,JSON.stringify(data));}
export function getResults(code){return JSON.parse(localStorage.getItem(RESULTS_PREFIX+code.toUpperCase())||'[]').filter(i=>Date.now()-i.savedAt<7*24*3600*1000)}
