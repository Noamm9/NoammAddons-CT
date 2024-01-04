/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings";
import { makeObjectDraggable } from "../../Draggable";

var PhoenixTimer = null;
const PhonixPetGUI = new Gui();
const PhonixPetXYS = { x: 10, y: 10, s: Settings.PhonixScale };
makeObjectDraggable("PhonixPT", PhonixPetXYS, () => PhonixPetGUI.isOpen(), "DELTA");
register("scrolled", (x, y, direction) => {
	if (PhonixPetGUI.isOpen()) {
		if (direction == -1) {
			PhonixPetXYS.s = PhonixPetXYS.s + 1
		} else if (direction == 1) {
			PhonixPetXYS.s = PhonixPetXYS.s - 1
		}
		if (PhonixPetXYS.s < 60) {
			PhonixPetXYS.s = 60
		}
	}
})


register("command", () => {
	PhonixPetGUI.open();
	PhonixPetXYS.x = 20
	PhonixPetXYS.y = 20
	PhonixPetXYS.s = 100
	ChatLib.command("ct simulate &cTEST! &rYour Phoenix Pet saved you from certain death! &cTEST!", true)
}).setName("phonixpetgui");

register("tick", () => {
	if (PhonixPetGUI.isOpen()) {
		PhoenixTimer = 0
	}
})


register("chat", (event) => { //Phonix
	//console.log("Phoenix Pet working")
	if (!Settings.PhonixPetTimer) return
	PhoenixTimer = 60
	register("renderOverlay", () => {
	if (PhoenixTimer > 0) {							
		new Text("&5Phoenix Pet: &a" + PhoenixTimer, 
		PhonixPetXYS.x, PhonixPetXYS.y)
		.setShadow(true).setFormatted(true).setScale(PhonixPetXYS.s / 100).draw();
	} else if (PhoenixTimer === 0){
		new Text("&5Phoenix Pet: &aREADY", 
		PhonixPetXYS.x, PhonixPetXYS.y)
		.setShadow(true).setFormatted(true).setScale(PhonixPetXYS.s / 100).draw();
	}
})
}).setChatCriteria("Your Phoenix Pet saved you from certain death!").setContains()

register("step", () => { 
	if (PhoenixTimer > 0) {
		PhoenixTimer -= 1
	}
}).setDelay(1)

