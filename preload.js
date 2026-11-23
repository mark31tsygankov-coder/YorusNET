// Preload: изоляция. Можно расширить API позже (уведомления и т.д.)
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('yorusDesktop', {
  platform: process.platform,
  version: '6.0.5'
});
