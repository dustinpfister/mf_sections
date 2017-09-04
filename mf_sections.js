var S = {

    sw : 320, // the pixel width and height of a section
    sh : 240,
    W : 8, // the section matrix width and height
    H : 5,
    la : 1,

    secs : [], // the sections array
    load : [], // currently loaded sections

    // setup sections
    set : function (sw, sh, W, H) {

        var X,
        Y,
        x,
        y,
        s = this;

        s.sw = sw || 320;
        s.sh = sh || 240;
        s.W = W || 8;
        s.H = H || 5;

        s.secs = [];
        Y = Math.floor(-s.H / 2);
        while (Y < s.H / 2) {

            X = Math.floor(-s.W / 2);
            while (X < s.W / 2) {

                x = X * s.sw;
                y = Y * s.sh;

                // push new section object
                s.secs.push({

                    i : (Y + Math.floor(s.H / 2)) * s.W + X + Math.floor(s.W / 2),
                    X : X, // cell pos
                    Y : Y,
                    x : x, // px pos
                    y : y

                });

                X += 1;

            }

            Y += 1;
        }

    },

    // get a section by x, and y pixel location
    getPos : function (x, y) {

        return this.get(Math.floor(x / this.sw), Math.floor(y / this.sh));

    },

    // get a section by X & Y sec pos
    get : function (X, Y) {

        var hw = Math.ceil(this.W / 2),
        hh = Math.ceil(this.H / 2);

        if (X >= -hw && X < hw && Y >= -hh && Y < hh) {

            var i = this.W * (Y + hh) + X + hw,

            sec = this.secs[i];

            return sec

        };

        return {};

    },

    // load sections based on the given vp values
    ls : function (x, y, w, h) {

        var SX,
        EX,
        SY,
        EY,
        Y,
        X,
        i,
        s = this;

        s.load = [];

        SX = Math.round(x / s.sw);
        SY = Math.round(y / s.sh);
        EX = Math.round((x + w) / s.sw);
        EY = Math.round((y + h) / s.sh);

        Y = SY - s.la;
        while (Y < EY + s.la) {

            X = SX - s.la;
            while (X < EX + s.la) {

                var sec = s.get(X, Y);

                if (sec.X != undefined) {

                    s.load.push(sec);
                }

                X += 1;

            }

            Y += 1;

        }

    }

};
