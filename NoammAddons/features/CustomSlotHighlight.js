/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"


register(`renderSlotHighlight`, (mx, my, slot, gui, event) => {
    let r = Settings.CustomSlotHighlighColor.getRed()
    let g = Settings.CustomSlotHighlighColor.getGreen()
    let b = Settings.CustomSlotHighlighColor.getBlue()
    let a = Settings.CustomSlotHighlighColor.getAlpha()
    let NewColor = Renderer.color(r, g, b, a)
    if (!Settings.CustomSlotHighligh) return
    cancel(event)
    let HighLightedSlot = new Slot(slot)
    Renderer.translate(0, 0, 300)
    Renderer.drawRect(NewColor, HighLightedSlot.getDisplayX(), HighLightedSlot.getDisplayY(), 16,16)
})
