/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"



/**/
register(`renderSlotHighlight`, (mx, my, slot, gui, event) => {
    if (!Settings().CustomSlotHighlight) return
    const r = Settings().CustomSlotHighlightColor[0]
    const g = Settings().CustomSlotHighlightColor[1]
    const b = Settings().CustomSlotHighlightColor[2]
    const a = Settings().CustomSlotHighlightColor[3]
    const NewColor = Renderer.color(r, g, b, a)
    const HighLightedSlot = new Slot(slot)
    cancel(event)
    Renderer.translate(0, 0, 300)
    Renderer.drawRect(NewColor, HighLightedSlot.getDisplayX(), HighLightedSlot.getDisplayY(), 16,16)
})


/*
register(`postGuiRender`, () => {
    if (!Settings().CustomSlotHighlight) return

    const [r, g, b, a] = [
        Settings().CustomSlotHighlightColor[0],
        Settings().CustomSlotHighlightColor[1],
        Settings().CustomSlotHighlightColor[2],
        Settings().CustomSlotHighlightColor[3]
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