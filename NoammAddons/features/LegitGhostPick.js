/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Config/Settings";;
import PogObject from "../../PogData";

let LegitGhostPick = false 
const LegitGhostPickBind = new KeyBind("Legit Ghost Pickaxe", Keyboard.KEY_Z, "NoammAddons")
const LegitGhostPickGUI = new Gui();
let md = false

const LegitGhostPickGUIdata = new PogObject("Noammaddons", {
	x: 10,
	y: 90,
	s: 100,
}, "Config/LegitGhostPick.json");

register(`worldLoad`, () => LegitGhostPickGUI.addButton(1, Renderer.screen.getWidth() / 2 -50, Renderer.screen.getHeight() - Renderer.screen.getHeight() / 4, 100, 20, "Reset Element"))
LegitGhostPickGUI.registerActionPerformed(() => {
	LegitGhostPickGUIdata.x = 10
	LegitGhostPickGUIdata.y = 10
	LegitGhostPickGUIdata.s = 100
	//World.playSound('gui.button.press', 1, 1)
})

LegitGhostPickGUI.registerClicked(() => {
	if (LegitGhostPickGUI.isOpen()) {
		md = true
	}
})


register("dragged", (dx, dy) => {
if (md) {
	LegitGhostPickGUIdata.x += dx
	LegitGhostPickGUIdata.y += dy
}
})


LegitGhostPickGUI.registerMouseReleased(() => {
    md = false
    LegitGhostPickGUIdata.save();
})

register("scrolled", (x, y, direction) => {
	if (LegitGhostPickGUI.isOpen()) {
		if (direction == -1) {
			LegitGhostPickGUIdata.s = LegitGhostPickGUIdata.s + 1
		} else if (direction == 1) {
			LegitGhostPickGUIdata.s = LegitGhostPickGUIdata.s - 1
		}
		if (LegitGhostPickGUIdata.s < 60) {
			LegitGhostPickGUIdata.s = 60
		}
	}
})


register("command", () => {
	LegitGhostPickGUIdata.save();
	LegitGhostPickGUI.open();
	LegitGhostPick = true
}).setName("legitghostpickgui");

LegitGhostPickGUI.registerClosed(() => {
	LegitGhostPick = false
	LegitGhostPickGUIdata.save();
})



LegitGhostPickBind.registerKeyPress(() => {
	if (!Settings.LegitGhostPickaxe) return
	if (!LegitGhostPick) {
		LegitGhostPick = true
	} else {
		LegitGhostPick = false
	}

})


register("renderOverlay", () => {
	if (!Settings.LegitGhostPickaxe) {
		LegitGhostPick = false
	}
	if (LegitGhostPick) {
		new Text("&b&lLegitGhostPick: &a&lEnabled", LegitGhostPickGUIdata.x, LegitGhostPickGUIdata.y).setShadow(true).setFormatted(true).setScale(LegitGhostPickGUIdata.s /100).draw()
	} else {
		new Text("", LegitGhostPickGUIdata.x, LegitGhostPickGUIdata.y).setShadow(true).setFormatted(true).setScale(LegitGhostPickGUIdata.s /100).draw()
	}
})


register("packetsent", (packet, event) => {
    if (packet.class.getSimpleName() == "C07PacketPlayerDigging" && LegitGhostPick && Player?.getHeldItem()?.getID() !== 261) {
        cancel(event)
    }
})

