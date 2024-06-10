/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import Dungeon from "../../BloomCore/dungeons/Dungeon"
import { Render } from "../utils"


register('renderOverlay', () => {
    if (!Settings.TeammatesBox || !Dungeon.inDungeon) return
    const DungeonPlayerClasses = Dungeon.classes
    for (const PlayerName in DungeonPlayerClasses) {
        const PlayerClass = DungeonPlayerClasses[PlayerName];
        const Otherplayer = World.getPlayerByName(PlayerName)

        if (Otherplayer.getName() !== Player.getName())
        DrawBoxs(Otherplayer, PlayerClass)
        
    }        
})

function DrawBoxs(player, PlayerClass) {
    let color 

    if (Settings.TeammatesBoxMode == 0) {

        if (PlayerClass.charAt(0) == `H`) color = Renderer.color(255, 0, 209)
        else if (PlayerClass.charAt(0) == `T`) color = Renderer.color(0, 170, 0)
        else if (PlayerClass.charAt(0) == `A`) color = Renderer.color(193, 32, 32)
        else if (PlayerClass.charAt(0) == `B`) color = Renderer.color(205, 100, 0)
        else color = Renderer.color(0, 234, 255)

        Render.TwoDEspBox(player.getRenderX(), player.getRenderY(), player.getRenderZ(), color, 2)

    } else {
                
        color = TabList.getNames().join().match(`§.${PlayerName}`).join().replace(PlayerName, "").replace(`§`, "")
    
        if (color == "b") color = Renderer.color(0, 234, 255)
        else if (color == "a") color = Renderer.color(0, 255, 0)
        else if (color == "6") color = Renderer.color(255, 150, 0)
        else if (color == "c") color = Renderer.color(123, 32, 32)
        else color = Renderer.color(98, 98, 98)

    }

}