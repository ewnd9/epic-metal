import { app, BrowserWindow, ipcMain } from 'electron';
import { getCache, setCache } from './cache';
import { getJira, config } from './api';

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
  });

  win.loadFile('dist/renderer/index.html');
  win.webContents.openDevTools();

  ipcMain.handle('get-cache', async (event, someArgument) => {
    let result = getCache();

    if (!result) {
      ({ result } = await getJira());
      setCache(result);
    }

    return { result, config };
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
