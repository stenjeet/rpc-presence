import './style.css';



window.ipcRenderer.on('main-process-message', (_event, message) => {
	console.log(message)
})
