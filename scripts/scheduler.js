/**
 * Created by Jason Z.J on 2015/8/21.
 * @author Jason Z.J
 * @date 2015/8/21
 */

/**
 * The class to build a circle called function scheduler
 */

(function() {
    this.libArmyAnt.Scheduler = this.libArmyAnt.Object.inherit({
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
         * @param func : {Function}
         *      If no param input into, the scheduler will run latest ran function
         */
        run: function (func) {
            if (func)
                this.callFunc = func;
            if (this.callFunc) {
                this._running = true;
                this._lastTime = Date.parse(new Date());
                this._runningID = setInterval(this._callback.bind(this), this.delayTime * 1000);
            }
        },

        /**
         * stop the scheduler
         */
        stop: function () {
            this._running = false;
            if (this._runningID)
                clearInterval(this._runningID);
        },

        /**
         * Wait seconds before run the function, or pause seconds when is running the function
         * @param sleepTime : Number
         *      The time seconds waited
         */
        sleep: function (sleepTime) {
            this._running = false;
            setTimeout(this.run.bind(this), sleepTime * 1000);
        },

        isRunning: function () {
            return this._running;
        },

        callAtOnce:function(){
            this._callback();
            clearInterval(this._runningID);
            this._runningID = setInterval(this._callback.bind(this), this.delayTime * 1000);
        },

        _callback: function () {
            var nd = Date.parse(new Date());
            this.callFunc(nd - this._lastTime);
            this._lastTime = nd;
        }
    });

    this.libArmyAnt._onInited();
})();