/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Settings"
import { registerWhen } from "../utils"


const ResourceLocation = Java.type('net.minecraft.util.ResourceLocation')
let applied = false

const guiClosed = register('guiClosed', () => {
	if (!applied) return
	Client.getMinecraft().field_71460_t.func_181022_b()
	applied = false
})

const postGuiRender = register('postGuiRender', (mx, my, gui) => {
	if (applied) return
	if (gui.class == 'class net.optifine.gui.GuiChatOF' || gui.class == 'class gg.essential.vigilance.gui.SettingsGui') return
	Client.getMinecraft().field_71460_t.func_181022_b()
	Client.getMinecraft().field_71460_t.func_175069_a(new ResourceLocation('shaders/post/blur.json'))
	applied = true
})


registerWhen(guiClosed, () => Settings().BlurBackground)
registerWhen(postGuiRender, () => Settings().BlurBackground)