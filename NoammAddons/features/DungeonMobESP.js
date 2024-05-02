/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import RenderLib from "../../RenderLib"
import Settings from "../Settings";
import Dungeon from "../../BloomCore/dungeons/Dungeon"

let InBoss = false

let Criteria = [
    `[BOSS] Maxor: WELL WELL WELL LOOK WHO'S HERE!`, 
    `[BOSS] Sadan: So you made it all the way here... Now you wish to defy me? Sadan?!`,
    `[BOSS] Livid: Welcome, you arrive right on time. I am Livid, the Master of Shadows.`,
    `[BOSS] Thorn: Welcome Adventurers! I am Thorn, the Spirit! And host of the Vegan Trials!`,
    `[BOSS] The Professor: I was burdened with terrible news recently...`,
    `[BOSS] Scarf: This is where the journey ends for you, Adventurers.`,
    `[BOSS] Bonzo: Gratz for making it this far, but I’m basically unbeatable.`
]

register(`chat`, (e) => {
    let ChatMessage = ChatLib.getChatMessage(e,false).toString()
    if (Dungeon.inDungeon) {
        for (i=0;i<7;i++) {
            if (ChatMessage.includes(Criteria[i])) {
                InBoss = true        
            }
        }
    }
})

register(`worldUnload`, () => {
    InBoss - false  
})

register("renderEntity", (entity, pos, partialTicks, event) => {
    if (!Settings.DungeonMobESP || !Dungeon.inDungeon || InBoss) return
    let name = entity.getName();
    const espBox = (x, y, z, height) => {RenderLib.drawEspBox(x, y-height, z, 0.9, height, Settings.MobESPColor.getRed()/255 ,Settings.MobESPColor.getGreen()/255, Settings.MobESPColor.getBlue()/255, 1, true);}
    const espfilledBox = (x, y, z, height) => {RenderLib.drawInnerEspBox(x, y-height, z, 0.9, height, Settings.MobESPColor.getRed()/255 ,Settings.MobESPColor.getGreen()/255, Settings.MobESPColor.getBlue()/255, Settings.MobESPColor.getAlpha() /255, 1, true);}

    if (name.includes("✯") || name.includes("Shadow Assassin") || name.includes("Frozen Adventurer") || name.includes("Lost Adventurer") || name.includes("bat")) {
        if (name.includes("Fel") || name.includes("Withermancer")) {
           // entity.getEntity().func_82142_c(false);
            if (Settings.MobESPMode == 0) espBox(entity.getX(), entity.getY(), entity.getZ(), 2.8);
            else if (Settings.MobESPMode == 1) espfilledBox(entity.getX(), entity.getY(), entity.getZ(), 2.8)
            else {
                espBox(entity.getX(), entity.getY(), entity.getZ(), 2.8)
                espfilledBox(entity.getX(), entity.getY(), entity.getZ(), 2.8)
            }
        } else {
           // entity.getEntity().func_82142_c(false);
            if (Settings.MobESPMode == 1) espfilledBox(entity.getX(), entity.getY(), entity.getZ(), 1.9)
            else if (Settings.MobESPMode == 0) espBox(entity.getX(), entity.getY(), entity.getZ(), 1.9)
            else {
                espBox(entity.getX(), entity.getY(), entity.getZ(), 1.9)
                espfilledBox(entity.getX(), entity.getY(), entity.getZ(), 1.9)
            }
        }
    }
});



