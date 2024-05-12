import { gc, cc } from "./utils"
import Settings from "./Settings"
register("command", () => Settings.openGUI()).setName("noamm").setAliases("noam", "noamaddons", "noammaddons", "na")

import "./features/RemoveSelfieCam"
import "./features/AutoRefillEnderPearls"
import "./features/BonzoMaskTimer"
import "./features/SpiritMaskTimer"
import "./features/PhoenixPetTimer"
import "./features/CustomFOV"
// import "./features/IHATECARPETS" // thx hypixel for fixing it ):
import "./features/IHATEDIORITE" 
import "./features/NoSwordBlock"
import "./features/M7DragBox"
import "./features/M7DragTimer"
import "./features/PinkDMs"
import "./features/LegitGhostPick"
import "./features/ShortSkyBlockCommands"
import "./features/WatcherAlert"
import "./features/RandomAlerts"
import "./features/LowArrowsAlert"
import "./features/BetterEnderPearls"
import "./features/DungeonMobESP"
import "./features/DungeonAutoExtraStats"
import "./features/HideFallingBlocks"
// import "./features/NecronDroppingTimer"   // Moved to F7PhaseStartTimers
import "./features/SimpleBlockOverlay"
import "./features/TeamMatesNameTag"
import "./features/AnnounceSpiritLeaps"
import "./features/PingCommand"
import "./features/CustomSlotHighlight"
import "./Features/F7PhaseStartTimers"
import "./Features/BloodDialougeSkip"
import "./Features/ChatCoordsWayPoint"

cc("§e--------------------------");
ChatLib.chat(gc(`NoammAddons Loaded     &r`).replace(`NoammAddons Loaded`, `§b&lNoamm&d&lAddons &a&lLoaded`))
cc("§e--------------------------");

console.log("----------------------");
console.log(" NoammAddons Loaded");
console.log("----------------------");
