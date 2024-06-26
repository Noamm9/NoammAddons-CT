/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { registerWhen, ModMessage } from "../utils"


const keyTrigger = register("guiKey", (char, key, gui, event) => {
	const Container = Player.getContainer()
	if (!Container) return
	if (!/^Wardrobe \(\d\/\d\)$/.test(Container.getName())) return
	if (key == 1 || key == 18) return Player.getPlayer().func_71053_j()
	

	const keyMapping = {
		[Keyboard.getKeyIndex(Settings.wd_1.charAt(0).toUpperCase())]: 36,
		[Keyboard.getKeyIndex(Settings.wd_2.charAt(0).toUpperCase())]: 37,
		[Keyboard.getKeyIndex(Settings.wd_3.charAt(0).toUpperCase())]: 38,
		[Keyboard.getKeyIndex(Settings.wd_4.charAt(0).toUpperCase())]: 39,
		[Keyboard.getKeyIndex(Settings.wd_5.charAt(0).toUpperCase())]: 40,
		[Keyboard.getKeyIndex(Settings.wd_6.charAt(0).toUpperCase())]: 41,
		[Keyboard.getKeyIndex(Settings.wd_7.charAt(0).toUpperCase())]: 42,
		[Keyboard.getKeyIndex(Settings.wd_8.charAt(0).toUpperCase())]: 43,
		[Keyboard.getKeyIndex(Settings.wd_9.charAt(0).toUpperCase())]: 44,
	}

	cancel(event)
	const slot = keyMapping[key]
	if (slot !== undefined) Container.click(slot);
	
}).unregister()



registerWhen(keyTrigger, () => Settings.WardrobeHelper)