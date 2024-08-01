/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings";
import { registerWhen, SpiritMaskGUIdata } from "../utils";
import { GuiElement } from "../EditGui";


const SpiritMaskElement = new GuiElement(SpiritMaskGUIdata, "&fSpirit Mask: &aREADY")
let Timer


registerWhen(register("chat", () => {
	Timer = Date.now()
	RenderRegister.register()

}).setChatCriteria("Second Wind Activated! Your Spirit Mask saved your life!"), () => Settings().SpiritMaskTimer)


const RenderRegister = register("renderOverlay", () => {
	let TimerText = ((30_000 + (Timer - Date.now()))/1000).toFixed(1)


	if (TimerText > 0) SpiritMaskElement.setText("&fSpirit Mask: &a" + TimerText)
	else if (TimerText == 0 || TimerText > -30) SpiritMaskElement.setText("&fSpirit Mask: &aREADY")
	else RenderRegister.unregister()

	SpiritMaskElement.Draw()
}).unregister()
