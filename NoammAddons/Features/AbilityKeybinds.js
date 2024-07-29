/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Settings"
import { PlayerUtils, IsInDungeon, registerWhen } from "../utils"

let lastTriggered = 0;
registerWhen(register(`tick`, () => {
    if ((Date.now() - lastTriggered) < 300) return;

    if (Keyboard.isKeyDown(Settings().ULTKeybind)) {
        PlayerUtils.UseDungeonClassAbility(true)
        lastTriggered = Date.now();
    } 

    if (Keyboard.isKeyDown(Settings().AbilityKeybind)) {
        PlayerUtils.UseDungeonClassAbility(false)
        lastTriggered = Date.now();
    }

}), () => Settings().AbilityKeybinds && IsInDungeon())
