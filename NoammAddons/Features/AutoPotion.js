/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { ModMessage, PreGuiRenderEvent, registerWhen, CloseCurrentGui, getPatcherScale } from "../utils"


const CancelGUIRendering = register(PreGuiRenderEvent, event => {
    cancel(event)

    let slotName = Settings().PotionSlot.replace("ec", "Ender Chest").replace("bp", "Backpack").replace(`pb`, `PotionBag`)

    Renderer.drawStringWithShadow(
        `&5&l[&d&lTaking Potion From ${slotName}...&5&l]`, 
        (Renderer.screen.getWidth()/2) - Renderer.getStringWidth(`&5&l[&d&lTaking Potion From PotionBag...&5&l]`)/2, 
        Renderer.screen.getHeight() - Renderer.screen.getHeight()/3
    )

}).unregister()

const NotFoundGUI = register("renderOverlay", () => {

    Renderer.scale(getPatcherScale())
    Renderer.drawStringWithShadow(
        `&5&l[&c&lNO POTIONS FOUND&5&l]`, 
        (Renderer.screen.getWidth()/2) - Renderer.getStringWidth(`&5&l[&c&lNO POTIONS FOUND&5&l]`)/2, 
        Renderer.screen.getHeight() - Renderer.screen.getHeight()/3
    )

}).unregister()


const CancelKeyRegister = register(`guiKey`, (char, keycode, gui, event) => cancel(event)).unregister()


registerWhen(register(`chat`, (event) => {
    const inventory = Player?.getInventory()
    const potionInInv = inventory?.indexOf(373)

    if (potionInInv !== -1) return
    
    GetPotion.start()
    
}).setChatCriteria(/(?:\[[^\]]+\] )?(\w{3,16}) entered( MM)? The Catacombs, Floor ([IVX]+)!/), () => Settings().AutoPotion)



const GetPotion = new Thread(() => {

    CancelGUIRendering.register()
    CancelKeyRegister.register()
    ChatLib.command(Settings().PotionSlot)

    while (!Client.isInGui()) {}
    Thread.sleep(300)

    let Container = Player.getContainer()

    const slotCount = Container.getSize() - 36

    for (let i = 0; i < slotCount; i++) {
        let item = Container.getStackInSlot(i)

        if (item && item.getID() === 373) {
            Container.click(i, true, "LEFT")

            Thread.sleep(200)
            CloseCurrentGui()
            CancelGUIRendering.unregister()
            CancelKeyRegister.unregister()
            return
        }
    }

    ModMessage("&cNo potion found in the Potion Bag")


    CloseCurrentGui()
    CancelKeyRegister.unregister()
    CancelGUIRendering.unregister()
    NotFoundGUI.register()
    Thread.sleep(2500)
    NotFoundGUI.unregister()

})