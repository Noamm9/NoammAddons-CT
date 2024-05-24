/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import { BonzoMaskGUIdata } from "../index";
import Settings from "../Config/Settings";

export var Timer = null; 
export let Text = new Text(` `).setShadow(true).setFormatted(true) 
export let md = false

register("chat", () => { 
	if (!Settings.BonzoMaskTimer) return
	Timer = 240
	RenderRegister.register()
}).setChatCriteria("Your Bonzo's Mask saved your life!")


export const RenderRegister = register("renderOverlay", () => {

	Text.setX(BonzoMaskGUIdata.x)
	Text.setY(BonzoMaskGUIdata.y)
	Text.setScale(BonzoMaskGUIdata.s/100)
	Text.draw()

	if (Timer > 0) Text.setString("&9Bonzo Mask: &a" + Timer)
	else if (Timer === 0 || Timer > -30) Text.setString("&9Bonzo Mask: &aREADY")
	else RenderRegister.unregister()

}).unregister()