/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { registerWhen } from "../utils"


function StartOrStop() {
    if (Settings().HideFallingBlocks) return true
    else return false
}


const trigger = TriggerRegister.registerRenderEntity((entity, pos, ticks, event) => {
    if(entity.getName() == "Falling Block")
    entity.getEntity().func_70106_y()
})


registerWhen(trigger, StartOrStop)
