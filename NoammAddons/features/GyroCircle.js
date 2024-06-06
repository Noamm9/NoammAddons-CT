/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Settings"
import { registerWhen, Render } from "../utils"
import { getSkyblockItemID } from "../../BloomCore/utils/Utils"


function StartOrStop() {
    if (getSkyblockItemID(Player.getHeldItem()) == "GYROKINETIC_WAND" && Settings.GyroCircle) return true
    else return false
}


const trigger = register("renderWorld", (pt) => {

    const rayTrace = Player.getPlayer().func_174822_a(25, pt)
  
    if (rayTrace.field_72313_a.toString() !== "BLOCK") return
  
    Render.Cylinder(...getVec3iPos(rayTrace.func_178782_a()), 10, 1, -1, 30, 1, 0, 90, 90, 118/255, 0/255, 123/255, 100/100, false, true);
}).unregister()

function getVec3iPos(vec) {
    return [~~vec.func_177958_n() + 0.5, ~~vec.func_177956_o() + 2, ~~vec.func_177952_p() + 0.5]
}


registerWhen(trigger, StartOrStop)