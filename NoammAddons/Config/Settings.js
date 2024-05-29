import {  @ButtonProperty, @PercentSliderProperty, @CheckboxProperty, @ColorProperty, @SelectorProperty, @SwitchProperty, @Vigilant, @SliderProperty, @TextProperty, Color } from "../../Vigilance"


@Vigilant("NoammAddons\\Config", "§d§l§nNoamm§b§l§nAddons", {
    getCategoryComparator: () => (a, b) => {
        const categories = [
            "General",
            "Dungeons", 
            "Alerts", 
            "HUD", 
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
/*    @SwitchProperty({
        name: "&l&cI HATE CARPETS",
        description: "Replace all Carpet blocks in a radius of 3 block from the Player to AirBlocks to avoid useless LagBacks",
        category: "Dungeons",
        subcategory: "Dungeons"
    })
    IHateCarpets = false; */
    
    @SwitchProperty({
        name: "&c&lI HATE DIORITE",
        description: "Replace the Diorite blocks at the F7/M7 P2 to Glass blocks in older to see Storm get Crushed better (Alternative to trying to see his name tag through the blocks)",
        category: "Dungeons",
        subcategory: "f7"
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
        placeholder: 'I TP to {name}',
    })
    AnnouncedLeapMassage = 'I TP to {name}';

	@SwitchProperty({
        name: "&bLegit Ghost Pickaxe",
        description: "&fThis is meant for people that lock all of their the inventory slots and are too lazy to unlock them every time they want to create a ghost pickaxe &l(Controlled by a keybind within Options/Controls)",
        category: "Dungeons",
        subcategory: ""
    })
	LegitGhostPickaxe = false
    
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
        subcategory: "f7"
    })
	M7DragBox = false

    @SwitchProperty({
        name: "&cM7 &0Dragon&f Spawn &eTimer",
        description: 'Draws a "Accurate" &0Dragon&r Spawn &eTimer&r for &cM7&r-&fP5',
        category: "Dungeons",
        subcategory: "f7"
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
        name: "&fDungeon &eMob &dE&bS&dP",
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
        name: '&dE&bS&dP &dC&bo&dl&bo&dr',
        description: 'Select an option for the Dungeon Mob ESP box color',
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
        name: "§n&fBlock Overlay",
        description: "description: No need, Surely you know what this feature does",
        category: "Cosmetic",
        subcategory: "Block Overlay"
    })
    BlockOverlay = false
    
    @SelectorProperty({
        name: "Block Overlay &eType",
        description: "How to highlight the block",
        category: "Cosmetic",
        subcategory: "Block Overlay",
        options: [
            "Outline",
            "Overlay",
            "Outline + Overlay"
        ]
    })
    BlockOverlayType = 0;
    
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
        name: "Outline Color",
        description: "The color of the Outline",
        category: "Cosmetic",
        subcategory: "Block Overlay"
    })
    BlockOverlayOutlineColor = new Color(0,1,0,1)
    
    @ColorProperty({
        name: "Overlay Color",
        description: "The color of the Overlay",
        category: "Cosmetic",
        subcategory: "Block Overlay"
    })
    BlockOverlayOverlayColor = new Color(0,1,0,1)
    
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
        description: "Changes the Color and the opacity of Minecraft Vanilla slot highlight\n\n&c&lCurrently does not work with sba for some reason ",
        category: "Cosmetic",
        subcategory: "Visuals"
    })
    CustomSlotHighlight = false

    @ColorProperty({
        name: "&bSlot &d&lHighlight&r &6Color",
        description: "The color of the Overlay",
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
        name: "&dWay&bPoint &6Color",
        description: "The color of the waypoint",
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
        name: "&4&lF7&r &f&lGhost Blocks&r",
        description: `Auto Place Ghost Blocks in some places at f7 boss fight`,
        category: "Dungeons",
        subcategory: "f7"
    })
    f7GhostBlocks = false

    @SwitchProperty({
		name: "§bIcefill §6Solver",
		description: "",
		category: "Dungeons",
        subcategory: "Solvers"
	})
	IcefillSolver = false

    @ColorProperty({
        name: "§bIcefill §6Solver &2C&3o&4l&5o&6r",
        description: "The color of the Icefill Solver",
        category: "Dungeons",
        subcategory: "Solvers"
    })
    IcefillSolverColor = new Color(0, 0, 0, 1)

    @SwitchProperty({
		name: "§zClock Display",
		description: "Displays the System Time on screen",
		category: "General",
        subcategory: ""
	})
    ClockDisplay = false

    @SwitchProperty({
		name: "§zFPS Display",
		description: "Displays the System Time on screen",
		category: "General",
        subcategory: ""
	})
    FPSdisplay = false

    @ButtonProperty({
        name: "Edit Gui locations",
		description: "&fClick on an element and drag it to change its location.\n&fClick and Hold than Scroll to incrase/decrese the size of an Element. ",
		category: "HUD",
        placeholder: "                [ Click me! ]              "
    })
    EGUIButtonAction() {
        Client.currentGui.close()
        setTimeout(() => ChatLib.command("naeditmaingui", true) , 100)
    }




    constructor() {
        this.initialize(this);
        this.setCategoryDescription(`HUD`, "&fEdit the &fPosition and Scale Of All of HUD Elements \n&b&l(Drag the text to move it, Scroll with the mouse wheel to change the scale of the text) \n&r&dMake sure that the Toggle is enable before you try to use this option else it wont work")
        this.setCategoryDescription("Dungeons", "&6Toggle &aOn&f/&cOff&f features within the mod\nOr just &6Configurate &eThem")
        this.setCategoryDescription("General", "&6Toggle &aOn&f/&cOff&f features within the mod\nOr just &6Configurate &eThem")
		this.setCategoryDescription("Alerts", "&6Toggle &aOn&f/&cOff&f Alerts within this mod")

        this.addDependency('&bFOV', '&eCustom &dFOV');
        this.addDependency('&dE&bS&dP &dC&bo&dl&bo&dr', '&fDungeon &eMob &dE&bS&dP')
        //this.addDependency('§eMove&r &cNecron Dropping&r &eTimer&r', '&cNecron Dropping &eTimer')
        this.addDependency("Block Overlay &eType", "§n&fBlock Overlay")
        this.addDependency("Outline Thickness", "§n&fBlock Overlay")
        this.addDependency("Outline Color", "§n&fBlock Overlay")
        this.addDependency("Overlay Color", "§n&fBlock Overlay")
        this.addDependency("&6Show Through Blocks?", "§n&fBlock Overlay")
        this.addDependency("&dE&bS&dP &6Mode", "&fDungeon &eMob &dE&bS&dP")
        this.addDependency("Announced &6Massage", "Announce &fSpirit &bLeaps")
        this.addDependency("&5P1 &fStart &eTimer", "&cF7/&4M7 &aPhase &dStart &eTimers")
        this.addDependency("&bP2 &fStart &eTimer", "&cF7/&4M7 &aPhase &dStart &eTimers")
        this.addDependency("&7P3 &fStart &eTimer", "&cF7/&4M7 &aPhase &dStart &eTimers")
        this.addDependency("&cP4 &fStart &eTimer", "&cF7/&4M7 &aPhase &dStart &eTimers")
        this.addDependency("&dWay&bPoint &6Color", "&aChat Coords &d2 WayPoint")
        this.addDependency(`§bIcefill §6Solver &2C&3o&4l&5o&6r`, `§bIcefill §6Solver`)
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
        this.addDependency("&bSlot &d&lHighlight&r &6Color", "&aCustom &bSlot &d&lHighlight")
        this.addDependency(`&aDungeon &6Team&amates &6Name&atag &eMode`, `&aDungeon &6Team&amates &6Name&atag`)


    }
}

export default new Settings()
