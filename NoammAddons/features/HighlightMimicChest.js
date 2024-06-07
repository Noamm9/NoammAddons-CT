/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import Dungeon from "../../BloomCore/dungeons/Dungeon"
import { ModMessage, Render, registerWhen } from "../utils"
const TileEntityChest = Java.type("net.minecraft.tileentity.TileEntityChest")

function StartOrStop() {
    if (Settings.HighlightMinicChest && Dungeon.inDungeon) return true
    else return false
}


function getTrappedChests() {
    World.getWorld().field_147482_g.filter(e => e instanceof TileEntityChest && e.func_145980_j() == 1).map(entity => 
        [entity.func_174877_v().func_177958_n(), entity.func_174877_v().func_177956_o(), entity.func_174877_v().func_177952_p()])
}


const trigger = register(`renderWorld`, (pt) => {

    const test = getTrappedChests()
    if (!test) return
    const arr = Array.from(test);

    arr.forEach((key) => {
        const [X, Y, Z] =  key

        Render.FilledOutLineBox(X+0.5, Y + 0.01, Z+0.5, 1, 1-0.01, 255/255, 60/255, 60/255, 25/100, false)
        Render.StringWithShadow("Mimic", X+0.5, Y + 2, Z+0.5, Renderer.color(255, 60, 60), 2, false)
    })

}).unregister()



registerWhen(trigger, StartOrStop)