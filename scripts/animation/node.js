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
import TagIndexList from "./tagIndexList.js"

export default class Node {

    /**
     *
     * @param parent : INode
     * @param scene
     * @param zIndex
     * @param x
     * @param y
     * @param width
     * @param height
     */
    constructor(parent, scene, zIndex, x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.zIndex = zIndex;
        this.scene = scene;
        if (parent)
            this.parent = parent;
        else
            this.parent = null;
        this.shown = true;
        this.running = true;
        this.children = new TagIndexList();
    }

    _timerFunc(dt) {
        this.update(dt);
        for (let k in this.children.lists) {
            if (this.children.lists.hasOwnProperty(k) && this.children.lists[k].running)
                this.children.lists[k]._timerFunc(dt);
        }
    }

    show() {
        this.shown = true;
    }

    hide() {
        this.shown = false;
    }

    pause() {
        this.running = false;
    }

    resume() {
        this.running = true;
    }

    getThisTag() {
        return this.parent.getChildTag(this);
    }

    setZIndex(zIndex) {
        return this.parent.setChildZIndex(this, zIndex);
    }

    getZIndex() {
        return this.parent.getChildZIndex(this);
    }

    removeSelf() {
        let p = this.parent;
        let tag = this.getThisTag();
        this.parent = null;
        delete p.children.lists[tag];
    }


    addChild() {
        throw "virtual function called";
    }

    removeChild() {
        throw "virtual function called";
    }

    createNode() {
        throw "virtual function called";
    }

    createSprite() {
        throw "virtual function called";
    }

    removeAllChildren() {
        throw "virtual function called";
    }

    setParent() {
        throw "virtual function called";
    }

    refresh() {
        throw "virtual function called";
    }

    update() {
        throw "virtual function called";
    }
}