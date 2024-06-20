import Settings from "../Settings";
import { Render, F7PhaseCriterias } from "../utils";


register(`chat`, (e) => {
    if (!Settings.F7M7PhaseStartTimers) return
    let ChatMessage = ChatLib.getChatMessage(e,false)
    if (ChatMessage.startsWith(F7PhaseCriterias[0]) && Settings.P1StartTimer) Render.TimerUnderCursor(`&a`, 7_500)
    else if (ChatMessage.startsWith(F7PhaseCriterias[1]) && Settings.P2StartTimer) Render.TimerUnderCursor(`&a`, 6_000)
    else if (ChatMessage.startsWith(F7PhaseCriterias[2]) && Settings.P3StartTimer) Render.TimerUnderCursor(`&a`, 5_200)
    else if (ChatMessage.startsWith(F7PhaseCriterias[3]) && Settings.P4StartTimer) Render.TimerUnderCursor(`&a`, 3_000)
})
