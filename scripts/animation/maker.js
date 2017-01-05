/**
 * Created by Jason Zhao Jie on 2016/12/13.
 */

(function() {
    this.libArmyAnt.animation.IMaker = this.libArmyAnt.Object.inherit({
        type: libArmyAnt.animation.realization.unknown,
        timer: null,
        scenes: null,
        parentElem: null,

        ctor: function () {
            throw "This interface cannot be created an object";
        },

        addToElem: null,
        removeFromElem: null,
        createScene: null,
        removeScene: null,
        createNode: null,
        createSprite: null,
        createLabel: null,
        createLayout: null,
        createBoneUnit: null,
        refresh: null,
        update: null,

        getSceneByTag:function(tag){
            return this.scenes.get(tag);
        },

        getSceneTag:function(scene){
            return this.scenes.getTag(scene);
        },

        getSceneZIndex:function(tagOrScene){
            if(typeof tagOrScene != "string")
                tagOrScene = this.getSceneTag(tagOrScene);
            if(!tagOrScene)
                throw "Cannot found the scene";
            return this.scenes.getZIndex(tagOrScene);
        },

        setSceneZIndex:function(tagOrScene, zIndex){
            if(typeof tagOrScene != "string")
                tagOrScene = this.getSceneTag(tagOrScene);
            if(!tagOrScene)
                throw "Cannot found the scene";
            return this.scenes.setZIndex(tagOrScene, zIndex);
        },

        _ctor: function (elem, width, height) {
            this.base.ctor();
            this.scenes = new libArmyAnt.animation.TagIndexList();
            this.timer = new libArmyAnt.Scheduler(libArmyAnt.animation.factory.refreshTime);
            if (elem)
                this.addToElem(elem);
            this.timer.run(this._timerFunc.bind(this));
        },

        _timerFunc:function(dt){
            this.update(dt);
            for(var k in this.scenes.lists.length){
                if(this.scenes.lists[k].running)
                    this.scenes.lists[k]._timerFunc(dt);
            }
        }
    });

    this.libArmyAnt._onInitialized();
})();