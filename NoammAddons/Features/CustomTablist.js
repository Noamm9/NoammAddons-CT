/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Settings";
import { Render, Color, splitArray, calculateScaleFactor} from "../utils";

const DarkMode = new Color(33 / 255, 33 / 255, 33 / 255, 0.6);
const FooterText = new Text(``).setAlign(`CENTER`).setShadow(true);
const NamesText = new Text(``).setShadow(true);

register("renderPlayerList", (event) => {
    if (!Settings().CustomTablist) return;
    try {
        cancel(event);
    
        let Names = TabList.getNames();
        const footerLines = TabList.getFooter().split(`\n`);
        footerLines.pop();
        
        let maxNameWidth = 0;
        Names.forEach(line => maxNameWidth = Math.max(maxNameWidth, Renderer.getStringWidth(line.removeFormatting())));
        
        let maxFooterWidth = 0;
        footerLines.forEach(line => maxFooterWidth = Math.max(maxFooterWidth, Renderer.getStringWidth(line.removeFormatting())));
        
        const screenWidth = Renderer.screen.getWidth();
        const screenHeight = Renderer.screen.getHeight();
        const fontHeight = Renderer.getFontRenderer().field_78288_b;
        const scaleFactor = calculateScaleFactor(screenWidth, screenHeight)
    
        const width = (maxNameWidth + 20) * splitArray(Names, 20).length * scaleFactor
        const height = fontHeight * 25* scaleFactor
        
        const xOffset = (screenWidth - width) / 2 *scaleFactor
        const yOffset = screenHeight / 20 * scaleFactor
        
    
        Render.RoundedRect(DarkMode.darker(), xOffset - width / 50, yOffset - width / 50, width + width / 25, height + width / 25, 5);
        Render.RoundedRect(DarkMode, xOffset, yOffset, width, height, 5);
    
        NamesText.setScale(scaleFactor)
        splitArray(Names, 20).forEach((row, index) => {
            if (index >= 4) return;
            NamesText
                .setString(row.join(`\n`))
                .draw((xOffset + ((maxNameWidth + 20) * index) + 10)*scaleFactor, (yOffset + 10)*scaleFactor);
        });
    
        if (footerLines.length > 0) {
            const footerXOffset = xOffset + width / 2 - maxFooterWidth / 2;
            const footerYOffset = yOffset + height + yOffset + width / 100;
            const footerHeight = fontHeight * footerLines.length + 10;
            const footerWidth = maxFooterWidth + 20;
            
            
            
            Render.RoundedRect(DarkMode.darker(), footerXOffset - maxFooterWidth / 50, footerYOffset - maxFooterWidth / 50, footerWidth + footerWidth / 25, footerHeight + footerWidth / 25, 5);
            Render.RoundedRect(DarkMode, footerXOffset, footerYOffset, footerWidth, footerHeight, 5);
            
            FooterText
                .setString(footerLines.join(`\n`))
                .setScale(scaleFactor)
                .draw(footerXOffset+10 + maxFooterWidth / 2, footerYOffset + 3);
        }
    } catch (e) {}
})

