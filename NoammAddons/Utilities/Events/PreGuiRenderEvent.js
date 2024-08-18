/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />


import { PreGuiRenderEvent } from "../../utils"


const Listeners = []

/**
 * Registers a listener for the packetReceived event to handle window opening packets.
 * The listener passes the window title, slot count, and window ID of the opened window.
 *
 * @param {string} event - The event of the Render
 */
export function AddListener(fn) {
    Listeners.push(fn)
}


/**
 * Removes a listener from the list of window open listeners.
 *
 * @param {function} listener - The listener to remove
 */
export function RemoveListener(fn) {
    Listeners.splice(Listeners.indexOf(fn), 1)
}


register(PreGuiRenderEvent, event => 
    Listeners.forEach(fn => fn(event))
)