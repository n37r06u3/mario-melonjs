/**
 * Created by n37r06u3 on 2015/3/20.
 */

/* Game namespace */
var game = {
    "onload" : function () {
        if (!me.video.init("screen",  me.video.CANVAS, 280, 224, true, 'auto')) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }
        // add "#debug" to the URL to enable the debug Panel
        //http://localhost:63342/melonjs-starter/index.html#debug
        //http://localhost/melonjs-starter/#debug
        if (document.location.hash === "#debug") {
            window.onReady(function () {
                me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
            });
        }

        me.audio.init("mp3,ogg");
        me.loader.onload = this.loaded.bind(this);
        me.loader.preload(game.resources);
        me.state.change(me.state.LOADING);
    },
    "loaded" : function () {
        me.state.set(me.state.TITLE, new game.TitleScreen());

        me.input.bindKey(me.input.KEY.A, "goleft");//
        me.input.bindKey(me.input.KEY.D, "goright");


        me.pool.register("mario", game.Mario);
        me.state.change(me.state.TITLE);
    }
};
