/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"


const InfoText = new Text(` `).setShadow(true).setFormatted(true).setScale(2)
const TypeText = new Text(` `).setShadow(true).setFormatted(true).setScale(2)
const MsTime = 4_000

const TermCrystalRegex = /activated a terminal! \((\d+\/\d+)\)|completed a device! \((\d+\/\d+)\)|activated a lever! \((\d+\/\d+)\)|(\d+\/\d+) Energy Crystals are now active!/
const progressRegex = /\d+\/\d+/
// I suck at making regex

let Type
let Progress
let StartTime


const replacements = [
	{ key: "1/7", value: "&c1&r/&a7" },
	{ key: "1/8", value: "&c1&r/&a8" },
	{ key: "1/2", value: "&c1&r/&b2" },
	{ key: "2/8", value: "&c2&r/&a8" },
	{ key: "2/7", value: "&c2&r/&a7" },
	{ key: "2/2", value: "&b2&r/&b2" },
	{ key: "3/", value: "&c3&r/&a" },
	{ key: "4/", value: "&c4&r/&a" },
	{ key: "5/", value: "&c5&r/&a" },
	{ key: "6/", value: "&c6&r/&a" },
	{ key: "7/8", value: "&c7&r/&a8" },
	{ key: "7/7", value: "&6&l7&r&l/&6&l7" },
	{ key: "8/8", value: "&6&l8&r&l/&6&l8" },
]

function ColorTerminalInfo(Progress) {
	let result = Progress;

	replacements.forEach(replacement => result = result.replace(replacement.key, replacement.value))
	
	return result;
}


const StartRegister = register(`chat`, (event) => {
	let msg = ChatLib.getChatMessage(event, false)

	let IdkWhatToNameThis = msg.match(TermCrystalRegex)
	if (!IdkWhatToNameThis) return

	IdkWhatToNameThis = IdkWhatToNameThis.join(``)

	Progress = IdkWhatToNameThis.match(progressRegex).join()
	if (!Progress) return
		

	if (IdkWhatToNameThis.includes(`device`)) Type = `Dev`
		
	if (IdkWhatToNameThis.includes(`lever`)) Type = `Lever`
		
	if (IdkWhatToNameThis.includes(`terminal`)) Type = `Term`

	if (IdkWhatToNameThis.includes(`Crystal`)) Type = ` `

		

	StartTime = new Date().getTime()
	RenderTrigger.register()
		
}).unregister()



let RenderTrigger = TriggerRegister.registerRenderOverlay(() => {
	let TimeLeft = MsTime - (new Date().getTime() - StartTime);


  	let TitleString = `&r(${ColorTerminalInfo(Progress)}&r)`;
	

	InfoText.setString(TitleString)
	InfoText.setX(Renderer.screen.getWidth() / 2 - Renderer.getStringWidth(TitleString.removeFormatting()))
	InfoText.setY(Renderer.screen.getHeight() / 2 - Renderer.screen.getHeight() / 13)
	InfoText.draw()

	TypeText.setString(`&d${Type} ${TimeMsgToDisplay}&r`)
	TypeText.setX(Renderer.screen.getWidth() / 2 - Renderer.getStringWidth(Type))
	TypeText.setY(Renderer.screen.getHeight() / 2 - Renderer.screen.getHeight() / 25)
	TypeText.draw()
	

    if (TimeLeft <= 0) {
		RenderTrigger.unregister()
	} 
    
}).unregister();


const HideTitles = register(`renderTitle`, (t, subt, event) => cancel(event)).unregister()



register(`chat`, (e) => {
	if (!Settings().CleanTitles) return

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

	phase = 1
    lastCompleted = [0, 7]
    gateBlown = false
    phaseStartTime = 0;
    termsStartTime = 0;
})



// 	its ok to steal some code XD


import { onChatPacket } from "../../BloomCore/utils/Events"

let terminalMessagePattern = /^(.*) completed a device! (.*)$|^(.*) activated a terminal! (.*)|^(.*) activated a lever! (.*)/
let currentTime, elapsedTimeInTerms, elapsedTimeInTermPhase, gateBlown, TimeMsgToDisplay, lastCompleted, timerRunning
let phaseStartTime = 0
let termsStartTime = 0
let phase = 1



register("chat", function (message) {
    if (terminalMessagePattern.test(message) && timerRunning) {

    	currentTime = new Date().getTime()
    	elapsedTimeInTerms = ((currentTime - termsStartTime) / 1000).toFixed(2)
    	elapsedTimeInTermPhase = ((currentTime - phaseStartTime) / 1000).toFixed(2)

        if (phase === 1) TimeMsgToDisplay = " &8(&7" + elapsedTimeInTerms + "s&8)";
        else TimeMsgToDisplay = " &8(&b" + elapsedTimeInTermPhase + "s &8|&b " + elapsedTimeInTerms + "s&8)"

    }
    else if (message.includes("The gate has been destroyed!") && timerRunning) {

    	currentTime = new Date().getTime();
    	elapsedTimeInTerms = ((currentTime - termsStartTime) / 1000).toFixed(2)
    	elapsedTimeInTermPhase = ((currentTime - phaseStartTime) / 1000).toFixed(2)

        if (phase === 1) TimeMsgToDisplay = " &8(&7" + elapsedTimeInTerms + "s&8)"
        else TimeMsgToDisplay = " &8(&b" + elapsedTimeInTermPhase + "s &8|&b " + elapsedTimeInTerms + "s&8)"

    }
}).setChatCriteria("${message}")


function transitionTermPhases() {
    phaseStartTime = new Date().getTime();
    timerRunning = true;
    phase++
    gateBlown = false
    lastCompleted = [0, 7]
}

const newPhase = () => setTimeout(transitionTermPhases, 25)


onChatPacket((completed, total) => {
   // if (!Settings.terminalPhaseTimersEnabled) return;
    completed = parseInt(completed)
    total = parseInt(total)
    if (completed < lastCompleted[0] || (completed == total && gateBlown)) return newPhase()
    lastCompleted = [completed, total]
}).setCriteria(/.+ [activated|completed]+ a .+! \((\d)\/(\d)\)/)

onChatPacket(() => {
   // if (!Settings.terminalPhaseTimersEnabled) return;
    if (lastCompleted[0] == lastCompleted[1]) newPhase()
    else gateBlown = true
}).setCriteria("The gate has been destroyed!")

onChatPacket(() => {
  //  if (!Settings.terminalPhaseTimersEnabled) return;
    newPhase()
}).setCriteria("The Core entrance is opening!")

onChatPacket(() => {
    termsStartTime = new Date().getTime();
    phaseStartTime = termsStartTime // Get both because terms just started
    timerRunning = true;
}).setCriteria("[BOSS] Goldor: Who dares trespass into my domain?")