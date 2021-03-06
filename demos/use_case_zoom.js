

(function () {

    // create and inject a canvas
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    mapH,
    mapW,
    offX,
    offY,
    mw,
    mh,
    keys = [],

    rnd = function () {

        if (sec.pl === undefined) {

            sec.pl = [];

        }

        sec.pl.push({

            x : a,
            y : b,
            s : 5

        });

    },

    ring = function (points, d) {

        var p = points;
        while (p--) {

            var r = Math.PI * 2 / points * p;
            var a = Math.floor(Math.cos(r) * d);
            var b = Math.floor(Math.sin(r) * d);

            //console.log(x + ',' + y)

            //console.log();
            var sec = S.map.getPos(a, b);

            //console.log(sec);

            if (sec === undefined) {

                console.log('undefined sec');
                console.log(a);
                console.log(b);

            }

            //console.log(sec);

            if (sec.pl === undefined) {

                sec.pl = [];

            }

            sec.pl.push({

                x : a,
                y : b,
                s : 5

            });

        }

    },

    setup = function () {

        // append to body
        document.body.appendChild(canvas);

        // set actual matrix size of the canvas
        canvas.width = 800;
        canvas.height = 600;

        // setup map
        S.map.sw = 32;
        S.map.sh = 32;
        S.map.W = 20;
        S.map.H = 12;

        S.vp.w = 32;
        S.vp.h = 32;

        S.vp.set();
        S.map.set();

        mapW = S.map.sw * S.map.W;
        mapH = S.map.sh * S.map.H;
        offX = mapW / 2 + 10; //mapW / 2 + (canvas.width / 2 - mapW / 2);
        offY = mapH / 2 + 10; //mapH / 2 + (canvas.height / 2 - mapH / 2);


        // start at center
        S.vp.x = -S.vp.w / 2;
        S.vp.y = -S.vp.h / 2;

        // rings

        ring(10000, 190);
        ring(5000, 150);
        ring(100, 100);
        ring(20, 50);
        ring(10, 20);

        // load sections for first time
        S.vp.ls();

        cls();
        draw();

        loop();

    },

    // draw all sections
    drawSections = function () {

        var s = S.map.secs;

        ctx.strokeStyle = '#ffffff';
        ctx.fillStyle = '#ffffff';

        ctx.textBaseline = 'top';
        s.forEach(function (sec, index) {

            ctx.strokeRect(

                sec.x + offX,

                sec.y + offY,

                S.map.sw, S.map.sh);

        });

    },

    drawLoaded = function () {

        ctx.strokeStyle = '#00ffff';
        ctx.fillStyle = '#00ffff';

        ctx.textBaseline = 'top';
        S.map.load.forEach(function (sec, index) {

            ctx.strokeRect(

                sec.x + offX,

                sec.y + offY,

                S.map.sw, S.map.sh);

            ctx.fillText(sec.x - S.vp.x, sec.x + 5 + offX, sec.y + 5 + offY);

        });
    },

    //draw planets
    drawPlanets = function () {

        S.map.load.forEach(function (sec, index) {

            if (sec.pl) {

                sec.pl.forEach(function (pl) {

                    ctx.fillStyle = '#ff0000';
                    ctx.fillRect(pl.x + offX, pl.y + offY, pl.s, pl.s);

                });

            }

        });

    },

    //
    drawViewport = function () {

        ctx.lineWidth = 3;
        ctx.strokeStyle = '#00ff00';

        // draw viewport marker
        ctx.strokeRect(S.vp.x + offX, S.vp.y + offY, S.vp.w, S.vp.h);

        // draw scaled view

        ctx.strokeStyle = '#ffffff';
        //var sx = S.map.load[0].X * S.map.sw;

        //console.log(S.vp.x % S.map.sw);


        //console.log();
        /*
        S.map.load.forEach(function (sec, index) {

        var x = offX + sec.x - sx,
        y = offY * 3 + sec.y;

        ctx.strokeRect(

        x * mw,

        y * mh,
        S.map.sw * mw,
        S.map.sh * mh);

        ctx.textBaseline = 'top';
        ctx.fillText(sec.i, x + 5, y + 5);

        });
         */

    },

    drawSceen = function () {

        ctx.strokeStyle = '#ffff00';
        ctx.lineWidth = 3;

        var sx = S.vp.sx / S.map.sw * 800,
        sy = S.vp.sy / S.map.sh * 600;

        S.map.load.forEach(function (sec) {

            var box = S.ajust(sec, 800, 600);

            ctx.strokeRect(

                box.x,
                box.y,
                box.w,
                box.h);

            if (sec.pl) {

                sec.pl.forEach(function (pl) {

                    var box = S.ajust(pl, 800, 600);

                    ctx.fillStyle = '#ff0000';
                    ctx.fillRect(box.x, box.y, box.w, box.h);

                });

            }

            /*
            ctx.strokeRect(

            (sec.x - S.vp.x) / S.map.sw * 800 / S.vp.mw,
            (sec.y - S.vp.y) / S.map.sh * 600 / S.vp.mh,
            800 / S.vp.mw,
            600 / S.vp.mh);

             */

        });

        ctx.fillStyle = '#ffff00';
        ctx.fillText('sx ' + sx, 10, 300);

    },

    drawInfo = function () {

        var x = 400,
        y = 10,
        dy = 20;

        ctx.fillStyle = '#00ff00';
        ctx.fillText('mw: ' + S.vp.mw, x, y + dy * 1);
        ctx.fillText('mh: ' + S.vp.mh, x, y + dy * 2);
        ctx.fillText('vp pos (px) (' + S.vp.x + ',' + S.vp.y + ')', x, y + dy * 3);
        ctx.fillText('vp pos (sec) (' + S.vp.X + ',' + S.vp.Y + ')', x, y + dy * 4);
        ctx.fillText('vp sec index: ' + S.vp.secIndex, x, y + dy * 5);
        ctx.fillText('vp sec XY offset: (' + S.vp.secXOff + ',' + S.vp.secYOff + ')', x, y + dy * 6);
        ctx.fillText('look ahead: ' + S.vp.la, x, y + dy * 7);
        ctx.fillText('sx: ' + S.vp.sx, x, y + dy * 8);
        ctx.fillText('ajustX: ' + S.vp.ajustX, x, y + dy * 9);

    },

    // the single draw function
    draw = function () {

        drawSceen();

        drawSections();
        drawLoaded();
        drawPlanets();
        drawViewport();

        drawInfo();
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

        if (keys[87]) {

            S.vp.y -= 1;

        }

        if (keys[83]) {

            S.vp.y += 1;

        }

        if (keys[65]) {

            S.vp.x -= 1;

        }

        if (keys[68]) {

            S.vp.x += 1;

        }

        if (keys[49]) {

            if (S.vp.w < 640) {

                S.vp.w += 2;
                S.vp.x -= 1;

                S.vp.h += 2;
                S.vp.y -= 1;

            }

        }

        if (keys[50]) {

            if (S.vp.h > 32) {

                S.vp.w -= 2;
                S.vp.x += 1;

                S.vp.h -= 2;
                S.vp.y += 1;

            }

        }

        if (keys[51]) {

            console.log(S.map.load);

        }

        // multi
        mw = S.map.sw / S.vp.w;
        mh = S.map.sh / S.vp.h;

        S.vp.update();
        S.vp.ls();

        cls();
        draw();

    };

    window.onkeydown = function (e) {

        console.log(e.keyCode);

        keys[e.keyCode] = true;

    };

    //});

    window.onkeyup = function (e) {

        keys[e.keyCode] = false;

    };

    setup();

}
    ());
