/// <reference types="vite-plugin-electron/electron-env" />

import { Presence, RpcStatus } from './types';



declare namespace NodeJS {
	interface ProcessEnv {
    	APP_ROOT: string
    	VITE_PUBLIC: string
	}
}

declare global {
	interface Window {
		electronAPI: {
      		getPresence: () => Promise<Presence>;
      		savePresence: (data: Partial<Presence>) => void;
			resetPresence: () => void;
			openLink: (url: string) => Promise<void>
			initDiscord: () => void;
			getRpcStatus: () => Promise<RpcStatus>;
    	};
  	}
}

export {};