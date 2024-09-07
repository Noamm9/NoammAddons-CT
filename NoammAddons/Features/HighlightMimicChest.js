/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { IsInDungeon, Render, registerWhen } from "../utils"

const TileEntityChest = Java.type("net.minecraft.tileentity.TileEntityChest")


function getTrappedChests() {
    return World.getWorld().field_147482_g.filter(e => e instanceof TileEntityChest && e.func_145980_j() == 1).map(entity => 
        [entity.func_174877_v().func_177958_n(), entity.func_174877_v().func_177956_o(), entity.func_174877_v().func_177952_p()])
}


const trigger = register(`renderWorld`, () => {

    const TrappedChestsCoords = getTrappedChests()

    if (!TrappedChestsCoords) return
    const TrappedChestsCoordsArray = Array.from(TrappedChestsCoords);

    TrappedChestsCoordsArray.forEach((key) => {
        const [X, Y, Z] =  key

        Render.FilledOutLineBox(X+0.5, Y + 0.01, Z+0.5, 1, 1-0.01, 255/255, 60/255, 60/255, 25/100, true)
        Render.StringWithShadow("Mimic", X+0.5, Y + 2, Z+0.5, Renderer.color(255, 60, 60), 2, true)
    })

})



registerWhen(trigger, () => Settings().HighlightMinicChest && IsInDungeon())