/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { ModMessage, PreGuiRenderEvent, Render, registerWhen, CloseCurrentGui } from "../utils"


const sneakKey = new KeyBind(Client.getMinecraft().field_71474_y.field_74311_E)
let text = `&c&l[&0&lSwapping To Reaper...&c&l]`
let PreviousArmorSlot


const CancelGUIRendering = register(PreGuiRenderEvent, event => {
    cancel(event)

    Renderer.drawStringWithShadow(
        text, 
        (Renderer.screen.getWidth()/2) - Renderer.getStringWidth(text)/2, 
        Renderer.screen.getHeight() - Renderer.screen.getHeight()/3
    )

}).unregister()

function checkWardrope(Container, slotIndex) {
    if (!Container) return

    for (let i = 36; i < Container.getSize() -36; i++) {
        let item = Container.getStackInSlot(i)

        if (item && item.getID() == 351 && item.getMetadata() == 10) PreviousArmorSlot = i 
        
    }
    

    new Thread(() => {
        Container.click(slotIndex + 35, false, "LEFT")
        Thread.sleep(200)
        CloseCurrentGui()
        Thread.sleep(200)
        sneakKey.setState(true)
        Thread.sleep(100)
        sneakKey.setState(false)
        text = `&5&l[&c&lSwapping To Previous Armor...&5&l]`
        ChatLib.command("wd")
        Thread.sleep(1500)

        Player.getContainer().click(PreviousArmorSlot, false, "LEFT")
        Thread.sleep(200)
        CloseCurrentGui()


        CancelGUIRendering.unregister()
    }).start()

    return 

}

registerWhen(register(`chat`, (e) => {
    text = `&c&l[&0&lSwapping To Reaper Armor...&c&l]`
    CancelGUIRendering.register()
    ChatLib.command("wd")

    new Thread(() => {
        Thread.sleep(1500)
        checkWardrope(Player.getContainer(), 3)
    }).start()

}).setChatCriteria("test"), () => Settings().AutoPotion)