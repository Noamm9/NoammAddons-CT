/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings";
const EntityViewRenderEventFOVModifier = net.minecraftforge.client.event.EntityViewRenderEvent.FOVModifier

register(EntityViewRenderEventFOVModifier, () => { 
	if (Settings.CustomFOV) Client.settings.setFOV(Settings.FOV)
})







