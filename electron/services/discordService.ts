import RPC from 'discord-rpc';
import { Presence, RpcStatus } from '../types';
import Store from 'electron-store';



const store = new Store();
let client: RPC.Client;
let status: RpcStatus = 'Idle';


export async function initDiscord() {

	const presence = store.get('presence') as Presence;

	if (!presence?.clientId) {
		status = 'Error';
		console.warn('Client ID is missing');
		return;
	}

	status = 'Connecting';

	try {
		client = new RPC.Client({ transport: 'ipc' });
		await client.login({ clientId: presence.clientId});
		console.log('Discord RPC ready');
		client.setActivity(presence)
		status = 'Connected';
	} catch (err) {
		console.error('Discord RPC login failed', err);
		status = 'Error';
	}
};


export function setActivity(presence: Presence) {
	if (!client) {
		throw new Error('Discord client is not initialized');
	}

	client.setActivity(presence);
};


export function getRpcStatus(): RpcStatus {
	return status;
};