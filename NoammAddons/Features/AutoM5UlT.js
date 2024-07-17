/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { getClass, PlayerUtils, registerWhen } from "../utils" 


registerWhen(register(`chat`, () => {
    let PlayerClass = getClass(Player.getName()).toLowerCase().removeFormatting()

    if (PlayerClass.includes(`tank`) || PlayerClass.includes(`healer`)) new Thread(() => {
        Thread.sleep(1500)
        PlayerUtils.UseDungeonClassAbility(true)
    })
    
}).setCriteria(`[BOSS] Livid: I respect you for making it to here, but I'll be your undoing.`), () => Settings.AutoM5ULT)