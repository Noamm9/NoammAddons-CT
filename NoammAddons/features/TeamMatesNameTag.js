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

        if (Settings.TeammatesNametagMode == 0) {
            if (PlayerClass.charAt(0) == `H`) DrawNames(World.getPlayerByName(PlayerName), `§e[§5${PlayerClass.charAt(0)}§e] §5${PlayerName}`)
            else if (PlayerClass.charAt(0) == `T`) DrawNames(World.getPlayerByName(PlayerName), `§e[§a${PlayerClass.charAt(0)}§e] §a${PlayerName}`)
            else if (PlayerClass.charAt(0) == `A`) DrawNames(World.getPlayerByName(PlayerName), `§e[§4${PlayerClass.charAt(0)}§e] §4${PlayerName}`)
            else if (PlayerClass.charAt(0) == `B`) DrawNames(World.getPlayerByName(PlayerName), `§e[§6${PlayerClass.charAt(0)}§e] §6${PlayerName}`)
            else DrawNames(World.getPlayerByName(PlayerName), `§e[§b${PlayerClass.charAt(0)}§e] §b${PlayerName}`)
        } else {
            let FormattedName = TabList.getNames().join().match(`§.${PlayerName}`).join()
            DrawNames(World.getPlayerByName(PlayerName), `§e[§d${PlayerClass.charAt(0)}§e] ${FormattedName}`)
        }
        

    }        
})


function DrawNames(player, string) {
    if (World.isLoaded() && player != null) {
        if (MyMath.DistanceIn3dWorld(Player.getX(), Player.getY(), Player.getZ(), player.getX(), player.getY(), player.getZ()) >=9) {
            Tessellator.drawString(string, player.getRenderX(), player.getRenderY() + 3.50, player.getRenderZ(), 0, true, 1.55, true)
        } 
    }
}
