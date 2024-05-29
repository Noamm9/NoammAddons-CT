import { getLore } from "../utils";
const GuiUtils = Java.type("net.minecraftforge.fml.client.config.GuiUtils");
const Mouse = Java.type("org.lwjgl.input.Mouse");


let scrollY = 0;
let scrollX = 0;
let scale = 1;


register('renderSlotHighlight', (mx, my, slot, gui, event) => {
    try {

        const itemSlot = new Slot(slot);
        const lore = getLore(itemSlot.getItem(), true); // Assuming getLore is defined elsewhere

        if (!lore || lore.length === 0) return;

        let totalTextHeight = lore.length * 10;
        let maxTextWidth = 0;

        lore.forEach(text => {
            if (text) {
                maxTextWidth = Math.max(maxTextWidth, Renderer.getStringWidth(text));
            }
        });
        
        let x = (scrollX) / scale;
        let y = (scrollY) / scale;

        if (!(Client.getChatGUI() instanceof net.minecraft.client.gui.GuiChat)) {
            let eventDWheel = Mouse.getDWheel();

            if (!Keyboard.isKeyDown(Keyboard.KEY_LCONTROL) && !Keyboard.isKeyDown(Keyboard.KEY_LSHIFT)) scrollY += eventDWheel/50
        
            if (Keyboard.isKeyDown(Keyboard.KEY_LSHIFT)) {
                scrollX += eventDWheel/50
            }
            if (Keyboard.isKeyDown(Keyboard.KEY_LCONTROL)) {
                scale += eventDWheel/100
                scale = Math.max(0.5, scale);
            }

            if (Mouse.isButtonDown(Keyboard.KEY_SPACE)) {
                scale = 1;
                x = 0;
                y = 0;
            }
        }



        const backgroundColor = -0xfeffff0;
        const zLevel = 1000;

        GL11.glPushMatrix();
        GL11.glScalef(scale, scale, 1);



        GuiUtils.drawGradientRect(zLevel, x - 3, y - 4, x + maxTextWidth + 3, y - 3, backgroundColor, backgroundColor);
        GuiUtils.drawGradientRect(zLevel, x - 3, y + totalTextHeight + 3, x + maxTextWidth + 3, y + totalTextHeight + 4, backgroundColor, backgroundColor);
        GuiUtils.drawGradientRect(zLevel, x - 3, y - 3, x + maxTextWidth + 3, y + totalTextHeight + 3, backgroundColor, backgroundColor);
        GuiUtils.drawGradientRect(zLevel, x - 4, y - 3, x - 3, y + totalTextHeight + 3, backgroundColor, backgroundColor);
        GuiUtils.drawGradientRect(zLevel, x + maxTextWidth + 3, y - 3, x + maxTextWidth + 4, y + totalTextHeight + 3, backgroundColor, backgroundColor);

        const borderColorStart = 0x505000FF;
        const borderColorEnd = borderColorStart & 0xFEFEFE >> 1 | borderColorStart & -0x1000000;

        GuiUtils.drawGradientRect(zLevel, x - 3, y - 3 + 1, x - 3 + 1, y + totalTextHeight + 3 - 1, borderColorStart, borderColorEnd);
        GuiUtils.drawGradientRect(zLevel, x + maxTextWidth + 2, y - 3 + 1, x + maxTextWidth + 3, y + totalTextHeight + 3 - 1, borderColorStart, borderColorEnd);
        GuiUtils.drawGradientRect(zLevel, x - 3, y - 3, x + maxTextWidth + 3, y - 3 + 1, borderColorStart, borderColorStart);
        GuiUtils.drawGradientRect(zLevel, x - 3, y + totalTextHeight + 2, x + maxTextWidth + 3, y + totalTextHeight + 3, borderColorEnd, borderColorEnd);

        lore.forEach((text, i) => {
            if (text) {
                Renderer.scale(scale, scale)
                Renderer.drawStringWithShadow(text, x, y + i * 10);   
            } 
        });

        GL11.glPopMatrix()

    } catch (e) {console.error(e)}
});

TriggerRegister.registerItemTooltip((a,b,e) => cancel(e))