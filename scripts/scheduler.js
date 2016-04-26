/**
 * Created by Jason Z.J on 2015/8/21.
 * @author Jason Z.J
 * @date 2015/8/21
 */

/**
 * The class to build a circle called function scheduler
 */
libArmyAnt.Scheduler = libArmyAnt.Object.Inherit({
    delayTime: 0.001,
    callFunc: null,
    running: false,

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
    Run: function (func) {
        if (func)
            this.callFunc = func;
        if (this.callFunc) {
            this.running = true;
            var ld = Date.parse(new Date());
            window.setTimeout(function () {
                this._Callback(ld);
            }.bind(this), this.delayTime * 1000);
        }
    },

    /**
     * Stop the scheduler
     */
    Stop: function () {
        this.running = false;
    },

    /**
     * Wait seconds before run the function, or pause seconds when is running the function
     * @param sleepTime : Number
     *      The time seconds waited
     */
    Sleep: function (sleepTime) {
        this.running = false;
        window.setTimeout(this.Run.bind(this), sleepTime * 1000);
    },

    _Callback: function (ld) {
        var nd = Date.parse(new Date());
        this.callFunc(nd - ld);
        if (this.running)
            window.setTimeout(function () {
                this._Callback(nd);
            }.bind(this), this.delayTime * 1000);
    }
});