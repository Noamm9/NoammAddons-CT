/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings";
import { registerWhen } from "../utils";


const renderTrigger = register("renderEntity", (entity) => {
    if (Player && entity.getEntity() instanceof net.minecraft.entity.player.EntityPlayer) {
        Tessellator.pushMatrix()

       /* if (Settings.ScaleOnEveryone) Tessellator.scale(Settings.CustomPlayerScale, Settings.CustomPlayerScale, Settings.CustomPlayerScale)

        else */if (entity.getName() == Player.getName()) Tessellator.scale(Settings.CustomPlayerScale, Settings.CustomPlayerScale, Settings.CustomPlayerScale)

    }
})


const renderTriggerPost = register("postRenderEntity", (entity) => {
    if (Player && entity.getEntity() instanceof net.minecraft.entity.player.EntityPlayer) Tessellator.popMatrix()
})



registerWhen(renderTrigger, () => Settings.PlayerScale)
registerWhen(renderTriggerPost, () => Settings.PlayerScale)