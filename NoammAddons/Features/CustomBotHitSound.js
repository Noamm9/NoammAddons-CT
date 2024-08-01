/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { registerWhen } from "../utils"


registerWhen(register("soundPlay", (vec, name, vol, pitch, _3, event) => {
    if (name !== "random.successful_hit") return

    cancel(event);
    World.playSound(`note.harp`, vol, pitch);
    World.playSound(`note.harp`, vol, pitch);
    World.playSound(`note.harp`, vol, pitch);
    World.playSound(`note.harp`, vol, pitch);
    
}), () => Settings().CustomBowHitSound)