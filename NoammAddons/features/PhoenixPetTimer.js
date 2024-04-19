/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings";
import PogObject from "../../PogData";

var PhoenixTimer = null;
const PhoenixPetGUI = new Gui();
let md = false

const PhoenixPetGUIdata = new PogObject("Noammaddons", {
	x: 10,
	y: 90,
	s: 100,
}, "PhoenixPet.json");

PhoenixPetGUI.addButton(1, Renderer.screen.getWidth() / 2 -50, Renderer.screen.getHeight() - Renderer.screen.getHeight() / 4, 100, 20, "Reset Element");
PhoenixPetGUI.registerActionPerformed(() => {
	PhoenixPetGUIdata.x = 10
	PhoenixPetGUIdata.y = 10
	PhoenixPetGUIdata.s = 100
	//World.playSound('gui.button.press', 1, 1)
})

PhoenixPetGUI.registerClicked(() => {
	if (PhoenixPetGUI.isOpen()) {
		md = true
	}
})


register("dragged", (dx, dy) => {
if (md) {
	PhoenixPetGUIdata.x += dx
	PhoenixPetGUIdata.y += dy
}
})



PhoenixPetGUI.registerMouseReleased(() => {
    md = false
    PhoenixPetGUIdata.save();
})

register("scrolled", (x, y, direction) => {
	if (PhoenixPetGUI.isOpen()) {
		if (direction == -1) {
			PhoenixPetGUIdata.s = PhoenixPetGUIdata.s + 1
		} else if (direction == 1) {
			PhoenixPetGUIdata.s = PhoenixPetGUIdata.s - 1
		}
		if (PhoenixPetGUIdata.s < 60) {
			PhoenixPetGUIdata.s = 60
		}
	}
})

PhoenixPetGUI.registerClosed(() => {
	PhoenixPetGUIdata.save()
})

register("command", () => {
	PhoenixPetGUIdata.save();
	PhoenixPetGUI.open();
	ChatLib.command("ct simulate &cTEST! &rYour Phoenix Pet saved you from certain death! &cTEST!", true)
	setTimeout(() => { PhoenixTimer = 0 }, 200);
}).setName("phoenixpetgui");


register("chat", (event) => {
	if (!Settings.PhoenixPetTimer) return
	PhoenixTimer = 60
	register("renderOverlay", () => {
	if (PhoenixTimer > 0) {							
		new Text("&5Phoenix Pet: &a" + PhoenixTimer,
		PhoenixPetGUIdata.x, PhoenixPetGUIdata.y)
		.setShadow(true).setFormatted(true).setScale(PhoenixPetGUIdata.s / 100).draw();
	} else if (PhoenixTimer === 0){
		new Text("&5Phoenix Pet: &aREADY", 
		PhoenixPetGUIdata.x, PhoenixPetGUIdata.y)
		.setShadow(true).setFormatted(true).setScale(PhoenixPetGUIdata.s / 100).draw();
	}
})
}).setChatCriteria("Your Phoenix Pet saved you from certain death!").setContains()

register("step", () => { 
	if (PhoenixTimer > 0) {
		PhoenixTimer -= 1
	}
}).setDelay(1)

