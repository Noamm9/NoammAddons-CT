/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import Dungeon from "../../BloomCore/dungeons/Dungeon";
import { GhostBlock, BlockPoss, MCBlockState, ModMessage, setAir, IsInBossRoom } from "../utils";
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

     
    
    
register("step", () => {
    if (World.isLoaded() && Settings.BetterM7 && IsInBossRoom() && Dungeon.floorNumber == 7)
    PlaceBlocks()
}).setDelay(10)

register(`command`, () => {
    ModMessage(World.isLoaded() && Settings.BetterM7 && IsInBossRoom() && Dungeon.floorNumber == 7)
    PlaceBlocks()
}).setName(`forcePlaceBlocks`)