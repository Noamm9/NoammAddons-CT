import { gc, cc, ModMessage } from "./utils"

//import Settings from "./Config/Settings"
//register("command", () => Settings.openGUI()).setName("noamm").setAliases("noam", "noamaddons", "noammaddons", "na") // moved to Party Commands 
import "./AutoUpDater"

import "./features/RemoveSelfieCam"
import "./features/AutoRefillEnderPearls"
import "./features/BonzoMaskTimer"
import "./features/SpiritMaskTimer"
import "./features/PhoenixPetTimer"
import "./features/LegitGhostPick"
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
import "./features/DungeonMobESP"
import "./features/DungeonAutoExtraStats"
import "./features/HideFallingBlocks"
import "./features/SimpleBlockOverlay"
import "./features/TeamMatesNameTag"
import "./features/AnnounceSpiritLeaps"
import "./features/PingCommand"
import "./features/CustomSlotHighlight"
import "./features/F7PhaseStartTimers"
import "./features/BloodDialougeSkip"
import "./features/ChatCoordsWayPoint"
import "./features/ClientSideSpin"
import "./features/PlayerScale"
import './features/HebrewToEnglish'
import "./features/emojis"
import "./features/F7GhostBlocks"
import "./features/ClockDisplay"
import "./features/TimerChanger"
import "./features/InventorySearchBar"
//import "./features/RoomEdit" // WIP
import "./features/HealerWish"
import "./features/PartyCommands"
import "./features/iceFillSolver"
import "./features/FPSdisplay"


cc("§e--------------------------");
ChatLib.chat(gc(`NoammAddons Loaded     &r`).replace(`NoammAddons Loaded`, `§b&lNoamm&d&lAddons &a&lLoaded`))
cc("§e--------------------------");

console.log("----------------------");
console.log(" NoammAddons Loaded");
console.log("----------------------");
/*

register(`itemTooltip`, (_,__, event) => {
    cancel(event)
})


register(`renderSlotHighlight`, (mx, my, slot, gui, event) => {
    try {
        slot = new Slot(slot)
        let Lore = slot.getItem().getLore()


        
        Lore.forEach(line => {
            let textx = slot.getDisplayX() + 12 
            let texty = slot.getDisplayY() + 24 + Lore.length * 3
            texty = texty - 3
            Renderer.translate(0, 0, 300)
            Renderer.drawRect(Renderer.BLACK, slot.getDisplayX() + 10, slot.getDisplayY() + 10, Renderer.getStringWidth(line) + 5, 12 + Lore.length * 9)
            Renderer.drawStringWithShadow(line, textx, texty)
        
        })
    } catch (e) {ModMessage(e)}
})*/