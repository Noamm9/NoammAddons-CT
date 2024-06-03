/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings";


let rot = 0;
setTimeout(() => {
    register("step", (i) => {
        if (!Settings.ClientSideSpin) return
        if (Settings.SpinDiraction == 0) rot = ((i*(Settings.SpinSpeed*0.06)) % 360) - 180 // right
        else rot = 180 - ((i*(Settings.SpinSpeed*0.06)) % 360) // left
    }).setFps(100)
    
    register("renderEntity", (entity) => {
        try {
            if (entity.getName() != Player.getName() || !Settings.ClientSideSpin) return
            Tessellator.pushMatrix()
            Tessellator.rotate(rot, 0, 1, 0)
        } catch (e) {}
    })
    
    register("postRenderEntity", (entity) => {
        try {
            if (entity.getName() != Player.getName() || !Settings.ClientSideSpin) return
            Tessellator.popMatrix()
        } catch (e) {}
    })
}, 1000)

