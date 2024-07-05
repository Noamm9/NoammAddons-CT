/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import { Render, Color } from "../utils";

register("renderPlayerList", (event) => {
    cancel(event);
    let lines = TabList.getNames();
    let maxWidth = 0;
    
    // Calculate the maximum width of the lines
    lines.forEach(line => {
        maxWidth = Math.max(maxWidth, Renderer.getStringWidth(line.removeFormatting()));
    });

    const screenWidth = Renderer.screen.getWidth();
    const screenHeight = Renderer.screen.getHeight();
    const columnCount = 3; // Number of columns
    const rowHeight = 16; // Height of each row
    const padding = 10;
    const rowsPerColumn = Math.ceil(lines.length / columnCount);
    const boxWidth = maxWidth + padding * 2;
    const boxHeight = rowHeight * rowsPerColumn + padding * 2;
    const totalWidth = columnCount * (boxWidth + padding) - padding;
    const xOffset = (screenWidth - totalWidth) / 2;
    const yOffset = 10;

    // Draw the background box
    Render.RoundedRect(new Color(33 / 255, 33 / 255, 33 / 255, 1), xOffset, yOffset, totalWidth, boxHeight, 5);

    // Draw each line of text
    lines.forEach((line, i) => {
        const col = Math.floor(i / rowsPerColumn);
        const row = i % rowsPerColumn;
        const x = xOffset + col * (boxWidth + padding) + padding;
        const y = yOffset + row * rowHeight + padding;
        Renderer.drawStringWithShadow(line, x, y);
    });
});
