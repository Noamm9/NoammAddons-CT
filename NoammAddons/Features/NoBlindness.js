/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { IsInDungeon, registerWhen } from "../utils"
const RenderFogEvent = net.minecraftforge.client.event.EntityViewRenderEvent.FogDensity


registerWhen(register(RenderFogEvent, event => event.setCanceled(true)).unregister(), () => Settings().NoBlindness && World.isLoaded() && IsInDungeon())