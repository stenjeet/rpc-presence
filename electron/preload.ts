import { ipcRenderer, contextBridge } from 'electron'
import { Presence, RpcStatus } from './types'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },
});


contextBridge.exposeInMainWorld('electronAPI', {
	getPresence: () => ipcRenderer.invoke('get-presence'),
	savePresence: (data: Partial<Presence>) => ipcRenderer.send('save-presence', data),
	resetPresence: () => ipcRenderer.send('reset-presence'),
	openLink: (url: string) => ipcRenderer.send('open-link', url),
	initDiscord: () => ipcRenderer.send('init-discord'),
	getRpcStatus: (): Promise<RpcStatus> => ipcRenderer.invoke('get-rpc-status')
});