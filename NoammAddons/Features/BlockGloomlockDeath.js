/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { registerWhen, MouseEvent } from "../utils"
import { getSkyblockItemID } from "../../BloomCore/utils/Utils";


function StartOrStop() {
    return (Settings().BlockGloomlockDeath && isHoldingGloomlockGrimoire())
}



function isHoldingGloomlockGrimoire() {
    const held = Player.getHeldItem()
    const sbId = getSkyblockItemID(held)

    return (sbId == "GLOOMLOCK_GRIMOIRE")   
}


const Trigger = register(MouseEvent, (event) => {

    const btn = event.button
    const state = event.buttonstate
    if (btn !== 0 || !state || !Client.isTabbedIn()) return

    if (Player.asPlayerMP().getHP() <= Math.max(Player.asPlayerMP().getMaxHP() * 0.25))

    cancel(event)


}).unregister()



registerWhen(Trigger, StartOrStop)