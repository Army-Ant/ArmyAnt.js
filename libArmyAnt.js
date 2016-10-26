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
                toNumeric: function () {
                    return this.relFirst * 256 * 256 * 256 + this.relLast * 256 * 256 + this.devFirst * 256 + this.devLast;
                },
                toString: function () {
                    return this.relFirst + "." + this.relLast + "." + this.devFirst + "." + this.devLast + ".";
                }
            },

            /**
             * If in the node.js environment, this object contains every modules from node.js system packages.
             * If out of the node.js, this variable is null.
             */
            nodeJs: (typeof require == "undefined" || !require) ? null : {
                http: require("http"),
                url: require("url"),
                fs: require("fs"),
                child_process: require("child_process"),
                querystring:require("querystring")
            },

            /**
             * Have the library loaded ready or not, don't change the value in any case
             */
            loadedReady: false,

            /**
             * The information of this library, loaded from "libInfo.json"
             */
            info: {},

            /**
             * The configurations of this library, some of it is loaded from "libConfig.json"
             */
            config: {
                /**
                 * Please change this string value when you use this library in your project
                 */
                rootDir: "",
                nodeRootDir: "./",
                dataRootDir: "",
                onLibLoad: function(){
                    if(libArmyAnt.nodeJs)
                        serverHost.onStart();
                    else{
                        libArmyAnt._test();
                    }
                }
            },

            init: function () {
                if (this.nodeJs) {
                    this.nodeJs.fs["readFile"](libArmyAnt.config.dataRootDir + "data/libConfig.json", function (err, jsondata) {
                        if (err) {
                            console.error("ArmyAnt : load config " + libArmyAnt.config.dataRootDir + "data/libConfig.json failed !");
                        } else {
                            var data = JSON.parse(jsondata);
                            for (var key in data[0]) {
                                libArmyAnt.config[key] = data[0][key];
                            }
                        }
                    });
                    this.nodeJs.fs["readFile"](libArmyAnt.config.dataRootDir + "data/libInfo.json", function (err, jsondata) {
                        if (err) {
                            console.error("ArmyAnt : load config " + libArmyAnt.config.dataRootDir + "data/libInfo.json failed !");
                        } else {
                            var data = JSON.parse(jsondata);
                            libArmyAnt._onInitingModules += data[0]["libFiles"].length;
                            for (var key in data[0]) {
                                libArmyAnt.info[key] = data[0][key];
                            }
                        }
                        libArmyAnt._onInitialized(true);
                    });
                } else {
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
                    $.ajax({
                        type: "get",
                        url: libArmyAnt.config.rootDir + "data/libInfo.json",
                        cache: true,
                        async: false,
                        dataType: "json",
                        success: function (data) {
                            //load all library files
                            libArmyAnt._onInitingModules += data[0]["libFiles"].length;
                            for (var key in data[0]) {
                                libArmyAnt.info[key] = data[0][key];
                            }
                            libArmyAnt._onInitialized();
                        }
                    });
                }
            },

            _onInitializingModules: 0,
            _onInitializedModules:0,
            _onInitialized: function () {
                var rootPath =this.nodeJs?this.config.nodeRootDir:this.config.rootDir; 
                if (this._onInitingModules<=this._onInitializedModules && !this.loadedReady) {
                    console.log("ArmyAnt : Library loaded OK !");
                    this.loadedReady = true;
                    if (this.config.onLibLoad)
                        this.config.onLibLoad();
                    return ;
                }
                while(this.info["libFiles"][this._onInitializedModules].type != "script"){
                    switch(this.info["libFiles"][this._onInitializedModules].type) {
                        case "style":
                            this.importStyle(rootPath + this.info["libFiles"][this._onInitializedModules++]["path"]);
                            break;
                    }
                }
                this.importScript(rootPath + this.info["libFiles"][this._onInitializedModules++]["path"]);
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
            insertElement: function (typename, parentElem, properties) {
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
            importScript: function (url) {
                console.log("ArmyAnt : loading script " + url);
                if (this.nodeJs)
                    return require(url);
                return libArmyAnt.insertElement("script", document.head, {src: url, type: "text/javascript"});
            },

            /**
             * Dynamically insert css file
             * @param url : string
             *      The style file path
             * @return {HTMLElement}
             *      The style element reference in document
             */
            importStyle: function (url) {
                console.log("ArmyAnt : load style " + url);
                return libArmyAnt.insertElement("link", document.head, {
                    href: url,
                    type: "text/css",
                    rel: "stylesheet"
                });
            },

            _test:function(){
                (new libArmyAnt.Scheduler(1)).run(function(dt){document.getElementById('tester').innerHTML += ('<br/>delayTime='+dt);});
            }
        };

        libArmyAnt.init();

    } else {
        console.warn('ArmyAnt : The module name "libArmyAnt" has been defined !');
    }
})();
