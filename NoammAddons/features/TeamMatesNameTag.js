/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import Dungeon from "../../BloomCore/dungeons/Dungeon"
import { DistanceBetween2PlayersIn3dWorld, TessellatorDrawStringWithShadow } from "../utils"


register(`renderWorld`, (pticks) => {
    if (!Settings.TeammatesNametag || !Dungeon.inDungeon) return
    let DungeonPlayerClasses = Dungeon.classes
    for (let PlayerName in DungeonPlayerClasses) {
        let PlayerClass = DungeonPlayerClasses[PlayerName];  
        DrawNames(World.getPlayerByName(PlayerName), `§e[§d${PlayerClass.charAt(0)}§e] §b${PlayerName}`)
    }        
})


function DrawNames(player, string) {
    if (World.isLoaded() && player != null) {
        if (DistanceBetween2PlayersIn3dWorld(Player, player) >=9) {
            TessellatorDrawStringWithShadow(string, player.getRenderX(), player.getRenderY() + 2.50, player.getRenderZ(), 0, false, 1.55, true)
        } 
    }
}
