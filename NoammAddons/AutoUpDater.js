import { fullName, ModMessage, cc} from "./utils"

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

const UpdateThread = new Thread(() => {
    try {
        urlToFile("https://github.com/Noamm9/NoammAddons/releases/download/Release/NoammAddons.zip", "config/ChatTriggers/modules/NoammAddonsAutoUpDate.zip", 1000, 2000)
        
        Thread.sleep(5000)

        ModMessage(`${fullName}§r §cDeleted:§6 ${FileLib.deleteDirectory("config/ChatTriggers/modules/NoammAddons")}`)
        cc("§a§a§b§c§d§d§e")
        FileLib.unzip(`config/ChatTriggers/modules/NoammAddonsAutoUpDate.zip`, `config/ChatTriggers/modules`)

        Thread.sleep(5000)

        ModMessage(`§4[TEMP FILE]§r NoammAddons.zip §cDeleted:§6 ${FileLib.delete("config/ChatTriggers/modules/NoammAddonsAutoUpDate.zip")}`)

    } catch (e) {ModMessage(`§bError Updating ${fullName}:\n\n§c${e}`)}
})