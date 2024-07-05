/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Dungeon from "../../BloomCore/dungeons/Dungeon";
import Settings from "../Settings";
import { registerWhen, GhostBlock, MCBlockState, BlockPoss, IsInBossRoom } from "../utils";
const data = JSON.parse(FileLib.read("NoammAddons", 'RandomShit/F6BossCoords.json'));


const PurpleCarpet = MCBlockState(171, 10)
const Glass = new BlockType(20).getDefaultState()
const DarkOakWoodPlank = MCBlockState(5, 5)
const PurpleWool = MCBlockState(35, 10)
const LimeWool = MCBlockState(35, 5)

const blockNames = {
    "Purple Carpets": PurpleCarpet,
    "Glass": Glass,
    "Dark Oak Wood Planks": DarkOakWoodPlank,
    "Purple Wool": PurpleWool,
    "Lime Wool": LimeWool
}


function ProcessBlocks() {
    data.blocks.forEach(({ name, coords }) => {
        const blockState = blockNames[name]

        coords.forEach(({ x, y, z }) => {
            GhostBlock(new BlockPoss(x, y, z), blockState)
        })
    })
}



const packetReceived = register("packetReceived", (packet, event) => {
    const blockPos = packet.func_179827_b() // getBlockPosition
    
    data.blocks.forEach(({ _, coords }) => {
        coords.forEach(({ x, y, z }) => {
            if (blockPos.func_177958_n() == x && blockPos.func_177956_o() == y && blockPos.func_177952_p() == z) {
                cancel(event)
                return
            }
        })
    })
    
}).setFilteredClass(net.minecraft.network.play.server.S23PacketBlockChange)


const hitBlock = register("hitBlock", (EventBlock, event) => {
    data.blocks.forEach(({ _, coords }) => {
        coords.forEach(({ x, y, z }) => {
            if (EventBlock.getX() == x && EventBlock.getY() == y && EventBlock.getZ() == z) {
                cancel(event)
                return
            }
        })
    })
})



register("chat", () => {
    if (Dungeon.floorNumber == "6" && Settings.BetterM6) {
        setTimeout(ProcessBlocks, 500)
        setTimeout(ProcessBlocks, 30_000)
    }
}).setChatCriteria("[BOSS] Sadan: So you made it all the way here... Now you wish to defy me? Sadan?!")

registerWhen(packetReceived, () => IsInBossRoom() && Dungeon.floorNumber == "6" && Settings.BetterM6)
registerWhen(hitBlock, () => IsInBossRoom() && Dungeon.floorNumber == "6" && Settings.BetterM6)