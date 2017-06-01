/**
 * Created by Jason Z.J on 2015/8/20.
 * @author Jason Z.J
 * @date 2015/8/20
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
 *
 */
import libArmyAnt from "./scripts/global.js"
import AAObject from "./scripts/object.js"
import DateTime from "./scripts/common/dateTime.js"
import HttpClient from "./scripts/common/httpClient.js"
import JsonParser from "./scripts/common/jsonParser.js"
import Scheduler from "./scripts/common/scheduler.js"
import HTML5 from "./scripts/html5/base.js"
import File from "./scripts/node.js_extend/file.js"
import HttpServer from "./scripts/node.js_extend/httpServer.js"

import animation from "./scripts/animation/base.js"

/**
 * Check if the library is run on node.js or not
 * 检查运行环境是否是nodeJS
 * Warning: This library is incompatible with "require.js".
 * 警告：本库不能与require.js相互兼容
 * This library in ECMAScript6 used the standard module way. You do not need to use require.js when you use this library
 * 本库的ECMAScript6版本默认采用标准化的Module功能，没必要与require.js同时使用
 * This library depends on the jquery library. In web pages, you must add jquery script before this file
 * 本库依赖于jQuery库。在网页环境下，你必须在载入本库（本文件）之前先载入jquery脚本（任何较新版本）
 */


if (typeof require === "undefined" && (
    (typeof window !== "undefined" && typeof window.libArmyAnt !== "undefined" && window.libArmyAnt) ||
    (typeof self !== "undefined" && typeof self.libArmyAnt !== "undefined" && self.libArmyAnt) ||
    (typeof global !== "undefined" && typeof global.libArmyAnt !== "undefined" && global.libArmyAnt))) {
    console.warn('ArmyAnt : The module name "libArmyAnt" has been defined !');
} else {

    libArmyAnt.Object = AAObject;
    libArmyAnt.DateTime = DateTime;
    libArmyAnt.HttpClient = HttpClient;
    libArmyAnt.JsonParser = JsonParser;
    libArmyAnt.Scheduler = Scheduler;
    libArmyAnt.HTML5 = HTML5;
    libArmyAnt.File = File;
    libArmyAnt.HttpServer = HttpServer;
    libArmyAnt.animation = animation;
}

export default libArmyAnt