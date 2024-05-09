import Settings from "../Settings";
import { Render } from "../utils";


let Criteria = [
    `[BOSS] Maxor: WELL! WELL! WELL! LOOK WHO'S HERE!`,
    `[BOSS] Maxor: YOU TRICKED ME!`,
    `[BOSS] Maxor: I'M TOO YOUNG TO DIE AGAIN!`,
    `[BOSS] Storm: I should have known that I stood no chance.`,
    `[BOSS] Necron: I'm afraid, your journey ends now.`
]

register(`chat`, (e) => {
    if (!Settings.F7M7PhaseStartTimers) return
    let ChatMessage = ChatLib.getChatMessage(e,false).toString()
    if (ChatMessage.startsWith(Criteria[0]) && Settings.P1StartTimer) Render.DrawTimerUnderCursor(`&a`, 7_500)
    else if (ChatMessage.startsWith(Criteria[1]) && Settings.P2StartTimer) Render.DrawTimerUnderCursor(`&a`, 6_000)
    else if (ChatMessage.startsWith(Criteria[2]) && Settings.P2StartTimer) Render.DrawTimerUnderCursor(`&a`, 6_000)
    else if (ChatMessage.startsWith(Criteria[3]) && Settings.P3StartTimer) Render.DrawTimerUnderCursor(`&a`, 5_200)
    else if (ChatMessage.startsWith(Criteria[4]) && Settings.P4StartTimer) Render.DrawTimerUnderCursor(`&a`, 3_000)
})
