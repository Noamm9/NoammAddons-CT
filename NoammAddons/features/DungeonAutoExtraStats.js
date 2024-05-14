/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Config/Settings";

register("chat", () => { 
    if (!Settings.DungeonAutoExtraStats) return
    setTimeout(() => {
        ChatLib.command("showextrastats")
    }, 200);
}).setCriteria("> EXTRA STATS <").setContains();
