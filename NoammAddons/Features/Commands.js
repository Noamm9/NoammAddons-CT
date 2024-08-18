import Command from "../Utilities/CommandHandler";
import { getPing, getTPS, ModMessage, PartyCommandsData, PlayerUtils } from "../utils";

const isValidMouseButton = (button) => ["left", "right", "middle"].includes(button.toLowerCase());

new Command("edit", () => ChatLib.command("naeditmaingui", true));

new Command("holdclick", (...args) => {
    if (!args.length || !isValidMouseButton(args[0])) {
        ModMessage('&c[ERROR]: Specify a valid mouse click type: &f"LEFT", "RIGHT", or "MIDDLE".');
        return;
    }
    setTimeout(() => PlayerUtils.HoldClick(true, args[0]), 100);
});

new Command("update", () => setTimeout(() => ChatLib.command("namoduleupdatetestxd", true), 200));

new Command("ping", () => ModMessage(`§bYour ping is:§r &d&l${getPing()}&6ms`));

new Command("tps", () => getTPS((tps) => ModMessage(`§bServer TPS is:§r &d&l${tps}`)));

new Command("blacklist", (...args) => {
    if (!args.length || !args[0]) {
        return ModMessage("Usage: &b/na blacklist <add/remove> <username>&r | &b/na blacklist list (page)&r");
    }

    const action = args[0].toLowerCase();
    const username = args[1]?.toLowerCase();

    if (action === "add") {
        if (!username) return ModMessage("&cNo username provided.");

        if (PartyCommandsData.blacklist.includes(username)) {
            return ModMessage(`&b${username}&r is already in your blacklist.`);
        }

        PartyCommandsData.blacklist.push(username);
        ModMessage(`Added &b${username}&r to blacklist.`);
        PartyCommandsData.save();
    }

    if (action === "remove") {
        if (!username) return ModMessage("&cNo username provided.");

        if (username === "all") {
            PartyCommandsData.blacklist = [];
            ModMessage("&bCleared blacklist.");
            PartyCommandsData.save();
            return;
        }

        const index = PartyCommandsData.blacklist.indexOf(username);
        if (index > -1) {
            PartyCommandsData.blacklist.splice(index, 1);
            ModMessage(`Removed &b${username}&r from your blacklist.`);
            PartyCommandsData.save();
        } else {
            ModMessage(`&b${username}&r is not on your blacklist.`);
        }
    }

    if (action === "list") {
        const page = parseInt(args[1]) || 1;
        const itemsPerPage = 5;
        const start = (page - 1) * itemsPerPage;
        const end = page * itemsPerPage;
        const listItems = PartyCommandsData.blacklist.slice(start, end);

        let message = `&b&m-----&r &8Blacklist&r &b&m- &r&6${page} &b&m-----\n`;
        listItems.forEach((item, index) => {
            message += `&d${start + index + 1}. &c${item}\n`;
        });
        const bottomLine = "&b&m-".repeat(message.removeFormatting().length - 5);
        message += bottomLine;

        ChatLib.chat(message);
    }
});

new Command("whitelist", (...args) => {
    if (!args.length || !args[0]) {
        return ModMessage("Usage: &b/na whitelist <add/remove> <username>&r | &b/na whitelist list (page)&r");
    }

    const action = args[0].toLowerCase();
    const username = args[1]?.toLowerCase();

    if (action === "add") {
        if (!username) return ModMessage("&cNo username provided.");

        if (PartyCommandsData.whitelist.includes(username)) {
            return ModMessage(`&b${username}&r is already in your whitelist.`);
        }

        PartyCommandsData.whitelist.push(username);
        ModMessage(`Added &b${username}&r to whitelist.`);
        PartyCommandsData.save();
    }

    if (action === "remove") {
        if (!username) return ModMessage("&cNo username provided.");

        if (username === "all") {
            PartyCommandsData.whitelist = [];
            ModMessage("&bCleared whitelist.");
            PartyCommandsData.save();
            return;
        }

        const index = PartyCommandsData.whitelist.indexOf(username);
        if (index > -1) {
            PartyCommandsData.whitelist.splice(index, 1);
            ModMessage(`Removed &b${username}&r from your whitelist.`);
            PartyCommandsData.save();
        } else {
            ModMessage(`&b${username}&r is not on your whitelist.`);
        }
    }

    if (action === "list") {
        const page = parseInt(args[1]) || 1;
        const itemsPerPage = 5;
        const start = (page - 1) * itemsPerPage;
        const end = page * itemsPerPage;
        const listItems = PartyCommandsData.whitelist.slice(start, end);

        let message = `&b-----&r Whitelist - ${page} &b-----\n`;
        listItems.forEach((item, index) => {
            message += `${start + index + 1}. &a${item}\n`;
        });
        const bottomLine = "&b-".repeat(message.replace(/&./g, "").length);
        message += bottomLine;

        ChatLib.chat(message);
    }
});
