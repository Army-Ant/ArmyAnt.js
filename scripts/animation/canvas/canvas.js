/**
 * Created by Jason Zhao Jie on 2016/12/21.
 */

libArmyAnt.animation.Canvas = libArmyAnt.animation.IMaker.inherit({
    type: libArmyAnt.animation.realization.canvas,
    canvas: null,
    context: null,

    /**
     *
     * @param elem {HTMLElement}
     * @param width {Number}
     * @param height
     * @param style
     */
    ctor: function (elem, width, height, style) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        if (style)
            this.canvas.style = style;
        this.context = this.canvas.getContext("2d");
        this.base.ctor(elem, width, height);
    },

    /**
     *
     * @param elem {HTMLElement}
     */
    addToElem: function (elem) {
        elem.appendChild(this.canvas);
        this.parentElem = elem;
    },

    removeFromElem: function () {
        if (this.parentElem) {
            var cvs = Object.copy(this.canvas);
            $(this.canvas).remove();
            this.canvas = cvs;
            this.context = this.canvas.getContext("2d");
        }
    },

    createScene: function (tag, x, y, width, height) {
        var ret = new libArmyAnt.animation.Canvas.Scene(this, x, y, width, height);
        this.scenes.put(tag, ret);
        return ret;
    },

    removeScene: function (tag) {
        this.scenes.remove(tag);
    },

    createNode: function (x, y) {
        return new libArmyAnt.animation.Canvas.Node(null, this, 0, x, y, 0, 0);
    },

    createSprite: function (avatar, x, y, width, height) {
        return new libArmyAnt.animation.Canvas.Sprite(avatar, null, null, 0, x, y, width, height);
    },

    createLabel: function (x, y) {

    },

    createLayout: function (x, y, width, height) {

    },

    createBoneUnit: null,

    refresh: function () {
        for (var index = this.scenes.getMinIndex(); index !== null; index = this.scenes.getNextIndex(index)) {
            var scenes = this.scenes.getByIndex(index);
            if (scenes)
                for (var k = 0; k < scenes.length; ++k) {
                    var scene = this.scenes.get(scenes[k]);
                    if (scene && scene.shown)
                        scene.refresh();
                }
        }
    },

    update: function (dt) {
        this.refresh();
    }
});


libArmyAnt._onInitialized();