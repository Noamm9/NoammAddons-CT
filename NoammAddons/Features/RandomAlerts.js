/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { CoolSound, IsInDungeon, registerWhen, getPhase } from "../utils"

register("worldLoad", () => {
    Client.showTitle(` `, ` `, 2, 1, 2)
})
// This is a hotfix for Tittles sometimes not showing 


const text = new Text("&9[&6&kO&r&9] &e&l⚠ &d&lC&br&dy&bs&dt&ba&dl &e&l⚠ &9[&6&kO&r&9]", Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 2 - 25).setAlign("CENTER").setScale(2.5).setShadow(true)
registerWhen(register("renderOverlay", () => text.draw(Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 2 - 25)), () => Settings.EnergyCrystalAlert && getPhase() == "p1" && Player.getInventory().getItems().find(a => a?.getName() == "§cEnergy Crystal"))


register("chat", () => { 
	if (!Settings.M7Rangarock || !IsInDungeon()) return
	setTimeout(() => { Client.showTitle ("&1[&6&kO&r&1] &6USE RAGNAROCK AXE! &1[&6&kO&r&1]", "",0,100,0);World.playSound("random.orb", 100, 4) }, 2000)
}).setChatCriteria("[BOSS] Wither King: You... again?")

register("chat", () => { // M6 Gyro timer
	if (!Settings.M6Gyro || !IsInDungeon()) return

	setTimeout(() => { Client.showTitle ("&dGYRO NOW!", "&bMage",0,30,0);World.playSound("random.orb", 100, 4) }, 13400)
	setTimeout(() => { Client.showTitle ("&dGYRO NOW!", "&6Arch",0,30,0);World.playSound("random.orb", 100, 4) }, 17000)
	setTimeout(() => { Client.showTitle ("&dGYRO NOW!", "&bMage",0,30,0);World.playSound("random.orb", 100, 4) }, 26500)
	setTimeout(() => { Client.showTitle ("&dGYRO NOW!", "&cBeserk",0,30,0);World.playSound("random.orb", 100, 4) }, 31000)
	setTimeout(() => { Client.showTitle ("&dGYRO NOW!", "&bMage",0,30,0);World.playSound("random.orb", 100, 4) }, 40000)

}).setChatCriteria("[BOSS] Sadan: So you made it all the way here... Now you wish to defy me? Sadan?!")

register("chat", () => {
    if(!Settings.M6Gyro) return
    Client.showTitle(`&6Terracota Dead!`, ` `, 2, 25, 2)
	World.playSound(`mob.cat.meow`)
	World.playSound(`mob.cat.purr`)
}).setCriteria("[BOSS] Sadan: ENOUGH!")

register("chat", () => {
    if(!Settings.M6Gyro) return
    Client.showTitle(`&cGiants Dead!`, ` `, 2, 25, 2)
	World.playSound(`mob.cat.meow`)
	World.playSound(`mob.cat.purr`)
}).setCriteria("[BOSS] Sadan: You did it. I understand now, you have earned my respect.")

register("chat", () => {
	if (!Settings.LockChestAlert || !IsInDungeon()) return
	Client.showTitle ("&1[&6&kO&r&1] &dC&bh&de&bs&dt &bL&do&bc&dk&be&dd &1[&6&kO&r&1]", "",5,40,5)
	World.playSound("random.orb", 100, 4)
}).setChatCriteria("That chest is locked!")

register("chat", () => {
	if (Settings.BonzoMaskAlert) {	
		Client.showTitle("&1Bonzo Mask used!", "", 0, 40, 10)
	}
}).setCriteria(/Your (?:. )?Bonzo's Mask saved your life!/)

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

register("chat", (name, item, coins) => {
    if(!Settings.ahbuyping) return
	World.playSound(`mob.cat.meow`)
	World.playSound(`mob.cat.purr`)
}).setCriteria("[Auction] ${name} bought ${item} for ${coins} coins CLICK")

