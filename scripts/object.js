/**
 * Created by Jason Z.J on 2015/8/21.
 * @author Jason Z.J
 * @date 2015/8/21
 */

/**
 * The base class of most library classes
 * 一个由本库定义的基本类, 实现了可继承, 可覆写, 可引用父类成员, 及构造方法等功能的类
 * @constructor do nothing
 */

(function() {

    var libArmyAnt;
    if (typeof require !== "undefined")
        libArmyAnt = require("./global.js");
    else
        libArmyAnt = window.libArmyAnt;

    var newObject = function () {
        return this;
    };
    newObject.prototype.ctor = function () {
    };
    newObject.prototype.__objectProperties__ = {};

    /**
     * The function to inherit from self type
     * 类的继承方法, 使用此方法来构造一个新的子类, 方法参数代表子类的初始化对象, 子类初始化对象覆盖父类初始化对象, 形成新的类
     * @param extend : Object
     *      new params for the new class
     * @returns {class}
     */
    newObject.inherit = function (extend) {
        var parent = this;
        var ret = function () {
            if (typeof this["__objectProperties__"] !== "undefined") {
                for (var k in this["__objectProperties__"]) {
                    if (!this["__objectProperties__"].hasOwnProperty(k))
                        continue;
                    var oldObj = this["__objectProperties__"][k];
                    if (typeof this["__objectProperties__"][k] === "object") {
                        Object.copyTo(oldObj, this, k);
                    } else {
                        this[k] = oldObj;
                    }
                }
            }
            this.ctor.apply(this, arguments);
            return this;
        };
        for (var k in parent.prototype) {
            if (parent.prototype.hasOwnProperty(k))
                if (k === "__objectProperties__")
                    Object.copyTo(parent.prototype[k], ret.prototype, k);
                else
                    ret.prototype[k] = parent.prototype[k];
        }
        for (var k in extend) {
            if (extend.hasOwnProperty(k))
                if (k === "__objectProperties__")
                    libArmyAnt.warn("There is a property named '" + k + "' !");
                else if (typeof extend[k] === "object") {
                    Object.copyTo(extend[k], ret.prototype["__objectProperties__"], k);
                }
                else if (typeof extend[k] === "function") {
                    ret.prototype[k] = extend[k];
                    if (typeof ret.prototype["__objectProperties__"][k] !== "undefined")
                        delete ret.prototype["__objectProperties__"][k];
                }
                else
                    ret.prototype["__objectProperties__"][k] = extend[k];
        }
        ret.inherit = newObject.inherit.bind(ret);
        ret.extendSingleton = newObject.extendSingleton;
        return ret;
    };

    newObject.extendSingleton = function (extend) {
        var newArgs = Object.copy(arguments);
        for (var i = 0; i < newArgs.length - 1; ++i) {
            newArgs[i] = newArgs[i + 1];
        }
        newArgs[newArgs.length - 1] = undefined;
        var ret = new this(newArgs);
        for (var k in extend) {
            if (extend.hasOwnProperty(k))
                if (typeof extend[k] === "object") {
                    Object.copyTo(extend[k], ret, k);
                }
                else
                    ret[k] = extend[k];
        }
        return ret;
    };

    if (typeof require === "undefined") {
        libArmyAnt.Object = newObject;
        libArmyAnt._onInitialized();
    } else {
        module.exports = newObject;
    }

})();