/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { Render, registerWhen, prefix, convertToRealCoords, IsInDungeon, IsInBossRoom, WitherDoorsOffsets, intToRGB } from "../utils"; 
import { EntityArmorStand, EntityBlaze, getEntityXYZ, getRoomCenter } from "../../BloomCore/utils/Utils"

const roomCoords = [
    [-8, 69, -6],
    [-9, 72, 5],
]


let inBlaze = false
let blazes = []
let blazeStarted = null
let trueTimeStarted = null
let lastBlazeCount = 10


register("tick", () => {
    if (!IsInDungeon() || IsInBossRoom()) return

	if (!inBlaze) {
        inBlaze = false
        blazes.length = 0
        blazeStarted = null
        trueTimeStarted = null
        lastBlazeCount = 10
	}

    

    let rotation = null
    let [x, z] = getRoomCenter()
    for (let i = 0; i < WitherDoorsOffsets.length; i++) {
        let [dx, dz] = WitherDoorsOffsets[i]
        let block = World.getBlockAt(x+dx, 68, z+dz)
        let blockID = block.type.getID()
        if (!blockID) continue
        if (blockID !== 0 && rotation !== null) return 

        rotation = i*90
    }
    if (rotation == null) return


    inBlaze = roomCoords.some(([x0, y0, z0]) => {
        const [x1, y1, z1] = convertToRealCoords(x0, y0, z0, x, z, rotation)
        return World.getBlockAt(x1, y1, z1).type.getRegistryName() == "minecraft:leaves"
    })

    

})


register("tick", () => {
    if (!Settings.BlazeSolver || !IsInDungeon() || IsInBossRoom() || !inBlaze) return

    const hpMap = new Map()
    blazes.length = 0

    World.getAllEntitiesOfType(EntityArmorStand).forEach(e => {
        // https://regex101.com/r/g2x8Qo/1
        const match = e.getName().removeFormatting().match(/^\[Lv15\] Blaze [\d,]+\/([\d,]+)❤$/)

        if (!match) return
        const [_, health] = match
        hp = parseInt(health.replace(/,/g, ""))

        hpMap.set(e, hp)
        blazes.push(e)
    })

    // Start each timer
    if (blazes.length == 10 && !trueTimeStarted) trueTimeStarted = Date.now()
    if (blazes.length == 9 && !blazeStarted) blazeStarted = Date.now()

        
    if (!blazes || !blazes.length) {

        if (lastBlazeCount !== 1) return

        new TextComponent(`${prefix} Blaze Puzzle took &b${Math.floor((Date.now() - blazeStarted)/10)/100}s`)
            .setHover("show_text", `&fTrue time taken: &b${Math.floor((Date.now() - trueTimeStarted)/10)/100}`).chat()

        lastBlazeCount = 0

        return
    }

    lastBlazeCount = blazes.length
    blazes.sort((a, b) => hpMap.get(a) - hpMap.get(b))
    
    const [x, z] = getRoomCenter()

    if (World.getBlockAt(x+1, 118, z).type.getID() !== 4) blazes.reverse()
    
})



registerWhen(register("renderEntity", (entity, pos, pt, event) => {
    if (entity.getName().removeFormatting().startsWith("[Lv15] Blaze ")) cancel(event)
//    if (entity.getEntity() instanceof EntityBlaze) return cancel(event)
}), () => Settings.BlazeSolver && IsInDungeon() && !IsInBossRoom() && blazes.length) 




registerWhen(register("renderWorld", () => {
    blazes.forEach((entity, i) => {
        let [r, g, b, a] = i == 0 ? intToRGB(Settings.BlazeSolverFirstBlazeColor.getRGB(), true) : i == 1 ? intToRGB(Settings.BlazeSolverSecondBlazeColor.getRGB(), true) : intToRGB(Settings.BlazeSolverThirdBlazeColor.getRGB(), true)
        Render.FilledOutLineBox(entity.getX(), entity.getY()-2, entity.getZ(), 1.2, 1.8, r, g, b, a, false)


        if (i > 0 && i <= 2) {
            let [x0, y0, z0] = getEntityXYZ(blazes[i-1])
            let [x1, y1, z1] = getEntityXYZ(blazes[i])
            Render.Line(x0, y0-1, z0, x1, y1-1, z1, ...intToRGB(Settings.BlazeSolverLineColor.getRGB(), true), false, 3)

            
        }
    })
}), () => Settings.BlazeSolver && IsInDungeon() && !IsInBossRoom())
