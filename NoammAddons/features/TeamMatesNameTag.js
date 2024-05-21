/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Config/Settings"
import Dungeon from "../../BloomCore/dungeons/Dungeon"
import { MyMath, Render, Color } from "../utils"


register(`renderWorld`, () => {
    if (!Settings.TeammatesNametag || !Dungeon.inDungeon) return
    let DungeonPlayerClasses = Dungeon.classes
    for (let PlayerName in DungeonPlayerClasses) {
        let PlayerClass = DungeonPlayerClasses[PlayerName];

        if (Settings.TeammatesNametagMode == 0) DrawNames(World.getPlayerByName(PlayerName), PlayerName, PlayerClass.charAt(0))
        else {
            let FormattedName = TabList.getNames().join().match(`§.${PlayerName}`).join()
            DrawNames(World.getPlayerByName(PlayerName), `§e[§d${PlayerClass.charAt(0)}§e] ${FormattedName}`)
        }
        

    }        
})


function DrawNames(player, string, PlayerClass) {
    if (World.isLoaded() && player != null) {
        if (MyMath.DistanceIn3dWorld(Player.getX(), Player.getY(), Player.getZ(), player.getX(), player.getY(), player.getZ()) >=9) {
            let NameColor = new Color(255/255, 255/255, 255/255)

            if (PlayerClass == `A`) NameColor = new Color(193/255, 32/255, 32/255)
            else if (PlayerClass == `B`) NameColor = new Color(205/255, 100/255, 0/255)
            else if (PlayerClass == `H`) NameColor = new Color(145/255, 4/255, 120/255)
            else if (PlayerClass == `T`) NameColor = new Color(0/255, 170/255, 0/255)
            else if (PlayerClass == `M`) NameColor = new Color(0/255, 234/255, 255/255)
            else return

            Render.drawStringWithShadow(string, player.getRenderX(), player.getRenderY() + 3.50, player.getRenderZ(), NameColor)
        
        } 
    }
}
