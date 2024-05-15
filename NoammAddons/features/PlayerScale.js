/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Config/Settings";

setTimeout(() => {
    register("renderEntity", (entity) => {
        if (entity.getName() != Player.getName() || !Settings.PlayerScale) return
        Tessellator.pushMatrix()
        Tessellator.scale(Settings.CustomPlayerScale/100, Settings.CustomPlayerScale/100, Settings.CustomPlayerScale/100)
    })
    
    register("postRenderEntity", (entity) => {
        if (entity.getName() != Player.getName() || !Settings.PlayerScale) return
        Tessellator.popMatrix()
    })
}, 1000)