/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Config/Settings";


const Critaria = [
	"&r&cYou only have 50 &r&fFlint Arrow &r&cleft in your Quiver!&r",
	"&r&cYou only have 10 &r&fFlint Arrow &r&cleft in your Quiver!&r",
	"&r&cYou don't have any more &r&fFlint Arrow &r&cleft in your Quiver!&r"
]


register('chat', (event) => {
	if (Settings.ArrowsAlert) return
	for (let i = 0; i<Critaria.length; i++) {
		const formattedMessage = ChatLib.getChatMessage(event, true)
		if (formattedMessage.startsWith(Critaria[i])) {
			Client.showTitle("&cRefill Arrows!", "", 1, 30, 1)
		}
	}
})
