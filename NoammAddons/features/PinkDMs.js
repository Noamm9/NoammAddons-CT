/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Settings"

register("chat", function(name, message, event) {
	if (!Settings.PinkDMs) return;

	if (name.endsWith("&r&7")) {
		cancel(event);
		ChatLib.chat("§dFrom "+name + "&r&d: " + ChatLib.removeFormatting(message));
	}
}).setCriteria("&dFrom &r${name}: ${message}&r");

register("chat", function(name, message, event) {
	if (!Settings.PinkDMs) return;

	if (name.endsWith("&r&7")) {
		cancel(event);
		ChatLib.chat("§dTo "+name + "&r&d: " + ChatLib.removeFormatting(message));
	}
}).setCriteria("&dTo &r${name}: ${message}&r");