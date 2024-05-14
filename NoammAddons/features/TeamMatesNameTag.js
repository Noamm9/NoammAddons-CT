/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Config/Settings"
import Dungeon from "../../BloomCore/dungeons/Dungeon"
import { MyMath } from "../utils"


register(`renderWorld`, () => {
    if (!Settings.TeammatesNametag || !Dungeon.inDungeon) return
    let DungeonPlayerClasses = Dungeon.classes
    for (let PlayerName in DungeonPlayerClasses) {
        let PlayerClass = DungeonPlayerClasses[PlayerName];  
        DrawNames(World.getPlayerByName(PlayerName), `§e[§d${PlayerClass.charAt(0)}§e] §b${PlayerName}`)
    }        
})


function DrawNames(player, string) {
    if (World.isLoaded() && player != null) {
        if (MyMath.DistanceIn3dWorld(Player.getX(), Player.getY(), Player.getZ(), player.getX(), player.getY(), player.getZ()) >=9) {
            Tessellator.drawString(string, player.getRenderX(), player.getRenderY() + 3.50, player.getRenderZ(), 0, true, 1.55, true)
        } 
    }
}
