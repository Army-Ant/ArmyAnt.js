/**
 * Created by Jason Zhao Jie on 2016/12/13.
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
import libArmyAnt from "../global.js"

let defaultType = Symbol("none");

class IAvatar {
    constructor() {
        this.type = defaultType;
        this.args = {};
        this.draw = null;
        //throw "This interface cannot be created an object";
    }

    static create(animationType, avatarType, args) {
        let ret = null;
        switch (animationType) {
            case libArmyAnt.animation.realization.canvas:
                ret = new libArmyAnt.animation.Canvas.Avatar();
                break;
        }
        ret.type = avatarType;
        ret.args = args;
        return ret;
    }
}

IAvatar.Type = {
    none: defaultType,
    color: Symbol("color"),
    image: Symbol("image"),
    action: Symbol("action"),
    animation: Symbol("animation"),
    video: Symbol("video"),
    event: Symbol("event")
};

IAvatar.Action = {
    line: Symbol("line"),
    arc: Symbol("arc"),
    rect: Symbol("rect"),
    clear: Symbol("clear"),
    rotate: Symbol("rotate"),
    save: Symbol("save"),
    load: Symbol("load")
};

export default IAvatar
