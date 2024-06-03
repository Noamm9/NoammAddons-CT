/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"


register("renderPortal", (event) => {
    if (!Settings.HidePortalEffect) return
    Player.getPlayer().field_71086_bY = 0
    cancel(event)
})