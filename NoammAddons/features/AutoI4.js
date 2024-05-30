/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Config/Settings";
import { ModMessage, PlayerUtils } from "../utils"


let FourthDevEnabled = true;
let doneCoords = new Set()
let lastShot


register("step", () => {
    try {
        if (!FourthDevEnabled) return
        if (Player.getHeldItem()?.getID() !== 261) return
	    if (Date.now() - lastShot < 300) return
	    if (!isNearPlate()) {
	    	doneCoords.clear()
	    	return
	    }

	    const possible = DevBlocks.filter(coord => !doneCoords.has(coord))
	    if (!possible.length) return
    


	    const emeraldLocation = possible.find(({ x, y, z }) => World.getBlockAt(x, y, z).type.getID() === 133)
	    let xdiff = 0.5

	    if (!emeraldLocation) return

	    doneCoords.add(emeraldLocation)

	    if (emeraldLocation.x === 68 || emeraldLocation.x === 66) xdiff = -0.6
	    else if (emeraldLocation.x === 64) xdiff = 1.3
    


	    let [yaw, pitch] = PlayerUtils.calcYawPitch({ x: emeraldLocation.x + xdiff, y: emeraldLocation.y + 1.1, z: emeraldLocation.z })
        lastShot = Date.now()
	    PlayerUtils.rotateSmoothly(yaw, pitch, 200)
	    setTimeout(() => PlayerUtils.rightClick(), 300)


        if (doneCoords.size === 9) {
            setTimeout(() => {
                ModMessage("&dFinished shooting all blocks!")
                Client.showTitle(`&6Dev done!`, `&aFinished shooting all blocks!`, 0, 100, 0,)
                Client.showTitle(`&6Dev done!`, `&aFinished shooting all blocks!`, 0, 100, 0,)
            }, 300)

        } 
    } catch (e) {ModMessage(e)}
})

register("worldUnload", () => doneCoords.clear())


register("command", () => {

    if (FourthDevEnabled) {
        ModMessage("&cDisabling Auto Arrows");
        FourthDevEnabled = false;
    } else {
        ModMessage("&aEnabling Auto Arrows");
        doneCoords.clear()
        FourthDevEnabled = true;
    }

}).setName("i4")



const DevBlocks  = [
    { x: 64, y: 126, z: 50 },
    { x: 68, y: 126, z: 50 },
    { x: 66, y: 126, z: 50 },
	{ x: 64, y: 128, z: 50 },
    { x: 68, y: 128, z: 50 },
    { x: 66, y: 128, z: 50 },
    { x: 64, y: 130, z: 50 },
    { x: 68, y: 130, z: 50 },
    { x: 66, y: 130, z: 50 }
];




function isNearPlate () {
    if (Player.getY() == 127 && Player.getX() >= 62 && Player.getX() <= 65 && Player.getZ() >= 34 && Player.getZ() <= 37) return true
    else return false
} 









/*
 W.I.P C:

function getBowShootSpeed () {
    const bow = Player.getInventory().getItems().slice(0, 9).find(a => a?.getID() === 261);
    if (!bow) return 500

    const lore = bow.getLore();

    let shotSpeed = 300; 

    for (let line of lore) {
        const match = line.removeFormatting().match(/^Shot Cooldown: (\d+(?:\.\d+)?)s$/);
        if (match) {
            shotSpeed = parseFloat(match[1]) * 1000; 
            break
        }
    }

    return shotSpeed
}
*/
