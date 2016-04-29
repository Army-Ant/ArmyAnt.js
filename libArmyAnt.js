/**
 * Created by Jason Z.J on 2015/8/20.
 * @author Jason Z.J
 * @date 2015/8/20
 */
if(!(typeof libArmyAnt!="undefined" || libArmyAnt)) {

    /**
     * The base variable node of all this libArmyAnt content
     */
    var libArmyAnt = {

        /**
         * The version of library
         */
        version: {
            relFirst: 0,
            relLast: 0,
            devFirst: 0,
            devLast: 1,
            ToNumeric: function () {
                return this.relFirst * 256 * 256 * 256 + this.relLast * 256 * 256 + this.devFirst * 256 + this.devLast;
            },
            ToString: function () {
                return this.relFirst + "." + this.relLast + "." + this.devFirst + "." + this.devLast + ".";
            }
        },

        info: {},
		config: {
			rootDir:""
		},

        init: function () {
            //libArmyAnt.ImportScript("jQuery/jquery-2.1.4.js");
            $.ajax({
                type: "get",
                url: libArmyAnt.config.rootDir + "data/libInfo.json",
                cache: true,
                async: false,
                dataType: "json",
                success: function (data) {
                    //load all library files
                    for (var i = 0; i < data[0].libFiles.length; i++) {
                        if (data[0].libFiles[i].type == "script") {
                            libArmyAnt.ImportScript(libArmyAnt.config.rootDir + data[0].libFiles[i].path);
                            console.log("ArmyAnt : load script " + data[0].libFiles[i].path);
                        } else if (data[0].libFiles[i].type == "style") {
                            libArmyAnt.ImportStyle(libArmyAnt.config.rootDir + data[0].libFiles[i].path);
                            console.log("ArmyAnt : load style " + data[0].libFiles[i].path);
                        }
                    }
                    for (var key in data[0]) {
                        if (key != "libFiles")
                            libArmyAnt.info[key] = data[0][key];
                    }
                }
            });
            $.ajax({
                type: "get",
                url:libArmyAnt.config.rootDir + "data/libConfig.json",
                cache: true,
                async: false,
                dataType: "json",
                success : function (data) {
                    for (var key in data[0]) {
                        libArmyAnt.config[key] = data[0][key];
                    }
                }
            });

        },

        /**
         * Dynamically insert javascript file
         * @param url : string
         *      The javascript file path
         * @returns boolean
         *      The script loaded request sended successful or not
         */
        ImportScript: function (url) {
            var insScript = document.createElement("script");
            insScript.type = "text/javascript";
            insScript.src = url;
            document.head.appendChild(insScript);
            return insScript;
        },

        /**
         * Dynamically insert css file
         * @param url : string
         *      The style file path
         * @return {HTMLElement}
         *      The style element reference in document
         */
        ImportStyle: function (url) {
            var insStyle = document.createElement("style");
            insStyle.type = "text/css";
            insStyle.src = url;
            document.head.appendChild(insStyle);
            return insStyle;
        }
    };

    libArmyAnt.init();
}
