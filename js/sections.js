var S = (function () {

    // the section map
    var map = {

        sw : 100, // the pixel width and height of a section
        sh : 100,
        W : 2, // the section matrix width and height
        H : 2,

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

        w : 320,
        h : 240,

        // set up
        set : function () {

            this.x = -this.w / 2;
            this.y = -this.h / 2;

        },

        // load sections based on current view port position
        ls : function () {

            this.load = [];

        }

    },

    // the public api
    api = {

        // ref to map
        map : map

    };

    vp.set();
    map.set();

    return api;

}
    ());
