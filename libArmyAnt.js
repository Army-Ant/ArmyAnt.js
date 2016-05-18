/**
 * Created by Jason Z.J on 2015/8/20.
 * @author Jason Z.J
 * @date 2015/8/20
 */

(function() {
    if (!(typeof libArmyAnt != "undefined" && libArmyAnt)) {

        /**
         * The base variable node of all this libArmyAnt content
         */
        var libArmyAnt = this.libArmyAnt = {

            /**
             * The version of library
             */
            version: {
                relFirst: 0,
                relLast: 0,
                devFirst: 0,
                devLast: 2,
                ToNumeric: function () {
                    return this.relFirst * 256 * 256 * 256 + this.relLast * 256 * 256 + this.devFirst * 256 + this.devLast;
                },
                ToString: function () {
                    return this.relFirst + "." + this.relLast + "." + this.devFirst + "." + this.devLast + ".";
                }
            },

            nodeJs: (typeof require == "undefined" || !require) ? null : {
                http: require("http"),
                url: require("url"),
                fs: require("fs"),
            },
            loadedReady: false,
            onLibLoad: null,
            info: {},
            config: {
                /**
                 * Please change this string value when you use this library in your project
                 */
                rootDir: ""
            },

            init: function () {
                if (libArmyAnt.nodeJs)
                    libArmyAnt.config.rootDir = "./" + libArmyAnt.config.rootDir;
                if (this.nodeJs) {
                    this.nodeJs.fs["readFile"](libArmyAnt.config.rootDir + "data/libInfo.json", function (err, jsondata) {
                        if (err) {
                            console.error("ArmyAnt : load config " + libArmyAnt.config.rootDir + "data/libInfo.json failed !");
                        } else {
                            var data = JSON.parse(jsondata);
                            for (var i = 0; i < data[0]["libFiles"].length; i++) {
                                if (data[0]["libFiles"][i].type == "script") {
                                    //try {
                                    libArmyAnt.ImportScript(libArmyAnt.config.rootDir + data[0]["libFiles"][i]["path"]);
                                    /* }
                                     catch(err){
                                     console.error("ArmyAnt : loading script " + data[0]["libFiles"][i]["path"] + " caused errors !");
                                     console.error(err);
                                     }*/
                                } else if (data[0]["libFiles"][i].type == "style") {
                                    libArmyAnt.ImportStyle(libArmyAnt.config.rootDir + data[0]["libFiles"][i]["path"]);
                                }
                            }
                            for (var key in data[0]) {
                                if (key != "libFiles")
                                    libArmyAnt.info[key] = data[0][key];
                            }
                        }
                    });
                    this.nodeJs.fs["readFile"](libArmyAnt.config.rootDir + "data/libConfig.json", function (err, jsondata) {
                        if (err) {
                            console.error("ArmyAnt : load config " + libArmyAnt.config.rootDir + "data/libConfig.json failed !");
                        } else {
                            var data = JSON.parse(jsondata);
                            for (var key in data[0]) {
                                libArmyAnt.config[key] = data[0][key];
                            }
                        }
                    });
                } else {
                    $.ajax({
                        type: "get",
                        url: libArmyAnt.config.rootDir + "data/libInfo.json",
                        cache: true,
                        async: false,
                        dataType: "json",
                        success: function (data) {
                            //load all library files
                            for (var i = 0; i < data[0]["libFiles"].length; i++) {
                                if (data[0]["libFiles"][i].type == "script") {
                                    libArmyAnt.ImportScript(libArmyAnt.config.rootDir + data[0]["libFiles"][i]["path"]);
                                } else if (data[0]["libFiles"][i].type == "style") {
                                    libArmyAnt.ImportStyle(libArmyAnt.config.rootDir + data[0]["libFiles"][i]["path"]);
                                    console.log("ArmyAnt : load style " + data[0]["libFiles"][i]["path"]);
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
                        url: libArmyAnt.config.rootDir + "data/libConfig.json",
                        cache: true,
                        async: false,
                        dataType: "json",
                        success: function (data) {
                            for (var key in data[0]) {
                                libArmyAnt.config[key] = data[0][key];
                            }
                        }
                    });
                }
                if (this.onLibLoad)
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
             *      If you worked at node.js application, this function shall not work, and always returned null.
             */
            InsertElement: function (typename, parentElem, properties) {
                if (this.nodeJs)
                    return null;
                var insertingElem = document.createElement(typename);
                if (properties) {
                    for (var key in properties) {
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
             * @return {HTMLElement / Object}
             *      HTMLElement : The script element reference in document
             *      Object : the module root of the node.js require returned
             */
            ImportScript: function (url) {
                console.log("ArmyAnt : loading script " + url);
                if (this.nodeJs)
                    return require(url);
                return libArmyAnt.InsertElement("script", document.head, {src: url, type: "text/javascript"});
            },

            /**
             * Dynamically insert css file
             * @param url : string
             *      The style file path
             * @return {HTMLElement}
             *      The style element reference in document
             */
            ImportStyle: function (url) {
                return libArmyAnt.InsertElement("link", document.head, {
                    href: url,
                    type: "text/css",
                    rel: "stylesheet"
                });
            }
        };

    } else {
        console.warn('ArmyAnt : The module name "libArmyAnt" has been defined !');
    }
})();

if(libArmyAnt.nodeJs)
    require("./externals/jquery-2.1.4.js");

libArmyAnt.init();