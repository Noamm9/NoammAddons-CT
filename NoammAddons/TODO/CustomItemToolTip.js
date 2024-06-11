import { ModMessage, getLore } from "../utils";
const GuiUtils = Java.type("net.minecraftforge.fml.client.config.GuiUtils");
const Mouse = Java.type("org.lwjgl.input.Mouse");


let x = 10;
let y = 10;
let scale = 1;

register('renderSlotHighlight', (mx, my, slot, gui, event) => {
    try {
        const itemSlot = new Slot(slot);
        if (!itemSlot) return;
        const lore = getLore(itemSlot.getItem(), true);

        if (!lore || lore.length === 0) return;

        let drawX = x / scale;
        let drawY = y / scale;

        if (!(Client.getChatGUI() instanceof net.minecraft.client.gui.GuiChat)) {
            let eventDWheel = Mouse.getDWheel();


            if (!Keyboard.isKeyDown(Keyboard.KEY_LSHIFT)) y += eventDWheel / 40;

            if (Keyboard.isKeyDown(Keyboard.KEY_LSHIFT)) x += eventDWheel / 40;

            if (Keyboard.isKeyDown(Keyboard.KEY_LCONTROL)) {
                scale += eventDWheel / 2000;
                if (scale < 0.3) scale = 0.3;
            }

            if (Keyboard.isKeyDown(Keyboard.KEY_SPACE)) {
                scale = 1;
                x = mx / scale;
                y = my / scale;
            }

        }
    

        Tessellator.pushMatrix()
        Tessellator.disableLighting()
        Tessellator.translate(0, 0, 320).scale(scale)
        Tessellator.enableDepth()
        Tessellator.disableBlend()

        GuiUtils.drawHoveringText(lore, drawX, drawY, Renderer.screen.getWidth()*Renderer.screen.getWidth(), Renderer.screen.getHeight()*Renderer.screen.getWidth(), 1111111, Renderer.getFontRenderer())

        Tessellator.enableLighting()
        Tessellator.popMatrix()

    } catch (e) {}
});



TriggerRegister.registerItemTooltip((a, b, e) => cancel(e));