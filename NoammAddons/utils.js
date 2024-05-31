/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

import RenderLib from "../RenderLib"
import { renderBoxFromCorners } from "../BloomCore/RenderUtils"
import Dungeon from "../BloomCore/dungeons/Dungeon"
export const BlockPoss = Java.type("net.minecraft.util.BlockPos")
export const player = Client.getMinecraft().field_71439_g
export const gc = (text) => ChatLib.getCenteredText(text) // getCentered
export const cc = (text) => ChatLib.chat(gc(text)) // centerChat
export const prefix = "§6§l[§b§lN§d§lA§6§l]§r"
export const Color = Java.type("java.awt.Color")
const BufferUtils = Java.type("org.lwjgl.BufferUtils")
const Project = Java.type("org.lwjgl.util.glu.Project")
const modelViewMatrix = BufferUtils.createFloatBuffer(16)
const projectionMatrix = BufferUtils.createFloatBuffer(16)
const viewportDims = BufferUtils.createIntBuffer(16)
const ScaledResolution = Java.type("net.minecraft.client.gui.ScaledResolution")
const UMatrixStack = Java.type("gg.essential.universal.UMatrixStack");
const UGraphics = Java.type("gg.essential.universal.UGraphics");
const DefaultFonts = Java.type("gg.essential.elementa.font.DefaultFonts")
const ElementaFonts = Java.type("gg.essential.elementa.font.ElementaFonts")


export function setAir (BlockPoss) {
  World.getWorld().func_175698_g(BlockPoss)
}  

export function GhostBlock (BlockPoss, MCIBlockState) {
  World.getWorld().func_175656_a(BlockPoss, MCIBlockState);
}

export function ModMessage (string) {
  ChatLib.chat(`${prefix} ${string}`)
}


export function darkenColor(color, amount) {
  let r = Math.max(color.getRed()/255 - amount/255, 0)
  let g = Math.max(color.getGreen()/255 - amount/255, 0)
  let b = Math.max(color.getBlue()/255 - amount/255, 0)
  return new Color(r, g, b)
}


export function getLore (item,returnName=true) {
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

    if (Player.getY() > 210) inPhase = "p1"
    else if (Player.getY() > 155) inPhase = "p2";
    else if (Player.getY() > 100) inPhase = "p3";
    else if (Player.getY() > 45) inPhase = "p4";
    else inPhase = "p5";
    
  }

  return inBoss ? inPhase : false;
}


/**
 * @param {Object} b The blockpos object
 * @returns {Number} The ID of the block at the specified coordinates
*/
export function getBlockPosIdAt(b) { World.getBlockAt(b).type.getID() }

 
export class MyMath {
  
  static DistanceIn3dWorld(x1, y1, z1, x2, y2, z2) {
    return Math.sqrt((x1 - x2)**2 + (y1 - y2)**2 + (z1 - z2)**2)
  }

  static DistanceIn2dWorld(x1, z1, x2, z2) {
    return Math.sqrt((x1 - x2)**2 + (z1 - z2)**2)
  }
  
  
}


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
  static Line = (x1, y1, z1, x2, y2, z2, red, green, blue, alpha, phase, lineWidth) => {
    if (!lineWidth) lineWidth = 2.0;
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

    
  static BlockHitbox = (ctBlock, r, g, b, a, phase=true, lineWidth=2, filled=false) => {
      const [x0, y0, z0, x1, y1, z1] = getBlockBoundingBox(ctBlock)
      renderBoxFromCorners(x0-0.003, y0-0.008, z0-0.003, x1+0.003, y1+0.003, z1+0.003, r, g, b, a, phase, lineWidth, filled)
  }
    

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
  static FilledOutLineBox (x, y, z, w, h, red, green, blue, alpha, phase) {
    RenderLib.drawEspBox(x, y, z, w+0.02, h+0.02, red, green, blue, 255, phase)
    RenderLib.drawInnerEspBox(x, y, z, w+0.02, h+0.02, red, green, blue, alpha, phase)
    
  }
  

  /** 
   * @param {Text} String - Text to be Displayed
   * @param {Number} MsTime - Time in Milisecends
  */
  static TitleUnderCursor(Text, MsTime) {
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
  static TimerUnderCursor(Formating, MsTime) {
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


  static StringWithShadow(string, x, y, z, color, scale, RenderBlackBox) {
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
      UGraphics.disableDepth()
      UGraphics.tryBlendFuncSeparate(770, 771, 1, 0);
  
      if (RenderBlackBox) {
          var worldRenderer = UGraphics.getFromTessellator();
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
      matrixStack.pop();
  }


  static TextBoundingBox(x, y, Width, Height, borderWidth) {

    x -= Width / 50
    y -= Height / 6
    borderWidth *= 1.2
  
    
    Renderer.drawRect(Renderer.WHITE, x, y, Width + Width / 30, borderWidth)  // Top border
    Renderer.drawRect(Renderer.WHITE, x, y + Height, Width + Width / 30, borderWidth)  // Bottom border
    Renderer.drawRect(Renderer.WHITE, x, y, borderWidth, Height)  // Left border
    Renderer.drawRect(Renderer.WHITE, x + Width + Width / 30 - borderWidth, y, borderWidth, Height)  // Right border
  
  }
  

}

export class PlayerUtils {
  

  static getEyePos() {
    return {
        x: Player.getX(),
        y: Player.getY() + Player.getPlayer().func_70047_e(),
        z: Player.getZ()
    }
  }


  static rotate(yaw, pitch) {
    const player = Player.getPlayer()
    player.field_70177_z = yaw
    player.field_70125_A = pitch
  }


  static rightClick() {
    const rightClickMethod = Client.getMinecraft().getClass().getDeclaredMethod("func_147121_ag", null)
    rightClickMethod.setAccessible(true)
    rightClickMethod.invoke(Client.getMinecraft(), null);
  } 


  static calcYawPitch(blcPos, plrPos) {
    if (!plrPos) plrPos = this.getEyePos()

    let d = {
        x: blcPos.x - plrPos.x,
        y: blcPos.y - plrPos.y,
        z: blcPos.z - plrPos.z
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


  static rotateSmoothly(yaw, pitch, time) {
	  while (yaw >= 180) yaw -= 360
	  while (pitch >= 180) pitch -= 360

	  const initialYaw = Player.getYaw()
	  const initialPitch = Player.getPitch()
	  const initialTime = new Date().getTime()

	  const trigger = register("step", () => {
	  	const progress = time <= 0 ? 1 : Math.max(Math.min((new Date().getTime() - initialTime) / time, 1), 0)
	  	const amount = (1 - progress) * (1 - progress) * (1 - progress) * 0 + 3 * (1 - progress) * (1 - progress) * progress * 1 + 3 * (1 - progress) * progress * progress * 1 + progress * progress * progress * 1
	  	this.rotate(initialYaw + (yaw - initialYaw) * amount, initialPitch + (pitch - initialPitch) * amount)
	  	if (progress >= 1) trigger.unregister()
	  })
  }


  static swapToSlot(SlotIndex) {
    const MCplayer = Player.getPlayer()
    if (!MCplayer) return

    const MCInventory = MCplayer.field_71071_by
    if (!MCInventory) return

    MCInventory.field_70461_c = SlotIndex
    ModMessage(`Swapped to item in slot ${SlotIndex}`)
  }



}