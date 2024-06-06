/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Settings"
import PogObject from "../../PogData"
import { PlayerUtils } from "../utils"
import Dungeon from "../../BloomCore/dungeons/Dungeon"

const Keybinds = new PogObject("Noammaddons", {
	ClassULTIMATE: Keyboard.KEY_NONE,
	ClassAbility: Keyboard.KEY_NONE
}, "Config/Keybinds.json")


let ClassULTIMATE = new KeyBind("Class ULTIMATE", Keybinds.ClassULTIMATE, "NoammAddons")
let ClassAbility = new KeyBind("Class ABILITY", Keybinds.ClassAbility, "NoammAddons")




ClassULTIMATE.registerKeyPress(() => {
    if (!Settings.AbilityKeybinds || !Dungeon.inDungeon) return
    PlayerUtils.UseDungeonClassAbility(true)
    Keybinds.ClassULTIMATE = ClassULTIMATE.getKeyCode()
})
    
ClassAbility.registerKeyPress(() => {
    if (!Settings.AbilityKeybinds || !Dungeon.inDungeon) return
    PlayerUtils.UseDungeonClassAbility(false)
    Keybinds.ClassAbility = ClassAbility.getKeyCode()
})
    
