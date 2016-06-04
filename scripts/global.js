/**
 * Created by Jason Z.J on 2015/8/21.
 * @author Jason Z.J
 * @date 2015/8/21
 */

(function() {
    if (typeof this.Object.copy == "undefined" || !this.Object.copy)
        this.Object.copy = function (obj) {
            if (obj === null)
                return null;
            var ret = {};
            for (var key in obj) {
                switch (typeof obj[key]) {
                    case "undefined":
                        break;
                    case "object":
                    case "array":
                        ret[key] = obj[key].copy();
                        break;
                    default:
                        ret[key] = obj[key];
                }
            }
            return ret;
        };

    this.Array.prototype.copy = function () {
        if (this == null)
            return null;
        var ret = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
            switch (typeof this[i]) {
                case "undefined":
                    ret[i] = null;
                    break;
                case "object":
                    ret[i] = Object.copy(this[i]);
                    break;
                case "array":
                    ret[i] = this[i].copy();
                    break;
                default:
                    ret[i] = this[i];
            }
        }
        return ret;
    };
    
    this.Array.prototype.contains=function(value){
        for(var i=0;i<this.length;i++) {
            if (this[i] === value)
                return i + 1;
        }
        return false;
    };

    this.Array.prototype.removeAt=function(index){
        if(index<0)
            return false;
        for(var i=index+1;i<this.length;i++){
            this[i-1]=this[i];
        }
        this.pop();
        return true;
    };

    /**
     * Return the function itself whose "this" is bind to the target param
     * @param thisBind : *
     *                  Bind target the returned function's "this" will bind to
     * @returns {Function}
     */
    this.Function.prototype.bind = function (thisBind) {
        var self = this;
        var selfBind = thisBind;

        return function () {
            return self.apply(selfBind, Array.prototype.slice.call(arguments));
        };
    };

    /**
     * Print debug messages with setting mode
     * @param mode : string
     *              Set the mode, one of "log" "warn" "assert" "error"
     * @param array : Array
     * @private
     */
    this.libArmyAnt._Print = function (mode, array) {
        var modeNum = 0;
        switch (libArmyAnt.config["debugMode"]) {
            case "log":
                modeNum = 1;
                break;
            case "warn":
                modeNum = 2;
                break;
            case "assert":
                modeNum = 3;
                break;
            case "error":
                modeNum = 4;
                break;
            default:
                modeNum = 0;
                return;
        }
        var ret = "ArmyAnt : ";
        for (var i = 0; i < array.length; i++) {
            ret += " " + array[i];
        }
        switch (mode) {
            case "log":
                if (modeNum > 1)
                    return;
                console.log(ret);
                break;
            case "warn":
                if (modeNum > 2)
                    return;
                console.warn(ret);
                break;
            case "assert":
                if (modeNum > 3)
                    return;
                console.assert(ret);
                break;
            case "error":
                if (modeNum > 4)
                    return;
                console.error(ret);
                break;
            default:
                console.info(ret);
                break;
        }
    };

    this.libArmyAnt.log = function () {
        libArmyAnt._Print("log", Array.prototype.slice.call(arguments));
    };
    this.libArmyAnt.warn = function () {
        libArmyAnt._Print("warn", Array.prototype.slice.call(arguments));
    };
    this.libArmyAnt.assert = function () {
        libArmyAnt._Print("assert", Array.prototype.slice.call(arguments));
    };
    this.libArmyAnt.error = function () {
        libArmyAnt._Print("error", Array.prototype.slice.call(arguments));
    };

    this.libArmyAnt._onInited(true);

})();