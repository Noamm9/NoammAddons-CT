/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { Color, Render, getLore, registerWhen } from "../utils";
const Mouse = Java.type("org.lwjgl.input.Mouse");


let x = 0;
let y = 0;
let scale = 0.5;


registerWhen(register(`postGuiRender`, (mx, my) => {
    try {
        const itemSlot = Client.currentGui.getSlotUnderMouse()
        if (!itemSlot) return;
        const lore = getLore(itemSlot.getItem(), true)

        if (!lore || lore.length === 0) return;

        let drawX = (x +mx+10) / scale;
        let drawY = (y+my - (((lore.length+1) * 11) + 3)/4) / scale;

        if (!(Client.getChatGUI() instanceof net.minecraft.client.gui.GuiChat)) {
            let eventDWheel = Mouse.getDWheel();


            if (!Keyboard.isKeyDown(Keyboard.KEY_LSHIFT)) y += eventDWheel / 20;

            if (Keyboard.isKeyDown(Keyboard.KEY_LSHIFT)) x -= eventDWheel / 20;

            if (Keyboard.isKeyDown(Keyboard.KEY_LCONTROL)) {
                scale += eventDWheel / 2000;
                if (scale < 0.3) scale = 0.3;
            }

            if (Keyboard.isKeyDown(Keyboard.KEY_SPACE)) {
                scale = 0.5
                x = 0
                y = 0
            }

        }
    

        Tessellator.pushMatrix()

        Tessellator.translate(0, 0, 320)
        Renderer.scale(scale)
        let width = getLongestStringWithinArray(lore)



        Render.RoundedRect(
            new Color(33 / 255, 33 / 255, 33 / 255, 1).darker(), 
            drawX-3 - (width / 10) / 2, 
            drawY-3 - (width / 10) / 2, 
            (width * 4.4) + 6 + width / 10, 
            ((lore.length+1) * 11) + 3 + width / 10, 
            5
        )

        Render.RoundedRect(
            new Color(33 / 255, 33 / 255, 33 / 255),
            drawX-3, 
            drawY-3, 
            (width * 4.4) + 6, 
            ((lore.length+1) * 11) + 3, 
            5
        )

        Renderer.drawStringWithShadow(lore[0], drawX, drawY)

        for (i = 1; i < lore.length; i++) {
            Tessellator.translate(0, 0, 350)
            Renderer.scale(scale)
            Renderer.drawStringWithShadow(lore[i], drawX, drawY +(i+1)*11)
        }


        Tessellator.popMatrix()

    } catch (e) {}
}), () => Settings.CustomItemTooltip)



registerWhen(TriggerRegister.registerItemTooltip((a, b, e) => cancel(e)), () => Settings.CustomItemTooltip)

function getLongestStringWithinArray(Array) {
    let longestString = Array[0]; // Assume the first string is the longest

    for (let i = 1; i < Array.length; i++) {
        if (Array[i].length > longestString.length) {
            longestString = Array[i];
        }
    }

    return longestString.length;
}


