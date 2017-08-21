
S.vp.ls();

(function () {

    // create and inject a canvas
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),

    setup = function () {

        // append to body
        document.body.appendChild(canvas);

        // set actual matrix size of the canvas
        canvas.width = 320;
        canvas.height = 240;

        loop();

    },

    // draw all sections
    drawSections = function () {

        var s = S.map.secs;

        s.forEach(function (sec, index) {

            ctx.strokeStyle = '#ffffff';
            ctx.strokeRect(

                sec.x + S.map.sw * (S.map.W / 2),

                sec.y + S.map.sh * (S.map.H / 2),

                S.map.sw, S.map.sh);

        });

    },

    drawLoaded = function () {

        S.map.load.forEach(function (sec, index) {

            ctx.strokeStyle = '#00ffff';
            ctx.strokeRect(

                sec.x + S.map.sw * (S.map.W / 2),

                sec.y + S.map.sh * (S.map.H / 2),

                S.map.sw, S.map.sh);

        });
    },

    //
    drawViewport = function () {

        ctx.lineWidth = 3;
        ctx.strokeStyle = '#00ff00';

        ctx.strokeRect(

            S.vp.x + S.map.sw * (S.map.W / 2), S.vp.y + S.map.sh * (S.map.H / 2), S.vp.w, S.vp.h)

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

        S.vp.x = S.map.sw * 0;
        S.vp.y = S.map.sh * 0;

        S.vp.ls();

        cls();
        draw();

    };

    setup();

}
    ());
