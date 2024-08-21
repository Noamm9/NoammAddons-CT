/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { PreGuiRenderEvent, CloseCurrentGui, registerWhen, PlayerUtils } from "../utils"


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

const CancelKeys = register(`guiKey`, (char, keyCode, gui, event) => cancel(event)).unregister()
const CancelMouse = register(`guiMouseClick`, (x, y, button, gui, event) => cancel(event)).unregister()

register(`command`, () => ReaperArmorSwapAction.start()).setName("ras")


registerWhen(register("chat", () => setTimeout(() => ReaperArmorSwapAction.start(), 5500)).setChatCriteria("[BOSS] Wither King: You... again?"), () => Settings().AutoReaperArmorSwap)



const ReaperArmorSwapAction = new Thread(() => {
    CancelGUIRendering.register()
    CancelKeys.register()
    CancelMouse.register()
    text = `&c&l[&0&lSwapping To Reaper Armor...&c&l]`
    ChatLib.command("wd")
    
    while (!Client.isInGui()) {}
    Thread.sleep(200)


    let Container = Player.getContainer() 
    let ReaperArmorSlot = Settings().ReaperArmorSlot

    if (!Container) return

    for (let i = 36; i < Container.getSize() -36; i++) {
        let item = Container.getStackInSlot(i)

        if (item && item.getID() == 351 && item.getMetadata() == 10) {
            PreviousArmorSlot = i
        }  
    }
    

    Container.click(ReaperArmorSlot + 35, false, "LEFT")
    Thread.sleep(200)
    CloseCurrentGui()
    Thread.sleep(200)

    PlayerUtils.Sneak(true)
    Thread.sleep(100)
    PlayerUtils.Sneak(false)

    text = `&5&l[&c&lSwapping To Previous Armor...&5&l]`
    ChatLib.command("wd")

    while (!Client.isInGui()) {}
    Thread.sleep(200)
    Player.getContainer().click(PreviousArmorSlot, false, "LEFT")

    Thread.sleep(200)
    CloseCurrentGui()

    CancelGUIRendering.unregister()
    CancelKeys.unregister()
    CancelMouse.unregister()
})