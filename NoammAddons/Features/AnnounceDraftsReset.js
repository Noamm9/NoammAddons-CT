/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { prefix } from "../utils" 


register(`chat`, (type) => {
    if (!Settings().AnnounceDraftsReset) return
    
    ChatLib.command(`pc ${prefix.removeFormatting()} Used Draft to Reset ${type}`)
}).setCriteria(/^You used the Architect's First Draft to reset (Higher Or Lower|Boulder|Three Weirdos|Ice Path|Bomb Defuse)!/)


register("chat", architect).setCriteria(/^PUZZLE FAIL! (\w{1,16}) .+$/)
register("chat", architect).setCriteria(/^\[STATUE\] Oruo the Omniscient: (\w{1,16}) chose the wrong answer! I shall never forget this moment of misrememberance\.$/)


function architect(player) {
    if (player !== Player.getName() || !Settings().AutoArchitectDraft) return

    Client.scheduleTask(30, () => ChatLib.command("gfs ARCHITECT_FIRST_DRAFT 1"))
}