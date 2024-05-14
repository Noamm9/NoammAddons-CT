/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Config/Settings"

const BlockPoss = Java.type("net.minecraft.util.BlockPos") 
const WhiteGlass = new BlockType("stained_glass").getDefaultState()
const Chest = new BlockType(`chest`).getDefaultState()


function setAir (BlockPoss) {
    World.getWorld().func_175698_g(BlockPoss)
}  

function GhostBlock (BlockPoss, MCIBlockState) {
    World.getWorld().func_175656_a(BlockPoss, MCIBlockState);
}

const ChestCords = [
    new BlockPoss(75, 221, 36),
    new BlockPoss(95, 169, 40),
    new BlockPoss(44, 106, 35),
    new BlockPoss(87, 106, 43),
    new BlockPoss(68, 106, 136),
    new BlockPoss(65, 106, 36),
    new BlockPoss(56, 114, 111),
    new BlockPoss(24, 106, 135)
]

const AirCords = [
    new BlockPoss(56, 112, 110,),
    new BlockPoss(56, 111, 110,),
    new BlockPoss(56, 110, 110,),
    new BlockPoss(94, 167, 40),
    new BlockPoss(94, 166, 40),
    new BlockPoss(94, 165, 40),
    new BlockPoss(95, 167, 40),
    new BlockPoss(95, 166, 40),
    new BlockPoss(95, 165, 40),
    new BlockPoss(12, 120, 50),
    new BlockPoss(12, 120, 49),
    new BlockPoss(12, 120, 48),
    new BlockPoss(12, 121, 50),
    new BlockPoss(12, 121, 49),
    new BlockPoss(12, 121, 48),
    new BlockPoss(18, 120, 128),
    new BlockPoss(17, 120, 128),
    new BlockPoss(16, 120, 128),
    new BlockPoss(18, 121, 128),
    new BlockPoss(17, 121, 128),
    new BlockPoss(16, 121, 128),
    new BlockPoss(96, 120, 122),
    new BlockPoss(96, 120, 123),
    new BlockPoss(96, 120, 124),
    new BlockPoss(96, 121, 122),
    new BlockPoss(96, 121, 123),
    new BlockPoss(96, 121, 124),
    new BlockPoss(91, 131, 45),
    new BlockPoss(90, 131, 45),
    new BlockPoss(89, 131, 45),
    new BlockPoss(88, 131, 45),
    new BlockPoss(87, 131, 45),
    new BlockPoss(91, 132, 45),
    new BlockPoss(90, 132, 45),
    new BlockPoss(89, 132, 45),
    new BlockPoss(88, 132, 45),
    new BlockPoss(87, 132, 45),

    new BlockPoss(93,115,122),
    new BlockPoss(93,115,123),
    new BlockPoss(93,115,124),
    new BlockPoss(93,115,125),
    new BlockPoss(93,115,126),
    new BlockPoss(93,115,127),

    new BlockPoss(93,116,122),
    new BlockPoss(93,116,123),
    new BlockPoss(93,116,124),
    new BlockPoss(93,116,125),
    new BlockPoss(93,116,126),
    new BlockPoss(93,116,127),
]

const WhiteGlassCords = [
    new BlockPoss(92, 117, 43),
    new BlockPoss(92, 118, 43),
    new BlockPoss(92, 119, 43),
    new BlockPoss(92, 120, 43),
    new BlockPoss(92, 121, 43),
    new BlockPoss(92, 122, 43),
    new BlockPoss(92, 123, 43),
    new BlockPoss(92, 124, 43),
    new BlockPoss(92, 125, 43),
    new BlockPoss(92, 126, 43),
    new BlockPoss(92, 127, 43),
    new BlockPoss(92, 128, 43),
    new BlockPoss(92, 129, 43),
    new BlockPoss(92, 130, 43),
    new BlockPoss(92, 130, 43),
    new BlockPoss(92, 130, 43),
    new BlockPoss(92, 130, 43),
    //
    new BlockPoss(93, 117, 44),
    new BlockPoss(93, 118, 44),
    new BlockPoss(93, 119, 44),
    new BlockPoss(93, 120, 44),
    new BlockPoss(93, 121, 44),
    new BlockPoss(93, 122, 44),
    new BlockPoss(93, 123, 44),
    new BlockPoss(93, 124, 44),
    new BlockPoss(93, 125, 44),
    new BlockPoss(93, 126, 44),
    new BlockPoss(93, 127, 44),
    new BlockPoss(93, 128, 44),
    new BlockPoss(93, 129, 44),
    new BlockPoss(93, 130, 44)
]


register(`command`, () => {
    for (let i = 0; i<ChestCords.length;i++) {
        GhostBlock(ChestCords[i], Chest)
    }

    for (let i = 0; i<AirCords.length;i++) {
        setAir(AirCords[i])
    }

    for (let i = 0; i<WhiteGlassCords.length;i++) {
        GhostBlock(WhiteGlassCords[i], WhiteGlass)
    }

}).setName(`test123`)

