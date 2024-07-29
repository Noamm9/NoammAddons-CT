/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { IsInBossRoom, IsInDungeon } from "../utils" 
import { getSkyblockItemID } from "../../BloomCore/utils/Utils"

const C08PacketPlayerBlockPlacement = Java.type("net.minecraft.network.play.client.C08PacketPlayerBlockPlacement")
const sneakKey = new KeyBind(Client.getMinecraft().field_71474_y.field_74311_E)
const regex = /x=(-?\d+(\.\d+)?),\s+y=(-?\d+(\.\d+)?),\s+z=(-?\d+(\.\d+)?)/;
let Cooldown = Date.now()


const isHoldingEtherwarpItem = () => {
    const held = Player.getHeldItem()
    const sbId = getSkyblockItemID(held)

    if (sbId !== "ASPECT_OF_THE_END" && sbId !== "ASPECT_OF_THE_VOID" && sbId !== "ETHERWARP_CONDUIT") return false
    
    return held.getNBT()?.toObject()?.tag?.ExtraAttributes?.ethermerge == 1 || sbId == "ETHERWARP_CONDUIT"
}



register("renderWorld", pt => {
    if (!Settings().EtherWarpTriggerbot || IsInBossRoom() || !IsInDungeon() || Date.now() - Cooldown < 300 || !isHoldingEtherwarpItem()) return
    lookingAt = String(Player.getPlayer().func_174822_a(65, pt))
    if (lookingAt.includes("MISS")) return

    const match = regex.exec(lookingAt);
    
    if (match) {
        if (World.getBlockAt(parseInt(match[1]), parseInt(match[3]), parseInt(match[5])).type.getID() == 41) {

            Cooldown = Date.now()
            let ShouldSneak = !Player.isSneaking()

            if (Settings().AutoSneak) new Thread(() => {
                if (ShouldSneak) sneakKey.setState(true)
                Thread.sleep(100)
                Client.sendPacket(new C08PacketPlayerBlockPlacement(Player.getHeldItem()?.getItemStack() ?? null))
                Thread.sleep(50)
                if (ShouldSneak) sneakKey.setState(false)
            }).start()
            
            else {
                if (Player.isSneaking()) Client.sendPacket(new C08PacketPlayerBlockPlacement(Player.getHeldItem()?.getItemStack() ?? null))
            }

        }
    }
})
