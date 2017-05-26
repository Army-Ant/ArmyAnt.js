/**
 * Created by Jason Zhao Jie on 2016/12/13.
 */

libArmyAnt.animation.ImageManager = libArmyAnt.Object.inherit({
    resourceList: {},

    ctor: function () {
        this.base.ctor();
    },

    updateImage: function (tag, url) {
        var newImg = new Image();
        newImg.onload = function () {
            this.resourceList[tag] = newImg;
        };
        newImg.onerror = function () {

        };
        newImg.src = url;
    },

    updateImageByDom: function (tag, img) {
        this.resourceList[tag] = img;
    },

    removeImage: function (tag) {
        this.resourceList.remove(tag);
    },

    getImage: function (tag) {
        if (this.resourceList.hasOwnProperty(tag))
            return this.resourceList[tag];
        return null;
    },

    clearResource: function (tag) {
        this.resourceList = {};
    }
});

libArmyAnt._onInitialized();