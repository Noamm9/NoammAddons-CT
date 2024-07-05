/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"
import { ModMessage, Render, MyMath } from "../utils"


register(`chat`, (type, name, x1, y2, z3, event) => {
    if (!Settings.ChatCoordsWayPoint) return 
    const [ x, y, z ] = [ parseFloat(x1), parseFloat(y2), parseFloat(z3) ]
    
    
    ModMessage(`&b${name}&r &aSent a waypoint at &b${x}, ${y}, ${z}`)
    const SelfDistractionTimeMs = 60_000
    const StartTime = new Date().getTime()
    
    const renderWorld = register(`renderWorld`, () => {
        const [ r, g, b ] = [Settings.ChatCoordsWayPointColor.getRed()/255, Settings.ChatCoordsWayPointColor.getGreen()/255, Settings.ChatCoordsWayPointColor.getBlue()/255]
        const TimeLeft = ((SelfDistractionTimeMs - (new Date().getTime() - StartTime)))
        const distance = MyMath.DistanceIn3dWorld(Player.getX(), Player.getY(), Player.getZ(), x, y, z)
        if ( !World.isLoaded() || distance <= 5 || TimeLeft <= 0 ) renderWorld.unregister()

        Render.StringWithShadow(`${name}: ${Math.trunc(distance)}`, x-0.2, y+5, z+0.2, Renderer.LIGHT_PURPLE, 0.3 * distance, true, false)
        Render.FilledOutLineBox(x, y, z, 1, 1, r, g, b, 50/255, true)
        Render.drawTrace(x, y, z, r, g, b)
    })
    cancel(event)
}).setCriteria(/^(Co-op|Party)?(?: > )?(?:\[\d+\] .? ?)?(?:\[[\w\+]+\] )?(\w{1,16})\: x\: (.{1,4}), y\: (.{1,4}), z\: (.{1,4})/) // Thanks DocilElm for the Regex
