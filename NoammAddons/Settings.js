import {  @ButtonProperty, @CheckboxProperty, @ColorProperty, @SelectorProperty, @SwitchProperty, @Vigilant, @SliderProperty, @TextProperty, Color } from 'Vigilance';


@Vigilant("NoammAddons", "§d§l§nNoamm§b§l§nAddons", {
    getCategoryComparator: () => (a, b) => {
        const categories = [
            "General", 
            "Alerts", 
            "HUD", 
            "Cosmetic"
        ];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }/*,
    getSubcategoryComparator: () => (a, b) => {
        const subcategories = [
            "Dungeons", 
            "Timers",
            "Block Overlay", 
            "visuals", 
        ];
        return subcategories.indexOf(a.name) - subcategories.indexOf(b.name);
    },
    getPropertyComparator: () => (a, b) => {
        const names = [
//              No Catecory
            "&dShort &bSky&dBlock &bCommands",    
//              Dungeons
            "&l&cI HATE DIORITE", 
            "&eBetter &3Ender Pearls", 
            "Auto &eRefill &3Ender Pearls", 
            `&aTeammates &6Nametag`,
            "&bLegit Ghost Pickaxe",
            "&cM7 &0Dragon&r Box",
            "&cM7 &0Dragon&f Spawn &eTimer",
            "&eHide &cFalling &eBlocks",
            "&fDungeon &eMob &dE&bS&dP",
            "&dE&bS&dP &6Mode",
            "&dE&bS&dP &dC&bo&dl&bo&dr",
            "&dDungeon Auto Extra Stats",
            `Announce &fSpirit &bLeaps`,
            `Announced &6Massage`,
//              Timers       
            "F7/M7 Phase Start Timers",
            "&aP1 &fStart &eTimer",
            "&aP2 &fStart &eTimer",
            "&aP3 &fStart &eTimer",
            "&aP4 &fStart &eTimer",
            "&9Bonzo Mask&r &eTimer&r",
            "&5Phoenix Pet&r &eTimer&r",
            "&fSpirit Mask&r &eTimer&r",
            "&cNecron Dropping &eTimer",
//              Alerts
            "&cM6 &dGyro&r Alerts",
            "M7 &6Ragnarock Axe&r Alert",
            `&5Shadow Assasian &fAlert`,
            "&dLock &bChest &fAlert",
            "&cWatcher&r Alerts",
            "&9Bonzo Mask&r Alert",
            "&5Phoenix Pet&r Alert",
            "&fSpirit Mask&r Alert",
            "§5Full Thunder Bottle Alert",
            "&cArrows&r Alert",
//              Cosmetic
            "§n&fBlock Overlay",
            "Block Overlay Type",
            "Outline Thickness",
            "Outline Color",
            "Overlay Color",
            "&eCustom &dFOV",
            "&bFOV",
            "Custom Slot Highlight",
            `Slot Highlight Color`,
            "&cRemove &aSword &fBlock",
            "&cRemove&r &aSelfie&f Camera",
        ];
        return names.indexOf(a.name) - names.indexOf(b.name);
    }*/
})


class Settings {
/*    @SwitchProperty({
        name: "&l&cI HATE CARPETS",
        description: "Replace all Carpet blocks in a radius of 3 block from the Player to AirBlocks to avoid useless LagBacks",
        category: "General",
        subcategory: "Dungeons"
    })
    IHateCarpets = false; */
    
    @SwitchProperty({
        name: "&l&cI HATE DIORITE",
        description: "Replace the Diorite blocks at the F7/M7 P2 to Glass blocks in older to see Storm get Crushed better (Alternative to trying to see his name tag through the blocks)",
        category: "General",
        subcategory: "Dungeons"
    })
    IHateDiorite = false
    
    @SwitchProperty({
        name: "&eBetter &3Ender Pearls",
        description: "Disable's Hypixel's stupid Ender Pearls throw block when you are too close to a wall/floor/ceiling",
        category: "General",
        subcategory: "Dungeons"
    })
    BetterEnderPearls = false

    @SwitchProperty({
        name: `Announce &fSpirit &bLeaps`,
        description: "Says in party chat who did you leaped to",
        category: "General",
        subcategory: "Dungeons"
    })
    AnnounceSpiritLeaps = false

    @TextProperty({
        name: 'Announced &6Massage',
        description: "The Message that will be sent every time you leapd to someone.\n You can use {name} to get the leaped player's name",
        category: 'General',
        subcategory: 'Dungeons',
        placeholder: 'I TP to {name}',
    })
    AnnouncedLeapMassage = 'I TP to {name}';

	@SwitchProperty({
        name: "&bLegit Ghost Pickaxe",
        description: "&fThis is meant for people that lock all of their the inventory slots and are too lazy to unlock them every time they want to create a ghost pickaxe &l(Controlled by a keybind within Options/Controls)",
        category: "General",
        subcategory: "Dungeons"
    })
	LegitGhostPickaxe = false
    
    @ButtonProperty({
        name: "§eMove&r &bLegit Ghost Pickaxe",
        description: "&fEdit the &bLegit Ghost Pickaxe&r's &fPosition and Scale &l(Drag the text to move it, Scroll with the mouse wheel to change the scale of the text) &r&dMake sure that the Toggle is enable before you try to use this option else it wont work",
        category: "HUD",
        subcategory: "Dungeons",
        placeholder: "MOVE"
    })
    LGPButtonAction() {
        if (this.LegitGhostPickaxe) {
            Client.currentGui.close()
            setTimeout(() => {
                ChatLib.command("legitghostpickgui", true) 
            }, 100)
        }
    }

    @SwitchProperty({
        name: "&aRemove Sword Block",
        description: "&fEnables Minecraft 1.9 RightClick animation to the following swords: All Wither blades, Rogue Sword, wither cloak, Aspect of the end, All Jerry Swords, All VoidGloom Katanas, Aspect of the Dragons",
        category: "Cosmetic",
        subcategory: "visuals"
    })
    NoSwordBlock = false
    @SwitchProperty({
        name: "&cM7 &0Dragon&r Box",
        description: "Draws a very accurate &0Dragon&r Kill Box for &cM7&r-&fP5",
        category: "General",
        subcategory: "Dungeons"
    })
	M7DragBox = false

    @SwitchProperty({
        name: "&cM7 &0Dragon&f Spawn &eTimer",
        description: 'Draws a "Accurate" &0Dragon&r Spawn &eTimer&r for &cM7&r-&fP5',
        category: "General",
        subcategory: "Dungeons"
    })
	M7DragTimer = false

    @SwitchProperty({
        name: "Auto &eRefill &3Ender Pearls",
        description: 'Automatically &eRefill &3Ender Pearls&r from sack at the start of a dungeon run (does not work properly if you have spirit leaps in inventory)',
        category: "General",
        subcategory: "Dungeons"
    })
	AutoRefillEnderPearls = false

    @SwitchProperty({
        name: "&dDungeon Auto Extra Stats",
        description: "Automatically types the command to show extra the extra dungeon stats at the end of the run",
        category: "General",
        subcategory: "Dungeons"
    })
    DungeonAutoExtraStats = false

	@SwitchProperty({
        name: "&eCustom &dFOV",
        description: "&fAllows to set Custom Minecraft FOV (Field of View)",
        category: "Cosmetic",
        subcategory: "visuals"
    })
	CustomFOV = false

    @SliderProperty({
        name: "&bFOV",
        description: "",
        category: "Cosmetic",
        subcategory: "visuals",
        min: 30,
        max: 179
    })
    FOV = Client.settings.getFOV();

    @SwitchProperty({
        name: "&fDungeon &eMob &dE&bS&dP",
        description: "Draw a see through wall box around stared dungeon mobs",
        category: "General",
        subcategory: "Dungeons"
    })
	DungeonMobESP = false

    @SelectorProperty({
        name: '&dE&bS&dP &6Mode',
        description: 'Select an option',
        category: 'General',
        subcategory: 'Dungeons',
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
        category: 'General',
        subcategory: 'Dungeons'
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
        name: 'F7/M7 Phase Start Timers',
        description: 'Global Toggle',
        category: 'General',
        subcategory: 'Timers'
    })
    F7M7PhaseStartTimers = false

    @CheckboxProperty({
        name: '&aP1 &fStart &eTimer',
        description: 'Shows a Timer on screen when Maxor Phase will start',
        category: 'General',
        subcategory: 'Timers'
    })
    P1StartTimer = false

    @CheckboxProperty({
        name: '&aP2 &fStart &eTimer',
        description: 'Shows a Timer on screen when Storm Phase will start',
        category: 'General',
        subcategory: 'Timers'
    })
    P2StartTimer = false

    @CheckboxProperty({
        name: '&aP3 &fStart &eTimer',
        description: 'Shows a Timer on screen when Goldor Phase will start',
        category: 'General',
        subcategory: 'Timers'
    })
    P3StartTimer = false

    @CheckboxProperty({
        name: '&aP4 &fStart &eTimer',
        description: 'Shows a Timer on screen when Necron Phase will start',
        category: 'General',
        subcategory: 'Timers'
    })
    P4StartTimer = false

	@SwitchProperty({
        name: "&dPink&r DMs",
        description: "&fChanges the Color of the Private massage in Hypixel from &7Gray &fto &dPink",
        category: "Cosmetic",
        subcategory: "visuals"
    })
	PinkDMs = false

    @SwitchProperty({
        name: "&eHide &cFalling &eBlocks",
        description: "Hides Falling Blocks in order to improve fps",
        category: "General",
        subcategory: "Dungeons"
    })
    HideFallingBlocks = false

	@SwitchProperty({
        name: "&cRemove&r &aSelfie&f Camera",
        description: "&cRemoves&r The &aSelfie&r Mode From F5",
        category: "Cosmetic",
        subcategory: "visuals"
    })
	RemoveSelfieCamera = false

	@SwitchProperty({
        name: "&9Bonzo Mask&r &eTimer&r",
        description: 'Draws a very accurate Display that shows the cooldown of the &9Bonzo &cMask&r "Clownin Around" &eAbility&r',
        category: "General",
        subcategory: "Timers"
    })
	BonzoMaskTimer = false
	
    @ButtonProperty({
        name: "§eMove&r &9Bonzo Mask&r &eTimer&r",
        description: "&fEdit the &9Bonzo Mask&r &eTimer&r's &fPosition and Scale &l(Drag the text to move it, Scroll with the mouse wheel to change the scale of the text) &r&dMake sure that the Toggle is enable before you try to use this option else it wont work",
        category: "HUD",
        subcategory: "Timers",
        placeholder: "MOVE"
    })
    BMTButtonAction() {
        if (this.BonzoMaskTimer) {
            Client.currentGui.close()
            setTimeout(() => {
                ChatLib.command("bonzomaskgui", true) 
            }, 100)
        }
    }
	
	@SwitchProperty({
        name: "&fSpirit Mask&r &eTimer&r",
        description: 'Draws a very accurate Display that shows the cooldown of the &fSpirit Mask&r "Second Wind" &eAbility&r',
        category: "General",
        subcategory: "Timers"
    })
	SpiritMaskTimer = false

    @ButtonProperty({
        name: "§eMove&r &fSpirit Mask&r &eTimer&r",
        description: "&fEdit the Spirit Mask&r &eTimer&r's &fPosition and Scale &l(Drag the text to move it, Scroll with the mouse wheel to change the scale of the text) &r&dMake sure that the Toggle is enable before you try to use this option else it wont work",
        category: "HUD",
        subcategory: "Timers",
        placeholder: "MOVE"
    })
    SMTButtonAction() {
        if (this.SpiritMaskTimer) {
            Client.currentGui.close()
            setTimeout(() => {
                ChatLib.command("spiritmaskgui", true) 
            }, 100)
        }
    }

	@SwitchProperty({
        name: "&5Phoenix Pet&r &eTimer&r",
        description: 'Draws a very accurate Display that shows the cooldown of the &5Phoenix Pet&r "Rekindle" &eAbility&r',
        category: "General",
        subcategory: "Timers"
    })
	PhoenixPetTimer = false

    @ButtonProperty({
        name: "§eMove&r &5Phoenix Pet&r &eTimer&r",
        description: "&fEdit the &5Phoenix Pet&r &eTimer&r's &fPosition and Scale &l(Drag the text to move it, Scroll with the mouse wheel to change the scale of the text) &r&dMake sure that the Toggle is enable before you try to use this option else it wont work",
        category: "HUD",
        subcategory: "Timers",
        placeholder: "MOVE"
    })
    PTTButtonAction() {
        if (this.PhoenixPetTimer) {
            Client.currentGui.close()
            setTimeout(() => {
                ChatLib.command("phoenixpetgui", true) 
            }, 100)
        }
    }

	@SwitchProperty({ 
		name: "&dShort &bSky&dBlock &bCommands",
		description: "Enables a list of useful &dshort&r version of &bsky&dblock's &bcommands&r (type /ssbc for help)",
        category: "General",
        subcategory: ""
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
		description: "Shows on screen when to &dGyro at Terracotta phase &l(Still need some more work tbh)",
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
        category: "General",
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
        name: "Block Overlay Type",
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
        name: 'Show Through Other Blocks?',
        description: '',
        category: 'Cosmetic',
        subcategory: 'Block Overlay'
    })
    BlockOverlayESP = true
    
    @SwitchProperty({
        name: "&aDungeon Teammates &6Nametag",
        description: "draws your TeamMates Name and Class as a big NameTag that you can See through walls.\n\n§fExample: §e[§dT§e] §bNoamm9",
        category: "General",
        subcategory: "Dungeons"
    })
    TeammatesNametag = false

    @SwitchProperty({
        name: "Custom Slot Highlight",
        description: "Changes the Color and the opacity of Minecraft Vanilla slot highlight ",
        category: "Cosmetic",
        subcategory: "visuals"
    })
    CustomSlotHighligh = false

    @ColorProperty({
        name: "Slot Highlight Color",
        description: "The color of the Overlay",
        category: "Cosmetic",
        subcategory: "visuals"
    })
    CustomSlotHighlighColor = new Color(0,1,0,1)

    @SwitchProperty({
        name: "§cBlood §bDialouge §eSkip",
        description: "Makes a timer for 24 seconds after you open the blood room \n&c&lYou need to be in blood when timer ends",
        category: "General",
        subcategory: "Dungeons"
    })
    BloodDialougeSkip = false

    @SwitchProperty({
        name: "Chat Coords 2 WayPoint",
        description: "Creates a waypoint whenever a recieved chat message matches\n\n&bx: 1, y: 1, z: 1",
        category: "General",
        subcategory: ""
    })
    ChatCoordsWayPoint = false

    @ColorProperty({
        name: "WayPoint Color",
        description: "The color of the waypoint",
        category: "General",
        subcategory: ""
    })
    ChatCoordsWayPointColor = new Color(0, 0, 0, 1)



    constructor() {
        this.initialize(this);
        this.setCategoryDescription("General", "&6Toggle &aOn&f/&cOff&f features within the mod")
		this.setCategoryDescription("Alerts", "&6Toggle &aOn&f/&cOff&f Alerts within this mod")

        this.addDependency('&bFOV', '&eCustom &dFOV');
        this.addDependency('&dE&bS&dP &dC&bo&dl&bo&dr', '&fDungeon &eMob &dE&bS&dP')
        this.addDependency('§eMove&r &bLegit Ghost Pickaxe', '&bLegit Ghost Pickaxe')
        this.addDependency('§eMove&r &9Bonzo Mask&r &eTimer&r', '&9Bonzo Mask&r &eTimer&r')
        this.addDependency('§eMove&r &fSpirit Mask&r &eTimer&r', '&fSpirit Mask&r &eTimer&r')
        this.addDependency('§eMove&r &5Phoenix Pet&r &eTimer&r', '&5Phoenix Pet&r &eTimer&r')
        //this.addDependency('§eMove&r &cNecron Dropping&r &eTimer&r', '&cNecron Dropping &eTimer')
        this.addDependency("Block Overlay Type", "§n&fBlock Overlay")
        this.addDependency("Outline Thickness", "§n&fBlock Overlay")
        this.addDependency("Outline Color", "§n&fBlock Overlay")
        this.addDependency("Overlay Color", "§n&fBlock Overlay")
        this.addDependency("&dE&bS&dP &6Mode", "&fDungeon &eMob &dE&bS&dP")
        this.addDependency("Slot Highlight Color", "Custom Slot Highlight")
        this.addDependency("Announced &6Massage", "Announce &fSpirit &bLeaps")
        this.addDependency("&aP1 &fStart &eTimer", "F7/M7 Phase Start Timers")
        this.addDependency("&aP2 &fStart &eTimer", "F7/M7 Phase Start Timers")
        this.addDependency("&aP3 &fStart &eTimer", "F7/M7 Phase Start Timers")
        this.addDependency("&aP4 &fStart &eTimer", "F7/M7 Phase Start Timers")
        this.addDependency("WayPoint Color", "Chat Coords 2 WayPoint")

    }
}

export default new Settings();
