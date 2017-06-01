/**
 * Created by Jason Z.J on 2015/8/26.
 * @author Jason Z.J
 * @date 2015/8/26
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
    if (typeof require === "undefined")
        libArmyAnt = window.libArmyAnt;
    else {
        libArmyAnt = require("../global.js");
        libArmyAnt.Object = require("../object.js");
    }

    var HTML5 = libArmyAnt.Object.extendSingleton({
        modal: "assets/modals.html",
        data: null,

        ctor: function () {
            var self = this;
            if (libArmyAnt.nodeJs) {
                self.data = libArmyAnt.nodeJs.fs["readFile"]("../" + this.modal, function (err, filedata) {
                    self.data = filedata;
                });
            } else {
                $.ajax({
                    type: "get",
                    url: libArmyAnt.config.dataRootDir + this.modal,
                    cache: true,
                    async: true,
                    dataType: "html",
                    success: function (data, statue, jqXHR) {
                        self.data = data;
                    }
                });
            }
        }

    });

    if (typeof require === "undefined") {
        libArmyAnt.HTML5 = HTML5;
        libArmyAnt._onInitialized();
    }
    else {
        HTML5.Dialog = require("./dialog.js");
        module.exports = HTML5;
    }
})();