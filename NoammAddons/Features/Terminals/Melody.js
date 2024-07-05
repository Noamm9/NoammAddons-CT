/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />


import Dungeon from "../../../BloomCore/dungeons/Dungeon";
import Settings from "../../Settings"
import { Render, registerWhen, clickSlot, Color, IsInBossRoom, PreGuiRenderEvent, CoolSound } from "../../utils";


let cwid = -1;
const slots = [];
let windowSize = 0;
const melody = {
	correct: -1,
	button: -1,
	current: -1
};

const clickTrigger = register("guiMouseClick", (x, y, button, _0, event) => {
	cancel(event);
	const TermScale = Settings.CustomTerminalMenuScale * 2
	const screenWidth = Renderer.screen.getWidth();
	const screenHeight = Renderer.screen.getHeight();

	const width = 9 * 18 * TermScale;
	const height = windowSize / 9 * 18 * TermScale;

	const globalOffsetX = Number.isNaN(parseInt(Settings.terminalsOffsetX)) ? 0 : parseInt(Settings.terminalsOffsetX);
	const globalOffsetY = Number.isNaN(parseInt(Settings.terminalsOffsetY)) ? 0 : parseInt(Settings.terminalsOffsetY);

	const offsetX = screenWidth / 2 - width / 2 + globalOffsetX * TermScale;
	const offsetY = screenHeight / 2 - height / 2 + globalOffsetY * TermScale;

	const slotX = Math.floor((x - offsetX) / (18 * TermScale));
	const slotY = Math.floor((y - offsetY) / (18 * TermScale));

	if (slotX < 0 || slotX > 8 || slotY < 0) return;

	const slot = slotX + slotY * 9;

	if (slot >= windowSize) return;

	if ([16, 25, 34, 43].includes(slot)) clickSlot(slot, 0, cwid);
	
}).unregister();

const renderTrigger = register(PreGuiRenderEvent, event => {
	cancel(event);
	const TermScale = Settings.CustomTerminalMenuScale * 2
	const screenWidth = Renderer.screen.getWidth() / TermScale;
	const screenHeight = Renderer.screen.getHeight() / TermScale;

	const width = 9 * 18;
	const height = windowSize / 9 * 18;

	const globalOffsetX = Number.isNaN(parseInt(Settings.terminalsOffsetX)) ? 0 : parseInt(Settings.terminalsOffsetX);
	const globalOffsetY = Number.isNaN(parseInt(Settings.terminalsOffsetY)) ? 0 : parseInt(Settings.terminalsOffsetY);

	const offsetX = screenWidth / 2 - width / 2 + globalOffsetX + 1;
	const offsetY = screenHeight / 2 - height / 2 + globalOffsetY;

	const title = "&6&l&n[&b&l&nN&d&l&nA&6&l&n] &b&l&nT&d&l&ne&b&l&nr&d&l&nm&b&l&ni&d&l&nn&b&l&na&d&l&nl&r:&r &dMelody";
    const Lightmode = new Color(203 / 255, 202 / 255, 205 / 255, 1);
    const Darkmode = new Color(33 / 255, 33 / 255, 33 / 255, 1);
    let ColorMode = Darkmode
	if (Settings.CustomTerminalMenuLightMode) ColorMode = Lightmode

	Tessellator.pushMatrix();

	Renderer.scale(TermScale);
    Render.RoundedRect(
        ColorMode.darker(), 
        offsetX - 2 - (width / 15) / 2, 
        offsetY - 2 - (width / 15) / 2, 
        width + 4 + width / 15, 
        height + 4 + width / 15, 
        5
	)
    Render.RoundedRect(
		ColorMode, 
		offsetX - 2, 
		offsetY - 2, 
		width + 4, 
		height + 4, 
		5
	)
	Renderer.drawRect(Renderer.LIGHT_PURPLE, offsetX + (melody.correct + 1) * 18, offsetY + 18, 16, 70);
    Renderer.scale(TermScale);
	Renderer.drawStringWithShadow(title, offsetX, offsetY);


	for (let i = 0; i < windowSize; ++i) {
		let currentOffsetX = i % 9 * 18 + offsetX;
		let currentOffsetY = Math.floor(i / 9) * 18 + offsetY;

		const buttonSlot = melody.button * 9 + 16;
		const currentSlot = melody.button * 9 + 10 + melody.current;
		if (i === buttonSlot) {
			Renderer.scale(TermScale);
			Renderer.drawRect(Renderer.GREEN, currentOffsetX, currentOffsetY, 16, 16);
		} else if ([16, 25, 34, 43].includes(i)) {
			Renderer.scale(TermScale);
			Renderer.drawRect(Renderer.RED, currentOffsetX, currentOffsetY, 16, 16);
		} else if (i === currentSlot) {
			Renderer.scale(TermScale);
			Renderer.drawRect(Settings.CustomTerminalMenuSolutionColor.getRGB(), currentOffsetX, currentOffsetY, 16, 16);
		}
	}

	Tessellator.popMatrix();
}).unregister();



const S2FPacketSetSlot = register("packetReceived", (packet, event) => {
	const itemStack = packet.func_149174_e();
	const slot = packet.func_149173_d();

    if (slot < 0) return;
	if (slot >= windowSize) return;
	if (itemStack !== null) {
		const item = new Item(itemStack);
		slots[slot] = {
			slot,
			id: item.getID(),
			meta: item.getMetadata(),
			size: item.getStackSize(),
			name: ChatLib.removeFormatting(item.getName()),
			enchanted: item.isEnchanted()
		};
		if (slots[slot].id === 160 && slots[slot].meta === 5) {
			const correct = slots.find(slot => slot && slot.id === 160 && slot.meta === 2)?.slot - 1;
			const button = Math.floor(slot / 9) - 1;
			const current = slot % 9 - 1;
			melody.correct = correct;
			melody.button = button;
			melody.current = current;
		}
	} else slots[slot] = null;
	

}).setFilteredClass(net.minecraft.network.play.server.S2FPacketSetSlot).unregister();


const GuiOpened = register("packetReceived", (packet, event) => {
    const windowTitle = packet.func_179840_c().func_150254_d().removeFormatting()
    const melodyMatch = windowTitle.match(/^Click the button on time!$/)
	const slotCount = packet.func_148898_f()
	const windowId = packet.func_148901_c()
	cwid = windowId

	if (melodyMatch !== null) {
        
		S2EPacketCloseWindow.register()
        C0DPacketCloseWindow.register()
		S2FPacketSetSlot.register()
		clickTrigger.register()
		renderTrigger.register()
		while (slots.length) slots.pop()
		windowSize = slotCount
	}

}).setFilteredClass(net.minecraft.network.play.server.S2DPacketOpenWindow)


const S2EPacketCloseWindow = register("packetReceived", () => {

	Reset()
	CoolSound()
    
}).setFilteredClass(net.minecraft.network.play.server.S2EPacketCloseWindow).unregister();

const C0DPacketCloseWindow = register("packetSent", setTimeout(Reset, 100)).setFilteredClass(net.minecraft.network.play.client.C0DPacketCloseWindow).unregister();


function Reset() {

	clickTrigger.unregister()
	renderTrigger.unregister()
    S2FPacketSetSlot.unregister()
	S2EPacketCloseWindow.unregister()
	C0DPacketCloseWindow.unregister()

}

registerWhen(GuiOpened, () => Settings.CustomTerminalsGui && Settings.CustomMelodyTerminal, Dungeon.floorNumber == 7, IsInBossRoom())