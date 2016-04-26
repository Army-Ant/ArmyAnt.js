/**
 * Created by Jason Z.J on 2015/8/21.
 * @author Jason Z.J
 * @date 2015/8/21
 */

Object.prototype.copy = function() {
    if (this == null)
        return null;
    var ret = new Object();
    for (var key in this) {
        switch (typeof this[key]) {
            case "undefined":
                break;
            case "object":
            case "array":
                ret[key] = this[key].copy();
                break;
            default:
                ret[key] = this[key];
        }
    }
    return ret;
};

Array.prototype.copy = function() {
    if (this == null)
        return null;
    var ret = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
        switch (typeof this[i]) {
            case "undefined":
                ret[i] = null;
                break;
            case "object":
            case "array":
                ret[i] = this[i].copy();
                break;
            default:
                ret[i] = this[i];
        }
    }
    return ret;
};

/**
 * Return the function itself whose "this" is bind to the target param
 * @param thisbind : *
 *                  Bind target the returned function's "this" will bind to
 * @returns {Function}
 */
Function.prototype.bind = function(thisbind) {
    var self = this;
    var selfbind = thisbind;
    var arr = arguments;

    return function () {
        return self.apply(selfbind, Array.prototype.slice.call(arguments));
    };
};

/**
 * Print debug messages with setting mode
 * @param mode : string
 *              Set the mode, one of "log" "warn" "assert" "error"
 * @param array : Array
 * @private
 */
libArmyAnt._Print = function(mode,array) {
    var modenum = 0;
    switch (libArmyAnt.config.debugMode) {
        case "log":
            modenum = 1;
            break;
        case "warn":
            modenum = 2;
            break;
        case "assert":
            modenum = 3;
            break;
        case "error":
            modenum = 4;
            break;
        default:
            modenum = 0;
            return;
    }
    var ret = "ArmyAnt : ";
    for (var i = 0; i < array.length; i++) {
        ret += " " + array[i];
    }
    switch (mode) {
        case "log":
            if (modenum > 1)
                return;
            console.log(ret);
            break;
        case "warn":
            if (modenum > 2)
                return;
            console.warn(ret);
            break;
        case "assert":
            if (modenum > 3)
                return;
            console.assert(ret);
            break;
        case "error":
            if (modenum > 4)
                return;
            console.error(ret);
            break;
        default:
            console.info(ret);
            break;
    }
};

libArmyAnt.log = function() {
    libArmyAnt._Print("log", Array.prototype.slice.call(arguments));
};
libArmyAnt.warn = function() {
    libArmyAnt._Print("warn", Array.prototype.slice.call(arguments));
};
libArmyAnt.assert = function() {
    libArmyAnt._Print("assert", Array.prototype.slice.call(arguments));
};
libArmyAnt.error = function() {
    libArmyAnt._Print("error", Array.prototype.slice.call(arguments));
};
