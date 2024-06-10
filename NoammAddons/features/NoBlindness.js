/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { registerWhen, IsInDungeon } from "../utils"
const RenderFogEvent = net.minecraftforge.client.event.EntityViewRenderEvent.FogDensity


const trigger = register(RenderFogEvent, (event) => cancel(event)).unregister()


function StartOrEnd() {
    return Settings.NoBlindness && IsInDungeon()
}


registerWhen(trigger, StartOrEnd)