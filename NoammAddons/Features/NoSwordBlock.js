/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Settings"
import { BlockPoss } from "../utils";

const C08PacketPlayerBlockPlacement = Java.type("net.minecraft.network.play.client.C08PacketPlayerBlockPlacement")

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
        if (action.toString() !== "RIGHT_CLICK_EMPTY" || !Settings().NoSwordBlock) return
        let item = Player?.getHeldItem()
        if (!item) return
        let isEnabledSword = false    

        enabledSwords.forEach(sword => { if (item?.getName()?.removeFormatting()?.toLowerCase()?.includes(sword?.toLowerCase())) isEnabledSword = true})
    
        if (isEnabledSword) {
            cancel(event)
            Client.sendPacket(new C08PacketPlayerBlockPlacement(new BlockPoss(-1, -1, -1), 255, Player?.getHeldItem()?.getItemStack(), 0, 0, 0))
        }
    } catch (e) {}
})