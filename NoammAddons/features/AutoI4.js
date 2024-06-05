/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { PlayerUtils } from "../utils"

let doneCoords = new Set()
let lastShot


register("tick", () => {
    if (!Settings.AutoI4) return
    if (Player.getHeldItem()?.getID() !== 261) return
    if (Date.now() - lastShot < 300) return
    if (!isNearPlate()) {
        doneCoords.clear()
        return
    }

    const possible = DevBlocks.filter(coord => !doneCoords.has(coord))
    if (!possible.length) return

    const emeraldLocation = possible.find(({ x, y, z }) => World.getBlockAt(x, y, z).type.getID() === 133)
    let xdiff = 0.5;

    if (!emeraldLocation) return

    doneCoords.add(emeraldLocation)

    if (emeraldLocation.x === 68 || emeraldLocation.x === 66) xdiff = -0.6
    else if (emeraldLocation.x === 64) xdiff = 1.3
    


    let [yaw, pitch] = PlayerUtils.calcYawPitch({ x: emeraldLocation.x + xdiff, y: emeraldLocation.y + 1.1, z: emeraldLocation.z })

    
    PlayerUtils.rotateSmoothly(yaw, pitch, 300) 
    setTimeout(() => {
        PlayerUtils.Click(`right`)
        lastShot = Date.now()
        predictNextTarget()
    },320) 

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


function predictNextTarget() {
    const remaining = DevBlocks.filter(coord => !doneCoords.has(coord))
    if (!remaining.length) return

    const randomIndex = Math.floor(Math.random() * remaining.length)
    const nextTarget = remaining[randomIndex]
    let xdiff = 0.5


    if (nextTarget.x === 68 || nextTarget.x === 66) xdiff = -0.6
    else if (nextTarget.x === 64) xdiff = 1.3
    

    let [yaw, pitch] = PlayerUtils.calcYawPitch({ x: nextTarget.x + xdiff, y: nextTarget.y + 1.1, z: nextTarget.z })
    PlayerUtils.rotateSmoothly(yaw, pitch, 300, () => {})
}


function isNearPlate () {
    if (Player.getY() == 127 && Player.getX() >= 62 && Player.getX() <= 65 && Player.getZ() >= 34 && Player.getZ() <= 37) return true
    else return false
} 

