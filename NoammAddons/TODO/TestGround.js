/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { ModMessage, registerWhen, Render } from "../utils"

const onSS = () => Player.getX() > 105 && Player.getX() < 121 && Player.getY() === 120 && Player.getZ() > 90 && Player.getZ() < 100
const on4thDevice = () => Player.getX() > 63 && Player.getX() < 64 && Player.getY() === 127 && Player.getZ() > 35 && Player.getZ() < 36;
let time


registerWhen(register("chat", () => time = Date.now()).setCriteria("[BOSS] Goldor: Who dares trespass into my domain?"), () => /*ssTimer*/ true)


register("chat", () => {

    if (time && (onSS() || on4thDevice())) {
        ModMessage(`&aDev was completed in &6${((Date.now() - time)/1000).toFixed(2)} &aseconds!`)
        Render.Title(`&aDev was completed in &6${((Date.now() - time)/1000).toFixed(2)} &aseconds!`, 2, 3000, -Renderer.screen.getHeight()/5)
        time = null
    }
    
}).setCriteria(/(.+) completed a device! \(...\)/)