/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings";
import { registerWhen } from "../utils";

const EntityViewRenderEventFOVModifier = net.minecraftforge.client.event.EntityViewRenderEvent.FOVModifier


function StartOrStop() {
	return Settings.CustomFOV
}


const trigger = register(EntityViewRenderEventFOVModifier, () => Client.settings.setFOV(Settings.FOV))



registerWhen(trigger, StartOrStop)




