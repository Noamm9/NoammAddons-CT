import Settings from "../Config/Settings";
import PogObject from "../../PogData";
import { prefix } from "../utils";


const PartyCommand = new PogObject("NoammAddons", {
    "blacklist": [],
    "whitelist": []

}, "Config/PartyCommand.json")

const ranks = [
    "[VIP]",
    "[VIP+]",
    "[MVP]",
    "[MVP+]",
    "[MVP++]",
    "[YOUTUBE]",
    "[ADMIN]",
    "[OWNER]"
]


let partyLeader = ""
register("chat", (_name) => {
    name = _name
    ranks.forEach((rank) => {
        name = name.replace(rank, "")
    })
    partyLeader = name.replace("●", "").trim()
}).setCriteria("Party Leader: ${_name}")


const floors = {
    1: 'ONE',
    2: 'TWO',
    3: 'THREE',
    4: 'FOUR',
    5: 'FIVE',
    6: 'SIX',
    7: 'SEVEN'
}

register("chat", (event) => {
    let message = ChatLib.getChatMessage(event).removeFormatting()
    message = message.replace(new RegExp("Party > ", "g"), "")
    ranks.forEach((rank) => message = message.replace(new RegExp(rank, "g"), ""))
    let splits = message.trim().split(":")
    let username = splits[0]
    message = splits.slice(1).join(':').substring(1)
    let command = message.slice(1).toLowerCase()

    if (!message.startsWith("!") || Settings.pcBlacklist && !PartyCommand.blacklist.includes(username.toLowerCase()) || 
        !Settings.pcEnabled || Settings.pcWhitelist && !PartyCommand.whitelist.includes(username.toLowerCase())
    ) return


    if (command.startsWith("m") && Settings.pcMasterFloor && command.length == 2) {
        setTimeout(() => ChatLib.command("party list"), 200)
        if (partyLeader != Player.name) return

        try { floornum = parseInt(command[1]) } catch (e) { ChatLib.chat(`${prefix} ${command[1]} is not a number.`); return }
        if (floornum > 7) {ChatLib.chat(`${prefix} Number must be from 1-7.`); return}
        setTimeout(() => ChatLib.command(`joininstance MASTER_CATACOMBS_FLOOR_${floors[floornum]}`), 200)
    }
    if (command.startsWith("f") && Settings.pcMasterFloor && command.length == 2) {
        setTimeout(() => ChatLib.command("party list"), 200)
        if (partyLeader != Player.name) return

        try { floornum = parseInt(command[1]) } catch (e) { ChatLib.chat(`${prefix} ${command[1]} is not a number.`); return }
        if (floornum > 7 || floornum < 0) {ChatLib.chat(`${prefix} Number must be from 0-7.`); return}

        if (floornum == 0) setTimeout(() => ChatLib.command(`joininstance CATACOMBS_ENTRANCE`), 200)
        else setTimeout(() => ChatLib.command(`joininstance CATACOMBS_FLOOR_${floors[floornum]}`), 200)
    }

    if (command == "help") setTimeout(() => ChatLib.command(`pc Commands: !pt, !w, !ai, f0-7, m1-7`), 200);
    else if (Settings.pcPtme && command == "ptme" || command == "pt" || command == "transfer") setTimeout(() => ChatLib.command(`party transfer ${username}`), 200)
    else if (Settings.pcWarp && command == "warp" || command == "w") setTimeout(() => ChatLib.command(`party warp`), 200);
    else if (Settings.pcAllinv && command == "allinv" || command == "allinvite" || command == "ai") setTimeout(() => ChatLib.command(`party setting allinvite`), 200)

}).setCriteria("Party > ${*}")


register("command",(...args) => {
    let index = -1
    let page
    try {
        try {args[0]} catch (e) {Settings.openGUI()}

        if (args[0] == "help") ChatLib.chat("help message") //TO DO!
        else if (args[0] == `blacklist` || args[0] == `bl`) {
            if (args[1] == undefined || args[1] != "list" && args[2] == undefined) { ChatLib.chat(`${prefix} Usage: &b/na blacklist <add/remove> <username>&r | &b/na blacklist list (page)&r`); return }
            
            if (args[1] == "add") {
                index = PartyCommand.blacklist.indexOf(args[2].toLowerCase());
                if (index > -1) { ChatLib.chat(`${prefix} &b${args[2]}&r is already in your blacklist.`); return }
                
                PartyCommand.blacklist.push(args[2].toLowerCase())
                ChatLib.chat(`${prefix} Added &b${args[2]}&r to blacklist.`)
                PartyCommand.save()
            }
            else if (args[1] == "remove" || args[1] == `delete`) {
                if (args[2] == "all") {
                    PartyCommand.blacklist = []
                    ChatLib.chat(`${prefix} Cleared blacklist.`)
                    PartyCommand.save()
                    return
                }
                index = PartyCommand.blacklist.indexOf(args[2].toLowerCase());
                if (index > -1) { 
                    PartyCommand.blacklist.splice(index, 1);
                    ChatLib.chat(`${prefix} Removed &b${args[2]}&r from your blacklist.`)
                    PartyCommand.save()
                    return
                }
                else ChatLib.chat(`${prefix} &b${args[2]}&r is not on your blacklist.`)
            }

            else if (args[1] == "list") {
                page = 1
                if (args[2] == undefined) page = 1 
                else page = args[2]
                let blacklistMessage = `&b-----&r Blacklist - ${page} &b-----`
                let bottomLine = "&b-".repeat(blacklistMessage.removeFormatting().length)
                PartyCommand.blacklist.slice(page*5-5, page*5).forEach(name => blacklistMessage += `\n${PartyCommand.blacklist.indexOf(name)+1}. ${name}`)
                blacklistMessage += `\n${bottomLine}`
                ChatLib.chat(blacklistMessage)
                return
            }
        
        
        }
        else if (args[0] == "whitelist" || args[0] == "wl") {
            if (args[1] == undefined || args[1] != "list" && args[2] == undefined) { ChatLib.chat(`${prefix} Usage: &b/na whitelist <add/remove> <username>&r | &b/na whitelist list (page)&r`); return }
            
            if (args[1] == "add") {
                index = PartyCommand.whitelist.indexOf(args[2].toLowerCase());
                if (index > -1) {ChatLib.chat(`${prefix} &b${args[2]}&r is already in your whitelist.`); return } 
                PartyCommand.whitelist.push(args[2].toLowerCase())
                ChatLib.chat(`${prefix} Added &b${args[2]}&r to whitelist.`)
                PartyCommand.save()
                return
            }
            
            else if (args[1] == `remove` || args[1] == `delete`) {
                if (args[2] == "all") {
                    PartyCommand.whitelist = []
                    ChatLib.chat(`${prefix} Cleared whitelist.`)
                    PartyCommand.save()
                    return
                }
                index = PartyCommand.whitelist.indexOf(args[2].toLowerCase());
                if (index > -1) { 
                    PartyCommand.whitelist.splice(index, 1);
                    ChatLib.chat(`${prefix} Removed &b${args[2]}&r from your whitelist.`)
                    PartyCommand.save()
                    return
                }
                else ChatLib.chat(`${prefix} &b${args[2]}&r is not on your whitelist.`)
            }
        
            else if (args[0] == `list`) {
                page = 1
                if (args[2] == undefined) page = 1
                else page = args[2]
                let whitelistMessage = `&b-----&r Whitelist - ${page} &b-----`
                bottomLine = "&b-".repeat(whitelistMessage.removeFormatting().length)
                PartyCommand.whitelist.slice(page*5-5, page*5).forEach(name => whitelistMessage += `\n${PartyCommand.whitelist.indexOf(name)+1}. ${name}`)
                whitelistMessage += `\n${bottomLine}`
                ChatLib.chat(whitelistMessage)
                return
            }
        } else Settings.openGUI()
    } catch (e) { }
}).setName("noamm").setAliases("noam", "noamaddons", "noammaddons", "na")