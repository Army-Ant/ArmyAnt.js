/**
 * Created by Jason Z.J on 2015/8/21.
 * @author Jason Z.J
 * @date 2015/8/21
 */

/**
 * Copyright (c) 2015 ArmyAnt
 * 版权所有 (c) 2015 ArmyAnt
 *
 * Licensed under the BSD License, Version 2.0 (the License);
 * 本软件使用BSD协议保护, 协议版本:2.0
 * you may not use this file except in compliance with the License.
 * 使用本开源代码文件的内容, 视为同意协议
 * You can read the license content in the file "LICENSE" at the root of this project
 * 您可以在本项目的根目录找到名为"LICENSE"的文件, 来阅读协议内容
 * You may also obtain a copy of the License at
 * 您也可以在此处获得协议的副本:
 *
 *     http://opensource.org/licenses/BSD-3-Clause
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 除非法律要求或者版权所有者书面同意,本软件在本协议基础上的发布没有任何形式的条件和担保,无论明示的或默许的.
 * See the License for the specific language governing permissions and limitations under the License.
 * 请在特定限制或语言管理权限下阅读协议
 */
"use strict";

(function () {

    /**
     * Defined some global complement functions, need to do function working in node.js
     * 定义了一些对全局量的补充方法，因此在node.js下用立即执行的全局方法来生效
     */
    let running = function () {
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
                let ret = Object.create(obj);
                for (let k in obj) {
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
            for (let k in src) {
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
            let ret = [];
            for (let k in obj) {
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
            for (let k in obj) {
                if (obj[k] === value)
                    return k;
            }
            return false;
        };

        this.Array.prototype.copy = function () {
            if (this === null)
                return null;
            let ret = new Array(this.length);
            for (let i = 0; i < this.length; i++) {
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
            for (let i = 0; i < this.length; i++) {
                if (this[i] === value)
                    return i;
            }
            return false;
        };

        this.Array.prototype.removeAt = function (index) {
            if (index < 0)
                return false;
            let ret = this[index];
            for (let i = index + 1; i < this.length; i++) {
                this[i - 1] = this[i];
            }
            this.pop();
            return ret;
        };

        this.Array.prototype.remove = function (value) {
            let ret = 0;
            for (let i = 0; i < this.length; ++i) {
                if (this[i] === value) {
                    let j;
                    for (j = i + 1; j < this.length; ++j) {
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
         * This function is on stantard ECMAScript 5, but in some cases it is still needed
         * @param thisBind : *
         *                  Bind target the returned function's "this" will bind to
         * @returns {Function}
         */
        if (!this.Function.prototype.bind)
            this.Function.prototype.bind = function (thisBind) {
                let self = this;
                let selfBind = thisBind;

                return function () {
                    return self.apply(selfBind, arguments);
                };
            };
    };

    // This variable will be replaced after whole library loaded OK in node.js, and at once in web pages
    let debugMode = 0;
    if (typeof require === "undefined")
        debugMode = libArmyAnt.config["debugMode"];

    /**
     * Root properties in this library;
     */
    let output = {

        /**
         * Print debug messages with setting mode
         * @param mode : string
         *              Set the mode, one of "log" "warn" "assert" "error"
         * @param array : Array
         * @private
         */

        _print: function (mode, array) {
            let modeNum = 0;
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
            let ret = "ArmyAnt : ";
            for (let i = 0; i < array.length; i++) {
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
            let ret = [];
            let curr = "";
            for (let i = 0; i < string.length; ++i) {
                let index = i + 3 < string.length ? separators.contains(string.slice(i, i + 4)) : false;
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

        // In node.js, this js file used to replace the main library file, so redefined some root properties here
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