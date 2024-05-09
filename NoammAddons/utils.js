/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />


import Dungeon from "../BloomCore/dungeons/Dungeon"
export const Executors = Java.type("java.util.concurrent.Executors")
export const player = Client.getMinecraft().field_71439_g


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

/**
 * @param {String} Formating 
 * @param {Number} MsTime 
*/
export function DrawTimerUnderCursor(Formating, MsTime) {
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


/**
 * @param {String} String
 * @param {Number} MsTime 
*/
export function DrawTitleUnderCursor(String, MsTime) {
  let StartTime = new Date().getTime();
  let Trigger = register(`renderOverlay`, () => {
    let TimeLeft = MsTime - (new Date().getTime() - StartTime);
    Renderer.translate(Renderer.screen.getWidth()/2, Renderer.screen.getHeight()/2)
    Renderer.scale(2, 2)
    Renderer.drawStringWithShadow(String, -Renderer.getStringWidth(String.removeFormatting())/2, 5)
    if (TimeLeft <= 0) {
      Trigger.unregister()
    }
  })
}


export function DistanceBetween2PlayersIn3dWorld(player1, player2) {
  return Math.round(Math.sqrt((player1.getX() - player2.getX())**2 + (player1.getY() - player2.getY())**2 + (player1.getZ() - player2.getZ())**2)) 
}


/*
/**
 * Renders floating lines of text in the 3D world at a specific position.
 *
 * @param Text The string array of text to render
 * @param x X coordinate in the game world
 * @param y Y coordinate in the game world
 * @param z Z coordinate in the game world
 * @param Color the color of the text
 * @param RenderBlackBox render a pretty black border behind the text
 * @param Scale the scale of the text
 * @param Increase whether to scale the text up as the player moves away
 * 
 * @param {String} Text
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @param {Number} Color
 * @param {Boolean} RenderBlackBox
 * @param {Number} Scale
 * @param {Number} Increase
 * 
 */
/*
export function TessellatorDrawStringWithShadow(Text, x, y, z, Color, RenderBlackBox, Scale, Increase) {
    
  //Black text to mimic Shadow
  Tessellator.drawString(`§0§${ChatLib.removeFormatting(Text)}`, x + 0.081, y - 0.041, z, Color, RenderBlackBox, Scale, Increase)
  // Real text
  Tessellator.drawString(Text, x, y, z, Color, RenderBlackBox, Scale, Increase)

}*/