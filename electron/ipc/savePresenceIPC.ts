import { ipcMain } from "electron";
import { savePresenceService } from "../services/savePresence";
import { Presence } from "../types";



export function savePresenceIPC() {
	ipcMain.on('save-presence', (_, newPresence: Partial<Presence>) => savePresenceService(newPresence));
};