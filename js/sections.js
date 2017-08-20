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

                    //x = this.W / 2 * this.sw + this.sw * X;
                    //y = this.H / 2 * this.sh + this.sh * Y;

                    x = X * this.sw;
                    y = Y * this.sh;

                    // push new section object
                    this.secs.push({

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

        },

        // load sections based on current view port position
        ls : function () {

            this.load = [];

            var SX = Math.floor(this.x / map.sw),
            SY = Math.floor(this.y / map.sh),
            EX = Math.floor((this.x + this.w) / map.sw),
            EY = Math.floor((this.y + this.h) / map.sh);

            console.log('start pos: ' + SX + ',' + SY);
            console.log('end pos: ' + EX + ',' + EY);

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
