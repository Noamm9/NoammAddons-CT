/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Settings";


register(`chat`, (e, name) => {
    if (!Settings.AnnounceSpiritLeaps) return
    let messege = ChatLib.getChatMessage(e, false)
    if (messege.includes(`You have teleported to `)) { //You have teleported to Noamm9!
        name = messege.replace(`You have teleported to `, "").replace(`!`, "")
        ChatLib.command(`pc I TP to ${name}`, false)
    }
})