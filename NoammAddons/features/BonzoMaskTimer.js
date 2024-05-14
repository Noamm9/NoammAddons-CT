/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Config/Settings";;
import PogObject from "../../PogData";

var BonzoTimer = -100;
const BonzoMaskGUI = new Gui();

const BonzoMaskGUIdata = new PogObject("Noammaddons", {
	x: 10,
	y: 90,
	s: 100,
}, "Config/BonzoMask.json");

BonzoMaskGUI.addButton(1, Renderer.screen.getWidth() / 2 -50, Renderer.screen.getHeight() - Renderer.screen.getHeight() / 4, 100, 20, "Reset Element");
BonzoMaskGUI.registerActionPerformed(() => {
	BonzoMaskGUIdata.x = 10
	BonzoMaskGUIdata.y = 10
	BonzoMaskGUIdata.s = 100
	World.playSound('gui.button.press', 100, 1)
})


BonzoMaskGUI.registerMouseDragged((dx, dy) => {
	BonzoMaskGUIdata.x += dx
	BonzoMaskGUIdata.y += dy
})


BonzoMaskGUI.registerScrolled((x, y, direction) => {
	if (direction == -1) {
		BonzoMaskGUIdata.s = BonzoMaskGUIdata.s + 1
	} else if (direction == 1) {
		BonzoMaskGUIdata.s = BonzoMaskGUIdata.s - 1
	}
	if (BonzoMaskGUIdata.s < 60) {
		BonzoMaskGUIdata.s = 60
	}
})


BonzoMaskGUI.registerClosed(() => {
	BonzoMaskGUIdata.save()
})

register("command", () => {
	BonzoMaskGUIdata.save()
	BonzoMaskGUI.open()
	BonzoTimer = 0
}).setName("bonzomaskgui");


register("chat", (event) => { 
	if (!Settings.BonzoMaskTimer) return
	BonzoTimer = 240
	register("renderOverlay", () => {
	if (BonzoTimer > 0) {							
		new Text("&9Bonzo Mask: &a" + BonzoTimer,
		BonzoMaskGUIdata.x, BonzoMaskGUIdata.y)
		.setShadow(true).setFormatted(true).setScale(BonzoMaskGUIdata.s / 100).draw();
	} else if (BonzoTimer < 0 && BonzoTimer > -30){
		new Text("&9Bonzo Mask: &aREADY", 
		BonzoMaskGUIdata.x, BonzoMaskGUIdata.y)
		.setShadow(true).setFormatted(true).setScale(BonzoMaskGUIdata.s / 100).draw();
	}
	if (BonzoTimer < -30) {
		new Text("", 
		BonzoMaskGUIdata.x, BonzoMaskGUIdata.y)
		.setShadow(true).setFormatted(true).setScale(BonzoMaskGUIdata.s / 100).draw();
	}
})
}).setChatCriteria("Your Bonzo's Mask saved your life!")

register("step", () => { 
	BonzoTimer -= 1
}).setDelay(1)

