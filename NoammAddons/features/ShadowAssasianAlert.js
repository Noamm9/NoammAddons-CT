



import Settings from "../Settings";
import Dungeon from "../../BloomCore/dungeons/Dungeon";
import { CoolSound, ModMessage, Render } from "../utils";

const WorldBorder = Java.type("net.minecraft.world.border.WorldBorder");


register("packetReceived", (packet) => {
	if (packet.class.getSimpleName() == "S44PacketWorldBorder" && Dungeon.inDungeon && Settings.ShadowAssasianAlert) {
		const worldborder = new WorldBorder();
		packet.func_179788_a(worldborder);

		if (worldborder.func_177741_h() !== 1) return;
		Render.TitleUnderCursor(`&8Shadow Assasian Alert!`, 2000)
		for (let i = 0; i < 8; i++) setTimeout(CoolSound, 300*i)

	}
})
