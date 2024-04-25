import Settings from "../Settings";
import Dungeon from "../../BloomCore/dungeons/Dungeon";


register("packetReceived", (packet) => {
	if (packet.class.getSimpleName() == "S44PacketWorldBorder" && Dungeon.inDungeon && Settings.ShadowAssasianAlert) {
		//if (worldborder.func_177741_h() !== 1) return;
		Client.showTitle(" ", "§aShadow Assassin!", 0, 60, 0);
		World.playSound("mob.blaze.hit", 1, 1);
		World.playSound("mob.blaze.hit", 1, 1);
		World.playSound("mob.blaze.hit", 1, 1);
	}
})
