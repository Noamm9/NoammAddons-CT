import Settings from "../Settings";
import { RenderHelper } from "../../Atomx/helper/Render";


register('renderWorld', () => { 
    if (!Settings.BlockOverlay || Player?.lookingAt()?.toString().includes('minecraft:air') ||
     Player?.lookingAt()?.toString().includes('minecraft:fallingblock') || Player?.lookingAt()?.toString().includes('Entity')) return
    let block = Player?.lookingAt()


    let r = Settings.BlockOverlayOutlineColor.getRed()/255
    let g = Settings.BlockOverlayOutlineColor.getGreen()/255
    let b = Settings.BlockOverlayOutlineColor.getBlue()/255
    let a = Settings.BlockOverlayOutlineColor.getAlpha() /255
    let r2 = Settings.BlockOverlayOverlayColor.getRed()/255
    let g2 = Settings.BlockOverlayOverlayColor.getGreen()/255
    let b2 = Settings.BlockOverlayOverlayColor.getBlue()/255
    let a2 = Settings.BlockOverlayOverlayColor.getAlpha() /255


    if (Settings.BlockOverlayType == 2) {
    RenderHelper.outlineBlock(block, r, g, b, a, Settings.BlockOverlayESP, Settings.BlockOverlayOutlineThickness)
    RenderHelper.filledBlock(block, r2, g2, b2, a2, Settings.BlockOverlayESP)
    }
    if (Settings.BlockOverlayType == 1) {
    RenderHelper.filledBlock(block, r2, g2, b2, a2, Settings.BlockOverlayESP)
    }
    if (Settings.BlockOverlayType == 0) {
    RenderHelper.outlineBlock(block, r, b, g, a, Settings.BlockOverlayESP, Settings.BlockOverlayOutlineThickness)
    }
})

register("drawBlockHighlight", (pos, event) => {
    if (!Settings.BlockOverlay) return
    cancel(event)
})
