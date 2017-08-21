var S = (function () {

    // the section map
    var map = {

        sw : 20, // the pixel width and height of a section
        sh : 20,
        W : 10, // the section matrix width and height
        H : 10,

        secs : [], // the sections array
        load : [], // currently loaded sections

        // setup sections
        set : function () {

            var X,
            Y = -this.H / 2,
            x,
            y;

            this.secs = [];
            while (Y < this.H / 2) {

                X = -this.W / 2;
                while (X < this.W / 2) {

                    x = X * this.sw;
                    y = Y * this.sh;

                    // push new section object
                    this.secs.push({

                        i : (Y + this.W / 2) * this.W + X + this.W / 2,
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

        w : 20,
        h : 20,

        // set up
        set : function () {

            this.x = -this.w / 2;
            this.y = -this.h / 2;

            //this.x = -20;
            //this.y = -220;

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

                    if (X >= -map.W / 2 && X < map.W / 2 && Y >= -map.H / 2 && Y < map.H / 2) {

                        i = (map.H / 2 + Y) * map.H + X + map.W / 2;

                        map.load.push(map.secs[i]);

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
