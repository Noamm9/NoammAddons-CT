import { ModMessage } from "../utils"

register("drawBlockHighlight", (pos, event) => {
    const looks = Player?.lookingAt()?.toString()
    if (looks.includes('minecraft:air') || looks.includes('minecraft:fallingblock') || looks.includes('Entity')) return

    const block = Player?.lookingAt()

    block.type.mcBlock.func_149676_a(0, 0, 0, 1, 1, 1)

    ModMessage(1)




})