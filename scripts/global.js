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

import constants from "./constants";


global.nodeJs = (typeof require === constants.types.UNDEFINED || !require) ? false : true

/**
 * Defined some global complement functions
 * 以下定义了一些对全局量的补充方法
 */

if (nodeJs)
    global.$ = require('jquery');
else if (typeof global === constants.types.UNDEFINED) {
    if (typeof window !== constants.types.UNDEFINED)
        window.global = window;
    else if (typeof self !== constants.types.UNDEFINED)
        self.global = self;
}

if (typeof global.Object.copy === constants.types.UNDEFINED || !this.Object.copy){
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
                if (typeof obj[k] === constants.types.OBJECT)
                    Object.copyTo(obj[k], ret, k);
                else
                    ret[k] = obj[k];
        }
        return ret;
    };
}

global.Object.copyTo = function (src, dst, dstKey) {
    if (!src || !dst) {
        dst[dstKey] = src;
        return true;
    }
    dst[dstKey] = Object.create(src);
    for (let k in src) {
        if (src.hasOwnProperty(k))
            if (typeof src[k] === constants.types.OBJECT)
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
            case constants.types.UNDEFINED:
                break;
            case constants.types.OBJECT:
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
if (!global.Function.prototype.bind){
    global.Function.prototype.bind = function (thisBind) {
        let self = this;
        let selfBind = thisBind;

        return function (...args) {
            return self.apply(selfBind, args);
        };
    }
}

export default {}
