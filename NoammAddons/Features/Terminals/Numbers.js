/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../../Settings"
import Dungeon from "../../../BloomCore/dungeons/Dungeon";
import { Render, registerWhen, Color, CoolSound, IsInBossRoom, PreGuiRenderEvent, C0EPacketClickWindow, getPatcherScale } from "../../utils";
import { Darkmode, Lightmode, NumbersTitle, GetTermScale } from "./ConstantsVeriables";


let inTerminal = false;
let cwid = -1;
let clicked = false;
let windowSize = 0;
const slots = [];
const queue = [];
const solution = [];


const clickTrigger = register("guiMouseClick", (x, y, button, _0, event) => {
	cancel(event);
	const TermScale = GetTermScale()
	const screenWidth = Renderer.screen.getWidth();
	const screenHeight = Renderer.screen.getHeight();

	const width = 9 * 18 * TermScale;
	const height = windowSize / 9 * 18 * TermScale;

	const globalOffsetX = 0 
	const globalOffsetY = 0

	const offsetX = screenWidth / 2 - width / 2 + globalOffsetX * TermScale;
	const offsetY = screenHeight / 2 - height / 2 + globalOffsetY * TermScale;

	const slotX = Math.floor((x - offsetX) / (18 * TermScale));
	const slotY = Math.floor((y - offsetY) / (18 * TermScale));

	if (slotX < 0 || slotX > 8 || slotY < 0) return;

	const slot = slotX + slotY * 9;

	if (slot >= windowSize) return;

    if (solution.indexOf(slot) === 0) {

		predict(slot, 0);
		if (clicked) queue.push([slot, 0]);
		else click(slot, 0);
		
    }
}).unregister();


const renderTrigger = register(PreGuiRenderEvent, event => {
	cancel(event)

	const TermScale = GetTermScale()
	const screenWidth = Renderer.screen.getWidth() / TermScale;
	const screenHeight = Renderer.screen.getHeight() / TermScale;

	const width = 9 * 18;
	const height = windowSize / 9 * 18;

	const globalOffsetX = 0
	const globalOffsetY = 0

	const offsetX = screenWidth / 2 - width / 2 + globalOffsetX + 1;
	const offsetY = screenHeight / 2 - height / 2 + globalOffsetY;


    let ColorMode = Darkmode
	if (Settings().CustomTerminalMenuLightMode) ColorMode = Lightmode
	
    let SolverColor = new Color(Settings().CustomTerminalMenuSolutionColor[0]/255, Settings().CustomTerminalMenuSolutionColor[1]/255, Settings().CustomTerminalMenuSolutionColor[2]/255, Settings().CustomTerminalMenuSolutionColor[3]/255)

	Tessellator.pushMatrix()
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

	Renderer.drawStringWithShadow(NumbersTitle, offsetX, offsetY);

	for (let i = 0; i < windowSize; ++i) {

		let index = solution.indexOf(i);
		if (index === -1) continue;
		if (index >= 3) continue;

		let currentOffsetX = i % 9 * 18 + offsetX;
		let currentOffsetY = Math.floor(i / 9) * 18 + offsetY;

        for (let j = 0; j <index; ++j) SolverColor = SolverColor.darker().darker()

		Renderer.scale(TermScale);
		Renderer.drawRect(SolverColor.getRGB(), currentOffsetX, currentOffsetY, 16, 16);
		
        for (let j = 0; j <index; ++j) SolverColor = SolverColor.brighter().brighter()


        let StackSize = Player?.getContainer()?.getStackInSlot(i)?.getStackSize()
        if (!StackSize) return

        Renderer.scale(TermScale)
        Renderer.drawStringWithShadow(StackSize, (currentOffsetX + 8) - Renderer.getStringWidth(StackSize)/2, currentOffsetY + 4);

	}

	Tessellator.popMatrix();

}).unregister();


function solve() {
	while (solution.length) solution.pop();
	const allowedSlots = [10, 11, 12, 13, 14, 15, 16, 19, 20, 21, 22, 23, 24, 25];
	slots.filter(slot => slot && allowedSlots.includes(slot.slot) && slot.id === 160 && slot.meta === 14).sort((a, b) => a.size - b.size).map(slot => slot.slot).forEach(slot => solution.push(slot));
}


function predict(slot, button) {
	if (solution.indexOf(slot) !== 0) return;
	solution.shift();
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
		clicked = false;
	}, 1000);
}



const GuiOpened = register("packetReceived", (packet, event) => {
    const windowTitle = packet.func_179840_c().func_150254_d().removeFormatting()
	const slotCount = packet.func_148898_f()
	const windowId = packet.func_148901_c()
    const numbersMatch = windowTitle.match(/^Click in order!$/);
	cwid = windowId

	if (numbersMatch !== null) {
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
	} else slots[slot] = null;
	
	if (slots.length === windowSize) {
		solve();
		if (queue.length > 0) {
			if (queue.every((queued, index) => solution.indexOf(queued[0]) === index)) {
				queue.forEach(queued => predict(queued[0], queued[1]));
				click(queue[0][0], queue[0][1]);
				queue.shift();
			} else queue.length = 0
		}
	}
	

}).setFilteredClass(net.minecraft.network.play.server.S2FPacketSetSlot).unregister();


const S2EPacketCloseWindow = register("packetReceived", () => setTimeout(() => Reset(), 300)).setFilteredClass(net.minecraft.network.play.server.S2EPacketCloseWindow).unregister();
const C0DPacketCloseWindow = register("packetSent", () => setTimeout(() => Reset(), 300)).setFilteredClass(net.minecraft.network.play.client.C0DPacketCloseWindow).unregister();

function Reset() {

	clickTrigger.unregister()
	renderTrigger.unregister()
    S2FPacketSetSlot.unregister()
	S2EPacketCloseWindow.unregister()
	C0DPacketCloseWindow.unregister()
	inTerminal = false;
	queue.length = 0
	CoolSound()

}



registerWhen(GuiOpened, () => Settings().CustomTerminalsGui && Settings().CustomNumbersTerminal, Dungeon.floorNumber == 7, IsInBossRoom())