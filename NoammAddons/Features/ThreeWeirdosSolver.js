/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { EntityArmorStand, getRoomCenter, getObjectXYZ } from "../../BloomCore/utils/Utils"
import { Render, registerWhen, convertToRealCoords, IsInDungeon, IsInBossRoom, ModMessage, WitherDoorsOffsets, intToRGB } from "../utils";


const solutions = [
    /The reward is not in my chest!/,
    /At least one of them is lying, and the reward is not in \w+'s chest.?/,
    /My chest doesn't have the reward\. We are all telling the truth.?/,
    /My chest has the reward and I'm telling the truth!/,
    /The reward isn't in any of our chests.?/,
    /Both of them are telling the truth\. Also, \w+ has the reward in their chest.?/,
]


const wrong = [
    /One of us is telling the truth!/,
    /They are both telling the truth\. The reward isn't in \w+'s chest./,
    /We are all telling the truth!/,
    /\w+ is telling the truth and the reward is in his chest./,
    /My chest doesn't have the reward. At least one of the others is telling the truth!/,
    /One of the others is lying./,
    /They are both telling the truth, the reward is in \w+'s chest./,
    /They are both lying, the reward is in my chest!/,
    /The reward is in my chest./,
    /The reward is not in my chest\. They are both lying./,
    /\w+ is telling the truth./,
    /My chest has the reward./
]


const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]
const correctChests = new Map()
const incorrectChests = new Map()
const redstoneLocation = [-2, 69, 7]
let inWeirdos = false


register("step", () => {
    if (!IsInDungeon() || IsInBossRoom() ) return
    try {
        let rotation = null
        let [x, z] = getRoomCenter()
        for (let i = 0; i < WitherDoorsOffsets.length; i++) {
            let [dx, dz] = WitherDoorsOffsets[i]
            let block = World.getBlockAt(x+dx, 68, z+dz)
            let blockID = block.type.getID()
            if (!blockID) continue

            rotation = i*90

        }



        const [x0, y0, z0] = redstoneLocation
        const [x1, y1, z1] = convertToRealCoords(x0, y0, z0, x, z, rotation)

        if (World.getBlockAt(x1, 69, z1).type.getRegistryName() == "minecraft:redstone_wire") inWeirdos = true
        else inWeirdos = false


    
    } catch (e) {}
}).setFps(1)


function doChestStuff(entityName, mapToAddTo) {
    if (mapToAddTo.has(entityName)) return
    
    const armorStand = World.getAllEntitiesOfType(EntityArmorStand).find(a => a.getName().removeFormatting() == entityName)
    if (!armorStand) return

    let [x, y, z] = getObjectXYZ(armorStand, true)
    
    for (let dir of directions) {
        let [dx, dz] = dir
        if (World.getBlockAt(x+dx, y, z+dz).type.getID() !== 54) continue
        mapToAddTo.set(entityName, [x+dx, y, z+dz])
        return
    }
}


register("chat", (event) => {
    if (!IsInDungeon() || !Settings().ThreeWeirdosSolver|| !inWeirdos) return

    const message = ChatLib.getChatMessage(event).removeFormatting()

    if (new RegExp("PUZZLE SOLVED! (\w+) wasn't fooled by (\w+)! Good job!", "").test(message)) {
        correctChests.clear()
        incorrectChests.clear()
        setTimeout(() => inWeirdos = false, 5000)
        return
    }

    const match = message.match(/\[NPC\] (\w+): (.+)/)
    if (!match) return

    let [msg, name, text] = match

    if (solutions.some(a => text.match(a))) {
        cancel(event)

        ModMessage(`&e[NPC] &c${name}'s&a Chest Is the correct one`)
        doChestStuff(name, correctChests)

        return

    }
    
    if (!wrong.some(a => a.test(text))) return

    cancel(event)

    doChestStuff(name, incorrectChests)

})


function highlightChest(coord, red, green, blue, alpha) {
    let [x, y, z] = coord
    Render.FilledOutLineBox(x+0.5, y-0.1, z+0.5, 1, 1, red, green, blue, alpha, true)
}


registerWhen(register("renderWorld", () => {
    correctChests.forEach((v) => {
        let [r, g, b, a] = Settings().ThreeWeirdosSolverColor
        highlightChest(v, r/255, g/255, b/255, a/255)
        Render.StringWithShadow("CLICK ME!", v[0]+0.5, v[1] + 1.75, v[2]+0.5, Renderer.color(r, g, b, a), 2, true)
    })
    incorrectChests.forEach((v) => highlightChest(v, 1, 0, 0, 0.20))
}), () => inWeirdos)


registerWhen(register("worldUnload", () => {
    correctChests.clear()
    incorrectChests.clear()
}), () => Settings().ThreeWeirdosSolver)
