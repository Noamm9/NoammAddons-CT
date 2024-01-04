/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings";
import { makeObjectDraggable } from "../../Draggable";

var BonzoTimer = null;
const BonzoMaskGUI = new Gui();
const BonzoMaskXYS = { x: 10, y: 10, s: Settings.SpiritScale };
makeObjectDraggable("BonzoMT", BonzoMaskXYS, () => BonzoMaskGUI.isOpen(), "DELTA");
register("scrolled", (x, y, direction) => {
	if (BonzoMaskGUI.isOpen()) {
		if (direction == -1) {
			BonzoMaskXYS.s = BonzoMaskXYS.s + 1
		} else if (direction == 1) {
			BonzoMaskXYS.s = BonzoMaskXYS.s - 1
		}
		if (BonzoMaskXYS.s < 60) {
			BonzoMaskXYS.s = 60
		}
	}
})


register("command", () => {
	BonzoMaskGUI.open();
	BonzoMaskXYS.x = 20
	BonzoMaskXYS.y = 20
	BonzoMaskXYS.s = 100
	ChatLib.command("ct simulate &cTEST! &rYour Bonzo's Mask saved your life! &cTEST!", true)
}).setName("bonzomaskgui");

register("tick", () => {
	if (BonzoMaskGUI.isOpen()) {
		BonzoTimer = 0
	}
})


register("chat", () => { //BoNZO
	if (!Settings.BonzoMaskTimer) return
	///console.log("Bonzo mask working")
	BonzoTimer = 180
	register("renderOverlay", () => {
	if (BonzoTimer > 0) {
		new Text("&9Bonzo Mask: &a" + BonzoTimer, 
		BonzoMaskXYS.x, BonzoMaskXYS.y)
		.setShadow(true).setFormatted(true).setScale(BonzoMaskXYS.s / 100).draw();
	} else if (BonzoTimer === 0){
		new Text("&9Bonzo Mask: &aREADY", 
		BonzoMaskXYS.x, BonzoMaskXYS.y)
		.setShadow(true).setFormatted(true).setScale(BonzoMaskXYS.s / 100).draw();
	}
	})
}).setCriteria("Your Bonzo's Mask saved your life!").setParameter("contains")
	

register("step", () => { //timer for Bonzo
	if (BonzoTimer > 0) {
		BonzoTimer -= 1
	}
}).setDelay(1)
