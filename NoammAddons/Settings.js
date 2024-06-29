import {  @ButtonProperty, @PercentSliderProperty, @CheckboxProperty, @ColorProperty, @SelectorProperty, @SwitchProperty, @Vigilant, @SliderProperty, @TextProperty, Color } from "../Vigilance"
import { DisconnectFromServer, RickRoll } from "./utils"


@Vigilant("NoammAddons\\Config", "§d§l§nNoamm§b§l§nAddons", {
    getCategoryComparator: () => (a, b) => {
        const categories = [
            "General",
            "Dungeons", 
            "Alerts", 
            "Cosmetic"
        ];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }/*,
    getSubcategoryComparator: () => (a, b) => {
        const subcategories = [
        ];
        return subcategories.indexOf(a.name) - subcategories.indexOf(b.name);
    },
    getPropertyComparator: () => (a, b) => {
        const names = [

        ];
        return names.indexOf(a.name) - names.indexOf(b.name);
    }*/
})


class Settings {

    @ButtonProperty({
        name: "Discord Server",
        description: "Join if you want to report a bug or want to make a suggestion",
        category: "General",
        subcategory: "",
        placeholder: "                [ Click me! ]              "
    })
    MyDiscord() {
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
    }

    @ButtonProperty({
        name: "Edit Gui locations",
		description: "&fClick on an element and drag it to change its location.\n&fClick and Hold than Scroll to incrase/decrese the size of an Element. ",
		category: "General",
        placeholder: "                [ Click me! ]              "
    })
    EGUIButtonAction() {
        Client.currentGui.close()
        setTimeout(() => ChatLib.command("naeditmaingui", true) , 100)
    }








    
/*    @SwitchProperty({
        name: "&l&cI HATE CARPETS",
        description: "Replace all Carpet blocks in a radius of 3 block from the Player to AirBlocks to avoid useless LagBacks",
        category: "Dungeons",
        subcategory: "Dungeons"
    })
    IHateCarpets = false; */
    
    @SwitchProperty({
        name: "&c&lI HATE DIORITE",
        description: "Replace the Diorite blocks at the P2 to Glass blocks in older to see Storm get Crushed better (Alternative to trying to see his name tag through the blocks)",
        category: "Dungeons",
        subcategory: "F7"
    })
    IHateDiorite = false
    
    @SwitchProperty({
        name: "&eBetter &3Ender Pearls",
        description: "Disable's Hypixel's stupid Ender Pearls throw block when you are too close to a wall/floor/ceiling",
        category: "Dungeons",
        subcategory: "Ender Pearls"
    })
    BetterEnderPearls = false

    @SwitchProperty({
        name: `Announce &fSpirit &bLeaps`,
        description: "Says in party chat who did you leaped to",
        category: "Dungeons",
        subcategory: "Spirit Leaps"
    })
    AnnounceSpiritLeaps = false

    @TextProperty({
        name: 'Announced &6Massage',
        description: "The Message that will be sent every time you leapd to someone.\n You can use {name} to get the leaped player's name",
        category: 'Dungeons',
        subcategory: 'Spirit Leaps',
        placeholder: ''
    })
    AnnouncedLeapMassage = 'I TP to {name}';

	@SwitchProperty({
        name: "&bLegit Ghost Pickaxe",
        description: "&fThis is meant for people that lock all of their the inventory slots and are too lazy to unlock them every time they want to create a ghost pickaxe &l(Controlled by a keybind within Options/Controls)",
        category: "Dungeons",
        subcategory: ""
    })
	LegitGhostPickaxe = false

    @SelectorProperty({
        name: "&bPickaxe &eMode",
        description: "",
        category: "Dungeons",
        subcategory: "",
        options: [
            "Toggleable Ghost Pick",
            "Mimic efficiency 10",
            "Both options 1 & 2"

        ]
    })
    PickaxeMode = 0;

    @SwitchProperty({
        name: "&aRemove Sword Block",
        description: "&fEnables Minecraft 1.9 RightClick animation to the following swords: All Wither blades, Rogue Sword, wither cloak, Aspect of the end, All Jerry Swords, All VoidGloom Katanas, Aspect of the Dragons",
        category: "Cosmetic",
        subcategory: "Visuals"
    })
    NoSwordBlock = false

    @SwitchProperty({
        name: "&cM7 &0Dragon&r Box",
        description: "Draws a very accurate &0Dragon&r Kill Box for &cM7&r-&fP5",
        category: "Dungeons",
        subcategory: "F7"
    })
	M7DragBox = false

    @SwitchProperty({
        name: "&cM7 &0Dragon&f Spawn &eTimer",
        description: 'Draws a "Accurate" &0Dragon&r Spawn &eTimer&r for &cM7&r-&fP5',
        category: "Dungeons",
        subcategory: "F7"
    })
	M7DragTimer = false

    @SwitchProperty({
        name: "Auto &eRefill &3Ender Pearls",
        description: 'Automatically &eRefill &3Ender Pearls&r from sack at the start of a dungeon run (does not work properly if you have spirit leaps in inventory)',
        category: "Dungeons",
        subcategory: "Ender Pearls"
    })
	AutoRefillEnderPearls = false

    @SwitchProperty({
        name: "&dDungeon Auto Extra Stats",
        description: "Automatically types the command to show extra the extra dungeon stats at the end of the run",
        category: "Dungeons",
        subcategory: ""
    })
    DungeonAutoExtraStats = false

	@SwitchProperty({
        name: "&eCustom &dFOV",
        description: "&fAllows to set Custom Minecraft FOV (Field of View)",
        category: "Cosmetic",
        subcategory: "Visuals"
    })
	CustomFOV = false

    @SliderProperty({
        name: "&bFOV",
        description: "",
        category: "Cosmetic",
        subcategory: "Visuals",
        min: 30,
        max: 179
    })
    FOV = Client.settings.getFOV();

    @SwitchProperty({
        name: "&fDungeon &eMob &6ESP",
        description: "Draw a see through wall box around stared dungeon mobs",
        category: "Dungeons",
        subcategory: "ESP"
    })
	DungeonMobESP = false

    @SelectorProperty({
        name: '&dE&bS&dP &6Mode',
        description: 'Select an option',
        category: "Dungeons",
        subcategory: 'ESP',
        options: [
            'Box', 
            'Overlay',
            `Box + Overlay`
        ]
    })
    MobESPMode = 0;

    @ColorProperty({
        name: '&dE&bS&dP &2C&3o&4l&5o&6r&r',
        description: 'Select an option for the Dungeon Mob ESP box &2C&3o&4l&5o&6r&r',
        category: "Dungeons",
        subcategory: 'ESP'
    })
    MobESPColor = new Color(0,1,0,1)

    @SwitchProperty({
        name: '&5Shadow Assasian &fAlert',
        description: 'Shows a notification on screen when an invinsable &5Shadow Assasian&r is about to teleport',
        category: 'Alerts',
        subcategory: 'Dungeons'
    })
    ShadowAssasianAlert = false

    @SwitchProperty({
        name: '&cF7/&4M7 &aPhase &dStart &eTimers',
        description: 'Global Toggle',
        category: 'Dungeons',
        subcategory: 'Timers'
    })
    F7M7PhaseStartTimers = false

    @CheckboxProperty({
        name: '&5P1 &fStart &eTimer',
        description: 'Shows a Timer on screen when &5&nMaxor Phase&r will start',
        category: 'Dungeons',
        subcategory: 'Timers'
    })
    P1StartTimer = true

    @CheckboxProperty({
        name: '&bP2 &fStart &eTimer',
        description: 'Shows a Timer on screen when &b&nStorm Phase&r will start',
        category: 'Dungeons',
        subcategory: 'Timers'
    })
    P2StartTimer = true

    @CheckboxProperty({
        name: '&7P3 &fStart &eTimer',
        description: 'Shows a Timer on screen when &7&nGoldor Phase&r will start',
        category: 'Dungeons',
        subcategory: 'Timers'
    })
    P3StartTimer = true

    @CheckboxProperty({
        name: '&cP4 &fStart &eTimer',
        description: 'Shows a Timer on screen when &4&nNecron Phase&r will start',
        category: 'Dungeons',
        subcategory: 'Timers'
    })
    P4StartTimer = true
/*
    @CheckboxProperty({
        name: '&4P5 &fStart &eTimer', //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
        description: 'Shows a Timer on screen when &5&nWither King Phase&r will start', //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
        category: 'Dungeons', //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
        subcategory: 'Timers' //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    })
    P5StartTimer = true*/

	@SwitchProperty({
        name: "&dPink&r DMs",
        description: "&fChanges the Color of the Private massage in Hypixel from &7Gray &fto &dPink",
        category: "Cosmetic",
        subcategory: "Visuals"
    })
	PinkDMs = false

    @SwitchProperty({
        name: "&eHide &cFalling &eBlocks",
        description: "Hides Falling Blocks in order to improve fps",
        category: "Cosmetic",
        subcategory: "Visuals"
    })
    HideFallingBlocks = false

	@SwitchProperty({
        name: "&cRemove&r &aSelfie&f Camera",
        description: "&cRemoves&r The &aSelfie&r Mode From F5",
        category: "Cosmetic",
        subcategory: "Visuals"
    })
	RemoveSelfieCamera = false

	@SwitchProperty({
        name: "&9Bonzo Mask&r &eTimer&r",
        description: 'Draws a very accurate Display that shows the cooldown of the &9Bonzo &cMask&r "Clownin Around" &eAbility&r',
        category: "Dungeons",
        subcategory: "Timers"
    })
	BonzoMaskTimer = false
	
	@SwitchProperty({
        name: "&fSpirit Mask&r &eTimer&r",
        description: 'Draws a very accurate Display that shows the cooldown of the &fSpirit Mask&r "Second Wind" &eAbility&r',
        category: "Dungeons",
        subcategory: "Timers"
    })
	SpiritMaskTimer = false

	@SwitchProperty({
        name: "&5Phoenix Pet&r &eTimer&r",
        description: 'Draws a very accurate Display that shows the cooldown of the &5Phoenix Pet&r "Rekindle" &eAbility&r',
        category: "Dungeons",
        subcategory: "Timers"
    })
	PhoenixPetTimer = false

	@SwitchProperty({ 
		name: "&dShort &bSky&dBlock &bCommands",
		description: "Enables a list of useful &dshort&r version of &bsky&dblock's &bcommands&r (type /ssbc for help)",
        category: "General",
        subcategory: "Chat"
    })
	ShortSkyBlockCommands = false

	@SwitchProperty({ 
		name: "&cWatcher&r Alerts",
		description: "Shows on screen when the &cWatcher&r has finish spawning mobs and when blood is done",
        category: "Alerts",
        subcategory: "Dungeons"
    })
	WatcherAlerts = false

	@SwitchProperty({ 
		name: "M7 &6Ragnarock Axe&r Alert",
		description: "Shows on screen when to use &6Ragnarock Axe&r before p5 starts",
        category: "Alerts",
        subcategory: "Dungeons"
    })
	M7Rangarock = false

	@SwitchProperty({ 
		name: "&cM6 &dGyro&r Alerts",
		description: "Shows on screen when to &dGyro at Terracotta phase\n\n &l&bWIP",
        category: "Alerts",
        subcategory: "Dungeons"
    })
	M6Gyro = false

	@SwitchProperty({ 
		name: "&dLock &bChest &fAlert",
		description: "Shows on screen when the chest you tried to open is locked",
        category: "Alerts",
        subcategory: "Dungeons"
    })
	LockChestAlert = false

	@SwitchProperty({ 
		name: "&9Bonzo Mask&r Alert",
		description: "Shows on screen when the &9Bonzo &cMask&r &eAbility&r has been used",
        category: "Alerts",
        subcategory: ""
    })
	BonzoMaskAlert = false

	@SwitchProperty({ 
		name: "&fSpirit Mask&r Alert",
		description: "Shows on screen when the &fSpirit &fMask&r &eAbility&r has been used",
        category: "Alerts",
        subcategory: ""
    })
	SpiritMaskAlert = false

	@SwitchProperty({ 
		name: "&5Phoenix Pet&r Alert",
		description: "Shows on screen when the &5Phoenix &5Pet&r &eAbility&r has been used",
        category: "Alerts",
        subcategory: ""
    })
	PhoenixPetAlert = false

	@SwitchProperty({ 
		name: "&cArrows&r Alert",
		description: "Shows on screen when you need to get more &cArrows&r",
        category: "Alerts",
        subcategory: ""
    })
	ArrowsAlert = false

	@SwitchProperty({
        name: "§5Full Thunder Bottle Alert",
        description: "Shows a notification on screen when the Empty Thunder Bottle filled to the end",
        category: "Alerts",
        subcategory: ""
    })
    FullThunderBottleAlert = false
/*
    @SwitchProperty({
        name: "&cNecron Dropping &eTimer",
        description: "Shows a Timer on screen when Necron will drop you to the Lava at F7/M7 P4",
        category: "Dungeons",
        subcategory: "Timers"
    })
    NecronDroppingTimer = false

    @ButtonProperty({
        name: "§eMove&r &cNecron Dropping&r &eTimer&r",
        description: "&fEdit the &cNecron Dropping&r &eTimer&r's &fPosition and Scale &l(Drag the text to move it, Scroll with the mouse wheel to change the scale of the text) &r&dMake sure that the Toggle is enable before you try to use this option else it wont work",
        category: "HUD",
        subcategory: "Timers",
        placeholder: "MOVE"
    })
    NDTButtonAction() {
        if (this.NecronDroppingTimer) {
            Client.currentGui.close()
            setTimeout(() => {
                ChatLib.command("necrondroptimer", true) 
            }, 100)
        }
    }
    */
    @SwitchProperty({
        name: "§n&9Block Overlay",
        description: "No need, Surely you know what this feature does",
        category: "Cosmetic",
        subcategory: "Block Overlay"
    })
    BlockOverlay = false
    
    @SelectorProperty({
        name: "&9Block Overlay &eType",
        description: "How to highlight the block",
        category: "Cosmetic",
        subcategory: "Block Overlay",
        options: [
            "Outline",
            "Overlay",
            "Outline + Overlay"
        ]
    })
    BlockOverlayType = 3;
    
    @SliderProperty({
        name: "Outline Thickness",
        description: "",
        category: "Cosmetic",
        subcategory: "Block Overlay",
        min: 1,
        max: 10
    })
    BlockOverlayOutlineThickness = 5;
    
    @ColorProperty({
        name: "Outline &2C&3o&4l&5o&6r&r",
        description: "The &2C&3o&4l&5o&6r&r of the Outline",
        category: "Cosmetic",
        subcategory: "Block Overlay"
    })
    BlockOverlayOutlineColor = new Color(0, 1, 0, 1)
    
    @ColorProperty({
        name: "Overlay &2C&3o&4l&5o&6r&r",
        description: "The &2C&3o&4l&5o&6r&r of the Overlay",
        category: "Cosmetic",
        subcategory: "Block Overlay"
    })
    BlockOverlayOverlayColor = new Color(0, 1, 0, 0.35)
    
    @CheckboxProperty({
        name: '&6Show Through Blocks?',
        description: '',
        category: 'Cosmetic',
        subcategory: 'Block Overlay'
    })
    BlockOverlayESP = true
    
    @SwitchProperty({
        name: "&aDungeon &6Team&amates &6Name&atag",
        description: "draws your TeamMates Name and Class as a big NameTag that you can See through walls.",
        category: "Dungeons",
        subcategory: "Teammates"
    })
    TeammatesNametag = false

    @SelectorProperty({
        name: "&aDungeon &6Team&amates &6Name&atag &eMode",
        description: "",
        category: "Dungeons",
        subcategory: "Teammates",
        options: [
            "Class Color",
            "Player's Rank"
        ]
    })
    TeammatesNametagMode = 0;

    @SwitchProperty({
        name: "&aDungeon &6Team&amates &6Box",
        description: "Renders a 2D box on the screen that visually represents the positions of your teammates.",
        category: "Dungeons",
        subcategory: "Teammates"
    })
    TeammatesBox = false

    @SelectorProperty({
        name: "&aDungeon &6Team&amates &6Box &eMode",
        description: "",
        category: "Dungeons",
        subcategory: "Teammates",
        options: [
            "Class Color",
            "Player's Rank"
        ]
    })
    TeammatesBoxMode = 0;

    @SwitchProperty({
        name: "&aCustom &bSlot &d&lHighlight",
        description: "Changes the &2C&3o&4l&5o&6r&r and the opacity of Minecraft Vanilla slot highlight\n\n&c&lCurrently does not work with sba for some reason ",
        category: "Cosmetic",
        subcategory: "Visuals"
    })
    CustomSlotHighlight = false

    @ColorProperty({
        name: "&bSlot &d&lHighlight&r &2C&3o&4l&5o&6r&r",
        description: "The &2C&3o&4l&5o&6r&r of the Overlay",
        category: "Cosmetic",
        subcategory: "Visuals"
    })
    CustomSlotHighlightColor = new Color(0,1,0,1)

    @SwitchProperty({
        name: "§cBlood §bDialouge §eSkip",
        description: "&fMakes a timer for &n24 seconds&r&f after you open the &5blood room \n\n&b&lTip: &c&lYou need to be in blood when timer ends",
        category: "Dungeons",
        subcategory: "Timers"
    })
    BloodDialougeSkip = false

    @SwitchProperty({
        name: "&aChat Coords &d2 WayPoint",
        description: "Creates a waypoint whenever a recieved chat message matches\n\n&bx: 1, y: 1, z: 1",
        category: "General",
        subcategory: "Chat"
    })
    ChatCoordsWayPoint = false

    @ColorProperty({
        name: "&dWay&bPoint &2C&3o&4l&5o&6r&r",
        description: "The &2C&3o&4l&5o&6r&r of the waypoint",
        category: "General",
        subcategory: "Chat"
    })
    ChatCoordsWayPointColor = new Color(0, 0, 0, 1)

    
    @SwitchProperty({
        name: `&6Player &4Scale`,
        description: `Allows to dynamically adjust the size of the player character's scale from the default 100% down to 30%. `,
        category: "Cosmetic",
        subcategory: "Player"
    })
    PlayerScale = false
    
    @PercentSliderProperty({
        name: "&eCustom &4Scale",
        description: "",
        category: "Cosmetic",
        subcategory: "Player",
    })  
    CustomPlayerScale = 1;
/*
    @CheckboxProperty({ 
        name: "Should I Scale everyone?",
        description: "",
        category: "Cosmetic",
        subcategory: "Player"
    })
    ScaleOnEveryone = false;
*/
    @SwitchProperty({
        name: `&bPlayer &aSpin`,
        description: `Client-side feature that allows players to make their in-game avatar spin in place. This visual effect is only visible to the player using the module and does not affect the view or gameplay of other players on the server.`,
        category: "Cosmetic",
        subcategory: "Player"
    })
    ClientSideSpin = false

    @SelectorProperty({
        name: "&aSpin &ediraction",
        description: "",
        category: "Cosmetic",
        subcategory: "Player",
        options: [
            "Right",
            "Left"
        ]
    })
    SpinDiraction = 0;

    @SliderProperty({
        name: "&sSpin &9speed",
        description: "",
        category: "Cosmetic",
        subcategory: "Player",
        min: 30,
        max: 200
    })
    SpinSpeed = 50;

    @CheckboxProperty({ 
        name: "Should I spin everyone?",
        description: "",
        category: "Cosmetic",
        subcategory: "Player"
    })
    SpinOnEveryone = false;

    @SwitchProperty({
        name: "&dHebrew&r &62 &bEnglish",
        description: "Automatically converts Hebrew characters to their corresponding English characters based on a predefined mapping.",
        category: "General",
        subcategory: "Chat"
    })
    HebrewToEnglish = false

    @SwitchProperty({
        name: "&6Chat &dEmojis",
        description: "&6[MVP&c++&6]&r &dChat &bEmojis",
        category: "General",
        subcategory: "Chat"
    })
    ChatEmojis = false

    @SwitchProperty({
        name: "&dTime &bChanger",
        description: "                &a&l^",
        category: "Cosmetic",
        subcategory: "Visuals"
    })
    TimeChanger = false

    @SelectorProperty({
        name: "&dTime &eMode",
        description: "",
        category: "Cosmetic",
        subcategory: "Visuals",
        options: [
            "Day",
            "Night",
            "Noon",
            "Midnight",
            "Sunrise",
            "Sunset"
        ]
    })
    TimeChangerMode = 0;

    @SwitchProperty({
        name: `&bInventory &dSearch &6Bar`,
        description: "                &a&l^\nSame as NEU's one",
        category: "Cosmetic",
        subcategory: "Visuals"
    })
    InventorySearchBar = false

    @SwitchProperty({
        name: "&9&lM&a&la&c&li&d&ln &b&lT&6&lo&e&lg&f&lg&0l&4&le",
        description: "If this is off all features below will be off.",
        category: "General",
        subcategory: "Party Commands"
    })
    pcEnabled = false;


    @SwitchProperty({ 
        name: "&f&lWhitelist",
        description: "WhiteList for PartyCommands, Only usernames who have been added to the whitelist can use commands\n/na wl add {name}.",
        category: "General",
        subcategory: "Party Commands"
    })
    pcWhitelist = false

    @SwitchProperty({ 
        name: "&0&lBlacklist",
        description: "...",
        category: "General",
        subcategory: "Party Commands"
    })
    pcBlacklist = true

    @CheckboxProperty({
        name: "&e!ptme",
        description: "Transfer the party to you.\n&bAliases: transfer, pt",
        category: "General",
        subcategory: "Party Commands"
    })
    pcPtme = false

    @CheckboxProperty({
        name: "&6!warp",
        description: "Warp the party.\n&bAlias: w",
        category: "General",
        subcategory: "Party Commands"
    })
    pcWarp = true

    @CheckboxProperty({
        name: "&d!allinvite",
        description: "Enable all invite.\n&bAliases: allinv, ai",
        category: "General",
        subcategory: "Party Commands"
    })
    pcAllinv = true

    @CheckboxProperty({
        name: "!f&a0&r-&c7",
        description: `Join catacombs dungeons.`,
        category: "General",
        subcategory: "Party Commands"
    })
    pcFloor = true

    @CheckboxProperty({
        name: "!m&c1&r-&47",
        description: `Join mastermode catacombs dungeons.`,
        category: "General",
        subcategory: "Party Commands"
    })
    pcMasterFloor = true
    
    @SwitchProperty({
        name: "&5&lHealer &e&lWish!",
        description: "",
        category: "Dungeons",
        subcategory: "Healer Wish",
    })
    healerWish = true

    @TextProperty({
        name: "&5Healer &eWish! &bMessage",
        description: "",
        category: "Dungeons",
        subcategory: "Healer Wish",
    })
    healerWishMessage = "Wish!";

    @TextProperty({
        name: "&5&nHealer&r &e&nWish!&r &b&nTitle&r &b&nMessage",
        description: "",
        category: "Dungeons",
        subcategory: "Healer Wish",
    })
    healerWishTitle = "§9[§6§kO§r§9] §e§l⚠ §d§lW§bi§ds§bh§d! §e§l⚠ §9[§6§kO§r§9]";

    @SwitchProperty({
        name: "&f&lBetter&r &4&lM7&r",
        description: `Auto Place Ghost Blocks in some places at the boss fight area`,
        category: "Dungeons",
        subcategory: "F7"
    })
    BetterM7 = false












    @SwitchProperty({
		name: "§bIcefill §6Solver",
		description: "",
		category: "Dungeons",
        subcategory: "Solvers"
	})
	IcefillSolver = false

    @ColorProperty({
        name: "§bIcefill §6Solver &2C&3o&4l&5o&6r&r",
        description: "The &2C&3o&4l&5o&6r&r of the §bIcefill §6Solver",
        category: "Dungeons",
        subcategory: "Solvers"
    })
    IcefillSolverColor = new Color(0, 0, 0, 1)

    @SwitchProperty({
        name: "&bBoulder &dSolver",
        description: "",
        category: "Dungeons",
        subcategory: "Solvers"
    })
    BoulderSolver = false 

    @ColorProperty({
        name: "&6Boulder &bSolver &2C&3o&4l&5o&6r&r",
        description: "The &2C&3o&4l&5o&6r&r of the &bBoulder &dSolver",
        category: "Dungeons",
        subcategory: "Solvers"
    })
    BoulderSolverColor = new Color(0, 0, 0, 20/100)

    @SwitchProperty({
        name: "&aThree &6Weirdos &cSolver",
        description: "",
        category: "Dungeons",
        subcategory: "Solvers"
    })
    ThreeWeirdosSolver = false

    @ColorProperty({
        name: "&aThree &6Weirdos &cSolver &2C&3o&4l&5o&6r&r",
        description: "The &2C&3o&4l&5o&6r&r' of the &aThree &6Weirdos &cSolver",
        category: "Dungeons",
        subcategory: "Solvers"
    })
    ThreeWeirdosSolverColor = new Color(0, 114/255, 1, 0.35)

    @SwitchProperty({
        name: "&eBlaze &dSolver",
        description: "",
        category: "Dungeons",
        subcategory: "Solvers"
    })
    BlazeSolver = false

    @ColorProperty({
        name: "First Blaze Color",
        description: "The &2C&3o&4l&5o&6r&r' of the &eBlaze &dSolver",
        category: "Dungeons",
        subcategory: "Solvers"
    })
    BlazeSolverFirstBlazeColor = new Color(0, 114/255, 1, 0.35)

    @ColorProperty({
        name: "Second Blaze Color",
        description: "The &2C&3o&4l&5o&6r&r' of the &eBlaze &dSolver",
        category: "Dungeons",
        subcategory: "Solvers"
    })
    BlazeSolverSecondBlazeColor = new Color(1, 239/255, 0, 0.35)

    @ColorProperty({
        name: "Third Blaze Color",
        description: "The &2C&3o&4l&5o&6r&r' of the &eBlaze &dSolver",
        category: "Dungeons",
        subcategory: "Solvers"
    })
    BlazeSolverThirdBlazeColor = new Color(1, 0, 0, 0.35)

    @ColorProperty({
        name: "Blaze Solver Line Color",
        description: "The &2C&3o&4l&5o&6r&r' of the &eBlaze &dSolver",
        category: "Dungeons",
        subcategory: "Solvers"
    })
    BlazeSolverLineColor = new Color(1, 1, 1, 1)


    @SwitchProperty({
        name: "&5Livid &aSolver",
        description: "",
        category: "Dungeons",
        subcategory: "Solvers"
    })
    LividSolver = false

    @CheckboxProperty({
        name: "&6Hide &cWrong &5Livids?",
        description: "Sometimes it breaks the &5Livid &aSolver, still &cW.I.P",
        category: "Dungeons",
        subcategory: "Solvers"
    })
    HideWrongLivids = false


    @SwitchProperty({
        name: "&a&lAuto I4",
        description: "&fAuto aims and shoots the emerald block at the forth dev in P3&r \n\n &f[ &b&nNeed a term&r &f&n&land&r &e&n100 atk speed&r &f] ",
        category: "Dungeons",
        subcategory: "F7"
    })
    AutoI4 = false


















    @SwitchProperty({
		name: "§zClock Display",
		description: "Displays the System Time on screen",
		category: "General",
        subcategory: "HUD"
	})
    ClockDisplay = false

    @SwitchProperty({
		name: "§zFPS Display",
		description: "Displays the System Time on screen",
		category: "General",
        subcategory: "HUD"
	})
    FPSdisplay = false


    @SwitchProperty({
        name: "Clean Titles",
        description: "&eReplaces the big and annoyying f7 titles with smaller and cleaner ones and display them on screen\n\n&b&nExsamples:\n\n&r &a1/2 Energy Crystals are now active!&f ==> &f(&c1&f/&b2&f) \n &aNoamm9&a activated a Terminal! (&c6&f/&a7&f)&f ==> &f(&c6&a/7&f)",
        category: "Dungeons",
        subcategory: "F7"
    })
    CleanTitles = false

    @SwitchProperty({
        name: "Close Dungeon Chests",
        description: "&eAutomatically closes dungeon Secret chests, ensuring efficient and clutter free clearing.",
        category: "Dungeons",
        subcategory: "Secrets"
    })
    AutoCloseDungeonChests = false

    @SwitchProperty({
        name: "&bSecrets Sound",
        description: "Plays a sound whenever you get a dungeon secret (might not be 100% accurate on the pick up items)",
        category: "Dungeons",
        subcategory: "Secrets"
    })
    SecretsSound = false

    @SelectorProperty({
        name: "&dSecrets Sound Type",
        description: "The type of sound to play whenever you get a secret",
        category: "Dungeons",
        subcategory: "Secrets",
        options: [
            'mob.cat.meow',
            "mob.blaze.hit", 
            "fire.ignite", 
            "random.orb", 
            "random.break", 
            "mob.guardian.land.hit"
        ]
    })
    SecretsSoundType = 0;

    @SwitchProperty({
        name: "&eHide &5Portal Effect",
        description: "Disables the annoying Nether Portal Effect",
        category: "Cosmetic",
        subcategory: "Visuals"
    })
    HidePortalEffect = false

    @SwitchProperty({
        name: "&dCustom &bLeap &6Menu",
        description: "Renders a Custom Menu for leaps",
        category: "Dungeons",
        subcategory: "Spirit Leaps"
    })
    CustomLeapMenu = false

    @CheckboxProperty({
        name: "&fLight &6Mode Menu?",
        description: "Changes the &fColor&r Mode of the &dCustom &bLeap &6Menu",
        category: "Dungeons",
        subcategory: "Spirit Leaps"
    })
    CustomLeapMenuLightMode = false

    @PercentSliderProperty({
        name: "&dCustom &bLeap &6Menu &eScale",
        description: "Scale of the &dCustom &bLeap &6Menu",
        category: "Dungeons",
        subcategory: "Spirit Leaps"
    })
    CustomLeapMenuScale = 1;
/*    
    @SwitchProperty({
        name: "&eToggle &5Secrets Hitboxes",
        description: "Toggles the hitboxes of secrets in dungeons",
        category: "Dungeons",
        subcategory: "Secrets",
    })
    SecretsHitboxes = true
*/  
    @SwitchProperty({
        name: "&bAbility &aKeybinds",
        description: "Allows to use the Your Classs ULTIMATE/ABILITY with a keybind witch can be configirate in Minecraft's Options/Controls",
        category: "Dungeons",
        subcategory: ""
    })
    AbilityKeybinds = false

    @SwitchProperty({
        name: "&4&lFuck &0&lBlindness!",
        description: "Removes the Fucking Annoying Blindness Effect (Client-side ofc)",
        category: "Cosmetic",
        subcategory: "Visuals"
    })
    NoBlindness = false

    @SwitchProperty({
        name: "&dLeft &aClick &5Etherwarp",
        description: "If enabled when Left clicking with a AOTV in hand it will try Etherwarp instead",
        category: "Dungeons",
        subcategory: ""
    })
    LeftClickEtherwarp = false

    @SwitchProperty({
        name: "&eShow &6Gyro &dRadius",
        description: "Shows the Gyrokinetic wand sucking radius",
        category: "Dungeons",
        subcategory: ""
    })
    GyroCircle = false

    @TextProperty({
        name: "&dMelody &6Alert",
        description: "Sends a Message in chat when you open Melody Terminal\nDelete all text to disable",
        category: "Dungeons",
        subcategory: "F7",
        placeholder: ''
    })
    MelodyAlert = ""

    @SwitchProperty({
        name: "&eHide &bLightning",
        description: "Stops Lightning Effect from rendering",
        category: "Cosmetic",
        subcategory: "Visuals"
    })
    HideLightning = false

    @SwitchProperty({
        name: "&bHighlight &cMimic &6Chest",
        description: "Renders a Box and nametag above the Mimic Chest",
        category: "Dungeons",
        subcategory: "Secrets"
    })
    HighlightMinicChest = false

    @SwitchProperty({
        name: "&6Block &dGloomlock &cDeath",
        description: "Blocks left Clicking with a Gloomlock while your HP is lower than 25%",
        category: "Dungeons",
        subcategory: ""
    })
    BlockGloomlockDeath = false

    @SwitchProperty({
        name: "&0&lBetter &aM&65",
        description: "Changes the &6Stupid &fDiorite&r blocks at the Boss fight To &0&Clay blocks&r\n\n&dNow my eyes can finally rest",
        category: "Dungeons",
        subcategory: ""
    })
    BetterM5 = false

    @SwitchProperty({
        name: "&fBlur Background",
        description: "Apply a Sexy Blur Effect to the Background",
        category: "Cosmetic",
        subcategory: "Visuals"
    })
    BlurBackground = false

    @SwitchProperty({
        name: "&0&lBetter &a&lM&6&l6",
        description: "Places Some QQL Blocks at the Boss fight",
        category: "Dungeons",
        subcategory: ""
    })
    BetterM6 = false

    @SwitchProperty({
        name: "&aColor &dSecrets",
        description: "Replaces the Secrets items with a cool box and draws the name of the Secret",
        category: "Dungeons",
        subcategory: "Secrets"
    })
    ColorSecrets = false
    
    @SwitchProperty({
        name: "&dTrace &6Keys",
        description: "Draws a line from your mouse cursor to the Wither/Blood key",
        category: "Dungeons",
        subcategory: ""
    })
    TraceKeys = false
    


    @SwitchProperty({
        name: "&a&lWardrobe &6&lHelper",
        description: "Allows armor swapping with keyboard keys",
        category: "General",
        subcategory: "Wardrobe Helper"
    })
    WardrobeHelper = false
    
    @TextProperty({
        name: 'First Slot Keybind',
        description: "",
        category: 'General',
        subcategory: 'Wardrobe Helper',
        placeholder: ''
    })
    wd_1 = '1';
        
    @TextProperty({
        name: 'Second Slot Keybind',
        description: "",
        category: 'General',
        subcategory: 'Wardrobe Helper',
        placeholder: ''
    })
    wd_2 = '2';
        
    @TextProperty({
        name: 'Third Slot Keybind',
        description: "",
        category: 'General',
        subcategory: 'Wardrobe Helper',
        placeholder: ''
    })
    wd_3 = '3';
        
    @TextProperty({
        name: 'Fourth Slot Keybind',
        description: "",
        category: 'General',
        subcategory: 'Wardrobe Helper',
        placeholder: ''
    })
    wd_4 = '4';
        
    @TextProperty({
        name: 'Fifth Slot Keybind',
        description: "",
        category: 'General',
        subcategory: 'Wardrobe Helper',
        placeholder: ''
    })
    wd_5 = '5';
        
    @TextProperty({
        name: 'Sixth Slot Keybind',
        description: "",
        category: 'General',
        subcategory: 'Wardrobe Helper',
        placeholder: ''
    })
    wd_6 = '6';
        
    @TextProperty({
        name: 'Seventh Slot Keybind',
        description: "",
        category: 'General',
        subcategory: 'Wardrobe Helper',
        placeholder: ''
    })
    wd_7 = '7';
        
    @TextProperty({
        name: 'Eighth Slot Keybind',
        description: "",
        category: 'General',
        subcategory: 'Wardrobe Helper',
        placeholder: ''
    })
    wd_8 = '8';
        
    @TextProperty({
        name: 'Ninth Slot Keybind',
        description: "",
        category: 'General',
        subcategory: 'Wardrobe Helper',
        placeholder: ''
    })
    wd_9 = '9';
















































// Terminals
    @SwitchProperty({
        name: "&dCustom Terminal Guis",
        description: "Global Switch for Custom Terminal Guis",
        category: "Dungeons",
        subcategory: "Terminals"
    })
    CustomTerminalsGui = false

    @PercentSliderProperty({
        name: "&dCustom Terminals Gui &eScale",
        description: "Scale of the &dCustom &bLeap &6Menu",
        category: "Dungeons",
        subcategory: "Terminals"
    })
    CustomTerminalMenuScale = 0.5;

    @CheckboxProperty({
        name: "&fLight &6Mode Gui?",
        description: "Changes the &fColor&r Mode of the &dCustom Terminals &6Gui",
        category: "Dungeons",
        subcategory: "Terminals"
    })
    CustomTerminalMenuLightMode = false

    @ColorProperty({
        name: "&6Solution &2C&3o&4l&5o&6r&r",
        description: "The &2C&3o&4l&5o&6r&r' of the &6Solution",
        category: "Dungeons",
        subcategory: "Terminals"
    })
    CustomTerminalMenuSolutionColor = new Color(0, 114/255, 1, 1)

    @CheckboxProperty({
        name: "&dMelody &aTerminal",
        description: "",
        category: "Dungeons",
        subcategory: "Terminals"
    })
    CustomMelodyTerminal = true

    @CheckboxProperty({
        name: "&9Numbers &aTerminal",
        description: "",
        category: "Dungeons",
        subcategory: "Terminals"
    })
    CustomNumbersTerminal = true

    @CheckboxProperty({
        name: "&bRubix &aTerminal",
        description: "&6&l[&d&lTIP&6&l]&r &b&lNo need to swap between &n&lRightclick&r&b&l and &nLeftclick&r&b&l anymore",
        category: "Dungeons",
        subcategory: "Terminals"
    })
    CustomRubixTerminal = true

    @CheckboxProperty({
        name: "&aRed &cGreen &aTerminal",
        description: "",
        category: "Dungeons",
        subcategory: "Terminals"
    })
    CustomRedGreenTerminal = true

    @CheckboxProperty({
        name: "&6Start With &aTerminal",
        description: "",
        category: "Dungeons",
        subcategory: "Terminals"
    })
    CustomStartWithTerminal = true

    @CheckboxProperty({
        name: "&2C&3o&4l&5o&6r&r &aTerminal",
        description: "",
        category: "Dungeons",
        subcategory: "Terminals"
    })
    CustomColorsTerminal = true


















    constructor() {
        this.initialize(this);
        this.setCategoryDescription("Dungeons", "&6Toggle &aOn&f/&cOff&f features within the mod\nOr just &6Configurate &eThem")
        this.setCategoryDescription("General", "&6Toggle &aOn&f/&cOff&f features within the mod\nOr just &6Configurate &eThem")
		this.setCategoryDescription("Alerts", "&6Toggle &aOn&f/&cOff&f Alerts within this mod")

        this.addDependency('&bFOV', '&eCustom &dFOV');
        this.addDependency('&dE&bS&dP &2C&3o&4l&5o&6r&r', '&fDungeon &eMob &6ESP')
        this.addDependency("&dE&bS&dP &6Mode", "&fDungeon &eMob &6ESP")
        this.addDependency("&9Block Overlay &eType", "§n&9Block Overlay")
        this.addDependency("Outline Thickness", "§n&9Block Overlay")
        this.addDependency("Outline &2C&3o&4l&5o&6r&r", "§n&9Block Overlay")
        this.addDependency("Overlay &2C&3o&4l&5o&6r&r", "§n&9Block Overlay")
        this.addDependency("&6Show Through Blocks?", "§n&9Block Overlay")
        this.addDependency("Announced &6Massage", "Announce &fSpirit &bLeaps")
        this.addDependency("&5P1 &fStart &eTimer", "&cF7/&4M7 &aPhase &dStart &eTimers")
        this.addDependency("&bP2 &fStart &eTimer", "&cF7/&4M7 &aPhase &dStart &eTimers")
        this.addDependency("&7P3 &fStart &eTimer", "&cF7/&4M7 &aPhase &dStart &eTimers")
        this.addDependency("&cP4 &fStart &eTimer", "&cF7/&4M7 &aPhase &dStart &eTimers")
        this.addDependency("&dWay&bPoint &2C&3o&4l&5o&6r&r", "&aChat Coords &d2 WayPoint")
        this.addDependency(`§bIcefill §6Solver &2C&3o&4l&5o&6r&r`, `§bIcefill §6Solver`)
        this.addDependency(`&f&lWhitelist`, `&9&lM&a&la&c&li&d&ln &b&lT&6&lo&e&lg&f&lg&0l&4&le`)
        this.addDependency(`&0&lBlacklist`, `&9&lM&a&la&c&li&d&ln &b&lT&6&lo&e&lg&f&lg&0l&4&le`)
        this.addDependency(`&e!ptme`, `&9&lM&a&la&c&li&d&ln &b&lT&6&lo&e&lg&f&lg&0l&4&le`)
        this.addDependency(`&6!warp`, `&9&lM&a&la&c&li&d&ln &b&lT&6&lo&e&lg&f&lg&0l&4&le`)
        this.addDependency(`&d!allinvite`, `&9&lM&a&la&c&li&d&ln &b&lT&6&lo&e&lg&f&lg&0l&4&le`)
        this.addDependency(`!f&a0&r-&c7`, `&9&lM&a&la&c&li&d&ln &b&lT&6&lo&e&lg&f&lg&0l&4&le`)
        this.addDependency(`!m&c1&r-&47`, `&9&lM&a&la&c&li&d&ln &b&lT&6&lo&e&lg&f&lg&0l&4&le`)
        this.addDependency(`&5Healer &eWish! &bMessage`, `&5&lHealer &e&lWish!`)
        this.addDependency(`&5&nHealer&r &e&nWish!&r &b&nTitle&r &b&nMessage`, `&5&lHealer &e&lWish!`)
        this.addDependency(`&dTime &eMode`, "&dTime &bChanger")
        this.addDependency(`&eCustom &4Scale`, `&6Player &4Scale`)
        this.addDependency(`&aSpin &ediraction`, `&bPlayer &aSpin`)
        this.addDependency(`&sSpin &9speed`, `&bPlayer &aSpin`)
        this.addDependency("&bSlot &d&lHighlight&r &2C&3o&4l&5o&6r&r", "&aCustom &bSlot &d&lHighlight")
        this.addDependency(`&aDungeon &6Team&amates &6Name&atag &eMode`, `&aDungeon &6Team&amates &6Name&atag`)
        this.addDependency(`&dCustom &bLeap &6Menu &eScale`, `&dCustom &bLeap &6Menu`)
        this.addDependency(`&fLight &6Mode Menu?`, "&dCustom &bLeap &6Menu")
        this.addDependency(`&6Hide &cWrong &5Livids?`, `&5Livid &aSolver`)
        this.addDependency("&6Boulder &bSolver &2C&3o&4l&5o&6r&r", "&bBoulder &dSolver")
        this.addDependency("&aThree &6Weirdos &cSolver &2C&3o&4l&5o&6r&r", "&aThree &6Weirdos &cSolver")
        this.addDependency("First Blaze Color", "&eBlaze &dSolver")
        this.addDependency("Second Blaze Color", "&eBlaze &dSolver")
        this.addDependency("Third Blaze Color", "&eBlaze &dSolver")
        this.addDependency("Blaze Solver Line Color", "&eBlaze &dSolver")
        this.addDependency("&dCustom Terminals Gui &eScale", "&dCustom Terminal Guis")
        this.addDependency("&fLight &6Mode Gui?", "&dCustom Terminal Guis")
        this.addDependency("&6Solution &2C&3o&4l&5o&6r&r", "&dCustom Terminal Guis")
        this.addDependency("&dMelody &aTerminal", "&dCustom Terminal Guis")
        this.addDependency("&9Numbers &aTerminal", "&dCustom Terminal Guis")
        this.addDependency("&bRubix &aTerminal", "&dCustom Terminal Guis")
        this.addDependency("&aRed &cGreen &aTerminal", "&dCustom Terminal Guis")
        this.addDependency("&6Start With &aTerminal", "&dCustom Terminal Guis")
        this.addDependency("&2C&3o&4l&5o&6r&r &aTerminal", "&dCustom Terminal Guis")
        this.addDependency("First Slot Keybind", "&a&lWardrobe &6&lHelper")
        this.addDependency('Second Slot Keybind', "&a&lWardrobe &6&lHelper")
        this.addDependency("Third Slot Keybind", "&a&lWardrobe &6&lHelper")
        this.addDependency("Fourth Slot Keybind", "&a&lWardrobe &6&lHelper")
        this.addDependency("Fifth Slot Keybind", "&a&lWardrobe &6&lHelper")
        this.addDependency("Sixth Slot Keybind", "&a&lWardrobe &6&lHelper")
        this.addDependency("Seventh Slot Keybind", "&a&lWardrobe &6&lHelper")
        this.addDependency("Eighth Slot Keybind", "&a&lWardrobe &6&lHelper")
        this.addDependency("Ninth Slot Keybind", "&a&lWardrobe &6&lHelper")

    }
}


export default new Settings()