/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Settings"

let showWishMessage = false
let wishTimer = 0
let wishTitleComp = new Text(
        Settings().healerWishTitle,
        Renderer.screen.getWidth() / 2 - (Renderer.getStringWidth(ChatLib.removeFormatting(Settings().healerWishTitle))*5) / 2,
        Renderer.screen.getHeight() / 2 - Renderer.screen.getHeight() / 4
    )
        .setShadow(true).setFormatted(true).setScale(5)



register("renderOverlay", () => {
    if (showWishMessage) wishTitleComp.draw()
})


const wishMessages = [
    "⚠ Maxor is enraged! ⚠",
    "[BOSS] Goldor: You have done it, you destroyed the factory…"
]

wishMessages.forEach((message) => {
    register("chat", () => {
        if (!Settings().healerWish || ChatLib.removeFormatting(Settings().healerWishTitle) == "") return;
        ChatLib.command(`pc ${ChatLib.removeFormatting(Settings().healerWishMessage)}`)
        wishTitleComp.setString(Settings().healerWishTitle)
        wishTitleComp.setX(Renderer.screen.getWidth() / 2 - (Renderer.getStringWidth(ChatLib.removeFormatting(Settings().healerWishTitle))*5) / 2)
        wishTitleComp.setY(Renderer.screen.getHeight() / 2 - Renderer.screen.getHeight() / 4)
        wishTimer = 10
        showWishMessage = true;
    }).setCriteria(message)
})

register("chat", () => {
    showWishMessage = false; 
    wishTimer = 0
}).setCriteria('${.} Wish healed you for ${.} health and granted you an absorption shield with ${.} health!')
    
register("step", () => {
    if (!showWishMessage) return;

    if (wishTimer > 0) wishTimer -= 1
    if (wishTimer < -1) wishTimer = 0
    if (wishTimer == 0) showWishMessage = false
}).setFps(1)
