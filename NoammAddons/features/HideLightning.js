/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { registerWhen } from "../utils"


function StartOrStop() {
    if (Settings.HideLightning) return true
    else return false
}


const trigger = register("renderEntity", (entity, pos, ticks, event) => {
    if (entity.getClassName() !== "EntityLightningBolt") return
    cancel(event)
})


registerWhen(trigger, StartOrStop)
