/**
 * Created by Jason Zhao Jie on 2016/12/21.
 */


libArmyAnt.animation.Canvas.Scene = libArmyAnt.animation.IScene.inherit({

    ctor: function (parent, x, y, width, height, background) {
        this.base.ctor(parent, x, y, width, height, background);
    },

    addNode: function (tag, node, x, y) {
        if (typeof x == "number")
            node.x = x;
        if (typeof y == "number")
            node.y = y;
        node.parent = this;
        node.scene = this;
        this.children.put(tag, node);
        return true;
    },

    removeNode: function (tag) {
        if (this.children.hasOwnProperty(tag))
            this.children[tag].removeSelf();
    },

    createNode: function (tag, x, y) {
        return this.addNode(tag, this.parent.createNode(x, y));
    },

    createSprite: function (tag, avatar, x, y, width, height) {
        return this.addNode(tag, this.parent.createSprite(avatar, x, y, width, height));
    },

    removeAllNodes: function () {
        this.children.clear();
        return true;
    },

    removeSelf: function () {

        this.base.removeSelf();
    },

    refresh: function () {
        if (this.background)
            this.background.draw(this.parent.context, this);
        for (var index = this.children.getMinIndex(); index !== null; index = this.children.getNextIndex(index)) {
            var children = this.children.getByIndex(index);
            if (children)
                for (var k = 0; k < children.length; ++k) {
                    var node = this.children.get(children[k]);
                    if (node && node.shown)
                        node.refresh();
                }
        }
    },

    update: function (dt) {

    }
});


libArmyAnt._onInitialized();