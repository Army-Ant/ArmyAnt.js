/**
 * Created by Jason Z.J on 2015/9/7.
 * @author Jason Z.J
 * @date 2015/9/7
 */

libArmyAnt.HTML5.Dialog = libArmyAnt.Object.Inherit({
    title: "Message",
    type: 0,
    text: "",
    btnNames: [],
    btnCallbacks: [],

    _dialog:null,

    ctor: function (text, title, type) {
        this.base.ctor();
        this._getModal();
        this.title = title;
        this.text = text;
        this.type = type;
    },

    /**
     * Create the dialog with current settings and return it
     * @returns {HTMLElement} canvas
     */
    Return: function () {
        this._dialog.children["dialog_title"].innerText = this.title;
        this._dialog.children["dialog_text"].innerText = this.text;
        for (var i = 0; i < this.btnNames.length; i++) {
            this._dialog.children["dialog_btn" + i].innerText = this.btnNames[i];
            this._dialog.children["dialog_btn" + i].onclick = this.btnCallbacks[i];
        }
        return this._dialog;
    },

    _ParseType: function (type) {
        if (!type && type !== 0 && this) {
            type = this.type;
        }
    },

    _getModal: function () {
        this._dialog = libArmyAnt.HTML5.data.getElementById("dialog");
    }
});

libArmyAnt.HTML5.Dialog.MESSAGE = 1;
