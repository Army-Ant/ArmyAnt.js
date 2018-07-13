/**
 * Created by Jason Zhao Jie on 2016/12/12.
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
import AAObject from "../object.js"

import IAvatar from "./avatar.js"
import factory from "./factory.js"
import ImageManager from "./imageManager.js"
import IMaker from "./maker.js"
import INode from "./node.js"
import IScene from "./scene.js"
import ISprite from "./sprite.js"
import TagIndexList from "./tagIndexList.js"

import Canvas from "./canvas/canvas.js"

export default new class extends AAObject {

    constructor() {
        super();
        this.style = "assets/animation.css";
        this.data = null;
        this.realization = {
            unknown: Symbol("unknown"),
            canvas: Symbol("canvas"),
            multiCanvas: Symbol("multiCanvas"),
            css3: Symbol("css3"),
            svg: Symbol("SVG"),
            jQuery: Symbol("jQuery"),
            webGL: Symbol("webGL"),
            flash: Symbol("flash")
        };
        this.IAvatar = IAvatar;
        this.factory = factory;
        this.ImageManager = ImageManager;
        this.IMaker = IMaker;
        this.INode = INode;
        this.IScene = IScene;
        this.ISprite = ISprite;
        this.TagIndexList = TagIndexList;

        this.Canvas = Canvas;
        if (libArmyAnt.nodeJs) {

        } else {
            global.$.ajax({
                type: "get",
                url: libArmyAnt.config.dataRootDir + this.style,
                cache: true,
                async: true,
                dataType: "text",
                success: (data, statue, jqXHR) => {
                    this.data = data;
                }
            });
        }
    }

}