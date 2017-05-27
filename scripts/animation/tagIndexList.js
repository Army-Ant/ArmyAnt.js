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

libArmyAnt.animation.TagIndexList = libArmyAnt.Object.inherit({
    lists: {},
    ctor: function () {

    },

    put: function (tag, node, zIndex) {
        if (this.lists[tag]) {
            libArmyAnt.warn('The scene or node named "', tag, '" has been exist, please check the tag name or if it is added again!');
            return false;
        }
        if (typeof zIndex != "number")
            zIndex = 0;
        this.lists[tag] = {
            node: node,
            zIndex: zIndex
        };
        return true;
    },

    get: function (tag) {
        return this.lists[tag].node;
    },

    getTag: function (node) {
        for (let k in this.lists) {
            if (this.lists[k].node === node)
                return k;
        }
        return null;
    },

    rename: function (tagOrNode, newTag) {
        let node = tagOrNode;
        if (typeof tagOrNode == "string") {
            node = this.get(tagOrNode);
        } else
            tagOrNode = this.getTag(node);
        if (!node || !tagOrNode)
            return false;
        if (tagOrNode === newTag)
            return true;
        let zIndex = this.getZIndex(tagOrNode);
        this.remove(tagOrNode);
        this.put(newTag, node, zIndex);
        return true;
    },

    remove: function (tag) {
        this.lists[tag].node.removeSelf();
    },

    getZIndex: function (tag) {
        return this.lists[tag].zIndex;
    },

    setZIndex: function (tag, zIndex) {
        this.lists[tag].zIndex = zIndex;
    },

    getByIndex: function (index) {
        let ret = [];
        for (let k in this.lists) {
            if (this.lists[k].zIndex === index)
                ret.push(k);
        }
        return ret;
    },

    getMinIndex: function () {
        let ret = 0;
        let hasFound = false;
        for (let k in this.lists) {
            if (!hasFound) {
                hasFound = true;
                ret = this.lists[k].zIndex;
            } else if (this.lists[k].zIndex < ret) {
                ret = this.lists[k].zIndex;
            }
        }
        return hasFound ? ret : null;
    },

    getMaxIndex: function () {
        let ret = 0;
        let hasFound = false;
        for (let k in this.lists) {
            if (!hasFound) {
                hasFound = true;
                ret = this.lists[k].zIndex;
            } else if (this.lists[k].zIndex > ret) {
                ret = this.lists[k].zIndex;
            }
        }
        return hasFound ? ret : null;
    },

    getNextIndex: function (now) {
        let ret = now;
        let hasFound = false;
        for (let k in this.lists) {
            if (this.lists[k].zIndex > now)
                if (!hasFound) {
                    hasFound = true;
                    ret = this.lists[k].zIndex;
                } else if (this.lists[k].zIndex < ret) {
                    ret = this.lists[k].zIndex;
                }
        }
        return hasFound ? ret : null;
    },

    getBackIndex: function (now) {
        let ret = now;
        let hasFound = false;
        for (let k in this.lists) {
            if (this.lists[k].zIndex < now)
                if (!hasFound) {
                    hasFound = true;
                    ret = this.lists[k].zIndex;
                } else if (this.lists[k].zIndex > ret) {
                    ret = this.lists[k].zIndex;
                }
        }
        return hasFound ? ret : null;
    },

    clear: function () {
        for (let k in this.lists) {
            this.lists[k].removeSelf();
        }
    }
});

libArmyAnt._onInitialized();