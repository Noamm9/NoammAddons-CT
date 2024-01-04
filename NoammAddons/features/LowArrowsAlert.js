/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Settings";

register('chat', (event) => {
	if (Settings.ArrowsAlert) {
		let formattedMessage = ChatLib.getChatMessage(event, true)
		if (formattedMessage.includes("&r&cYou only have 50 &r&fFlint Arrow &r&cleft in your Quiver!&r")) {
			Client.showTitle("&c50 Arrows!", "", 1, 30, 1)
		}
	}
})

register('chat', (event) => {
	if (Settings.ArrowsAlert) {
		let formattedMessage = ChatLib.getChatMessage(event, true)
		if (formattedMessage.includes("&r&cYou only have 10 &r&fFlint Arrow &r&cleft in your Quiver!&r")) {
			Client.showTitle("&c10 Arrows!", "", 1, 30, 1)
		}
	}
})

register('chat', (event) => {
	if (Settings.ArrowsAlert) {
		let formattedMessage = ChatLib.getChatMessage(event, true)
		if (formattedMessage.includes("&r&cYou don't have any more &r&fFlint Arrow &r&cleft in your Quiver!&r")) {
			Client.showTitle("&cNo Arrows!", "", 1, 30, 1)
		}
	}
})