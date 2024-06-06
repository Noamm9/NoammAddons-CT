/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import Dungeon from "../../BloomCore/dungeons/Dungeon"
import { Render, registerWhen } from "../utils"


function StartOrStop() {
    if (Settings.HighlightMinicChest && Dungeon.inDungeon) return true
    else return false
}


const trigger = register(`renderWorld`, () => {
    World.getAllTileEntities().forEach(entity => {
        if (entity.getBlockType().toString().removeFormatting() !== `BlockType{name=minecraft:trapped_chest}`) return
        const [X, Y, Z] = [entity.getBlock().getX()+0.5, entity.getBlock().getY(), entity.getBlock().getZ()+0.5]

        Render.FilledOutLineBox(X, Y + 0.01, Z, 1, 1-0.01, 255/255, 60/255, 60/255, 25/100, false)
        Render.StringWithShadow("Mimic", X, Y + 2, Z, Renderer.color(255, 60, 60), 2, false)

    })
}).unregister()


registerWhen(trigger, StartOrStop)