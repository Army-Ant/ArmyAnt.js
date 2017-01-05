/**
 * Created by Jason Zhao Jie on 2016/12/13.
 */

(function() {
    this.libArmyAnt.animation.Canvas.Avatar = this.libArmyAnt.animation.IAvatar.inherit({
        ctor:function() {
            this.base._ctor();
        },

        /**
         * Execute the drawing action for canvas avatar
         * @param context
         * @param parent
         */
        draw:function(context, parent){
            var type = libArmyAnt.animation.IAvatar.Type;
            switch(this.type){
                case type.none:
                    return;
                case type.color:
                    context.fillStyle = this.args.color;
                    context.fillRect(parent.x, parent.y, parent.width, parent.height);
                    break;
            }
        },

        /**
         * Clean the target area of the canvas
         * @param context
         * @param parent
         */
        clean:function(context, parent){

        }
    });

    this.libArmyAnt._onInitialized();
})();