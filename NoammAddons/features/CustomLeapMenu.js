/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Settings";
import Dungeon from "../../BloomCore/dungeons/Dungeon";
import { clickSlot, colorClass, Render, Color, registerWhen} from "../utils";

let players = [];
let heads = new Set([]);


function SettingsON() {
    return Settings.CustomLeapMenu
}


const clickTrigger = register("guiMouseClick", (x, y, _0, _1, event) => ClickLogic(x, y, event)).unregister();
const renderTrigger = register('renderOverlay', () => RenderCustomGUI()).unregister();
const ArrayTrigger = register('renderOverlay', () => UpdatePlayersArray()).unregister();
const cancelRenderTrigger = register(net.minecraftforge.client.event.GuiScreenEvent.DrawScreenEvent.Pre, (event) => cancel(event)).unregister();
const ResetTrigger = register('worldUnload', () => {
    players.length = 0;
    heads.clear();
}).unregister()


function RenderCustomGUI() {
    Tessellator.pushMatrix();
    const Scale = Settings.CustomLeapMenuScale * 2
    const screenWidth = Renderer.screen.getWidth() / Scale;
    const screenHeight = Renderer.screen.getHeight() / Scale;
    const width = 288;
    const height = 192;
    const X = screenWidth / 2 - width / 2;
    const Y = screenHeight / 2 - height / 2;
    const BoxWidth = 128;
    const BoxHeight = 80;
    const BoxSpacing = 32;
    const HeadsHeightWidth = 50;
    const headsArray = Array.from(heads)
    const HeadScale = HeadsHeightWidth * Scale
    const offsets = [
        [X, Y], 
        [X + BoxWidth + BoxSpacing, Y], 
        [X, Y + BoxHeight + BoxSpacing], 
        [X + BoxWidth + BoxSpacing, Y + BoxHeight + BoxSpacing]
    ]
    const Lightmode = new Color(203 / 255, 202 / 255, 205 / 255, 1);
    const Darkmode = new Color(33 / 255, 33 / 255, 33 / 255, 1);
    let ColorMode = Darkmode
    if (Settings.CustomLeapMenuLightMode) ColorMode = Lightmode


    for (let i = 0; i < 4; ++i) {
        if (!players[i]) return;
        Renderer.scale(Scale);

        Render.RoundedRect(ColorMode.darker(), offsets[i][0] - (BoxWidth / 15) / 2, offsets[i][1] - (BoxHeight / 15) / 2, BoxWidth + BoxWidth / 15, BoxHeight + BoxHeight / 15, 5);
        Render.RoundedRect(ColorMode, offsets[i][0], offsets[i][1], BoxWidth, BoxHeight, 5);

        Renderer.drawStringWithShadow(`§n${colorClass(players[i].class)}§n${players[i].name}§r`, offsets[i][0] + 4, offsets[i][1] + 4);
        Renderer.scale(Scale);
        Renderer.drawStringWithShadow(`${colorClass(players[i].class)}${players[i].class}`, offsets[i][0] + BoxWidth - Renderer.getStringWidth(players[i].class) - BoxWidth / 25, offsets[i][1] + BoxHeight - BoxHeight / 8);


        if (headsArray.length !== players.length) return

        headsArray.forEach((head, index) => head.draw((offsets[index][0] + BoxWidth / 2 - HeadsHeightWidth / 2) * Scale, ((offsets[index][1] + BoxHeight - HeadsHeightWidth * 1.2) - BoxHeight / 20) * Scale, HeadScale, HeadScale))
      
    }

    Renderer.scale(1);
    Tessellator.popMatrix();
}

function UpdatePlayersArray() {
    new Thread(()=> {
        if (!Client.isInGui()) return
        const Chest = Player.getContainer();
        if (!Chest) return;
        const maxSlot = Chest.getSize() - 36;
    
        Chest.getItems().forEach((item, slot) => {
            if (!item || slot >= maxSlot) return;
            const itemName = item.getName().removeFormatting();
            const DungeonPlayerClasses =
            Dungeon.classes 
            // {"WebbierAmoeba0":"Archer","Ocookie":"Mage","MythDragoon":"Healer","Shaharrr":"Berserk"};
    
            for (let PlayerName in DungeonPlayerClasses) {
                let PlayerClass = DungeonPlayerClasses[PlayerName];
                if (itemName === PlayerName) {
                    if (!players.some(player => player.name == itemName)) {
                        players.push({ name: PlayerName, class: PlayerClass, slot: slot });
    
                        let PlayerHead = new Image(`${PlayerName}_Head.png`, `https://www.mc-heads.net/avatar/${PlayerName}/8`)
                        heads.add(PlayerHead)
                    }
                }
            }
        })
    }).start()
}

function ClickLogic(x, y, event) {
    cancel(event);
    const centerX = Renderer.screen.getWidth() / 2;
    const centerY = Renderer.screen.getHeight() / 2;
    let index = -1;

    if (x < centerX && y < centerY) index = 0;
    else if (x > centerX && y < centerY) index = 1;
    else if (x < centerX && y > centerY) index = 2;
    else if (x > centerX && y > centerY) index = 3;

    if (index === -1 || !players[index]) return;

    World.playSound('mob.cat.meow', 1, 1);
    clickSlot(players[index].slot, 0);
    Player.getPlayer().func_71053_j();
}

function IsSpiritLeapGuiAndSettingsEnabled() {
    const Chest = Player.getContainer();
    if (!Chest) return false;
    return Chest.getName().toLowerCase().removeFormatting() === "spirit leap" && Settings.CustomLeapMenu;
}


registerWhen(ResetTrigger, SettingsON)
registerWhen(ArrayTrigger, SettingsON)
registerWhen(clickTrigger, IsSpiritLeapGuiAndSettingsEnabled)
registerWhen(renderTrigger, IsSpiritLeapGuiAndSettingsEnabled)
registerWhen(cancelRenderTrigger, IsSpiritLeapGuiAndSettingsEnabled)




/*
const MCTessellator = Java.type("net.minecraft.client.renderer.Tessellator")
function drawAt(x, y, w, h, showIcons = false, rotation = 0, borderWidth = 2) {
    Tessellator.pushMatrix()
    Renderer.retainTransforms(true)

    if (showIcons) {
        h *= 1.4
    }

    Renderer.translate(x + w / 2, y + h / 2, 50)

    Renderer.rotate(rotation)


        GlStateManager.func_179147_l()
        Client.getMinecraft().func_110434_K().func_110577_a(this.networkPlayerInfo.func_178837_g())
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

        worldRenderer.func_181662_b(-w / 2, h / 2, 0.0)[m.tex](40 / 64, 16 / 64).func_181675_d()
        worldRenderer.func_181662_b(w / 2, h / 2, 0.0)[m.tex](48 / 64, 16 / 64).func_181675_d()
        worldRenderer.func_181662_b(w / 2, -h / 2, 0.0)[m.tex](48 / 64, 8 / 64).func_181675_d()
        worldRenderer.func_181662_b(-w / 2, -h / 2, 0.0)[m.tex](40 / 64, 8 / 64).func_181675_d()
        tessellator.func_78381_a()
    
    Renderer.retainTransforms(false)
    Tessellator.popMatrix()
}*/
