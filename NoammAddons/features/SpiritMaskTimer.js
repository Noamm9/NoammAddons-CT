
/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import { SpiritMaskGUIdata } from "../index";
import Settings from "../Settings";

export var Timer = null; 
export let Text = new Text(` `).setShadow(true).setFormatted(true) 
export let md = false

register("chat", () => { 
	if (!Settings.SpiritMaskTimer) return
	Timer = 30
	RenderRegister.register()
}).setChatCriteria("Second Wind Activated! Your Spirit Mask saved your life!")


export const RenderRegister = register("renderOverlay", () => {

	Text.setX(SpiritMaskGUIdata.x)
	Text.setY(SpiritMaskGUIdata.y)
	Text.setScale(SpiritMaskGUIdata.s/100)
	Text.draw()

	if (Timer > 0) Text.setString("&fSpirit Mask: &a" + Timer)
	else if (Timer == 0 || Timer > -30) Text.setString("&fSpirit Mask: &aREADY")
	else RenderRegister.unregister()

}).unregister()

register("step", () => Timer -= 1 ).setFps(1)