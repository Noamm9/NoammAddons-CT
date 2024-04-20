/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import RenderLib from "../../RenderLib"
import Settings from "../Settings";
import { WorldState } from "../../Atomx/skyblock/World"

var colorMappings = {
    0: { red: 255, green: 255, blue: 255 },    // White
    1: { red: 255, green: 0, blue: 0 },        // Red
    2: { red: 0, green: 255, blue: 0 },        // Green
    3: { red: 0, green: 0, blue: 255 },        // Blue
    4: { red: 0, green: 255, blue: 255 },      // Aqua
    5: { red: 255, green: 255, blue: 0 },      // Yellow
    6: { red: 0, green: 0, blue: 0 },          // Black
    7: { red: 255, green: 0, blue: 255 }       // Magenta (Pink like Purple)
};

register("renderEntity", (entity, pos, partialTicks, event) => {
    if (!Settings.DungeonMobESP|| !WorldState.inDungeons()) return
    var EspColor = colorMappings[Settings.mycolorOptions];
    let name = entity.getName();
    const espBox = (x, y, z, height) => {
        RenderLib.drawEspBox(x, y-height, z, 0.9, height, EspColor.red ,EspColor.green,EspColor.blue, 1, true);
    }
    if (name.includes("✯") || name.includes("Shadow Assassin") || name.includes("Frozen Adventurer") || name.includes("Lost Adventurer") || name.includes("bat")) {
        if (name.includes("Fel") || name.includes("Withermancer")) {
            espBox(entity.getX(), entity.getY(), entity.getZ(), 2.8);
            entity.getEntity().func_82142_c(false);
        } else {
            espBox(entity.getX(), entity.getY(), entity.getZ(), 1.9);
        }
    }
});



