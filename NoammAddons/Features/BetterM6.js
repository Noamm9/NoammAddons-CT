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



registerWhen(register("step", ProcessBlocks).setFps(10), () => IsInBossRoom() && Dungeon.floorNumber == "6" && Settings.BetterM6)