/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import Dungeon from "../../BloomCore/dungeons/Dungeon";
import { GhostBlock, registerWhen, BlockPoss, IsInBossRoom, MCBlockState } from "../utils";

const Blocks = JSON.parse(FileLib.read("NoammAddons", "RandomShit/F5BossCoords.json"))
const GrayClay = MCBlockState(159, 9)
const S23PacketBlockChange = net.minecraft.network.play.server.S23PacketBlockChange
const MCBlock = Java.type('net.minecraft.block.Block')


const trigger = register("packetReceived", packet => {
    if (MCBlock.func_149682_b(packet.func_180728_a().func_177230_c()) !== 1) return
    
    setTimeout(DioriteToCoal, 250)
    
}).setFilteredClass(S23PacketBlockChange)


function DioriteToCoal() {
    Blocks.blocks.forEach(function(block, index) {
        let x = block.x;
        let y = block.y;
        let z = block.z;
        let Pos = new BlockPoss(x, y, z)
    
        GhostBlock(Pos, GrayClay)

    })
}


registerWhen(trigger, () => Settings.DarkFloor5 && IsInBossRoom() && Dungeon.floorNumber == 5)