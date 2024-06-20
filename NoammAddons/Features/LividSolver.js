/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { IsInDungeon, Render, registerWhen, intToRGB, IsInBossRoom } from "../utils"
import Dungeon from "../../BloomCore/dungeons/Dungeon"

const EntityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand")
const EntityOtherPlayerMP = Java.type("net.minecraft.client.entity.EntityOtherPlayerMP")

class Livid {
    constructor(woolMeta, name, color, entity, armorStand) {
        this.wool = woolMeta
        this.name = name
        this.color = color
        this.entity = entity
        this.armorStand = armorStand
    }
}

const livids = [  // [woolMeta, lividName, color]
    [0, "Vendetta", "§f"],
    [2, "Crossed", "§d"],
    [4, "Arcade", "§e"],
    [5, "Smile", "§a"],
    [7, "Doctor", "§7"],
    [10, "Purple", "§5"],
    [11, "Scream", "§9"],
    [13, "Frog", "§2"],
    [14,  "Hockey", "§c"]
]

let livid = null
let RainBowColor



const TickTrigger = register("tick", () => {
    let wool = World.getBlockAt(5, 108, 43) // wool on ceiling
    if (!wool || wool.type.getID() !== 35) return livid = null

    let meta = wool.getMetadata()
    let lividData = livids.find(a => a[0] == meta)
    if (!lividData) return

    const lividEntity = World.getAllEntitiesOfType(EntityOtherPlayerMP).find(a => a.getName() == `${lividData[1]} Livid`)
    const nametagArmorStand = World.getAllEntitiesOfType(EntityArmorStand).find(a => a.getName().startsWith(lividData[2]))
    if (!lividEntity || !nametagArmorStand) return livid = null
    
    livid = new Livid(...lividData, lividEntity, nametagArmorStand)
})


const RenderTrigger = register("renderWorld", () => {
    if (!RainBowColor) return
    Tessellator.pushMatrix()

    try {
        Render.FilledOutLineBox(livid.entity.getRenderX(), livid.entity.getRenderY(), livid.entity.getRenderZ(), 0.6, 1.8, RainBowColor[0]/255, RainBowColor[1]/255, RainBowColor[2]/255, 30/100, true)
        Render.drawTrace(livid.entity.getRenderX(), livid.entity.getRenderY()+1, livid.entity.getRenderZ(), RainBowColor[0]/255, RainBowColor[1]/255, RainBowColor[2]/255)
    } catch (e) {}

    Tessellator.popMatrix()
})


const HideTrigger = register("renderEntity", entity => {
    if (entity.isDead()) return
    if (!livid || !entity.getName().includes("Livid")) return
    if ([livid.entity.getName(), livid.armorStand.getName()].some(a => entity.getName() == a)) return
    entity.getEntity().func_70106_y()
})



registerWhen(register("worldUnload", () => livid = null), () => Settings.LividSolver)
registerWhen(register('step', (elapsed) => RainBowColor = intToRGB(Renderer.getRainbow(elapsed, 20))), () => Settings.LividSolver && IsInDungeon() && IsInBossRoom())
registerWhen(TickTrigger, () => IsInBossRoom() && IsInDungeon() && Settings.LividSolver && Dungeon.floorNumber == 5 )
registerWhen(RenderTrigger, () => IsInBossRoom() && IsInDungeon() && livid && Settings.LividSolver && Dungeon.floorNumber == 5)
registerWhen(HideTrigger, () => IsInDungeon() && Settings.HideWrongLivids && livid && Settings.LividSolver)

