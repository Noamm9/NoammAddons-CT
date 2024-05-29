/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Config/Settings";
import { ModMessage } from "../utils"


let FourthDevEnabled = false;
let doneCoords = new Set()
let lastShot


register("tick", () => {
	if (!FourthDevEnabled) return
    if (Player.getHeldItem()?.getID() !== 261) return
	if (Date.now() - lastShot < getBowShootSpeed()) return
	if (!isNearPlate()) {
		doneCoords.clear()
		return
	}

	const possible = DevBlocks.filter(coord => !doneCoords.has(coord))
	if (!possible.length) { 
		return
	}


	const emeraldLocation = possible.find(({ x, y, z }) => World.getBlockAt(x, y, z).type.getID() === 133)
	let xdiff = 0.5

	if (!emeraldLocation) return

	doneCoords.add(emeraldLocation)

	if (emeraldLocation.x === 68 || emeraldLocation.x === 66) xdiff = -0.6
	else if (emeraldLocation.x === 64) xdiff = 1.3
	


	let [yaw, pitch] = calcYawPitch({ x: emeraldLocation.x + xdiff, y: emeraldLocation.y + 1.1, z: emeraldLocation.z })
	rotateSmoothly(yaw, pitch, getBowShootSpeed())
	setTimeout(() => rightClick(), getBowShootSpeed())

	lastShot = Date.now()
});

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

}).setName("/i4")



const DevBlocks  = [
	{ x: 64, y: 128, z: 50 },
    { x: 66, y: 126, z: 50 },
    { x: 68, y: 130, z: 50 },
    { x: 64, y: 126, z: 50 },
    { x: 68, y: 128, z: 50 },
    { x: 66, y: 130, z: 50 },
    { x: 68, y: 126, z: 50 },
    { x: 64, y: 130, z: 50 },
    { x: 66, y: 128, z: 50 }
];



function rightClick() {
    const rightClickMethod = Client.getMinecraft().getClass().getDeclaredMethod("func_147121_ag", null)
    rightClickMethod.setAccessible(true);
    rightClickMethod.invoke(Client.getMinecraft(), null);
} 



function calcYawPitch(blcPos, plrPos) {
    if (!plrPos) plrPos = getEyePos()

    let d = {
        x: blcPos.x - plrPos.x,
        y: blcPos.y - plrPos.y,
        z: blcPos.z - plrPos.z
    }

    let yaw = 0;
    let pitch = 0;

    if (d.x != 0) {

        if (d.x < 0) yaw = 1.5 * Math.PI
        else {yaw = 0.5 * Math.PI}

        yaw = yaw - Math.atan(d.z / d.x);
    }
    else if (d.z < 0) yaw = Math.PI;

    d.xz = Math.sqrt(Math.pow(d.x, 2) + Math.pow(d.z, 2))
    pitch = -Math.atan(d.y / d.xz)
    yaw = -yaw * 180 / Math.PI
    pitch = pitch * 180 / Math.PI
    if (pitch < -90 || pitch > 90 || isNaN(yaw) || isNaN(pitch) || yaw == null || pitch == null || yaw == undefined || pitch == null) return

    return [yaw, pitch]
   
}




const isNearPlate = () => Player.getY() == 127 && Player.getX() >= 62 && Player.getX() <= 65 && Player.getZ() >= 34 && Player.getZ() <= 37;


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




function rotateSmoothly(yaw, pitch, time) {
	while (yaw >= 180) yaw -= 360
	while (pitch >= 180) pitch -= 360
	const initialYaw = Player.getYaw()
	const initialPitch = Player.getPitch()
	const initialTime = new Date().getTime()
	const trigger = register("step", () => {
		const progress = time <= 0 ? 1 : Math.max(Math.min((new Date().getTime() - initialTime) / time, 1), 0)
		const amount = bezier(progress, 0, 1, 1, 1)
		rotate(initialYaw + (yaw - initialYaw) * amount, initialPitch + (pitch - initialPitch) * amount)
		if (progress >= 1) trigger.unregister()
	});
}


function getEyePos() {
    return {
        x: Player.getX(),
        y: Player.getY() + Player.getPlayer().func_70047_e(),
        z: Player.getZ()
    };
}

function bezier(t, initial, p1, p2, final) {
	return (1 - t) * (1 - t) * (1 - t) * initial + 3 * (1 - t) * (1 - t) * t * p1 + 3 * (1 - t) * t * t * p2 + t * t * t * final
}

function rotate(yaw, pitch) {
	const player = Player.getPlayer()
	player.field_70177_z = yaw
	player.field_70125_A = pitch
}