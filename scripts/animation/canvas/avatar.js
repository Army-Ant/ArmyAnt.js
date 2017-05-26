/**
 * Created by Jason Zhao Jie on 2016/12/13.
 */

(function() {
    this.libArmyAnt.animation.Canvas.Avatar = this.libArmyAnt.animation.IAvatar.inherit({
        ctor:function() {
            this.base.ctor();
        },

        /**
         * Execute the drawing action for canvas avatar
         * @param context
         * @param parent
         */
        draw:function(context, parent){
            var type = libArmyAnt.animation.IAvatar.Type;
            if(typeof this.args.strokeColor != "undefined" && this.args.strokeColor) {
                context.strokeStyle = this.args.strokeColor;
                context.strokeRect(parent.x, parent.y, parent.width, parent.height);
            }
            switch(this.type) {
                case type.none:
                    break;
                case type.color:
                    context.fillStyle = this.args.color;
                    context.fillRect(parent.x, parent.y, parent.width, parent.height);
                    break;
                case type.image:
                    if (typeof this.args.img == "undefined" || !this.args.img)
                        break;
                    if (typeof this.args.imgX == "undefined" || !this.args.imgX)
                        this.args.imgX = 0;
                    if (typeof this.args.imgY == "undefined" || !this.args.imgY)
                        this.args.imgY = 0;
                    if (typeof this.args.imgWidth == "undefined" || !this.args.imgWidth)
                        this.args.imgWidth = this.args.img.width;
                    if (typeof this.args.imgHeight == "undefined" || !this.args.imgHeight)
                        this.args.imgHeight = this.args.img.height;
                    if (typeof this.args.destX == "undefined" || !this.args.destX)
                        this.args.destX = 0;
                    if (typeof this.args.destY == "undefined" || !this.args.destY)
                        this.args.destY = 0;
                    if (typeof this.args.destWidth == "undefined" || !this.args.destWidth)
                        this.args.destWidth = this.args.imgWidth;
                    if (typeof this.args.destHeight == "undefined" || !this.args.destHeight)
                        this.args.destHeight = this.args.imgHeight;
                    context.drawImage(this.args.img, this.args.imgX, this.args.imgY, this.args.imgWidth, this.args.imgHeight,
                            parent.x + this.args.destX, parent.y + this.args.destY, this.args.destWidth, this.args.destHeight);
                    break;
                case type.action:
                    switch(this.args.action){
                        case libArmyAnt.animation.IAvatar.Action.line:
                            context.lineTo(this.args.destX, this.args.destY);
                            break;
                    }
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