/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Config/Settings";

register("chat", (player, event) => { 
    if (!Settings.AutoRefillEnderPearls) return
		const inventory = Player.getInventory();
		const PearlSlot = inventory.indexOf(368);
		
		if (PearlSlot !== -1 && inventory.getStackInSlot(PearlSlot).getName() == "Ender Pearl") {
			if (inventory.getStackInSlot(PearlSlot).getName() != "Ender Pearl") return
		  	var PearlAmont = String(inventory.getStackInSlot(PearlSlot));
		  	PearlAmont = PearlAmont.substr(0, PearlAmont.indexOf("x"))
		  	if (PearlAmont == 16) return    
		  	ChatLib.command("gfs ender_pearl " + (16 - Number(PearlAmont)));
		
		} else ChatLib.command("gfs ender_pearl 16");
		
} ).setCriteria("Starting in 1 second.")
