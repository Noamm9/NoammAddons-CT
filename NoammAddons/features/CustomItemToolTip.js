

import { getLore } from "../utils"
let itemSlot 
let lore = []
let Hovered

register('renderSlotHighlight', (mx, my, slot, gui, event) => {
    try {
        cancel(event)
		Hovered = true
        itemSlot = new Slot(slot);
        lore = getLore(itemSlot.getItem(), true).reverse();
    } catch (e) {
        itemSlot = null;
        lore = [];
    }
});

register('renderOverlay', () => {
	if (!Hovered) return
    let X = 13
	let Y = 24
	if (lore.length === 0) return
    
    let maxTextWidth = 0
    let totalTextHeight = lore.length * 10
	let RenderX = Renderer.screen.getWidth() / 20 
	let RenderY = Renderer.screen.getHeight() - Renderer.screen.getWidth() / 7

    for (let i = 0; i < lore.length; ++i) {
        let text = lore[i]
        if (text == null || text === "") continue

        maxTextWidth = Math.max(maxTextWidth, Renderer.getStringWidth(text))
    }

    
    let rectX = RenderX - X
    let rectY = RenderY + Y - totalTextHeight
    let rectWidth = maxTextWidth + 10
    let rectHeight = totalTextHeight + 10


    GL11.glPushMatrix();
    GL11.glDisable(GL11.GL_DEPTH_TEST)
    GL11.glTranslatef(0, 0, 800)

    Renderer.drawRect(Renderer.color(25, 25, 25, 100), rectX, rectY, rectWidth, rectHeight)

    // Draw the lore text
    for (let i = 0; i < lore.length; ++i) {
        let text = lore[i]
        if (text == null || text === "") continue

        let textX = RenderX - X
        let textY

        if (i == lore.length-1) textY = RenderY + Y - 10 * i - 7
		else textY = RenderY + Y - 10 * i
        

        Renderer.drawStringWithShadow(text, textX + 2, textY)
    }

    GL11.glEnable(GL11.GL_DEPTH_TEST)
    GL11.glPopMatrix()
	Hovered = false
})
