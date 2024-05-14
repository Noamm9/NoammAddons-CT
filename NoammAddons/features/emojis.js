/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Config/Settings";


const emojiMap = new Map([
    ['<3', '❤'],
    [':star:', '✮'],
    [':yes:', '✔'],
    [':no:', '✖'],
    [':java:', '☕'],
    [':arrow:', '➜'],
    [':shrug:', '¯\\_(ツ)_/¯'],
    [':tableflip:', '(╯°□°）╯︵ ┻━┻'],
    ['o/', '( ﾟ◡ﾟ)/'],
    [':totem:', '☉_☉'],
    [':typing:', '✎...'],
    [':maths:', '√(π+x)=L'],
    [':snail:', "@'-'"],
    [':thinking:', '(0.o?)'],
    [':gimme:', '༼つ◕_◕༽つ'],
    [':wizard:', "('-')⊃━☆ﾟ.*･｡ﾟ"],
    [':pvp:', '⚔'],
    [':peace:', '✌'],
    [':puffer:', `<('O')>`],
    [':yey:', 'ヽ (◕◡◕) ﾉ'],
    [':cat:', '= ＾● ⋏ ●＾ ='],
    [':dab:', '<o/'],
    [':dj:', 'ヽ(⌐■_■)ノ♬'],
    [':snow:', '☃'],
    ['h/', 'ヽ(^◇^*)/'],
    [':sloth:', '(・⊝・)'],
    [':cute:', '(✿◠‿◠)'],
    [':dog:', '(ᵔᴥᵔ)']
]);

function includesAnyKey(message) {
    for (let key of emojiMap.keys()) {
        if (message.includes(key)) {
            return true;
        }
    }
    return false;
}

register('messageSent', (message, event) => {
    if (!includesAnyKey(message) || !Settings.ChatEmojis) return
    let newMessage = message;
    emojiMap.forEach((value, key) => {
        newMessage = newMessage.replace(new RegExp(key, `g`), value);
    });

    cancel(event);
    ChatLib.say(newMessage);
})
