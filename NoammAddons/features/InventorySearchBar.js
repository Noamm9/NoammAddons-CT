/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Config/Settings";
const GuiTextField = Java.type("net.minecraft.client.gui.GuiTextField");
let searchBar
register(`step`, () => searchBar = new GuiTextField(0, Client.getMinecraft().field_71466_p, (Renderer.screen.getWidth()/4) - 50, (Renderer.screen.getHeight() /2) - 20, 100, 10))
let searchTerm = "";


register("tick", () => {
    try {
        if (!Client.isInGui()) searchBar.func_146195_b(false) // setfocused
        else searchTerm = searchBar.func_146179_b()
    } catch (e) {}
})

register("guiMouseClick", (x, y, button) => {
    try {
        searchBar.func_146192_a(x, y, button) // detect when click text box
    } catch (e) {}
})

register("guiKey", (char, keyCode, gui, event) => {
    try {
        if (Keyboard.isKeyDown(Keyboard.KEY_LCONTROL) && (Keyboard.isKeyDown(Keyboard.KEY_F))) searchBar.func_146195_b(!searchBar.func_146206_l()) // CTRL + F = Toggle focus on searchbar
    
        if (searchBar.func_146206_l()) {
            searchBar.func_146201_a(char, keyCode) 
            if (keyCode != 1) cancel(event)
        }
    } catch (e) {}
})


register('guiRender', () => {
    if (!Settings.InventorySearchBar) return
    try {
        if(Player.getContainer().getClassName().includes("Chest")) {
            searchBar.func_146194_f()

            if(Player.getPlayer() === null || Player.getContainer() === null) return
            Player.getContainer().getItems().forEach((item, index) => {
                
                if (item == null) return
                
                let maxSlot = Player.getContainer().getSize() - 36;
                let ItemLore = item.getLore().join().removeFormatting().toLowerCase()
                
                if(index <= maxSlot && (ItemLore.includes(searchTerm.toLowerCase()) || 
                item.getName().toLowerCase().removeFormatting().includes(searchTerm.toLowerCase())) && searchTerm && !ItemLore.includes('minecraft:air')) {
                    
                    const renderX = (Renderer.screen.getWidth() / 2 + (((index % 9) - 4) * 18)) - 9
                    const renderY = (Renderer.screen.getHeight() + 10) / 2 + ((Math.floor(index / 9) - Player.getContainer().getSize() / 18) * 18) - 9
                    
                    Renderer.translate(0, 0, 100)
                    Renderer.drawRect(Renderer.color(0, 255, 127, 200), renderX, renderY, 17, 17)
                    
                }
            })
        }
    } catch (e) {}
})