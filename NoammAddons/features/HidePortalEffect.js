/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { registerWhen } from "../utils"


const InPortal = Java.type("net.minecraft.entity.Entity").class.getDeclaredField("field_71087_bX")
InPortal.setAccessible(true)


function StartOrStop() {
    if (!Player.getPlayer()) return false
    if (Settings.HidePortalEffect) return true
    else return false
}

const trigger = register("renderPortal", (event) => { 
    cancel(event)
    InPortal.set(Player.getPlayer(), false)
}).unregister()


registerWhen(trigger, StartOrStop)