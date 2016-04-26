/**
 * Created by Jason Z.J on 2015/8/26.
 * @author Jason Z.J
 * @date 2015/8/26
 */

libArmyAnt.HTML5=new (libArmyAnt.Object.Inherit({
    modal:"assets/modals.html",
    data:null,

    ctor:function(){
        var self = this;
        $.post(this.modal, null, function (data, statue, jqXHR) {
            self.data = data;
        }, "html");
    }

}))();