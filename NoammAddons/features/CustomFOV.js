/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Config/Settings";

register("step", () => { 
	if (Settings.CustomFOV) Client.settings.setFOV(Settings.FOV)
}).setFps(1)
