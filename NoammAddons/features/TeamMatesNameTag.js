/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Settings"
import Dungeon from "../../BloomCore/dungeons/Dungeon"


let i
let players

register(`renderWorld`, (pticks) => {
    if (!Settings.TeammatesNametag && !Dungeon.inDungeon) return
      players = World.getAllPlayers()
      for (i = 0; i < players.length; i++) {
          if (players[i].getName() != Player.getName() && CheckForNPCs(players[i]) && !players[i].getName().includes(" ")) {
            DrawNames(players[i], pticks)
          }
      }
})


function CheckForNPCs(player) {
    if (World.getPlayerByName(player.name).getPing() == -1.0) return false
    else return true
}


function DrawNames(player, pticks) {
    if (pticks != undefined && World.isLoaded()) {
        let lastX = player.getLastX()
        let lastY = player.getLastY()
        let lastZ = player.getLastZ()
        let currentX = player.getX()
        let currentY = player.getY()
        let currentZ = player.getZ()

        //Black text for Shadow
        Tessellator.drawString(`§0§l${players[i].getName()} `, 
        (lastX + (currentX - lastX) * pticks) - 0.031, 
        (lastY + (currentY - lastY) * pticks) + 2.50 - 0.021, 
        (lastZ + (currentZ - lastZ) * pticks), 
        0, false, 1.25, true)
        
        // Real text
        Tessellator.drawString(`§f§l${players[i].getName()} `, 
        lastX + (currentX - lastX) * pticks, 
        (lastY + (currentY - lastY) * pticks) + 2.5, 
        lastZ + (currentZ - lastZ) * pticks, 
        0, false, 1.25, true)
    }
}
