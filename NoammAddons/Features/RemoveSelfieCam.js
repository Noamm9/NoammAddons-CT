/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Settings";
import { registerWhen } from "../utils"

registerWhen(register("renderOverlay", () => Client.settings.getSettings().field_74320_O = 0), () => Settings().RemoveSelfieCamera && Client.settings.getSettings().field_74320_O == 2)