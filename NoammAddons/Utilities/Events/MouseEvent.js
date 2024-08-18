/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />


const Listeners = []


/**
 * Registers a listener for the mouse event to handle mouse events.
 *
 * @param {int} MouseX (int): The x position of the mouse.
 * @param {int} MouseY (int): The y position of the mouse.
 * @param {int} MouseDx (int): The change in x position of the mouse.
 * @param {int} MouseDy (int): The change in y position of the mouse.
 * @param {int} button (int): The button that was pressed (0 = left, 1 = right, 2 = middle).
 * @param {boolean} buttonstate (bool): Whether the button was pressed (true) or released (false).
 * @param {int} Dwheel (int): The amount of scroll wheel movement (positive for scrolling up, negative for down).
 * @param {string} event (object): The mouse event object.
*/
export function AddListener(fn) {
    Listeners.push(fn);
}


/**
 * Removes a listener from the list of window open listeners.
 *
 * @param {function} listener - The listener to remove
 */
export function RemoveListener(fn) {
    Listeners.splice(Listeners.indexOf(fn), 1)
}


register(Java.type("net.minecraftforge.client.event.MouseEvent"), event => {
    const MouseX = event.getX()
    const MouseY = event.getY()
    const MouseDx = event.getDx()
    const MouseDy = event.getDy()
    const button = event.getButton()
    const buttonstate = event.isButtonstate()
    const Dwheel = event.getDwheel()

    Listeners.forEach(fn => fn(MouseX, MouseY, MouseDx, MouseDy, button, buttonstate, Dwheel, event))
})

