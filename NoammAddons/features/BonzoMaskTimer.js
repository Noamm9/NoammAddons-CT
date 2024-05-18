/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Config/Settings";
import PogObject from "../../PogData";

var BonzoTimer = null;
const BonzoMaskGUI = new Gui();
let md = false

const BonzoMaskGUIdata = new PogObject("Noammaddons", {
	x: 10,
	y: 90,
	s: 100,
}, "Config/BonzoMask.json");

register(`worldLoad`, () => BonzoMaskGUI.addButton(1, Renderer.screen.getWidth() / 2 -50, Renderer.screen.getHeight() - Renderer.screen.getHeight() / 4, 100, 20, "Reset Element"))
BonzoMaskGUI.registerActionPerformed(() => {
	BonzoMaskGUIdata.x = 10
	BonzoMaskGUIdata.y = 10
	BonzoMaskGUIdata.s = 100
	//World.playSound('gui.button.press', 1, 1)
})

BonzoMaskGUI.registerClicked(() => {
	if (BonzoMaskGUI.isOpen()) {
		md = true
	}
})


register("dragged", (dx, dy) => {
if (md) {
	BonzoMaskGUIdata.x += dx
	BonzoMaskGUIdata.y += dy
}
})


BonzoMaskGUI.registerMouseReleased(() => {
    md = false
    BonzoMaskGUIdata.save();
})

register("scrolled", (x, y, direction) => {
	if (BonzoMaskGUI.isOpen()) {
		if (direction == -1) {
			BonzoMaskGUIdata.s = BonzoMaskGUIdata.s + 1
		} else if (direction == 1) {
			BonzoMaskGUIdata.s = BonzoMaskGUIdata.s - 1
		}
		if (BonzoMaskGUIdata.s < 60) {
			BonzoMaskGUIdata.s = 60
		}
	}
})


BonzoMaskGUI.registerClosed(() => {
	BonzoMaskGUIdata.save()
})

register("command", () => {
	BonzoMaskGUIdata.save();
	BonzoMaskGUI.open();
	ChatLib.command("ct simulate &cTEST! &rYour Bonzo's Mask saved your life! &cTEST!", true)
	setTimeout(() => { BonzoTimer = 0 }, 200);
}).setName("bonzomaskgui");


register("chat", (event) => { 
	if (!Settings.BonzoMaskTimer) return
	BonzoTimer = 240
	register("renderOverlay", () => {
	if (BonzoTimer > 0) {							
		new Text("&9Bonzo Mask: &a" + BonzoTimer,
		BonzoMaskGUIdata.x, BonzoMaskGUIdata.y)
		.setShadow(true).setFormatted(true).setScale(BonzoMaskGUIdata.s / 100).draw();
	} else if (BonzoTimer === 0){
		new Text("&9Bonzo Mask: &aREADY", 
		BonzoMaskGUIdata.x, BonzoMaskGUIdata.y)
		.setShadow(true).setFormatted(true).setScale(BonzoMaskGUIdata.s / 100).draw();
	}
})
}).setChatCriteria("Your Bonzo's Mask saved your life!").setContains()

register("step", () => { 
	if (BonzoTimer > 0) {
		BonzoTimer -= 1
	}
}).setDelay(1)
