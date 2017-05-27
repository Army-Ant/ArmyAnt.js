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
 * The class to build a scheduler, which can recycle call a function
 * 建立一个定时器, 以便循环调用某个方法
 */

(function() {

    var libArmyAnt;
    if (typeof require == "undefined")
        libArmyAnt = window.libArmyAnt;
    else {
        libArmyAnt = require("../global.js");
        libArmyAnt.Object = require("../object.js");
    }

    var Scheduler = libArmyAnt.Object.inherit({
        delayTime: 0.001,
        callFunc: null,

        _running: false,
        _runningID: null,
        _lastTime:0,

        ctor: function (dt) {
            if (dt)
                this.delayTime = dt;
        },

        /**
         * To run the scheduler with the timed call back function
         * 开始运行计时器
         * @param func : {Function}
         *      If no param input into, the scheduler will run latest set function
         *      如果没有传入回调方法的参数, 则使用之前设定的回调方法. 如果之前也不曾设定过, 则不能启动计时器
         * @returns {boolean}
         */
        run: function (func) {
            if (func)
                this.callFunc = func;
            if (this.callFunc && !this._running) {
                this._running = true;
                this._lastTime = Date.parse(new Date());
                this._runningID = setInterval(this._callback.bind(this), this.delayTime * 1000);
                return true;
            }
            return false;
        },

        /**
         * stop the scheduler
         * 停止或暂停计时器
         */
        stop: function () {
            this._running = false;
            if (this._runningID) {
                clearInterval(this._runningID);
                this._runningID = null;
            }
        },

        /**
         * Wait seconds before run the function, or pause seconds when is running the function
         * 休眠暂停一段指定长度的时间,然后开始运行计时器.此方法可在计时器已经开启或者未开启的情况下使用
         * @param sleepTime : Number
         *      The time seconds waited
         */
        sleep: function (sleepTime) {
            this._running = false;
            setTimeout(this.run.bind(this), sleepTime * 1000);
        },

        /**
         * Check if the scheduler is running or not
         * 判断计时器是否正在运行中
         * @returns {boolean}
         */
        isRunning: function () {
            return this._running;
        },

        /**
         * Reset the scheduler, and call the function at once
         * If the scheduler is running, the callback function will be called at once (even if it is not at the time point to be called), and the scheduler will run as reset
         * 重置计时器,并立即调用一次回调方法.如果计时器之前已经在运行中,那么调用此方法会立刻打乱原先的节奏,立刻调用一次回调方法, 随后按照新的调用时间计算,进行随后的计时运行
         * 立刻调用的这一次, 回调参数会指出距离上一次调用的时间间隔
         */
        callAtOnce:function(){
            this._callback();
            if(this._runningID)
                clearInterval(this._runningID);
            else
                this._lastTime = Date.parse(new Date());
            this._runningID = setInterval(this._callback.bind(this), this.delayTime * 1000);
        },

        _callback: function () {
            var nd = Date.parse(new Date());
            this.callFunc(nd - this._lastTime);
            this._lastTime = nd;
        }
    });

    if (typeof require == "undefined"){
        libArmyAnt.Scheduler = Scheduler;
        libArmyAnt._onInitialized();
    }
    else
        module.exports = Scheduler;

})();