/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { IsInDungeon } from "../utils"



register("chat", (e) => { // Watcher Alert done spawnning
    if (!Settings.WatcherAlerts || !IsInDungeon()) return
    Client.showTitle("", "&cThe Watcher has finished spawning mobs!", 0, 80, 10)
	World.playSound("ambient.weather.thunder", 1, 1);
	World.playSound("mob.cow.hurt", 1, 4)
	World.playSound("random.orb", 1, 5.5);
	World.playSound("random.orb", 1, 6);
}).setChatCriteria("[BOSS] The Watcher: That will be enough for now.").setParameter("contains")

register("chat", (e) => { // Watcher Alert done spawnning second msg
    if (!Settings.WatcherAlerts || !IsInDungeon()) return
    Client.showTitle("&1[&6&kO&r&1] &dB&bl&do&bo&dd &bD&do&bn&de &1[&6&kO&r&1]", "", 0, 80, 10)
}).setChatCriteria("[BOSS] The Watcher: You have proven yourself. You may pass.").setParameter("contains")

register("chat", (e) => { // Watcher Alert Healthy mobs
    if (!Settings.WatcherAlerts || !IsInDungeon()) return
    Client.showTitle("&aHealthy &fmobs!", "", 0, 80, 10)
}).setChatCriteria("[BOSS] The Watcher: These will be healthier than any summon I've ever created!").setParameter("contains")

register("chat", (e) => { // Watcher Alert Golden mobs
    if (!Settings.WatcherAlerts || !IsInDungeon()) return
    Client.showTitle("&6Golden &fmobs!", "", 0, 80, 10)
}).setChatCriteria("[BOSS] The Watcher: These will be adorned in the finest gold!").setParameter("contains")

register("chat", (e) => { // Watcher Alert Stormy mobs
    if (!Settings.WatcherAlerts || !IsInDungeon()) return
    Client.showTitle("&1Stormy &fmobs!", "", 0, 80, 10)
}).setChatCriteria("[BOSS] The Watcher: These will strike thunder from the sky!").setParameter("contains")

register("chat", (e) => { // Watcher Alert Stealth mobs
    if (!Settings.WatcherAlerts || !IsInDungeon()) return
    Client.showTitle("&7Stealth &fmobs!", "", 0, 80, 10)
}).setChatCriteria("[BOSS] The Watcher: These will be kinda hard to see ngl.").setParameter("contains")

register("chat", (e) => { // Watcher Alert Speedy mobs
    if (!Settings.WatcherAlerts || !IsInDungeon()) return
    Client.showTitle("&bSpeedy &fmobs!", "", 0, 80, 10)
}).setChatCriteria("[BOSS] The Watcher: These will be quick and agile!").setParameter("contains")

register("chat", (e) => { // Watcher Alert Boomer mobs
    if (!Settings.WatcherAlerts || !IsInDungeon()) return
    Client.showTitle("&cBoomer &fmobs!", "", 0, 80, 10)
}).setChatCriteria("[BOSS] The Watcher: These will be stubborn and unwilling to change!").setParameter("contains")
