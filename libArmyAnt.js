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

        loadedReady:false,
        onLibLoad:null,
        info: {},
		config: {
			/**
			 * Please change this string value when you use this library in your project
			 */
			rootDir:""
		},

        init: function () {
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
            if(this.onLibLoad)
                this.onLibLoad();
            this.loadedReady = true;
        },

        /**
         * Dynamically insert an HTML element
         * @param typename : string
         *      The type of the element you will add
         * @param parentElem : HTMLElement
         *      The parent element node you will add to
         * @param properties : Object
         *      The properties of this element you will add
         * @returns {HTMLElement}
         *      The element you add
         */
        InsertElement: function(typename, parentElem, properties){
            var insertingElem = document.createElement(typename);
            if(properties){
                for(var key in properties){
                    insertingElem[key] = properties[key];
                }
            }
            parentElem.appendChild(insertingElem);
            return insertingElem;
        },

        /**
         * Dynamically insert javascript file
         * @param url : string
         *      The javascript file path
         * @returns {HTMLElement}
         *      The script element reference in document
         */
        ImportScript: function (url) {
            return libArmyAnt.InsertElement("script",document.head,{src:url,type:"text/javascript"});
        },

        /**
         * Dynamically insert css file
         * @param url : string
         *      The style file path
         * @return {HTMLElement}
         *      The style element reference in document
         */
        ImportStyle: function (url) {
            return libArmyAnt.InsertElement("link",document.head,{href:url,type:"text/css",rel:"stylesheet"});
        }
    };

    libArmyAnt.init();
}
