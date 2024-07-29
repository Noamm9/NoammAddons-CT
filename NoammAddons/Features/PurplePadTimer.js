/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings";
import { registerWhen } from "../utils";


let ticks = 0
let TickText = new Text(``).setShadow(true).setScale(2).setFormatted(true).setAlign(`center`)

const overlayTrigger = register("renderOverlay", () => {

    TickText
    .setString((ticks > 13 ? "§a" : ticks > 6 ? "§6" : "§c") + (ticks / 20).toFixed(2) + "s")
    .setX(Renderer.screen.getWidth()/2)
    .setY(Renderer.screen.getHeight()/3)
    .draw()
    
}).unregister();

const tickListener = register('packetReceived', () => {
	--ticks;
	if (ticks <= 0) {
		ticks = 20;
	}

}).setFilteredClass(Java.type("net.minecraft.network.play.server.S32PacketConfirmTransaction")).unregister()


registerWhen(register(`chat`, (message) => {

    if (message == `[BOSS] Storm: Pathetic Maxor, just like expected.`) {
        ticks = 20;
        tickListener.register()
        overlayTrigger.register();
    }
    else if (message == "[BOSS] Storm: I should have known that I stood no chance.") {
        tickListener.unregister()
        overlayTrigger.unregister();
    }
        
}).setCriteria("${message}"), () => Settings().PurplePadTimer)


registerWhen(register("worldUnload", () => {
	tickListener.unregister()
	overlayTrigger.unregister()
}), () => Settings().PurplePadTimer)
