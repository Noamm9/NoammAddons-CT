import Settings from "../Settings";
import { Render, F7PhaseCriterias } from "../utils";


register(`chat`, (ChatMessage) => {
    ChatMessage = ChatLib.getChatMessage(ChatMessage)
    if (ChatMessage.startsWith(F7PhaseCriterias[0]) && Settings().P1StartTimer) Render.TimerUnderCursor(`&a`, 7_500)
    if (ChatMessage.startsWith(F7PhaseCriterias[1]) && Settings().P2StartTimer) Render.TimerUnderCursor(`&a`, 6_000)
    if (ChatMessage.startsWith(F7PhaseCriterias[2]) && Settings().P3StartTimer) Render.TimerUnderCursor(`&a`, 5_200)
    if (ChatMessage.startsWith(F7PhaseCriterias[3]) && Settings().P4StartTimer) Render.TimerUnderCursor(`&a`, 3_000)
        
}).setChatCriteria(/\[BOSS\] Maxor: WELL! WELL! WELL! LOOK WHO'S HERE!|\[BOSS\] Maxor: I'M TOO YOUNG TO DIE AGAIN!|\[BOSS\] Storm: I should have known that I stood no chance\.|\[BOSS\] Necron: I'm afraid, your journey ends now\./)
