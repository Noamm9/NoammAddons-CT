/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings";
import { registerWhen, DungeonSecretsItems, Render } from "../utils";



const renderTrigger = register("renderEntity", (entity, _, partialTicks, event) => {
	if (entity.getClassName() !== "EntityItem") return
	if (entity.isDead()) return;
	if (!DungeonSecretsItems.includes(ChatLib.removeFormatting(entity.entity.func_92059_d().func_82833_r()))) return

	const distance = entity.distanceTo(Player.getPlayer())
	const x = entity.getRenderX()
	const y = entity.getRenderY()
	const z = entity.getRenderZ()
	Tessellator.disableLighting();
    Render.StringWithShadow(entity.entity.func_92059_d().func_82833_r(), x, y+1, z, Renderer.WHITE, 1.2, true )
	if (distance < 3.5) {
		if (entity.getTicksExisted() > 11) Render.FilledOutLineBox(x, y, z, 0.5, 0.5, 0, 240/255, 0, 20/100, true);	// Can be picked up
		else Render.FilledOutLineBox(x, y, z, 0.5, 0.5, 255/255, 254/255, 0/255, 20/100, true)	// Can be picked up but on cooldown
	}
    else Render.FilledOutLineBox(x, y, z, 0.5, 0.5, 1, 0, 0, 20/100, true) // Can't be picked up cuz too far away
	
	Tessellator.enableLighting()
    cancel(event)
})





registerWhen(renderTrigger, () => Settings.ColorSecrets)