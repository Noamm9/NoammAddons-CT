

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
