/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Config/Settings"


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
