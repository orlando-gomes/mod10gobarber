import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.105:3333',
});

export default api;

/*
baseURL: 'http://localhost:3333', IOS
baseURL: 'http://192.168.0.106:3333', Android USB
baseURL: 'http://10.0.2.2:3333', Android - Emulador do Android studio
baseURL: 'http://10.0.3.2:3333', Android - Emulador do Genymotion
*/
