/**
 * Created by Jason Zhao Jie on 2016/12/21.
 */

libArmyAnt.animation.Canvas.Node = libArmyAnt.animation.INode.inherit({

    ctor: function (parent, scene, zIndex, x, y, width, height) {
        libArmyAnt.animation.INode.prototype.ctor.bind(this)(parent, scene, zIndex, x, y, width, height);
    },

    addChild: function (tag, node, x, y) {
        if (typeof x == "number")
            node.x = x;
        if (typeof y == "number")
            node.y = y;
        node.parent = this;
        node.scene = this.scene;
        this.children.put(tag, node);
        return true;
    },

    removeChild: function (tag) {
        if (this.children.hasOwnProperty(tag))
            this.children[tag].removeSelf();
    },

    createNode: function (tag, x, y) {
        return this.addChild(tag, this.scene.parent.createNode(x, y));
    },

    createSprite: function (tag, avatar, x, y, width, height) {
        return this.addChild(tag, this.scene.parent.createSprite(tag, avatar, x, y, width, height));
    },

    removeAllChildren: function () {
        this.children.clear();
        return true;
    },

    setParent: function (parentNode) {
        var tg = this.getThisTag();
        this.parent = parentNode;
        this.parent.children.put(tg, parentNode);
        return true;
    },

    refresh: function () {
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