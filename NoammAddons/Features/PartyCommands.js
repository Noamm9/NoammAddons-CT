/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Settings";
import Party from "../../BloomCore/Party";
import { ModMessage, Render, getPing, PartyCommandsData, getTPS } from "../utils";
import { CheckPartyLeader } from "../Utilities/PartyUtils";
import { NotificationSound } from "../Utilities/SoundUtils";

const commands = {}
const DELAY = 1000;
const HELP_MSG = [];
const NUMBERS_TO_TEXT = new Map([
    ['1', 'ONE'],
	['2', 'TWO'],
	['3', 'THREE'],
	['4', 'FOUR'],
	['5', 'FIVE'],
	['6', 'SIX'],
	['7', 'SEVEN'],
])

let lastTimeUsed = Date.now()
const downtimeList = []
let sentDelay = false



class PartyCommand {
    /**
     * @param {string} CommandName The name of the command
     * @param {string} settingsKey The key in the settings object that enables/disables this command
     * @param {Function} fn The function to call when the command is run
     * @param {string[]} [alias=[]] An array of aliases for this command
     */
    constructor(CommandName, settingsKey, fn, alias = []) {
        this.CommandName = CommandName
        this.settingsKey = settingsKey
        this.fn = fn
        this.alias = alias

        this.registerCommand()
    }

    isEnabled() {
        return Settings()[this.settingsKey]
    }

    registerCommand() {
        commands[this.CommandName] = (name, args) => {
            this.fn(name, args)
        }

        this.alias.forEach(alias => {
            Object.assign(commands, {
                [alias]: commands[this.CommandName]
            })
        })
    }
}



function runCommand(command, needLeader = false) {
    if (needLeader && Party.leader == null) setTimeout(CheckPartyLeader, 500);
    const timeSinceLastUse = Date.now() - lastTimeUsed;

    if (timeSinceLastUse < DELAY) {
        if (!sentDelay) {
            sentDelay = true;
            setTimeout(() => ChatLib.command(`pc Please wait ${DELAY - timeSinceLastUse}ms`), 100);
        }
        return;
    }

    if (needLeader) {
        if (Party.leader == Player.getName()) {
            setTimeout(() => ChatLib.command(command), 200);
            sentDelay = false;
            lastTimeUsed = Date.now();
        }
    }
    else {
        setTimeout(() => ChatLib.command(command), 200);
        sentDelay = false;
        lastTimeUsed = Date.now();
    }
}

const getHelpMessage = () => {
    HELP_MSG.length = 0;
    HELP_MSG.unshift("Commands: ");
    if (Settings().pcAllinv) HELP_MSG.push("allinv");
    if (Settings().pcDt) HELP_MSG.push("dt");
    if (Settings().pcFloor) HELP_MSG.push("f(0-7)");
    if (Settings().pcMasterFloor) HELP_MSG.push("m(1-7)");
    if (Settings().pcPtme) HELP_MSG.push("ptme");
    if (Settings().pcWarp) HELPMSG.push("warp");
    if (Settings().pcCoords) HELP_MSG.push("coords");
    if (Settings().pcTPS) HELP_MSG.push("tps");
    if (Settings().pcPing) HELP_MSG.push("ping");
    if (Settings().pcGay) HELP_MSG.push("gay");

    return HELP_MSG.join(", ");
};


register("chat", (name, _, command) => {
    const loweredName = name.toLowerCase()

    if (
        (!Settings().pcEnabled && loweredName !== "noamm9") ||
        (PartyCommandsData.blacklist.includes(loweredName) && loweredName !== "noamm9") ||
        (Settings().pcWhitelist && !PartyCommandsData.whitelist.includes(loweredName) && loweredName !== "noamm9")
    ) return

    const args = command.split(" ")
    const commandName = args.shift()

    if (commands[commandName]) commands[commandName](name, args)

}).setCriteria(/^Party > (?:\[[^\]]+\] )?([^\:]+): (!|\?|\.|-|@|#|`|\/)(.+)$/)
// https://regex101.com/r/G8LN83/3


register("chat", () => {
    if (downtimeList.length == 0) return
    let dtMessage = "Players Need DT: "
    downtimeList.forEach((value, index) => {
        let [username, reason] = value
        if (index == 0) dtMessage += `${username}: ${reason}`
        else dtMessage += `, ${username}: ${reason}`
    })
    setTimeout(() => {
        Render.Title("&4&lDOWNTIME!!!", 5, 5000, 10)
        NotificationSound.play()
        ChatLib.command(`pc ${dtMessage}`)
        downtimeList.length = 0
    }, 500)
}).setCriteria("                             > EXTRA STATS <")



new PartyCommand("help", "pcEnabled", () => runCommand(`pc ${getHelpMessage()}`))

new PartyCommand(`transfer`, "pcEnabled", (name) => {
    if (name === Player.getName()) return
    runCommand(`p transfer ${name}`, true);
}, ["ptme, pt"])

new PartyCommand(`warp`, "pcWarp", () => runCommand(`p warp`, true), ["w"])

new PartyCommand(`allinvite`, "pcAllinv", () => runCommand(`p allinvite`, true), ["allinv, ai"])

new PartyCommand(`coords`, "pcCoords", () => runCommand(`pc x: ${Player.getX().toFixed(0)}, y: ${Player.getY().toFixed(0)}, z: ${Player.getZ().toFixed(0)}`), ["cords"])


new PartyCommand(`m`, "pcMasterFloor", (name, floor) => {
    if (!floor || floor.length !== 2) return
    const floorNum = parseInt(floor[1])
    if (floorNum > 7 || floorNum < 0) return
    const number = NUMBERS_TO_TEXT.get(floor[1])
    runCommand(`joininstance MASTER_CATACOMBS_FLOOR_${number}`, true)
})
new PartyCommand(`f`, "pcFloor", (name, floor) => {
    if (!floor || floor.length !== 2) return
    const floorNum = parseInt(floor[1])
    if (floorNum > 7 || floorNum < 0) return
    const number = NUMBERS_TO_TEXT.get(floor[1])
    runCommand(`joininstance CATACOMBS_FLOOR_${number}`, true)
})

new PartyCommand(`tps`, "pcTPS", () => {
    ModMessage("Getting TPS&a.&e.&c.");
    getTPS((tps) => runCommand(`pc TPS: ${tps}`))
})

new PartyCommand(`ping`, "pcPing", () => runCommand(`party chat Ping: ${getPing()}ms`))

new PartyCommand(`downtime`, "pcDowntime", (name, msg) => downtimeList.push([name, msg ? msg.join(" ") : "No Reason Provided"]), ["dt"])

new PartyCommand(`gay`, "pcGay", (name, otherPlayerName) => {
    name = otherPlayerName[0] || name;
    runCommand(`party chat ${name} is ${(Math.random() * 100).toFixed(0)}% gay.`)
})