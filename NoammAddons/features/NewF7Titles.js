import { getPhase } from "../utils"


let MsTime = 3000
let terminalInfo
let StartTime
let TimeLeft


register(`chat`, (event) => {
	let msg = ChatLib.getChatMessage(event, false)
	terminalInfo = msg.match(/\d+\/\d+/)
	
	if (!terminalInfo) return
	
	if (terminalInfo[0] != null) {
		StartTime = new Date().getTime()
		RenderTrigger.register()
	}
})




let RenderTrigger = TriggerRegister.registerRenderOverlay(() => {
    let TimeLeft = MsTime - (new Date().getTime() - StartTime);
    
    Renderer.translate(Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 2 - Renderer.screen.getHeight() / 15);
    Renderer.scale(2, 2);
    
    let TitleString = `&a(${terminalInfo[0].replace('1/', '&c1&r/&a')})`;
    Renderer.drawStringWithShadow(TitleString, -Renderer.getStringWidth(TitleString.removeFormatting()) / 2, 0);
    
    if (TimeLeft <= 0) {
        RenderTrigger.unregister()
    }
}).unregister();
	
    
	
	
register(`renderTitle`, (t, subt, event) => {
	if (getPhase() != `p3` && getPhase() != `p1`) return
	cancel(event)
})
