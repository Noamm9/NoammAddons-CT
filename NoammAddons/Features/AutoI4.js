/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { PlayerUtils, prefix, F7PhaseCriterias, Alert } from "../utils"
import { EntityArmorStand } from "../../BloomCore/utils/Utils"


const DevBlocks = [
    { x: 64, y: 126, z: 50 },
    { x: 66, y: 126, z: 50 },
    { x: 68, y: 126, z: 50 },
    { x: 64, y: 128, z: 50 },
    { x: 66, y: 128, z: 50 },
    { x: 68, y: 128, z: 50 },
    { x: 64, y: 130, z: 50 },
    { x: 66, y: 130, z: 50 },
    { x: 68, y: 130, z: 50 }
]

const RightClickKey = Client.getMinecraft().field_71474_y.field_74313_G
let doneCoords = new Set()
let wait
let Alerted = true


function IsOnDev() {
    return Player.getY() == 127 && Player.getX() >= 62 && Player.getX() <= 65 && Player.getZ() >= 34 && Player.getZ() <= 37
}


register("step", () => {
    if (!Settings().AutoI4) return
    if (Player.getHeldItem()?.getID() !== 261) return
    if (!IsOnDev()) {
        if (doneCoords.size > 1) PlayerUtils.HoldClick(false)
        doneCoords.clear()
        Alerted = false
        return
    }

    const possible = DevBlocks.filter(coord => !doneCoords.has(coord))
    if (!possible.length) return

    const emeraldLocation = possible.find(({ x, y, z }) => World.getBlockAt(x, y, z).type.getID() === 133)
    if (!emeraldLocation) return
    
    doneCoords.add(emeraldLocation)
    
    
    let xdiff = 0.5;
    if (emeraldLocation.x === 68 || emeraldLocation.x === 66) xdiff = -0.6
    else if (emeraldLocation.x === 64) xdiff = 1.3
    


    let [yaw, pitch] = PlayerUtils.calcYawPitch({ x: emeraldLocation.x + xdiff, y: emeraldLocation.y + 1.1, z: emeraldLocation.z })


    PlayerUtils.rotateSmoothly(yaw, pitch, 200)
    wait = true
    setTimeout(() => wait = false, 250) 

    setTimeout(() => {if (!RightClickKey.func_151468_f()) PlayerUtils.HoldClick(true)},310) 


    new Thread(() => {
        if (doneCoords.size === 5) {
            let TermSlot = Player.getPlayer().field_71071_by.field_70461_c
            Player.getInventory().getItems().forEach((item, index) => {
                if (index > 8 || !item || !item.getName().removeFormatting().toLowerCase().includes(`rod`)) return

                PlayerUtils.HoldClick(false)
                PlayerUtils.swapToSlot(index)
                Thread.sleep(100)
                PlayerUtils.Click(`right`);
                Thread.sleep(100)
                PlayerUtils.swapToSlot(TermSlot)
            })
            return
        }

        Thread.sleep(350)
        if (World.getBlockAt(emeraldLocation.x, emeraldLocation.y, emeraldLocation.z).type.getID() !== 133 || wait) { 
            RightClickKey.func_74510_a(RightClickKey.func_151463_i(), false)
            return
        }
    
        const remaining = DevBlocks.filter(coord => !doneCoords.has(coord))
        if (!remaining.length) return
    
        const randomIndex = Math.floor(Math.random() * remaining.length)
        const nextTarget = remaining[randomIndex]
        let xdiff = 0.5
    
    
        if (nextTarget.x === 68 || nextTarget.x === 66) xdiff = -0.6
        else if (nextTarget.x === 64) xdiff = 1.3
    
        
        let [yaw, pitch] = PlayerUtils.calcYawPitch({ x: nextTarget.x + xdiff, y: nextTarget.y + 1.1, z: nextTarget.z })
        
        PlayerUtils.rotateSmoothly(yaw, pitch, 200)
    }).start()
});



let TickTimer = 0

register(`chat`, () => {
    setTimeout(() => {
        TickTimer = 0
        TickRegister.register()
        ChatTrigger.register()
    }, 7_200)
}).setCriteria(F7PhaseCriterias[2])



const TickRegister = register(`packetReceived`, () => {
    TickTimer++

    if (TickTimer == 110) {
        LeapAction.start()
        TickRegister.unregister()
        ChatTrigger.unregister()
    }


    if (Alerted || !IsOnDev()) return
        
    if (
        World.getAllEntitiesOfType(EntityArmorStand).filter(
        entity => entity.getName().removeFormatting().toLowerCase() == "device" || entity.getName().removeFormatting().toLowerCase() == "active")
        .filter(entity => `${Math.ceil(entity.getX()-1)}, ${Math.ceil(entity.getY()+1)}, ${Math.ceil(entity.getZ())}` == "63, 127, 35").length != 2
    ) return
    
    
    Alerted = true
    ChatLib.say(`/pc ${prefix.removeFormatting()} I4 Done!`)
    Alert(`I4 Done!`, 3)
    PlayerUtils.HoldClick(false)

}).setFilteredClass(Java.type("net.minecraft.network.play.server.S32PacketConfirmTransaction")).unregister()



const LeapAction = new Thread(() => {
    if (!IsOnDev()) return
    let runned = false

    Player?.getInventory()?.getItems()?.forEach((item, index) => {
        if (runned || index > 8 || !item || !item?.getName()?.removeFormatting()?.toLowerCase()?.includes(`leap`)) return
        PlayerUtils.HoldClick(false)
        runned = true

        PlayerUtils.swapToSlot(index)
        Thread.sleep(50)

        PlayerUtils.Click(`right`);

        while (!Client.isInGui()) {} // dynamic Cooldown for the Thread
        Thread.sleep(150) // time for items to load

        let container = Player.getContainer()
        const MageSlot = container.getStackInSlot(14)
        const HealerSlot = container.getStackInSlot(11)
        
        container.getItems().forEach((_item, _index) => {
            if (!_item) return
            
            if (!MageSlot.getLore().join().removeFormatting().match(/This player is currently dead!|This player is offline!/)) return container.click(14, false, 'middle')

            if (!HealerSlot.getLore().join().removeFormatting().match(/This player is currently dead!|This player is offline!/)) return container.click(11, false, 'middle')
                     
            // Too lazy to find the Class of those
            if (!container.getStackInSlot(12).getLore().join().removeFormatting().match(/This player is currently dead!|This player is offline!/)) return container.click(11, false, 'middle')
            
            if (!container.getStackInSlot(15).getLore().join().removeFormatting().match(/This player is currently dead!|This player is offline!/)) return container.click(15, false, 'middle')
                
            /*
            if (playerClass == "Tank" && !isPlayerDead) {
                container.click(_index, false, 'middle')
                return
            }
            if (playerClass == "Berserk" && !isPlayerDead) {
                container.click(_index, false, 'middle')
                return
            }*/



        })
    })
})


const ChatTrigger = register(`chat`, () => {
    if (Alerted || !IsOnDev()) return
    Alerted = true
    ChatLib.say(`/pc ${prefix.removeFormatting()} I4 Done!`)
    Alert(`&a&lI4 Done!`, 3)
    
}).setCriteria(/(.+) completed a device! \(...\)/).unregister()




























register(`command`, () => {
    new Thread(() => {
        let runned = false
    
        Player?.getInventory()?.getItems()?.forEach((item, index) => {
            if (runned || index > 8 || !item || !item?.getName()?.removeFormatting()?.toLowerCase()?.includes(`leap`)) return
            runned = true
            PlayerUtils.HoldClick(false)

            PlayerUtils.swapToSlot(index)
            Thread.sleep(50)
            PlayerUtils.Click(`right`);
            while (!Client.isInGui()) {} // dynamic Cooldown for the Thread
            Thread.sleep(150) // time for items to load
            let container = Player.getContainer()
            const MageSlot = container.getStackInSlot(14)
            const HealerSlot = container.getStackInSlot(11)
            
            container.getItems().forEach((_item, _index) => {
                if (!_item) return
                
                if (!MageSlot.getLore().join().removeFormatting().match(/This player is currently dead!|This player is offline!/)) return container.click(14, false, 'middle')

                if (!HealerSlot.getLore().join().removeFormatting().match(/This player is currently dead!|This player is offline!/)) return container.click(11, false, 'middle')
                         
                // Too lazy to find the Class of those
                if (!container.getStackInSlot(12).getLore().join().removeFormatting().match(/This player is currently dead!|This player is offline!/)) return container.click(11, false, 'middle')
                
                if (!container.getStackInSlot(15).getLore().join().removeFormatting().match(/This player is currently dead!|This player is offline!/)) return container.click(15, false, 'middle')

                /*
                if (playerClass == "Tank" && !isPlayerDead) {
                    container.click(_index, false, 'middle')
                    return
                }
                if (playerClass == "Berserk" && !isPlayerDead) {
                    container.click(_index, false, 'middle')
                    return
                }*/



            })
        })
    }).start()
}).setName(`test3`)



    
/*

register(`step`, () => {
    if (Alerted || !(World.getAllEntitiesOfType(EntityArmorStand).filter(entity => entity.getName().removeFormatting().toLowerCase() == "device" || entity.getName().removeFormatting().toLowerCase() == "active").filter(entity => `${Math.ceil(entity.getX()-1)}, ${Math.ceil(entity.getY()+1)}, ${Math.ceil(entity.getZ())}` == "63, 127, 35").length == 2) || !(Player.getY() == 127 && Player.getX() >= 62 && Player.getX() <= 65 && Player.getZ() >= 34 && Player.getZ() <= 37)) return
    
    Alerted = true
    ModMessage(`I4 Done!`)
    Render.Title(`&aDev Completed!`, 2, 3000, undefined, Renderer.screen.getHeight()/3)
    ChatLib.say(`/pc ${prefix.removeFormatting()} I4 Done!`)
    PlayerUtils.HoldClick(false)

})

*/