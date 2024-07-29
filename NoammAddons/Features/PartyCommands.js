/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings";
import { prefix } from "../utils";


const ranks = [
    "[VIP]",
    "[VIP+]",
    "[MVP]",
    "[MVP+]",
    "[MVP++]",
    "[YOUTUBE]",
    "[ADMIN]",
    "[OWNER]"
]

const floors = {
    1: 'ONE',
    2: 'TWO',
    3: 'THREE',
    4: 'FOUR',
    5: 'FIVE',
    6: 'SIX',
    7: 'SEVEN'
}

register("chat", (event) => {
    let message = ChatLib.getChatMessage(event).removeFormatting()
    message = message.replace("Party > ", "")

    ranks.forEach( (rank) => message = message.replace(rank, ""))

    let splits = message.trim().split(":")
    let username = splits[0]
    message = splits.slice(1).join(':').substring(1)
    let floornum

    if (!message.startsWith("!") || !Settings().pcEnabled ) return

    let command = message.slice(1).toLowerCase()

    if (command.startsWith("m") && Settings().pcMasterFloor && command.length == 2) {

        try { floornum = parseInt(command[1]) } catch (e) { return }
        if (floornum > 7 || floornum < 1) return

        setTimeout(() => ChatLib.command(`joininstance MASTER_CATACOMBS_FLOOR_${floors[floornum]}`), 300)

        return
    }

    if (command.startsWith("f") && Settings().pcMasterFloor && command.length == 2) {

        try { floornum = parseInt(command[1]) } catch (e) { return }
        if (floornum > 7 || floornum < 0) return

        if (floornum == 0) setTimeout(() => ChatLib.command("joininstance CATACOMBS_ENTRANCE"), 300)
        else setTimeout(() => ChatLib.command(`joininstance CATACOMBS_FLOOR_${floors[floornum]}`), 300)

        return
    }


    switch (command) {
        case "help":
            setTimeout(() => ChatLib.command(`pc ${prefix.removeFormatting()} Commands: pt, w, ai, f0-7, m1-7`), 300)
            break;
        case "pt":
            if (!Settings().pcPtme) return
            setTimeout(() => ChatLib.command(`party transfer ${username}`), 300)
            break
        case "w":
            if (!Settings().pcWarp) return
            setTimeout(() => ChatLib.command(`party warp`), 300)
            break
        case "ai":
            if (!Settings().pcAllinv) return
            setTimeout(() => ChatLib.command(`party setting allinvite`), 300)
            break
    }

}).setCriteria("Party > ${*}")