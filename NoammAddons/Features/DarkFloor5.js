/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import Dungeon from "../../BloomCore/dungeons/Dungeon";
import { GhostBlock, registerWhen, BlockPoss, IsInBossRoom, MCBlockState } from "../utils";

const Blocks = JSON.parse(FileLib.read("NoammAddons", "RandomShit/F5BossCoords.json"))
const GrayClay = MCBlockState(159, 9)


function DioriteToCoal() {
    Blocks.blocks.forEach(function(block, index) {
        let x = block.x;
        let y = block.y;
        let z = block.z;
        let Pos = new BlockPoss(x, y, z)
        
        GhostBlock(Pos, GrayClay)
        
    })
}
        
        
registerWhen(register("step", DioriteToCoal).setFps(10), () => Settings.DarkFloor5 && IsInBossRoom() && Dungeon.floorNumber == 5)