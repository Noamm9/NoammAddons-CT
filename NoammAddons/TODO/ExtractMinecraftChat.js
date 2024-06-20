


let frame = new javax.swing.JFrame("Minecaft Chat -- NoammAddons")
frame.setDefaultCloseOperation(javax.swing.JFrame.DISPOSE_ON_CLOSE)

let textBox = new javax.swing.JTextArea()
textBox.setFont(new java.awt.Font("Segoe UI", java.awt.Font.PLAIN, 18))
textBox.setEditable(false)
textBox.setAutoscrolls(true)
textBox.setLineWrap(true)
textBox.setWrapStyleWord(true)
textBox.setBackground(java.awt.Color.gray)
let scrollPane = new javax.swing.JScrollPane(textBox)

let textField = new javax.swing.JTextField("")
textField.setFont(new java.awt.Font("Segoe UI", java.awt.Font.PLAIN, 19))
textField.setBorder(javax.swing.BorderFactory.createEmptyBorder())
textField.addActionListener(new java.awt.event.ActionListener({
    actionPerformed: () => {
        ChatLib.say(textField.getText())
        textField.setText("")
    }
}))

frame.add(scrollPane, java.awt.BorderLayout.CENTER)
frame.add(textField, java.awt.BorderLayout.SOUTH)
frame.setSize(480, 450)
frame.setResizable(true)
frame.setVisible(true)


register("chat", (event) => {
    try {
        let ChatMessage = ChatLib.getChatMessage(event, false)
        textBox.append("\n" +ChatMessage)
        textBox.setCaretPosition(textBox.getDocument().getLength())
    } catch (e) {}
})


/*
register(`command`, () => {
    let x1 = 95, y1 = 168, z1 = 60;
    let x2 = 105, y2 = 168, z2 = 70;
    
    for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
            for (let z = z1; z <= z2; z++) {
                if (World.getBlockAt(x, y, z).type.getID() == 35) {
                    textBox.append("\n" +`  {"x": ${x}, "y": ${y}, "z": ${z}},  `)
                    textBox.setCaretPosition(textBox.getDocument().getLength())
                }
            }
        }
    }
}).setName(`getCoords`)


*/
import { ModMessage, MouseEvent } from "../utils"
let lastShot 
register(MouseEvent, (event) => {
    try {
        if (Date.now() - lastShot < 300) return
        if (event.button == 1 && Player.getHeldItem()?.getID() == 276) {
            textBox.append("\n" +`{"x": ${Player.lookingAt().getX()}, "y": ${Player.lookingAt().getY()}, "z": ${Player.lookingAt().getZ()}},`)
            ModMessage(`{"x": ${Player.lookingAt().getX()}, "y": ${Player.lookingAt().getY()}, "z": ${Player.lookingAt().getZ()}},`)
            lastShot = Date.now()
            textBox.setCaretPosition(textBox.getDocument().getLength())
        }
    } catch (error) {ModMessage(`Look at a block`)}
})