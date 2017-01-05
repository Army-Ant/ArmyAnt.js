/**
 * Created by Jason Zhao Jie on 2016/12/21.
 */

(function() {

    this.libArmyAnt.animation.Canvas.Node = this.libArmyAnt.animation.INode.inherit({

        ctor:function(parent, scene, zIndex, x, y, width, height){
            this.base._ctor(parent, scene, zIndex, x, y, width, height);
        },

        addChild:function(tag, node, x, y){
            if(typeof x == "number")
                node.x = x;
            if(typeof y == "number")
                node.y = y;
            node.parent = this;
            this.children.put(tag, node);
            return true;
        },

        removeChild:function(tag){
            if(this.children.hasOwnProperty(tag))
                this.children[tag].removeSelf();
        },

        createChild:function(tag, x, y){
            return this.addChild(tag, this.parent.createNode(x, y));
        },

        removeAllChildren:function(){
            this.children.clear();
            return true;
        },

        setParent:function(parentNode){
            var tg = this.getThisTag();
            this.parent = parentNode;
            this.parent.children.put(tg, parentNode);
            return true;
        },

        refresh:function(){
            for(var index = this.children.getMinIndex(); index !== null; index = this.children.getNextIndex(index)){
                var children = this.children.getByIndex(index);
                if(children)
                    for(var k=0; k< children.length; ++k){
                        var node = this.children.get(children[k]);
                        if(node && node.shown)
                            node.refresh();
                    }
            }
        },

        update:function(dt){

        }
    });


    this.libArmyAnt._onInitialized();
})();