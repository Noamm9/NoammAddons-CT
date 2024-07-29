/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Settings";

const item = [ "Ender Pearl"] // maybe i will add more stuff in the future

register("playerInteract", (action, pos, event) => {
    if (!Settings().BetterEnderPearls) return
    if (action.toString() !== "RIGHT_CLICK_BLOCK") return
    if (!Player?.getHeldItem()?.getName() || !item.some(a => Player?.getHeldItem()?.getName().includes(a))) return
    cancel(event)
})
