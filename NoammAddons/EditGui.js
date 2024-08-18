/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

import { Render, guiData } from "./utils"


let ElementList = []
export function AddElement(element) {
	ElementList.push(element)
}


export class GuiElement {
	constructor(DataObj, text) {
		AddElement(this)

        this.DataObj = DataObj
        this.text = text
	}


	Element = new Text(" ").setShadow(true).setFormatted(true)
	MouseDown = false
	
	setText(text) {
		this.text = text
	}

	setX(x) {
		this.DataObj.x = x
	}

	setY(y) {
		this.DataObj.y = y
	}

	setScale(scale) {
        this.DataObj.s = scale
    }


	getText() {
		return this.text
	}

	getX() {
		return this.DataObj.x
	}

	getY() {
		return this.DataObj.y
	}

	getScale() {
        return this.DataObj.s
    }

	getWidth() {
		return this.Element.getWidth()
	}

	getHeight() {
        return this.Element.getHeight()
    }




	Draw() {
		this.Element
		.setString(this.text)
		.setX(this.DataObj.x)
		.setY(this.DataObj.y)
		.setScale(this.DataObj.s)
		.draw()

	}

	isHovered(mx, my) {
		return mx >= this.DataObj.x && mx <= this.DataObj.x + this.getWidth() && my >= this.DataObj.y && my <= this.DataObj.y + this.getHeight()
	}

}


export const MainGUI = new Gui()


register("command", () => { 
	MainGUI.open()
	MainGUI.addButton(1, Renderer.screen.getWidth() / 2 -50, Renderer.screen.getHeight() - Renderer.screen.getHeight() / 4, 100, 20, "Reset Elements")


	setTimeout(() => {
		EditView.register()
		ButtonAction.register()
		registerClicked.register()
		registerMouseReleased.register()
		Dragged.register()
		Scrolled.register()


		DrawAllElements.register()


	}, 200);

}).setName("naeditmaingui", true)










const ButtonAction = MainGUI.registerActionPerformed(() => {
	ElementList.forEach((element, index) => {
		element.setX(10)
		element.setY(10+ 25*index)
		element.setScale(1)
	})
}).unregister()


const registerClicked = MainGUI.registerClicked((mx, my, button) => { 
	if (button == 0) {
		ElementList.forEach(element => {
			if (element.isHovered(mx, my)) element.MouseDown = true
		})
	}
}).unregister()


const registerMouseReleased = MainGUI.registerMouseReleased((mx,my, button) => {
	if (button == 0) { 
		ElementList.forEach(element => {
			if (element.isHovered(mx, my)) element.MouseDown = false
		})
	}
}).unregister()


const Dragged = register(`dragged`, (dx,dy, mx,my, button) => {
	if (!MainGUI.isOpen()) return

	if (button == 0) {
		ElementList.forEach(element => {
            if (element.MouseDown) {
                element.setX(element.getX() + dx)
                element.setY(element.getY() + dy)
            }
        })
	}


}).unregister()


const Scrolled = MainGUI.registerScrolled((mx, my, direction) => {
	ElementList.forEach(element => {
		if (element.isHovered(mx, my)) {

			if (direction == -1) element.setScale(element.getScale() + 0.02)
			else if (direction == 1) element.setScale(element.getScale() - 0.02)
			
			if (element.getScale() < 0.6) element.setScale(0.6)
		}
	})
}).unregister()


const DrawAllElements = TriggerRegister.registerRenderOverlay(() => ElementList.forEach(element => element.Draw())).unregister()
MainGUI.registerClosed(OnClose)


const EditView = TriggerRegister.registerRenderOverlay(() => {
	ElementList.forEach(element => {
		if (!element.isHovered(Client.getMouseX(), Client.getMouseY())) return
		
		Render.TextBoundingBox(element.DataObj.x, element.DataObj.y, element.getWidth(), element.getHeight(), Renderer.WHITE, element.DataObj.s)
	})
}).unregister()


function OnClose() {
	guiData.save()
	EditView.unregister()
	ButtonAction.unregister()
	registerClicked.unregister()
	registerMouseReleased.unregister()
	Dragged.unregister()
	Scrolled.unregister()
	DrawAllElements.unregister()
}