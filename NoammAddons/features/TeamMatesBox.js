/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import Dungeon from "../../BloomCore/dungeons/Dungeon"
import { Render, registerWhen, IsInDungeon } from "../utils"


function StartOrStop() {
    return Settings.TeammatesBox && IsInDungeon()
}


const Trigger = register('renderOverlay', () => {
    try {
        const MyPlayerName = Player.getName()
        let DungeonPlayerClasses = Dungeon.classes
        for (let PlayerName in DungeonPlayerClasses) {
            let PlayerClass = DungeonPlayerClasses[PlayerName]
            let Otherplayer = World.getPlayerByName(PlayerName)

            if (Otherplayer.getName() !== MyPlayerName) {
                if (Settings.TeammatesBoxMode == 0) {
            
                    if (PlayerClass.charAt(0) == `H`) Render.TwoDEspBox(Otherplayer.getRenderX(), Otherplayer.getRenderY(), Otherplayer.getRenderZ(), Renderer.color(255, 0, 209), 2)
                    else if (PlayerClass.charAt(0) == `T`) Render.TwoDEspBox(Otherplayer.getRenderX(), Otherplayer.getRenderY(), Otherplayer.getRenderZ(), Renderer.color(0, 170, 0), 2)
                    else if (PlayerClass.charAt(0) == `A`) Render.TwoDEspBox(Otherplayer.getRenderX(), Otherplayer.getRenderY(), Otherplayer.getRenderZ(), Renderer.color(193, 32, 32), 2)
                    else if (PlayerClass.charAt(0) == `B`) Render.TwoDEspBox(Otherplayer.getRenderX(), Otherplayer.getRenderY(), Otherplayer.getRenderZ(), Renderer.color(205, 100, 0), 2)
                    else Render.TwoDEspBox(Otherplayer.getRenderX(), Otherplayer.getRenderY(), Otherplayer.getRenderZ(), Renderer.color(0, 234, 255), 2) 
            
                } else {
            
                    let ColorCode = TabList.getNames().join().match(`§.${PlayerName}`).join().replace(PlayerName, "").replace(`§`, "")
            
                    if (ColorCode == "b") Render.TwoDEspBox(Otherplayer.getRenderX(), Otherplayer.getRenderY(), Otherplayer.getRenderZ(), Renderer.color(0, 234, 255), 2) 
                    else if (ColorCode == "a") Render.TwoDEspBox(Otherplayer.getRenderX(), Otherplayer.getRenderY(), Otherplayer.getRenderZ(), Renderer.color(0, 255, 0), 2)
                    else if (ColorCode == "6") Render.TwoDEspBox(Otherplayer.getRenderX(), Otherplayer.getRenderY(), Otherplayer.getRenderZ(), Renderer.color(255, 150, 0), 2)
                    else if (ColorCode == "c") Render.TwoDEspBox(Otherplayer.getRenderX(), Otherplayer.getRenderY(), Otherplayer.getRenderZ(), Renderer.color(123, 32, 32), 2)
                    else Render.TwoDEspBox(Otherplayer.getRenderX(), Otherplayer.getRenderY(), Otherplayer.getRenderZ(), Renderer.color(98, 98, 98), 2)
            
                }
            }
        }        
    } catch (e) {} 
})


registerWhen(Trigger, StartOrStop)