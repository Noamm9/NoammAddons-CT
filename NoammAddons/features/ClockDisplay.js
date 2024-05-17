/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Config/Settings";
import PogObject from "../../PogData";


const LocalTime = Java.type("java.time.LocalTime");
const DateTimeFormatter = Java.type("java.time.format.DateTimeFormatter");
let chromaValue = 0;
const ClockDisplayGUI = new Gui();
let md = false

const ClockDisplayGUIdata = new PogObject("Noammaddons", {
	x: 10,
	y: 90,
	s: 100,
}, "Config/ClockDisplay.json");


ClockDisplayGUI.addButton(1, Renderer.screen.getWidth() / 2 -50, Renderer.screen.getHeight() - Renderer.screen.getHeight() / 4, 100, 20, "Reset Element");
ClockDisplayGUI.registerActionPerformed(() => {
	ClockDisplayGUIdata.x = 10
	ClockDisplayGUIdata.y = 10
	ClockDisplayGUIdata.s = 100
	//World.playSound('gui.button.press', 1, 1)
})


ClockDisplayGUI.registerClicked(() => {
	if (ClockDisplayGUI.isOpen()) {
		md = true
	}
})

register("dragged", (dx, dy) => {
if (md) {
	ClockDisplayGUIdata.x += dx
	ClockDisplayGUIdata.y += dy
}
})

ClockDisplayGUI.registerMouseReleased(() => {
    md = false
    ClockDisplayGUIdata.save();
})

register("scrolled", (x, y, direction) => {
	if (ClockDisplayGUI.isOpen()) {
		if (direction == -1) {
			ClockDisplayGUIdata.s += 1
		} else if (direction == 1) {
			ClockDisplayGUIdata.s -= 1
		}
		if (ClockDisplayGUIdata.s < 60) {
			ClockDisplayGUIdata.s = 60
		}
	}
})

ClockDisplayGUI.registerClosed(() => {
	ClockDisplayGUIdata.save()
})


register("command", () => {
	ClockDisplayGUIdata.save()
	ClockDisplayGUI.open()
}).setName("clockdisplaygui");


register('step', (elapsed) => {
    chromaValue = elapsed
})


register('renderOverlay', () => {
    if(!true) return
    let time = LocalTime.now();
    new Text(time.format(DateTimeFormatter.ofPattern("HH:mm:ss")),
    ClockDisplayGUIdata.x ,ClockDisplayGUIdata.y)
    .setColor(Renderer.getRainbow(chromaValue, 90))
    .setShadow(true).setScale(ClockDisplayGUIdata.s/100).draw()
})