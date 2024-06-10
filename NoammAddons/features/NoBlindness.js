/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Dungeon from "../../BloomCore/dungeons/Dungeon"
import Settings from "../Settings"
import { registerWhen } from "../utils"
const RenderFogEvent = net.minecraftforge.client.event.EntityViewRenderEvent.FogDensity


const trigger = register(RenderFogEvent, (event) => cancel(event)).unregister()


function StartOrEnd() {
    return Settings.NoBlindness && Dungeon.inDungeon
}


registerWhen(trigger, StartOrEnd)