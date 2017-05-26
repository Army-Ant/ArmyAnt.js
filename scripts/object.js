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

    var libArmyAnt;
    if (typeof require != "undefined")
        libArmyAnt = require("./global.js");
    else
        libArmyAnt = window.libArmyAnt;

    var newObject = function () {
    };
    newObject.prototype.ctor = function () {
    };
    newObject.prototype.base = {base: null};
    newObject.prototype.__objectProperties__ = {};

    /**
     * The function to inherit from self type
     * 类的继承函数, 使用此函数来构造一个新的子类, 函数参数代表子类的初始化对象, 子类初始化对象覆盖父类初始化对象, 形成新的类
     * @param extend : Object
     *      new params for the new class
     * @returns {class}
     */
    newObject.inherit = function (extend) {
        var parent = this;
        var ret = function () {
            var newBase = {};
            for (var k in this.base) {
                if (this.base.hasOwnProperty(k) && k != "base" && k != "__objectProperties__")
                    newBase[k] = this.base[k].bind(this);
            }
            newBase["base"] = this.base.base;
            newBase["__objectProperties__"] = this.base["__objectProperties__"];
            this.base = newBase;
            var self = this;
            while (typeof self["__objectProperties__"] != "undefined" && !self["__objectProperties__"]) {
                for (var k in self["__objectProperties__"]) {
                    if (typeof self[k] == "object" && typeof this[k] == "undefined") {
                        var oldObj = self[k];
                        this[k] == Object.copy(oldObj);
                    }
                }
                self = this.base;
            }
            this.ctor.apply(this, arguments);
        };
        for (var k in parent.prototype) {
            if (parent.prototype.hasOwnProperty(k))
                ret.prototype[k] = parent.prototype[k];
        }
        var parentBase = parent.prototype.base;
        ret.prototype.base = {base: parentBase};
        for (var k in ret.prototype)
            if (ret.prototype.hasOwnProperty(k))
                if (typeof ret.prototype[k] == "function") {
                    var curr = ret.prototype[k];
                    var baseFunc = function () {
                        var oldBase = this.base;
                        this.base = oldBase.base;
                        curr.apply(this, arguments);
                        this.base = oldBase;
                    };
                    ret.prototype.base[k] = baseFunc;
                } else if (k == "__objectProperties__") {
                    ret.prototype.base[k] = ret.prototype[k];
                }
        var new__objectProperties__ = {};
        for (var k in extend) {
            if (extend.hasOwnProperty(k))
                if (k == "base" || k == "__objectProperties__")
                    libArmyAnt.warn("There is a property named '" + k + "' !");
                else if (typeof extend[k] == "object")
                    new__objectProperties__[k] == extend[k];
                else
                    ret.prototype[k] = extend[k];
        }
        ret.prototype["__objectProperties__"] = new__objectProperties__;
        //ret.prototype.constructor = ret;
        ret.inherit = newObject.inherit.bind(ret);
        ret.extendSingleton = newObject.extendSingleton;
        return ret;
    }

    newObject.extendSingleton = function (extend) {
        extend.base = new this();
        for (var k in extend.base) {
            if (extend.base.hasOwnProperty(k)) {
                if (!extend.hasOwnProperty(k))
                    extend[k] = extend.base[k];
                if (typeof extend.base[k] != "function")
                    delete extend.base[k];
            }

        }
    }

    if (typeof require == "undefined") {
        libArmyAnt.Object = newObject;
        libArmyAnt._onInitialized();
    } else {
        module.exports = newObject;
    }

})();