import { ipcMain } from "electron";
import { getPresenceService } from "../services/getPresenceService";



export function getPresenceIPC() {
	ipcMain.handle('get-presence', () => getPresenceService());
}