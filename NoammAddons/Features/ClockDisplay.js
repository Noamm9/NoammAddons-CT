/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Settings";
import { ClockDisplayGUIdata } from "../utils";


const LocalTime = Java.type("java.time.LocalTime");
const DateTimeFormatter = Java.type("java.time.format.DateTimeFormatter");

export let md = false
export let Text = new Text(` `).setShadow(true)

register('renderOverlay', () => {
    if(!Settings().ClockDisplay) return
    let time = LocalTime.now()
    Text.setString(time.format(DateTimeFormatter.ofPattern("HH:mm:ss")))
    Text.setX(ClockDisplayGUIdata.x)
	Text.setY(ClockDisplayGUIdata.y)
    Text.setColor(Renderer.color(0,114,255))
    Text.setScale(ClockDisplayGUIdata.s/100)
	Text.draw()
})