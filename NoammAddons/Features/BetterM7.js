/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import Dungeon from "../../BloomCore/dungeons/Dungeon";
import { GhostBlock, BlockPoss, MCBlockState, ModMessage, setAir, IsInBossRoom, F7PhaseCriterias, registerWhen } from "../utils";
const Blocks = JSON.parse(FileLib.read("NoammAddons", "RandomShit/F7BossCoords.json"))


const blockStates = {
    BrownGlass: MCBlockState(95, 12),
    LimeWool: MCBlockState(35, 5),
    YellowWool: MCBlockState(35, 4),
    PurpleWool: MCBlockState(35, 10),
    BirchFance: new BlockType(189).getDefaultState(),
    LimeGlass: MCBlockState(95, 5),
    YellowGlass: MCBlockState(95, 4),
    PurpleGlass: MCBlockState(95, 10),
    WhiteGlass: new BlockType(95).getDefaultState(),
    Chest: new BlockType('chest').getDefaultState(),
    Bedrock: new BlockType(7).getDefaultState(),
    LightBlueWool: MCBlockState(35, 3),
    LightBlueGlass: MCBlockState(95, 3),
    OrangeWool: MCBlockState(35, 1),
    OrangeGlass: MCBlockState(95, 1),
    RedWool: MCBlockState(35, 14),
    RedGlass: MCBlockState(95, 14),
    LimeGlassPane: MCBlockState(160, 5),
    LimeCarpet: MCBlockState(171, 5),
};

function PlaceBlocks() {
    try {
        Object.keys(Blocks).forEach(type => {
            const blockType = blockStates[type]
            Blocks[type].forEach(block => {
                const position = new BlockPoss(block.x, block.y, block.z)

                if (type !== 'Air') GhostBlock(position, blockType)
                else setAir(position)
                
            })
        })
    } catch (error) {ModMessage(error)}
}




const packetReceived = register("packetReceived", (packet, event) => {
    const blockPos = packet.func_179827_b() // getBlockPosition

    try {
        Object.keys(Blocks).forEach(type => {
            Blocks[type].forEach(block => {

                if (blockPos.func_177958_n() == block.x && blockPos.func_177956_o() == block.y && blockPos.func_177952_p() == block.z) {
                    cancel(event)
                    return
                }

            })
        })
    } catch (error) {ModMessage(error)}
}).setFilteredClass(net.minecraft.network.play.server.S23PacketBlockChange)


const hitBlock = register("hitBlock", (EventBlock, event) => {
    try {
        Object.keys(Blocks).forEach(type => {
            Blocks[type].forEach(block => {

                if (EventBlock.getX() == block.x && EventBlock.getY() == block.y && EventBlock.getZ() == block.z) {
                    cancel(event)
                    return
                }

            })
        })
    } catch (error) {ModMessage(error)}
})




register(`chat`, (e) => {
    if (Settings.BetterM7) {
        let ChatMessage = ChatLib.getChatMessage(e,false)
        if (ChatMessage.startsWith(F7PhaseCriterias[0]) && Settings.P1StartTimer) PlaceBlocks()
        else if (ChatMessage.startsWith(F7PhaseCriterias[1]) && Settings.P2StartTimer) PlaceBlocks()
        else if (ChatMessage.startsWith(F7PhaseCriterias[2]) && Settings.P3StartTimer) PlaceBlocks()
        else if (ChatMessage.startsWith(F7PhaseCriterias[3]) && Settings.P4StartTimer) PlaceBlocks()
    }
})


registerWhen(packetReceived, () => World.isLoaded() && Settings.BetterM7 && IsInBossRoom() && Dungeon.floorNumber == 7)
registerWhen(hitBlock, () => World.isLoaded() && Settings.BetterM7 && IsInBossRoom() && Dungeon.floorNumber == 7)