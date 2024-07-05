/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings";
import { registerWhen } from "../utils";


let rot = 0;

const rotTrigger = register("step", (i) => {

    if (Settings.SpinDiraction == 0) rot = ((i*(Settings.SpinSpeed*0.06)) % 360) - 180 // right

    else rot = 180 - ((i*(Settings.SpinSpeed*0.06)) % 360) // left

}).setFps(100)


const renderTrigger = register("renderEntity", (entity) => {
    if (Player && entity.getEntity() instanceof net.minecraft.entity.player.EntityPlayer) {
        Tessellator.pushMatrix()

        if (Settings.SpinOnEveryone) {
            if (entity.getName() !== Player.getName() && !entity.isDead()) {
                entity.getEntity().func_70034_d(-rot)
                entity.getEntity().field_70177_z = -rot
            } 
            else Tessellator.rotate(rot, 0, 1, 0)
        }

        else if (entity.getName() == Player.getName()) Tessellator.rotate(rot, 0, 1, 0)
        
    }
})


const renderTriggerPost = register("postRenderEntity", (entity) => {
    if (Player && entity.getEntity() instanceof net.minecraft.entity.player.EntityPlayer) Tessellator.popMatrix()
})



registerWhen(rotTrigger, () => Settings.ClientSideSpin)
registerWhen(renderTrigger, () => Settings.ClientSideSpin)
registerWhen(renderTriggerPost, () => Settings.ClientSideSpin)
