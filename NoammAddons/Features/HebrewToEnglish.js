/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings";


const HebrewCharacters = [
    `א`, `ב`, `ג`, `ד`, `ה`, `ו`, `ז`, `ח`, `ט`, `י`, 'כ', `ל`, 'מ', 'נ', 'ס', 'ע', 'פ', 'צ', 'ק', 'ר', 'ש', 'ת', `ן`, `ם`, `ך`, `ף`, "'"
]

const EnglishCharacters = [
    `t`, `c`, `d`, `s`, `v`, `u`, `z`, `j`, `y`, `h`, 'f', `k`, 'n', 'b', 'x', 'g', 'p', 'm', 'e', 'r', 'a', ',', `i`, `o`, `l`, `;`,"w"
]


const characterMap = new Map();
for (let i = 0; i < HebrewCharacters.length; i++) {
    characterMap.set(HebrewCharacters[i], EnglishCharacters[i])
}

function includesAnyKey(message) {
    for (let key of characterMap.keys()) {
        if (message.includes(key)) {
            return true;
        }
    }
    return false;
}


register(`messageSent`, (ChatMessage, event) => {
    if (!includesAnyKey(ChatMessage) || !Settings().HebrewToEnglish) return
    let newChatMsg = '';
    for (let i = 0; i < ChatMessage.length; i++) {
        let char = ChatMessage.charAt(i)
        let index = HebrewCharacters.indexOf(char)
        if (index !== -1) {
            newChatMsg += EnglishCharacters[index]
        } else {
            newChatMsg += char;
        }
    }

    if (newChatMsg !== ChatMessage) {
        cancel(event)
        ChatLib.say(newChatMsg)
    }
})