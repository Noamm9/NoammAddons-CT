/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { IsInBossRoom, IsInDungeon, registerWhen } from "../utils"


const EntityJoinWorldEvent = net.minecraftforge.event.entity.EntityJoinWorldEvent
const S0DPacketCollectItem = net.minecraft.network.play.server.S0DPacketCollectItem
const C08PacketPlayerBlockPlacement = net.minecraft.network.play.client.C08PacketPlayerBlockPlacement
const EntityItem = net.minecraft.entity.item.EntityItem
const itemEntities = new Map()
let currentBlockClicked = null
let EventEntity
let EventEntityID

const secretItems = new Set([
	"Healing VIII Splash Potion", 
    "Healing Potion 8 Splash Potion", 
    "Decoy", 
    "Inflatable Jerry", 
    "Spirit Leap", 
    "Trap", 
    "Training Weights", 
    "Defuse Kit", 
    "Dungeon Chest Key", 
    "Treasure Talisman", 
    "Revive Stone", 
    "Architect's First Draft"
])

const allowedIDs = new Set([
	"26bb1a8d-7c66-31c6-82d5-a9c04c94fb02", 
    "edb0155f-379c-395a-9c7d-1b6005987ac8"
])

const secretBlocks = new Set([
	"minecraft:chest", 
	"minecraft:lever", 
	"minecraft:skull", 
	"minecraft:trapped_chest"
])

const soundsList = [
	["mob.cat.meow", 1],
	[`mob.blaze.hit`, 2 ],
	["fire.ignite", 1],
    ["random.orb", 1],
    ["random.break", 1],
    ["mob.guardian.land.hit", 1]
]


function playSound() {
    
    World.playSound(
        soundsList[Settings().SecretsSoundType][0], 	// Sound
        1,											// Volume
        soundsList[Settings().SecretsSoundType][1] 	// Pitch
    )
}

function checkEntities(entityID) {
	if (!itemEntities.has(entityID)) return
  
	const obj = itemEntities.get(entityID)
	const entity = obj.entity
  
	const name = entity.func_92059_d()?.func_82833_r()
	if (!name || !secretItems.has(name.removeFormatting())) return
  
    playSound()
	itemEntities.delete(entityID)
}
  
function checkSkullTexture(blockPos) {
	const textureID = World.getWorld().func_175625_s(blockPos.toMCBlock())?.func_152108_a()?.id?.toString()
  
	if (!textureID) return
  
	return allowedIDs.has(textureID)
}
  
function checkClicked(ctBlock, blockPos) {
	const blockName = ctBlock.type.getRegistryName()
  
	if (
		  !secretBlocks.has(blockName) ||
		  blockName === "minecraft:skull" && !checkSkullTexture(blockPos) ||
		  ctBlock.toString() === currentBlockClicked
	) return
  
	playSound()
	currentBlockClicked = ctBlock.toString()
  
	Client.scheduleTask(1, () => currentBlockClicked = null)
}


const EntityJoinWorldEventTrigger = register(EntityJoinWorldEvent, (event) => {
	if (!(event.entity instanceof EntityItem)) return
	  
	EventEntity = event.entity
	EventEntityID = EventEntity.func_145782_y()
	  
	itemEntities.set(EventEntityID, { entity: EventEntity })
	  
}).unregister()


const stepTrigger = register("step", () => checkEntities(EventEntityID)).setFps(5).unregister()

const packetReceivedTrigger = register("packetReceived", (packet) => {
	const entityID = packet.func_149354_c()
	checkEntities(entityID)
}).setFilteredClass(S0DPacketCollectItem).unregister()

const packetSentTrigger = register("packetSent", (packet) => {
	const position = packet.func_179724_a()
	const blockPosition = new BlockPos(position)
	
	const [ x, y, z ] = [blockPosition.x, blockPosition.y, blockPosition.z]
	const ctBlock = World.getBlockAt(x, y, z)
	
	checkClicked(ctBlock, blockPosition)
}).setFilteredClass(C08PacketPlayerBlockPlacement).unregister()


const soundPlaytTrigger = register("soundPlay", (_, name) => { 
	if (["mob.bat.hurt", "mob.bat.death"].some(n => n == name)) playSound()
}).unregister()


register("worldUnload", () => {
	itemEntities.clear()
    currentBlockClicked = null
})


function Checkfunc() {
	return Settings().SecretsSound && IsInDungeon() && !IsInBossRoom()
}

registerWhen(packetReceivedTrigger, Checkfunc)
registerWhen(packetSentTrigger, Checkfunc)
registerWhen(soundPlaytTrigger, Checkfunc)
registerWhen(EntityJoinWorldEventTrigger, Checkfunc)
registerWhen(stepTrigger, Checkfunc)