/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { ModMessage, PreGuiRenderEvent, registerWhen, CloseCurrentGui } from "../utils"


const CancelGUIRendering = register(PreGuiRenderEvent, event => {
    cancel(event)

    Renderer.drawStringWithShadow(
        `&5&l[&d&lTaking Potion From PotionBag...&5&l]`, 
        (Renderer.screen.getWidth()/2) - Renderer.getStringWidth(`&5&l[&d&lTaking Potion From PotionBag...&5&l]`)/2, 
        Renderer.screen.getHeight() - Renderer.screen.getHeight()/3
    )

}).unregister()

const NotFoundGUI = register("renderOverlay", () => {

    Renderer.drawStringWithShadow(
        `&5&l[&c&lNO POTIONS FOUND&5&l]`, 
        (Renderer.screen.getWidth()/2) - Renderer.getStringWidth(`&5&l[&c&lNO POTIONS FOUND&5&l]`)/2, 
        Renderer.screen.getHeight() - Renderer.screen.getHeight()/3
    )

}).unregister()


const CancelKeyRegister = register(`guiKey`, (char, keycode, gui, event) => cancel(event)).unregister()


function checkPotionBag(Container) {
    if (!Container) return
    
    const slotCount = Container.getSize() - 36

    for (let i = 0; i < slotCount; i++) {
        let item = Container.getStackInSlot(i)

        if (item && item.getID() === 373) {
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

    ModMessage("&cNo potion found in the Potion Bag")

    new Thread(() => {
        NotFoundGUI.register()
        Thread.sleep(2500)
        NotFoundGUI.unregister()
    }).start()

    CloseCurrentGui()
    CancelKeyRegister.unregister()
    CancelGUIRendering.unregister()
}


registerWhen(register(`chat`, (event) => {
    try {
        let massage = ChatLib.getChatMessage(event).replace(/-/g, "")
        massage = massage.replace(new RegExp(`${massage.charAt(0)}`, "g"), "")
    
        if (!(/(\[(MVP|MVP\+|MVP\+\+|VIP|VIP\+|ADMIN|PIG|GM|YOUTUBE)\]\s)?(\w{3,16})\sentered\s((MM|The)\s)?Catacombs,\s(Floor\s[IVX]+)!/.test(massage))) return
        // https://regex101.com/r/qcUGpw/1

        const inventory = Player.getInventory()
        const potionInInv = inventory.indexOf(373)
    
        if (potionInInv !== -1) return
        
        CancelGUIRendering.register()
        CancelKeyRegister.register()
        ChatLib.command("bp 2");
    
        new Thread(() => {
            Thread.sleep(1000)
            checkPotionBag(Player.getContainer())
        }).start()
    
    } catch (e) {}
}), () => Settings.AutoPotion)