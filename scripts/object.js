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
    this.libArmyAnt.Object.inherit = function (extend) {
        var ret = function () {
            if (this.ctor)
                this.ctor.apply(this, Array.prototype.slice.call(arguments));
        };

        //ret.prototype = Object.create(this);
        ret.prototype={};
        for (var k1 in this.prototype) {
            ret.prototype[k1] = this.prototype[k1];
        }
        for (var k2 in extend) {
            ret.prototype[k2] = extend[k2];
        }
        ret.prototype.base = {};
        for(var k3 in this.prototype){
            if(typeof this.prototype[k3] === "function"){
                ret.prototype.base[k3] = this.prototype[k3];
            }else if(k3=="base"){
                ret.prototype.base.base=this.prototype.base;
            }
        }
        ret.inherit = libArmyAnt.Object.inherit.bind(ret);
        return ret;
    };

    this.libArmyAnt._onInitialized();
})();