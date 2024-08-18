/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

const partySpamMessages = [
  /.+ has disbanded the party!/,
  /(.+) invited (.+) to the party! They have 60 seconds to accept./,
  /-----------------------------------------------------/,
  /Party [Members|Leader:|Members:]+.+/
]

let hidingPartySpam = false
let runningLeaderCheck = false

const hidePartySpam = (ms) => {
  hidingPartySpam = true
  setTimeout(() => hidingPartySpam = false, 1);
}

register("chat", (e) => {
  if (!hidingPartySpam && !runningLeaderCheck) return
  let unformatted = ChatLib.getChatMessage(e, false)
  if (unformatted == "You are not currently in a party." && runningLeaderCheck) return cancel(e)
  if (partySpamMessages.some(a => unformatted.match(a))) return cancel(e)
})

export function CheckPartyLeader() {
  runningLeaderCheck = true
  hidePartySpam(500)
  ChatLib.command("party list")
  setTimeout(() => runningLeaderCheck = false, 600)
}