/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Dungeon from "../../BloomCore/dungeons/Dungeon"
import Settings from "../Settings"
import { MarioLikeSound, NotificationSound, ScoreSound } from "../Utilities/SoundUtils"
import { CoolSound, IsInDungeon, registerWhen, getPhase, Render, ModMessage, Alert, formatNumber } from "../utils"


// This is a hotfix for Titles sometimes not showing 
register("worldLoad", () => Client.showTitle(` `, ` `, 0, 0, 0))


const EnergyCrystalText = new Text("&9[&6&kO&r&9] &e&l⚠ &d&lC&br&dy&bs&dt&ba&dl &e&l⚠ &9[&6&kO&r&9]", Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 2 - 25).setAlign("CENTER").setScale(2.5).setShadow(true)
registerWhen(register("renderOverlay", () => EnergyCrystalText.draw(Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 2 - 25)), () => Settings().EnergyCrystalAlert && getPhase() == "p1" && Player.getInventory().getItems().find(a => a?.getName() == "§cEnergy Crystal"))



registerWhen(register(`chat`, (event) => Render.Title("&9[&6&kO&r&9] &e&l⚠ &4No Thunder Bottle &e&l⚠ &9[&6&kO&r&9]", 2.5, 3000, -Renderer.screen.getHeight()/6)
).setChatCriteria("-----------------------------\n${*} entered MM The Catacombs, Floor VII!\n-----------------------------"), 
() => Settings().NoThunderInABottleAlert && !Player.getInventory().getItems().find(a => a?.getName()?.removeFormatting() == "Empty Thunder Bottle"))






registerWhen(register("chat", () => setTimeout(() => Render.Title("&1[&6&kO&r&1] &6USE RAGNAROCK AXE! &1[&6&kO&r&1]", 2, 3000), 2000)).setChatCriteria("[BOSS] Wither King: You... again?"), () => Settings().M7Rangarock && IsInDungeon())


registerWhen(register("chat", () => {

	setTimeout(() => Render.Title("&dGYRO NOW! &bMage", 2), 13400)
	setTimeout(() => Render.Title("&dGYRO NOW! &6Arch", 2), 17000)
	setTimeout(() => Render.Title("&dGYRO NOW! &bMage", 2), 26500)
	setTimeout(() => Render.Title("&dGYRO NOW! &cBeserk", 2), 31000)
	setTimeout(() => Render.Title("&dGYRO NOW! &bMage", 2), 40000)

}).setChatCriteria("[BOSS] Sadan: So you made it all the way here... Now you wish to defy me? Sadan?!"), () => Settings().M6Gyro && IsInDungeon())


registerWhen(register("chat", (e) => {

    if (e == `[BOSS] Sadan: ENOUGH!`) Render.Title(`&6Terracota Dead!`, 2, 3000)
	else Render.Title(`&cGiants Dead!`, 2, 3000)
	World.playSound(`mob.cat.meow`, 1,1)
	World.playSound(`mob.cat.purr`, 1,1)
	

}).setCriteria(/\[BOSS] (Sadan: ENOUGH!|Sadan: You did it. I understand now, you have earned my respect.)/), () => Settings().M6Gyro)



registerWhen(register("chat", () => {
	Render.Title("&1[&6&kO&r&1] &dC&bh&de&bs&dt &bL&do&bc&dk&be&dd &1[&6&kO&r&1]", 2,3000)
	World.playSound("random.orb", 100, 4)
}).setChatCriteria("That chest is locked!"), () => Settings().LockChestAlert && IsInDungeon())


registerWhen(register("chat", () => Render.Title("&1Bonzo Mask used!", 2, 3000)).setCriteria(/Your (?:. )?Bonzo's Mask saved your life!/), () => Settings().BonzoMaskAlert)

registerWhen(register("chat", () => Render.Title("&fSpirit Mask used!", 2, 3000)).setCriteria("Second Wind Activated! Your Spirit Mask saved your life!"), () => Settings().SpiritMaskAlert)

registerWhen(register("chat", () => Render.Title("&5Phoenix Pet used!", 2, 3000)).setCriteria("Your Phoenix Pet saved you from certain death!"), () => Settings().PhoenixPetAlert)



registerWhen(register("chat", () => {

	Render.Title(`&9&lTHUNDER BOTTLE FULL`, 2, 3000)

	World.playSound("random.orb", 100, 1)
	setTimeout(() => World.playSound("random.orb", 100, 1), 800)
	setTimeout(() => World.playSound("random.orb", 100, 1), 800*2)
	setTimeout(() => World.playSound("random.orb", 100, 1), 800*3)
	setTimeout(() => World.playSound("random.orb", 100, 1), 800*4)
	setTimeout(() => World.playSound("random.orb", 100, 1), 800*5)

}).setCriteria("> Your bottle of thunder has fully charged!"), () => Settings().FullThunderBottleAlert)


register("chat", (_, name, item, coins, event) => {
   if(!Settings().SoldAHNotification) return
   
   	NotificationSound.play()
	Alert(`&b${name} &ebought: &d${item}&r &efor &6${formatNumber(parseInt(coins.replace(/,/g, "")))} Coins`, 3)
	event.setCanceled(true)

}).setCriteria(/(\[Auction] (.+) bought (.+) for (.+) coins CLICK)/)



register("chat", (item) => {
	if (!Settings().RNGMeterResetAlert) return

    Render.Title(item, 2.5, 9000)
    ScoreSound.play()

}).setCriteria(/^&d&lRNG METER! &r&aReselected the (.+?) &afor .+ &e&lCLICK HERE &r&ato select a new drop!&r$/)