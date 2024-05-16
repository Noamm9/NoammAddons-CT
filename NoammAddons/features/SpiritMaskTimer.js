
/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Config/Settings";
import PogObject from "../../PogData";

var SpiritTimer = null;
const SpiritMaskGUI = new Gui();
let md = false

const SpiritMaskGUIdata = new PogObject("Noammaddons", {
	x: 10,
	y: 90,
	s: 100,
}, "Config/SpiritMask.json");

SpiritMaskGUI.addButton(1, Renderer.screen.getWidth() / 2 -50, Renderer.screen.getHeight() - Renderer.screen.getHeight() / 4, 100, 20, "Reset Element");
SpiritMaskGUI.registerActionPerformed(() => {
	SpiritMaskGUIdata.x = 10
	SpiritMaskGUIdata.y = 10
	SpiritMaskGUIdata.s = 100
	//World.playSound('gui.button.press', 1, 1)
})

SpiritMaskGUI.registerClicked(() => {
	if (SpiritMaskGUI.isOpen()) {
		md = true
	}
})


register("dragged", (dx, dy) => {
if (md) {
	SpiritMaskGUIdata.x += dx
	SpiritMaskGUIdata.y += dy
}
})


SpiritMaskGUI.registerMouseReleased(() => {
    md = false
    SpiritMaskGUIdata.save();
})

register("scrolled", (x, y, direction) => {
	if (SpiritMaskGUI.isOpen()) {
		if (direction == -1) {
			SpiritMaskGUIdata.s = SpiritMaskGUIdata.s + 1
		} else if (direction == 1) {
			SpiritMaskGUIdata.s = SpiritMaskGUIdata.s - 1
		}
		if (SpiritMaskGUIdata.s < 60) {
			SpiritMaskGUIdata.s = 60
		}
	}
})


SpiritMaskGUI.registerClosed(() => {
	SpiritMaskGUIdata.save()
})


register("command", () => {
	SpiritMaskGUIdata.save();
	SpiritMaskGUI.open();
	ChatLib.command("ct simulate &cTEST! &rSecond Wind Activated! Your Spirit Mask saved your life! &cTEST!", true)
	setTimeout(() => { SpiritTimer = 0 }, 200);
}).setName("spiritmaskgui");


register("chat", (event) => { 
	if (!Settings.SpiritMaskTimer) return
	SpiritTimer = 30
	register("renderOverlay", () => {
	if (SpiritTimer > 0) {							
		new Text("&fSpirit Mask: &a" + SpiritTimer,
		SpiritMaskGUIdata.x, SpiritMaskGUIdata.y)
		.setShadow(true).setFormatted(true).setScale(SpiritMaskGUIdata.s / 100).draw();
	} else if (SpiritTimer === 0){
		new Text("&fSpirit Mask: &aREADY", 
		SpiritMaskGUIdata.x, SpiritMaskGUIdata.y)
		.setShadow(true).setFormatted(true).setScale(SpiritMaskGUIdata.s / 100).draw();
	}
})
}).setChatCriteria("Second Wind Activated! Your Spirit Mask saved your life!").setContains()

register("step", () => { 
	if (SpiritTimer > 0) {
		SpiritTimer -= 1
	}
}).setDelay(1)

