/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import { ModMessage, prefix } from "../utils" 


register(`chat`, (type) => 
    ChatLib.command(`pc ${prefix.removeFormatting()} Used Draft to Reset ${type}`)
).setCriteria(/^You used the Architect's First Draft to reset (Higher Or Lower| Boulder|Three Weirdos|Ice Path|Bomb Defuse)!/)