/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Settings";
import { WorldState } from "../../Atomx/skyblock/World"


register("RenderEntity", (entity, pos, ticks, event) => {
    if (!Settings.HideFallingBlocks || !WorldState.inDungeons()) return
    if(entity.getName() === "Falling Block") {
        cancel(event)
    }
})
