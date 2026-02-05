import { app, BrowserWindow, Menu, } from 'electron';
import path from 'node:path';
import { ICON_PATH, PRELOAD_PATH, RENDERER_DIST, VITE_DEV_SERVER_URL } from './paths';
import { savePresenceIPC } from './ipc/savePresenceIPC';
import { getPresenceIPC } from './ipc/getPresenceIPC';
import { initDiscordIPC } from './ipc/initDiscordIPC';



let win: BrowserWindow | null;

function createWindow() {
 	 win = new BrowserWindow({
		width: 400,
		height: 460,
		resizable: false,
		fullscreenable: false,
		icon: ICON_PATH,
    	webPreferences: {
      		preload: PRELOAD_PATH,
			nodeIntegration: false,
			contextIsolation: true,
			devTools: false
    	},
  	});

  	win.webContents.on('did-finish-load', () => {
    	win?.webContents.send('main-process-message', (new Date).toLocaleString());
  	});

  	if (VITE_DEV_SERVER_URL) {
    	win.loadURL(VITE_DEV_SERVER_URL);
  	} else {
    	win.loadFile(path.join(RENDERER_DIST, 'index.html'));
	}	
};

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
  	}
});

async function startApp() {
	Menu.setApplicationMenu(null);
	createWindow();

	// IPC
	getPresenceIPC();
	savePresenceIPC();
	initDiscordIPC();
};

app.whenReady().then(startApp);