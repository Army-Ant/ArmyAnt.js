/**
 * Created by Jason-Zhao-Jie on 2016/7/20.
 */

/**
 * Copyright (c) 2015 ArmyAnt
 * 版权所有 (c) 2015 ArmyAnt
 *
 * Licensed under the BSD License, Version 2.0 (the License);
 * 本软件使用BSD协议保护, 协议版本:2.0
 * you may not use this file except in compliance with the License.
 * 使用本开源代码文件的内容, 视为同意协议
 * You can read the license content in the file "LICENSE" at the root of this project
 * 您可以在本项目的根目录找到名为"LICENSE"的文件, 来阅读协议内容
 * You may also obtain a copy of the License at
 * 您也可以在此处获得协议的副本:
 *
 *     http://opensource.org/licenses/BSD-3-Clause
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 除非法律要求或者版权所有者书面同意,本软件在本协议基础上的发布没有任何形式的条件和担保,无论明示的或默许的.
 * See the License for the specific language governing permissions and limitations under the License.
 * 请在特定限制或语言管理权限下阅读协议
 */
"use strict";
import libArmyAnt from "../global.js"

/**
 * The file reader included the simplified node.js file operation
 * 封装了一些操作来简化node.js的文件操作
 * @type {class}
 */

export default class File {

    /**
     * if new this object with params, the file will be open at the same time
     * 如果构造函数带参，则会在创建此对象后立刻打开参数所指定的文件
     * @param filename : string
     *          The file opened when create the object, if need;
     * @param callback : function （See the function "open"）
     *          The callback after file opened when create the object, if need;
     */
    constructor(filename, callback) {
        this.filename = "";
        this.file_descriptor = null;
        this.file_stats = null;
        if (filename)
            this.open(filename, callback);
    }

    /**
     * Open the file
     * 打开文件
     * @param filename : string
     *          If the filename is invalid, The file which is opened last time will be open again. If this is the first time to call "open", the open will return false
     * @param callback : function     undefined Function(isSuccess(boolean))
     *          The callback will told you whether the file opened successful or not
     * @returns {boolean}
     */
    open(filename, callback) {
        if (this.file_descriptor)
            return false;
        if (filename) {
            this.filename = filename;
        } else {
            return false;
        }
        libArmyAnt.nodeJs.fs.open(filename, "a+", function (err, fd) {
            if (!err) {
                this.file_descriptor = fd;
                libArmyAnt.nodeJs.fs.stat(filename, function (err, stat) {
                    if (!err) {
                        this.file_stats = stat;
                    } else
                        libArmyAnt.warn("Get the status of file ", filename, " failed, error code: ", err.code, ", error message: ", err.message);
                    callback(!err);
                }.bind(this));
            } else {
                libArmyAnt.warn("Open the file ", filename, " failed, error code: ", err.code, ", error message: ", err.message);
                callback(!err);
            }
        }.bind(this));
        return true;
    }

    /**
     * Close the file
     * @param callback : function     undefined Function(isSuccess(boolean))
     *          The callback will told you whether the file closed successful or not
     */
    close(callback) {
        if (this.file_descriptor)
            libArmyAnt.nodeJs.fs.close(this.file_descriptor, function (err) {
                if (!err) {
                    this.file_descriptor = null;
                    this.file_stats = null;
                } else {
                    libArmyAnt.warn("Close the file ", filename, " failed, error code: ", err.code, ", error message: ", err.message);
                }
                callback(!err);
            }.bind(this));
    }

    /**
     * Read data from the opened file
     * @param buffer : Buffer
     *          The node.js buffer that you want to receive the data read from this file
     * @param pos : numeric
     *          The position in file that you want to read begin
     * @param length : numeric
     *          The max data length that you want to read from file
     * @param callback : function     undefined Function(error(Error), bytesRead(Numeric), buffer(Buffer))
     *          The function will be called after read success or failure. If failed, the error param will be not empty
     * @returns {boolean} : If there is no file opened, the function will return false
     */
    read(buffer, pos, length, callback) {
        if (!this.file_descriptor)
            return false;
        libArmyAnt.nodeJs.fs.read(this.file_descriptor, buffer, 0, length, pos, function (err, bytesRead, buffer) {
            if (err) {
                libArmyAnt.warn("Error in reading file ", this.filename, " , error code: ", err.code, ", error message: ", err.message);
            }
            callback(err, bytesRead, buffer);
        }.bind(this));
        return true;
    }

    /**
     * Write data to the opened file
     * @param buffer : Buffer
     *          The node.js buffer that you want to write data from
     * @param pos : numeric
     *          The position in file that you want to write begin
     * @param length : numeric
     *          The max data length that you want to write to file
     * @param callback : function     undefined Function(error(Error), bytesWritten(Numeric), buffer(Buffer))
     *          The function will be called after write success or failure. If failed, the error param will be not empty
     * @returns {boolean} : If there is no file opened, the function will return false
     */
    write(buffer, pos, length, callback) {
        if (!this.file_descriptor)
            return false;
        libArmyAnt.nodeJs.fs.write(this.file_descriptor, buffer, 0, length, pos, function (err, bytesWritten, buffer) {
            if (err) {
                libArmyAnt.warn("Error in writing file ", this.filename, " , error code: ", err.code, ", error message: ", err.message);
            }
            callback(err, bytesWritten, buffer);
        }.bind(this));
        return true;
    }

    /**
     * Quickly read all text from the opened file sync.
     * @returns {string/null}    The result will be returned here, or null will be returned if the file is not opened or file operation failed
     */
    readAllTextSync() {
        if (!this.file_descriptor)
            return null;
        let ret = Buffer.alloc(this.file_stats.size + 1);
        let err = libArmyAnt.nodeJs.fs.readSync(this.file_descriptor, ret, 0, this.file_stats.size + 1, 0);
        if (err) {
            libArmyAnt.warn("Error in reading file ", this.filename, " , error code: ", err.code, ", error message: ", err.message);
            return null;
        }
        return ret.toString();
    }


    /**
     * Static reading function to read whole file
     * @param filepath : string
     *          The file path you want to read from
     * @param callback : function     undefined Function(isSuccess(Boolean), data)
     */
    static readFile(filepath, callback) {
        libArmyAnt.nodeJs.fs.readFile(filepath, function (err, data) {
            if (err)
                libArmyAnt.warn("Error in reading file ", filepath, " , error code: ", err.code, ", error message: ", err.message);
            callback(!err, data);
        }.bind(this));
    }
}
