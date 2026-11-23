# Yorus — Windows

Десктопное приложение мессенджера Yorus для Windows.  
Тот же дизайн, чаты и звонки, что в веб-версии.

## Быстрый старт (на своём ПК)

```bash
# 1. Нужны Node.js 18+ и npm
# https://nodejs.org

# 2. Установка
npm install

# 3. Запуск
npm start

# 4. Сборка .exe (установщик + portable)
npm run dist:win
```

Готовые файлы появятся в папке `dist/`:
- `Yorus-6.0.5-win-x64.exe` — установщик
- `Yorus-6.0.5-portable.exe` — без установки

## Сборка через GitHub Actions

1. Создай репозиторий на GitHub
2. Залей эту папку
3. Actions → workflow **Build Windows** запустится сам (или вручную)
4. В **Artifacts** скачай `.exe`

Файл workflow уже лежит в `.github/workflows/build-windows.yml`.

## Адрес сервера

По умолчанию открывается:

```
https://yorus.alwaysdata.net/app.html
```

Сменить можно:
- в `main.js` константа `MESSENGER_URL`
- или переменная окружения: `YORUS_URL=https://твой-сайт/app.html npm start`

## Звонки

Разрешения камеры и микрофона запрашиваются автоматически.  
WebRTC работает так же, как в браузере.

## Версия

- 6.0.5  
- appId: `com.yorus.messenger`
