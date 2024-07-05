/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Dungeon from "../../BloomCore/dungeons/Dungeon"
import Settings from "../Settings"
import { registerWhen } from "../utils"

let claySlots = new Map([
    [25, `pc ${Settings.MelodyAlert.removeFormatting()} 1/4`],
    [34, `pc ${Settings.MelodyAlert.removeFormatting()} 2/4`],
    [43, `pc ${Settings.MelodyAlert.removeFormatting()} 3/4`]
])


const StartMSG = register('guiOpened', () => { 
    setTimeout(() => {
        if (Player?.getContainer()?.getName() !== 'Click the button on time!') return 
        Client.scheduleTask(2, () => ChatLib.command(`pc ${Settings.MelodyAlert.removeFormatting()}`))
    }, 100)
})

const ProgressMSG = register('step', () => {

    let greenClays = Array.from(claySlots.keys()).filter(index => Player?.getContainer()?.getItems()[index]?.getMetadata() == 5)
    if (!greenClays.length) return
    
    
    ChatLib.command(claySlots.get(greenClays[greenClays.length - 1]))
    greenClays.forEach(clay => claySlots.delete(clay))
    greenClays.length = 0

}).setFps(5)

//const EndMSG = register(`guiClosed`, () => Client.scheduleTask(2, () => ChatLib.command(`pc ${Settings.MelodyAlert.removeFormatting()} 4/4`)))



registerWhen(StartMSG, () => Settings.MelodyAlert.removeFormatting() && Dungeon.floorNumber == 7)
registerWhen(ProgressMSG, () => Player?.getContainer()?.getName() == 'Click the button on time!' && Settings.MelodyAlert.removeFormatting() && Dungeon.floorNumber == 7)