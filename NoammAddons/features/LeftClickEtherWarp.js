


import Settings from "../Settings"
import { registerWhen, PlayerUtils, MouseEvent } from "../utils"
import { getSkyblockItemID } from "../../BloomCore/utils/Utils";

const sneakKey = new KeyBind(Client.getMinecraft().field_71474_y.field_74311_E)


function StartOrStop() {
    return Settings.LeftClickEtherwarp
}


function isHoldingEtherwarpItem() {
    const held = Player.getHeldItem()
    const sbId = getSkyblockItemID(held)

    if (sbId !== "ASPECT_OF_THE_END" && sbId !== "ASPECT_OF_THE_VOID") return false
    
    return held.getNBT()?.toObject()?.tag?.ExtraAttributes?.ethermerge == 1
}


const Trigger = register(MouseEvent, (event) => {

    const btn = event.button
    const state = event.buttonstate
    if (btn !== 0 || !state || !isHoldingEtherwarpItem() || !Client.isTabbedIn()) return

    if (!Player.isSneaking()) return

    Client.scheduleTask(1, () => PlayerUtils.Click(`right`))

}).unregister()


registerWhen(Trigger, StartOrStop)