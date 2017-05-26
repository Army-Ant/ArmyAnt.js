/**
 * Created by Jason Z.J on 2015/8/21.
 * @author Jason Z.J
 * @date 2015/8/21
 */

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
            this.base.ctor();
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