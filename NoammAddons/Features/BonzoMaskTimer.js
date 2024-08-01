/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings";
import { BonzoMaskGUIdata, registerWhen } from "../utils";
import { GuiElement } from "../EditGui";

const BonzoMaskElement = new GuiElement(BonzoMaskGUIdata, "&9Bonzo Mask: &aREADY", true)
let Timer


registerWhen(register("chat", () => { 
	Timer = Date.now()
	RenderRegister.register()

}).setChatCriteria(/Your (?:. )?Bonzo's Mask saved your life!/), () => Settings().BonzoMaskTimer)


const RenderRegister = register("renderOverlay", () => {
	let TimerText = ((183_000 + (Timer - Date.now()))/1000).toFixed(1)


	if (TimerText > 0) BonzoMaskElement.setText("&9Bonzo Mask: &a" + TimerText)
	else if (TimerText === 0 || TimerText > -30) BonzoMaskElement.setText("&9Bonzo Mask: &aREADY")
	else RenderRegister.unregister()
	
	BonzoMaskElement.Draw()
}).unregister()