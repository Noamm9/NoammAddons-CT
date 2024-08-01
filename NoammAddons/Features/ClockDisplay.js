/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import { GuiElement } from "../EditGui";
import Settings from "../Settings";
import { ClockDisplayGUIdata, registerWhen } from "../utils";


const LocalTime = Java.type("java.time.LocalTime");
const DateTimeFormatter = Java.type("java.time.format.DateTimeFormatter");

const ClockDisplayGuiElement = new GuiElement(ClockDisplayGUIdata, `&6${LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss"))}`)

registerWhen(register('renderOverlay', () => {
    ClockDisplayGuiElement.setText(`&6${LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss"))}`)
    ClockDisplayGuiElement.Draw()
}), () => Settings().ClockDisplay)