/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import { ModMessage } from "../utils"

register(`command`, () => {
	const Chat = register(`chat`, (event) => {
		cancel(event)
		const ping = new Date().getTime() - StartTime
		ModMessage(`§aYour ping is:§r ${ping}ms`)
	}).setCriteria(`Unknown command. Type "/help" for help. ('Noamm9 is the best')`)
	const StartTime = new Date().getTime()
	ChatLib.command(`Noamm9 is the best`)
	Chat.unregister()
}).setName(`ping`, true)




