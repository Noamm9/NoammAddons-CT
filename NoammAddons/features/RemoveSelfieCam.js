/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Config/Settings";

register("renderOverlay", () => { 
    if(!Settings.RemoveSelfieCamera || Client.settings.getSettings().field_74320_O != 2) return;
    
    Client.settings.getSettings().field_74320_O = 0;
})
