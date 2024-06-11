
import { colorShift, getCurrentRoom, getRoom, getRoomCenter, rooms } from "../../BloomCore/utils/Utils"
import Dungeons from "../../Atomx/skyblock/Dungeons"
import PogObject from "../../PogData"


const BlockPoss = Java.type("net.minecraft.util.BlockPos") 
const WhiteGlass = new BlockType("stained_glass").getDefaultState()
const Chest = new BlockType(`chest`).getDefaultState()

function setAir (BlockPoss) {
    World.getWorld().func_175698_g(BlockPoss)
}  

function GhostBlock (BlockPoss, MCIBlockState) {
    World.getWorld().func_175656_a(BlockPoss, MCIBlockState);
}

let RoomCenter
register("command", ()=> {
    RoomCenter = getRoomCenter(Player.getX(), Player.getZ())
    ChatLib.chat(`x: ${RoomCenter[0]}, y: 0, z: ${RoomCenter[1]}`)
    let newxyz = {x: (-161 - RoomCenter[0]), y: 69, z: (-148 - RoomCenter[1])}


    GhostBlock(new BlockPoss(RoomCenter[0] + newxyz.x, newxyz.y, RoomCenter[1] + newxyz.z), WhiteGlass)
    ChatLib.chat(`${Dungeons.getCurrentFloor()}`)

}).setName("getcenter")

Dungeons.onRoomIDEvent((name) => {
    if (name == "Slime") {
        ChatLib.chat(`Detected in room: ${name} running function`)


        RoomCenter = getRoomCenter(Player.getX(), Player.getZ())
        if (RoomCenter[0] < 0) RoomCenter[0] *= -1       
        if (RoomCenter[1] < 0) RoomCenter[1] *= -1   
        
        ChatLib.chat(`RoomCenter: x: ${RoomCenter[0]}, y: 0, z: ${RoomCenter[1]}`)

        for (let i = 0; i<RoomEditData.Coords.length ; i++) {
            
            
            
            
            let Cords = RoomEditData.Coords[i]
            if (Cords[0] < 0) Cords[0] *= -1
            if (Cords[2] < 0) Cords[2] *= -1


            let newxyz = {
                x: (Cords[0] - RoomCenter[0]), 
                y: Cords[1],  
                z: (Cords[2] - RoomCenter[1])}
    
            ChatLib.chat(`x: ${newxyz.x}, y: ${newxyz.y}, z: ${newxyz.z}`)

          //  RoomCenter: x: 153, y: 0, z: 25
            GhostBlock(new BlockPoss(RoomCenter[0] + newxyz.x, newxyz.y, RoomCenter[1] + newxyz.z), WhiteGlass)
        }
    
    }

})

ChatLib.chat(1-(-1))

let RoomEditData = new PogObject(`NoammAddons`,
    {
     "Coords": [
        [-88, 87, -140], [-88, 87, -141], [-88, 87, -142], [-88, 87, -143], [-88, 87, -144], [-88, 87, -145], [-88, 87, -146], [-88, 87, -147],[-88, 87, -148]
     ]
        
    }
)
