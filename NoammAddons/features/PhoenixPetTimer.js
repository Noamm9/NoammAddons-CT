/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Config/Settings";;
import PogObject from "../../PogData";

var PhoenixTimer = -100;
const PhoenixPetGUI = new Gui();

const PhoenixPetGUIdata = new PogObject("Noammaddons", {
	x: 10,
	y: 90,
	s: 100,
}, "Config/PhoenixPet.json");

PhoenixPetGUI.addButton(1, Renderer.screen.getWidth() / 2 -50, Renderer.screen.getHeight() - Renderer.screen.getHeight() / 4, 100, 20, "Reset Element");
PhoenixPetGUI.registerActionPerformed(() => {
	PhoenixPetGUIdata.x = 10
	PhoenixPetGUIdata.y = 10
	PhoenixPetGUIdata.s = 100
	World.playSound('gui.button.press', 100, 1)
})


PhoenixPetGUI.registerMouseDragged((dx, dy) => {
	PhoenixPetGUIdata.x += dx
	PhoenixPetGUIdata.y += dy
})


PhoenixPetGUI.registerScrolled((x, y, direction) => {
	if (direction == -1) {
		PhoenixPetGUIdata.s = PhoenixPetGUIdata.s + 1
	} else if (direction == 1) {
		PhoenixPetGUIdata.s = PhoenixPetGUIdata.s - 1
	}
	if (PhoenixPetGUIdata.s < 60) {
		PhoenixPetGUIdata.s = 60
	}
})

PhoenixPetGUI.registerClosed(() => {
	PhoenixPetGUIdata.save()
})

register("command", () => {
	PhoenixPetGUI.open();
	PhoenixTimer = 60
}).setName("phoenixpetgui");


register("chat", (event) => {
	if (!Settings.PhoenixPetTimer) return
	PhoenixTimer = 60
}).setChatCriteria("Your Phoenix Pet saved you from certain death!").setContains()


register("renderOverlay", () => {
if (PhoenixTimer > 0) {							
	new Text("&5Phoenix Pet: &a" + PhoenixTimer,
	PhoenixPetGUIdata.x, PhoenixPetGUIdata.y)
	.setShadow(true).setFormatted(true).setScale(PhoenixPetGUIdata.s / 100).draw();
} else if (PhoenixTimer < 0 && PhoenixTimer > -30){
	new Text("&5Phoenix Pet: &aREADY", 
	PhoenixPetGUIdata.x, PhoenixPetGUIdata.y)
	.setShadow(true).setFormatted(true).setScale(PhoenixPetGUIdata.s / 100).draw();
}
if (PhoenixTimer > -30) {
	new Text("", 
	PhoenixPetGUIdata.x, PhoenixPetGUIdata.y)
	.setShadow(true).setFormatted(true).setScale(PhoenixPetGUIdata.s / 100).draw();
}
})


register("step", () => { 
	PhoenixTimer -= 1
}).setDelay(1)

