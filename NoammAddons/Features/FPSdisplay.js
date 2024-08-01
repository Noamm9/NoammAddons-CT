/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import { GuiElement } from "../EditGui"
import Settings from "../Settings"
import { FPSdisplayGUIdata, registerWhen } from "../utils"

const FPSdisplayGuiElement = new GuiElement(FPSdisplayGUIdata, `&d${Client.getFPS()} fps`)

registerWhen(register('renderOverlay', () => {
	FPSdisplayGuiElement.setText(`&d${Client.getFPS()} fps`)
	FPSdisplayGuiElement.Draw()
}), () => Settings().FPSdisplay)