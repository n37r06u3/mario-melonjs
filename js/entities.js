/**
 * Created by n37r06u3 on 2015/3/21.
 */


game.Mario = me.Entity.extend({
    init: function(x, y, settings) {
        var settings = {};
        settings.image = me.loader.getImage('mario');
        settings.width = 0;
        settings.height = 0;
        settings.spritewidth = 16;
        settings.spriteheight= 16;
        settings.margin=32;
        settings.spacing=0;
        //settings.shapes[0] = new me.Rect(0, 0, settings.width, settings.height);
        // call the constructor
        this._super(me.Entity, 'init', [x, y , settings]);

        // disable gravity
        this.body.gravity = 0;

        // walking & jumping speed
        this.body.setVelocity(2.5, 2.5);
        this.body.setFriction(0.4,0.4);

        this.alwaysUpdate = true;

        // set the display around our position
        me.game.viewport.follow(this, me.game.viewport.AXIS.BOTH);
        this.renderable.addAnimation("walking", [0, 1, 2]);
        this.renderable.addAnimation("standing", [9]);
        this.renderable.setCurrentAnimation("standing");
        // enable keyboard
        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.X,     "jump", true);
        me.input.bindKey(me.input.KEY.UP,    "jump", true);
        me.input.bindKey(me.input.KEY.DOWN,  "down");
        me.input.bindKey(me.input.KEY.A,     "left");
        me.input.bindKey(me.input.KEY.D,     "right");
        me.input.bindKey(me.input.KEY.W,     "jump", true);
        me.input.bindKey(me.input.KEY.S,     "down");
    },
    update: function(dt) {
        this.body.vel.x = 0;
        this._super(me.Entity, 'update', [dt]);
        if (me.input.isKeyPressed('right')) {
            this.body.vel.x = 2;
        }
        if (this.body.vel.x!=0 || this.body.vel.y!=0) {

            // apply physics to the body (this moves the entity)
            this.body.update(dt);

            return true ;
            //return this._super(me.Entity, 'update', [dt]);
        }
    }
});