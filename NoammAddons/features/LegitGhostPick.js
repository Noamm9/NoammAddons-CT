/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Settings"
import { makeObjectDraggable } from "../../Draggable";

LegitGhostPick = false 
const LegitGhostPickBind = new KeyBind("Legit Ghost Pickaxe", Keyboard.KEY_Z, "NoammAddons")
const LegitGhostPickGUI = new Gui();
const LegitGhostPickXYS = { x: 10, y: 10, s: Settings.PickScale };
makeObjectDraggable("LegitGP", LegitGhostPickXYS, () => LegitGhostPickGUI.isOpen(), "DELTA");
register("scrolled", (x, y, direction) => {
	if (LegitGhostPickGUI.isOpen()) {
		if (direction == -1) {
			LegitGhostPickXYS.s = LegitGhostPickXYS.s + 1
		} else if (direction == 1) {
			LegitGhostPickXYS.s = LegitGhostPickXYS.s - 1
		}
	}
})



register("command", () => {
	LegitGhostPickGUI.open();
	LegitGhostPickXYS.x = 20
	LegitGhostPickXYS.y = 20
}).setName("legitghostpickgui");

register("tick", () => {
	if (LegitGhostPickGUI.isOpen()) {
		LegitGhostPick = true
	
		if (LegitGhostPickXYS.s < 60) {
			LegitGhostPickXYS.s = 60
		}
	}
})

register("tick", () => {
	if (!Settings.LegitGhostPickaxe) return
	if (LegitGhostPickBind.isPressed()) {
		if (!LegitGhostPick) {
			LegitGhostPick = true
		} else {
			LegitGhostPick = false
		}
	}
})

register("renderOverlay", () => {
	if (!Settings.LegitGhostPickaxe) {
		LegitGhostPick = false
	}
	if (LegitGhostPick) {
		new Text("&b&lLegitGhostPick: &a&lEnabled", LegitGhostPickXYS.x, LegitGhostPickXYS.y).setShadow(true).setFormatted(true).setScale(LegitGhostPickXYS.s /100).draw()
	} else {
		new Text("", LegitGhostPickXYS.x, LegitGhostPickXYS.y).setShadow(true).setFormatted(true).setScale(LegitGhostPickXYS.s /100).draw()
	}
})


register("packetsent", (packet, event) => {
    if (packet.class.getSimpleName() == "C07PacketPlayerDigging" && LegitGhostPick && Player?.getHeldItem()?.getID() !== 261) {
        cancel(event)
    }
})

