/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { GetP3Section, IsInBossRoom, MyMath, Render, registerWhen } from "../utils";


const Terminals = [
    [ // s1
        [[111, 113, 73], [110, 113, 73]],
        [[111, 119, 79], [110, 119, 79]],
        [[89, 112, 92], [90, 112, 92]],
        [[89, 122, 101], [90, 122, 101]]
    ],

    [ // s2
        [[68, 109, 121], [68, 109, 122]],
        [[59, 120, 122], [59, 119, 123]],
        [[47, 109, 121], [47, 109, 122]],
        [[40, 124, 122], [40, 124, 123]],
        [[39, 108, 143], [39, 108, 142]]
    ],
  
    [ // s3
        [[-3, 109, 112], [-2, 109, 112]],
        [[-3, 119, 93], [-2, 119, 93]],
        [[19, 123, 93], [18, 123, 93]],
        [[-3, 109, 77], [-2, 109, 77]]
    ],
  
    [ // s4
        [[41, 109, 29], [41, 109, 30]],
        [[44, 121, 29], [44, 121, 30]],
        [[67, 109, 29], [67, 109, 30]],
        [[72, 115, 48], [72, 114, 47]]
    ]
]

const doStuff = (value, index) => {
    let [x, y, z] = value[0].map(coord => coord + 0.5)
    y = y-0.5
    let [tX, tY, tZ] = value[1].map(coord => coord + 0.5)
    
    let distance = MyMath.DistanceIn3dWorld(Player.getRenderX(), Player.getRenderY(), Player.getRenderZ(), tX, tY, tZ)
    Render.FilledOutLineBox(x, y, z, 1, 1, 0, 114/255, 1, 0.2, true)
    Render.StringWithShadow(`${index + 1}`, tX, tY, tZ, Renderer.LIGHT_PURPLE, distance * 0.3, true, false)
}


registerWhen(register("renderWorld", () => {
    try {Terminals[GetP3Section()-1].forEach(doStuff)} catch (e) {}
}), () => IsInBossRoom() && GetP3Section() && Settings().TerminalNumbers)