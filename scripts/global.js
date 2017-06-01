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


/**
 * The base variable node of all this libArmyAnt content
 * 本库的基本命名空间，根节点
 */
const libArmyAnt = {

    /**
     * The version of library
     * 本库的版本号
     */
    version: {
        major: 1,
        minor: 0,
        publish: 0,
        build: 0,
        toNumeric: function () {
            return this.major * 256 * 256 * 256 + this.minor * 256 * 256 + this.publish * 256 + this.build;
        },
        toString: function () {
            return this.major + "." + this.minor + "." + this.publish + "." + this.build + ".";
        }
    },

    /**
     * The information of this library, loaded from "libInfo.json"
     * 本库的一些信息，载入自数据文件“libInfo.json”
     */
    info: {},

    /**
     * The configurations of this library, some of it is loaded from "libConfig.json"
     * 本库的一些配置，除下述节点外，还包括从数据文件“libConfig.json”中载入的配置项
     */
    config: {
        /**
         * Please change these string value when you use this library in your project
         * 本库的一些路径参数，记录着你的项目的工作目录。只有设置正确，才能成功载入本库。
         * 很多情况下，你不会（也不应该）把本库直接放置在工作目录的根目录，因此有必要对这些项进行配置
         * rootDir代表从你服务器脚本所在目录，到你的网站的前端根目录的相对路径
         * nodeRootDir代表从你服务器脚本所在目录，到本文件所在目录的相对路径
         * dataRootDir代表从你的网站的前端根目录，到本文件所在目录的相对路径
         */
        rootDir: "./",
        nodeRootDir: "./",
        dataRootDir: "./",
    },

    /**
     * If in the node.js environment, this object contains every modules from node.js system packages.
     * If out of the node.js, this variable is null.
     * 如果在node.js环境中使用本库，此节点将会自动获取node.js的几个常用库，和本库所依赖的node.js的库
     * 如果不在node.js环境下，此节点为null。可据此判断是否具有node.js环境
     */
    nodeJs: (typeof require === "undefined" || !require) ? null : {
        http: require("http"),
        url: require("url"),
        fs: require("fs"),
        child_process: require("child_process"),
        querystring: require("querystring"),
    },

    /**
     * Print debug messages with setting mode
     * @param mode : string
     *              Set the mode, one of "log" "warn" "assert" "error"
     * @param array : Array
     * @private
     */

    _print (mode, array) {
        let modeNum = 0;
        switch (this.config.debugMode) {
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

    log (...args) {
        this._print("log", args);
    },
    warn (...args) {
        this._print("warn", args);
    },
    assert (...args) {
        this._print("assert", args);
    },
    error (...args) {
        this._print("error", args);
    },

    parseToWords (string, separators) {
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
    },

    /**
     * Dynamically insert an HTML element
     * 动态嵌入一个HTML元素。
     * @param typename : string
     *      The type of the element you will add
     *      要添加的HTML元素的类型名
     * @param parentElem : HTMLElement
     *      The parent element node you will add to
     *      要添加到哪个HTML元素之下。可以是head或者body
     * @param properties : Object
     *      The properties of this element you will add
     *      要添加的HTML元素的属性集
     * @returns {HTMLElement}
     *      The element you add
     *      返回你添加成功的元素引用。如果元素创建失败，返回null
     *      If you worked at node.js application, this function shall not work, and always returned null.
     *      如果是在node.js环境中，则此方法将不起作用，并且总是返回null
     */
    insertElement (typename, parentElem, properties) {
        if (this.nodeJs)
            return null;
        const insertingElem = document.createElement(typename);
        if (properties) {
            for (const key in properties) {
                insertingElem[key] = properties[key];
            }
        }
        parentElem.appendChild(insertingElem);
        return insertingElem;
    },

    /**
     * Dynamically insert javascript file
     * 动态添加/载入一个javascript脚本
     * @param url : string
     *      The javascript file path
     *      要添加的javascript文件的路径
     * @return {HTMLElement / Object}
     *      HTMLElement : The script element reference in document
     *      当在HTML环境下时，该方法返回添加成功的script元素引用。如果创建失败，返回null
     *      Object : the module root of the node.js require returned
     *      当在node.js环境下时，返回载入成功的javascript模块引用。载入失败时，返回null
     */
    importScript (url) {
        console.log("ArmyAnt : loading script " + url);
        if (this.nodeJs)
            return require(url);
        return libArmyAnt.insertElement("script", document.head, {src: url, type: "text/javascript"});
    },

    /**
     * Dynamically insert css file
     * 动态加载一个css布局style文件
     * @param url : string
     *      The style file path
     *      要添加的style文件路径
     * @return {HTMLElement}
     *      The style element reference in document
     *      返回添加成功的style元素的引用
     *      If you worked at node.js application, this function shall not work, and always returned null.
     *      如果是在node.js环境中，则此方法将不起作用，并且总是返回null
     */
    importStyle (url) {
        console.log("ArmyAnt : load style " + url);
        return libArmyAnt.insertElement("link", document.head, {
            href: url,
            type: "text/css",
            rel: "stylesheet"
        });
    },
};

/**
 * Defined some global complement functions
 * 以下定义了一些对全局量的补充方法
 */

if (libArmyAnt.nodeJs)
    global.$ = require('jquery');
else if (typeof global === "undefined") {
    if (typeof window !== "undefined")
        window.global = window;
    else if (typeof self !== "undefined")
        self.global = self;
}

if (typeof global.Object.copy === "undefined" || !this.Object.copy)
    /**
     * clone the object with its every child member. Each array and object in its children will also clone recursively
     * 创建指定Object对象的一个副本，且其所有Object和Array类型的子成员都会被递归式克隆
     * @param obj : Object
     *      The Object variable which will be copied
     *      要拷贝的源对象
     * @returns {Object}
     */
    global.Object.copy = function (obj) {
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

global.Object.copyTo = function (src, dst, dstKey) {
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
global.Object.keySet = function (obj) {
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
global.Object.contains = function (obj, value) {
    if (obj === null)
        return false;
    for (let k in obj) {
        if (obj.hasOwnProperty(k) && obj[k] === value)
            return k;
    }
    return false;
};

global.Array.prototype.copy = function () {
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

global.Array.prototype.contains = function (value) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] === value)
            return i;
    }
    return false;
};

global.Array.prototype.removeAt = function (index) {
    if (index < 0)
        return false;
    let ret = this[index];
    for (let i = index + 1; i < this.length; i++) {
        this[i - 1] = this[i];
    }
    this.pop();
    return ret;
};

global.Array.prototype.remove = function (value) {
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
if (!global.Function.prototype.bind)
    global.Function.prototype.bind = function (thisBind) {
        let self = this;
        let selfBind = thisBind;

        return function (...args) {
            return self.apply(selfBind, args);
        };
    };

export default libArmyAnt