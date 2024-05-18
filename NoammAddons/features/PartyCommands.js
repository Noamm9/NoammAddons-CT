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


register("command", () => {ChatLib.chat(`name: '${partyLeader}'`)}).setName("getleader")

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
    message = message.replace("Party > ", "")

    ranks.forEach( (rank) => {
        message = message.replace(rank, "")
    })

    splits = message.trim().split(":")
    username = splits[0]
    message = splits.slice(1).join(':').substring(1)
    if (

        !message.startsWith("!") 
        || PartyCommand.blacklist.includes(username.toLowerCase()) 
        || !Settings.pcEnabled 
        || Settings.pcWhitelist && !PartyCommand.whitelist.includes(username.toLowerCase()) 

    ) { return; }

    command = message.slice(1).toLowerCase()

    if (command.startsWith("m") && Settings.pcMasterFloor && command.length == 2) {
        setTimeout(() => {
            ChatLib.command("party list")
        }, 200);
        if (partyLeader != Player.name) { return; }
        try { floornum = parseInt(command[1]) } catch (e) { ChatLib.chat(`${prefix} ${command[1]} is not a number.`); return; }
        if (floornum > 7) {ChatLib.chat(`${prefix} Number must be from 1-7.`); return;}
        run = `joininstance MASTER_CATACOMBS_FLOOR_${floors[floornum]}`

        ChatLib.chat(`${[prefix]} Running /${run}`)
        setTimeout(() => {
            ChatLib.command(run)
        }, 200);
        return;
    }
    if (command.startsWith("f") && Settings.pcMasterFloor && command.length == 2) {
        setTimeout(() => {
            ChatLib.command("party list")
        }, 200);
        if (partyLeader != Player.name) { return; }
        try { floornum = parseInt(command[1]) } catch (e) { ChatLib.chat(`${prefix} ${command[1]} is not a number.`); return; }
        if (floornum > 7 || floornum < 0) {ChatLib.chat(`${prefix} Number must be from 0-7.`); return;}
        if (floornum == 0) { run = "joininstance CATACOMBS_ENTRANCE" }
        else { run = `joininstance CATACOMBS_FLOOR_${floors[floornum]}` }

        ChatLib.chat(`${[prefix]} Running /${run}`)
        setTimeout(() => {
            ChatLib.command(run)
        }, 200);
        return;
    }


    switch (command) {
        case "help":
            setTimeout(() => {
                ChatLib.command(`pc Commands: pt, w, ai, f0-7, m1-7`)     
            }, 200);
            break;
        case "pt":
            if (!Settings.pcPtme) return;
            setTimeout(() => {
                ChatLib.command(`party transfer ${username}`)
            }, 200);
            break
        case "w":
            if (!Settings.pcWarp) return;
            setTimeout(() => {
            ChatLib.command(`party warp`)
            }, 200);
            break
        case "ai":
            if (!Settings.pcAllinv) return;
            setTimeout(() => {
                ChatLib.command(`party setting allinvite`)
            }, 200);
            break;
    }


}).setCriteria("Party > ${*}")


register("command",(...args) => {
    let index = -1
    let page
    try {
        try {args[0]} catch (e) {Settings.openGUI()}
        switch (args[0]) {
            case "help":
                ChatLib.chat("help message")
                break;
            case `bl`:
                if (args[1] == undefined || args[1] != "list" && args[2] == undefined) { ChatLib.chat(`${prefix} Usage: &b/na blacklist <add/remove> <username>&r | &b/na blacklist list (page)&r`); return }
                switch (args[1]) {
                    case "add":
                        index = PartyCommand.blacklist.indexOf(args[2].toLowerCase());
                        if (index > -1) {
                            ChatLib.chat(`${prefix} &b${args[2]}&r is already in your blacklist.`)
                            return 
                        }
                        PartyCommand.blacklist.push(args[2].toLowerCase())
                        ChatLib.chat(`${prefix} Added &b${args[2]}&r to blacklist.`)
                        PartyCommand.save()
                        return;
                    case "remove":
                        if (args[2] == "all") {
                            PartyCommand.blacklist = []
                            ChatLib.chat(`${prefix} Cleared blacklist.`)
                            PartyCommand.save()
                            return;
                        }
                        index = PartyCommand.blacklist.indexOf(args[2].toLowerCase());
                        if (index > -1) { 
                            PartyCommand.blacklist.splice(index, 1);
                            ChatLib.chat(`${prefix} Removed &b${args[2]}&r from your blacklist.`)
                            PartyCommand.save()
                            return;
                        }
                        else ChatLib.chat(`${prefix} &b${args[2]}&r is not on your blacklist.`)
                        break;
                    case `l`:
                        page = 1
                        if (args[2] == undefined) {page = 1}
                        else page = args[2]
                        page = 1
                        let blacklistMessage = `&b-----&r Blacklist - ${page} &b-----`
                        bottomLine = "&b-".repeat(blacklistMessage.removeFormatting().length)
                        PartyCommand.blacklist.slice(page*5-5, page*5).forEach(name => {
                            
                            blacklistMessage += `\n${PartyCommand.blacklist.indexOf(name)+1}. ${name}`
                        });
                        blacklistMessage += `\n${bottomLine}`

                        ChatLib.chat(blacklistMessage)
                        return;
                }

            case "wl":
                if (args[1] == undefined || args[1] != "list" && args[2] == undefined) { ChatLib.chat(`${prefix} Usage: &b/na whitelist <add/remove> <username>&r | &b/na whitelist list (page)&r`); return }
                switch (args[1]) {
                    case "add":
                        index = PartyCommand.whitelist.indexOf(args[2].toLowerCase());
                        if (index > -1) {
                            ChatLib.chat(`${prefix} &b${args[2]}&r is already in your whitelist.`)
                            return 
                        }
                        PartyCommand.whitelist.push(args[2].toLowerCase())
                        ChatLib.chat(`${prefix} Added &b${args[2]}&r to whitelist.`)
                        PartyCommand.save()
                        return;
                    case "remove":
                        if (args[2] == "all") {
                            PartyCommand.whitelist = []
                            ChatLib.chat(`${prefix} Cleared whitelist.`)
                            PartyCommand.save()
                            return;
                        }
                        index = PartyCommand.whitelist.indexOf(args[2].toLowerCase());
                        if (index > -1) { 
                            PartyCommand.whitelist.splice(index, 1);
                            ChatLib.chat(`${prefix} Removed &b${args[2]}&r from your whitelist.`)
                            PartyCommand.save()
                            return;
                        }
                        else ChatLib.chat(`${prefix} &b${args[2]}&r is not on your whitelist.`)
                        break;
                    case "l":
                        page = 1
                        if (args[2] == undefined) { page = 1 }
                        else page = args[2]
                        let whitelistMessage = `&b-----&r Whitelist - ${page} &b-----`
                        bottomLine = "&b-".repeat(whitelistMessage.removeFormatting().length)
                        PartyCommand.whitelist.slice(page*5-5, page*5).forEach(name => {
                            
                            whitelistMessage += `\n${PartyCommand.whitelist.indexOf(name)+1}. ${name}`
                        });
                        whitelistMessage += `\n${bottomLine}`

                        ChatLib.chat(whitelistMessage)
                        return;
                }
    
            
            default:
                Settings.openGUI()
            
        }
        
    } catch (e) { }
}).setName("noamm").setAliases("noam", "noamaddons", "noammaddons", "na")