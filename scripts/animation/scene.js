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

    libArmyAnt.animation.IScene = libArmyAnt.Object.inherit({
        parent:null,
        x:0,
        y:0,
        width:0,
        height:0,

        shown:true,
        running:true,
        background:null,

        children:null,

        ctor:function(parent, x, y, width, height, background){
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.parent = parent;
            if(background)
                this.background = background;
            this.children = new libArmyAnt.animation.TagIndexList();
        },


        _timerFunc:function(dt){
            this.update(dt);
            for(var k in this.children.lists.length){
                if(this.children.lists[k].running)
                    this.children.lists[k]._timerFunc(dt);
            }
        },

        show:function(){
            this.shown = true;
            this.parent.refresh();
        },

        hide:function(){
            this.shown = false;
            this.parent.refresh();
        },

        pause:function(){
            this.running = false;
        },

        resume:function(){
            this.running = true;
        },

        getThisTag:function(){
            return this.parent.getSceneTag(this);
        },

        setZIndex:function(zIndex){
            return this.parent.setSceneZIndex(this, zIndex);
        },

        getZIndex:function(){
            return this.parent.getSceneZIndex(this);
        },

        getChildByTag:function(tag){
            return this.children.get(tag);
        },

        getChildTag:function(scene){
            return this.children.getTag(scene);
        },

        getChildZIndex:function(tagOrNode){
            if(typeof tagOrNode != "string")
                tagOrNode = this.getChildTag(tagOrNode);
            if(!tagOrNode)
                throw "Cannot found the child node";
            return this.children.getZIndex(tagOrNode);
        },

        setChildZIndex:function(tagOrNode, zIndex){
            if(typeof tagOrNode != "string")
                tagOrNode = this.getChildTag(tagOrNode);
            if(!tagOrNode)
                throw "Cannot found the child node";
            return this.children.setZIndex(tagOrNode, zIndex);
        },

        addNode:null,
        removeNode:null,
        createNode:null,
        createSprite:null,
        removeAllNodes:null,
        removeSelf:function(){
            delete this.parent.scenes.lists[tag];
        },
        refresh:null,
        update:null
    });

    libArmyAnt._onInitialized();