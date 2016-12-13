/**
 * Created by Jason Z.J on 2015/8/20.
 * @author Jason Z.J
 * @date 2015/8/20
 */


/**
 *
 */

(function() {
    if (!(typeof libArmyAnt != "undefined" && libArmyAnt)) {

        /**
         * The base variable node of all this libArmyAnt content
         * 本库的基本命名空间，根节点
         */
        var libArmyAnt = this.libArmyAnt = {

            /**
             * The version of library
             * 本库的版本号
             */
            version: {
                major: 0,
                minor: 0,
                publish: 0,
                build: 2,
                toNumeric: function () {
                    return this.major * 256 * 256 * 256 + this.minor * 256 * 256 + this.publish * 256 + this.build;
                },
                toString: function () {
                    return this.major + "." + this.minor + "." + this.publish + "." + this.build + ".";
                }
            },

            /**
             * If in the node.js environment, this object contains every modules from node.js system packages.
             * If out of the node.js, this variable is null.
             * 如果在node.js环境中使用本库，此节点将会自动获取node.js的几个常用库，和本库所依赖的node.js的库
             * 如果不在node.js环境下，此节点为null。可据此判断是否具有node.js环境
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
             * 当本库全部载入完成时，此标记置为true
             */
            loadedReady: false,

            /**
             * The information of this library, loaded from "libInfo.json"
             * 本库的一些信息，载入自数据文件“libInfo.json”
             */
            info: {},

            /**
             * The configurations of this library, some of it is loaded from "libConfig.json"
             * 本库的一些配置，除下述节点外，还包括从数据文件“libConfig.json”中载入的配置项
             */
            config: {
                /**
                 * Please change these string value when you use this library in your project
                 * 本库的一些路径参数，记录着你的项目的工作目录。只有设置正确，才能成功载入本库。
                 * 很多情况下，你不会（也不应该）把本库直接放置在工作目录的根目录，因此有必要对这些项进行配置
				 * rootDir代表从你服务器脚本所在目录，到你的网站的前端根目录的相对路径
				 * nodeRootDir代表从你服务器脚本所在目录，到本文件所在目录的相对路径
				 * dataRootDir代表从你的网站的前端根目录，到本文件所在目录的相对路径
                 */
                rootDir: "./",
                nodeRootDir: "./",
                dataRootDir: "./",
                /**
                 * The function will be executed after the library is loaded ready
                 * 这是本库载入成功后会立即执行的函数，可以认为是入口函数，或者是本库载入完毕的回调函数
                 */
                onLibLoad: function(){
                    if(libArmyAnt.nodeJs)
                        serverHost.onStart();
                    else{
                        libArmyAnt._test();
                    }
                }
            },

            /**
             * The initialization function which called in library loading. Don't call it anyway others
             * 载入时的初始化函数，这是自动调用的，不需要（也不应该）手动调用它
             */
            init: function () {
                // node.js环境下，调用系统API直接读取本地磁盘上的文件，HTML5环境下发送虚拟ajax请求获取json数据
                if (this.nodeJs) {
                    this.nodeJs.fs["readFile"](libArmyAnt.config.nodeRootDir + "data/libConfig.json", function (err, jsondata) {
                        if (err) {
                            console.error("ArmyAnt : load config " + libArmyAnt.config.nodeRootDir + "data/libConfig.json failed !");
                        } else {
                            var data = JSON.parse(jsondata);
                            for (var key in data[0]) {
                                libArmyAnt.config[key] = data[0][key];
                            }
                        }
                    });
                    this.nodeJs.fs["readFile"](libArmyAnt.config.nodeRootDir + "data/libInfo.json", function (err, jsondata) {
                        if (err) {
                            console.error("ArmyAnt : load config " + libArmyAnt.config.nodeRootDir + "data/libInfo.json failed !");
                        } else {
                            var data = JSON.parse(jsondata);
                            libArmyAnt._onInitializingModules += data[0]["libFiles"].length;
                            for (var key in data[0]) {
                                libArmyAnt.info[key] = data[0][key];
                            }
                        }
                        libArmyAnt._onInitialized(true);
                    });
                } else {
                    $.ajax({
                        type: "get",
                        url: libArmyAnt.config.dataRootDir + "data/libConfig.json",
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
                        url: libArmyAnt.config.dataRootDir + "data/libInfo.json",
                        cache: true,
                        async: false,
                        dataType: "json",
                        success: function (data) {
                            //load all library files
                            libArmyAnt._onInitializingModules += data[0]["libFiles"].length;
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
                var rootPath = this.nodeJs?"./":this.config.dataRootDir;
                if (this._onInitializingModules <= this._onInitializedModules && !this.loadedReady) {
                    console.log("ArmyAnt : Library loaded OK !");
                    this.loadedReady = true;
                    if (this.config.onLibLoad)
                        this.config.onLibLoad();
                    return;
                }
                var currMod = this.info["libFiles"][this._onInitializedModules];
                while (typeof currMod != "undefined" && currMod.type != "script") {
                    switch (this.info["libFiles"][this._onInitializedModules].type) {
                        case "style":
                            this.importStyle(rootPath + this.info["libFiles"][this._onInitializedModules++]["path"]);
                            break;
                    }
                    currMod = this.info["libFiles"][this._onInitializedModules];
                }
                this.importScript(rootPath + this.info["libFiles"][this._onInitializedModules++]["path"]);
            },

            /**
             * Dynamically insert an HTML element
             * 动态嵌入一个HTML元素。
             * @param typename : string
             *      The type of the element you will add
             *      要添加的HTML元素的类型名
             * @param parentElem : HTMLElement
             *      The parent element node you will add to
             *      要添加到哪个HTML元素之下。可以是head或者body
             * @param properties : Object
             *      The properties of this element you will add
             *      要添加的HTML元素的属性集
             * @returns {HTMLElement}
             *      The element you add
             *      返回你添加成功的元素引用。如果元素创建失败，返回null
             *      If you worked at node.js application, this function shall not work, and always returned null.
             *      如果实在node.js环境中，则此函数将不起作用，并且总是返回null
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
             * 动态添加/载入一个javascript脚本
             * @param url : string
             *      The javascript file path
             *      要添加的javascript文件的路径
             * @return {HTMLElement / Object}
             *      HTMLElement : The script element reference in document
             *      当在HTML环境下时，该方法返回添加成功的script元素引用。如果创建失败，返回null
             *      Object : the module root of the node.js require returned
             *      当在node.js环境下时，返回载入成功的javascript模块引用。载入失败时，返回null
             */
            importScript: function (url) {
                console.log("ArmyAnt : loading script " + url);
                if (this.nodeJs)
                    return require(url);
                return libArmyAnt.insertElement("script", document.head, {src: url, type: "text/javascript"});
            },

            /**
             * Dynamically insert css file
             * 动态加载一个css布局style文件
             * @param url : string
             *      The style file path
             *      要添加的style文件路径
             * @return {HTMLElement}
             *      The style element reference in document
             *      返回添加成功的style元素的引用
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
