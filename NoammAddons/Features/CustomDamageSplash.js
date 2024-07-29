/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { formatNumber, ModMessage, registerWhen } from "../utils"



registerWhen(register(`renderEntity`, (e) => {
    if (e.getClassName() !== "EntityArmorStand") return
    
    const name = e.getName().removeFormatting()
    let REXmatch = name.match(/(✯|✧)\d{1,3}(,\d{3})+(✧|✯)|^\d{1,3}(,\d{3})+(?:♞)?$/) // https://regex101.com/r/Q7K1Gc
    //    EntityList.push(e.getName().removeFormatting())
    if (!REXmatch) return
    
    let dmg = formatNumber(parseInt(REXmatch[0].replace(/,/g, "").replace(/✧/g, "")))
    if (!dmg) return
    
    e.getEntity().func_96094_a(addRandomColorCodes(`✧${dmg}✧`))
    
}), () => Settings().CustomDamageNametag)


function addRandomColorCodes(inputString) {
    const colorCodes = ["§6", "§c", "§e", "§f"]
    let result = ""
    
    for (let char of inputString) {
      let randomColor = colorCodes[Math.floor(Math.random() * colorCodes.length)];
      result += randomColor + char + "§r";
    }
    
    return result;
  }








/*
let EntityList = []
register(`command`, () => ModMessage(removeDuplicates(EntityList).join(`\n`))).setName(`test1`)

function removeDuplicates(arr) {
    const uniqueValues = new Set(arr);
    return Array.from(uniqueValues);
}
    */