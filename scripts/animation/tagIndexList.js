/**
 * Created by Jason Zhao Jie on 2016/12/13.
 */

(function() {
    this.libArmyAnt.animation.TagIndexList = this.libArmyAnt.Object.inherit({
        lists: {},
        ctor: function () {

        },

        put: function (tag, node, zIndex) {
            if (this.lists[tag]) {
                libArmyAnt.warn('The scene or node named "', tag, '" has been exist, please check the tag name or if it is added again!');
                return false;
            }
            if (typeof zIndex != "number")
                zIndex = 0;
            this.lists[tag] = {
                node: node,
                zIndex: zIndex
            };
            return true;
        },

        get: function (tag) {
            return this.lists[tag].node;
        },

        getTag: function(node){
            for(var k in this.lists){
                if(this.lists[k].node === node)
                    return k;
            }
            return null;
        },

        rename:function(tagOrNode, newTag){
            var node = tagOrNode;
            if(typeof tagOrNode == "string"){
                node = this.get(tagOrNode);
            }else
                tagOrNode = this.getTag(node);
            if(!node || !tagOrNode)
                return false;
            if(tagOrNode === newTag)
                return true;
            var zIndex = this.getZIndex(tagOrNode);
            this.remove(tagOrNode);
            this.put(newTag, node,  zIndex);
            return true;
        },

        remove: function (tag) {
            this.lists[tag].node.removeSelf();
        },

        getZIndex: function (tag) {
            return this.lists[tag].zIndex;
        },

        setZIndex: function (tag, zIndex) {
            this.lists[tag].zIndex = zIndex;
        },

        getByIndex: function (index) {
            var ret = [];
            for (var k in this.lists) {
                if (this.lists[k].zIndex === index)
                    ret.push(k);
            }
            return ret;
        },

        getMinIndex: function () {
            var ret = 0;
            var hasFound = false;
            for (var k in this.lists) {
                if (!hasFound) {
                    hasFound = true;
                    ret = this.lists[k].zIndex;
                } else if (this.lists[k].zIndex < ret) {
                    ret = this.lists[k].zIndex;
                }
            }
            return hasFound ? ret : null;
        },

        getMaxIndex: function () {
            var ret = 0;
            var hasFound = false;
            for (var k in this.lists) {
                if (!hasFound) {
                    hasFound = true;
                    ret = this.lists[k].zIndex;
                } else if (this.lists[k].zIndex > ret) {
                    ret = this.lists[k].zIndex;
                }
            }
            return hasFound ? ret : null;
        },

        getNextIndex: function (now) {
            var ret = now;
            var hasFound = false;
            for (var k in this.lists) {
                if (this.lists[k].zIndex > now)
                    if (!hasFound) {
                        hasFound = true;
                        ret = this.lists[k].zIndex;
                    } else if (this.lists[k].zIndex < ret) {
                        ret = this.lists[k].zIndex;
                    }
            }
            return hasFound ? ret : null;
        },

        getBackIndex: function (now) {
            var ret = now;
            var hasFound = false;
            for (var k in this.lists) {
                if (this.lists[k].zIndex < now)
                    if (!hasFound) {
                        hasFound = true;
                        ret = this.lists[k].zIndex;
                    } else if (this.lists[k].zIndex > ret) {
                        ret = this.lists[k].zIndex;
                    }
            }
            return hasFound ? ret : null;
        },

        clear:function(){
            for(var k in this.lists){
                this.lists[k].removeSelf();
            }
        }
    });

    this.libArmyAnt._onInitialized();
})();