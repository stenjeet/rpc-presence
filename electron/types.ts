export type Presence = {
	clientId: string,
	details: string,
	state: string,
	largeImageKey: string,
	largeImageText: string,
};

export type RpcStatus = 'Idle' | 'Connecting' | 'Connected' | 'Error';