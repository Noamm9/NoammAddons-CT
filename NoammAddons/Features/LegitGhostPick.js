/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { BlockPoss, setAir, IsInDungeon, LegitGhostPickGUIdata, registerWhen } from "../utils"
import { GuiElement, MainGUI } from "../EditGui"


const BreakingSounds = JSON.parse(FileLib.read("NoammAddons", "RandomShit/BreakingSounds.json"))
const LegitGhostPickGuiElement = new GuiElement(LegitGhostPickGUIdata, "&b&lLegitGhostPick: &a&lEnabled")
let Toggle = false 

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


let lastTriggered = 0;
registerWhen(register('tick', () => {
    if (Keyboard.isKeyDown(Settings().GhostPickaxeKeybind)) {
        if ((Date.now() - lastTriggered) < 200) return;
        if (Settings().PickaxeMode == 0 || Settings().PickaxeMode == 2) {
            Toggle = !Toggle;
            lastTriggered = Date.now();
        } 
    }
}), () => Settings().LegitGhostPickaxe && !Client.isInGui);


registerWhen(register("renderOverlay", () => LegitGhostPickGuiElement.Draw()), () => Settings().LegitGhostPickaxe && Toggle)

register("packetsent", (packet, event) => {
    if (packet.class.getSimpleName() == "C07PacketPlayerDigging" && Toggle) {
        if (Player?.getHeldItem()?.getID() !== 261 && Player?.getHeldItem()?.getID() !== 46) cancel(event)
    }

    if (packet.class.getSimpleName() !== "C0APacketAnimation" || !IsInDungeon()) return
    if (Settings().PickaxeMode == 1 || Settings().PickaxeMode == 2) {

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