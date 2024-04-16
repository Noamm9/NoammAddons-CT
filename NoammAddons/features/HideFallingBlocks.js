/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Settings";


register("RenderEntity", (entity, pos, ticks, event) => {
    if (!Settings.HideFallingBlocks) return
    if(entity.getName() === "Falling Block") {
        cancel(event)
    }
})
