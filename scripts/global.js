/**
 * Created by Jason Z.J on 2015/8/21.
 * @author Jason Z.J
 * @date 2015/8/21
 */

(function () {

    var running = function () {
        if (typeof this.Object.copy === "undefined" || !this.Object.copy)
            /**
             * clone the object with its every child member. Each array and object in its children will also clone recursively
             * 创建指定Object对象的一个副本，且其所有Object和Array类型的子成员都会被递归式克隆
             * @param obj : Object
             *      The Object variable which will be copied
             *      要拷贝的源对象
             * @returns {Object}
             */
            this.Object.copy = function (obj) {
                if (!obj)
                    return obj;
                var ret = Object.create(obj);
                for (var k in obj) {
                    if (obj.hasOwnProperty(k))
                        if (typeof obj[k] === "object")
                            Object.copyTo(obj[k], ret, k);
                        else
                            ret[k] = obj[k];
                }
                return ret;
            };

        this.Object.copyTo = function (src, dst, dstKey) {
            if (!src || !dst) {
                dst[dstKey] = src;
                return true;
            }
            dst[dstKey] = Object.create(src);
            for (var k in src) {
                if (src.hasOwnProperty(k))
                    if (typeof src[k] === "object")
                        Object.copyTo(src[k], dst[dstKey], k);
                    else
                        dst[dstKey][k] = src[k];
            }
            return true;
        };

        /**
         * Get the set of all keys in the object
         * 获取对象的所有子成员键的集合
         * @param obj : Object
         * @returns {Array}
         */
        this.Object.keySet = function (obj) {
            if (obj === null)
                return null;
            var ret = [];
            for (var k in obj) {
                ret.push(k);
            }
            return ret;
        };

        /**
         * Check if the value is in the object
         * 检测Object中是否包含指定的值（仅检测值，不检测键）
         * @param obj
         * @param value
         * @returns {*}
         */
        this.Object.contains = function (obj, value) {
            if (obj === null)
                return false;
            for (var k in obj) {
                if (obj[k] === value)
                    return k;
            }
            return false;
        };

        this.Array.prototype.copy = function () {
            if (this === null)
                return null;
            var ret = new Array(this.length);
            for (var i = 0; i < this.length; i++) {
                switch (typeof this[i]) {
                    case "undefined":
                        break;
                    case "object":
                        Object.copyTo(this[i], ret, i);
                        break;
                    default:
                        ret[i] = this[i];
                }
            }
            return ret;
        };

        this.Array.prototype.contains = function (value) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] === value)
                    return i;
            }
            return false;
        };

        this.Array.prototype.removeAt = function (index) {
            if (index < 0)
                return false;
            var ret = this[index];
            for (var i = index + 1; i < this.length; i++) {
                this[i - 1] = this[i];
            }
            this.pop();
            return ret;
        };

        this.Array.prototype.remove = function (value) {
            var ret = 0;
            for (var i = 0; i < this.length; ++i) {
                if (this[i] === value) {
                    for (var j = i + 1; j < this.length; ++j) {
                        this[j - 1] = this[j];
                    }
                    this.pop();
                    ret++;
                }
            }
            return ret;
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
                return self.apply(selfBind, arguments);
            };
        };
    };

    var debugMode = 0;
    if (typeof require === "undefined")
        debugMode = libArmyAnt.config["debugMode"];
    var output = {

        /**
         * Print debug messages with setting mode
         * @param mode : string
         *              Set the mode, one of "log" "warn" "assert" "error"
         * @param array : Array
         * @private
         */

        _print: function (mode, array) {
            var modeNum = 0;
            switch (debugMode) {
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
        },

        log: function () {
            output._print("log", Array.prototype.slice.call(arguments));
        },
        warn: function () {
            output._print("warn", Array.prototype.slice.call(arguments));
        },
        assert: function () {
            output._print("assert", Array.prototype.slice.call(arguments));
        },
        error: function () {
            output._print("error", Array.prototype.slice.call(arguments));
        },

        parseToWords: function (string, separators) {
            if (typeof separators === "undefined" || !separators || separators === "PRO") {
                separators = ["===", "!==", "::", "++", "--", "+=", "-=", "*=", "/=", "%=", "<=", ">=", "==", "!=", "||", "&&",
                    ",", ' ', '\t', '\r', '\n', ':', '.', '+', '-', '*', '/', '%', '&', '!', '|', '?', '>', '<', ';']
            } else if (separators === "TIME") {
                separators = [" ", "\r", "\n", "\t", ":", "-", ","];
            } else if (separators === "NAT") {
                separators = [" ", "\t", ":", ",", ".", ";", "\n", "\r", "?", "!", '"', "'", "<", ">", "(", ")", "[", "]"];
            }
            var ret = [];
            var curr = "";
            for (var i = 0; i < string.length; ++i) {
                var index = i + 3 < string.length ? separators.contains(string.slice(i, i + 4)) : false;
                if (index === false)
                    index = i + 2 < string.length ? separators.contains(string.slice(i, i + 3)) : false;
                if (index === false)
                    index = i + 1 < string.length ? separators.contains(string.slice(i, i + 2)) : false;
                if (index === false)
                    index = i < string.length ? separators.contains(string[i]) : false;
                if (index === false)
                    curr += string[i];
                else {
                    if (curr !== "")
                        ret.push(curr);
                    ret.push(separators[index]);
                    curr = "";
                    i += separators[index].length - 1;
                }
            }
            if (curr !== "") {
                ret.push(curr);
            }
            return ret;
        }
    };

    if (typeof require === "undefined") {
        libArmyAnt.log = output.log;
        libArmyAnt.warn = output.warn;
        libArmyAnt.assert = output.assert;
        libArmyAnt.error = output.error;
        libArmyAnt.parseToWords = output.parseToWords;
        running.apply(window, null);
        libArmyAnt._onInitialized(true);
    } else {
        running.apply(global, null);

        output.nodeJs = {
            http: require("http"),
            url: require("url"),
            fs: require("fs"),
            child_process: require("child_process"),
            querystring: require("querystring")
        };
        output.config = {
            rootDir: "./",

            setDebugMode: function (dMode) {
                debugMode = dMode;
            }
        };

        module.exports = output;
    }
})();