/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Settings"
import RenderLib from "../../RenderLib"
import { IsInBossRoom, IsInDungeon, registerWhen } from "../utils"

let Entities = []

const espBox = (x, y, z, r, g, b, height) => RenderLib.drawEspBox(
    x, y-height, z, 
    0.9, height, 
    r, g, b,
    1, true
)

const espfilledBox = (x, y, z, r, g, b, a, height) => RenderLib.drawInnerEspBox(
    x, y-height, z, 
    0.9, height, 
    r, g, b, a,
    1, true
)


registerWhen(register("renderWorld", pt => {
    let [r, g, b, a,] = [
        Settings().MobESPColor[0]/255, 
        Settings().MobESPColor[1]/255, 
        Settings().MobESPColor[2]/255, 
        Settings().MobESPColor[3] /255
    ]

    try {
        Entities.forEach(entity => {
        let name = ChatLib.removeFormatting(entity.getName().removeFormatting())
        



        if (name.includes("Shadow Assassin")) {
            if (Settings().MobESPMode == 1) espfilledBox(entity.getRenderX(), entity.getRenderY()+2, entity.getRenderZ(), r, g, b, a, 1.9)
            else if (Settings().MobESPMode == 0) espBox(entity.getRenderX(), entity.getRenderY()+2, entity.getRenderZ(), r, g, b, 1.9)
            else {
                espBox(entity.getRenderX(), entity.getRenderY()+2, entity.getRenderZ(), r, g, b, 1.9)
                espfilledBox(entity.getRenderX(), entity.getRenderY()+2, entity.getRenderZ(), r, g, b, a, 1.9)
            }
        }
        
        
        
        
        if (name.includes("✯")) {

            if (name.includes("Fel") || name.includes("Withermancer")) {
                if (Settings().MobESPMode == 0) espBox(entity.getRenderX(), entity.getRenderY(), entity.getRenderZ(), r, g, b, 2.8);
                else if (Settings().MobESPMode == 1) espfilledBox(entity.getRenderX(), entity.getRenderY(), entity.getRenderZ(), r, g, b, a, 2.8)
                else {
                espBox(entity.getRenderX(), entity.getRenderY(), entity.getRenderZ(), r, g, b, 2.8)
                espfilledBox(entity.getRenderX(), entity.getRenderY(), entity.getRenderZ(), r, g, b, a, 2.8)
                }
            }
            else {
                // entity.getEntity().func_82142_c(false);
                if (Settings().MobESPMode == 1) espfilledBox(entity.getRenderX(), entity.getRenderY(), entity.getRenderZ(), r, g, b, a, 1.9)
                else if (Settings().MobESPMode == 0) espBox(entity.getRenderX(), entity.getRenderY(), entity.getRenderZ(), r, g, b, 1.9)
                else {
                    espBox(entity.getRenderX(), entity.getRenderY(), entity.getRenderZ(), r, g, b, 1.9)
                    espfilledBox(entity.getRenderX(), entity.getRenderY(), entity.getRenderZ(), r, g, b, a, 1.9)
                }
            }
        }
    })} catch (e) {}

}), () => Settings().DungeonMobESP && IsInDungeon() && !IsInBossRoom())

register(`step`, () => Entities = World.getAllEntities().filter(entity => entity.getName().match(/^§6✯ (?:§.)*(.+)§r.+§c❤|(Shadow Assassin)$/) || entity.getName().removeFormatting().includes(`Shadow Assassin`))).setFps(5)

//register(`command`, () => Entities.forEach(entity => ChatLib.chat(entity.getName()))).setName(`test`)