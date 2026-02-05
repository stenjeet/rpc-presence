# rpc-presence

**RPC Presence** is a small Electron desktop app for manually managing Discord Rich Presence via the official RPC API.

> This app **does not use Discord user tokens**.  
> All actions are performed through your **Application Client ID** from the Discord Developer Portal.


## Features

- Manual Rich Presence configuration  
- Start RPC with a button  
- Instant saving of settings  
- Displays connection status (idle / connecting / connected / error)  
- Safe & ToS-compliant  


## Installation

1. Go to the [Releases](https://github.com/stenjeet/rpc-presence/releases) section and download the version for your OS.  
2. Make sure **Discord is running** on your computer.  
3. Run the application.

## Setting up a Discord Application

To use Rich Presence, you need a Discord Application:

1. Open [Discord Developer Portal](https://discord.com/developers/applications)  
2. Click **New Application** → enter a name → **Create**  
3. Go to **General Information** → copy the **Application ID**  
   This is your `Client ID` to insert into the app.


## Setting up Images (Assets)

To display images in your presence:

1. Go to **Rich Presence → Art Assets** in your Discord Application  
2. Upload your images  
3. Remember the **Key** (name without extension)  

Example:  
- Image Key: `image_key`  
- Image Text: `image_text`  


## Usage

1. Paste your **Client ID**  
2. Fill in other fields (Details, State, Large Image Key/Text)  
3. Click **Start RPC**  
4. Status will change to `connected`  
5. Your Rich Presence will appear on your Discord profile  


## Status indicators

| Status | Meaning |
|--------|---------|
| idle | RPC is not running |
| connecting | Connecting to Discord |
| connected | Successfully connected |
| error | Error (usually invalid Client ID) |


##  Security

- ❌ Does **not** use Discord user tokens  
- ❌ Does **not** read personal data  
- ❌ Does **not** send data to third-party servers  
- ✅ Uses only the official Discord RPC API  


##  Data Storage

Settings are stored locally using `electron-store`.  

> Note: When updating the app, old settings may persist.  
> Future versions may include versioned reset functionality.


## Troubleshooting

**RPC does not connect:**  
- Make sure Discord is **running**  
- Check that the Client ID is correct  
- Ensure the application exists in the Developer Portal  

**Images do not show:**  
- Image Key must **exactly match** the key in Discord Art Assets  
- Only assets uploaded in your application are supported  

## Technologies

- Electron  
- TypeScript  
- discord-rpc  
- electron-store  


## ⚠️ Disclaimer

This is an unofficial tool.  
The project is **not affiliated with Discord Inc.**  
Use at your own risk.