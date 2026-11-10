import { useEffect, useState } from 'react';
import type { ChangeEvent, MouseEvent } from 'react';
import type { Presence, RpcStatus } from '../electron/types';

const EMPTY_PRESENCE: Presence = {
	clientId: '',
	details: '',
	state: '',
	largeImageKey: '',
	largeImageText: '',
};

const PRESENCE_FIELDS: Array<{ key: keyof Presence; label: string }> = [
	{ key: 'clientId', label: 'Enter Client ID:' },
	{ key: 'details', label: 'Details:' },
	{ key: 'state', label: 'State:' },
	{ key: 'largeImageKey', label: 'Image Key:' },
	{ key: 'largeImageText', label: 'Image Text:' },
];

export function App() {
	const [presence, setPresence] = useState<Presence>(EMPTY_PRESENCE);
	const [status, setStatus] = useState<RpcStatus>('Idle');

	useEffect(() => {
		let active = true;

		window.electronAPI.getPresence().then((data) => {
			if (active) setPresence(data);
		});

		return () => {
			active = false;
		};
	}, []);

	useEffect(() => {
		let active = true;

		const interval = setInterval(async () => {
			const nextStatus = await window.electronAPI.getRpcStatus();
			if (active) setStatus(nextStatus);
		}, 500);

		return () => {
			active = false;
			clearInterval(interval);
		};
	}, []);

	const handleFieldChange = (key: keyof Presence) => (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		setPresence((prev) => ({ ...prev, [key]: value }));
		window.electronAPI.savePresence({ [key]: value } as Partial<Presence>);
	};

	const handleGithubClick = (event: MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		window.electronAPI.openLink(event.currentTarget.href);
	};

	return (
		<div id="app">
			<div className="rpc-settings">
				{PRESENCE_FIELDS.map(({ key, label }) => (
					<div className="rpc-settings__field" key={key}>
						<p className="rpc-settings__title">{label}</p>
						<input
							className="rpc-settings__input"
							type="text"
							required
							value={presence[key]}
							onChange={handleFieldChange(key)}
						/>
					</div>
				))}
			</div>

			<div className="status">
				<div id="status-div">Status: <span id="status" className={status}>{status}</span></div>
				<button className="button" onClick={() => window.electronAPI.initDiscord()}>
					Connect
				</button>
			</div>

			<div className="info">
				<p className="info__author">Developed by stenjeet</p>
				<a id="github-link" href="https://github.com/stenjeet/rpc-presence" onClick={handleGithubClick}>
					GitHub Repository
				</a>
			</div>
		</div>
	);
}
