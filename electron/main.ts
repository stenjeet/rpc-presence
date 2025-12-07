import { app, BrowserWindow } from 'electron';
import path from 'node:path';

import { PRELOAD_PATH, RENDERER_DIST, VITE_DEV_SERVER_URL } from './paths';



let win: BrowserWindow | null;

function createWindow() {
 	 win = new BrowserWindow({
		width: 350,
		height: 500,
		resizable: false,
		fullscreenable: false,
    	webPreferences: {
      		preload: PRELOAD_PATH,
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
}

app.on('window-all-closed', () => {
  	if (process.platform !== 'darwin') {
    	app.quit();
    	win = null;
  	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
  	}
});

app.whenReady().then(createWindow);




