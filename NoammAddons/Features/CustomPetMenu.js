/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings";
import * as PacketWindowOpen from "../Utilities/Events/PacketWindowOpen";
import { PreGuiRenderEvent, Render, CloseCurrentGui, Color, splitArray, calculateScaleFactor } from "../utils";


const PetSlots = [10, 11, 12, 13, 14, 15, 16, 19, 20, 21, 22, 23, 24, 25, 28, 29, 30, 31, 32, 33, 34, 37, 38, 39, 40, 41, 42, 43];
const [PreviousPageSlot, AutoPetRulesSlot, NextPageSlot] = [45, 46, 53];
const LightMode = new Color(203 / 255, 202 / 255, 205 / 255, 1);
const DarkMode = new Color(33 / 255, 33 / 255, 33 / 255, 1);
const itemSize = 48;
let PetMenu, ScreenWidth, ScreenHeight, x, y, width, height, mouseX, mouseY, HideMenu, ColorMode = DarkMode, scaleFactor = 1;

const cancelGuiRender = register(PreGuiRenderEvent, (event) => event.setCanceled(true)).unregister();
const cancelChatRender = register("renderChat", (event) => event.setCanceled(true)).unregister();

PacketWindowOpen.AddListener((windowTitle) => {
    if (windowTitle.startsWith("Pets") && Settings().CustomPetMenu) {
        cancelGuiRender.register()
        cancelChatRender.register()
        MouseClick.register()
        RenderNewGui.register()
        S2EPacketCloseWindow.register()
        C0DPacketCloseWindow.register()

        if (Settings().CustomPetMenuLightMode) ColorMode = LightMode
    }
})


const S2EPacketCloseWindow = register("packetReceived", Reset).setFilteredClass(net.minecraft.network.play.server.S2EPacketCloseWindow).unregister();
const C0DPacketCloseWindow = register("packetSent", Reset).setFilteredClass(net.minecraft.network.play.client.C0DPacketCloseWindow).unregister();

function Reset() {
    cancelGuiRender.unregister()
    cancelChatRender.unregister()
    MouseClick.unregister()
    RenderNewGui.unregister()
    S2EPacketCloseWindow.unregister()
    C0DPacketCloseWindow.unregister()
    if (HideMenu) HideMenu = false
}


const RenderNewGui = TriggerRegister.registerRenderOverlay(() => {
    if (HideMenu) {
        Reset()
        return
    }

    PetMenu = Player.getContainer();
    [ScreenWidth, ScreenHeight] = [Renderer.screen.getWidth(), Renderer.screen.getHeight()];
    [x, y, width, height] = [ScreenWidth / 5, ScreenHeight / 7, ScreenWidth * 0.6, ScreenHeight * 0.57];
    [mouseX, mouseY] = [Client.getMouseX(), Client.getMouseY()]
    scaleFactor = calculateScaleFactor(ScreenWidth, ScreenHeight)

    renderBackground();
    renderPetItems();
    renderButtons();
}).unregister();


const MouseClick = register("guiMouseClick", (_, __, btn, ___, event) => {
    if (!PetMenu) return;
    event.setCanceled(true);

    handlePetItemClick(btn);
    handleButtonClick();
}).unregister();


function renderBackground() {
    Render.RoundedRect(ColorMode.darker(), x - width / 100, y - width / 100, width + width / 50, height + width / 50, 5);
    Render.RoundedRect(ColorMode, x, y, width, height, 5);
}


function renderPetItems() {
    splitArray(PetMenu.getItems().filter((item, index) => PetSlots.includes(index)), 7).forEach((array, index) => {
        array.forEach((item, i) => {
            if (!item) return;

            const itemX = getX(i);
            const itemY = getY(index);
            item.draw(itemX, itemY, (itemSize*scaleFactor)/16);

            if (item.getLore().join().removeFormatting().includes("Click to despawn!")) {
                Renderer.drawRect(Renderer.color(0, 114, 255, 255), itemX - 5, itemY - 7, itemSize + 10, itemSize + 10);
            }

            const petName = item.getName().replace(/§7\[Lvl .+\] /, "");
            Renderer.drawStringWithShadow(petName, itemX + (itemSize - Renderer.getStringWidth(petName)) / 2, itemY + ScreenHeight / 27 - itemSize / 2);
        });
    });
}


function renderButtons() {
    drawButton(PreviousPageSlot, "&bPrevious Page", 0);
    drawButton(AutoPetRulesSlot, "&cAutoPet", 1);
    drawButton(NextPageSlot, "&bNext Page", 7);
    drawButton(-1, "&6Show Real Menu", 3.4);
}


function handlePetItemClick(btn) {
    splitArray(PetMenu.getItems().filter((item, index) => PetSlots.includes(index)), 7).forEach((array, index) => {
        array.forEach((item, i) => {
            if (!item) return;

            const itemX = getX(i);
            const itemY = getY(index);

            if (Render.isElementHovered(mouseX, mouseY, itemX, itemY, itemSize, itemSize) && btn === 0) {
                PetMenu.click(PetSlots[i + index * 7], false, "LEFT");
                CloseCurrentGui();
            }
        });
    });
}


function handleButtonClick() {
    handleSlotClick(PreviousPageSlot, "&bPrevious Page", 0);
    handleSlotClick(NextPageSlot, "&bNext Page", 7);
    handleSlotClick(AutoPetRulesSlot, "&cAutoPet", 1, () => HideMenu = true);
    handleSlotClick(-1, "&6Show Real Menu", 3.4, () => HideMenu = true);
}


function drawButton(slotIndex, label, xOffset) {
    const slotX = getX(xOffset);
    const slotY = getY(4.5);
    const textWidth = Renderer.getStringWidth(label);
    const rectWidth = textWidth + 20;
    const rectHeight = 30;

    if (slotIndex === -1 || shouldDrawSlot(slotIndex)) {
        Render.RoundedRect(ColorMode.darker(), slotX - rectWidth / 2, slotY - rectHeight / 2, rectWidth, rectHeight, 5);
        Render.RoundedRect(ColorMode, slotX - rectWidth / 2 + 5, slotY - rectHeight / 2 + 5, rectWidth - 10, rectHeight - 10, 5);
        Renderer.drawStringWithShadow(`${label}`, slotX - textWidth / 2, slotY - 8 / 2);
    }
}


function shouldDrawSlot(slotIndex) {
    if (PetMenu.getSize()-36 !== (63-36)*2) return false

    const slot = PetMenu.getStackInSlot(slotIndex);
    return slot && (slot.getID() === 262 || slot.getID() === 397);
}


function handleSlotClick(slotIndex, label, xOffset, fn = () => {}) {
    const slotX = getX(xOffset);
    const slotY = getY(4.5);
    const rectWidth = Renderer.getStringWidth(label) + 20;
    const rectHeight = 30;

    if (Render.isElementHovered(mouseX, mouseY, slotX - rectWidth / 2, slotY - rectHeight / 2 + 5, rectWidth, rectHeight)) {
        if (slotIndex === -1 || shouldDrawSlot(slotIndex)) {
            PetMenu.click(slotIndex, false, "LEFT");
            fn();
        }
    }
}


function getX(num) {
    return x + ((width - ScreenWidth / 20) / 8) * num * 1.07 + ScreenWidth / 20;
}

function getY(num) {
    return y + ((height - ScreenHeight / 10) / 7) * num * 2 + ScreenHeight / 20;
}

