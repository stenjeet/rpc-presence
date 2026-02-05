import Store from 'electron-store';
import { Presence } from '../types';



const store = new Store<{ presence?: Partial<Presence> }>();


export function savePresenceService(newPresence: Partial<Presence>): Partial<Presence> {

	const currentPresence = store.get('presence') ?? {};
	const presence = {...currentPresence, ...newPresence};
	store.set('presence', presence);

	return presence;
};