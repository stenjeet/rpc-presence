import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { EMPTY_PRESENCE } from '../../../electron/types';
import type { Presence } from '../../../electron/types';
import styles from './Settings.module.scss';


const PRESENCE_FIELDS: Array<{ key: keyof Presence; label: string; hint: string }> = [
	{ key: 'clientId', label: 'Client ID', hint: 'Required' },
	{ key: 'details', label: 'Details', hint: 'Line 1' },
	{ key: 'state', label: 'State', hint: 'Line 2' },
	{ key: 'largeImageKey', label: 'Image key', hint: 'Asset name' },
	{ key: 'largeImageText', label: 'Image text', hint: 'On hover' },
];

function Settings() {
	const [presence, setPresence] = useState<Presence>(EMPTY_PRESENCE);

	useEffect(() => {
		let active = true;

		window.electronAPI.getPresence().then((data) => {
			if (active) setPresence({ ...EMPTY_PRESENCE, ...data });
		});

		return () => {
			active = false;
		};
	}, []);

	const handleFieldChange = (key: keyof Presence) => (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		setPresence((prev) => ({ ...prev, [key]: value }));
		window.electronAPI.savePresence({ [key]: value } as Partial<Presence>);
	};

	return (
		<div className={styles.settings}>
			{PRESENCE_FIELDS.map(({ key, label, hint }) => (
				<div className={styles.field} key={key}>
					<div className={styles.labelRow}>
						<span className={styles.label}>{label}</span>
						<span className={styles.hint}>{hint}</span>
					</div>
					<input
						className={styles.input}
						type="text"
						value={presence[key]}
						onChange={handleFieldChange(key)}
					/>
				</div>
			))}
		</div>
	);
}

export default Settings;
