/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Settings"
import { getPhase, GhostBlock, registerWhen } from "../utils"

const WhiteGlass = new BlockType("stained_glass").getDefaultState()

const GreenArray = [
    new BlockPos(45, 169, 44),
    new BlockPos(46, 169, 44),
    new BlockPos(47, 169, 44), 
    new BlockPos(44, 169, 43),
    new BlockPos(45, 169, 43),
    new BlockPos(46, 169, 43),
    new BlockPos(47, 169, 43),
    new BlockPos(48, 169, 43),
    new BlockPos(43, 169, 42),
    new BlockPos(44, 169, 42),
    new BlockPos(45, 169, 42),
    new BlockPos(46, 169, 42),
    new BlockPos(47, 169, 42),
    new BlockPos(48, 169, 42),
    new BlockPos(49, 169, 42),
    new BlockPos(43, 169, 41),
    new BlockPos(44, 169, 41),
    new BlockPos(45, 169, 41),
    new BlockPos(46, 169, 41),
    new BlockPos(47, 169, 41),
    new BlockPos(48, 169, 41),
    new BlockPos(49, 169, 41),
    new BlockPos(43, 169, 40),
    new BlockPos(44, 169, 40),
    new BlockPos(45, 169, 40),
    new BlockPos(46, 169, 40),
    new BlockPos(47, 169, 40),
    new BlockPos(48, 169, 40),
    new BlockPos(49, 169, 40),
    new BlockPos(44, 169, 39),
    new BlockPos(45, 169, 39),
    new BlockPos(46, 169, 39),
    new BlockPos(47, 169, 39),
    new BlockPos(48, 169, 39),
    new BlockPos(45, 169, 38),
    new BlockPos(46, 169, 38),
    new BlockPos(47, 169, 38)
]

const YellowArray = [
    new BlockPos(45, 169, 68),
    new BlockPos(46, 169, 68),
    new BlockPos(47, 169, 68),
    new BlockPos(44, 169, 67),
    new BlockPos(45, 169, 67),
    new BlockPos(46, 169, 67),
    new BlockPos(47, 169, 67),
    new BlockPos(48, 169, 67),
    new BlockPos(43, 169, 66),
    new BlockPos(44, 169, 66),
    new BlockPos(45, 169, 66),
    new BlockPos(46, 169, 66),
    new BlockPos(47, 169, 66),
    new BlockPos(48, 169, 66),
    new BlockPos(49, 169, 66),
    new BlockPos(43, 169, 65),
    new BlockPos(44, 169, 65),
    new BlockPos(45, 169, 65),
    new BlockPos(46, 169, 65),
    new BlockPos(47, 169, 65),
    new BlockPos(48, 169, 65),
    new BlockPos(49, 169, 65),
    new BlockPos(43, 169, 64),
    new BlockPos(44, 169, 64),
    new BlockPos(45, 169, 64),
    new BlockPos(46, 169, 64),
    new BlockPos(47, 169, 64),
    new BlockPos(48, 169, 64),
    new BlockPos(49, 169, 64),
    new BlockPos(44, 169, 63),
    new BlockPos(45, 169, 63),
    new BlockPos(46, 169, 63),
    new BlockPos(47, 169, 63),
    new BlockPos(48, 169, 63),
    new BlockPos(45, 169, 62),
    new BlockPos(46, 169, 62),
    new BlockPos(47, 169, 62)
]



function StartOrStop() {
    return World.isLoaded() && Settings().IHateDiorite && getPhase() == "p2"
}


const trigger = register("step", () => {
    try {
        for (let i = 0; i < 37; i++) {

            GreenArray.forEach(block => {
                if (World.getBlockAt(block.x, block.y+i, block.z).type.getID() == 1) 
                GhostBlock(block.add(0, i, 0).toMCBlock(), WhiteGlass);
            })

            YellowArray.forEach(block => {
                if (World.getBlockAt(block.x, block.y+i, block.z).type.getID() == 1) 
                GhostBlock(block.add(0, i, 0).toMCBlock(), WhiteGlass)
            })

        }
    } catch (error) {}
}).setFps(10)



registerWhen(trigger, StartOrStop)