/**
 * Created by Jason-Zhao-Jie on 2016/7/20.
 */

(function() {

    var libArmyAnt = require("../global.js");
    libArmyAnt.Object = require("../object.js");

    var File = libArmyAnt.Object.inherit({
        filename: "",
        file_descriptor: null,
        file_stats: null,

        ctor: function (filename, callback) {
            if (filename)
                this.open(filename, callback);
        },

        open: function (filename, callback) {
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
        },

        close: function (callback) {
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
        },

        read: function (buffer, pos, length, callback) {
            if (!this.file_descriptor)
                return false;
            libArmyAnt.nodeJs.fs.read(this.file_descriptor, buffer, 0, length, pos, function (err, bytesRead, buffer) {
                if (err) {
                    libArmyAnt.warn("Error in reading file ", this.filename, " , error code: ", err.code, ", error message: ", err.message);
                }
                callback(bytesRead, buffer);
            }.bind(this));
            return true;
        },

        write: function (buffer, pos, length, callback) {
            if (!this.file_descriptor)
                return false;
            libArmyAnt.nodeJs.fs.write(this.file_descriptor, buffer, 0, length, pos, function (err, bytesWritten, buffer) {
                if (err) {
                    libArmyAnt.warn("Error in writing file ", this.filename, " , error code: ", err.code, ", error message: ", err.message);
                }
                callback(bytesWritten, buffer);
            }.bind(this));
            return true;
        },

        readAllTextSync: function () {
            if (!this.file_descriptor)
                return null;
            var ret = Buffer.alloc(this.file_stats.size + 1);
            var err = libArmyAnt.nodeJs.fs.readSync(this.file_descriptor, ret, 0, this.file_stats.size + 1, 0);
            if (err)
                libArmyAnt.warn("Error in reading file ", this.filename, " , error code: ", err.code, ", error message: ", err.message);
            return ret.toString();
        }
    });

    File.readFile = function (filepath, callback) {
        libArmyAnt.nodeJs.fs.readFile(filepath, function (err, data) {
            if (err)
                libArmyAnt.warn("Error in reading file ", filepath, " , error code: ", err.code, ", error message: ", err.message);
            callback(!err, data);
        }.bind(this));
    }

    module.exports = File;
})();