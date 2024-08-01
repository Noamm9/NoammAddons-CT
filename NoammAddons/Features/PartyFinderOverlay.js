
import Settings from "../Settings"
import { LocationUtils, registerWhen } from "../utils"



const GuiContainer = Java.type("net.minecraft.client.gui.inventory.GuiContainer")
const partyMembersRegex = /^ \w{1,16}\: (\w+) \((\d+)\)$/
const levelRequiredRegex = /^Dungeon Level Required\: (\d+)$/
const partyData = new Map()
const classNames = [ "&4&lArcher", "&a&lTank", "&6&lBerserk", "&5&lHealer", "&b&lMage" ]
const guiContainerLeftField = GuiContainer.class.getDeclaredField("field_147003_i")
const guiContainerTopField = GuiContainer.class.getDeclaredField("field_147009_r")
guiContainerLeftField.setAccessible(true)
guiContainerTopField.setAccessible(true)


let shouldScan = false


const onOpenWindow = (name) => shouldScan = name === "Party Finder"


function scanItemStack(mcItemStacks) {
    if (!shouldScan) return
    partyData.clear()

    mcItemStacks.forEach((mcItem, idx) => {
        if (!mcItem && partyData.has(idx)) return partyData.delete(idx)
        if (!mcItem || idx >= 36) return

        const item = new Item(mcItem)
        if (item.getID() === 160 || item.getID() === 7) return
        if (partyData.has(idx)) partyData.delete(idx)

        const itemLore = item.getLore()

        let classes = []
        let levelRequired = 0

        itemLore.forEach(it => {
            if (levelRequiredRegex.test(it.removeFormatting())) {
                levelRequired = parseInt(it.removeFormatting().match(levelRequiredRegex)[1])

                return
            }

            if (!partyMembersRegex.test(it.removeFormatting())) return

            const [ _, className ] = it.removeFormatting().match(partyMembersRegex)

            classes.push(className)
        })

        // Too lazy and it's late so this happened
        const missingClasses = classNames.filter(name => classes.indexOf(name.removeFormatting()) === -1).map(it => it.slice(0, 5))
        const scale = missingClasses.length >= 3 ? 0.7 : 1
        const missingStr = missingClasses.splice(0, 2).join("")
        const p2 = missingClasses.splice(0, 2).join("")
        const missing = `${missingStr}\n${p2}`

        partyData.set(idx, {
            idx: idx,
            missing: missing,
            levelRequired: levelRequired,
            scale: scale
        })
    })

    shouldScan = false
}

const onGuiRender = () => {
    if (!partyData.size || !Settings().PartyFinderOverlay) return
    if (Player.getContainer().getName() !== "Party Finder") return partyData.clear()

    partyData.forEach(obj => {
        const [ x, y ] = getSlotRenderPosition(obj.idx)

        Renderer.translate(x, y, 300)
        Renderer.scale(obj.scale)
        Renderer.drawStringWithShadow(obj.missing, -1, 0)
        Renderer.translate(x, y, 300)
        Renderer.drawStringWithShadow(`&c${obj.levelRequired}`, 2, 10)
        Renderer.finishDraw()
    })
}



registerWhen(register("packetReceived", packet => onOpenWindow(packet.func_179840_c().func_150254_d().removeFormatting()))
.setFilteredClass(net.minecraft.network.play.server.S2DPacketOpenWindow).unregister(), 
() => World.isLoaded() && Settings().PartyFinderOverlay && [`Dungeon Hub`, `Hub`].find(location => LocationUtils.getCurrentWorld() == location))


registerWhen(register("packetReceived", packet => scanItemStack(packet.func_148910_d()))
.setFilteredClass(net.minecraft.network.play.server.S30PacketWindowItems).unregister(), 
() => World.isLoaded() && Settings().PartyFinderOverlay && [`Dungeon Hub`, `Hub`].find(location => LocationUtils.getCurrentWorld() == location))


registerWhen(register(`guiRender`, onGuiRender), 
() => World.isLoaded() && Settings().PartyFinderOverlay && partyData.size && [`Dungeon Hub`, `Hub`].find(location => LocationUtils.getCurrentWorld() == location))




function getSlotRenderPosition(slotNumber, mcGuiContainer) {
    if (!Client.isInGui()) return

    if (!mcGuiContainer) mcGuiContainer = Client.currentGui.get()

    const [ x, y ] = [
        guiContainerLeftField.get(mcGuiContainer),
        guiContainerTopField.get(mcGuiContainer)
    ]

    const slot = mcGuiContainer.field_147002_h.func_75139_a(slotNumber)

    return [x + slot.field_75223_e, y + slot.field_75221_f]
}