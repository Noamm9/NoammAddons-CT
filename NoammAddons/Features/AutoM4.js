/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Dungeon from "../../BloomCore/dungeons/Dungeon"
import Settings from "../Settings"
import { IsInBossRoom, ModMessage, MyMath, PlayerUtils, registerWhen, C08PacketPlayerBlockPlacement } from "../utils"


const keybinds = {
	forward: Client.getMinecraft().field_71474_y.field_74351_w.func_151463_i(),
	jump: Client.getMinecraft().field_71474_y.field_74314_A.func_151463_i(),
	sneak: Client.getMinecraft().field_71474_y.field_74311_E.func_151463_i()
}

const isUnderTorn = (TornEntity) => MyMath.DistanceIn2dWorld(TornEntity.getX(), TornEntity.getZ(), Player.getX(), Player.getZ()) <=20

function SetState(KeyCode, boolean) {
    Java.type("net.minecraft.client.settings.KeyBinding").func_74510_a(KeyCode, boolean)
}


let swapeed = false
let walked = false
let walking = false
let rotated = false
let ee


registerWhen(register(`step`, () => {
    try {
        const e = World.getAllEntitiesOfType(Java.type("net.minecraft.entity.monster.EntityGhast"))[0]

        if (e && Player?.getHeldItem()?.getName()?.removeFormatting()?.toLowerCase() == `spirit bow`) {
            ee = e
            Walk(e?.getX(), e?.getY()-4, e.getZ())
            StopWalking(isUnderTorn(e), e?.getX(), e?.getY()-4, e.getZ())
        }


        let a = Player?.getInventory()?.getItems()?.find(item => item?.getName()?.removeFormatting()?.toLowerCase() == `spirit bow`)
        let b = !(Player?.getPlayer()?.field_71071_by?.field_70461_c == 8)
        let c = !rotated && !walking && !walked

        if (a && b && c && !swapeed) {
            setTimeout(() => PlayerUtils.swapToSlot(8), 500)
            swapeed = true
        }

        
            
        

    } catch (error) {ChatLib.chat(error)}
}), () => IsInBossRoom() && Dungeon.floorNumber == 4 && Settings().AutoM4)


function Walk(x, y ,z, Jump = true) {
    if (!walking) {
        if (walked) return

        let [ PosYaw, PosPitch ] = PlayerUtils.calcYawPitch({x: x, y: y, z: z})
        PlayerUtils.rotateSmoothly(PosYaw, PosPitch, 500, !walking)

        SetState(keybinds.forward, true)
        if (Jump) SetState(keybinds.jump, true)
        walking = true
        
    }
}

function StopWalking(Check, x,y,z, sneak=true) {
    if (Check && walking && !walked) {
        SetState(keybinds.forward, false)
        if (sneak) SetState(keybinds.sneak, true)
        walked = true
        walking = false
        if (IsReturning) { 
            SetState(keybinds.jump, false)
            return true
        }
        Aimbot(x,y,z)
        Shoot.start()


    }
}


function Aimbot(x,y,z) {
    if (!rotated) {
        let [ yaw, pitch ] = PlayerUtils.calcYawPitch({x: x+0.5, y: y+4, z: z+0.5})
        PlayerUtils.rotateSmoothly(yaw, pitch, 700)
        rotated = true
    }
}

const Shoot = new Thread(() => {
    PlayerUtils.HoldClick(true, `Right`)
    Thread.sleep(700)
    let [ yaw, pitch ] = PlayerUtils.calcYawPitch({x: ee?.getX()+0.5, y: ee?.getY()+4, z: ee?.getZ()+0.5})
    PlayerUtils.rotateSmoothly(yaw, pitch, 700)
    Thread.sleep(1000)
    PlayerUtils.HoldClick(false, `Right`)
    Thread.sleep(400)
    Reset()
    PlayerUtils.swapToSlot(1)
    IsOnSpawn = false
})


//register(`chat`, () => Reset()).setChatCriteria(/\[BOSS\] Thorn: (I feel\.\.\.dizzy\.\.\.|It hurts\.\.\.what a delicate feeling\.\.\.|Round and round, another wound\.|My energy, it goes away\.\.\.)/)




let IsOnSpawn = false
let IsReturning = false
function Reset() {
    rotated = false
    walking = false
    walked = false
    swapeed = false
    IsReturning = false

    SetState(keybinds.sneak, false)
    SetState(keybinds.jump, false)
}



register(`step`, () => {
    if ( IsOnSpawn || !IsInBossRoom() || !World.isLoaded() || Dungeon.floorNumber != 4  || !Settings().AutoM4) return
    let checkfunccc = MyMath.DistanceIn2dWorld(Player.getX(), Player.getZ(), 4, 5) <= 6

    IsReturning = true
    
    Aimbot(5, 69+2-4, 5)
    Walk(4, 69+2, 4, false)
    if (StopWalking(checkfunccc, -1, 71, 34, false)) {

        IsReturning = false
        

        new Thread(() => {
            Thread.sleep(1000)
            let [ yaw, pitch ] = PlayerUtils.calcYawPitch({ x: 5.5, y: 69, z: 4.5 })
            PlayerUtils.rotateSmoothly(yaw, pitch, 450)

            Thread.sleep(300)
            PlayerUtils.swapToSlot(3)
            SetState(keybinds.sneak, true)
            Thread.sleep(150)

            Client.sendPacket(new C08PacketPlayerBlockPlacement(Player.getHeldItem()?.getItemStack() ?? null))
            Thread.sleep(100)
            SetState(keybinds.sneak, false)
            Thread.sleep(300)

            let [ yaww, pitchh ] = PlayerUtils.calcYawPitch({ x: -0.5, y: 69+3, z: 34.5 })
            PlayerUtils.rotateSmoothly(yaww, pitchh, 450)
            PlayerUtils.swapToSlot(1)
            IsOnSpawn = true

            Reset()

        }).start()
    }
})

