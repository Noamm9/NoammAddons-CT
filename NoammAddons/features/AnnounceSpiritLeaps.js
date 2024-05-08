/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Settings";

register(`chat`, (event) => {
    if (!Settings.AnnounceSpiritLeaps) return
    let messege = ChatLib.getChatMessage(event, false)
    if (messege.startsWith(`You have teleported to `)) { //You have teleported to Noamm9!
        let name = messege.replace(`You have teleported to `, "").replace(`!`, "")
        ChatLib.command(`pc ${Settings.AnnouncedLeapMassage.replace("${name}", name)}`, false)
    }
})