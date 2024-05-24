/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import { FPSdisplayGUIdata } from "../index"
import Settings from "../Config/Settings"


export let md = false
export let Text = new Text(` `).setShadow(true)


register('renderOverlay', () => {
    if(!Settings.FPSdisplay) return

    Text.setX(FPSdisplayGUIdata.x)
	Text.setY(FPSdisplayGUIdata.y)
    Text.setScale(FPSdisplayGUIdata.s/100)
	Text.setColor(Renderer.color(0,114,255))
	Text.setString(`${Client.getFPS()} fps`)
	Text.draw()
})