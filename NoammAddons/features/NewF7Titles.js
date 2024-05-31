/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Config/Settings"
import { getPhase } from "../utils"


let InfoText = new Text(` `).setShadow(true).setFormatted(true).setScale(2)
let terminalInfo
let StartTime
let MsTime = 4_000
const TermCrystalRegex = /activated a terminal! \((\d+\/\d+)\)|completed a device! \((\d+\/\d+)\)|activated a lever! \((\d+\/\d+)\)|(\d+\/\d+) Energy Crystals are now active!/
const progressRegex = /\d+\/\d+/
// I suck at making regex


register(`chat`, (event) => {
	if (!Settings.CleanTitles) return
	if (getPhase() != `p3` && getPhase() != `p1`) return

	try {
		let msg = ChatLib.getChatMessage(event, false)
		terminalInfo = msg.match(TermCrystalRegex).join(``).match(progressRegex).join()
	
		if (!terminalInfo) return
		if (terminalInfo != null) {
			StartTime = new Date().getTime()
			RenderTrigger.register()
		}
	} catch (e) {}
})




let RenderTrigger = TriggerRegister.registerRenderOverlay(() => {
	try {
		let TimeLeft = MsTime - (new Date().getTime() - StartTime);
		let TitleString
	
		
        TitleString = `&r(${terminalInfo.replace("1/7", "&c1&r/&a7").replace("1/8", "&c1&r/&a8").replace("1/2", "&c1&r/&b2")
		.replace("2/8", "&c2&r/&a8").replace("2/7", "&c2&r/&a7").replace("2/2", "&b2&r/&b2")
		.replace("3/", "&c3&r/&a").replace("4/", "&c4&r/&a").replace("5/", "&c5&r/&a")
		.replace("6/", "&c6&r/&a").replace("7/8", "&c7&r/&a8")
		}&r)`;
		

		InfoText.setX(Renderer.screen.getWidth() / 2 - Renderer.getStringWidth(TitleString.removeFormatting()))
		InfoText.setY(Renderer.screen.getHeight() / 2 - Renderer.screen.getHeight() / 15)
		InfoText.setString(TitleString)
		InfoText.draw()
		
    	if (TimeLeft <= 0) {
    	    RenderTrigger.unregister()
    	}
	} catch (e) {}
    
}).unregister();
	
    
	
	
register(`renderTitle`, (t, subt, event) => {
	if (!Settings.CleanTitles) return
	if (getPhase() != `p3` && getPhase() != `p1`) return
	cancel(event)
})
