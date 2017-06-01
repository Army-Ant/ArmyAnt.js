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

libArmyAnt.animation.Canvas.Node = libArmyAnt.animation.INode.inherit({

    ctor: function (parent, scene, zIndex, x, y, width, height) {
        libArmyAnt.animation.INode.prototype.ctor.bind(this)(parent, scene, zIndex, x, y, width, height);
    },

    addChild: function (tag, node, x, y) {
        if (typeof x === libArmyAnt.magics.types.NUMBER)
            node.x = x;
        if (typeof y === libArmyAnt.magics.types.NUMBER)
            node.y = y;
        node.parent = this;
        node.scene = this.scene;
        this.children.put(tag, node);
        return true;
    },

    removeChild: function (tag) {
        if (this.children.hasOwnProperty(tag))
            this.children[tag].removeSelf();
    },

    createNode: function (tag, x, y) {
        return this.addChild(tag, this.scene.parent.createNode(x, y));
    },

    createSprite: function (tag, avatar, x, y, width, height) {
        return this.addChild(tag, this.scene.parent.createSprite(tag, avatar, x, y, width, height));
    },

    removeAllChildren: function () {
        this.children.clear();
        return true;
    },

    setParent: function (parentNode) {
        var tg = this.getThisTag();
        this.parent = parentNode;
        this.parent.children.put(tg, parentNode);
        return true;
    },

    refresh: function () {
        for (var index = this.children.getMinIndex(); index !== null; index = this.children.getNextIndex(index)) {
            var children = this.children.getByIndex(index);
            if (children)
                for (var k = 0; k < children.length; ++k) {
                    var node = this.children.get(children[k]);
                    if (node && node.shown)
                        node.refresh();
                }
        }
    },

    update: function (dt) {

    }
});


libArmyAnt._onInitialized();