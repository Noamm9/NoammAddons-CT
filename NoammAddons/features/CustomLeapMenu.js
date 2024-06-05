/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Settings"
import Dungeon from "../../BloomCore/dungeons/Dungeon";
import { clickSlot, colorClass, ModMessage } from "../utils"


let players = []
let heads = new Set([])
let runned = false

const clickTrigger = register("guiMouseClick", (x, y, _0, _1, event) => ClickLogic(x, y, event)).unregister();
register(net.minecraftforge.client.event.GuiScreenEvent.DrawScreenEvent.Pre, (event) => RenderCustomGUI(event))
register(`worldUnload`, () => players = [])

register(`step`, () => {
    if(IsSpiritLeapGuiAndSettingsEnabled()) {
        clickTrigger.register()
        UpdatePlayersArray()
    }
    else clickTrigger.unregister() 
})




function RenderCustomGUI(event) {
    if(!IsSpiritLeapGuiAndSettingsEnabled()) return
    cancel(event)

    const Scale = /*Settings.CustomLeapMenuScale*/ 1
	const screenWidth = Renderer.screen.getWidth() / Scale
	const screenHeight = Renderer.screen.getHeight() / Scale
	const width = 128 + 32 + 128
	const height = 64 + 32 + 64
	const X = screenWidth / 2 - width / 2
	const Y = screenHeight / 2 - height / 2
	const offsets = [[X, Y], [X + 128 + 32, Y], [X, Y + 64 + 32], [X + 128 + 32, Y + 64 + 32]]

	Tessellator.pushMatrix();
	for (let i = 0; i < 4; ++i) {
		if (!players[i]) return
		Renderer.scale(Scale);
		Renderer.drawRect(Renderer.color(255, 255, 255, 150), offsets[i][0], offsets[i][1], 128, 64);
		let nameScale = 112 / Renderer.getStringWidth(players[i].name);
		if (nameScale > 1.5) nameScale = 1.5;
		Renderer.scale(Scale * nameScale);
		Renderer.drawStringWithShadow(`§n${colorClass(players[i].class)}§n${players[i].name}§r`, offsets[i][0] / nameScale + 4, (offsets[i][1] / nameScale + 4) - 2.5);
		Renderer.scale(Scale);
		Renderer.drawStringWithShadow(`${colorClass(players[i].class)}${players[i].class}`, offsets[i][0] + 128 - 4 - Renderer.getStringWidth(players[i].class), offsets[i][1] + 64 - 12);
        if (runned) heads.forEach((head) => head.draw(offsets[i][0] + 64 - (46 * Scale)/2, (offsets[i][1] + 64 - 46 * Scale) - 1.5, 46 * Scale, 46 * Scale))
        if (runned) ModMessage(heads.size)


    
	
    }
	Tessellator.popMatrix();
}

function UpdatePlayersArray() {
    const Chest = Player.getContainer()
    if (!Chest) return
    const maxSlot = Chest.getSize() - 36

    Chest.getItems().forEach((item, slot) => {
		if(!item || slot >= maxSlot) return
        const itemName = item.getName().removeFormatting()
        let DungeonPlayerClasses = Dungeon.classes
        for (let PlayerName in DungeonPlayerClasses) {
            let PlayerClass = DungeonPlayerClasses[PlayerName];
            if (itemName == PlayerName) { 

                if (players.length === 0) players.push({ name: PlayerName, class: PlayerClass, slot: slot})
                
                if (players.find(player => player.name === itemName)) return 
                players.push({ name: PlayerName, class: PlayerClass, slot: slot})

            }
        } 
    })

    if (players.length > 4) players.pop()
    
    if (!runned) { 
    
        runned = true
        for (let i = 0; i<4; i++) {
            if (!players[i]) return
            heads.add(Image.fromUrl(`https://www.mc-heads.net/avatar/${players[i].name}`))
        }
    }
}


function ClickLogic(x, y, event) {
    cancel(event)

    const centerX = Renderer.screen.getWidth() / 2
	const centerY = Renderer.screen.getHeight() / 2
	let index = -1


	if (x < centerX && y < centerY) index = 0
	else if (x > centerX && y < centerY) index = 1
	else if (x < centerX && y > centerY) index = 2
	else if (x > centerX && y > centerY) index = 3

	if (index === -1) return;
	if (!players[index]) return;

    clickSlot(players[index].slot, 0)
	Player.getPlayer().func_71053_j()
}


function IsSpiritLeapGuiAndSettingsEnabled() {
    const Chest = Player.getContainer()
    if (!Chest) return false

    if(Chest.getName().toLowerCase().removeFormatting() == "spirit leap" && Settings.CustomLeapMenu) return true
    else return false
}

