import Settings from "../Settings";
import Dungeon from "../../BloomCore/dungeons/Dungeon";
import { CoolSound, Render } from "../utils";


register("packetReceived", (packet) => {
	if (packet.class.getSimpleName() == "S44PacketWorldBorder" && Dungeon.inDungeon && Settings.ShadowAssasianAlert) {
		//if (worldborder.func_177741_h() !== 1) return;
		Render.TitleUnderCursor(`&8Shadow Assasian Alert!`, 2000)
		CoolSound()
		for (let i = 0; i < 8; i++) setTimeout(CoolSound, 300*i)
	}
})
