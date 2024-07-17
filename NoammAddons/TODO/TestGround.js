/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { ModMessage, PreGuiRenderEvent, Render, registerWhen, CloseCurrentGui, getPhase, Color } from "../utils"

let EntityList = []


register(`renderEntity`, (e,pos,pt,event) => {
    if (e.getClassName() !== "EntityArmorStand") return

    const name = e.getName().removeFormatting()
    let REXmatch = name.match(/✧(.+)✧|^\d{1,3}(,\d{3})+$/) // https://regex101.com/r/Q7K1Gc/1
    if (!REXmatch) return

    let dmg = formatNumber(parseInt(REXmatch[0].replace(/,/g, "").replace(/✧/g, "")))
    if (!dmg) return

    cancel(event)
    EntityList.push({Entity: e, Damage: dmg, Time: Date.now()})



})


register(`renderWorld`, () => {
    if (!EntityList) return

    EntityList.forEach((obj, i) => {
        if (!obj.Entity.isDead()) {
            Render.StringWithShadow(obj.Damage, obj.Entity.getRenderX(), obj.Entity.getRenderY()+1, obj.Entity.getRenderZ(), Renderer.RED, 1.7, true, false)
        }
        else EntityList.splice(i, 1);
    })
})






export function formatNumber(num) {
    if (isNaN(num) || num === 0) return "0";
    
    const sign = Math.sign(num);
    const absNum = Math.abs(num);

    if (absNum < 1) return (sign === -1 ? '-' : '') + absNum.toFixed(2);

    const abbrev = ["", "k", "m", "b", "t", "q", "Q"];
    const index = Math.floor(Math.log10(absNum) / 3);
  
    const formattedNumber = ((sign === -1 ? -1 : 1) * absNum / Math.pow(10, index * 3)).toFixed(1) + abbrev[index];

    if (Number.isInteger(absNum) && absNum < 1_000) return String(parseInt(formattedNumber));
    return formattedNumber;
};