

(function () {

    // create and inject a canvas
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    mapH,
    mapW,
    offX,
    offY,
    setup = function () {

        // append to body
        document.body.appendChild(canvas);

        // set actual matrix size of the canvas
        canvas.width = 320;
        canvas.height = 240;

        mapW = S.map.sw * S.map.W;
        mapH = S.map.sh * S.map.H;
        offX = mapW / 2 + (canvas.width / 2 - mapW / 2);
        offY = mapH / 2 + (canvas.height / 2 - mapH / 2);

        loop();

    },

    // draw all sections
    drawSections = function () {

        var s = S.map.secs;

        s.forEach(function (sec, index) {

            ctx.strokeStyle = '#ffffff';
            ctx.strokeRect(

                sec.x + offX,

                sec.y + offY,

                S.map.sw, S.map.sh);

        });

    },

    drawLoaded = function () {

        S.map.load.forEach(function (sec, index) {

            ctx.strokeStyle = '#00ffff';
            ctx.strokeRect(

                sec.x + offX,

                sec.y + offY,

                S.map.sw, S.map.sh);

        });
    },

    //
    drawViewport = function () {

        ctx.lineWidth = 3;
        ctx.strokeStyle = '#00ff00';

        ctx.strokeRect(

            S.vp.x + offX, S.vp.y + offY, S.vp.w, S.vp.h)

    },

    // the single draw function
    draw = function () {

        drawSections();
        drawLoaded();
        drawViewport()

    },

    // clear screen
    cls = function () {

        // default the canvas to a solid back background
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

    },

    // the loop
    loop = function () {

        requestAnimationFrame(loop);

        S.vp.x = -S.vp.w / 2;
        S.vp.y = -S.vp.h / 2;

        S.vp.ls();

        cls();
        draw();

    };

    setup();

}
    ());
