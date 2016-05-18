/**
 * Created by Jason Z.J on 2015/8/21.
 * @author Jason Z.J
 * @date 2015/8/21
 */

/**
 * The base class of most library classes
 * @constructor do nothing
 */
libArmyAnt.Object = function() {
    this.ctor = function () {
    };
    this.ctor.apply(this, arguments);
};

/**
 * The function to inherit from self type
 * @param extend : Object
 *      new params for the new class
 * @returns {class}
 */
libArmyAnt.Object.Inherit = function(extend) {
    var ret = function () {
        if (this.ctor)
            this.ctor.apply(this, Array.prototype.slice.call(arguments));
    };
    ret.prototype = Object.create(this);
    for (var key in extend) {
        ret.prototype[key] = extend[key];
    }
    ret.prototype.base = {};
    if(typeof this.prototype.ctor != "function")
        ret.prototype.base["ctor"] = function(){};
    for (var key in this.prototype) {
        if (typeof this.prototype[key] == "function") {
            ret.prototype.base[key] = this.prototype[key];
        }
    }
    ret.Inherit = libArmyAnt.Object.Inherit.bind(ret);
    return ret;
};

libArmyAnt._onInited();