
/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Settings";
import { PhoenixPetGUIdata, registerWhen } from "../utils";
import { GuiElement } from "../EditGui";


const PhoenixGuiElement = new GuiElement(PhoenixPetGUIdata, "&5Phoenix Pet: &aREADY")
let Timer 



registerWhen(register("chat", () => { 
	Timer = Date.now()
	RenderRegister.register()
}).setChatCriteria("Your Phoenix Pet saved you from certain death!"), () => Settings().PhoenixPetTimer)


export const RenderRegister = register("renderOverlay", () => {
	let TimerText = ((60_000 + (Timer - Date.now()))/1000).toFixed(1)

	if (TimerText > 0) PhoenixGuiElement.setText("&5Phoenix Pet: &a" + TimerText)
	else if (TimerText == 0 || TimerText > -30) PhoenixGuiElement.setText("&5Phoenix Pet: &aREADY")
	else RenderRegister.unregister()

	PhoenixGuiElement.Draw()
}).unregister()