/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Settings"
import Dungeon from "../../BloomCore/dungeons/Dungeon"


register(`renderWorld`, (pticks) => {
    if (!Settings.TeammatesNametag || !Dungeon.inDungeon) return
        let test = Dungeon.classes
        for (let PlayerName in test) {
            let PlayerClass = test[PlayerName];  
            DrawNames(World.getPlayerByName(PlayerName), pticks, `§e[§d${PlayerClass.charAt(0)}§e] §b${PlayerName}`)
        }        
})


function DrawNames(player, pticks, string) {
    if (pticks != undefined && World.isLoaded() && player != null) {
        let lastX = player.getLastX()
        let lastY = player.getLastY()
        let lastZ = player.getLastZ()
        let currentX = player.getX()
        let currentY = player.getY()
        let currentZ = player.getZ()
        
        if (Math.round(Math.sqrt((Player.getX() - player.getX())**2 + (Player.getY() - player.getY())**2 + (Player.getZ() - player.getZ())**2)) >=9) {
            //Black text to mimic Shadow
            Tessellator.drawString(`§0${ChatLib.removeFormatting(string)}`, 
            (lastX + (currentX - lastX) * pticks) - 0.031, 
            (lastY + (currentY - lastY) * pticks) + 2.50 - 0.021, 
            (lastZ + (currentZ - lastZ) * pticks), 
            0, false, 1.25, true)
            
            // Real text
            Tessellator.drawString(string, 
            lastX + (currentX - lastX) * pticks, 
            (lastY + (currentY - lastY) * pticks) + 2.5, 
            lastZ + (currentZ - lastZ) * pticks, 
            0, false, 1.25, true)
        } 
    }
}
