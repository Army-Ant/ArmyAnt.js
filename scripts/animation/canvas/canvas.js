/**
 * Created by Jason Zhao Jie on 2016/12/21.
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
import animation from "../base.js"
import IMaker from "../maker.js"

import Avatar from "./avatar.js"
import canvasHelper from "./canvasHelper.js"
import Node from "./node.js"
import Scene from "./scene.js"
import Sprite from "./sprite.js"

export default class Canvas extends IMaker {

    /**
     *
     * @param elem {HTMLElement}
     * @param width {Number}
     * @param height
     * @param style
     */
    constructor(elem, width, height, style) {		
        super(elem, {width: width, height: height, style: style});

        this.type = animation.realization.canvas;
        this.context = this.canvas.getContext("2d");
    }

    /**
     *
     * @param elem {HTMLElement}
     */
    addToElem(elem) {
        this.canvas.appendChild(elem);
        this.parentElem = elem;
    }

    removeFromElem() {
        if (this.parentElem) {
            let cvs = Object.copy(this.canvas);
            $(this.canvas).remove();
            this.canvas = cvs;
            this.context = this.canvas.getContext("2d");
        }
    }

    createScene(tag, x, y, width, height) {
        let ret = new Scene(this, x, y, width, height);
        this.scenes.put(tag, ret);
        return ret;
    }

    removeScene(tag) {
        this.scenes.remove(tag);
    }

    createNode(x, y) {
        return new Node(null, this, 0, x, y, 0, 0);
    }

    createSprite(avatar, x, y, width, height) {
        return new Sprite(avatar, null, null, 0, x, y, width, height);
    }

    createLabel(x, y) {

    }

    createLayout(x, y, width, height) {
    }

    createBoneUnit() {

    }

    refresh() {
        for (let index = this.scenes.getMinIndex(); index !== null; index = this.scenes.getNextIndex(index)) {
            let scenes = this.scenes.getByIndex(index);
            if (scenes)
                for (let k = 0; k < scenes.length; ++k) {
                    let scene = this.scenes.get(scenes[k]);
                    if (scene && scene.shown)
                        scene.refresh();
                }
        }
    }

    update(dt) {
        this.refresh();
    }

	_createElem(createParams){
        this.canvas = document.createElement("canvas");
        this.canvas.width = createParams.width;
        this.canvas.height = createParams.height;
        if (createParams && createParams.style)
            this.canvas.style = createParams.style;
	}
}

Canvas.Avatar = Avatar;
Canvas.canvasHelper = canvasHelper;
Canvas.Node = Node;
Canvas.Scene = Scene;
Canvas.Sprite = Sprite;