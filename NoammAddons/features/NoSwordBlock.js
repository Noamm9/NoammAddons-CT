/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Config/Settings"


const mc = Client.getMinecraft();
const C08PacketPlayerBlockPlacement = Java.type("net.minecraft.network.play.client.C08PacketPlayerBlockPlacement")
BlockPos = net.minecraft.util.BlockPos; // NoSwordBlock
let isRightClickKeyDown = mc.field_71474_y.field_74313_G.func_151470_d()

register("tick", () => { 
    isRightClickKeyDown = mc.field_71474_y.field_74313_G.func_151470_d()
})

let enabledSwords = [ 
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

register("playerInteract", (action, vector3d, event) => { 
    if (action.toString() !== "RIGHT_CLICK_EMPTY" || !Settings.NoSwordBlock) return
    let item = Player?.getHeldItem()
   // console.log(item?.getName().removeFormatting())
    let isEnabledSword = false

    enabledSwords.forEach((sword) => {
        if (item?.getName()?.removeFormatting()?.toLowerCase()?.includes(sword?.toLowerCase())) {
            isEnabledSword = true
        }
    })
    if (isEnabledSword) {
        cancel(event)
        if (!isRightClickKeyDown) {
            Client.sendPacket(new C08PacketPlayerBlockPlacement(new BlockPos(-1, -1, -1), 255, Player?.getHeldItem()?.getItemStack(), 0, 0, 0))
        }
    }
})