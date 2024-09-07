/// <reference types= "../../CTAutocomplete" />
/// <reference lib= "es2015" />

import { Color, getPatcherScale, ModMessage, Render } from "../utils";
import * as PacketOpenWindow from "../Utilities/Events/PacketWindowOpen"


function disablePatcherScaleInStorageGUIForNEU(windowTitle) {
    if (windowTitle == "Storage" || windowTitle.startsWith(`Ender Chest`) || windowTitle.includes(`Backpack`)) {
        if (getPatcherScale(true) != 0) ChatLib.command(`patcher scale 0`)
    }
    else reset()
}

function reset() {
    if (getPatcherScale(true) != 5)  ChatLib.command(`patcher scale 5`)
}


PacketOpenWindow.AddListener(disablePatcherScaleInStorageGUIForNEU)

register("packetReceived", reset).setFilteredClass(net.minecraft.network.play.server.S2EPacketCloseWindow)
register("packetSent", reset).setFilteredClass(net.minecraft.network.play.client.C0DPacketCloseWindow)



register(`renderEntity`, () => Tessellator.disableLighting())