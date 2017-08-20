var S = (function () {

    // the section map
    var map = {

        sw : 100, // the pixel width and height of a section
        sh : 100,
        W : 4, // the section matrix width and height
        H : 4,

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

        w : 50,
        h : 50,

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

            var SX = Math.floor(this.x / map.sw),
            SY = Math.floor(this.y / map.sh),
            EX = Math.floor((this.x + this.w) / map.sw),
            EY = Math.floor((this.y + this.h) / map.sh),
            Y = SY,
            X,
            i;

            console.log('start pos: ' + SX + ',' + SY);
            console.log('end pos: ' + EX + ',' + EY);

            Y = SY;
            while (Y < EY + 1) {

                X = SX;
                while (X < EX + 1) {

                    if (X >= -map.W / 2 && X < map.W / 2 && Y >= -map.H / 2 && Y < map.H / 2) {

                        i = (map.H / 2 + Y) * map.H + X + map.W / 2;

                        //console.log(X + ',' + Y);
                        //console.log('i: ' + i);

                        map.load.push(map.secs[i]);

                    }

                    X += 1;

                }

                Y += 1;

            }

            console.log(map.load);
            //console.log(map.secs[i]);

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
