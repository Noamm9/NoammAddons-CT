/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Settings"
const RenderFogEVENT = net.minecraftforge.client.event.EntityViewRenderEvent.FogDensity

register(RenderFogEVENT, (event) => {
    if (!Settings.NoBlindness) return
    cancel(event)
    GlStateManager.func_179095_a(0)
    GlStateManager.func_179102_b(parseFloat(`998f`))
    GlStateManager.func_179153_c(parseFloat(`999f`))
})