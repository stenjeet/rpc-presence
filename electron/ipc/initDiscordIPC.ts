import { ipcMain } from "electron";
import { getRpcStatus, initDiscord } from "../services/discordService";



export function initDiscordIPC() {
	ipcMain.on('init-discord', () => initDiscord());
	ipcMain.handle('get-rpc-status', getRpcStatus);
};