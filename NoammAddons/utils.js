import Dungeon from "../BloomCore/dungeons/Dungeon"

export const Executors = Java.type("java.util.concurrent.Executors")
export const File = Java.type("java.io.File")
export const ResourceLocation = Java.type("net.minecraft.util.ResourceLocation")
export const ItemSkull = Java.type("net.minecraft.item.ItemSkull")
export const ChatComponentText = Java.type("net.minecraft.util.ChatComponentText");
export const BossStatus = Java.type("net.minecraft.entity.boss.BossStatus")

export const player = Client.getMinecraft().field_71439_g


/***
 *  Sends a client-side message with the prefix
 * 
 *  @param {string} message the message to be sent after the prefix
 */
export function modMessage(message) {
  ChatLib.chat("§6[§dNoamm§bAddons§6] §r" + message)
}

/***
 *  Sends a message in party chat
 * 
 *  @param {string} message the message to be sent in party chat
 */
export function partyMessage(message) {
  ChatLib.command("pc " + message)
}

/***
 *  Sends a message to the latest player who messaged you
 * 
 *  @param {string} message the message to be sent in in messages chat
 */
export function privateMessage(message) {
  ChatLib.command("r " + message)
}

/***
 *  Sends a message in guild chat
 * 
 *  @param {string} message the message to be sent in guild chat
 */
export function guildMessage(message) {
  ChatLib.command("gc " + message)
}

/**
  * Makes the player right click
*/
export function rightClick() {
  rightClickMethod.invoke(Client.getMinecraft())
}

/**
  * Makes the player left click
*/
export function leftClick() {
  leftClickMethod.invoke(Client.getMinecraft())
}


/**
  * Makes the player drop their items (for dungeon ultimate)
*/
export function Dropitem() {
  Player.getPlayer()?.func_71040_bB(false)
}


/**
  * Gets text and displays it on the screen and plays a pling
  * @param {string} string to be displayed
*/
export function alert(title) {
  World.playSound("note.pling", 100, 1)
  Client.showTitle(title, "", 10, 100, 10);
}


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
  * Plays a gui clicking sound 
*/
export function makePressSound() { World.playSound('gui.button.press', 1, 1) }



/**
  * Makes a beacon with a box at the start and text in the box
  * @param {string} string the text to be presented 
  * @param {number} renderx X
  * @param {number} rendery Y
  * @param {number} renderz Z
  * @param {number} r Red
  * @param {number} g Green
  * @param {number} b Blue
*/
export function renderCustomBeacon(text, renderx, rendery, renderz, r, g, b ) {
  renderBeaconBeam(renderx - 0.5, rendery, renderz - 0.5, r, g, b, 0.5, false);
  RenderLib.drawEspBox(renderx, rendery, renderz, 1, 1, r, g, b, 0.5, true)
  Tessellator.drawString(text, renderx, rendery + 0.7, renderz)
}


export const getPlayerCoords = () => [Player.getX(),Player.getY(),Player.getZ()]

/**
  * @return {Array} the current coordinates of the player floored
*/
export const getFlooredPlayerCoords = () => [Math.floor(Player.getX()),Math.floor(Player.getY()),Math.floor(Player.getZ())]

/**
 * @param {Number} x The X coordinate
 * @param {Number} y The Y coordinate
 * @param {Number} z The Z coordinate
 * @returns {String} The name of the block at the specified coordinates
*/
export const getBlockNameAt = (x,y,z) => World.getBlockAt(new BlockPos(x,y,z)).type.name

/**
 * @param {Number} x The X coordinate
 * @param {Number} y The Y coordinate
 * @param {Number} z The Z coordinate
 * @returns {Number} The ID of the block at the specified coordinates
*/
export const getBlockIdAt = (x,y,z) => World.getBlockAt(new BlockPos(x,y,z)).type.getID()

/**
 * @param {Object} b The blockpos object
 * @returns {Number} The ID of the block at the specified coordinates
*/
export const getBlockPosIdAt = (b) => World.getBlockAt(b).type.getID()