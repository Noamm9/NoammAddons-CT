/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Settings"
import { registerWhen } from "../utils"
const RenderFogEvent = net.minecraftforge.client.event.EntityViewRenderEvent.FogDensity


const trigger = register(RenderFogEvent, (event) => {
    if (!Settings.NoBlindness || !World.isLoaded()) return
    GlStateManager.func_179095_a(0)
    GlStateManager.func_179102_b(parseFloat(`998f`))
    GlStateManager.func_179153_c(parseFloat(`999f`))
    cancel(event)
}).unregister()

function StartOrEnd() {
    if (Settings.NoBlindness || World.isLoaded()) return true
    else return false
}


registerWhen(trigger, StartOrEnd)