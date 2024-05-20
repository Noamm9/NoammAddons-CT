/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Config/Settings"
import { BlockPoss } from "../utils";

const mc = Client.getMinecraft();
const C08PacketPlayerBlockPlacement = Java.type("net.minecraft.network.play.client.C08PacketPlayerBlockPlacement")
let isRightClickKeyDown = mc.field_71474_y.field_74313_G.func_151470_d()
isRightClickKeyDown = mc.field_71474_y.field_74313_G.func_151470_d()

const enabledSwords = [ 
    "Hyperion",
    "Valkyrie",
    "Scylla",
    "Astraea",
    "Rogue",
	"wither cloak",
    "Aspect of the end",
	"Jerry",
	"Katana",
	"Aspect of the Dragons",
    "Zombie Sword"
]

register("playerInteract", (action, _, event) => { 
    try {
        isRightClickKeyDown = mc.field_71474_y.field_74313_G.func_151470_d()
        if (action.toString() !== "RIGHT_CLICK_EMPTY" || !Settings.NoSwordBlock) return
        let item = Player?.getHeldItem()
        if (!item) return
        let isEnabledSword = false    

        enabledSwords.forEach((sword) => { if (item?.getName()?.removeFormatting()?.toLowerCase()?.includes(sword?.toLowerCase())) isEnabledSword = true})
    
        if (isEnabledSword) {
          cancel(event)
          if (!isRightClickKeyDown) Client.sendPacket(new C08PacketPlayerBlockPlacement(new BlockPoss(-1, -1, -1), 255, Player?.getHeldItem()?.getItemStack(), 0, 0, 0))
        }
    } catch (e) {ChatLib.chat(`&4${e}`)}
})