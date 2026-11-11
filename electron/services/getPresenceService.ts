import Store from 'electron-store';
import { EMPTY_PRESENCE, Presence } from '../types';



const store = new Store<{ presence?: Partial<Presence> }>();


export function getPresenceService(): Presence {
	const savedPresence = store.get('presence');

	return { ...EMPTY_PRESENCE, ...savedPresence };
};
