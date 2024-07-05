/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import RenderLib from "../../RenderLib"
import Settings from "../Settings"

let inP5 = false
	
const chat = register("chat", (e) => { 
	inP5 = true
	trigger.register()
}).setChatCriteria("[BOSS] Wither King: You.. again?")


register(`worldUnload`, () => {
	inP5 = false
	chat.register()
})

const trigger = register('renderWorld', () => { 
	if (!Settings.M7DragBox || !inP5) return
	RenderLib.drawEspBox(84, 16 , 95, 25, 10, 0, 170/255, 170/255,1,false );
	RenderLib.drawEspBox(57, 13, 125, 23, 10, 170/255, 0, 170/255,1,false );
	RenderLib.drawEspBox(22, 8, 95, 30, 20, 85/255, 255/255, 85/255,1,false );
	RenderLib.drawEspBox(27, 13, 58, 25, 15, 255/255, 85/255, 85/255,1,false );
	RenderLib.drawEspBox(87, 8, 62, 30, 20, 255/255, 170/255, 0,1,false );
	// x y z width height rgb alpha thru walls
}).unregister()
