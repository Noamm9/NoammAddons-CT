import {  @ButtonProperty, @CheckboxProperty, @ColorProperty, @SelectorProperty, @SwitchProperty, @Vigilant, @SliderProperty, Color } from 'Vigilance';


@Vigilant("NoammAddons", "§d§l§nNoamm§b§l§nAddons", {
    getCategoryComparator: () => (a, b) => {
        const categories = ["General","Alerts", "HUD", "Cosmetic"];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    },
    getSubcategoryComparator: () => (a, b) => {
        const subcategories = ["Block Overlay", "visuals", "Dungeons", "Timers"];
        return subcategories.indexOf(a.getValue()[0].attributesExt.subcategory) -
            subcategories.indexOf(b.getValue()[0].attributesExt.subcategory);
    },
    getPropertyComparator: () => (a, b) => {
        const names = ["Do action!!!", "password", "text", "Color Picker"];
        return names.indexOf(a.attributesExt.name) - names.indexOf(b.attributesExt.name);
    }
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
        description: 'Automatically &erefill &3Ender Pearls&r from sack at the start of a dungeon run (does not work properly if you have spirit leaps in inventory)',
        category: "General",
        subcategory: "Dungeons"
    })
	AutoRefillEnderPearls = false

    @SwitchProperty({
        name: "Dungeon Auto Extra Stats",
        description: "Automatically types the command to show extra the extra dungeon stats at the end of the run",
        category: "General",
        subcategory: "Dungeons"
    })
    DungeonAutoExtraStats = false

	@SwitchProperty({
        name: "&fCustom FOV",
        description: "&fAllows to set Custom Minecraft FOV (Field of View)",
        category: "Cosmetic",
        subcategory: "visuals"
    })
	CustomFOV = false

    @SliderProperty({
        name: "&fFOV",
        description: "",
        category: "Cosmetic",
        subcategory: "visuals",
        min: 30,
        max: 179
    })
    FOV = Client.settings.getFOV();

    @SwitchProperty({
        name: "&fDungeon Mob ESP",
        description: "&fDraw a see through wall box around stared dungeon mobs",
        category: "General",
        subcategory: "Dungeons"
    })
	DungeonMobESP = false

    @SelectorProperty({
        name: '&dC&bo&dl&bo&dr',
        description: 'Select an option for the Dungeon Mob ESP box color',
        category: 'General',
        subcategory: 'Dungeons',
        options: 
        [
            "WHITE", //0
            "RED",
            "GREEN",
            "BLUE",
            "AQUA",
            "YELLOW",
            "BLACK",
            "MAGENTA",
        ],
    })
    mycolorOptions = 0; 

	@SwitchProperty({
        name: "&dPink&r DMs",
        description: "&fChanges the Color of the Private massage in Hypixel from &7Gray &fto &dPink",
        category: "Cosmetic",
        subcategory: "visuals"
    })
	PinkDMs = false

    @SwitchProperty({
        name: "Hide Falling Blocks",
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
        description: 'Draws a very accurate Display that shows the cooldown of the &9bonzo &cMask&r "Clownin Around" &eAbility&r',
        category: "General",
        subcategory: "Timers"
    })
	BonzoMaskTimer = false
	
    @ButtonProperty({
        name: "§eMove&r &9bonzo Mask&r &eTimer&r",
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
		name: "&9bonzo Mask&r Alert",
		description: "Shows on screen when the &9bonzo &cMask&r &eAbility&r has been used",
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
        name: "Full Thunder Bottle Alert",
        description: "Shows a notification on screen when the Empty Thunder Bottle filled to the end",
        category: "Alerts",
        subcategory: ""
    })
    FullThunderBottleAlert = false

    @SwitchProperty({
        name: "&cNecron Dropping &eTimer",
        description: "Shows a Timer on screen when Necron will drop you to the Lava at F7/M7 P4",
        category: "General",
        subcategory: "Dungeons"
    })
    NecronDroppingTimer = false

    @ButtonProperty({
        name: "§eMove&r &cNecron Dropping&r &eTimer&r",
        description: "&fEdit the &cNecron Dropping&r &eTimer&r's &fPosition and Scale &l(Drag the text to move it, Scroll with the mouse wheel to change the scale of the text) &r&dMake sure that the Toggle is enable before you try to use this option else it wont work",
        category: "HUD",
        subcategory: "Dungeons",
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
    
    @SwitchProperty({
        name: "Block Overlay",
        description: "description: No need, Surely you know what this feature does",
        category: "Cosmetic",
        subcategory: "Block Overlay",
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
    /*
    @CheckboxProperty({
        name: 'Show Through Other Blocks?',
        description: '',
        category: 'Cosmetic',
        subcategory: 'Block Overlay'
    })*/
    BlockOverlayESP = true;
    



    constructor() {
        this.initialize(this);
        this.setCategoryDescription("General", "&6Toggle &aOn&f/&cOff&f features within the mod");
		this.setCategoryDescription("Alerts", "&6Toggle &aOn&f/&cOff&f Alerts within this mod");

        this.addDependency('&fFOV', '&fCustom FOV');
        this.addDependency('&dC&bo&dl&bo&dr', '&fDungeon Mob ESP');
        this.addDependency('§eMove&r &bLegit Ghost Pickaxe', '&bLegit Ghost Pickaxe');
        this.addDependency('§eMove&r &9bonzo Mask&r &eTimer&r', '&9Bonzo Mask&r &eTimer&r');
        this.addDependency('§eMove&r &fSpirit Mask&r &eTimer&r', '&fSpirit Mask&r &eTimer&r');
        this.addDependency('§eMove&r &5Phoenix Pet&r &eTimer&r', '&5Phoenix Pet&r &eTimer&r');
        this.addDependency('§eMove&r &cNecron Dropping&r &eTimer&r', '&cNecron Dropping &eTimer');
        
    }
}

export default new Settings();