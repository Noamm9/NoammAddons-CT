/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import { SettingsGUIHandler } from "../Settings"
import { cc, fullName, ModMessage } from "../utils";


const commandsList = [];

export default class Command {
    /**
     * Initializes a new instance of the Command class with the given command name and function.
     *
     * @param {string} commandName - The name of the command to be created.
     * @param {function} fn - The function to be executed when the command is called.
     */
    constructor(commandName, fn) {
        this.commandName = commandName.toLowerCase();
        this.fn = fn;

        commandsList.push(this);
    }
}


register("command", (...args) => {
    if (typeof args  == "undefined") return SettingsGUIHandler.ctGui.open(); 

    const commandName = args[0].toLowerCase()
    args.shift()
    const obj = commandsList.find(c => c.commandName === commandName);

    if (typeof obj !== "undefined" && typeof obj.fn === "function") {
        obj.fn(...args)
    }
})
.setTabCompletions(() => commandsList.map(cmd => cmd.commandName))
.setName("na")


new Command(`help`, () => { 
    cc(`${fullName}'s Commands:`)
    cc(`   `)
    commandsList.forEach(cmd => cc(`- ${cmd.commandName}`))
})





/*  --------------------------------    How TO USE THIS --------------------------------

new Command(`test`, (...args) => {
    if (args == undefined) return ModMessage(`its working as expected`)
    
    if (args[0] == `hello`) {
        ModMessage(`Hello there!`)
    }
})
    
//  --------------------------------    How TO USE THIS --------------------------------*/