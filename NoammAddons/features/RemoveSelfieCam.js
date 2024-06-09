/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Settings";
import { registerWhen } from "../utils"


function StartORStop() {
    return Settings.RemoveSelfieCamera && Client.settings.getSettings().field_74320_O == 2
}


const trigger = register("renderOverlay", () => Client.settings.getSettings().field_74320_O = 0)


registerWhen(trigger, StartORStop)