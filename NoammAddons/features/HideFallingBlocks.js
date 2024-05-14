/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Config/Settings";


TriggerRegister.registerRenderEntity((entity, pos, ticks, event) => {
    if(Settings.HideFallingBlocks && entity.getName() === "Falling Block")
        cancel(event)
    })
