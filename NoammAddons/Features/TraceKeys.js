/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { IsInBossRoom, IsInDungeon, Render, registerWhen } from "../utils";


const Trigger = register(`renderWorld`, () => {
    World.getAllEntities().forEach(entity => {
        if (entity.getName().removeFormatting() == `Wither Key`) Render.drawTrace(entity.getRenderX(), entity.getRenderY()+1.5, entity.getRenderZ(), 0, 0, 0)
        if (entity.getName().removeFormatting() == `Blood Key`) Render.drawTrace(entity.getRenderX(), entity.getRenderY()+1.5, entity.getRenderZ(), 255 , 0, 0)

    })
})


registerWhen(Trigger, () => Settings.TraceKeys && !IsInBossRoom() && IsInDungeon())