/**
 * Created by Jason Zhao Jie on 2016/12/13.
 */

libArmyAnt.animation.IAvatar = libArmyAnt.Object.inherit({
    type: "none",
    args: {},

    ctor: function () {
        //throw "This interface cannot be created an object";
    },

    draw: null
});

libArmyAnt.animation.IAvatar.Type = {
    none: "none",
    color: "color",
    image: "image",
    action: "action",
    animation: "animation",
    video: "video",
    event: "event"
};

libArmyAnt.animation.IAvatar.Action = {
    line: "line",
    arc: "arc",
    rect: "rect",
    clear: "clear",
    rotate: "rotate",
    save: "save",
    load: "load"
};

libArmyAnt.animation.IAvatar.create = function (animationType, avatarType, args) {
    var ret = null;
    switch (animationType) {
        case libArmyAnt.animation.realization.canvas:
            ret = new libArmyAnt.animation.Canvas.Avatar();
            break;
    }
    ret.type = avatarType;
    ret.args = args;
    return ret;
};

libArmyAnt._onInitialized();