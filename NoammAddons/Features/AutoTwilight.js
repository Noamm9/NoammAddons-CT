/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { ModMessage, PreGuiRenderEvent, registerWhen, getClass, CloseCurrentGui } from "../utils"


const CancelGUIRendering = register(PreGuiRenderEvent, event => {
    cancel(event)
    let slotName = Settings.TwilightSlot.replace("ec", "Ender Chest").replace("bp", "Backpack")

    Renderer.drawStringWithShadow(
        `&5&l[&d&lTaking Twilights From ${slotName}...&5&l]`, 
        (Renderer.screen.getWidth()/2) - Renderer.getStringWidth(`&5&l[&d&lTaking Twilights From ${slotName}...&5&l]`)/2, 
        Renderer.screen.getHeight() - Renderer.screen.getHeight()/3
    )

}).unregister()

const NotFoundGUI = register("renderOverlay", () => {

    Renderer.drawStringWithShadow(
        `&5&l[&c&lNO TWILIGHTS FOUND&5&l]`, 
        (Renderer.screen.getWidth()/2) - Renderer.getStringWidth(`&5&l[&c&lNO TWILIGHTS FOUND&5&l]`)/2, 
        Renderer.screen.getHeight() - Renderer.screen.getHeight()/3
    )

}).unregister()


const CancelKeyRegister = register(`guiKey`, (char, keycode, gui, event) => cancel(event)).unregister()


function checkContainer(Container) {
    if (!Container) return
    
    const slotCount = Container.getSize()// - 36

    for (let i = 0; i < slotCount; i++) {
        let item = Container.getStackInSlot(i)

        if (item && item.getID() === 351 && item.getMetadata() == 5) {
            Container.click(i, true, "LEFT")

            new Thread(() => {
                Thread.sleep(200)
                CloseCurrentGui()
                CancelGUIRendering.unregister()
                CancelKeyRegister.unregister()
            }).start()
            return
        }
    }

    ModMessage("&cNo twilights found.")
    new Thread(() => {
        NotFoundGUI.register()
        Thread.sleep(2500)
        NotFoundGUI.unregister()
    })
    CloseCurrentGui()
    CancelGUIRendering.unregister()
    CancelKeyRegister.unregister()
}


registerWhen(register("chat", () => {
    const inventory = Player.getInventory()
    const twilightInInv = inventory.indexOf(351)
    let PlayerClass = getClass(Player.getName()).toLowerCase().removeFormatting()
    
    ModMessage(twilightInInv + PlayerClass)
    if (twilightInInv !== -1 || !(PlayerClass == `tank`) || !PlayerClass == `healer`) return


    new Thread(() => {
        Thread.sleep(2500)
        CancelGUIRendering.register()
        CancelKeyRegister.register()
        ChatLib.command(Settings.TwilightSlot);
        Thread.sleep(1000)
        checkContainer(Player.getContainer())
    }).start()

}).setCriteria("[BOSS] Wither King: You... again?"), () => Settings.AutoTwilight)


