import { ipcRenderer, shell } from 'electron';

export async function getCache() {
  return ipcRenderer.invoke('get-cache', {
    message: 'hello',
  });
}

export function openInExternalBrowser(url: string) {
  shell.openExternal(url);
}
