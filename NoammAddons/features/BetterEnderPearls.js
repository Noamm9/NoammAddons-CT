/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Settings";

register("playerInteract", (action, pos, event) => {
    if (!Settings.BetterEnderPearls) return
    if (action.toString() !== "RIGHT_CLICK_BLOCK") return
    if (Player.getHeldItem()?.getName() == "Ender Pearl") {
        cancel(event)
    }
})
