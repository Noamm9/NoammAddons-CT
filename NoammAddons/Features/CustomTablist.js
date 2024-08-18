/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Settings";
import { Render, Color, splitArray } from "../utils";


const DarkMode = new Color(33 / 255, 33 / 255, 33 / 255, 0.6)
const FooterText = new Text(``).setAlign(`CENTER`).setShadow(true)
const NamesText = new Text(``).setShadow(true)


register("renderPlayerList", (event) => {
    if (!Settings().CustomTablist) return

    cancel(event);
    let Names = TabList.getNames();
    const footerlines = TabList.getFooter().split(`\n`)
    footerlines.pop()
    
    let maxNameWidth = 0;
    Names.forEach(line => maxNameWidth = Math.max(maxNameWidth, Renderer.getStringWidth(line.removeFormatting())))

    let maxFooterWidth = 0;
    footerlines.forEach(line => maxFooterWidth = Math.max(maxFooterWidth, Renderer.getStringWidth(line.removeFormatting())))


    const screenWidth = Renderer.screen.getWidth();
    const screenHeight = Renderer.screen.getHeight();
    const fontHeight = Renderer.getFontRenderer().field_78288_b

    const width = (maxNameWidth+10)*4
    const height = fontHeight*25

    const xOffset = (screenWidth - width) /2
    const yOffset = screenHeight/20

    Render.RoundedRect(DarkMode.darker(), xOffset-width/50, yOffset-width/50, width+width/25, height+width/25, 5);
    Render.RoundedRect(DarkMode, xOffset, yOffset, width, height, 5);

    splitArray(Names, 20).forEach((row, index) => {
        if (index >=  4) return
        NamesText
        .setString(row.join(`\n`))
        .draw(xOffset+((maxNameWidth+10)*index) +20, yOffset+10)
    })


    const footerXOffset = xOffset +width/2 - maxFooterWidth/2
    const footerYOffset = yOffset+height +yOffset+width/100 
    const FooterHeight = fontHeight*footerlines.length+5 +10
    const FooterWidth = maxFooterWidth + 10


    Render.RoundedRect(DarkMode.darker(), footerXOffset - maxFooterWidth/50, footerYOffset - maxFooterWidth/50,FooterWidth + FooterWidth/25, FooterHeight + FooterWidth/25, 5)
    Render.RoundedRect(DarkMode, footerXOffset, footerYOffset,FooterWidth, FooterHeight, 5)
    
    FooterText
    .setString(footerlines.join(`\n`))
    .draw(footerXOffset+maxFooterWidth/2 + 5, footerYOffset-3)
})
