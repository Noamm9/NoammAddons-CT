/// <reference types="..//CTAutocomplete" />
/// <reference lib="es2015" />


import { @Vigilant, @TextProperty, @ColorProperty, @ButtonProperty, @SwitchProperty, @SliderProperty, Color } from 'Vigilance';
const PropertyType = Java.type("gg.essential.vigilance.data.PropertyType");

@Vigilant(
    "NoammAddons",
    guiTitle = "§dNoamm§bAddons"
)
class Settings {
    @SwitchProperty({
        name: "&l&cI HATE CARPETS",
        description: "Replace all Carpet blocks in a radius of 3 block from the Player to AirBlocks to avoid useless LagBacks",
        category: "Toggle",
        subcategory: ""
    })
    IHateCarpets = false;
    
    @SwitchProperty({
        name: "&l&cI HATE DIORITE",
        description: "Replace the Diorite blocks at the F7/M7 P2 to Glass blocks in older to see Storm get Crushed better (Alternative to trying to see his name tag through the blocks)",
        category: "Toggle",
        subcategory: ""
    })
    IHateDiorite = false
    
	@SwitchProperty({
        name: "&bLegit Ghost Pickaxe",
        description: "&fThis is meant for people that lock all of their the inventory slots and are too lazy to unlock them every time they want to create a ghost pickaxe &l(Controlled by a keybind within Options/Controls)",
        category: "Toggle",
        subcategory: ""
    })
	LegitGhostPickaxe = false
    
    @ButtonProperty({
        name: "§eMove&r &bLegit Ghost Pickaxe",
        description: "&fEdit the &bLegit Ghost Pickaxe&r &fPosition and Scale &l(Drag the text to move it, Scroll with the mouse wheel to change the scale of the text) &r&dMake sure that the Toggle is enable before you try to use this option else it wont work",
        category: "Edit GUI",
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
        category: "Toggle",
        subcategory: ""
    })
    NoSwordBlock = false
    
	@SliderProperty({
        name: "Scale",
		description: "Legit Ghost Pickaxe - Scale",
    	category: "Toggle",
    	subcategory: "Gray Zone",
        min: 30,
    	max: 1000,
        hidden: true
    })
    PickScale = 500;

    @SwitchProperty({
        name: "&cM7 &0Dragon&r Box",
        description: "Draws a very accurate &0Dragon&r Kill Box for &cM7&r-&fP5",
        category: "Toggle",
        subcategory: ""
    })
	M7DragBox = false

    @SwitchProperty({
        name: "&cM7 &0Dragon&f Spawn &eTimer",
        description: 'Draws a "Accurate" &0Dragon&r Spawn &eTimer&r for &cM7&r-&fP5',
        category: "Toggle",
        subcategory: ""
    })
	M7DragTimer = false


    @SwitchProperty({
        name: "Auto &eRefill &3Ender Pearls",
        description: 'Automatically &erefill &3Ender Pearls&r from sack at the start of a dungeon run (does not work properly if you have spirit leaps in inventory)',
        category: "Toggle",
        subcategory: ""
    })
	AutoRefillEnderPearls = false

	@SwitchProperty({
        name: "&fCustom FOV",
        description: "&fAllows to set Custom Minecraft FOV (Field of View)",
        category: "Toggle",
        subcategory: ""
    })
	CustomFOV = false

    @SliderProperty({
        name: "&fFOV",
        description: "",
        category: "Toggle",
        subcategory: "",
        min: 30,
        max: 179
    })
    FOV = Client.settings.getFOV();

	@SwitchProperty({
        name: "&dPink&r DMs",
        description: "&fChanges the Color of the Private massage in Hypixel from &7Gray &fto &dPink",
        category: "Toggle",
        subcategory: ""
    })
	PinkDMs = false

	@SwitchProperty({
        name: "&cRemove&r &aSelfie&f Camera",
        description: "&cRemoves&r The &aSelfie&r Mode From F5",
        category: "Toggle",
        subcategory: ""
    })
	RemoveSelfieCamera = false

	@SwitchProperty({
        name: "&cBonzo Mask&r &eTimer&r",
        description: 'Draws a very accurate Display that shows the cooldown of the &cBonzo &cMask&r "Clownin Around" &eAbility&r',
        category: "Toggle",
        subcategory: ""
    })
	BonzoMaskTimer = false
	
    @ButtonProperty({
        name: "§eMove&r &cBonzo Mask&r &eTimer&r",
        description: "&fEdit the &9Bonzo Mask&r &eTimer&r &fPosition and Scale &l(Drag the text to move it, Scroll with the mouse wheel to change the scale of the text) &r&dMake sure that the Toggle is enable before you try to use this option else it wont work",
        category: "Edit GUI",
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

	@SliderProperty({
		name: "Scale",
		description: "&9Bonzo Mask&r &eTimer&r - Scale",
    	category: "Toggle",
    	subcategory: "",
   		min: 30,
    	max: 1000,
        hidden: true
    })
    BonzoScale = 200;

	@SliderProperty({
        name: "X",
        description: "&9Bonzo Mask&r &eTimer&r - X",
        category: "Toggle",
        subcategory: "",
        min: 0,
        max: 1000,
        hidden: true
    })
    BonzoX = 650;

	@SliderProperty({
        name: "Y",
        description: "&9Bonzo Mask&r &eTimer&r - Y",
        category: "Toggle",
        subcategory: "",
        min: 0,
        max: 1000,
        hidden: true
    })
    BonzoY = 10;
	
	@SwitchProperty({
        name: "&fSpirit Mask&r &eTimer&r",
        description: 'Draws a very accurate Display that shows the cooldown of the &fSpirit Mask&r "Second Wind" &eAbility&r',
        category: "Toggle",
        subcategory: ""
    })
	SpiritMaskTimer = false

    @ButtonProperty({
        name: "§eMove&r &fSpirit Mask&r &eTimer&r",
        description: "&f9Edit the Spirit Mask&r &eTimer&r &fPosition and Scale &l(Drag the text to move it, Scroll with the mouse wheel to change the scale of the text) &r&dMake sure that the Toggle is enable before you try to use this option else it wont work",
        category: "Edit GUI",
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

	@SliderProperty({
		name: "Scale",
		description: "&fSpirit Mask&r &eTimer&r - Scale",
    	category: "Toggle",
    	subcategory: "",
   		min: 30,
    	max: 1000,
        hidden: true
    })
    SpiritScale = 200;

	@SliderProperty({
        name: "X",
        description: "&fSpirit Mask&r &eTimer&r - X",
        category: "Toggle",
        subcategory: "",
        min: 0,
        max: 1000,
        hidden: true
    })
    SpiritX = 650;

	@SliderProperty({
        name: "Y",
        description: "&fSpirit Mask&r &eTimer&r - Y",
        category: "Toggle",
        subcategory: "",
        min: 0,
        max: 1000,
        hidden: true
    })
    SpiritY = 30;

	@SwitchProperty({
        name: "&5Phonix Pet&r &eTimer&r",
        description: 'Draws a very accurate Display that shows the cooldown of the &5Phonix Pet&r "Rekindle" &eAbility&r',
        category: "Toggle",
        subcategory: ""
    })
	PhonixPetTimer = false

    @ButtonProperty({
        name: "§eMove&r &5Phonix Pet&r &eTimer&r",
        description: "&fEdit the &5Phonix Pet&r &eTimer&r &fPosition and Scale &l(Drag the text to move it, Scroll with the mouse wheel to change the scale of the text) &r&dMake sure that the Toggle is enable before you try to use this option else it wont work",
        category: "Edit GUI",
        subcategory: "",
        placeholder: "MOVE"
    })
    PTTButtonAction() {
        if (this.PhonixPetTimer) {
            Client.currentGui.close()
            setTimeout(() => {
                ChatLib.command("phonixpetgui", true) 
            }, 100)
        }
    }

	@SliderProperty({
		name: "Scale",
		description: "&5Phonix Pet&r &eTimer&r - Scale",
    	category: "Toggle",
    	subcategory: "",
   		min: 30,
    	max: 1000,
        hidden: true
    })
    PhonixScale = 200;

	@SliderProperty({
        name: "X",
        description: "&5Phonix Pet&r &eTimer&r - X",
        category: "Toggle",
        subcategory: "",
        min: 0,
        max: 1000,
        hidden: true
    })
    PhonixX = 650;

	@SliderProperty({
        name: "Y",
        description: "&5Phonix Pet&r &eTimer&r - Y",
        category: "Toggle",
        subcategory: "",
        min: 0,
        max: 1000,
        hidden: true
    })
    PhonixY = 50;

	@SwitchProperty({ 
		name: "&dShort &bSky&dBlock &bCommands",
		description: "Enables a list of useful &dshort&r version of &bsky&dblock's &bcommands&r (type /ssbc for help)",
        category: "Toggle",
        subcategory: ""
    })
	ShortSkyBlockCommands = false

	@SwitchProperty({ 
		name: "&cWatcher&r Alerts",
		description: "Shows on screen when the &cWatcher&r has finish spawning mobs and when blood is done",
        category: "Alerts",
        subcategory: ""
    })
	WatcherAlerts = false

	@SwitchProperty({ 
		name: "M7 &6Ragnarock Axe&r Alert",
		description: "Shows on screen when to use &6Ragnarock Axe&r before p5 starts",
        category: "Alerts",
        subcategory: ""
    })
	M7Rangarock = false

	@SwitchProperty({ 
		name: "&cM6 &dGyro&r Alerts",
		description: "Shows on screen when to &dGyro at Terracotta phase &l(Still need some more work tbh)",
        category: "Alerts",
        subcategory: ""
    })
	M6Gyro = false

	@SwitchProperty({ 
		name: "&dLock &bChest &fAlert",
		description: "Shows on screen when the chest you tried to open is locked",
        category: "Alerts",
        subcategory: ""
    })
	LockChestAlert = false

	@SwitchProperty({ 
		name: "&cBonzo Mask&r Alert",
		description: "Shows on screen when the &cBonzo &cMask&r &eAbility&r has been used",
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
		name: "&5Phonix Pet&r Alert",
		description: "Shows on screen when the &5Phonix &5Pet&r &eAbility&r has been used",
        category: "Alerts",
        subcategory: ""
    })
	PhonixPetAlert = false

	@SwitchProperty({ 
		name: "&cArrows&r Alert",
		description: "Shows on screen when you need to get more &cArrows&r",
        category: "Alerts",
        subcategory: ""
    })
	ArrowsAlert = false

	

    constructor() {
        this.initialize(this);
        this.setCategoryDescription("Toggle", "&6Toggle &aOn&f/&cOff&f features within the mod")
		this.setCategoryDescription("Alerts", "&6Toggle &aOn&f/&cOff&f Alerts within this mod")
        this.setSubcategoryDescription("Toggle", "Gray Zone", "&fList of features that are &c&l&nUSE AT YOUR OWN RISK!")
    }
}

export default new Settings();