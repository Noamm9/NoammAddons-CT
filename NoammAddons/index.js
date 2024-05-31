import PogObject from "../PogData/index.js"
import { gc, cc} from "./utils"
//import Settings from "./Config/Settings"
//register("command", () => Settings.openGUI()).setName("noamm").setAliases("noam", "noamaddons", "noammaddons", "na") // moved to Party Commands 

export const guiData = new PogObject("Noammaddons", {

	BonzoMaskGUIdata: {
		x: 10,
		y: 90,
		s: 100,
	},

	SpiritMaskGUIdata: {
		x: 10,
		y: 110,
		s: 100,
	},

	PhoenixPetGUIdata: {
		x: 10,
		y: 130,
		s: 100,
	},

	LegitGhostPickGUIdata: {
		x: 10,
		y: 150,
		s: 100,
	},

	ClockDisplayGUIdata: {
		x: 10,
		y: 90,
		s: 100,
	},
    
	FPSdisplayGUIdata: {
		x: 10,
		y: 90,
		s: 100,
	}
		
}, "Config/GuiData.json")

export const BonzoMaskGUIdata = guiData.BonzoMaskGUIdata
export const SpiritMaskGUIdata = guiData.SpiritMaskGUIdata
export const PhoenixPetGUIdata = guiData.PhoenixPetGUIdata
export const LegitGhostPickGUIdata = guiData.LegitGhostPickGUIdata
export const FPSdisplayGUIdata = guiData.FPSdisplayGUIdata
export const ClockDisplayGUIdata = guiData.ClockDisplayGUIdata

import "./features/RemoveSelfieCam"
import "./features/BonzoMaskTimer"
import "./features/SpiritMaskTimer"
import "./features/PhoenixPetTimer"
import "./features/LegitGhostPick"
import "./features/FPSdisplay"
import "./features/ClockDisplay"
// import "./features/NecronDroppingTimer"   // Moved to F7PhaseStartTimers
import "./features/CustomFOV"
// import "./features/IHATECARPETS" // thx hypixel for fixing it ):
import "./features/IHATEDIORITE" 
import "./features/NoSwordBlock"
import "./features/M7DragBox"
import "./features/M7DragTimer"
import "./features/PinkDMs"
import "./features/ShortSkyBlockCommands"
import "./features/WatcherAlert"
import "./features/RandomAlerts"
import "./features/LowArrowsAlert"
import "./features/BetterEnderPearls"
import "./features/AutoRefillEnderPearls"
import "./features/DungeonMobESP"
import "./features/DungeonAutoExtraStats"
import "./features/HideFallingBlocks"
import "./features/SimpleBlockOverlay"
import "./features/TeamMatesNameTag"
import "./features/TeamMatesBox"
import "./features/AnnounceSpiritLeaps"
import "./features/CustomSlotHighlight"
import "./features/F7PhaseStartTimers"
import "./features/BloodDialougeSkip"
import "./features/ChatCoordsWayPoint"
import "./features/ClientSideSpin"
import "./features/PlayerScale"
import './features/HebrewToEnglish'
import "./features/emojis"
import "./features/F7GhostBlocks"
import "./features/TimerChanger"
import "./features/InventorySearchBar"
// import "./features/RoomEdit" // WIP
import "./features/HealerWish"
import "./features/PartyCommands"
import "./features/iceFillSolver"
// import "./features/CustomItemToolTip" // WIP
import "./features/AutoI4"
import "./features/NewF7Titles"


import "./AutoUpDater"
import "./EditGui"
import "./features/PingCommand"





cc("§e--------------------------");
ChatLib.chat(gc(`NoammAddons Loaded     &r`).replace(`NoammAddons Loaded`, `§b&lNoamm&d&lAddons &a&lLoaded`))
cc("§e--------------------------");

console.log("----------------------");
console.log(" NoammAddons Loaded");
console.log("----------------------");

