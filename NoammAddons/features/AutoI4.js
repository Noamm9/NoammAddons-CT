/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { PlayerUtils } from "../utils"

const RightClickKey = Client.getMinecraft().field_71474_y.field_74313_G
let doneCoords = new Set()
let wait 


register("step", () => {
    if (!Settings.AutoI4) return
   // if (Player.getHeldItem()?.getID() !== 261) return
    if (!isNearPlate()) {
        if (doneCoords.size > 1) RightClickKey.func_74510_a(RightClickKey.func_151463_i(), false)
        doneCoords.clear()
        return
    }

    const possible = DevBlocks.filter(coord => !doneCoords.has(coord))
    if (!possible.length) return

    const emeraldLocation = possible.find(({ x, y, z }) => World.getBlockAt(x, y, z).type.getID() === 133)
    if (!emeraldLocation) return
    
    doneCoords.add(emeraldLocation)
    
    
    let xdiff = 0.5;
    if (emeraldLocation.x === 68 || emeraldLocation.x === 66) xdiff = -0.6
    else if (emeraldLocation.x === 64) xdiff = 1.3
    


    let [yaw, pitch] = PlayerUtils.calcYawPitch({ x: emeraldLocation.x + xdiff, y: emeraldLocation.y + 1.1, z: emeraldLocation.z })


    PlayerUtils.rotateSmoothly(yaw, pitch, 300)
    wait = true
    setTimeout(() => wait = false, 310) 

    setTimeout(() => {if (!RightClickKey.func_151468_f()) RightClickKey.func_74510_a(RightClickKey.func_151463_i(), true)},310) 



    setTimeout(() => {
        if (World.getBlockAt(emeraldLocation.x, emeraldLocation.y, emeraldLocation.z).type.getID() !== 133 || wait) { 
            RightClickKey.func_74510_a(RightClickKey.func_151463_i(), false)
            return
        }

        const remaining = DevBlocks.filter(coord => !doneCoords.has(coord))
        if (!remaining.length) return
    
        const randomIndex = Math.floor(Math.random() * remaining.length)
        const nextTarget = remaining[randomIndex]
        let xdiff = 0.5


        if (nextTarget.x === 68 || nextTarget.x === 66) xdiff = -0.6
        else if (nextTarget.x === 64) xdiff = 1.3

        
        let [yaw, pitch] = PlayerUtils.calcYawPitch({ x: nextTarget.x + xdiff, y: nextTarget.y + 1.1, z: nextTarget.z })
        PlayerUtils.rotateSmoothly(yaw, pitch, 310)
    },310) 
});


const DevBlocks = [
    { x: 64, y: 126, z: 50 },
    { x: 66, y: 126, z: 50 },
    { x: 68, y: 126, z: 50 },
    { x: 64, y: 128, z: 50 },
    { x: 66, y: 128, z: 50 },
    { x: 68, y: 128, z: 50 },
    { x: 64, y: 130, z: 50 },
    { x: 66, y: 130, z: 50 },
    { x: 68, y: 130, z: 50 }
];


function isNearPlate () {
    if (Player.getY() == 127 && Player.getX() >= 62 && Player.getX() <= 65 && Player.getZ() >= 34 && Player.getZ() <= 37) return true
    else return false
} 

