/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import Dungeon from "../../BloomCore/dungeons/Dungeon";
import { GhostBlock, registerWhen, BlockPoss, IsInBossRoom, MCBlockState, ModMessage } from "../utils";

const Blocks = JSON.parse(FileLib.read("NoammAddons", "RandomShit/F5BossCoords.json"))
const GrayClay = MCBlockState(159, 9)


function DioriteToClay() {
    Blocks.blocks.forEach(block => GhostBlock(new BlockPoss(block.x, block.y, block.z), GrayClay))
}


const packetReceived = register("packetReceived", (packet, event) => {
    const blockPos = packet.func_179827_b() // getBlockPosition
    
    Blocks.blocks.forEach(block => {
        if (blockPos.func_177958_n() == block.x && blockPos.func_177956_o() == block.y && blockPos.func_177952_p() == block.z) {
            cancel(event)
            return
        }
    })
    
}).setFilteredClass(net.minecraft.network.play.server.S23PacketBlockChange)


const hitBlock = register("hitBlock", (EventBlock, event) => {
    Blocks.blocks.forEach(block => {
        if (EventBlock.getX() == block.x && EventBlock.getY() == block.y && EventBlock.getZ() == block.z) {
            cancel(event)
            return
        }
    })
})



register("step", () => {
    if (Settings().BetterM5 && IsInBossRoom() && Dungeon.floorNumber == 5)
        DioriteToClay()
}).setDelay(5)

registerWhen(packetReceived, () => Settings().BetterFloorsMultiCheckbox && Settings().BetterM5 && IsInBossRoom() && Dungeon.floorNumber == 5)
registerWhen(hitBlock, () => Settings().BetterFloorsMultiCheckbox && Settings().BetterM5 && IsInBossRoom() && Dungeon.floorNumber == 5)