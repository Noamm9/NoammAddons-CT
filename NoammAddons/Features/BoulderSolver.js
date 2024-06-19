/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { IsInBossRoom, IsInDungeon, ModMessage, Render, registerWhen } from "../utils";
import { getRoomCenter, getCurrentRoom } from "../../BloomCore/utils/Utils"
const solutions = JSON.parse(FileLib.read("NoammAddons", "RandomShit/BoulderSolutions.json"))


const relativeCoords = {
    ironbar: [ 0, 70, -12 ],
    chest: [ 0, 66, -14 ],
    firstbox: [ -9, 66, -9 ]
}

const offsetsToCheck = [
    [0, 16],
    [-16, 0],
    [0, -16],
    [16, 0]
]

const gridBlocks = new Set()
const cachedRotations = new Map()
const listeners = []

let renderBlocks = []
let hasSolution = false
let enteredRoomAt = null
let puzzleDone = false
let lastDungIndex = null
let idxTicks = 0



function getRealCoord(array, rotation) {
    const [ cx, cz ] = getRoomCenter(Player.getX(), Player.getZ())
    const [ dx, dy, dz ] = rotateCoords(array, 360 - rotation)

    return [ cx + dx, dy, cz + dz ]
}


function rotateCoords(array, degree) {
    if (degree < 0) degree = degree + 360

    if (degree == 0) return array
    if (degree == 90) return [array[2], array[1], -array[0]]
    if (degree == 180) return [-array[0], array[1], -array[2]]
    if (degree == 270) return [-array[2], array[1], array[0]]
    return array
}


function onPuzzleRotation(fn) { listeners.push(fn) }


function getPuzzleRotation() {
    const xIndex = Math.floor((Player.getX() + 200) / 32)
    const zIndex = Math.floor((Player.getZ() + 200) / 32)
    const centerX = xIndex * 32 - 200 + 15
    const centerZ = zIndex * 32 - 200 + 15

    let rotation = null

    for (let i = 0; i < offsetsToCheck.length; i++) {
        let [ dx, dz ] = offsetsToCheck[i]
        let [ rx, ry, rz ] = [ centerX + dx, 68, centerZ + dz ]

        let block = World.getBlockAt(rx, ry, rz)
        let bottomBlock = World.getBlockAt(rx, ry - 1, rz)
        let topBlock = World.getBlockAt(rx, ry + 1, rz)

        if (bottomBlock.type.getID() !== 7 || topBlock.type.getID() !== 0) continue
        if (block.type.getID() === 0) continue
    

        if (rotation !== null) return
    
        rotation = i*90
    }

    return rotation
}

register("tick", () => {
    if (!IsInDungeon() || IsInBossRoom()) return

    const posIndex = getDungeonsPosIndex()

    if (posIndex === lastDungIndex && idxTicks !== 0 && idxTicks % 20 === 0) return

    lastDungIndex = posIndex
    idxTicks++

    const rotation = cachedRotations.get(posIndex)?.rotation ?? getPuzzleRotation()
    if (rotation == null) return

    if (!cachedRotations.get(posIndex)) cachedRotations.set(posIndex, { rotation: rotation })

    listeners.forEach(fn => fn(rotation, posIndex))
})

registerWhen(register("worldUnload", () => {
    lastDungIndex = null
    idxTicks = 0
    cachedRotations.clear()
}), () => Settings.BoulderSolver)

function getDungeonsPosIndex() {
    const xIndex = Math.floor((Player.getX() + 200) / 32)
    const zIndex = Math.floor((Player.getZ() + 200) / 32)
    const posIndex = xIndex * 6 + zIndex

    return posIndex
}



function getBoulderGrid(rotation) {
    const [ rx, ry, rz ] = relativeCoords.firstbox
    let str = ""
    let solutionNumber 

    for (let z = 0; z <= 15; z += 3) {
        for (let x = 0; x <= 18; x += 3) {
            let block = World.getBlockAt(...getRealCoord([rx + x, ry, rz + z], rotation))

            if (block.type.getID() === 0) str += "0"
            else str += "1"
        }
    }

    if (str === "010000010111101001010011100000101110000111") solutionNumber = "ONE"
    if (str === "100000111101111011101110001110111010000000") solutionNumber = "TWO"
    if (str === "110001110111011010001100111111100011000001") solutionNumber = "THREE"
    if (str === "100100101000100010100010101000101000100010") solutionNumber = "FOUR"
    if (str === "000000011111101001010011100000101110000110") solutionNumber = "FIVE"
    if (str === "000000001111100100010010001011111110000000") solutionNumber = "SIX"
    if (str === "000000010101110101010011010000010100000000") solutionNumber = "SEVEN"
    if (str === "100101001000000010101001111101010101010101") solutionNumber = "EIGHT"
    
    
    return solutionNumber
}

function reset() {
    enteredRoomAt = null
    renderBlocks = []
    scanAgain = false
    gridBlocks.clear()
}


onPuzzleRotation((rotation, posIndex) => {
    if (!IsInDungeon() || !Settings.BoulderSolver || enteredRoomAt || puzzleDone) return
    
    const block = World.getBlockAt(...getRealCoord(relativeCoords.ironbar, rotation))

    if (block.type.mcBlock !== net.minecraft.init.Blocks.field_150411_aY) return

    const theGrid = getBoulderGrid(rotation)

    const currentSolution = solutions.solutions[theGrid]

    if (!currentSolution) return ModMessage(`&bBoulder room variant not found in the data`)

    ModMessage(`&bBoulder room detected`)
    hasSolution = true

    currentSolution?.forEach(coord => {
        const solutionBlock = World.getBlockAt(...getRealCoord(coord, rotation))

        renderBlocks.push(solutionBlock)
        gridBlocks.add(solutionBlock)
    })

    enteredRoomAt = Date.now()
})

function renderSolutions() {
    if (!World.isLoaded() || !renderBlocks.length) return

    const [r, g, b, a] = [ Settings.BoulderSolverColor.getRed()/255, Settings.BoulderSolverColor.getGreen()/255, Settings.BoulderSolverColor.getBlue()/255, Settings.BoulderSolverColor.getAlpha()/255 ]

    renderBlocks?.forEach(block => 
        Render.FilledOutLineBox(
            block.x+0.5, block.y, block.z+0.5,
            1,
            1,
            r,
            g,
            b,
            a,
            true
        ))
}

function onBlockPlacement(block) {
    if (!World.isLoaded() || !IsInDungeon() || !enteredRoomAt) return

    if (block.type.mcBlock === net.minecraft.init.Blocks.field_150486_ae) {
        if (enteredRoomAt) ModMessage(`&dBoulder took&f: &6${((Date.now() - enteredRoomAt) / 1000).toFixed(2)}s`)
        puzzleDone = true

        reset()

        return
    }

    if (block.type.mcBlock === net.minecraft.init.Blocks.field_150444_as || block.type.mcBlock === net.minecraft.init.Blocks.field_150430_aB) {
        let blocksScanned = 0

        gridBlocks.forEach(gBlock => {
            const distance = gBlock.pos.compareTo(block.pos)

            if (distance < 1 && distance > 2) return

            blocksScanned++
        })

        if (blocksScanned < 1) return

        renderBlocks.splice(0, 1)
        
        return
    }
}


registerWhen(register("renderWorld", renderSolutions), () => World.isLoaded() && IsInDungeon() && Settings.BoulderSolver )


register(`step`, () => {
    if (IsInDungeon() || !World.isLoaded() || !Settings.BoulderSolver) return
    const room = getCurrentRoom()
    if (!room) return

    if (room.name == "Boulder" && hasSolution) return

    reset()
}).setFps(2)


registerWhen(register("worldUnload", () => {
    reset()
    hasSolution = false
    puzzleDone = false
}), () => Settings.BoulderSolver)


registerWhen(register("packetSent", (packet, _) => {
    const position = packet.func_179724_a()
    const blockPosition = new BlockPos(position)

    const [ x, y, z ] = [blockPosition.x, blockPosition.y, blockPosition.z]
    const ctBlock = World.getBlockAt(x, y, z)

    onBlockPlacement(ctBlock, [x, y, z], blockPosition)
}).setFilteredClass(net.minecraft.network.play.client.C08PacketPlayerBlockPlacement), () => World.isLoaded() && IsInDungeon() && Settings.BoulderSolver)
