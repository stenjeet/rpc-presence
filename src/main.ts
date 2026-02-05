import { Presence } from '../electron/types';
import './style.css';



const clientIdInput = document.getElementById('clientIdInput') as HTMLInputElement;
const detailsInput = document.getElementById('detailsInput') as HTMLInputElement;
const stateInput = document.getElementById('stateInput') as HTMLInputElement;
const imageKeyInput = document.getElementById('imageKeyInput') as HTMLInputElement;
const imageTextInput = document.getElementById('imageTextInput') as HTMLInputElement;
const button = document.getElementById('button') as HTMLButtonElement;
const githubLink = document.getElementById('github-link') as HTMLLinkElement;
const rpcStatus = document.getElementById('status') as HTMLDivElement;


window.electronAPI.getPresence().then((data: Presence) => {
	clientIdInput.value = data.clientId;
	detailsInput.value = data.details;
	stateInput.value = data.state;
	imageKeyInput.value = data.largeImageKey;
	imageTextInput.value = data.largeImageText;
});


clientIdInput.addEventListener('input', () => {
	window.electronAPI.savePresence({clientId: clientIdInput.value})
});

detailsInput.addEventListener('input', () => {
	window.electronAPI.savePresence({details: detailsInput.value})
});

stateInput.addEventListener('input', () => {
	window.electronAPI.savePresence({state: stateInput.value})
});

imageKeyInput.addEventListener('input', () => {
	window.electronAPI.savePresence({largeImageKey: imageKeyInput.value})
});

imageTextInput.addEventListener('input', () => {
	window.electronAPI.savePresence({largeImageText: imageTextInput.value})
});

button.addEventListener('click', () => {
	window.electronAPI.initDiscord();
});

githubLink.addEventListener('click', (event) => {
	event.preventDefault()
	window.electronAPI.openLink(githubLink.href);
});


setInterval(async () => {
	const rpcState = await window.electronAPI.getRpcStatus();

	rpcStatus.textContent = rpcState;

	rpcStatus.classList.remove(
		'Idle',
		'Connecting',
		'Connected',
		'Error'
	);

	rpcStatus.classList.add(rpcState);
}, 500);