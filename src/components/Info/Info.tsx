import type { MouseEvent } from 'react';
import styles from './Info.module.scss';


function Info() {
	const handleGithubClick = (event: MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		window.electronAPI.openLink(event.currentTarget.href);
	};

	return (
		<div className={styles.info}>
			<p className={styles.author}>Developed by stenjeet</p>
			<a
				className={styles.link}
				href="https://github.com/stenjeet/rpc-presence"
				onClick={handleGithubClick}
			>
				GitHub Repository
			</a>
		</div>
	);
}

export default Info;
