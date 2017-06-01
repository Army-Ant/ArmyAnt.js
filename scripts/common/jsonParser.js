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
 * The class to download and parse json file async
 */
(function() {

    var libArmyAnt;
    if (typeof require === "undefined")
        libArmyAnt = window.libArmyAnt;
    else {
        libArmyAnt = require("../global.js");
        libArmyAnt.Object = require("../object.js");
    }

    var JsonParser = libArmyAnt.Object.inherit({
        url: null,
        data: null,

        ctor: function (url) {
            if (url)
                this.url = url;
        },

        /**
         * To get and parse the json file async
         * 异步获取并解析json (node环境下为同步载入json数据)
         * @param url : string
         *      The net url or file path of json file
         */
        loadJson: function (url) {
            this.data = null;
            if (url)
                this.url = url;
            if (typeof require !== libArmyAnt.magics.types.UNDEFINED) {
                this.data = require("./" + url);
            }
            else if (this.url)
                $.ajax({
                    type: "get",
                    url: this.url,
                    cache: true,
                    async: false,
                    dataType: "json",
                    success: function (data) {
                        this.data = data;
                    }.bind(this)
                });
            else
                throw "Error url string for json file";
        }
    });

    /**
     * 调用此方法, 以在不创建对象的情况下, 异步读取json数据, 并将数据传入回调方法
     * @param url : String
     * @param callback : Function
     * @returns {*}
     */
    JsonParser.getJson = function (url, callback) {
        return (typeof require === libArmyAnt.magics.types.UNDEFINED) ?
            $.ajax({
                type: "get",
                url: url,
                cache: true,
                async: false,
                dataType: "json",
                success: callback
            }) : callback(require("./" + url));
    };

    if (typeof require === libArmyAnt.magics.types.UNDEFINED) {
        libArmyAnt.JsonParser = JsonParser;
        libArmyAnt._onInitialized();
    }
    else
        module.exports = JsonParser;
})();