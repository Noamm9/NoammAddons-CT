/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Settings"
import { registerWhen, Render } from "../utils"
import { getSkyblockItemID } from "../../BloomCore/utils/Utils"


function StartOrStop() {
    if (getSkyblockItemID(Player.getHeldItem()) == "GYROKINETIC_WAND" && Settings.GyroCircle) return true
    else return false
}


registerWhen(register('renderWorld', (pt) => {
    
    let block = new BlockPos(Player.getPlayer().func_174822_a(25, pt).func_178782_a()); // Credits to Bloom
    let x = block.getX();
    let y = block.getY();
    let z = block.getZ();


    if (World.getBlockAt(x, y, z).type.name != 'tile.air.name' && World.getBlockAt(x, y + 1, z).type.name == 'tile.air.name') {
        if (World.getBlockAt(x, y, z).type.name == 'Carpet') {

            Render.Cylinder(x+0.5,y+1.5,z+0.5, 10, 10, 0.2, 30, 1, 0, 90, 90, 0, 255/255, 0/255, 80/100, true, false) // green
            Render.BlockHitbox(World.getBlockAt(x, y, z), 0, 255/255, 0/255, 20/100, true, 4, true)
            Render.BlockHitbox(World.getBlockAt(x, y, z), 0, 255/255, 0/255, 1, true, 4, false)

        }
        else {

            Render.Cylinder(x+0.5,y+1.5,z+0.5, 10, 10, 0.2, 30, 1, 0, 90, 90, 0, 255/255, 0/255, 80/100, true, false) // green
            Render.BlockHitbox(World.getBlockAt(x, y, z), 0, 255/255, 0/255, 20/100, true, 3, true)
            Render.BlockHitbox(World.getBlockAt(x, y, z), 0, 255/255, 0/255, 1, true, 4, false)

        }
    }
}), StartOrStop)