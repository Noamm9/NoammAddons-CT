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
		[Settings().wd_1]: 36,
		[Settings().wd_2]: 37,
		[Settings().wd_3]: 38,
		[Settings().wd_4]: 39,
		[Settings().wd_5]: 40,
		[Settings().wd_6]: 41,
		[Settings().wd_7]: 42,
		[Settings().wd_8]: 43,
		[Settings().wd_9]: 44,
	}

	cancel(event)
	const slot = keyMapping[key]
	if (slot !== undefined) Container.click(slot);
	
}).unregister()



registerWhen(keyTrigger, () => Settings().WardrobeHelper)