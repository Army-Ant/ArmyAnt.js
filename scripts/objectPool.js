/**
 * Created by Jason Z.J on 2015/8/25.
 * @author Jason Z.J
 * @date 2015/8/25
 */

/**
 * The class used in libArmyAnt.ObjectPool
 */
(function() {
    this.libArmyAnt.ObjectElement = this.libArmyAnt.Object.inherit({
        id: null,
        staticPart: {},

        ctor: function () {
            this.base.ctor();
        },

        reuse: function () {

        }
    });

    /**
     * The class for object pool modal, you should only input ObjectElement and its inherit class object into this pool
     */
    this.libArmyAnt.ObjectPool = this.libArmyAnt.Object.inherit({
        elements: [],

        ctor: function () {
            this.base.ctor();
        },

        obtain: function (type) {

        },

        clear: function () {

        }
    });

    this.libArmyAnt._onInitialized();
})();