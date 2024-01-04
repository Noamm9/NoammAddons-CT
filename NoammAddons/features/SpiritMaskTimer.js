/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings";
import { makeObjectDraggable } from "../../Draggable";

var SpiritTimer = null;
const SpiritMaskGUI = new Gui();
const SpiritMaskXYS = { x: 10, y: 10, s: Settings.SpiritScale };
makeObjectDraggable("SpiritMT", SpiritMaskXYS, () => SpiritMaskGUI.isOpen(), "DELTA");
register("scrolled", (x, y, direction) => {
	if (SpiritMaskGUI.isOpen()) {
		if (direction == -1) {
			SpiritMaskXYS.s = SpiritMaskXYS.s + 1
		} else if (direction == 1) {
			SpiritMaskXYS.s = SpiritMaskXYS.s - 1
		}
		if (SpiritMaskXYS.s < 60) {
			SpiritMaskXYS.s = 60
		}
	}
})


register("command", () => {
	SpiritMaskGUI.open();
	SpiritMaskXYS.x = 20
	SpiritMaskXYS.y = 20
	SpiritMaskXYS.s = 100
	ChatLib.command("ct simulate &cTEST! &rSecond Wind Activated! Your Spirit Mask saved your life! &cTEST!", true)
}).setName("spiritmaskgui");

register("tick", () => {
	if (SpiritMaskGUI.isOpen()) {
		SpiritTimer = 0
	}
})


register("chat", (event) => { //Spirit
//	console.log("Spirit mask working")
if (!Settings.SpiritMaskTimer) return
	SpiritTimer = 30
	register("renderOverlay", () => {
	if (SpiritTimer > 0) {
		new Text("&fSpirit Mask: &a" + SpiritTimer, 
		SpiritMaskXYS.x, SpiritMaskXYS.y)
		.setShadow(true).setFormatted(true).setScale(SpiritMaskXYS.s / 100).draw();
	} else if (SpiritTimer === 0){
		const width = Renderer.screen.getWidth();
		const height = Renderer.screen.getHeight();
		new Text("&fSpirit Mask: &aREADY", 
		SpiritMaskXYS.x, SpiritMaskXYS.y)
		.setShadow(true).setFormatted(true).setScale(SpiritMaskXYS.s / 100).draw();
	}
})
}).setCriteria("Second Wind Activated! Your Spirit Mask saved your life!").setContains()


register("step", () => { //timer for Bonzo, Spirit, Phonix
	if (SpiritTimer > 0) {
		SpiritTimer -= 1
	}
}).setDelay(1)
