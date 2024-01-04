/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings";

register("tick", () => { 
	if (Settings.CustomFOV) {
		Client.settings.setFOV(Settings.FOV)
	}
	if (!Settings.CustomFOV) {
		if (Settings.FOV > 110)
			Client.settings.setFOV(110)
	}
})
