/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { registerWhen } from "../utils"


let progress = 0
const IsWearingSpringBoots = () => Player?.armor?.getBoots()?.getLore()?.join(``)?.removeFormatting()?.toLowerCase()?.includes(`ability: to the moon!`)
const PresentText = new Text(` `).setShadow(true).setFormatted(true)


const PitchArray = [
    0.6984127163887024,
    0.8253968358039856,
    0.8888888955116272,
    0.9365079402923584,
    1.047619104385376,
    1.1746032238006592,
    1.317460298538208,
]



registerWhen(register(`soundPlay`, (vec, name, vol, pitch, SoundCategory, event) => {
    if (name === "note.pling") {
        if (PitchArray.some(SoundPitch => SoundPitch == pitch) && progress < 42) { // 42 - fill to 100%
            progress += 1
        }
    }
}), () => Player.isSneaking() && IsWearingSpringBoots() && Settings().SpringBootsDisplay)



registerWhen(register(`renderOverlay`, () => {
    let text = ((progress/42)*100).toFixed(0)

    PresentText
    .setAlign(`center`)
    .setScale(4)
    .setX(Renderer.screen.getWidth()/2)
    .setY(Renderer.screen.getHeight()/4)
    .setString(text <25 ? `&a${text}%`: text >=25 && text < 50 ? `&e${text}%`: text>=50 && text<=75 ? `&6${text}%`: text>75 ? `&c${text}%`: text)
    .draw()

    if (!Player.isSneaking() || !Player.asPlayerMP().isOnGround()) progress = 0
}), () => IsWearingSpringBoots() && progress > 0 && Settings().SpringBootsDisplay)