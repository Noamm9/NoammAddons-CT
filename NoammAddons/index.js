import PogObject from "../PogData/index.js"
new BlockType(144).getDefaultState().func_177230_c().func_149676_a(0, 0, 0, 1, 1 ,1)
new BlockType(397).getDefaultState().func_177230_c().func_149676_a(0, 0, 0, 1, 1 ,1)
 
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

import "./Features/BonzoMaskTimer"
import "./Features/SpiritMaskTimer"
import "./Features/PhoenixPetTimer"
import "./Features/LegitGhostPick"
import "./Features/FPSdisplay"
import "./Features/ClockDisplay"
import "./Features/RemoveSelfieCam"
import "./Features/CustomFOV"
import "./Features/IHATEDIORITE" 
import "./Features/NoSwordBlock"
import "./Features/M7DragBox"
import "./Features/M7DragTimer"
import "./Features/PinkDMs"
import "./Features/ShortSkyBlockCommands"
import "./Features/WatcherAlert"
import "./Features/RandomAlerts"
import "./Features/LowArrowsAlert"
import "./Features/BetterEnderPearls"
import "./Features/AutoRefillEnderPearls"
import "./Features/DungeonMobESP"
import "./Features/DungeonAutoExtraStats"
import "./Features/HideFallingBlocks"
import "./Features/SimpleBlockOverlay"
import "./Features/TeamMatesNameTag"
import "./Features/TeamMatesBox"
import "./Features/AnnounceSpiritLeaps"
import "./Features/CustomSlotHighlight"
import "./Features/F7PhaseStartTimers"
import "./Features/BloodDialougeSkip"
import "./Features/ChatCoordsWayPoint"
import "./Features/ClientSideSpin"
import "./Features/PlayerScale"
import './Features/HebrewToEnglish'
import "./Features/emojis"
import "./Features/TimerChanger"
import "./Features/InventorySearchBar"
import "./Features/HealerWish"
import "./Features/PartyCommands"
import "./Features/iceFillSolver"
import "./Features/AutoI4"
import "./Features/NewF7Titles"
import "./Features/AutoCloseDungeonChests"
import "./Features/SecretSound"
import "./Features/HidePortalEffect"
import "./Features/CustomLeapMenu"
import "./Features/AbilityKeybinds"
import "./Features/NoBlindness"
import "./Features/LeftClickEtherWarp"
import "./Features/GyroCircle"
import "./Features/MelodyAlert"
import "./Features/HideLightning"
import "./Features/HighlightMimicChest"
import "./Features/BlockGloomlockDeath"
import "./Features/BetterM5"
import "./Features/BetterM6"
import "./Features/BetterM7"
import "./Features/BlurBackground"
import "./Features/WardrodeHelper"
import "./Features/ColorSecrets"
import "./Features/TraceKeys"
//import "./Features/NoFallDamage"



import "./AutoUpDater"
import "./EditGui"
import "./Features/PingCommand"



import "./TODO/TestGround"
//import "./TODO/CustomItemToolTip" // WIP

// import "./TODO/RoomEdit" // WIP
//import "./TODO/ExtractMinecraftChat"
//import "./TODO/asm/exposed/toggleSecretHitboxes"


// import "./TODO/NecronDroppingTimer"   // Moved to F7PhaseStartTimers
// import "./TODO/IHATECARPETS" // thx hypixel for fixing it ):


