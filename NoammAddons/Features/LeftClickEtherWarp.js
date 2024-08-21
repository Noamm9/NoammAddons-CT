/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { registerWhen, PlayerUtils, MouseEvent } from "../utils"
import { getSkyblockItemID } from "../../BloomCore/utils/Utils";



function StartOrStop() {
    return Settings().LeftClickEtherwarp
}


function isHoldingEtherwarpItem() {
    const held = Player.getHeldItem()
    const sbId = getSkyblockItemID(held)

    if (sbId !== "ASPECT_OF_THE_END" && sbId !== "ASPECT_OF_THE_VOID") return false
    
    return held.getNBT()?.toObject()?.tag?.ExtraAttributes?.ethermerge == 1
}


const Trigger = register(MouseEvent, event => {
    if (event.button !== 0 || !event.buttonstate || !isHoldingEtherwarpItem() || !Client.isTabbedIn()) return

    if (Settings().AutoSneak && !Player.isSneaking()) { 
        PlayerUtils.Sneak(true)
        setTimeout(() => {
            PlayerUtils.Click(`right`)
            PlayerUtils.Sneak(false)
        }, 100)
    }
    else if (Player.isSneaking()) PlayerUtils.Click(`right`)

}).unregister()



registerWhen(Trigger, StartOrStop)