/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

import RenderLib from "../RenderLib"
import { renderBoxFromCorners } from "../BloomCore/RenderUtils"
import Dungeon from "../BloomCore/dungeons/Dungeon"
import PogObject from "../PogData/index.js"
export const BlockPoss = Java.type("net.minecraft.util.BlockPos")
export const MouseEvent = Java.type("net.minecraftforge.client.event.MouseEvent")
export const gc = (text) => ChatLib.getCenteredText(text) // getCentered
export const cc = (text) => ChatLib.chat(gc(text)) // centerChat
export const prefix = "§6§l[§b§lN§d§lA§6§l]§r"
export const Color = Java.type("java.awt.Color")
export const Font = Java.type("xyz.forkdev.fontlib.Font")
const dungeonSecrets = JSON.parse(FileLib.read(`Noammaddons`, "RandomShit/DungeonSecretsItems.json"))
export const DungeonSecretsItems = dungeonSecrets.items
const BufferUtils = Java.type("org.lwjgl.BufferUtils")
const Project = Java.type("org.lwjgl.util.glu.Project")
const modelViewMatrix = BufferUtils.createFloatBuffer(16)
const projectionMatrix = BufferUtils.createFloatBuffer(16)
const viewportDims = BufferUtils.createIntBuffer(16)
const ScaledResolution = Java.type("net.minecraft.client.gui.ScaledResolution")
const UMatrixStack = Java.type("gg.essential.universal.UMatrixStack")
const CompatMatrix = UMatrixStack.Compat.INSTANCE
const UGraphics = Java.type("gg.essential.universal.UGraphics")
const DefaultFonts = Java.type("gg.essential.elementa.font.DefaultFonts")
const ElementaFonts = Java.type("gg.essential.elementa.font.ElementaFonts")
const ElementaUIRoundedRectangle = Java.type("gg.essential.elementa.components.UIRoundedRectangle").Companion
const EssentialAPI =Java.type("gg.essential.api.EssentialAPI")
const ChatComponentText = Java.type("net.minecraft.util.ChatComponentText")
const regCylinder = new org.lwjgl.util.glu.Cylinder()
const lineCylinder = new org.lwjgl.util.glu.Cylinder()
lineCylinder.drawStyle = org.lwjgl.util.glu.GLU.GLU_LINE



/**
 * Displays a notification with a custom message and duration.
 * @param {string} string - The message to display in the notification.
 * @param {number} TimeUp - The duration in milliseconds for which the notification should be displayed.
 */
export function Alert(string, TimeUp) {
  EssentialAPI.getNotifications().push(
    `${prefix}`, `${string}`, TimeUp
  )
}

/**
 * Creates a Minecraft block state for a given block ID and variant.
 * @param {number} id - The ID of the block.
 * @param {number} variant - The variant of the block.
 * @returns The Minecraft block state for the specified block ID and variant.
 */
export function MCBlockState(id, variant) {
  return new BlockType(id).mcBlock.func_176203_a(variant)
}

/**
 * Plays a sequence of "Pling" sounds with increasing pitch.
 */
export function CoolSound() {
  World.playSound("note.pling", 1, 1.414)
  setTimeout(() => World.playSound("note.pling", 1, 1.587), 150)
  setTimeout(() => World.playSound("note.pling", 1, 1.782), 300)
}

/**
 * Sets a block at the specified position to air.
 * @param {BlockPos} MCBlockPoss - The position of the block
 */
export function setAir(MCBlockPoss) {
  World.getWorld().func_175698_g(MCBlockPoss)
}  

/**
 * Replaces a block at the specified position with a ghost block.
 * @param {BlockPos} MCBlockPoss - The position of the block to be replaced.
 * @param {BlockState} MCBlockState - The block state to set at the specified position.
 */
export function GhostBlock(MCBlockPoss, MCBlockState) {
  try {
    return World.getWorld().func_175656_a(MCBlockPoss, MCBlockState);
  } catch (error) {ModMessage(prefix + error)}
}

/**
 * Sends a mod message to the chat with a prefix.
 * @param {string} string - The message to be sent to the chat.
 */
export function ModMessage(string) {
  ChatLib.chat(`${prefix} ${string}`)
}


/**
 * Returns a color code based on the class name.
 * @param {string} className - The class name to determine the color for.
 * @returns {string} The color code associated with the class name.
 */
export function colorClass(className) {
	className = className.toLowerCase();
	if (className.includes("healer")) return "§d";
	else if (className.includes("berserk")) return "§6";
	else if (className.includes("archer")) return "§4";
	else if (className.includes("tank")) return "§a";
	else if (className.includes("mage")) return "§b";
	else return "§7";
}

/**
 * clicks on a slot in the player's container.
 * @param {number} slot - The slot number to click.
 * @param {number} [btn=2] - The mouse button to use for the click. Defaults to right-click.
 */
export function clickSlot(slot, btn) { 
  Client.getMinecraft().field_71442_b.func_78753_a(
    Player.getContainer().getWindowId(), slot, btn ? btn : 2, 3, Player.getPlayer()
  )
}


/**
 * Retrieves the class of a player based on their name from the tab list.
 * @param {string} Name - The name of the player.
 * @returns {string} The class of the player or "EMPTY" if not found.
 */
export function getClass(Name) {
  let index = TabList?.getNames()?.findIndex(line => line?.includes(Name))
  if (index == -1) return
  let match = TabList?.getNames()[index]?.removeFormatting().match(/.+ \((.+) .+\)/)
  if (!match) return "EMPTY"
  return match[1];
}


/**
 * Retrieves the lore of an item, optionally including its name.
 * @param {ItemStack} item - The item stack to get the lore from.
 * @param {boolean} [returnName=true] - Whether to include the item's name in the lore.
 * @returns {Array} An array containing the lore lines of the item.
 */
export function getLore(item, returnName=true) {
	let lore=returnName?[item.getName()] : []
	if(!item) return lore
	
	let loreNBT=item.getNBT()?.getCompoundTag("tag")?.getCompoundTag("display")?.getTagList("Lore",8)
	if(loreNBT) {
		for(let i=0; i<loreNBT["func_74745_c"](); i++) {
			lore.push(loreNBT["func_150307_f"](i))
		}
	} 
	return lore
}


register('renderWorld', () => {

  Tessellator.pushMatrix()

  let x = Player.getRenderX()
  let y = Player.getRenderY()
  let z = Player.getRenderZ()

  Tessellator.translate(-x, -y, -z)

  GL11.glGetFloat(GL11.GL_MODELVIEW_MATRIX, modelViewMatrix)
  GL11.glGetFloat(GL11.GL_PROJECTION_MATRIX, projectionMatrix)
  
  Tessellator.popMatrix()
  
  GL11.glGetInteger(GL11.GL_VIEWPORT, viewportDims)
})


function getBlockBoundingBox(ctBlock) {
  const mcBlock = ctBlock.type.mcBlock

  if (ctBlock.type.getName().includes("Stair")) return [
    ctBlock.getX(),
    ctBlock.getY(),
    ctBlock.getZ(),
    ctBlock.getX() + 1,
    ctBlock.getY() + 1,
    ctBlock.getZ() + 1
  ]

  return [
    ctBlock.getX() + mcBlock.func_149704_x(),
    ctBlock.getY() + mcBlock.func_149665_z(),
    ctBlock.getZ() + mcBlock.func_149706_B(),
    ctBlock.getX() + mcBlock.func_149753_y(),
    ctBlock.getY() + mcBlock.func_149669_A(),
    ctBlock.getZ() + mcBlock.func_149693_C()
  ]
}


/**
 * Determines the current phase of the player in the dungeon based on their Y-coordinate.
 * This function is specific to floor 7.
 *
 * @returns {string|null} The current phase the player is in ("p1", "p2", "p3", "p4", "p5"),
 * or null if the player is not on floor 7 or not in the dungeon.
 */
export function getPhase() {
  if (Dungeon.floorNumber != "7") return
  const corner1 = { x: -8, y: 254, z: 147 }
  const corner2 = { x: 134, y: 0, z: -8 }
  let inPhase = null

  if (IsInDungeon() && MyMath.isCoordinateInsideBox({ x: Player.getX(), y: Player.getY(), z: Player.getZ() }, corner1, corner2)) {

    if (Player.getY() > 210) inPhase = "p1"
    else if (Player.getY() > 155) inPhase = "p2";
    else if (Player.getY() > 100) inPhase = "p3";
    else if (Player.getY() > 45) inPhase = "p4";
    else inPhase = "p5";
    
  }

  return inPhase
}

 
/**
 * Registers and unregisters the trigger depending on the result of the checkFunc. Use with render triggers to reduce lag when they are not being used.
 * @param {() => void} trigger 
 * @param {Function} checkFunc 
 * @returns 
 */
const checkingTriggers = []
export function registerWhen(trigger, checkFunc) {
  checkingTriggers.push([trigger.unregister(), checkFunc])
}

register("renderOverlay", () => {
  for (let i = 0; i < checkingTriggers.length; i++) {
    let [trigger, func] = checkingTriggers[i]
    if (func()) trigger.register()
    else trigger.unregister()
  }
})


/**
 * Disconnects the client from the server.
 *
 * @param {string} [message=""] - The message to be displayed to the player when they are disconnected.
 */
export function DisconnectFromServer(message= "") {
  Client.getMinecraft().func_147114_u()
  .func_147298_b().func_150718_a(
    new ChatComponentText(message))
}


// A collection of boss room corners for each floor.
const bossRoomCorners = {
  "7": { corner1: { x: -8, y: 0, z: -8 }, corner2: { x: 134, y: 254, z: 147 } },
  "6": { corner1: { x: -40, y: 51, z: -8 }, corner2: { x: 22, y: 110, z: 134 } },
  "5": { corner1: { x: -40, y: 53, z: -8 }, corner2: { x: 50, y: 112, z: 118 } },
  "4": { corner1: { x: -40, y: 53, z: -40 }, corner2: { x: 134, y: 254, z: 147 } },
  "3": { corner1: { x: -40, y: 0, z: -40 }, corner2: { x: 42, y: 118, z: 73 } },
};

/**
 * Checks if the player is currently in a boss room.
 * @returns {boolean} True if the player is in a boss room, false otherwise.
 */
export function IsInBossRoom() {
  const playerCoords = { x: Player.getX(), y: Player.getY(), z: Player.getZ() };
  const floorNumber = Dungeon.floorNumber;

  if (floorNumber && bossRoomCorners[floorNumber]) {
    const { corner1, corner2 } = bossRoomCorners[floorNumber];
    return MyMath.isCoordinateInsideBox(playerCoords, corner1, corner2);
  }

  return false;
}


export function IsInDungeon() {
  return Dungeon.inDungeon
}



/**
 * Converts RGB color values to a 32-bit integer color value with alpha.
 *
 * @param {number} red - The red color value (0-255).
 * @param {number} green - The green color value (0-255).
 * @param {number} blue - The blue color value (0-255).
 * @param {number} [alpha=255] - The alpha (transparency) value (0-255). Default is 255 (fully opaque).
 *
 * @returns {number} - The 32-bit integer color value with alpha.
 */
export function rgbToColorInt(red, green, blue, alpha = 255) {
  return (alpha << 24) | (red << 16) | (green << 8) | blue;
}


/**
 * Converts an integer color value to an array of RGB color values.
 *
 * @param {number} color - The integer color value.
 * @returns {Array} - An array containing the RGB color values as [r, g, b], where each value is normalized to the range [0 - 1].
 */
export function intToRGB(color) {
  const r = (color >> 16) & 0xFF;
  const g = (color >> 8) & 0xFF;
  const b = color & 0xFF;
  
  return [r, g, b];
}


/**
 * A collection of mathematical functions used in the script.
 */
export class MyMath {
  
  /**
   * Checks if a given coordinate is inside a specified 3D box.
   * @param {Object} coord - The coordinate to check.
   * @param {Object} corner1 - The coordinates of one corner of the box.
   * @param {Object} corner2 - The coordinates of the opposite corner of the box.
   * @returns {boolean} - True if the coordinate is inside the box, false otherwise.
   */
  static isCoordinateInsideBox(coord, corner1, corner2) {
    const min = {
      x: Math.min(corner1.x, corner2.x),
      y: Math.min(corner1.y, corner2.y),
      z: Math.min(corner1.z, corner2.z)
    }

    const max = {
      x: Math.max(corner1.x, corner2.x),
      y: Math.max(corner1.y, corner2.y),
      z: Math.max(corner1.z, corner2.z)
    }

    return coord.x >= min.x && coord.x <= max.x
      && coord.y >= min.y && coord.y <= max.y
      && coord.z >= min.z && coord.z <= max.z;

  }


  /**
   * Calculates the distance between two points in a 3D space.
   * @param {number} x1 - The X coordinate of the first point.
   * @param {number} y1 - The Y coordinate of the first point.
   * @param {number} z1 - The Z coordinate of the first point.
   * @param {number} x2 - The X coordinate of the second point.
   * @param {number} y2 - The Y coordinate of the second point.
   * @param {number} z2 - The Z coordinate of the second point.
   * @returns {number} - The distance between the two points.
   */
  static DistanceIn3dWorld(x1, y1, z1, x2, y2, z2) {
    return Math.sqrt((x1 - x2)**2 + (y1 - y2)**2 + (z1 - z2)**2)
  }

  /**
   * Calculates the distance between two points in a 2D space.
   * @param {number} x1 - The X coordinate of the first point.
   * @param {number} z1 - The Z coordinate of the first point.
   * @param {number} x2 - The X coordinate of the second point.
   * @param {number} z2 - The Z coordinate of the second point.
   * @returns {number} - The distance between the two points.
   */
  static DistanceIn2dWorld(x1, z1, x2, z2) {
    return Math.sqrt((x1 - x2)**2 + (z1 - z2)**2)
  }
  
  
}


/**
 * Class for rendering various shapes and elements.
 */
export class Render {

  /**
   * Draws a line between 2 coordinates
   * @param {number} x1 - X Coordinates of first position
   * @param {number} y1 - Y Coordinates of first position
   * @param {number} z1 - Z Coordinates of first position
   * @param {number} x2 - X Coordinates of second position
   * @param {number} y2 - Y Coordinates of second position
   * @param {number} z2 - Z Coordinates of second position
   * @param {number} red - Line Color Red 0-1
   * @param {number} green - Line Color Green 0-1
   * @param {number} blue - Line Color Blue 0-1
   * @param {number} alpha - Line Color Alpha 0-1
   * @param {boolean} phase - Depth test disabled. True: See through walls
   * @param {number} [lineWidth=2.0] - The line width in float. if this parameter not pass, default is 2.0
  */
  static Line = (x1, y1, z1, x2, y2, z2, red, green, blue, alpha, phase, lineWidth = 2.0) => {
    GlStateManager.func_179094_E(); // pushMatrix
    GL11.glLineWidth(lineWidth);
    GL11.glDisable(GL11.GL_CULL_FACE); // disableCullFace
    GL11.glEnable(GL11.GL_BLEND); // enableBlend
    GL11.glBlendFunc(770, 771); // blendFunc
    GL11.glDisable(GL11.GL_TEXTURE_2D); // disableTexture2D
    GL11.glDepthMask(false); // depthMask

    if (phase) GL11.glDisable(GL11.GL_DEPTH_TEST); // disableDepth

    Tessellator.begin(3)
      .colorize(red, green, blue, alpha)
      .pos(x1, y1, z1)
      .pos(x2, y2, z2)
      .draw()


    GL11.glEnable(GL11.GL_CULL_FACE); // enableCull
    GL11.glDisable(GL11.GL_BLEND); // disableBlend
    GL11.glDepthMask(true); // depthMask
    GL11.glEnable(GL11.GL_TEXTURE_2D); // enableTexture2D
    if (phase) GL11.glEnable(GL11.GL_DEPTH_TEST); // enableDepth
    GlStateManager.func_179121_F(); // popMatrix
  }

    
  /**
   * Draws a 3D box from the given block's corners.
   *
   * @param {BlockPos} ctBlock - The block position to draw the box from.
   * @param {number} r - The red color value for the box.
   * @param {number} g - The green color value for the box.
   * @param {number} b - The blue color value for the box.
   * @param {number} a - The alpha (transparency) value for the box.
   * @param {boolean} [phase=true] - Whether to enable or disable the depth test for the box.
   * @param {number} [lineWidth=2] - The width of the box's lines.
   * @param {boolean} [filled=false] - Whether to fill the box or just draw its outline.
   */

  static BlockHitbox = (ctBlock, r, g, b, a, phase=true, lineWidth=2, filled=false) => {
    const [x0, y0, z0, x1, y1, z1] = getBlockBoundingBox(ctBlock)
    renderBoxFromCorners(x0-0.003, y0-0.008, z0-0.003, x1+0.003, y1+0.003, z1+0.003, r, g, b, a, phase, lineWidth, filled)
  }
    
  
  /**
   * Draws a filled and outlined 3D box.
   *
   * @param {number} x - The x-coordinate of the center of the box.
   * @param {number} y - The y-coordinate of the center of the box.
   * @param {number} z - The z-coordinate of the center of the box.
   * @param {number} w - The width of the box.
   * @param {number} h - The height of the box.
   * @param {number} red - The red color value for the box.
   * @param {number} green - The green color value for the box.
   * @param {number} blue - The blue color value for the box.
   * @param {number} alpha - The alpha (transparency) value for the box.
   * @param {boolean} phase - Whether to disable depth testing. True: See through walls.
   *
   * @returns {void}
   */
  static FilledOutLineBox (x, y, z, w, h, red, green, blue, alpha, phase) {
    RenderLib.drawEspBox(x, y, z, w+0.02, h+0.02, red, green, blue, 255, phase)
    RenderLib.drawInnerEspBox(x, y, z, w+0.02, h+0.02, red, green, blue, alpha, phase)
  }


  /**
   * Displays a title under the cursor for a specified duration.
   * 
   * @param {string} Text - The text to display.
   * @param {number} MsTime - The duration in milliseconds to display the text.
   */
  static TitleUnderCursor(Text, MsTime) {
    let StartTime = new Date().getTime()
    const Trigger = register(`renderOverlay`, () => {
      let TimeLeft = MsTime - (new Date().getTime() - StartTime)
      Renderer.translate(Renderer.screen.getWidth()/2, Renderer.screen.getHeight()/2)
      Renderer.scale(2, 2)
      Renderer.drawStringWithShadow(Text, -Renderer.getStringWidth(Text.removeFormatting())/2, 5)
      if (TimeLeft <= 0) {
        Trigger.unregister()
      }
    })
  }


  /**
   * Displays a timer under the cursor with a specified format and duration.
   * 
   * @param {string} Formating - The format to display before the timer.
   * @param {number} MsTime - The duration in milliseconds to display the timer.
   */
  static TimerUnderCursor(Formating, MsTime) {
    let StartTime = new Date().getTime()
    const Trigger = register(`renderOverlay`, () => {
      let TimeLeft = ((MsTime - (new Date().getTime() - StartTime))/1000).toFixed(2)
      Renderer.translate(Renderer.screen.getWidth()/2, Renderer.screen.getHeight()/2)
      Renderer.scale(2, 2);
      Renderer.drawStringWithShadow(`${Formating}${TimeLeft}`, -Renderer.getStringWidth(`${TimeLeft}`)/2, 5)
      if (TimeLeft <= 0) {
        Trigger.unregister()
      }
    })
  }


  /**
   * Draws a 2D bounding box around a 3D box.
   *
   * @param {number} x - X coordinate of the center of the 3D box.
   * @param {number} y - Y coordinate of the center of the 3D box.
   * @param {number} z - Z coordinate of the center of the 3D box.
   * @param {number} color - Color of the bounding box.
   * @param {number} thickness - Thickness of the lines of the bounding box.
   */
  static TwoDEspBox (x, y, z, color, thickness) {
    
    function projectPoint(posX, posY, posZ) {
      const coords = BufferUtils.createFloatBuffer(3)
      const success = Project.gluProject(posX, posY, posZ, modelViewMatrix, projectionMatrix, viewportDims, coords)
      const z = coords.get(2)

      if (!success || !(z > 0 && z < 1)) return null
          
      const sr = new ScaledResolution(Client.getMinecraft())
      const x = (coords.get(0) / sr.func_78325_e())
      let y = (coords.get(1) / sr.func_78325_e())
      y = (sr.func_78328_b() - y)
          
      return { x, y, z };
    }
  
    function calculateBoundingBox(box) {
      let vertices = getVertices(box)
  
      let x1 = java.lang.Float.MAX_VALUE
      let x2 = 0;
      let y1 = java.lang.Float.MAX_VALUE
      let y2 = 0;

      vertices.forEach(vertex => {
        let vec = projectPoint(vertex.x, vertex.y, vertex.z)
        if (vec == null) return null
  
        let x = vec.x
        let y = vec.y
  
        if (x < x1) x1 = x
        if (x > x2) x2 = x
        if (y < y1) y1 = y
        if (y > y2) y2 = y
      })
  
      return { x1, y1, x2, y2 }
    }
      
    function getVertices(box) {
      let list = [];
  
      list.push({ x: box.field_72340_a, y: box.field_72338_b, z: box.field_72339_c });
      list.push({ x: box.field_72336_d, y: box.field_72338_b, z: box.field_72339_c });
      list.push({ x: box.field_72336_d, y: box.field_72337_e, z: box.field_72339_c });
      list.push({ x: box.field_72340_a, y: box.field_72337_e, z: box.field_72339_c });
      list.push({ x: box.field_72340_a, y: box.field_72338_b, z: box.field_72334_f });
      list.push({ x: box.field_72336_d, y: box.field_72338_b, z: box.field_72334_f });
      list.push({ x: box.field_72336_d, y: box.field_72337_e, z: box.field_72334_f });
      list.push({ x: box.field_72340_a, y: box.field_72337_e, z: box.field_72334_f });
  
      return list;
    }
  

    let bb = calculateBoundingBox(new net.minecraft.util.AxisAlignedBB(x-0.5, y, z-0.5, x+0.5, y+2, z+0.5))
    Renderer.drawLine(color, bb.x1, bb.y1, bb.x1, bb.y2, thickness)
    Renderer.drawLine(color, bb.x1, bb.y1, bb.x2, bb.y1, thickness)
    Renderer.drawLine(color, bb.x2, bb.y2, bb.x2, bb.y1, thickness)
    Renderer.drawLine(color, bb.x2, bb.y2, bb.x1, bb.y2, thickness)
  }

  /**
   * Draws a string with shadow effect.
   *
   * @param {string} [string=" "] - The string to be drawn.
   * @param {number} x - The x-coordinate of the string's position.
   * @param {number} y - The y-coordinate of the string's position.
   * @param {number} z - The z-coordinate of the string's position.
   * @param {number} [color=Renderer.WHITE] - The color of the string.
   * @param {number} [scale=1] - The scale of the string.
   * @param {boolean} [Phase=false] - Whether to disable depth testing.
   * @param {boolean} [RenderBlackBox=false] - Whether to render a black box behind the string.
   */
  static StringWithShadow(string = " ", x, y, z, color = Renderer.WHITE, scale = 1, Phase = false, RenderBlackBox = false) {
    var matrixStack = new UMatrixStack();
    var x1 = x - Player.getRenderX();
    var y1 = y - Player.getRenderY();
    var z1 = z - Player.getRenderZ();
    var f1 = 0.0266666688;
    var width = Renderer.getStringWidth(string) / 2;
    matrixStack.push();
    matrixStack.translate(x1, y1, z1);
    GL11.glNormal3f(0, 1, 0);
      
    matrixStack.rotate(-Player.getYaw(), 0.0, 1.0, 0.0);
    matrixStack.rotate(Player.getPitch(), 1.0, 0.0, 0.0);
    matrixStack.scale(-f1, -f1, -f1);
    UGraphics.disableLighting();
    UGraphics.depthMask(true);
    UGraphics.enableBlend();
    if (Phase) UGraphics.disableDepth()
    UGraphics.tryBlendFuncSeparate(770, 771, 1, 0);
  
    if (RenderBlackBox) {
      const worldRenderer = UGraphics.getFromTessellator();
      worldRenderer.beginWithDefaultShader(UGraphics.DrawMode.QUADS, UGraphics.CommonVertexFormats.POSITION_COLOR);
      worldRenderer.pos(matrixStack, (-width - 1.0) * scale, -1.0 * scale, 0.0).color(0, 0, 0, 0.15).endVertex();
      worldRenderer.pos(matrixStack, (-width - 1.0) * scale, 9.0 * scale, 0.0).color(0, 0, 0, 0.15).endVertex();
      worldRenderer.pos(matrixStack, (width + 1.0) * scale, 9.0 * scale, 0.0).color(0, 0, 0, 0.15).endVertex();
      worldRenderer.pos(matrixStack, (width + 1.0) * scale, -1.0 * scale, 0.0).color(0, 0, 0, 0.15).endVertex();
      worldRenderer.drawDirect();
    }
  
    GlStateManager.func_179098_w();
    DefaultFonts.VANILLA_FONT_RENDERER.drawString(matrixStack, string, new Color(color), -width * scale, ElementaFonts.MINECRAFT.getBelowLineHeight() * scale, width * 2, scale, true, null);
    UGraphics.depthMask(true);
    UGraphics.enableDepth()
    matrixStack.pop();
  }


  /**
   * Draws a text bounding box with the specified parameters.
   *
   * @param {number} x - The x-coordinate of the top-left corner of the bounding box.
   * @param {number} y - The y-coordinate of the top-left corner of the bounding box.
   * @param {number} Width - The width of the bounding box.
   * @param {number} Height - The height of the bounding box.
   * @param {number} Color - The color of the bounding box.
   * @param {number} borderWidth - The width of the border of the bounding box.
   *
   * @returns {void}
   */
  static TextBoundingBox(x, y, Width, Height, Color, borderWidth) {

    x -= Width / 50; // Adjusting the x-coordinate to center the bounding box horizontally
    y -= Height / 6; // Adjusting the y-coordinate to center the bounding box vertically
    borderWidth *= 1.2; // Adjusting the border width if needed

    // Drawing the top border of the bounding box
    Renderer.drawRect(Color, x, y, Width + Width / 30, borderWidth);

    // Drawing the bottom border of the bounding box
    Renderer.drawRect(Color, x, y + Height, Width + Width / 30, borderWidth);

    // Drawing the left border of the bounding box
    Renderer.drawRect(Color, x, y, borderWidth, Height);

    // Drawing the right border of the bounding box
    Renderer.drawRect(Color, x + Width + Width / 30 - borderWidth, y, borderWidth, Height);

  }
  
  
  /**
   * Draws a 3D cylinder
   * More Info: http://legacy.lwjgl.org/javadoc/org/lwjgl/util/glu/Cylinder.html
   * @param {number} x - X Coordinates
   * @param {number} y - Y Coordinates
   * @param {number} z - Z Coordinates
   * @param {number} baseRadius - Radius of the bottom of the cylinder.
   * @param {number} topRadius - Radius of the top of the cylinder.
   * @param {number} height - Height of the cylinder.
   * @param {number} slices - Slices in the cylinder. I don't know what this means just figure it out.
   * @param {number} stacks - Stacks in the cylinder. I don't know what this means just figure it out.
   * @param {number} rot1 - Rotation on X axis.
   * @param {number} rot2 - Rotation on Y axis.
   * @param {number} rot3 - Rotation on Z axis.
   * @param {number} r - Box Color Red 0-1
   * @param {number} g - Box Color Green 0-1
   * @param {number} b - Box Color Blue 0-1
   * @param {number} a - Box Color Alpha 0-1
   * @param {boolean} phase - Depth test disabled. True: See through walls
   * @param {boolean} linemode - True: the frame of the cylinder is visible. False: the filled cylinder is visible.
   */
  static Cylinder = (x, y, z, baseRadius, topRadius, height, slices, stacks, rot1, rot2, rot3, r, g, b, a, phase, linemode) => {
    let renderPos = Tessellator.getRenderPos(x, y, z);
    x = renderPos.x
    y = renderPos.y
    z = renderPos.z
  
    Tessellator.pushMatrix()
    GL11.glLineWidth(2.0)
    GlStateManager.func_179129_p() // disableCullFace
    GlStateManager.func_179147_l() // enableBlend
    GlStateManager.func_179112_b(770, 771) // blendFunc
    GlStateManager.func_179132_a(false) // depthMask
    GlStateManager.func_179090_x() // disableTexture2D
  
    Tessellator.colorize(r, g, b, a)
    Tessellator.translate(x, y, z)
    Tessellator.rotate(rot1, 1, 0, 0)
    Tessellator.rotate(rot2, 0, 0, 1)
    Tessellator.rotate(rot3, 0, 1, 0)
  
    if (phase) GlStateManager.func_179097_i() // disableDepth 

    if (linemode) lineCylinder.draw(baseRadius, topRadius, height, slices, stacks)
    else regCylinder.draw(baseRadius, topRadius, height, slices, stacks)
  
    GlStateManager.func_179089_o() // enableCull
    GlStateManager.func_179084_k() // disableBlend
    GlStateManager.func_179132_a(true) // depthMask
    GlStateManager.func_179098_w() // enableTexture2D
    GlStateManager.func_179126_j() // enableDepth
    

                  
    Tessellator.popMatrix()
  }


  /**
   * Draws a rounded rectangle with the specified parameters.
   *
   * @param {java.awt.Color} colour - The color of the rectangle.
   * @param {number} x - The x-coordinate of the top-left corner of the rectangle.
   * @param {number} y - The y-coordinate of the top-left corner of the rectangle.
   * @param {number} width - The width of the rectangle.
   * @param {number} height - The height of the rectangle.
   * @param {number} radius - The radius of the rectangle's corners.
   *
   * @returns {void}
   */
  static RoundedRect(colour, x, y, width, height, radius) {
    CompatMatrix.runLegacyMethod(CompatMatrix.get(), () => {
      ElementaUIRoundedRectangle.drawRoundedRectangle(
        CompatMatrix.get(),
          x,
          y,
          x + width,
          y + height,
          radius,
          colour // java.awt.Color
      )
    })
  }


  /**
  * Draws a line from the player's eye position to a specified block position.
  *
  * @param {number} x - The x-coordinate of the block position.
  * @param {number} y - The y-coordinate of the block position.
  * @param {number} z - The z-coordinate of the block position.
  * @param {number} r - The red color value (0-255).
  * @param {number} g - The green color value (0-255).
  * @param {number} b - The blue color value (0-255).
  * @param {number} a - The alpha (transparency) value (0-100).
  * @param {number} [lineWidth=1] - The width of the line.
  */
  static drawTrace(x, y, z, r, g, b, a = 100, lineWidth = 3.5) {
    this.Line(
      Player.getRenderX(),
      Player.getRenderY() + Player.getPlayer().func_70047_e(),
      Player.getRenderZ(),
      x,
      y,
      z,
      r / 255,
      g / 255,
      b / 255,
      a / 100,
      true,
      lineWidth
    )
  }

  /**
   * This function is used to display a title with customizable parameters.
   *
   * @param {string} text - The text to be displayed as the title.
   * @param {number} [scale=5] - The scale factor for the title text. Default is 5.
   * @param {number} [time=3000] - The duration in milliseconds for which the title should be displayed. Default is 3000.
   * @param {string} [sound="random.orb"] - The sound to be played when the title is displayed. Default is "random.orb".
   * @param {number} [yOffset=0] - The vertical offset for the title position. Default is 0.
   * @param {number} [xOffset=0] - The horizontal offset for the title position. Default is 0.
   */
  static Title(text, scale = 5, time = 3000, sound = "random.orb", yOffset = 0, xOffset = 0) {
      let timePast = null
      const titleText = new Text(" ")

      const trigger = register("renderOverlay", () => {
        const currentTime = Date.now()

        if (!timePast) {
          timePast = currentTime
          World.playSound(sound, 1, 1)
        }

        const remainingTime = time - (currentTime - timePast)

        if (remainingTime > 0) {
          titleText.setString(text)
          titleText.setX(Renderer.screen.getWidth() / 2 + xOffset)
          titleText.setY(Renderer.screen.getHeight() / 2 - Renderer.screen.getHeight() / 14 + yOffset)
            

          title.setAlign("CENTER")
            .setShadow(true)
            .setScale(scale)
            .draw()
        } else trigger.unregister()

      })
  }



}


export class PlayerUtils {
  

  /**
   * Returns the player's eye position.
   *
   * @returns {Object} An object containing the x, y, and z coordinates of the player's eye position.
   */
  static getEyePos() {
    return {
      x: Player.getX(),
      y: Player.getY() + Player.getPlayer().func_70047_e(),
      z: Player.getZ()
    }
  }


  /**
   * Rotates the player's view in the game world.
   *
   * @param {number} yaw - The new yaw (horizontal rotation) value for the player's view.
   * @param {number} pitch - The new pitch (vertical rotation) value for the player's view.
   *
   */
  static rotate(yaw, pitch) {
    const player = Player.getPlayer()
    player.field_70177_z = yaw
    player.field_70125_A = pitch
  }


  /**
   * Calculates the yaw and pitch angles required to look at a specific block position.
   *
   * @param {Object} BlockPos - The block position object containing the x, y, and z coordinates.
   * @param {Object} [PlayerPos] - The player position object containing the x, y, and z coordinates. If not provided, the player's eye position will be used.
   *
   * @returns {Array} An array containing the yaw and pitch angles in degrees. If the calculation fails, returns undefined.
   */
  static calcYawPitch(BlockPos, PlayerPos) {
    if (!PlayerPos) PlayerPos = this.getEyePos()

    let d = {
        x: BlockPos.x - PlayerPos.x,
        y: BlockPos.y - PlayerPos.y,
        z: BlockPos.z - PlayerPos.z
    }

    let yaw = 0;
    let pitch = 0;

    if (d.x != 0) {

        if (d.x < 0) yaw = 1.5 * Math.PI
        else {yaw = 0.5 * Math.PI}

        yaw = yaw - Math.atan(d.z / d.x);
    }
    else if (d.z < 0) yaw = Math.PI;

    d.xz = Math.sqrt(Math.pow(d.x, 2) + Math.pow(d.z, 2))
    pitch = -Math.atan(d.y / d.xz)
    yaw = -yaw * 180 / Math.PI
    pitch = pitch * 180 / Math.PI
    if (pitch < -90 || pitch > 90 || isNaN(yaw) || isNaN(pitch) || yaw == null || pitch == null || yaw == undefined || pitch == null) return

    return [yaw, pitch]
  
  }


  /**
   * Rotates the player's view in the game world smoothly over a specified time period.
   *
   * @param {number} yaw - The new yaw (horizontal rotation) value for the player's view.
   * @param {number} pitch - The new pitch (vertical rotation) value for the player's view.
   * @param {number} time - The duration in milliseconds over which the rotation should occur.
   */
  static rotateSmoothly(yaw, pitch, time) {
    // Normalize yaw to be within the range of -180 to 180
    while (yaw >= 180) yaw -= 360
    while (yaw < -180) yaw += 360

    // Get the initial yaw and pitch values
    const initialYaw = Player.getYaw()
    const initialPitch = Player.getPitch()

    // Get the current time
    const initialTime = new Date().getTime()

    // Register a step event to handle the smooth rotation
    const trigger = register("step", () => {
      // Calculate the progress of the rotation (0 to 1)
      const progress = time <= 0 ? 1 : Math.max(Math.min((new Date().getTime() - initialTime) / time, 1), 0)

      // Calculate the amount of rotation based on the progress
      const amount = (1 - progress) * (1 - progress) * (1 - progress) * 0 + 3 * (1 - progress) * (1 - progress) * progress * 1 + 3 * (1 - progress) * progress * progress * 1 + progress * progress * progress * 1

      // Apply the rotation
      this.rotate(initialYaw + (yaw - initialYaw) * amount, initialPitch + (pitch - initialPitch) * amount)

      // Unregister the step event when the rotation is complete
      if (progress >= 1) trigger.unregister()
    })
  }


  /**
   * Swaps the player's inventory to the item in the specified slot.
   *
   * @param {number} SlotIndex - The index of the slot to swap to.
   *
   * @returns {void}
   */
  static swapToSlot(SlotIndex) {
    const MCplayer = Player.getPlayer()
    if (!MCplayer) return

    const MCInventory = MCplayer.field_71071_by
    if (!MCInventory) return

    MCInventory.field_70461_c = SlotIndex

    ModMessage(`Swapped to item in slot ${SlotIndex}`)
  }


  /**
   * Simulates a mouse click event in the game world.
   *
   * @param {string} [type="LEFT"] - The type of mouse click. Can be "LEFT", "RIGHT", or "MIDDLE". Defaults to "LEFT".
   */
  static Click(type = "LEFT") {
    type = type.removeFormatting().toLocaleLowerCase()
    const MC = Client.getMinecraft()

    const LeftClickMethod = MC.getClass().getDeclaredMethod("func_147116_af", null)
    const RightClickMethod = MC.getClass().getDeclaredMethod("func_147121_ag", null)
    const MiddleClickMethod = MC.getClass().getDeclaredMethod("func_147112_ai", null)

    LeftClickMethod.setAccessible(true)
    RightClickMethod.setAccessible(true)
    MiddleClickMethod.setAccessible(true)

    if (type === "left") LeftClickMethod.invoke(MC, null)
    else if (type === "right") RightClickMethod.invoke(MC, null)
    else if (type === `middle`) MiddleClickMethod.invoke(MC, null)

  }


  /**
   * This function is used to use the ability of the dungeon class.
   *
   * @param {boolean} [Ultimate=false] - A boolean indicating whether to use the ultimate or the ability.
   * If true, the ultimate ability will used. If false, the class ability will used.
   * The default value is false, meaning the ultimate ability will be used initially.
   *
   * @example
   * PlayerUtils.UseDungeonClassAbility(true); // use the ultimate ability
   * PlayerUtils.UseDungeonClassAbility(false); // use the class ability
   */
  static UseDungeonClassAbility(Ultimate = false) {
      Ultimate = !Ultimate
      const MCplayer = Player.getPlayer()
      if (!MCplayer) throw new Error("Player object does not exist.")

      MCplayer.func_71040_bB(Ultimate)
  }


}



export const guiData = new PogObject("Noammaddons", {

	BonzoMaskGUIdata: {
		x: 10,
		y: 90,
		s: 100,
	},

	SpiritMaskGUIdata: {
		x: 10,
		y: 110,
		s: 100,
	},

	PhoenixPetGUIdata: {
		x: 10,
		y: 130,
		s: 100,
	},

	LegitGhostPickGUIdata: {
		x: 10,
		y: 150,
		s: 100,
	},

	ClockDisplayGUIdata: {
		x: 10,
		y: 90,
		s: 100,
	},
    
	FPSdisplayGUIdata: {
		x: 10,
		y: 90,
		s: 100,
	}
		
}, "Config/GuiData.json")

export const BonzoMaskGUIdata = guiData.BonzoMaskGUIdata
export const SpiritMaskGUIdata = guiData.SpiritMaskGUIdata
export const PhoenixPetGUIdata = guiData.PhoenixPetGUIdata
export const LegitGhostPickGUIdata = guiData.LegitGhostPickGUIdata
export const FPSdisplayGUIdata = guiData.FPSdisplayGUIdata
export const ClockDisplayGUIdata = guiData.ClockDisplayGUIdata