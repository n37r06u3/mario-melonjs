game.TitleScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
        //me.game.reset();
        // black background
        var blackbg = new me.ColorLayer("background", "#000", 0);
        me.game.world.addChild(blackbg);

        me.game.world.addChild(new BackgroundLayer('bg', 1));
        this.mario = me.pool.pull("mario", 0, me.game.viewport.height);
        me.game.world.addChild(this.mario, 10);

    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        ; // TODO
    }
});

var BackgroundLayer = me.ImageLayer.extend({
    init: function(image, z, speed) {
        name = image;
        width = 3392;
        height = 224;
        ratio = 1;
        // call parent constructor
        this._super(me.ImageLayer, 'init', [name, width, height, image, z, ratio]);
    },

    update: function() {
        return true;
    }
});
TextLogo = me.Renderable.extend({

    init: function(w, h) {
        me.Renderable.prototype.init.apply(this, [0, 0, w, h]);
        this.font1 = new me.Font("Arial","1.5em", "white", "middle");
        this.font2 = new me.Font("Arial", 64, "red", "middle");
    },

    draw: function(renderer) {
        var text1 = "starter";
        var text2 = "melonjs";
        var logo1_width = renderer.measureText(this.font1, text1).width;
        var xpos = (this.width - logo1_width - renderer.measureText(this.font1, "JS").width) / 2;
        var ypos = (this.height / 2) + (renderer.measureText(this.font2, "melon").height);
        renderer.drawFont(this.font1, text1, xpos, ypos);
        xpos += logo1_width;
        renderer.drawFont(this.font2, text2, xpos, ypos);
    }

});

ScrollText = me.Renderable.extend ({
    // constructor
    init : function() {
        this._super(me.Renderable, 'init', [0, 0, me.video.renderer.getWidth(), me.video.renderer.getHeight()]);
        // font for the scrolling text
        this.font = new me.BitmapFont("32x32_font", 32);

        // a tween to animate the arrow
        this.scrollertween = new me.Tween(this).to({scrollerpos: -2200 }, 10000).onComplete(this.scrollover.bind(this)).start();

        this.scroller = "A SMALL STEP BY STEP TUTORIAL FOR GAME CREATION WITH MELONJS       ";
        this.scrollerpos = 600;
    },

    // some callback for the tween objects
    scrollover : function() {
        // reset to default value
        this.scrollerpos = 640;
        this.scrollertween.to({scrollerpos: -2200 }, 10000).onComplete(this.scrollover.bind(this)).start();
    },

    update : function (dt) {
        return true;
    },

    draw : function (renderer) {
        this.font.draw(renderer, "PYTHONCAVE.COM", 100, 140);
        this.font.draw(renderer, this.scroller, this.scrollerpos, 440);
    },
    onDestroyEvent : function() {
        //just in case
        this.scrollertween.stop();
    }
})