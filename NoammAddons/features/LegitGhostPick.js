/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import { LegitGhostPickGUIdata } from "../index"
import Settings from "../Config/Settings"
import { MainGUI } from "../EditGui"
const LegitGhostPickBind = new KeyBind("Legit Ghost Pickaxe", Keyboard.KEY_Z, "NoammAddons")

export let Toggle = false 
export let md = false
export let Text = new Text(` `).setShadow(true).setFormatted(true) 



LegitGhostPickBind.registerKeyPress(() => {
	if (!Settings.LegitGhostPickaxe) return
	Toggle = !Toggle
})


register("renderOverlay", () => {
	if (!Settings.LegitGhostPickaxe) return

	
	Text.setX(LegitGhostPickGUIdata.x)
	Text.setY(LegitGhostPickGUIdata.y)
	Text.setScale(LegitGhostPickGUIdata.s/100)
	Text.setString("&b&lLegitGhostPick: &a&lEnabled")
	
	if (Toggle || MainGUI.isOpen()) Text.draw()
	
	
})


register("packetsent", (packet, event) => {
    if (packet.class.getSimpleName() == "C07PacketPlayerDigging" && Toggle && Player?.getHeldItem()?.getID() !== 261) cancel(event)
})

