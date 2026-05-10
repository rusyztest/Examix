import {getLobby,saveLobby,saveResult,getUserId} from './storage.js';
import {scoreAnswer,summarize} from './scoring.js';
export const answerKey = {
A1:'234',A2:'24',A3:'125',A4:'45',A5:'12',A6:'123',A7:'234',A8:'13',A9:'145',A10:'34',A11:'135',A12:'35',A13:'15',A14:'345',A15:'145',A16:'245',A17:'45',A18:'35',
B1:'34',B2:'театры',B3:'ласкающими',B4:'исполнении',B5:'обадал',B6:'всей',B7:'34',B8:'называть',B9:'согласование',B10:'шапчонка',B11:'ветреный',B12:'необъятном',B13:'124',B14:'25',B15:'расстроишься',B16:'24',B17:'пламени',B18:'125',B19:'А1Б1В2Г3',B20:'А1Б3В2Г3',B21:'А1Б6В5Г3',B22:'А1Б5В6Г4'
};
export function getTaskIds(mode){const all=Object.keys(answerKey);if(mode==='partA')return all.filter(k=>k.startsWith('A'));if(mode==='partB')return all.filter(k=>k.startsWith('B'));return all;}
export function finishGame(code,nickname,answers){const lobby=getLobby(code);const tasks=getTaskIds(lobby.mode);const results=tasks.map(id=>{const correct=answerKey[id];const user=(answers[id]||'').trim();const points=scoreAnswer(correct,user);return {id,user,correct,points};});
const sum=summarize(results,lobby.mode==='all');const userId=getUserId();const p=lobby.players.find(x=>x.userId===userId);if(p)p.finished=true;lobby.answers[userId]=results;saveLobby(lobby);saveResult(code,{nickname,userId,results,summary:sum});return {results,summary:sum};}
