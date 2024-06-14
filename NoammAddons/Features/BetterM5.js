/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import Dungeon from "../../BloomCore/dungeons/Dungeon";
import { GhostBlock, registerWhen, BlockPoss, IsInBossRoom, MCBlockState } from "../utils";

const Blocks = JSON.parse(FileLib.read("NoammAddons", "RandomShit/F5BossCoords.json"))
const GrayClay = MCBlockState(159, 9)


function DioriteToClay() {
    Blocks.blocks.forEach(block => GhostBlock(new BlockPoss(block.x, block.y, block.z), GrayClay))
}
        
        
registerWhen(register("step", DioriteToClay).setFps(10), () => Settings.BetterM5 && IsInBossRoom() && Dungeon.floorNumber == 5)