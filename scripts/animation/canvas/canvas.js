/**
 * Created by Jason Zhao Jie on 2016/12/21.
 */

(function() {
    this.libArmyAnt.animation.Canvas = this.libArmyAnt.animation.IMaker.inherit({
        type:libArmyAnt.animation.realization.canvas,
        canvas:null,
        context:null,

        /**
         *
         * @param elem {HTMLElement}
         */
        ctor:function(elem, width, height, style){
            this.canvas = new HTMLCanvasElement;
            this.canvas.width = width;
            this.canvas.height = height;
            this.canvas.style = style;
            this.context = this.canvas.getContext("2d");
            if(elem)
                this.addToElem(elem);
        },

        /**
         *
         * @param elem {HTMLElement}
         */
        addToElem:function(elem){
            elem.appendChild(this.canvas);
        },

        createScene:function(x, y, width, height){

        },

        createNode:function(){

        },

        createSprite:function(){

        },

        createLabel:function(){

        },

        createLayout:null,

        createBoneUnit:null
    });


    this.libArmyAnt._onInitialized();
})();