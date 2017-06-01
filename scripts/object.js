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
        for (var j in parent.prototype) {
            if (parent.prototype.hasOwnProperty(j))
                if (j === "__objectProperties__")
                    Object.copyTo(parent.prototype[j], ret.prototype, j);
                else
                    ret.prototype[j] = parent.prototype[j];
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