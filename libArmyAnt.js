/**
 * Created by Jason Z.J on 2015/8/20.
 * @author Jason Z.J
 * @date 2015/8/20
 */


/**
 *
 */
(function () {

    /**
     * Check if the library is run on node.js or not
     * 检查运行环境是否是nodeJS
     * Warning: This library is incompatible with "require.js".
     * 警告：本库不能与require.js相互兼容
     * You do not need to use require.js when you use this library
     * 本库拥有与require.js类似的功能，没必要与require.js同时使用
     * This library depends on the jquery library. In web pages, you must add jquery script before this file
     * 本库依赖于jQuery库。在网页环境下，你必须在载入本库（本文件）之前先载入jquery脚本（任何较新版本）
     */

    if (typeof require === "undefined" && typeof libArmyAnt !== "undefined" && libArmyAnt) {
        console.warn('ArmyAnt : The module name "libArmyAnt" has been defined !');
    } else {
        /**
         * The base variable node of all this libArmyAnt content
         * 本库的基本命名空间，根节点
         */
        if (typeof require !== "undefined")
            global.$ = require('jquery');
        var libArmyAnt = {

            /**
             * The version of library
             * 本库的版本号
             */
            version: {
                major: 1,
                minor: 0,
                publish: 0,
                build: 0,
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
            nodeJs: (typeof require === "undefined" || !require) ? null : {
                http: require("http"),
                url: require("url"),
                fs: require("fs"),
                child_process: require("child_process"),
                querystring: require("querystring"),
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
                 * 这是本库载入成功后会立即执行的方法，可以认为是入口方法，或者是本库载入完毕的回调方法
                 */
                onLibLoad: function () {
                    libArmyAnt._testLoad();
                }
            },

            /**
             * The initialization function which called in library loading. Don't call it anyway others
             * 载入时的初始化方法，这是自动调用的，不需要（也不应该）手动调用它
             */
            init: function () {
                // node.js环境下，调用系统API直接读取本地磁盘上的文件，HTML5环境下发送虚拟ajax请求获取json数据
                if (this.nodeJs) {
                    this.nodeJs.fs["readFile"](libArmyAnt.config.nodeRootDir + "data/libConfig.json", function (err, jsonData) {
                        if (err) {
                            console.error("ArmyAnt : load config " + libArmyAnt.config.nodeRootDir + "data/libConfig.json failed !");
                        } else {
                            var data = JSON.parse(jsonData);
                            for (var key in data[0]) {
                                if (data[0].hasOwnProperty(key))
                                    libArmyAnt.config[key] = data[0][key];
                            }
                        }
                        libArmyAnt._onInitialized();
                    });
                    this.nodeJs.fs["readFile"](libArmyAnt.config.nodeRootDir + "data/libInfo.json", function (err, jsonData) {
                        if (err) {
                            console.error("ArmyAnt : load config " + libArmyAnt.config.nodeRootDir + "data/libInfo.json failed !");
                        } else {
                            var data = JSON.parse(jsonData);
                            libArmyAnt._onInitializingModules += data[0]["libFiles"].length + data[0]["nodeJsFiles"].length;
                            for (var key in data[0]) {
                                if (data[0].hasOwnProperty(key))
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
                                if (data[0].hasOwnProperty(key))
                                    libArmyAnt.config[key] = data[0][key];
                            }
                            libArmyAnt._onInitialized();
                        },
                        error: function (data, err, exception) {
                            console.error("ArmyAnt : load config " + libArmyAnt.config.nodeRootDir + "data/libConfig.json failed !");
                            libArmyAnt._onInitialized();
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
                            libArmyAnt._onInitializingModules += data[0]["libFiles"].length + data[0]["webPageFiles"].length;
                            for (var key in data[0]) {
                                if (data[0].hasOwnProperty(key))
                                    libArmyAnt.info[key] = data[0][key];
                            }
                            libArmyAnt._onInitialized();
                        },
                        error: function (data, err, exception) {
                            console.error("ArmyAnt : load config " + libArmyAnt.config.nodeRootDir + "data/libInfo.json failed !");
                            libArmyAnt._onInitialized();
                        }
                    });
                }
            },

            // 需要载入的模块总数
            _onInitializingModules: 0,
            // 已经载入完毕的模块数
            _onInitializedModules: -1,
            // 模块载入方法，由init方法调用
            _onInitialized: function () {
                if (this._onInitializedModules < 0) {
                    this._onInitializedModules = 0;
                    return;
                }
                var rootPath = this.config.dataRootDir;
                if (this.nodeJs) {
                    for (var i = 0; i < this.info["libFiles"].length; ++i) {
                        ++this._onInitializedModules;
                        if (this.info["libFiles"][i].name === null) {
                            console.log("ArmyAnt : Library " + this.info["libFiles"][i].path + " will be loaded later.");
                            continue;
                        }
                        if (this.info["libFiles"][i].name === "") {
                            var ret = this.importScript('./' + this.info["libFiles"][i].path);
                            for (var k in ret) {
                                if (ret.hasOwnProperty(k) && !this[k])
                                    this[k] = ret[k];
                            }
                            ret.config.setDebugMode(this.config["debugMode"]);
                        } else {
                            this[this.info["libFiles"][i].name] = this.importScript('./' + this.info["libFiles"][i].path);
                        }
                    }
                    for (var i = 0; i < this.info["nodeJsFiles"].length; ++i) {
                        ++this._onInitializedModules;
                        if (this.info["nodeJsFiles"][i].name === null) {
                            console.log("ArmyAnt : Library " + this.info["nodeJsFiles"][i].path + " will be loaded later.");
                        } else {
                            this[this.info["nodeJsFiles"][i].name] = this.importScript('./' + this.info["nodeJsFiles"][i].path);
                        }
                    }
                }
                if (this._onInitializingModules <= this._onInitializedModules && !this.loadedReady) {
                    console.log("ArmyAnt : Library loaded OK !");
                    this.loadedReady = true;
                    if (this.config.onLibLoad)
                        this.config.onLibLoad();
                    return;
                }
                var currMod = null;
                var libFileLength = this.info["libFiles"].length;
                do {
                    if (this._onInitializedModules < libFileLength)
                        currMod = this.info["libFiles"][this._onInitializedModules];
                    else if (this.nodeJs)
                        currMod = this.info["nodeJsFiles"][this._onInitializedModules - libFileLength];
                    else
                        currMod = this.info["webPageFiles"][this._onInitializedModules - libFileLength];
                    ++this._onInitializedModules;
                } while (typeof currMod === "undefined" || !currMod);
                switch (currMod.type) {
                    case "style":
                        this.importStyle(rootPath + currMod["path"]);
                        break;
                    default:
                        this.importScript(rootPath + currMod["path"]);
                }
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
             *      如果是在node.js环境中，则此方法将不起作用，并且总是返回null
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
             *      If you worked at node.js application, this function shall not work, and always returned null.
             *      如果是在node.js环境中，则此方法将不起作用，并且总是返回null
             */
            importStyle: function (url) {
                console.log("ArmyAnt : load style " + url);
                return libArmyAnt.insertElement("link", document.head, {
                    href: url,
                    type: "text/css",
                    rel: "stylesheet"
                });
            },

            // 以下方法用于测试
            _testLoad: function () {
                if (libArmyAnt.nodeJs)
                    global.serverHost.onStart();
                else {
                    window._test_clicked = 0;
                    window._test = {};
                }
            },
            _test: function () {

                switch (window._test_clicked) {
                    case 0:
                        //(new libArmyAnt.Scheduler(1)).run(function(dt){document.getElementById('tester').innerHTML += ('<br/>delayTime='+dt);});
                        window._test.cvs = libArmyAnt.animation.factory.getMaker(libArmyAnt.animation.realization.canvas,
                            document.getElementById("animation_tester"),
                            {width: 640, height: 960, style: ""});
                        window._test.scene = window._test.cvs.createScene("starter", 0, 0, 640, 960);
                        libArmyAnt.log("Canvas created!");
                        break;
                    case 1:
                        window._test.avatar = libArmyAnt.animation.IAvatar.create(libArmyAnt.animation.realization.canvas,
                            libArmyAnt.animation.IAvatar.Type.color, {color: "red"});
                        window._test.scene.background = window._test.avatar;
                        libArmyAnt.log("Red avatar enjoyed");
                        break;
                    case 2:
                        window.picture_img = new Image();
                        window.picture_img.onload = function () {
                            window._test.picture = libArmyAnt.animation.IAvatar.create(libArmyAnt.animation.realization.canvas,
                                libArmyAnt.animation.IAvatar.Type.image, {img: window.picture_img, imgX: 10, imgY: 10});
                            window._test.scene.createSprite("pic", window._test.picture, 10, 10, 60, 60);
                            libArmyAnt.log("Picture avatar enjoyed");
                        }.bind(window.picture_img);
                        window.picture_img.src = "testResources/Actor01-Braver01_1_1.png";
                        break;
                }
                ++window._test_clicked;
            }
        };

        // Automatically calls the initialization function
        // 自动调用初始化方法
        libArmyAnt.init();

        /**
         * Do different works in different environment.
         * 不同环境下将采取不同操作
         * Export whole library in node.js
         * 在NodeJS下将export整个库
         * Bind the whole library to global "window.libArmyAnt" in web pages
         * 在网页环境下则会将库绑定到全局变量window.libArmyAnt上
         * Some others files in this library which used in both node.js and web pages, also do this in theirs file ending
         * 本库其他一些同时适用于NodeJS和前端页面的库也采用了此方式
         */
        if (libArmyAnt.nodeJs)
            module.exports = libArmyAnt;
        else
            window.libArmyAnt = libArmyAnt;

    }

})();