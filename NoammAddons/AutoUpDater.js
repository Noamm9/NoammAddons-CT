import { fullName, ModMessage, cc, CloseGame, gc} from "./utils"

const File = Java.type("java.io.File")
const URL = Java.type("java.net.URL")
const PrintStream = Java.type("java.io.PrintStream")
const Byte = Java.type("java.lang.Byte")


function urlToFile(url, destination, connecttimeout, readtimeout) {
    const d = new File(destination)
    d.getParentFile().mkdirs()
    const connection = new URL(url).openConnection()
    connection.setDoOutput(true)
    connection.setConnectTimeout(connecttimeout)
    connection.setReadTimeout(readtimeout)
    const IS = connection.getInputStream()
    const FilePS = new PrintStream(destination)
    let buf = new Packages.java.lang.reflect.Array.newInstance(Byte.TYPE, 65536)
    let len
    while ((len = IS.read(buf)) > 0) {
        FilePS.write(buf, 0, len)
    }
    IS.close()
    FilePS.close()
}

register("command", () => UpdateThread.start()).setName(`namoduleupdatetestxd`)
register("command", CloseGame).setName(`closegame`)

const UpdateThread = new Thread(() => {
    try {
        urlToFile("https://github.com/Noamm9/NoammAddons/releases/download/Release/NoammAddons.zip", "config/ChatTriggers/modules/NoammAddonsAutoUpDate.zip", 1000, 2000)
        Thread.sleep(5000)

        ChatLib.chat(`${fullName}§r §cDeleted:§6 ${FileLib.deleteDirectory("config/ChatTriggers/modules/NoammAddons")}`)
        cc("§a§a§b§c§d§d§e")

        FileLib.unzip(`config/ChatTriggers/modules/NoammAddonsAutoUpDate.zip`, `config/ChatTriggers/modules`)
        ChatLib.chat(`${fullName}§r §eUnzipping NoammAddonsAutoUpDate.zip`) 
        cc("§a§a§b§c§d§d§e")
        Thread.sleep(5000)

        FileLib.delete("config/ChatTriggers/modules/NoammAddonsAutoUpDate.zip")
        ChatLib.chat(`${fullName}§r §4[TEMP FILE]§r NoammAddons.zip §cDeleted`)
        cc("§a§a§b§c§d§d§e")
        new TextComponent(gc(`§aFinished Updating §bClick on this message to §4§lRestart your game.`)).setClickAction("run_command").setClickValue("/closegame").setHover("show_text", `§4§lCloses your game`).chat()
        
    } catch (e) {ModMessage(`§bError Updating ${fullName}:\n\n§c${e}`)}
})
