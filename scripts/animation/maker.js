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
import animation from "./base.js"
import Scheduler from "../common/scheduler.js"

export default class Maker {

    constructor(elem, width, height) {
        this.type = animation.realization.unknown;
        this.timer = null;
        this.scenes = null;
        this.parentElem = null;
        this.scenes = new animation.TagIndexList();
        this.timer = new Scheduler(animation.factory.refreshTime);
        if (elem)
            this.addToElem(elem);
        this.timer.run(this._timerFunc.bind(this));
    }

    addToElem() {
        throw "virtual function called";
    }

    removeFromElem() {
        throw "virtual function called";
    }

    createScene() {
        throw "virtual function called";
    }

    removeScene() {
        throw "virtual function called";
    }

    createNode() {
        throw "virtual function called";
    }

    createSprite() {
        throw "virtual function called";
    }

    createLabel() {
        throw "virtual function called";
    }

    createLayout() {
        throw "virtual function called";
    }

    createBoneUnit() {
        throw "virtual function called";
    }

    refresh() {
        throw "virtual function called";
    }

    update() {
        throw "virtual function called";
    }

    getSceneByTag(tag) {
        return this.scenes.get(tag);
    }

    getSceneTag(scene) {
        return this.scenes.getTag(scene);
    }

    getSceneZIndex(tagOrScene) {
        if (typeof tagOrScene !== libArmyAnt.magics.types.STRING)
            tagOrScene = this.getSceneTag(tagOrScene);
        if (!tagOrScene)
            throw "Cannot found the scene";
        return this.scenes.getZIndex(tagOrScene);
    }

    setSceneZIndex(tagOrScene, zIndex) {
        if (typeof tagOrScene !== libArmyAnt.magics.types.STRING)
            tagOrScene = this.getSceneTag(tagOrScene);
        if (!tagOrScene)
            throw "Cannot found the scene";
        return this.scenes.setZIndex(tagOrScene, zIndex);
    }

    _timerFunc(dt) {
        this.update(dt);
        for (let k in this.scenes.lists) {
            if (this.scenes.lists.hasOwnProperty(k) && this.scenes.lists[k].running)
                this.scenes.lists[k]._timerFunc(dt);
        }
    }
}