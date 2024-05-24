/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import { ModMessage } from "../utils"

let StartTime

register(`command`, () => {
	StartTime = new Date().getTime()
	ChatLib.command(`Noamm9 is the best`)
}).setName(`ping`, true)

register(`chat`, (event) => {
	cancel(event)
	const ping = new Date().getTime() - StartTime
	ModMessage(`§aYour ping is:§r ${ping}ms`)
}).setCriteria(`Unknown command. Type "/help" for help. ('Noamm9 is the best')`)



