/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { Render, IsInDungeon, DungeonSecretsItems, CloseCurrentGui } from "../utils"
import * as PreGuiRenderEvent from "../Utilities/Events/PreGuiRenderEvent"


PreGuiRenderEvent.AddListener((event) => {
	if (!IsInDungeon() || !Settings().AutoCloseDungeonChests) return

	const Chest = Player?.getContainer()
    if (Chest?.getName()?.toLowerCase()?.removeFormatting() == "chest") {
		
		cancel(event)
		CloseCurrentGui()
		
		
		const maxSlot = Chest.getSize() - 36
        Chest.getItems().forEach((item, index) => {
			let itemName = item?.getName()?.removeFormatting()
			if(!itemName || !DungeonSecretsItems.includes(itemName) || index >= maxSlot) return

			if (itemName.toLowerCase() == `healing viii splash potion` || itemName.toLowerCase() == `healing potion 8 splash potion`) {
				Render.TitleUnderCursor(`${item?.getName()} &bFound in Chest!`, 5000)
			}

			if (itemName.toLowerCase() == `treasure talisman`) {
				Render.TitleUnderCursor(`${item?.getName()} &bFound in Chest!`, 5000)
			}
			// TODO Add a check to see if the Chest Contains any items that the user wants to keep the Chest open for them
            
        })
    }
})