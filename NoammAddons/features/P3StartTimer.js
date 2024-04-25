import Settings from "../Settings";

register("chat", () => {
    if (!Settings.P3StartTimer) return
    const time = 5200;
    const startTime = new Date().getTime();
    const trigger = register("step", () => {
        const timeLeft = time - (new Date().getTime() - startTime);
        Client.showTitle(" ", "§a" + (timeLeft / 1000).toFixed(2), 0, 1000, 0);
        Client.showTitle(" ", "§a" + (timeLeft / 1000).toFixed(2), 0, 1000, 0);
        if (timeLeft <= 0) {
            trigger.unregister();
            Client.showTitle(" ", " ", 0, 0, 0);
        }
    });
}).setCriteria("[BOSS] Storm: I should have known that I stood no chance.")