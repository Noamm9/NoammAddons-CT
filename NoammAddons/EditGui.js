/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

import { guiData, BonzoMaskGUIdata, SpiritMaskGUIdata, PhoenixPetGUIdata, LegitGhostPickGUIdata, FPSdisplayGUIdata, ClockDisplayGUIdata} from "./index";
import { Render} from "./utils";
import * as BonzoMask from "./features/BonzoMaskTimer";
import * as PhoenixPet from "./features/PhoenixPetTimer";
import * as SpiritMask from "./features/SpiritMaskTimer";
import * as LegitGhostPick from "./features/LegitGhostPick";
import * as FPSdisplay from "./features/FPSdisplay";
import * as ClockDisplay from "./features/ClockDisplay"
export const MainGUI = new Gui()


const RunOneTime = register(`worldLoad`, () => { 
    MainGUI.addButton(1, Renderer.screen.getWidth() / 2 -50, Renderer.screen.getHeight() - Renderer.screen.getHeight() / 4, 100, 20, "Reset Elements")
    RunOneTime.unregister()
})

MainGUI.registerActionPerformed(() => {
	
	BonzoMaskGUIdata.x = 10
	BonzoMaskGUIdata.y = 10
	BonzoMaskGUIdata.s = 100
	
    SpiritMaskGUIdata.x = 10
    SpiritMaskGUIdata.y = 30
    SpiritMaskGUIdata.s = 100
	
	PhoenixPetGUIdata.x = 10
	PhoenixPetGUIdata.y = 50
	PhoenixPetGUIdata.s = 100
	
	LegitGhostPickGUIdata.x = 10
	LegitGhostPickGUIdata.y = 70
	LegitGhostPickGUIdata.s = 100
	
	ClockDisplayGUIdata.x = 10
	ClockDisplayGUIdata.y = 90
	ClockDisplayGUIdata.s = 100
	
	FPSdisplayGUIdata.x = 10
	FPSdisplayGUIdata.y = 110
	FPSdisplayGUIdata.s = 100
    
    //World.playSound('gui.button.press', 1, 1)
})

MainGUI.registerClicked((mx, my, button) => { 
	if (button == 0 && mx < BonzoMaskGUIdata.x + BonzoMask.Text.getWidth() && mx > BonzoMaskGUIdata.x && my < BonzoMaskGUIdata.y + BonzoMask.Text.getHeight() && my > BonzoMaskGUIdata.y) BonzoMask.md = true
	if (button == 0 && mx < SpiritMaskGUIdata.x + SpiritMask.Text.getWidth() && mx > SpiritMaskGUIdata.x && my < SpiritMaskGUIdata.y + SpiritMask.Text.getHeight() && my > SpiritMaskGUIdata.y) SpiritMask.md = true
	if (button == 0 && mx < PhoenixPetGUIdata.x + PhoenixPet.Text.getWidth() && mx > PhoenixPetGUIdata.x && my < PhoenixPetGUIdata.y + PhoenixPet.Text.getHeight() && my > PhoenixPetGUIdata.y) PhoenixPet.md = true
	if (button == 0 && mx < LegitGhostPickGUIdata.x + LegitGhostPick.Text.getWidth() && mx > LegitGhostPickGUIdata.x && my < LegitGhostPickGUIdata.y + LegitGhostPick.Text.getHeight() && my > LegitGhostPickGUIdata.y) LegitGhostPick.md = true
	if (button == 0 && mx < FPSdisplayGUIdata.x + FPSdisplay.Text.getWidth() && mx > FPSdisplayGUIdata.x && my < FPSdisplayGUIdata.y + FPSdisplay.Text.getHeight() && my > FPSdisplayGUIdata.y) FPSdisplay.md = true
	if (button == 0 && mx < ClockDisplayGUIdata.x + ClockDisplay.Text.getWidth() && mx > ClockDisplayGUIdata.x && my < ClockDisplayGUIdata.y + ClockDisplay.Text.getHeight() && my > ClockDisplayGUIdata.y) ClockDisplay.md = true
})

MainGUI.registerMouseReleased((_,__, button) => {
	if (button == 0) { 
		BonzoMask.md = false
		SpiritMask.md = false
		PhoenixPet.md = false
		LegitGhostPick.md = false
		FPSdisplay.md = false
		ClockDisplay.md = false
	}
})

register(`dragged`, (dx, dy, _,__, button) => {
	if (BonzoMask.md && button == 0) {
		BonzoMaskGUIdata.x += dx
		BonzoMaskGUIdata.y += dy
	}
	
	if (SpiritMask.md && button == 0) {
		SpiritMaskGUIdata.x += dx
		SpiritMaskGUIdata.y += dy
	}
	
	if (PhoenixPet.md && button == 0) {
		PhoenixPetGUIdata.x += dx
		PhoenixPetGUIdata.y += dy
	}
	
	if (LegitGhostPick.md && button == 0) {
		LegitGhostPickGUIdata.x += dx
		LegitGhostPickGUIdata.y += dy
	}
	
	if (FPSdisplay.md && button == 0) {
		FPSdisplayGUIdata.x += dx
		FPSdisplayGUIdata.y += dy
	}
	
	if (ClockDisplay.md && button == 0) {
		ClockDisplayGUIdata.x += dx
		ClockDisplayGUIdata.y += dy
	}
})

MainGUI.registerScrolled((x, y, direction) => {
	
	if (BonzoMask.md) {
		if (direction == -1) BonzoMaskGUIdata.s += 1
		else if (direction == 1) BonzoMaskGUIdata.s -= 1
		if (BonzoMaskGUIdata.s < 60) BonzoMaskGUIdata.s = 60
	}
	
	if (SpiritMask.md) {
		if (direction == -1) SpiritMaskGUIdata.s += 1
		else if (direction == 1) SpiritMaskGUIdata.s -= 1
		if (SpiritMaskGUIdata.s < 60) SpiritMaskGUIdata.s = 60
	}
	
	if (PhoenixPet.md) {
		if (direction == -1) PhoenixPetGUIdata.s += 1
		else if (direction == 1) PhoenixPetGUIdata.s -= 1
		if (PhoenixPetGUIdata.s < 60) PhoenixPetGUIdata.s = 60
	}
	
	if (LegitGhostPick.md) {
		if (direction == -1) LegitGhostPickGUIdata.s += 1
		else if (direction == 1) LegitGhostPickGUIdata.s -= 1
		if (LegitGhostPickGUIdata.s < 60) LegitGhostPickGUIdata.s = 60
	}

	if (FPSdisplay.md) {
		if (direction == -1) FPSdisplayGUIdata.s += 1
		else if (direction == 1) FPSdisplayGUIdata.s -= 1
		if (FPSdisplayGUIdata.s < 60) FPSdisplayGUIdata.s = 60
	}

	if (ClockDisplay.md) {
		if (direction == -1) ClockDisplayGUIdata.s += 1
		else if (direction == 1) ClockDisplayGUIdata.s -= 1
		if (ClockDisplayGUIdata.s < 60) ClockDisplayGUIdata.s = 60
	}
})


register("command", () => { 
	MainGUI.open()
	setTimeout(() => {
		EditView.register()

		BonzoMask.Timer = 100
		SpiritMask.Timer = 100
		PhoenixPet.Timer = 100
		
		BonzoMask.RenderRegister.register()
		SpiritMask.RenderRegister.register()
		PhoenixPet.RenderRegister.register()

	}, 200);

}).setName("naeditmaingui", true)


MainGUI.registerClosed(() => guiData.save())


const EditView = TriggerRegister.registerRenderOverlay(() => {

	if (BonzoMask.md) Render.TextBoundingBox(BonzoMaskGUIdata.x, BonzoMaskGUIdata.y, BonzoMask.Text.getWidth(), BonzoMask.Text.getHeight(), BonzoMaskGUIdata.s/100)
	if (SpiritMask.md) Render.TextBoundingBox(SpiritMaskGUIdata.x, SpiritMaskGUIdata.y, SpiritMask.Text.getWidth(), SpiritMask.Text.getHeight(), SpiritMaskGUIdata.s/100)
	if (PhoenixPet.md) Render.TextBoundingBox(PhoenixPetGUIdata.x, PhoenixPetGUIdata.y, PhoenixPet.Text.getWidth(), PhoenixPet.Text.getHeight(), PhoenixPetGUIdata.s/100)
	if (LegitGhostPick.md) Render.TextBoundingBox(LegitGhostPickGUIdata.x, LegitGhostPickGUIdata.y, LegitGhostPick.Text.getWidth(), LegitGhostPick.Text.getHeight(), LegitGhostPickGUIdata.s/100)
	if (FPSdisplay.md) Render.TextBoundingBox(FPSdisplayGUIdata.x, FPSdisplayGUIdata.y, FPSdisplay.Text.getWidth(), FPSdisplay.Text.getHeight(), FPSdisplayGUIdata.s/100)
	if (ClockDisplay.md) Render.TextBoundingBox(ClockDisplayGUIdata.x, ClockDisplayGUIdata.y, ClockDisplay.Text.getWidth(), ClockDisplay.Text.getHeight(), ClockDisplayGUIdata.s/100)

}).unregister()
