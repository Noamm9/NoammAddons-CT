/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import Dungeon from "../../BloomCore/dungeons/Dungeon"
import { Render } from "../utils"
const C0DPacketCloseWindow = Java.type("net.minecraft.network.play.client.C0DPacketCloseWindow")
const PreGuiRenderEvent = net.minecraftforge.client.event.GuiScreenEvent.DrawScreenEvent.Pre


register(PreGuiRenderEvent, (event) => {
	if (!Dungeon.inDungeon || !Settings.AutoCloseDungeonChests) return

    try {
		const Chest = Player.getContainer()
        if(Chest.getName().toLocaleLowerCase().removeFormatting() == "chest") {
			const maxSlot = Chest.getSize() - 36

			cancel(event)
			Client.sendPacket(new C0DPacketCloseWindow())
			Client.currentGui.close()


            Chest.getItems().forEach((item, index) => {
				if(!item || !dungeonSecrets.includes(item.getName().toLowerCase().removeFormatting()) || index >= maxSlot) return

				if (item.getName().toLowerCase().removeFormatting() == `healing viii splash potion` || itemName == `healing potion 8 splash potion`) Render.TitleUnderCursor(`&dHealing Splash Potion&r &bFound in Chest!`, 5000)
				else if (item.getName().toLowerCase().removeFormatting() == `treasure talisman`) Render.TitleUnderCursor(`&6Treasure Talisman&r &bFound in Chest!`, 5000)

					// TODO Add a check to see if the Chest Contains any items that the user wants to keep the Chest open for them


                
            })
        }
    } catch (e) {}
})


const dungeonSecrets = [
	"healing viii splash potion",
	"healing potion 8 splash potion", 
	"treasure talisman", 
	"architect's first draft",
	"dungeon chest key", 
	"decoy", 
	"inflatable jerry", 
	"spirit leap", 
	"trap", 
	"training weights", 
	"defuse kit", 
	"revive stone",
]
