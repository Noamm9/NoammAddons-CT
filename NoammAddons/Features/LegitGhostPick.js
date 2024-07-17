/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { BlockPoss, setAir, IsInDungeon, LegitGhostPickGUIdata, registerWhen } from "../utils"
import { MainGUI } from "../EditGui"

export let Toggle = false 
export let md = false
export let Text = new Text(` `).setShadow(true).setFormatted(true) 

const LegitGhostPickBind = new KeyBind("Legit Ghost Pickaxe", Keyboard.KEY_Z, "NoammAddons")
let BreakingSounds = JSON.parse(FileLib.read("NoammAddons", "RandomShit/BreakingSounds.json"))

const ids = [
    257,  // Iron Pickaxe
    274,  // Stone Pickaxe
    270,  // Wooden Pickaxe
    285,  // Golden Pickaxe
    278,  // Diamond Pickaxe
    130,  // Ender Chest
    54/*,    Chest
    276      // Diamond sword for testing*/
]

const ignoreList = [
    "Chest",
    "Lever",
    "Trapped Chest",
    "tile.skull.skeleton.name",
    'tile.air.name',
    'Button',
    'Ender Chest',
    'Bedrock',
    `Ladder`,
    `TNT`,
    `Portal`
]





LegitGhostPickBind.registerKeyPress(() => {
	if (!Settings.LegitGhostPickaxe) return
    if (Settings.PickaxeMode == 0 || Settings.PickaxeMode == 2)
    Toggle = !Toggle
})


register("renderOverlay", () => {
	if (!Settings.LegitGhostPickaxe) return

	
	Text.setX(LegitGhostPickGUIdata.x)
	Text.setY(LegitGhostPickGUIdata.y)
	Text.setScale(LegitGhostPickGUIdata.s/100)
	Text.setString("&b&lLegitGhostPick: &a&lEnabled")
	
	if (Toggle || MainGUI.isOpen()) Text.draw()
	
	
})

register("packetsent", (packet, event) => {
    if (packet.class.getSimpleName() == "C07PacketPlayerDigging" && Toggle) {
        if (Player?.getHeldItem()?.getID() !== 261 && Player?.getHeldItem()?.getID() !== 46) cancel(event)
    }

    if (packet.class.getSimpleName() !== "C0APacketAnimation" || !IsInDungeon()) return
    if (Settings.PickaxeMode == 1 || Settings.PickaxeMode == 2) {

        const block = Player.lookingAt()

        try {
            if (block.type == null || block.type.name == "air" || ignoreList.includes(block.type.name) || Player.getHeldItem() == null) return
        
            const id = Player.getHeldItem().getID()
            
            if (!ids.includes(id)) return
            setAir(new BlockPoss(block.getX(), block.getY(), block.getZ()))
            World.playSound(BreakingSounds[String(block.type.name).toLowerCase()], 100, 1)
            
        } catch (e) {}
    }
})



/*
register("packetsent", (packet, event) => {
    if (packet.class.getSimpleName() == "C04PacketPlayerPosition") return
    if (packet.class.getSimpleName() == "C03PacketPlayer") return
    if (packet.class.getSimpleName() == "C00PacketKeepAlive") return
    if (packet.class.getSimpleName() == "C06PacketPlayerPosLook")
    if (packet.class.getSimpleName() == "C05PacketPlayerLook") return
    if (packet.class.getSimpleName() == "C0FPacketConfirmTransaction") return
    if (packet.class.getSimpleName() == "C06PacketPlayerPosLook") return
        ModMessage(packet.class.getSimpleName())
})*/