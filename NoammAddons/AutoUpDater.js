/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

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



register("command", () => {
    try {
        urlToFile("https://github.com/Noamm9/NoammAddons/releases/download/NoammAddons/NoammAddons.zip", "config/ChatTriggers/modules/NoammAddonsAutoUpDate.zip", 1000,2000)
        
        setTimeout(() => {
            ChatLib.chat(`NoammAddons Deleted? ${!FileLib.deleteDirectory("config/ChatTriggers/modules/NoammAddons")}`)
            FileLib.unzip(`config/ChatTriggers/modules/NoammAddonsAutoUpDate.zip`, `config/ChatTriggers/modules`)
        }, 5_000)

        setTimeout(() => {
            ChatLib.chat(`NoammAddons.zip Deleted? ${FileLib.delete("config/ChatTriggers/modules/NoammAddonsAutoUpDate.zip")}`)
        }, 10_000)
        
    } catch (Error) {ChatLib.chat(Error)}
    
}).setName(`update`)

