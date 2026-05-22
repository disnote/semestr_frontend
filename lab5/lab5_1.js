// Анимация вращения прямоугольника на PixiJS
(function () {
    const app = new PIXI.Application({
        resizeTo: window,
        background: 0x0f172a,
        antialias: true,
    });

    document.body.appendChild(app.view);

    const rect = new PIXI.Graphics();
    rect.beginFill(0x38bdf8);
    rect.drawRect(-80, -50, 160, 100);
    rect.endFill();

    rect.x = app.screen.width / 2;
    rect.y = app.screen.height / 2;

    app.stage.addChild(rect);

    app.ticker.add((delta) => {
        rect.rotation += 0.02 * delta;
    });

    window.addEventListener("resize", function () {
        rect.x = app.screen.width / 2;
        rect.y = app.screen.height / 2;
    });
})();
