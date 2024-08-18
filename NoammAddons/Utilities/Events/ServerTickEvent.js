/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />


const Listeners = []

/**
 * Registers a listener for every Server Tick event 
 * 
 * @param {function} fn - The listener to add
*/
export function AddListener(fn) {
    Listeners.push(fn)
}


/**
 * Removes a listener from the list of window open listeners.
 *
 * @param {function} fn - The listener to remove
 */
export function RemoveListener(fn) {
    Listeners.splice(Listeners.indexOf(fn), 1)
}


register("packetReceived", () => Listeners.forEach(fn => fn())
).setFilteredClass(Java.type("net.minecraft.network.play.server.S32PacketConfirmTransaction"))

