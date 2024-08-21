
/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />


const Listeners = []


/**
 * Registers a listener for the packetReceived event to handle window opening packets.
 * The listener passes the window title, slot count, and window ID of the opened window.
 *
 * @param {BlockPos} blockPos - The title of the opened window
 * @param {BlockState} blockState - The number of slots in the opened window
 * @param {string} event - The ID of the opened window
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


register("packetReceived", (packet, event) => {
    const blockPos = packet.func_179827_b()
    const blockState = packet.func_180728_a()

    Listeners.forEach(fn => fn(blockPos, blockState, event))
}).setFilteredClass(Java.type("net.minecraft.network.play.server.S23PacketBlockChange"))



