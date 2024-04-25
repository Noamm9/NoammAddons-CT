/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { WorldState } from "../../Atomx/skyblock/World"

register("chat", () => { 
	if (!Settings.M7Rangarock || !WorldState.inDungeons()) return
	setTimeout(() => { Client.showTitle ("&1[&6&kO&r&1] &6USE RAGNAROCK AXE! &1[&6&kO&r&1]", "",0,100,0);World.playSound("random.orb", 100, 4) }, 2000)
}).setChatCriteria("[BOSS] Wither King: You.. again?")

register("chat", () => { // M6 Gyro timer
	if (!Settings.M6Gyro || !WorldState.inDungeons()) return
	setTimeout(() => { Client.showTitle ("&dGYRO NOW!", "&bMage",0,30,0);World.playSound("random.orb", 100, 4) }, 13400)
	setTimeout(() => { Client.showTitle ("&dGYRO NOW!", "&6Arch",0,30,0);World.playSound("random.orb", 100, 4) }, 17000)
	setTimeout(() => { Client.showTitle ("&dGYRO NOW!", "&bMage",0,30,0);World.playSound("random.orb", 100, 4) }, 26500)
	setTimeout(() => { Client.showTitle ("&dGYRO NOW!", "&cBeserk",0,30,0);World.playSound("random.orb", 100, 4) }, 31000)
	setTimeout(() => { Client.showTitle ("&dGYRO NOW!", "&bMage",0,30,0);World.playSound("random.orb", 100, 4) }, 40000)


}).setChatCriteria("[BOSS] Sadan: So you made it all the way here... Now you wish to defy me? Sadan?!")

register("chat", () => {
	if (!Settings.LockChestAlert || !WorldState.inDungeons()) return
	Client.showTitle ("&1[&6&kO&r&1] &dC&bh&de&bs&dt &bL&do&bc&dk&be&dd &1[&6&kO&r&1]", "",5,40,5)
	World.playSound("random.orb", 100, 4)
}).setChatCriteria("That chest is locked!")

register("chat", () => {
	if (Settings.BonzoMaskAlert || !WorldState.inDungeons()) {	
		Client.showTitle("&1Bonzo Mask used!", "", 0, 40, 10)
	}
}).setCriteria("Your Bonzo's Mask saved your life!")

register("chat", () => {
	if (Settings.SpiritMaskAlert) {
		Client.showTitle("&fSpirit Mask used!", "", 0, 40, 10)
	}
}).setCriteria("Second Wind Activated! Your Spirit Mask saved your life!")

register("chat", () => {
	if (Settings.PhoenixPetAlert) {
		Client.showTitle("&5Phoenix Pet used!", "", 0, 40, 10)
	}
}).setCriteria("Your Phoenix Pet saved you from certain death!")

register("chat", () => {
	if (Settings.FullThunderBottleAlert) {	
		Client.showTitle(`&9&lTHUNDER BOTTLE FULL`, "", 0, 100, 10)
		World.playSound("random.orb", 100, 1)
		setTimeout(() => {World.playSound("random.orb", 100, 1)}, 800);
		setTimeout(() => {World.playSound("random.orb", 100, 1)}, 1600);
		setTimeout(() => {World.playSound("random.orb", 100, 1)}, 800*3);
		setTimeout(() => {World.playSound("random.orb", 100, 1)}, 800*4);
		setTimeout(() => {World.playSound("random.orb", 100, 1)}, 800*5);
	}
}).setCriteria("> Your bottle of thunder has fully charged!");

