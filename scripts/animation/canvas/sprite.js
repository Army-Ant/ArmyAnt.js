/**
 * Created by Jason Zhao Jie on 2017/1/5.
 */

/**
 * 代表精灵Sprite对象的类
 * 不能多重继承，而具体实现的Sprite必须继承自Node，因此，不要从此接口继承，仅作参考和外部调用
 *
 * This library does not support the multi-inherit, and the "Sprite" must inheriting from "Node"
 * So, do not inherit from this class, only used as a helper and interface to outer user
 */
libArmyAnt.animation.Canvas.Sprite = libArmyAnt.animation.Canvas.Node.inherit({
    avatar: null,

    ctor: function (avatar, parent, scene, zIndex, x, y, width, height) {
        libArmyAnt.animation.Canvas.Node.prototype.ctor.bind(this)(parent, scene, zIndex, x, y, width, height);
        this.avatar = avatar;
    },

    refresh: function () {
        if (this.avatar) {
            this.avatar.draw(this.scene.parent.context, this);
        }
        libArmyAnt.animation.Canvas.Node.prototype.refresh.apply(this);
    },

    update: function (dt) {

    }
});

libArmyAnt._onInitialized();