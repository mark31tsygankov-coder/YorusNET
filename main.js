const { app, BrowserWindow, shell, session, Menu, nativeTheme } = require('electron');
const path = require('path');

// Адрес мессенджера — поменяй при необходимости
const MESSENGER_URL = process.env.YORUS_URL || 'https://yorus.alwaysdata.net/app.html';

let mainWindow = null;

function createWindow() {
  nativeTheme.themeSource = 'dark';

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    backgroundColor: '#000000',
    title: 'Yorus',
    icon: path.join(__dirname, 'assets', 'icon.ico'),
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      spellcheck: false,
      // Нужно для getUserMedia / WebRTC
      webSecurity: true
    },
    show: false
  });

  // Разрешаем камеру и микрофон без лишних запросов ОС (WebRTC)
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    const allow = ['media', 'mediaKeySystem', 'geolocation', 'notifications'].includes(permission);
    callback(allow);
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.loadURL(MESSENGER_URL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Минимальное меню (только Edit для Ctrl+C/V)
function buildMenu() {
  const template = [
    {
      label: 'Yorus',
      submenu: [
        { role: 'reload', label: 'Обновить' },
        { role: 'forceReload', label: 'Жёсткое обновление' },
        { type: 'separator' },
        { role: 'toggleDevTools', label: 'Инструменты' },
        { type: 'separator' },
        { role: 'quit', label: 'Выйти' }
      ]
    },
    {
      label: 'Правка',
      submenu: [
        { role: 'undo', label: 'Отменить' },
        { role: 'redo', label: 'Повторить' },
        { type: 'separator' },
        { role: 'cut', label: 'Вырезать' },
        { role: 'copy', label: 'Копировать' },
        { role: 'paste', label: 'Вставить' },
        { role: 'selectAll', label: 'Выделить всё' }
      ]
    }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.whenReady().then(() => {
    buildMenu();
    createWindow();
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
}
