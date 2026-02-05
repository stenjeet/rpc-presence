import Store from 'electron-store';



const store = new Store();


export function getPresenceService() {
	const currentPresence = store.get('presence');
	return currentPresence;
};