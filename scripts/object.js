/**
 * Created by Jason Z.J on 2015/8/21.
 * @author Jason Z.J
 * @date 2015/8/21
 */

/**
 * The base class of most library classes
 * 一个由本库定义的基本类, 实现了可继承, 可覆写, 可引用父类成员, 及构造函数等功能的类
 * @constructor do nothing
 */
(function() {
    /**
     * The function to inherit from self type
     * 类的继承函数, 使用此函数来构造一个新的子类, 函数参数代表子类的初始化对象, 子类初始化对象覆盖父类初始化对象, 形成新的类
     * @param extend : Object
     *      new params for the new class
     * @returns {class}
     */
    this.libArmyAnt.__inherit = function (extend) {
        var ret = function () {
            for (var kk in this.base) {
                if (kk != "base")
                    this.base[kk] = function (name) {
                        var currFunc = this.base[name];
                        return function () {
                            var base = this.base;
                            if (this.base.base)
                                this.base = this.base.base;
                            else
                                this.base = null;
                            var ret = currFunc.apply(this, Array.prototype.slice.call(arguments));
                            this.base = base;
                            return ret;
                        }.bind(this);
                    }.bind(this)(kk);
            }
            this.__ctor__.apply(this);
            delete this.__ctor__;
            this.ctor.apply(this, arguments);
        };
        for (var k1 in this.prototype) {
            if (typeof this.prototype[k1] == "function" && k1 != "__ctor__") {
                ret.prototype[k1] = this.prototype[k1];
            }
        }
        for (var k2 in extend) {
            if (typeof extend[k2] == "function" && k2 != "__ctor__") {
                ret.prototype[k2] = extend[k2];
            }
        }
        ret.prototype.__ctor__ = function() {
            for (var k2 in extend) {
                if(typeof this[k2] != "undefined")
                    continue;
                if (typeof ret.prototype[k2] == "undefined" && typeof extend[k2] != "undefined" ) {
                    switch(typeof extend[k2]){
                        case "object":
                            this[k2] = Object.copy(extend[k2]);
                            break;
                        case "array":
                            this[k2] = extend[k2].copy();
                        case "function":
                        default:
                            this[k2] = extend[k2];
                            break;
                    }
                }else{
                    this[k2] = ret.prototype[k2]
                }
            }
            var base__ctor__ = this.base;
            while(base__ctor__ && base__ctor__.__ctor__){
                base__ctor__.__ctor__.apply(this);
                base__ctor__ = base__ctor__.base;
            }
        }
        ret.prototype.base = {};
        for (var k3 in this.prototype) {
            if (typeof this.prototype[k3] == "function") {
                ret.prototype.base[k3] = this.prototype[k3];
            } else if (k3 === "base") {
                ret.prototype.base.base = this.prototype.base;
            }
        }
        ret.inherit = libArmyAnt.__inherit.bind(ret);
        return ret;
    };

    this.libArmyAnt.Object = function () {
        this.ctor.apply(this, arguments);
    };
    this.libArmyAnt.Object.prototype.ctor = function(){};
    this.libArmyAnt.Object.inherit = this.libArmyAnt.__inherit.bind(this.libArmyAnt.Object);

    this.libArmyAnt._onInitialized();
})();