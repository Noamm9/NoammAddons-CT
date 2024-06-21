/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />


import Dungeon from "../../../BloomCore/dungeons/Dungeon";
import Settings from "../../Settings"
import { Render, registerWhen, Color, CoolSound, IsInBossRoom } from "../../utils";

const C0EPacketClickWindow = Java.type("net.minecraft.network.play.client.C0EPacketClickWindow");
const TermScale = Settings.CustomTerminalMenuScale * 2

let inTerminal = false;
let cwid = -1;
let clicked = false;
const slots = [];
let windowSize = 0;
const queue = [];
const solution = [];
let extra = null;


const clickTrigger = register("guiMouseClick", (x, y, button, _0, event) => {
	cancel(event);
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

	if (solution.includes(slot)) {

		predict(slot, 0);
		if (clicked) queue.push([slot, 0]);
	    else click(slot, 0);
	
	}
}).unregister();


const renderTrigger = register(net.minecraftforge.client.event.GuiScreenEvent.DrawScreenEvent.Pre, event => {
	cancel(event);
	const screenWidth = Renderer.screen.getWidth() / TermScale;
	const screenHeight = Renderer.screen.getHeight() / TermScale;

	const width = 9 * 18;
	const height = windowSize / 9 * 18;

	const globalOffsetX = Number.isNaN(parseInt(Settings.terminalsOffsetX)) ? 0 : parseInt(Settings.terminalsOffsetX);
	const globalOffsetY = Number.isNaN(parseInt(Settings.terminalsOffsetY)) ? 0 : parseInt(Settings.terminalsOffsetY);

	const offsetX = screenWidth / 2 - width / 2 + globalOffsetX + 1;
	const offsetY = screenHeight / 2 - height / 2 + globalOffsetY;

	const title = "&6&l&n[&b&l&nN&d&l&nA&6&l&n] &b&l&nT&d&l&ne&b&l&nr&d&l&nm&b&l&ni&d&l&nn&b&l&na&d&l&nl&r:&r &2C&3o&4l&5o&6r";
	const Lightmode = new Color(203 / 255, 202 / 255, 205 / 255, 1);
    const Darkmode = new Color(33 / 255, 33 / 255, 33 / 255, 1);
	let SolverColor = Settings.CustomTerminalMenuSolutionColor
    let ColorMode = Darkmode
	if (Settings.CustomTerminalMenuLightMode) Colormode = Lightmode

	Tessellator.pushMatrix()

	Renderer.scale(TermScale)

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
	Renderer.drawStringWithShadow(title, offsetX, offsetY);

	for (let i = 0; i < windowSize; ++i) {

		if (!solution.includes(i)) continue;

		let currentOffsetX = i % 9 * 18 + offsetX;
		let currentOffsetY = Math.floor(i / 9) * 18 + offsetY;

		Renderer.scale(TermScale);
		Renderer.drawRect(SolverColor.getRGB(), currentOffsetX, currentOffsetY, 16, 16);

	}

	Tessellator.popMatrix()

}).unregister();



function solve() {
	while (solution.length) solution.pop();
	const allowedSlots = [10, 11, 12, 13, 14, 15, 16, 19, 20, 21, 22, 23, 24, 25, 28, 29, 30, 31, 32, 33, 34, 37, 38, 39, 40, 41, 42, 43];
	const replacements = { "light gray": "silver", "wool": "white", "bone": "white", "ink": "black", "lapis": "blue", "cocoa": "brown", "dandelion": "yellow", "rose": "red", "cactus": "green" };
	const fixName = name => {
		Object.entries(replacements).forEach(([k, v]) => {
			name = name.replace(new RegExp("^" + k), v);
		});
		return name;
	};
	slots.filter(slot => slot && allowedSlots.includes(slot.slot) && !slot.enchanted && fixName(slot.name.toLowerCase()).startsWith(extra)).map(slot => slot.slot).forEach(slot => solution.push(slot));
}


function predict(slot, button) {
	const index = solution.indexOf(slot);
	if (index === -1) return;
	solution.splice(index, 1);
}


function click(slot, button) {
	if (slot === undefined || button === undefined) return;
	clicked = true;
	Client.sendPacket(new C0EPacketClickWindow(cwid, slot, button, 0, null, 0));
	const initialWindowId = cwid;
	setTimeout(() => {
		if (!inTerminal || initialWindowId !== cwid) return;
        queue.length = 0
		solve();
	}, 1000);
}



const GuiOpened = register("packetReceived", (packet, event) => {
    const windowTitle = packet.func_179840_c().func_150254_d().removeFormatting()
	const slotCount = packet.func_148898_f()
	const windowId = packet.func_148901_c()
    const colorsMatch = windowTitle.match(/^Select all the ([\w ]+) items!$/);
	cwid = windowId

	if (colorsMatch !== null) {
		extra = colorsMatch[1].toLowerCase();
        if (!inTerminal) {
            S2EPacketCloseWindow.register()
            C0DPacketCloseWindow.register()
            S2FPacketSetSlot.register()
            clickTrigger.register()
            renderTrigger.register()
        }

        inTerminal = true;
		clicked = false;
		while (slots.length) slots.pop();
		windowSize = slotCount;

	} else inTerminal = false;
	
}).setFilteredClass(net.minecraft.network.play.server.S2DPacketOpenWindow)



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
	} else {
		slots[slot] = null;
	}
	if (slots.length === windowSize) {
		solve();
		if (queue.length > 0) {
			if (queue.every(queued => solution.includes(queued[0]))) {
				queue.forEach(queued => predict(queued[0], queued[1]));
				click(queue[0][0], queue[0][1]);
				queue.shift();
			} else queue.length = 0
		}
	}
	
}).setFilteredClass(net.minecraft.network.play.server.S2FPacketSetSlot).unregister();


const S2EPacketCloseWindow = register("packetReceived", () => {

	inTerminal = false
	queue.length = 0
	clickTrigger.unregister()
	renderTrigger.unregister()
    S2FPacketSetSlot.unregister()

}).setFilteredClass(net.minecraft.network.play.server.S2EPacketCloseWindow).unregister();


const C0DPacketCloseWindow = register("packetSent", () => {
    inTerminal = false
	queue.length = 0
	clickTrigger.unregister()
	renderTrigger.unregister()
    S2FPacketSetSlot.unregister()

}).setFilteredClass(net.minecraft.network.play.client.C0DPacketCloseWindow).unregister();



registerWhen(GuiOpened, () => Settings.CustomTerminalsGui && Settings.CustomColorsTerminal && Dungeon.floorNumber == 7, IsInBossRoom())