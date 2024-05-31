/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import { LegitGhostPickGUIdata } from "../index"
import Settings from "../Config/Settings"
import { MainGUI } from "../EditGui"
import Dungeon from "../../BloomCore/dungeons/Dungeon"
import { setAir } from "../utils"
const LegitGhostPickBind = new KeyBind("Legit Ghost Pickaxe", Keyboard.KEY_Z, "NoammAddons")
const sounds = JSON.parse(FileLib.read("CookieAddons", "data/sounds.json"))

const ids = [
    257,  // Iron Pickaxe
    274,  // Stone Pickaxe
    270,  // Wooden Pickaxe
    285,  // Golden Pickaxe
    278,  // Diamond Pickaxe
    130,  // Ender Chest
    54    // Chest
]

const ignoreList = [
    "Chest",
    "Lever",
    "Trapped Chest",
    "tile.skull.skeleton.name",
    'tile.air.name',
    'Button',
    'Ender Chest',
    'Bedrock'
]

export let Toggle = false 
export let md = false
export let Text = new Text(` `).setShadow(true).setFormatted(true) 



LegitGhostPickBind.registerKeyPress(() => {
	if (!Settings.LegitGhostPickaxe || !Dungeon.inDungeon) return
	Toggle = !Toggle
})


register("renderOverlay", () => {
	if (!Settings.LegitGhostPickaxe || Settings.PickaxeMode !== 0) return

	
	Text.setX(LegitGhostPickGUIdata.x)
	Text.setY(LegitGhostPickGUIdata.y)
	Text.setScale(LegitGhostPickGUIdata.s/100)
	Text.setString("&b&lLegitGhostPick: &a&lEnabled")
	
	if (Toggle || MainGUI.isOpen()) Text.draw()
	
	
})

register("packetsent", (packet, event) => {
    if (packet.class.getSimpleName() == "C07PacketPlayerDigging" && Toggle && Player?.getHeldItem()?.getID() !== 261) cancel(event)
})






register("packetsent", (packet, event) => {
    if (!Dungeon.inDungeon || Settings.PickaxeMode !== 1) return;
    if (packet.class.getSimpleName() == "C0APacketAnimation") {
        
		const block = Player.lookingAt()
        try {
            if (block.type == null || ignoreList.includes(block.type.name) || Player.getHeldItem() == null) return;
        
            const id = Player.getHeldItem().getID()
            
            if (ids.includes(id)) {
                setAir(block.getX(), block.getY(), block.getZ())
                World.playSound(sounds[String(block.type.name).toLowerCase()], 100, 1)
            } 
        } catch (e) {}
    }
})