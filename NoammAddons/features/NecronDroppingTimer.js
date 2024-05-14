import PogObject from "../../PogData"
import Settings from "../Config/Settings";
import Dungeon from "../../BloomCore/dungeons/Dungeon"

const NecronDropTimerms = 3000 // 3s
let startingTime = null
const NecronDropTimer = new Gui();
let md = false

const NecronDropTimerdata = new PogObject("Noammaddons", {
	x: 10,
	y: 90,
	s: 100,
}, "Config/NecronDropTimer.json");

NecronDropTimer.addButton(1, Renderer.screen.getWidth() / 2 -50, Renderer.screen.getHeight() - Renderer.screen.getHeight() / 4, 100, 20, "Reset Element");
NecronDropTimer.registerActionPerformed(() => {
	NecronDropTimerdata.x = 10
	NecronDropTimerdata.y = 10
	NecronDropTimerdata.s = 100
})

NecronDropTimer.registerClicked(() => {
	if (NecronDropTimer.isOpen()) {
		md = true
	}
})


register("dragged", (dx, dy) => {
	if (md) {
		NecronDropTimerdata.x += dx
		NecronDropTimerdata.y += dy
	}
})


NecronDropTimer.registerMouseReleased(() => {
	md = false
    NecronDropTimerdata.save();
})

register("scrolled", (x, y, direction) => {
	if (NecronDropTimer.isOpen()) {
		if (direction == -1) {
			NecronDropTimerdata.s = NecronDropTimerdata.s + 1
		} else if (direction == 1) {
			NecronDropTimerdata.s = NecronDropTimerdata.s - 1
		}
		if (NecronDropTimerdata.s < 60) {
			NecronDropTimerdata.s = 60
		}
	}
})



NecronDropTimer.registerClosed(() => {
	NecronDropTimerdata.save()
	startingTime = null
})


register("command", () => {
	NecronDropTimerdata.save();
	NecronDropTimer.open();
	register("renderOverlay", () => {
		if (!NecronDropTimer.isOpen()) return
		new Text(`&cNecron is Droping in: 5.0`, 
		NecronDropTimerdata.x ,NecronDropTimerdata.y).setShadow(true).setScale(NecronDropTimerdata.s / 100).draw();
	})
}).setName("necrondroptimer");




register("chat", () => {
	if (!Settings.NecronDroppingTimer || !Dungeon.inDungeon) return
    startingTime = Date.now()
}).setChatCriteria("[BOSS] Necron: I'm afraid, your journey ends now.")

register("renderOverlay", () => {
    if (!startingTime) return

    const timeRemaining = NecronDropTimerms - (Date.now() - startingTime)
	if (timeRemaining/1000 < 0) {
		startingTime = null
	}
    
	new Text(`&cNecron is Dropping in: ${timeRemaining}`, 
	NecronDropTimerdata.x ,NecronDropTimerdata.y).setShadow(true).setScale(NecronDropTimerdata.s / 100).draw();
	
})
