/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import Dungeon from "../../BloomCore/dungeons/Dungeon"
import { MyMath, Render, IsInDungeon } from "../utils"

const RenderLivingEventSpecialsPre = net.minecraftforge.client.event.RenderLivingEvent$Specials$Pre
const PlayerEntity = net.minecraft.entity.player.EntityPlayer

register(`renderWorld`, () => {
    if (!Settings().TeammatesNametag || !Dungeon.inDungeon) return
    let DungeonPlayerClasses = Dungeon.classes
    for (let PlayerName in DungeonPlayerClasses) {
        let PlayerClass = DungeonPlayerClasses[PlayerName];

        if (Settings().TeammatesNametagMode == 0) DrawNames(World.getPlayerByName(PlayerName), PlayerName, PlayerClass.charAt(0))
        else {
            let FormattedName = TabList.getNames().join().match(`§.${PlayerName}`).join()
            DrawNames(World.getPlayerByName(PlayerName), `§e[§d${PlayerClass.charAt(0)}§e] ${FormattedName}`)
        }
        

    }        
})


function DrawNames(player, string, PlayerClass) {
    if (World.isLoaded() && player != null) {
        let NameColor = Renderer.color(255, 255, 255)

        if (PlayerClass == `A`) NameColor = Renderer.color(193, 32, 32)
        else if (PlayerClass == `B`) NameColor = Renderer.color(205, 100, 0)
        else if (PlayerClass == `H`) NameColor = Renderer.color(145, 4, 120)
        else if (PlayerClass == `T`) NameColor = Renderer.color(0, 170, 0)
        else if (PlayerClass == `M`) NameColor = Renderer.color(0, 234, 255)
        else return

        let Dinstance = MyMath.DistanceIn3dWorld(Player.getRenderX(), Player.getRenderY(), Player.getRenderZ(), player.getRenderX(), player.getRenderY(), player.getRenderZ())
        Render.StringWithShadow(string, player.getRenderX(), player.getRenderY() + 2.5 + (Dinstance*0.1) , player.getRenderZ(), NameColor, Dinstance * 0.3, true, false)
        
        
    }
}



register(RenderLivingEventSpecialsPre, (event) => {
    if (!Settings().TeammatesNametag || !IsInDungeon()) return
    if (event.entity instanceof PlayerEntity) {
        const DungeonPlayerClasses = Dungeon.classes
        for (const PlayerName in DungeonPlayerClasses) {
            if (event.entity != World.getPlayerByName(PlayerName)) cancel(event)
        }
    }
})