/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { registerWhen } from "../utils"


const InPortal = Java.type("net.minecraft.entity.Entity").class.getDeclaredField("field_71087_bX")
InPortal.setAccessible(true)


function StartOrStop() {
    return Player.getPlayer() && Settings().HidePortalEffect
}

const trigger = register("renderPortal", (event) => { 
    cancel(event)
    InPortal.set(Player.getPlayer(), false)
}).unregister()


registerWhen(trigger, StartOrStop)