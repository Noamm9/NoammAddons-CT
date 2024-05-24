import Settings from "../Config/Settings";
import { Render } from "../utils";


register("drawBlockHighlight", (pos, event) => {
    if (!Settings.BlockOverlay || Player?.lookingAt()?.toString().includes('minecraft:air') ||
     Player?.lookingAt()?.toString().includes('minecraft:fallingblock') || Player?.lookingAt()?.toString().includes('Entity')) return
    cancel(event)

    const block = Player?.lookingAt()
   // const [x, y, z] = [Player?.lookingAt().getX(), Player?.lookingAt().getY(), Player?.lookingAt().getZ()]
    const [r, g, b, a] = [Settings.BlockOverlayOutlineColor.getRed()/255, Settings.BlockOverlayOutlineColor.getGreen()/255, Settings.BlockOverlayOutlineColor.getBlue()/255, Settings.BlockOverlayOutlineColor.getAlpha() /255]
    const [r2, g2, b2, a2] = [Settings.BlockOverlayOverlayColor.getRed()/255, Settings.BlockOverlayOverlayColor.getGreen()/255, Settings.BlockOverlayOverlayColor.getBlue()/255, Settings.BlockOverlayOverlayColor.getAlpha() /255]


    if (Settings.BlockOverlayType == 2) {
        Render.BlockHitbox(block, r, g, b, a, Settings.BlockOverlayESP, Settings.BlockOverlayOutlineThickness, false)
        Render.BlockHitbox(block, r2, g2, b2, a2, Settings.BlockOverlayESP, 0, true)
    }
    if (Settings.BlockOverlayType == 1) {
        Render.BlockHitbox(block, r2, g2, b2, a2, Settings.BlockOverlayESP, 0, true)
    }
    if (Settings.BlockOverlayType == 0) {
        Render.BlockHitbox(block, r, g, b, a, Settings.BlockOverlayESP, Settings.BlockOverlayOutlineThickness, false)
    }
})
