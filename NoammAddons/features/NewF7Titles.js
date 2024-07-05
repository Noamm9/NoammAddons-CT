/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"


let InfoText = new Text(` `).setShadow(true).setFormatted(true).setScale(2)
let terminalInfo
let StartTime
let MsTime = 4_000
const TermCrystalRegex = /activated a terminal! \((\d+\/\d+)\)|completed a device! \((\d+\/\d+)\)|activated a lever! \((\d+\/\d+)\)|(\d+\/\d+) Energy Crystals are now active!/
const progressRegex = /\d+\/\d+/
// I suck at making regex


const StartRegister = register(`chat`, (event) => {
	try {
		let msg = ChatLib.getChatMessage(event, false)
		terminalInfo = msg.match(TermCrystalRegex).join(``).match(progressRegex).join()
	
		if (!terminalInfo) return
		if (terminalInfo != null) {
			StartTime = new Date().getTime()
			RenderTrigger.register()
		}
	} catch (e) {}
}).unregister()


let RenderTrigger = TriggerRegister.registerRenderOverlay(() => {
	try {
		let TimeLeft = MsTime - (new Date().getTime() - StartTime);
	

        let TitleString = `&r(${terminalInfo.replace("1/7", "&c1&r/&a7").replace("1/8", "&c1&r/&a8").replace("1/2", "&c1&r/&b2")
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
	

const HideTitles = register(`renderTitle`, (t, subt, event) => cancel(event)).unregister()



register(`chat`, (e) => {
	if (!Settings.CleanTitles) return

	const ChatMessage = ChatLib.getChatMessage(e, false)

	if (ChatMessage.includes(`[BOSS] Maxor: WELL! WELL! WELL! LOOK WHO'S HERE!`) || ChatMessage.includes(`[BOSS] Storm: I should have known that I stood no chance.`)) {
		HideTitles.register()
		StartRegister.register()
	} 

	if (ChatMessage.includes(`[BOSS] Maxor: I'M TOO YOUNG TO DIE AGAIN!`) || ChatMessage.includes(`[BOSS] Goldor: You have done it`)) {
		HideTitles.unregister()
		StartRegister.unregister()
	} 

})

register(`worldLoad`, () => {
	HideTitles.unregister()
	StartRegister.unregister()
})
