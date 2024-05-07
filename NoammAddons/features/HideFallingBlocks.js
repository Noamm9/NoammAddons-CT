/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Settings";
import Dungeon from "../../BloomCore/dungeons/Dungeon"


register("RenderEntity", (entity, pos, ticks, event) => {
    if (!Settings.HideFallingBlocks || !Dungeon.inDungeon) return
    if(entity.getName() === "Falling Block") {
        cancel(event)
    }
})
