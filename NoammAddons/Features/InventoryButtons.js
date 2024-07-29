/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { registerWhen, Render, Color } from "../utils" 
// TODO: 
// Add a custom gui were you can craete/delete/edit inventory buttons


class InventoryButton {
    constructor(x, y, size, item, func) {
        this.x = x
        this.y = y
        this.size = size
        this.item = item
        this.func = func
        
    }
    
    Darkmode = new Color(33 / 255, 33 / 255, 33 / 255, 100/100)
    clicked = false
    mx = Client.getMouseX()
    my = Client.getMouseY()
    Hovered = this.mx >= this.x && this.mx <= this.x + this.size && this.my >= this.y && this.my <= this.y + this.size
    

    MouseClick(btn) {
        this.clicked = btn == 0

        if (this.Hovered && this.clicked) this.func()
    }

    Update() {
        this.mx = Client.getMouseX()
        this.my = Client.getMouseY()
        this.Hovered = this.mx >= this.x && this.mx <= this.x + this.size && this.my >= this.y && this.my <= this.y + this.size
    }

    Draw() {
        if (this.Hovered) Render.RoundedRect(this.Darkmode.darker().darker(), this.x - (this.size/5)/2, this.y - (this.size/5)/2, this.size + this.size/5, this.size + this.size/5, 4)
        Render.RoundedRect(this.Darkmode, this.x, this.y, this.size,this.size, 4)
        this.item.draw(this.x, this.y, this.size/16)

        this.Update()
    }
}

const InventoryButtons = [
    new InventoryButton(300, 112+3, 16, new Item(399), () => ChatLib.say("/sbmenu")), // Sb Menu Button
    new InventoryButton(300-20, 112+3, 16, new Item(352), () => ChatLib.say("/pets")), // Pet Menu Button
    new InventoryButton(300-40, 112+3, 16, new Item(54), () => ChatLib.say("/storage")), // Backpack Button
    new InventoryButton(300-60, 112+3, 16, new Item(388), () => ChatLib.say("/trades")), // Pet Menu Button
    new InventoryButton(300-80, 112+3, 16, new Item(299), () => ChatLib.say("/wd")), // Wardrobe Button
    new InventoryButton(296, 85+3, 16, new Item(58), () => ChatLib.say("/craft")) // Crafting Table
]



registerWhen(register(`postGuiRender`, () => { 
    Tessellator.pushMatrix();

    InventoryButtons.forEach(button => button.Draw())

    Tessellator.popMatrix()
}), () => Client.currentGui.getClassName() == "GuiInventory" && Settings().InventoryButtons)



registerWhen(register(`guiMouseClick`, (_, __, btn) => { 

    InventoryButtons.forEach(button => button.MouseClick(btn))
}), () => Client.currentGui.getClassName() == "GuiInventory" && Settings().InventoryButtons)