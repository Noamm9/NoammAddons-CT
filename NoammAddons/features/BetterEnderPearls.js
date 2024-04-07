/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Settings";

const items = [ 
    "Ender Pearl",
    "Aspect of the End"
]

register("playerInteract", (action, pos, event) => {
    if (!Settings.BetterEnderPearls) return
    if (action.toString() !== "RIGHT_CLICK_BLOCK") return
    let itemName = Player.getHeldItem()?.getName()
    if (!itemName || !items.some(a => itemName.includes(a))) return
    cancel(event)
})
