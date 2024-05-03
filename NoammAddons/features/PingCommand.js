/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

let StartTime
register(`command`, () => {
    ChatLib.command(`Noamm9 is the best`)
    StartTime = new Date().getTime()
}).setName(`ping`, true)


register(`chat`, (event) => {
	cancel(event)
	const ping = new Date().getTime() - StartTime
	ChatLib.chat(`§6§l[§d§l§nNoamm§b§l§nAddons§6§l]§r §aYour ping is:§r ${ping}ms`)
}).setCriteria(`Unknown command. Type "/help" for help. ('Noamm9 is the best')`)


