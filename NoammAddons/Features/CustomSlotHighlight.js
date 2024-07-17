/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"



/**/
register(`renderSlotHighlight`, (mx, my, slot, gui, event) => {
    if (!Settings.CustomSlotHighlight) return
    const r = Settings.CustomSlotHighlightColor.getRed()
    const g = Settings.CustomSlotHighlightColor.getGreen()
    const b = Settings.CustomSlotHighlightColor.getBlue()
    const a = Settings.CustomSlotHighlightColor.getAlpha()
    const NewColor = Renderer.color(r, g, b, a)
    const HighLightedSlot = new Slot(slot)
    cancel(event)
    Renderer.translate(0, 0, 300)
    Renderer.drawRect(NewColor, HighLightedSlot.getDisplayX(), HighLightedSlot.getDisplayY(), 16,16)
})


/*
register(`postGuiRender`, () => {
    if (!Settings.CustomSlotHighlight) return

    const [r, g, b, a] = [
        Settings.CustomSlotHighlightColor.getRed(),
        Settings.CustomSlotHighlightColor.getGreen(),
        Settings.CustomSlotHighlightColor.getBlue(),
        Settings.CustomSlotHighlightColor.getAlpha()
    ]

    const mx = Client.getMouseX()
    const my = Client.getMouseY()
    const HighLightedSlot = Client.currentGui.getSlotUnderMouse()
    if (!HighLightedSlot || mx >= HighLightedSlot.getDisplayX() && mx <= HighLightedSlot.getDisplayX() + 16 && my >= HighLightedSlot.getDisplayY() && my <= HighLightedSlot.getDisplayY() + 16) return

    Renderer.translate(0,0, 300)
    Renderer.drawRect(Renderer.color(r, g, b, a), HighLightedSlot.getDisplayX(), HighLightedSlot.getDisplayY(), 16,16)
    Renderer.translate(0,0, 0)
})
*/