/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Config/Settings"
import PogObject from "../../PogData";


let chromaValue = 0;
const FPSdisplayGUI = new Gui();
let md = false

const FPSdisplayGUIdata = new PogObject("Noammaddons", {
	x: 10,
	y: 90,
	s: 100,
}, "Config/FPSdisplay.json");


register(`worldLoad`, () => FPSdisplayGUI.addButton(1, Renderer.screen.getWidth() / 2 -50, Renderer.screen.getHeight() - Renderer.screen.getHeight() / 4, 100, 20, "Reset Element"))
FPSdisplayGUI.registerActionPerformed(() => {
	FPSdisplayGUIdata.x = 10
	FPSdisplayGUIdata.y = 10
	FPSdisplayGUIdata.s = 100
	//World.playSound('gui.button.press', 1, 1)
})


FPSdisplayGUI.registerClicked(() => {
	if (FPSdisplayGUI.isOpen()) {
		md = true
	}
})

register("dragged", (dx, dy) => {
if (md) {
	FPSdisplayGUIdata.x += dx
	FPSdisplayGUIdata.y += dy
}
})

FPSdisplayGUI.registerMouseReleased(() => {
    md = false
    FPSdisplayGUIdata.save();
})

register("scrolled", (x, y, direction) => {
	if (FPSdisplayGUI.isOpen()) {
		if (direction == -1) {
			FPSdisplayGUIdata.s += 1
		} else if (direction == 1) {
			FPSdisplayGUIdata.s -= 1
		}
		if (FPSdisplayGUIdata.s < 60) {
			FPSdisplayGUIdata.s = 60
		}
	}
})

FPSdisplayGUI.registerClosed(() => {
	FPSdisplayGUIdata.save()
})


register("command", () => {
	FPSdisplayGUIdata.save()
	FPSdisplayGUI.open()
}).setName("fpsdisplaygui");


register('step', (elapsed) => chromaValue = elapsed)


register('renderOverlay', () => {
    if(!Settings.FPSdisplay) return
    let FPS = Client.getFPS()
    new Text(`${FPS} fps`,
    FPSdisplayGUIdata.x ,FPSdisplayGUIdata.y)
    .setColor(Renderer.getRainbow(chromaValue, 90))
    .setShadow(true).setScale(FPSdisplayGUIdata.s/100).draw()
})