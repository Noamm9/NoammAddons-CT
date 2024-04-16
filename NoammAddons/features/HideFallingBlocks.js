/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Settings";


register("RenderEntity", (entity) => {
    if (!Settings.HideFallingBlocks) return
    if(entity.getName() === "Falling Block") {
        entity.getEntity().func_70106_y
    }
})