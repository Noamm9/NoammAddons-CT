/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import RenderLib from "../../RenderLib"
import Settings from "../Settings"
import { intToRGB, ModMessage, registerWhen, Render } from "../utils"


const dragonColors = ["orange", "red", "green", "blue", "purple"];
const colorCodes = ["6","c","a","b","5"]
const COLLORS = [Renderer.GOLD, Renderer.RED, Renderer.GREEN, Renderer.AQUA, Renderer.DARK_PURPLE ]

const colors = { 
    "orange": {x: [82, 88], y: [15, 22], z: [53, 59]},
    "red": {x: [24, 30], y: [15, 22], z: [56, 62]},
    "green": {x: [23, 29], y: [15, 22], z: [91, 97]},
    "purple": {x: [53, 59], y: [15, 22], z: [122, 128]},
    "blue": {x: [82, 88], y: [15, 22], z: [91, 97]},
}

const textlocations = [ 
    { x: 84, y: 18, z: 56},
    { x: 27, y: 18, z: 60},
    { x: 26, y: 18, z: 95},
    { x: 84, y: 18, z: 95},
    { x: 57, y: 18, z: 125}
]

const RenderBox = [
    () => RenderLib.drawEspBox(87, 8, 62, 30, 20, 255/255, 170/255, 0,1, false),  // orange
    () => RenderLib.drawEspBox(27, 13, 58, 25, 15, 255/255, 85/255, 85/255,1,false),  // red
    () => RenderLib.drawEspBox(22, 8, 95, 30, 20, 85/255, 255/255, 85/255,1,false), //green
	() => RenderLib.drawEspBox(84, 16, 95, 25, 10, 0, 170/255, 170/255,1,false), //blue
	() => RenderLib.drawEspBox(57, 13, 125, 23, 10, 170/255, 0, 170/255,1,false), //purple
]

let times = [];
dragonColors.forEach(color => times[color] = null)


registerWhen(register("spawnParticle", (particle, type) => { 
    if (type.toString() !== "FLAME") return;
    Object.keys(colors).forEach((color) => {
        const [x, y, z] = [particle.x,particle.y,particle.z];

        if(
            x >= colors[color].x[0] && x <= colors[color].x[1] && 
            y >= colors[color].y[0] && y <= colors[color].y[1] && 
            z >= colors[color].z[0] && z <= colors[color].z[1] && 
            times[color] === null
        )

        times[color] = new Date().getTime();
    
    });
}), () => Settings().M7DragTimer || Settings().M7DragBox)


registerWhen(register("renderWorld", () => { 
    let currentTime = new Date().getTime()

    dragonColors.forEach((color, i) => {
        let time = times[`${color}`];
        if (time !== null) {

            if (currentTime - time < 10_000) {
                const spawnTime = 5_000 - (currentTime - time);
                let TraceColor = intToRGB(COLLORS[i], true)
                let colorCode;

                if (!spawnTime.toString().includes(`-`)) {
                    (spawnTime <= 1000) ? colorCode = "§c" : (spawnTime <= 3000) ? colorCode = "§e" : colorCode = "§a"

                    Render.StringWithShadow(`§${colorCodes[i]}${color.charAt(0).toUpperCase() + color.slice(1)} spawning in: ${colorCode}${spawnTime}ms`, textlocations[i].x, textlocations[i].y, textlocations[i].z, 0, 2.5, true, false)
                    Render.drawTrace(textlocations[i].x, textlocations[i].y-1, textlocations[i].z, TraceColor[0]/255, TraceColor[1]/255, TraceColor[2]/255, TraceColor[3]/255, 4)
                }


                if (Settings().M7DragBox) RenderBox[i]()

            }

            else times[`${color}`] = null

        }
    })
}), () => Settings().M7DragTimer || Settings().M7DragBox)


registerWhen(register("worldLoad", () => { 
    times["orange"] = null
    times["red"] = null
    times["green"] = null
    times["blue"] = null
    times["purple"] = null
}), () => Settings().M7DragTimer || Settings().M7DragBox)




/*
register("command", () => { 
    ChatLib.command("particle flame 84 18 95 1 1 1 1 100")
    ChatLib.command("particle flame 57 18 125 1 1 1 1 100")
    ChatLib.command("particle flame 26 18 95 1 1 1 1 100")
    ChatLib.command("particle flame 27 18 60 1 1 1 1 100")
    ChatLib.command("particle flame 84 18 56 1 1 1 1 100")
}).setName("testdragons")*/