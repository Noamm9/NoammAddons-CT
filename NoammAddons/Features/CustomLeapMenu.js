/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { clickSlot, colorClass, Render, Color, registerWhen, PreGuiRenderEvent, IsInDungeon } from "../utils"

const MCTessellator = Java.type("net.minecraft.client.renderer.Tessellator")
const PlayerComparator = Java.type("net.minecraft.client.gui.GuiPlayerTabOverlay").PlayerComparator
const c = PlayerComparator.class.getDeclaredConstructor()
c.setAccessible(true)
const sorter = c.newInstance()

const customOrder = ["Archer", "Berserk", "Healer", "Mage", "Tank", `EMPTY`]
const orderMap = {}
customOrder.forEach((item, index) => orderMap[item] = index)



let players = []


const cancelRenderTrigger = register(PreGuiRenderEvent, event => {
    if (players.length) cancel(event)
}).unregister()


const clickTrigger = register("guiMouseClick", (x, y, _0, _1, event) => ClickLogic(x, y, event)).unregister()
const renderTrigger = register('renderOverlay', RenderCustomGUI).unregister()
const ResetTrigger = register('worldUnload', () => players.length = 0).unregister()


function RenderCustomGUI() {
    UpdatePlayersArray()
  //  Tessellator.pushMatrix()

    const Scale = Settings().CustomLeapMenuScale/100 * 2
    const screenWidth = Renderer.screen.getWidth() / Scale
    const screenHeight = Renderer.screen.getHeight() / Scale
    const width = 288
    const height = 192
    const X = screenWidth / 2 - width / 2
    const Y = screenHeight / 2 - height / 2
    const BoxWidth = 128
    const BoxHeight = 80
    const BoxSpacing = 32
    const HeadsHeightWidth = 50
    const HeadScale = HeadsHeightWidth * Scale
    const offsets = [
        [X, Y], 
        [X + BoxWidth + BoxSpacing, Y], 
        [X, Y + BoxHeight + BoxSpacing], 
        [X + BoxWidth + BoxSpacing, Y + BoxHeight + BoxSpacing]
    ]
    const Lightmode = new Color(203 / 255, 202 / 255, 205 / 255, 1)
    const Darkmode = new Color(33 / 255, 33 / 255, 33 / 255, 1)
    let ColorMode = Darkmode
    if (Settings().CustomLeapMenuLightMode) ColorMode = Lightmode


    for (let i = 0; i < 4; ++i) {
        if (!players[i]) return
        Renderer.scale(Scale)

        Render.RoundedRect(ColorMode.darker(), offsets[i][0] - (BoxWidth / 15) / 2, offsets[i][1] - (BoxHeight / 15) / 2, BoxWidth + BoxWidth / 15, BoxHeight + BoxHeight / 15, 5)
        Render.RoundedRect(ColorMode, offsets[i][0], offsets[i][1], BoxWidth, BoxHeight, 5)

        Renderer.drawStringWithShadow(`§n${colorClass(players[i].class)}§n${players[i].name}§r`, offsets[i][0] + 4, offsets[i][1] + 4)
        Renderer.scale(Scale)
        Renderer.drawStringWithShadow(`${colorClass(players[i].class)}${players[i].class}`, offsets[i][0] + BoxWidth - Renderer.getStringWidth(players[i].class) - BoxWidth / 25, offsets[i][1] + BoxHeight - BoxHeight / 8)

        DrawHead(players[i].Head, (offsets[i][0] + BoxWidth / 2 - HeadsHeightWidth / 2) * Scale, ((offsets[i][1] + BoxHeight - HeadsHeightWidth * 1.2) - BoxHeight / 20) * Scale, HeadScale, HeadScale, 1, players[i].class)
      
    }

    Renderer.scale(1)
   // Tessellator.popMatrix()
}


function DrawHead(PlayerNetWorkThing, x, y, w, h, borderWidth, PlayerClass) {
    Tessellator.pushMatrix()
    Renderer.retainTransforms(true)
    Renderer.translate(x + w / 2, y + h / 2, 50)
    let Color = Renderer.BLACK
    
    if (PlayerClass[0] == `H`) Color = Renderer.color(255, 0, 209)
    if (PlayerClass[0] == `T`) Color = Renderer.color(0, 170, 0)
    if (PlayerClass[0] == `A`) Color = Renderer.color(193, 32, 32)
    if (PlayerClass[0] == `B`) Color = Renderer.color(205, 100, 0)
    if (PlayerClass[0] == `M`) Color = Renderer.color(0, 234, 255)



    if (borderWidth) Renderer.drawRect(
        Color,
        -w / 2 - borderWidth * w / 30,
        -h / 2 - borderWidth * w / 30, 
        w + borderWidth * 2 * w / 30, 
        h + borderWidth * 2 * w / 30
    )
      
    GlStateManager.func_179147_l()
    Client.getMinecraft().func_110434_K().func_110577_a(PlayerNetWorkThing)
    GlStateManager.func_179098_w()

    let tessellator = MCTessellator.func_178181_a()
    let worldRenderer = tessellator.func_178180_c()
    worldRenderer.func_181668_a(7, net.minecraft.client.renderer.vertex.DefaultVertexFormats.field_181707_g)

    worldRenderer.func_181662_b(-w / 2, h / 2, 0.0).func_181673_a(8 / 64, 16 / 64).func_181675_d()
    worldRenderer.func_181662_b(w / 2, h / 2, 0.0).func_181673_a(16 / 64, 16 / 64).func_181675_d()
    worldRenderer.func_181662_b(w / 2, -h / 2, 0.0).func_181673_a(16 / 64, 8 / 64).func_181675_d()
    worldRenderer.func_181662_b(-w / 2, -h / 2, 0.0).func_181673_a(8 / 64, 8 / 64).func_181675_d()

    tessellator.func_78381_a()

    worldRenderer.func_181668_a(7, net.minecraft.client.renderer.vertex.DefaultVertexFormats.field_181707_g)

    worldRenderer.func_181662_b(-w / 2, h / 2, 0.0).func_181673_a(40 / 64, 16 / 64).func_181675_d()
    worldRenderer.func_181662_b(w / 2, h / 2, 0.0).func_181673_a(48 / 64, 16 / 64).func_181675_d()
    worldRenderer.func_181662_b(w / 2, -h / 2, 0.0).func_181673_a(48 / 64, 8 / 64).func_181675_d()
    worldRenderer.func_181662_b(-w / 2, -h / 2, 0.0).func_181673_a(40 / 64, 8 / 64).func_181675_d()

    tessellator.func_78381_a()

    Renderer.retainTransforms(false)
    Tessellator.popMatrix()
}


function ClickLogic(x, y, event) {
    cancel(event)
    const centerX = Renderer.screen.getWidth() / 2
    const centerY = Renderer.screen.getHeight() / 2
    let index = -1

    if (x < centerX && y < centerY) index = 0
    else if (x > centerX && y < centerY) index = 1
    else if (x < centerX && y > centerY) index = 2
    else if (x > centerX && y > centerY) index = 3

    if (index === -1 || !players[index]) return

    clickSlot(players[index].slot, 0)
    Player.getPlayer().func_71053_j()
}


function UpdatePlayersArray() {
    const Tablines = Player.getPlayer().field_71174_a.func_175106_d().sort((a, b) => sorter.compare(a, b))

    

    for (let p of Tablines) {
        if (!p.func_178854_k()) continue

        let line = p.func_178854_k().func_150260_c()
        line = line.replace(/§[a-fnmz0-9r]/g, '')
        let match = line.match(/^\[(\d+)\] (?:\[\w+\] )*(\w+) (?:.)*?\((\w+)(?: (\w+))*\)$/) // https://regex101.com/r/cUzJoK/6
        if (!match || match.join().includes(Player.getName())) continue


        let [AllInOne, sbLevel, PlayerName, ClassType, ClassLevel] = match

        if (ClassType == `EMPTY`) return 
           
        if (!Client.isInGui()) return
        const Chest = Player.getContainer()
        if (!Chest) return
        const maxSlot = Chest.getSize() - 36
    
        Chest.getItems().forEach((item, slot) => {
            if (!item || slot >= maxSlot) return
            const itemName = item.getName().removeFormatting()

            if (itemName === PlayerName) {
                if (!players.some(player => player.name == itemName)) {
                    players.push({ name: PlayerName, class: ClassType, slot: slot, Head: p.func_178837_g() })
                    players.sort((a, b) => a.class.localeCompare(b.class))
                }
            }
        })   
    }
    if (players.length > 4) players.pop()
}


function IsSpiritLeapGuiAndSettingsEnabled() {
    const Chest = Player.getContainer()
    if (!Chest) return false
    return Chest.getName().toLowerCase().removeFormatting() === "spirit leap" && Settings().CustomLeapMenu && IsInDungeon()
}




registerWhen(ResetTrigger, () => Settings().CustomLeapMenu)
registerWhen(clickTrigger, IsSpiritLeapGuiAndSettingsEnabled)
registerWhen(renderTrigger, IsSpiritLeapGuiAndSettingsEnabled)
registerWhen(cancelRenderTrigger, IsSpiritLeapGuiAndSettingsEnabled)



/*                                                                                                  for testing purposes
function UpdatePlayersArray() {
    new Thread(()=> {
        try {
            if (!Client.isInGui()) return
            const Chest = Player.getContainer()
            if (!Chest) return
            const maxSlot = Chest.getSize() - 36
        
            Chest.getItems().forEach((item, slot) => {
                if (!item || slot >= maxSlot) return
                const itemName = item.getName().removeFormatting()
                const DungeonPlayerClasses = Dungeon.classes 
                //    {"WebbierAmoeba0":"Archer","Ocookie":"Mage","MythDragoon":"Healer","Shaharrr":"Berserk"}
        
                for (let PlayerName in DungeonPlayerClasses) {
                    let PlayerClass = DungeonPlayerClasses[PlayerName]
                    if (itemName === PlayerName) {
                        if (!players.some(player => player.name == itemName)) players.push({ name: PlayerName, class: PlayerClass, slot: slot })
                    }
                }
            })
        } catch (e) {ModMessage(e)}
    }).start()
}*/