/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { CoolSound, ModMessage, registerWhen } from "../utils" 
import { getSkyblockItemID } from "../../BloomCore/utils/Utils"

let tickTimer = 0
const CooldownTimer = new Text(" ").setShadow(true).setFormatted(true).setScale(2)

const WitherBlades = [
    "ASTRAEA",
    "HYPERION",
    "VALKYRIE",
    "SCYLLA"
]

registerWhen(register(`packetSent`, () => {
    const held = Player.getHeldItem()
    const sbId = getSkyblockItemID(held)
    
    if (WitherBlades.some(WithersSword => WithersSword == sbId) && (tickTimer == 0 || tickTimer >= 5_000)) {
        tickTimer = 0
        DrawOverlay.register()
        Timer.register()
    }
    
}).setFilteredClass(Java.type("net.minecraft.network.play.client.C08PacketPlayerBlockPlacement")), () => Settings.WitherShieldDisplay)


const Timer = register('packetReceived', () => {
    tickTimer += 50

    if (tickTimer == 5_000 ) CoolSound()
    
    if (tickTimer == 10_000 ) {
        Timer.unregister()
        DrawOverlay.unregister()
    } 

}).setFilteredClass(Java.type("net.minecraft.network.play.server.S32PacketConfirmTransaction")).unregister()


const DrawOverlay = register(`renderOverlay`, () => {
    CooldownTimer.setString(`&e${(((5_000/50) - tickTimer/50)/20).toFixed(1)}`)

    CooldownTimer.setX(Renderer.screen.getWidth()/2 - Renderer.getStringWidth(CooldownTimer.getString().removeFormatting()))
    CooldownTimer.setY(Renderer.screen.getHeight()/2 + Renderer.screen.getHeight()/80 + CooldownTimer.getHeight()/2)
    if (tickTimer < 5_000) CooldownTimer.draw()
}).unregister()

//register(`tick`, () => ModMessage(tickTimer))