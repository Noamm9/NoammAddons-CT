/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { Render, registerWhen, Color } from "../utils"


const Darkmode = new Color(33 / 255, 33 / 255, 33 / 255, 100/100)
let customScoreboard = [];
let width = 0;
let text = new Text('');
let loading = true


register('worldLoad', () => {
    loading = true
    setTimeout(() => loading = false, 500)
})

register('step', () => {
    if (Settings.CustomScoreboard) Scoreboard.setShouldRender(false)
    else Scoreboard.setShouldRender(true)
}).setFps(1)

register('step', () => {
    if (!Settings.CustomScoreboard || loading) return

    // Reset values
    width = 0;
    customScoreboard.length = 0;

    // SKYBLOCK CO-OP, etc
    let title = Scoreboard.getTitle();

    // Add default scoreboard to list
    customScoreboard = Scoreboard.getLines().slice().reverse().map(String);

    // Adjusts scoreboard width
    width = Math.max(width, ...customScoreboard.map(line => Renderer.getStringWidth(line) + 10))

    // Center title
    while (Renderer.getStringWidth(title.removeFormatting()) < width - 15) title = ` ${title} `;
    customScoreboard.unshift(title);

    // Remove hypixel.net ip thing
    customScoreboard.splice(-2);
    
    text.setString(customScoreboard.join('\n'));
    
}).setFps(5)


registerWhen(register('renderOverlay', () => {

    Render.RoundedRect(
        Darkmode.darker(), 
        Renderer.screen.getWidth() - width*1.05, 
        (Renderer.screen.getHeight() / 2) - (text.getHeight() / 2)*1.05, 
        width*1.05, 
        text.getHeight()*1.05 +5, 
        5
    )

    Render.RoundedRect(
        Darkmode, 
        Renderer.screen.getWidth() - width*1.025, 
        (Renderer.screen.getHeight() / 2) - (text.getHeight() / 2), 
        width, 
        text.getHeight() + 5, 
        5
    )

    text.draw(Renderer.screen.getWidth() - width + 2, (Renderer.screen.getHeight() / 2) - (text.getHeight() / 2) + 2)
}), () => Settings.CustomScoreboard)
