
/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import { PhoenixPetGUIdata } from "../index";
import Settings from "../Config/Settings";

export var Timer = null; 
export let Text = new Text(` `).setShadow(true).setFormatted(true) 
export let md = false


register("chat", () => { 
	if (!Settings.PhoenixPetTimer) return
	Timer = 30
	RenderRegister.register()
}).setChatCriteria("Your Phoenix Pet saved you from certain death!")


export const RenderRegister = register("renderOverlay", () => {
	
	Text.setX(PhoenixPetGUIdata.x)
	Text.setY(PhoenixPetGUIdata.y)
	Text.setScale(PhoenixPetGUIdata.s/100)
	Text.draw()

	if (Timer > 0) Text.setString("&5Phoenix Pet: &a" + Timer)
	else if (Timer == 0 || Timer > -30) Text.setString("&5Phoenix Pet: &aREADY")
	else RenderRegister.unregister()

}).unregister()

register("step", () => Timer -= 1 ).setFps(1)