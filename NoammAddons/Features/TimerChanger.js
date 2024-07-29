/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Settings"

register("packetReceived", (packet, event) => {
    if (packet.class.equals(net.minecraft.network.play.server.S03PacketTimeUpdate) && Settings().TimeChanger) {
        cancel(event)
    }
})


register(`step`, () => {
    if (!Settings().TimeChanger) return
    try {
        if (Settings().TimeChangerMode == 0) Client.getMinecraft().field_71441_e.func_72877_b(1000) //day
        if (Settings().TimeChangerMode == 1) Client.getMinecraft().field_71441_e.func_72877_b(13000) //night
        if (Settings().TimeChangerMode == 2) Client.getMinecraft().field_71441_e.func_72877_b(6000) // noon
        if (Settings().TimeChangerMode == 3) Client.getMinecraft().field_71441_e.func_72877_b(18000) // midnight
        if (Settings().TimeChangerMode == 4) Client.getMinecraft().field_71441_e.func_72877_b(23000) // sunrise
        if (Settings().TimeChangerMode == 5) Client.getMinecraft().field_71441_e.func_72877_b(12000) // sunset
    } catch (e) {}
})

