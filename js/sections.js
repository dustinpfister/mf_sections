var S = (function () {

    // the section map
    var map = {

        sw : 32, // the pixel width and height of a section
        sh : 16,
        W : 23, // the section matrix width and height
        H : 17,

        secs : [], // the sections array
        load : [], // currently loaded sections

        // get a section by x, and y pixel location
        getPos : function (x, y, debug) {

            return this.get(Math.floor(x / this.sw), Math.floor(y / this.sh), debug);

        },

        // get a section by X & Y sec pos
        get : function (X, Y, debug) {

            var hw = Math.ceil(map.W / 2),
            hh = Math.ceil(map.H / 2);

            if (debug) {

                console.log('do you like this ligic computer???');
                console.log(X + ',' + Y);
                console.log(X < hw);

            }

            if (X >= -hw && X < hw && Y >= -hh && Y < hh) {

                //return this.secs[(map.H / 2 + Y) * map.H + X + map.W / 2];

                var i = map.W * (Y + hh) + (X + hw);

                if (debug) {

                    console.log('check pass');
                    console.log('i = ' + i);

                }

                var sec = this.secs[i];

                return sec

            };

            return {};

        },

        // setup sections
        set : function () {

            var X,
            Y = Math.floor(-this.H / 2),
            x,
            y;

            this.secs = [];
            while (Y < this.H / 2) {

                X = Math.floor(-this.W / 2);
                while (X < this.W / 2) {

                    x = X * this.sw;
                    y = Y * this.sh;

                    // push new section object
                    this.secs.push({

                        i : (Y + Math.floor(this.W / 2)) * this.W + X + this.W / 2,
                        X : X, // cell pos
                        Y : Y,
                        x : x, // px pos
                        y : y

                    });

                    X += 1;

                }

                Y += 1;
            }

        }

    },

    // the view port
    vp = {

        w : 160,
        h : 120,

        // set up
        set : function () {

            this.x = -this.w / 2;
            this.y = -this.h / 2;

        },

        // load sections based on current view port position
        ls : function () {

            map.load = [];

            var SX = Math.round(this.x / map.sw),
            SY = Math.round(this.y / map.sh),
            EX = Math.round((this.x + this.w) / map.sw),
            EY = Math.round((this.y + this.h) / map.sh),

            la = 2, //load ahead

            Y,
            X,
            i;

            Y = SY - la;
            while (Y < EY + la) {

                X = SX - la;
                while (X < EX + la) {

                    var sec = map.get(X, Y);

                    if (sec) {

                        map.load.push(sec);
                    }

                    X += 1;

                }

                Y += 1;

            }

        }

    },

    // the public api
    api = {

        // ref to map
        map : map,

        // ref to vp
        vp : vp

    };

    vp.set();
    map.set();

    return api;

}
    ());
