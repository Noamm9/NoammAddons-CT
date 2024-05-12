/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

import RenderLib from "../RenderLib"
import { getBlockBoundingBox } from "../BloomCore/utils/Utils"
import { renderBlockHitbox, renderBoxFromCorners } from "../BloomCore/RenderUtils"
import Dungeon from "../BloomCore/dungeons/Dungeon"
export const Executors = Java.type("java.util.concurrent.Executors")
export const player = Client.getMinecraft().field_71439_g
export const gc = (text) => ChatLib.getCenteredText(text) // getCentered
export const cc = (text) => ChatLib.chat(gc(text)) // centerChat

export function isCoordinateInsideBox(coord, corner1, corner2) {
  const min = {
    x: Math.min(corner1.x, corner2.x),
    y: Math.min(corner1.y, corner2.y),
    z: Math.min(corner1.z, corner2.z)
  };
  const max = {
    x: Math.max(corner1.x, corner2.x),
    y: Math.max(corner1.y, corner2.y),
    z: Math.max(corner1.z, corner2.z)
  };
  return coord.x >= min.x && coord.x <= max.x
    && coord.y >= min.y && coord.y <= max.y
    && coord.z >= min.z && coord.z <= max.z;
}

/**
  * Returns where abouts of the player
  * @returns {string} the phase you are in the m7
  * @returns {boolean} true if you are in the m7 boss
*/
export function getPhase() {
  const corner1 = { x: -8, y: 254, z: 147 };
  const corner2 = { x: 134, y: 0, z: -8 };
  let inBoss = false
  let inPhase = null
  if (Dungeon.floor != "F7" && Dungeon.floor != "M7") return

  if (Dungeon.inDungeon && isCoordinateInsideBox({ x: Player.getX(), y: Player.getY(), z: Player.getZ() }, corner1, corner2)) {
    inBoss = true;
    if (Player.getY() > 210) {
      inPhase = "p1";
    } else if (Player.getY() > 155) {
      inPhase = "p2";
    } else if (Player.getY() > 100) {
      inPhase = "p3";
    } else if (Player.getY() > 45) {
      inPhase = "p4";
    } else {
      inPhase = "p5";
    }
  }

  return inBoss ? inPhase : false;
}

/**
 * @param {Object} b The blockpos object
 * @returns {Number} The ID of the block at the specified coordinates
*/
export const getBlockPosIdAt = (b) => World.getBlockAt(b).type.getID()


export function ModMessage (string) {
  ChatLib.chat(`§6§l[§d§lNoamm§b§lAddons§6§l]§r ${string}`)
}
 
export class MyMath {
  
  static DistanceIn3dWorld(x1, y1, z1, x2, y2, z2) {
    return Math.round(Math.sqrt((x1 - x2)**2 + (y1 - y2)**2 + (z1 - z2)**2)) 
  }

  static DistanceIn2dWorld(x1, z1, x2, z2) {
    return Math.round(Math.sqrt((x1 - x2)**2 + (z1 - z2)**2)) 
  }
  
  
}


export class Render {

   /**
  * Draws the frame of a box
  * @param {number} x - X Coordinates
  * @param {number} y - Y Coordinates
  * @param {number} z - Z Coordinates
  * @param {number} w - Box Width
  * @param {number} h - Box Height
  * @param {number} red - Box Color Red 0-1
  * @param {number} green - Box Color Green 0-1
  * @param {number} blue - Box Color Blue 0-1
  * @param {number} alpha - Box Color Alpha 0-1
  * @param {boolean} phase - Depth test disabled. True: See through walls
  */
  static drawFilledOutLineBox (x, y, z, w, h, red, green, blue, alpha, phase) {
    RenderLib.drawEspBox(x, y, z, w+0.02, h+0.02, red, green, blue, 255, phase)
    RenderLib.drawInnerEspBox(x, y, z, w+0.02, h+0.02, red, green, blue, alpha, phase)
    
  }
  
  
  static renderBlockHitbox = (ctBlock, r, g, b, a, phase=true, lineWidth=2, filled=false) => {
    const [x0, y0, z0, x1, y1, z1] = getBlockBoundingBox(ctBlock)
    renderBoxFromCorners(x0-0.003, y0-0.008, z0-0.003, x1+0.003, y1+0.003, z1+0.003, r, g, b, a, phase, lineWidth, filled)
}

  /**
 * 
 * @param {Block} ctBlock - The CT Block to render
 * @param {Number} r 
 * @param {Number} g 
 * @param {Number} b 
 * @param {Number} a 
 * @param {Boolean} phase - Render through walls
 * @param {Number} lineWidth - Line width, only effective if filled=false
 */
  static renderFilledOutLineBlockHitbox (ctBlock, r, g, b, a, phase=true, lineWidth=2) {
    renderBlockHitbox(ctBlock, r, g, b, a, phase, lineWidth, true)
  }
  

  /** 
   * @param {Text} String - Text to be Displayed
   * @param {Number} MsTime - Time in Milisecends
  */
  static DrawTitleUnderCursor(Text, MsTime) {
    let StartTime = new Date().getTime();
    let Trigger = register(`renderOverlay`, () => {
      let TimeLeft = MsTime - (new Date().getTime() - StartTime);
      Renderer.translate(Renderer.screen.getWidth()/2, Renderer.screen.getHeight()/2)
      Renderer.scale(2, 2)
      Renderer.drawStringWithShadow(Text, -Renderer.getStringWidth(Text.removeFormatting())/2, 5)
      if (TimeLeft <= 0) {
        Trigger.unregister()
      }
    })
  }


/**
 * @param {String} Formating - Color format, Example: §a
 * @param {Number} MsTime - Time in Milisecends
*/
  static DrawTimerUnderCursor(Formating, MsTime) {
    let StartTime = new Date().getTime();
    let Trigger = register(`renderOverlay`, () => {
      let TimeLeft = ((MsTime - (new Date().getTime() - StartTime))/1000).toFixed(2)
      Renderer.translate(Renderer.screen.getWidth()/2, Renderer.screen.getHeight()/2)
      Renderer.scale(2, 2)
      Renderer.drawStringWithShadow(`${Formating}${TimeLeft}`, -Renderer.getStringWidth(`${TimeLeft}`)/2, 5)
      if (TimeLeft <= 0) {
        Trigger.unregister()
      }
    })
  }



}
