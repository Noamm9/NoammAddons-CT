/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { IsInDungeon, registerWhen } from "../utils"

let claySlots = new Map([
    [25, `pc ${Settings.MelodyAlert.removeFormatting()} 1/4`],
    [34, `pc ${Settings.MelodyAlert.removeFormatting()} 2/4`],
    [43, `pc ${Settings.MelodyAlert.removeFormatting()} 3/4`]
])


const GuiTrigger = register('guiOpened', () => {

    Client.scheduleTask(2, () => {
        claySlots = new Map([
            [25, `pc ${Settings.MelodyAlert.removeFormatting()} 1/4`],
            [34, `pc ${Settings.MelodyAlert.removeFormatting()} 2/4`],
            [43, `pc ${Settings.MelodyAlert.removeFormatting()} 3/4`]
        ])
        if (!Settings.MelodyAlert.removeFormatting()) return
        ChatLib.command(`pc ${Settings.MelodyAlert.removeFormatting()}`)
    })

})


const ProgressTrigger = register('step', () => {

    let greenClays = Array.from(claySlots.keys()).filter(index => Player?.getContainer()?.getItems()[index]?.getMetadata() == 5)
    if (!greenClays.length) return
    
    ChatLib.command(claySlots.get(greenClays[greenClays.length - 1]))
    greenClays.forEach(clay => claySlots.delete(clay))
    greenClays = []

}).setFps(5)



registerWhen(GuiTrigger, () => Player?.getContainer()?.getName() != 'Click the button on time!' && Settings.MelodyAlert.removeFormatting() && IsInDungeon())
registerWhen(ProgressTrigger, () => Player?.getContainer()?.getName() != 'Click the button on time!' && Settings.MelodyAlert.removeFormatting() && IsInDungeon())