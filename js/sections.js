var S = (function () {

    // the view port
    var vp = {

        w : 320,
        h : 240,

        // set up
        set : function () {

            this.x = -this.w / 2;
            this.y = -this.h / 2;

        }

    },

    // the section map
    map = {

        sw : 640, // the pixel width and height of a section
        sh : 480,
        W : 4, // the section matrix width and height
        H : 4,

        secs : [], // the sections array

        // setup sections
        set : function () {

            var X,
            Y = 0,
            x,
            y;

            this.secs = [];
            while (Y < this.H) {

                X = 0;
                while (X < this.W) {

                    x = this.W / 2 * -this.sw + this.sw * X;
                    y = this.W / 2 * -this.sw + this.sw * X;

                    // push new section object
                    this.secs.push({

                        x : x,
                        y : y

                    });

                    X += 1;

                }

                Y += 1;
            }

        }

    };

    api = {

        // ref to map
        map : map

    };

    vp.set();
    map.set();

    return api;

}
    ());
