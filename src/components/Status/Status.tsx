import { useEffect, useState } from 'react';
import type { RpcStatus } from '../../../electron/types';
import styles from './Status.module.scss';


function Status() {
	const [status, setStatus] = useState<RpcStatus>('Idle');

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

	return (
		<div className={styles.status}>
			<div className={styles.text}>
				Status: <span className={styles.value} data-status={status}>{status}</span>
			</div>
			<button className={styles.button} onClick={() => window.electronAPI.initDiscord()}>
				Connect
			</button>
		</div>
	);
}

export default Status;
