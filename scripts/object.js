/**
 * Created by Jason Z.J on 2015/8/21.
 * @author Jason Z.J
 * @date 2015/8/21
 */

/**
 * The base class of most library classes
 * @constructor do nothing
 */
(function() {
    this.libArmyAnt.Object = function () {
        this.ctor.apply(this, arguments);
    };
    this.libArmyAnt.Object.prototype.ctor=function(){};

    /**
     * The function to inherit from self type
     * @param extend : Object
     *      new params for the new class
     * @returns {class}
     */
    this.libArmyAnt.Object.Inherit = function (extend) {
        var ret = function () {
            if (this.ctor)
                this.ctor.apply(this, Array.prototype.slice.call(arguments));
        };

        //ret.prototype = Object.create(this);
        ret.prototype={};
        for (var key in this.prototype) {
            ret.prototype[key] = this.prototype[key];
        }
        for (var key in extend) {
            ret.prototype[key] = extend[key];
        }
        ret.prototype.base = {};
        for(var key in this.prototype){
            if(typeof this.prototype[key] === "function"){
                ret.prototype.base[key] = this.prototype[key];
            }else if(key=="base"){
                ret.prototype.base.base=this.prototype.base;
            }
        }
        ret.Inherit = libArmyAnt.Object.Inherit.bind(ret);
        return ret;
    };

    this.libArmyAnt._onInited();
})();