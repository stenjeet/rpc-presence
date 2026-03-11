import path from "node:path";
import { fileURLToPath } from "node:url";



const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const APP_ROOT = path.join(__dirname, '..');
process.env.APP_ROOT = APP_ROOT;

export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');
export const PRELOAD_PATH = path.join(MAIN_DIST, 'preload.mjs');
export const PUBLIC_PATH = path.join(process.env.APP_ROOT, 'public');

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];

export const IS_DEV = !!VITE_DEV_SERVER_URL;


export const ICON_PATH = IS_DEV
	? path.join(PUBLIC_PATH, 'AppIcon512.ico')
	: path.join(RENDERER_DIST, 'AppIcon512.ico');