/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "./Settings";
register("command", () => Settings.openGUI()).setName("noamm").setAliases("noam", "noamaddons", "noammaddons", "na")

import "./features/RemoveSelfieCam"
import "./features/AutoRefillEnderPearls"
import "./features/BonzoMaskTimer"
import "./features/SpiritMaskTimer"
import "./features/PhoenixPetTimer"
import "./features/CustomFOV"
// import "./features/IHATECARPETS" // thx hypixel for fix it ):
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

ChatLib.chat("§e----------------------");
ChatLib.chat("§bNoamm&dAddons &aLoaded");
ChatLib.chat("§e----------------------");

console.log("----------------------");
console.log(" NoammAddons Loaded");
console.log("----------------------");

register('chat', (event) => {
    let formattedMessage = ChatLib.getChatMessage(event, true)
    if (formattedMessage.includes("Noamm9")) {
        cancel(event)
        formattedMessage = formattedMessage.replace("Noamm9", "&l&dN&b&lo&d&la&b&lm&d&lm&b&l9&r");
        ChatLib.chat(formattedMessage)
    }    
})










/*
let scoreboardInfoData = Scoreboard.getLines()
    let scoreboardInfo = scoreboardInfoData.join()
    if (scoreboardInfo.includes("(F1)")) ChatLib.command(`joindungeon catacombs 1`)
    if (scoreboardInfo.includes("(F2)")) ChatLib.command(`joindungeon catacombs 2`)
    if (scoreboardInfo.includes("(F3)")) ChatLib.command(`joindungeon catacombs 3`)
    if (scoreboardInfo.includes("(F4)")) ChatLib.command(`joindungeon catacombs 4`)
    if (scoreboardInfo.includes("(F5)")) ChatLib.command(`joindungeon catacombs 5`)
    if (scoreboardInfo.includes("(F6)")) ChatLib.command(`joindungeon catacombs 6`)
    if (scoreboardInfo.includes("(F7)")) ChatLib.command(`joindungeon catacombs 7`)
    if (scoreboardInfo.includes("(M1)")) ChatLib.command(`joindungeon MASTER_CATACOMBS 1`)
    if (scoreboardInfo.includes("(M2)")) ChatLib.command(`joindungeon MASTER_CATACOMBS 2`)
    if (scoreboardInfo.includes("(M3)")) ChatLib.command(`joindungeon MASTER_CATACOMBS 3`)
    if (scoreboardInfo.includes("(M4)")) ChatLib.command(`joindungeon MASTER_CATACOMBS 4`)
    if (scoreboardInfo.includes("(M5)")) ChatLib.command(`joindungeon MASTER_CATACOMBS 5`)
    if (scoreboardInfo.includes("(M6)")) ChatLib.command(`joindungeon MASTER_CATACOMBS 6`)
    if (scoreboardInfo.includes("(M7)")) ChatLib.command(`joindungeon MASTER_CATACOMBS 7`) 


register("chat", function(player, message, event) {
	cancel(event);
    if (player.includes("[MVP++]")) { 
        player = player.replace("[MVP++]", "&6[MVP&d++&6]");
    }
    if (player.includes("[MVP+]")) { 
        player = player.replace("[MVP+]", "&b[MVP&d+&b]");
    }
    if (player.includes("[MVP]")) { 
        player = player.replace("[MVP]", "&b[MVP&b]");
    }
    if (player.includes("[VIP+]")) { 9
        player = player.replace("[VIP+]", "&a[VIP&6+&a]");
    }
    if (player.includes("[VIP]")) { 
        player = player.replace("[VIP]", "&a[VIP&a]");
    }
    ChatLib.chat("§9Party §l§8>§r "+player + "§r§d: " + ChatLib.removeFormatting(message));
}).setCriteria("Party > ${player}: ${message}"); */

