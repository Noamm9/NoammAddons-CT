/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />


const Listeners = []

/**
 * Registers a listener for the packetReceived event to handle window opening packets.
 * The listener passes the window title, slot count, and window ID of the opened window.
 *
 * @param {string} windowTitle - The title of the opened window
 * @param {number} slotCount - The number of slots in the opened window
 * @param {number} windowId - The ID of the opened window
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


register("packetReceived", (packet, event) => {
    const windowTitle = packet?.func_179840_c()?.func_150254_d()?.removeFormatting()
	const slotCount = packet?.func_148898_f()
	const windowId = packet?.func_148901_c()

    Listeners.forEach(fn => fn(windowTitle, slotCount, windowId, event))
}).setFilteredClass(net.minecraft.network.play.server.S2DPacketOpenWindow);
