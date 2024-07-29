/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { Render, IsInDungeon, DungeonSecretsItems, PreGuiRenderEvent } from "../utils"
const C0DPacketCloseWindow = Java.type("net.minecraft.network.play.client.C0DPacketCloseWindow")



register(PreGuiRenderEvent, (event) => {
	if (!IsInDungeon() || !Settings().AutoCloseDungeonChests) return

    try {
		const Chest = Player.getContainer()
        if(Chest.getName().toLocaleLowerCase().removeFormatting() == "chest") {
			
			cancel(event)
			Client.sendPacket(new C0DPacketCloseWindow())
			Client.currentGui.close()
			
			
			const maxSlot = Chest.getSize() - 36
            Chest.getItems().forEach((item, index) => {
				if(!item || !DungeonSecretsItems.includes(item.getName().removeFormatting()) || index >= maxSlot) return

				if (item.getName().removeFormatting() == `healing viii splash potion` || itemName == `healing potion 8 splash potion`) Render.TitleUnderCursor(`&dHealing Splash Potion&r &bFound in Chest!`, 5000)
				else if (item.getName().removeFormatting() == `treasure talisman`) Render.TitleUnderCursor(`&6Treasure Talisman&r &bFound in Chest!`, 5000)

					// TODO Add a check to see if the Chest Contains any items that the user wants to keep the Chest open for them


                
            })
        }
    } catch (e) {}
})

