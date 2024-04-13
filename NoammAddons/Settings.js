/// <reference types="..//CTAutocomplete" />
/// <reference lib="es2015" />


import { @Vigilant, @TextProperty, @ColorProperty, @ButtonProperty, @SwitchProperty, @SliderProperty, @SelectorProperty, Color } from 'Vigilance';
const PropertyType = Java.type("gg.essential.vigilance.data.PropertyType");
@Vigilant("NoammAddons", "§d§l§nNoamm§b§l§nAddons", {})


class Settings {
/*    @SwitchProperty({
        name: "&l&cI HATE CARPETS",
        description: "Replace all Carpet blocks in a radius of 3 block from the Player to AirBlocks to avoid useless LagBacks",
        category: "General",
        subcategory: ""
    })
    IHateCarpets = false; */
    
    @SwitchProperty({
        name: "&l&cI HATE DIORITE",
        description: "Replace the Diorite blocks at the F7/M7 P2 to Glass blocks in older to see Storm get Crushed better (Alternative to trying to see his name tag through the blocks)",
        category: "General",
        subcategory: ""
    })
    IHateDiorite = false
    
    @SwitchProperty({
        name: "&eBetter &3Ender Pearls",
        description: "Disable's Hypixel's stupid Ender Pearls throw block when you are too close to a wall/floor/ceiling",
        category: "General",
        subcategory: ""
    })
    BetterEnderPearls = false

	@SwitchProperty({
        name: "&bLegit Ghost Pickaxe",
        description: "&fThis is meant for people that lock all of their the inventory slots and are too lazy to unlock them every time they want to create a ghost pickaxe &l(Controlled by a keybind within Options/Controls)",
        category: "General",
        subcategory: ""
    })
	LegitGhostPickaxe = false
    
    @ButtonProperty({
        name: "§eMove&r &bLegit Ghost Pickaxe",
        description: "&fEdit the &bLegit Ghost Pickaxe&r &fPosition and Scale &l(Drag the text to move it, Scroll with the mouse wheel to change the scale of the text) &r&dMake sure that the Toggle is enable before you try to use this option else it wont work",
        category: "Hud",
        subcategory: "",
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
        category: "General",
        subcategory: ""
    })
    NoSwordBlock = false
    @SwitchProperty({
        name: "&cM7 &0Dragon&r Box",
        description: "Draws a very accurate &0Dragon&r Kill Box for &cM7&r-&fP5",
        category: "General",
        subcategory: ""
    })
	M7DragBox = false

    @SwitchProperty({
        name: "&cM7 &0Dragon&f Spawn &eTimer",
        description: 'Draws a "Accurate" &0Dragon&r Spawn &eTimer&r for &cM7&r-&fP5',
        category: "General",
        subcategory: ""
    })
	M7DragTimer = false

    @SwitchProperty({
        name: "Auto &eRefill &3Ender Pearls",
        description: 'Automatically &erefill &3Ender Pearls&r from sack at the start of a dungeon run (does not work properly if you have spirit leaps in inventory)',
        category: "General",
        subcategory: ""
    })
	AutoRefillEnderPearls = false

    @SwitchProperty({
        name: "Dungeon Auto Extra Stats",
        description: "Automatically types the command to show extra the extra dungeon stats at the end of the run",
        category: "General",
        subcategory: ""
    })
    DungeonAutoExtraStats = false

	@SwitchProperty({
        name: "&fCustom FOV",
        description: "&fAllows to set Custom Minecraft FOV (Field of View)",
        category: "General",
        subcategory: ""
    })
	CustomFOV = false

    @SliderProperty({
        name: "&fFOV",
        description: "",
        category: "General",
        subcategory: "",
        min: 30,
        max: 179
    })
    FOV = Client.settings.getFOV();

    @SwitchProperty({
        name: "&fDungeon Mob ESP",
        description: "&fDraw a see through wall box around stared dungeon mobs",
        category: "General",
        subcategory: ""
    })
	DungeonMobESP = false

    @SelectorProperty({
        name: '&dC&bo&dl&bo&dr',
        description: 'Select an option for the Dungeon Mob ESP box color',
        category: 'General',
        subcategory: '',
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
        category: "General",
        subcategory: ""
    })
	PinkDMs = false

	@SwitchProperty({
        name: "&cRemove&r &aSelfie&f Camera",
        description: "&cRemoves&r The &aSelfie&r Mode From F5",
        category: "General",
        subcategory: ""
    })
	RemoveSelfieCamera = false

	@SwitchProperty({
        name: "&cBonzo Mask&r &eTimer&r",
        description: 'Draws a very accurate Display that shows the cooldown of the &cBonzo &cMask&r "Clownin Around" &eAbility&r',
        category: "General",
        subcategory: ""
    })
	BonzoMaskTimer = false
	
    @ButtonProperty({
        name: "§eMove&r &cBonzo Mask&r &eTimer&r",
        description: "&fEdit the &9Bonzo Mask&r &eTimer&r &fPosition and Scale &l(Drag the text to move it, Scroll with the mouse wheel to change the scale of the text) &r&dMake sure that the Toggle is enable before you try to use this option else it wont work",
        category: "Hud",
        subcategory: "",
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
        subcategory: ""
    })
	SpiritMaskTimer = false

    @ButtonProperty({
        name: "§eMove&r &fSpirit Mask&r &eTimer&r",
        description: "&fEdit the Spirit Mask&r &eTimer&r &fPosition and Scale &l(Drag the text to move it, Scroll with the mouse wheel to change the scale of the text) &r&dMake sure that the Toggle is enable before you try to use this option else it wont work",
        category: "Hud",
        subcategory: "",
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
        subcategory: ""
    })
	PhoenixPetTimer = false

    @ButtonProperty({
        name: "§eMove&r &5Phoenix Pet&r &eTimer&r",
        description: "&fEdit the &5Phoenix Pet&r &eTimer&r &fPosition and Scale &l(Drag the text to move it, Scroll with the mouse wheel to change the scale of the text) &r&dMake sure that the Toggle is enable before you try to use this option else it wont work",
        category: "Hud",
        subcategory: "",
        placeholder: "MOVE"
    })
    PTTButtonAction() {
        if (this.PhoenixPetTimer) {
            Client.currentGui.close()
            setTimeout(() => {
                ChatLib.command("Phoenixpetgui", true) 
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
		name: "&cWatcher&r Titles",
		description: "Shows on screen when the &cWatcher&r has finish spawning mobs and when blood is done",
        category: "Titles",
        subcategory: ""
    })
	WatcherAlerts = false

	@SwitchProperty({ 
		name: "M7 &6Ragnarock Axe&r Title",
		description: "Shows on screen when to use &6Ragnarock Axe&r before p5 starts",
        category: "Titles",
        subcategory: ""
    })
	M7Rangarock = false

	@SwitchProperty({ 
		name: "&cM6 &dGyro&r Titles",
		description: "Shows on screen when to &dGyro at Terracotta phase &l(Still need some more work tbh)",
        category: "Titles",
        subcategory: ""
    })
	M6Gyro = false

	@SwitchProperty({ 
		name: "&dLock &bChest &fTitle",
		description: "Shows on screen when the chest you tried to open is locked",
        category: "Titles",
        subcategory: ""
    })
	LockChestAlert = false

	@SwitchProperty({ 
		name: "&cBonzo Mask&r Title",
		description: "Shows on screen when the &cBonzo &cMask&r &eAbility&r has been used",
        category: "Titles",
        subcategory: ""
    })
	BonzoMaskAlert = false

	@SwitchProperty({ 
		name: "&fSpirit Mask&r Title",
		description: "Shows on screen when the &fSpirit &fMask&r &eAbility&r has been used",
        category: "Titles",
        subcategory: ""
    })
	SpiritMaskAlert = false

	@SwitchProperty({ 
		name: "&5Phoenix Pet&r Title",
		description: "Shows on screen when the &5Phoenix &5Pet&r &eAbility&r has been used",
        category: "Titles",
        subcategory: ""
    })
	PhoenixPetAlert = false

	@SwitchProperty({ 
		name: "&cArrows&r Title",
		description: "Shows on screen when you need to get more &cArrows&r",
        category: "Titles",
        subcategory: ""
    })
	ArrowsAlert = false

	

    constructor() {
        this.initialize(this);
        this.setCategoryDescription("General", "&6Toggle &aOn&f/&cOff&f features within the mod");
		this.setCategoryDescription("Titles", "&6Toggle &aOn&f/&cOff&f Titles within this mod");
        this.setSubcategoryDescription("Toggle", "Gray Zone", "&fList of features that are &c&l&nUSE AT YOUR OWN RISK!");
    
        this.addDependency('§eMove&r &bLegit Ghost Pickaxe', '&bLegit Ghost Pickaxe');
        this.addDependency('&fFOV', '&fCustom FOV');
        this.addDependency('&dC&bo&dl&bo&dr', '&fDungeon Mob ESP');
        this.addDependency('§eMove&r &cBonzo Mask&r &eTimer&r', '&cBonzo Mask&r &eTimer&r');
        this.addDependency('§eMove&r &fSpirit Mask&r &eTimer&r', '&fSpirit Mask&r &eTimer&r');
        this.addDependency('§eMove&r &5Phoenix Pet&r &eTimer&r', '&5Phoenix Pet&r &eTimer&r');
        
    }
}

export default new Settings();