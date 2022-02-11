//=============================================================================
// Salted Fish Plugins - Auto Update
// SF_AutoUpdate.js
//=============================================================================

"use strict";
var Imported = Imported || {};
Imported.SF_AutoUpdate = true;

var SF_Plugins = SF_Plugins || {};

//=============================================================================
/*:
    * @plugindesc v1.0.0 - Automatically update the game.
    * @author Salted Fish
    * 
    * @help
    * 
    * ===========================================================================
    * Introduction
    * ===========================================================================
    * 
    * This plugin automatically updates the game.
    * 
    * ===========================================================================
    * Requires
    * ===========================================================================
    * 
    * You need use ycrpg2-android-client to run on android.
    * otherwise, you can use ycrpg2-pc-client to run on pc.
    * This is not supported on ios and web, but web also use the newest version.
    * 
    * ===========================================================================
    * How to use
    * ===========================================================================
    * 
    * ycrpg2-android-client provide FileUtils and UpdateUtils.
    * FileUtils is used to read and write Text files, and UpdateUtils is used to
    * update the game.
    * 
    * FileUtils provide the following functions:
    *	public void evaluateJavascript(String script) 
    *	public boolean canExecute(String fileName) 
    *	public boolean canRead(String fileName) 
    *	public boolean canWrite(String fileName) 
    *	public boolean createNewFile(String fileName) 
    *	public boolean delete(String fileName) 
    *	public boolean exists(String fileName) 
    *	public String getAbsolutePath(String fileName) 
    *	public String getCanonicalPath(String fileName) 
    *	public String getName(String fileName) 
    *	public String getParent(String fileName) 
    *	public String getPath(String fileName) 
    *	public boolean isAbsolute(String fileName) 
    *	public boolean isDirectory(String fileName) 
    *	public boolean isFile(String fileName) 
    *	public long lastModified(String fileName) 
    *	public long length(String fileName) 
    *	public String list(String fileName) 
    *	public boolean mkdir(String fileName) 
    *	public boolean mkdirs(String fileName) 
    *	public boolean renameTo(String srcName, String dstName) 
    *	public String toString(String fileName) 
    *	public String readTextFile(String fileName) 
    *	public boolean writeTextFile(String fileName,String content)
    *	public String getFileHashHex(String fileName, String algorithm)
    *	public String getFileHashHex(String fileName)
    *
    * UpdateUtils provide the following functions:
    *   public void evaluateJavascript(String script) 
    *   public void downloadFullUrl(String fileName, String urlString, String success, String fail) 
    *   public void downloadRelativeUrl(String fileName, String urlString, String success, String fail) 
    *   public void startUpdateFiles()
    *   public void updateFileCompleted(boolean bool) 
    *   public String getHashInfoJson() 
    *   public void updateFile(String fileName, String success, String fail) 
    */
//=============================================================================

(function () {
    var SF_AutoUpdate = {};
    SF_Plugins.SF_AutoUpdate = SF_AutoUpdate;

    SF_AutoUpdate.version = 1.0;

    SF_AutoUpdate.remoteFileInfoName = "file_info_remote.json";
    SF_AutoUpdate.localFileInfoName = "file_info_local.json";
    SF_AutoUpdate.remoteFileInfoUrl = "https://ycrpg.xyzzgame.com/ycrpg2/file_info_remote.json";
    SF_AutoUpdate.remoteUrlRoot = "https://ycrpg.xyzzgame.com/YCrpg2/";
    SF_AutoUpdate.emptyFileInfoStr = `{"is_file":false,"is_dir":true,"children":[],"sha_512":"","file_name":""}`;
    SF_AutoUpdate.workerFileName = "js/plugins/SF_AutoUpdateWorker.js";
    SF_AutoUpdate.localStorageKey = "SF_AutoUpdate_UpdateFileCompleted";

    SF_AutoUpdate.enableAutoUpdate = true;

    SF_AutoUpdate.isAndroid = function () {
        return !!window.FileUtils && !!window.UpdateUtils && !SF_AutoUpdate.isPC();
    }

    SF_AutoUpdate.isPC = function () {
        return !!Utils.isNwjs();
    }

    SF_AutoUpdate.isWeb = function () {
        return !SF_AutoUpdate.isPC() && !SF_AutoUpdate.isAndroid();
    }

    SF_AutoUpdate.isSupported = function () {
        return SF_AutoUpdate.enableAutoUpdate && (SF_AutoUpdate.isAndroid() || SF_AutoUpdate.isPC()) && !Utils.isOptionValid('test');
    }

    if (!SF_AutoUpdate.isSupported()) { return; }

    SF_AutoUpdate.FileUtils = window.FileUtils || {};
    SF_AutoUpdate.UpdateUtils = window.UpdateUtils || {};

    if (SF_AutoUpdate.isPC()) {
        window.FileUtils = SF_AutoUpdate.FileUtils;
        window.UpdateUtils = SF_AutoUpdate.UpdateUtils;

        var fs = require('fs');
        var path = require('path');
        var os = require('os');
        var crypto = require('crypto');
        var https = require('https');

        var httpsAgent = new https.Agent({
            keepAlive: true,
        });

        var options = {
            agent: httpsAgent,
        };

        SF_AutoUpdate.FileUtils.evaluateJavascript = function (script) {
            (new Function(script)).call(window);
        }

        SF_AutoUpdate.FileUtils.canExecute = function (fileName) {
            try {
                fs.accessSync(fileName, fs.X_OK);
                return true;
            } catch (e) {
                return false;
            }
        }

        SF_AutoUpdate.FileUtils.canRead = function (fileName) {
            try {
                fs.accessSync(fileName, fs.R_OK);
                return true;
            } catch (e) {
                return false;
            }
        }

        SF_AutoUpdate.FileUtils.canWrite = function (fileName) {
            try {
                fs.accessSync(fileName, fs.W_OK);
                return true;
            } catch (e) {
                return false;
            }
        }

        SF_AutoUpdate.FileUtils.createNewFile = function (fileName) {
            try {
                fs.writeFileSync(fileName, "");
                return true;
            } catch (e) {
                return false;
            }
        }

        SF_AutoUpdate.FileUtils.delete = function (fileName) {
            try {
                fs.unlinkSync(fileName);
                return true;
            } catch (e) {
                return false;
            }
        }

        SF_AutoUpdate.FileUtils.exists = function (fileName) {
            try {
                fs.accessSync(fileName, fs.F_OK);
                return true;
            } catch (e) {
                return false;
            }
        }

        SF_AutoUpdate.FileUtils.getAbsolutePath = function (fileName) {
            return path.resolve(fileName);
        }

        SF_AutoUpdate.FileUtils.getCanonicalPath = function (fileName) {
            return path.resolve(fileName);
        }

        SF_AutoUpdate.FileUtils.getName = function (fileName) {
            return path.basename(fileName);
        }

        SF_AutoUpdate.FileUtils.getParent = function (fileName) {
            return path.dirname(fileName);
        }

        SF_AutoUpdate.FileUtils.getPath = function (fileName) {
            return path.resolve(fileName);
        }

        SF_AutoUpdate.FileUtils.isAbsolute = function (fileName) {
            return path.isAbsolute(fileName);
        }

        SF_AutoUpdate.FileUtils.isDirectory = function (fileName) {
            return fs.statSync(fileName).isDirectory();
        }

        SF_AutoUpdate.FileUtils.isFile = function (fileName) {
            return fs.statSync(fileName).isFile();
        }

        SF_AutoUpdate.FileUtils.lastModified = function (fileName) {
            return fs.statSync(fileName).mtime.getTime();
        }

        SF_AutoUpdate.FileUtils.length = function (fileName) {
            return fs.statSync(fileName).size;
        }

        SF_AutoUpdate.FileUtils.mkdir = function (fileName) {
            try {
                fs.mkdirSync(fileName);
                return true;
            } catch (e) {
                return false;
            }
        }

        SF_AutoUpdate.FileUtils.mkdirs = function (fileName) {
            try {
                fs.mkdirSync(fileName, { recursive: true });
                return true;
            } catch (e) {
                return false;
            }
        }

        SF_AutoUpdate.FileUtils.reanmeTo = function (srcName, dstName) {
            try {
                fs.renameSync(oldFileName, newFileName);
                return true;
            } catch (e) {
                return false;
            }
        }

        SF_AutoUpdate.FileUtils.toString = function (fileName) {
            return path.resolve(fileName);
        }

        SF_AutoUpdate.FileUtils.readTextFile = function (fileName) {
            return fs.readFileSync(fileName, 'utf-8');
        }

        SF_AutoUpdate.FileUtils.writeTextFile = function (fileName, text) {
            return fs.writeFileSync(fileName, text, 'utf-8');
        }

        SF_AutoUpdate.FileUtils.getFileHashHex = function (fileName, algorithm) {
            var hash = crypto.createHash(algorithm || 'SHA512');
            var data = fs.readFileSync(fileName);
            hash.update(data);
            return hash.digest('hex');
        }

        SF_AutoUpdate.UpdateUtils.evaluateJavascript = function (script) {
            (new Function(script)).call(window);
        }

        SF_AutoUpdate.UpdateUtils.downloadFullUrl = function (fileName, url, success, fail) {
            var file = fs.createWriteStream(fileName);
            https.get(url, options, function (response) {
                response.pipe(file);
                file.on('finish', function () {
                    file.close(SF_AutoUpdate.UpdateUtils.evaluateJavascript.bind(SF_AutoUpdate.UpdateUtils, success));
                });
            }).on('error', function (err) {
                SF_AutoUpdate.UpdateUtils.evaluateJavascript.bind(SF_AutoUpdate.UpdateUtils, fail)(err.message);
            });
        }

        SF_AutoUpdate.UpdateUtils.downloadRelativeUrl = function (fileName, url, success, fail) {
            SF_AutoUpdate.UpdateUtils.downloadFullUrl(fileName, SF_AutoUpdate.remoteUrlRoot + url, success, fail);
        }

        SF_AutoUpdate.UpdateUtils.updateFileCompleted = function (isSuccess, needReload) {
            localStorage.setItem(SF_AutoUpdate.localStorageKey, JsonEx.stringify(isSuccess));
            if (isSuccess && needReload) {
                nw.Window.open(`chrome-extension://${chrome.runtime.id}/index.html`, { new_instance: true });
                nw.Window.get().close();
            }
        }

        SF_AutoUpdate.UpdateUtils.getHashInfoJson = function () {
            try {
                return fs.readFileSync(SF_AutoUpdate.localFileInfoName) || SF_AutoUpdate.emptyFileInfoStr;
            } catch (e) {
                return SF_AutoUpdate.emptyFileInfoStr;
            }
        }

        SF_AutoUpdate.UpdateUtils.updateFile = function (fileName, success, fail) {
            SF_AutoUpdate.UpdateUtils.downloadRelativeUrl(fileName, fileName, success, fail);
        }

        SF_AutoUpdate.UpdateUtils.startUpdateFiles = function () {
            localStorage.setItem(SF_AutoUpdate.localStorageKey, 'false');
        }

    }

    //=============================================================================
    // Scene_AutoUpdate
    //=============================================================================

    function Scene_AutoUpdate() {
        this.initialize.apply(this, arguments);
    }
    window.Scene_AutoUpdate = Scene_AutoUpdate;
    SF_AutoUpdate.Scene_AutoUpdate = Scene_AutoUpdate;

    Scene_AutoUpdate.prototype = Object.create(Scene_Base.prototype);
    Scene_AutoUpdate.prototype.constructor = Scene_AutoUpdate;

    Scene_AutoUpdate.prototype.initialize = function () {
        Scene_Base.prototype.initialize.call(this);
        this._localFileInfo = JsonEx.parse(UpdateUtils.getHashInfoJson());
        this._remoteFileInfo = {};

        this._updateFileList = [];
        this._updateFileIndex = 0;
        this._updateFileCount = 0;
        this._updateFile = {};

        this._updateSuccess = false;

        this._deleteFileList = [];

        this._status = "completed"; // "working", "completed"
        this._job = ""; // "fetch remote file info", "compare file info", "delete file", "update file"
        this._nextJob = "fetched remote file info";

        this._compareWorker = new Worker(SF_AutoUpdate.workerFileName);
        this._compareWorker.onmessage = this._onCompareWorkerMessage.bind(this);
    };

    Scene_AutoUpdate.prototype.create = function () {
        Scene_Base.prototype.create.call(this);
    }

    Scene_AutoUpdate.prototype.start = function () {
        Scene_Base.prototype.start.call(this);
    }

    Scene_AutoUpdate.prototype.update = function () {
        Scene_Base.prototype.update.call(this);
        this.updateJob();
        this.updateLoading();
    }

    Scene_AutoUpdate.prototype.updateLoading = function () {
        console.log(this._job, this._status);
    }

    Scene_AutoUpdate.prototype.updateJob = function () {
        if (this._status === "working") { return; }
        if (this._nextJob === "") {
            SceneManager.pop();
        }
        this._job = this._nextJob;
        this._status = "working";
        switch (this._job) {
            case "fetched remote file info":
                this.fetchRemoteFileInfo();
                this._nextJob = "compare file info";
                break;
            case "compare file info":
                this.compareFileInfo();
                this._nextJob = "delete file";
                break;
            case "delete file":
                this.deleteFile();
                this._nextJob = "update file";
                break;
            case "update file":
                this.updateFile();
                this._nextJob = "update completed";
                break;
            case "update completed":
                this._status = "completed";
                this._nextJob = "";
                FileUtils.writeTextFile(SF_AutoUpdate.localFileInfoName, JsonEx.stringify(this._remoteFileInfo));
                UpdateUtils.updateFileCompleted(this._updateSuccess, this._updateFileCount > 0);
                break;
        }
    }

    Scene_AutoUpdate.prototype.fetchRemoteFileInfo = function () {
        var success = (function () {
            this._remoteFileInfo = JsonEx.parse(FileUtils.readTextFile(SF_AutoUpdate.remoteFileInfoName));
            this._status = "completed";
        }).bind(this);

        var fail = (function () {
            this._status = "completed";
            this._nextJob = "";
        }).bind(this);

        UpdateUtils.downloadRelativeUrl(
            SF_AutoUpdate.remoteFileInfoName,
            SF_AutoUpdate.remoteFileInfoName,
            CallBack.registerOneTime(success),
            CallBack.registerOneTime(fail)
        );
    }

    Scene_AutoUpdate.prototype.compareFileInfo = function () {
        this._compareWorker.postMessage({
            "command": "compare",
            "local_file_info": this._localFileInfo,
            "remote_file_info": this._remoteFileInfo
        });
    }

    Scene_AutoUpdate.prototype._onCompareWorkerMessage = function (e) {
        var result = e.data;
        if (result.command === 'delete') {
            this._deleteFileList = this._deleteFileList.concat(result.file_list);
        } else if (result.command === 'update') {
            this._updateFileList = this._updateFileList.concat(result.file_list);
        } else {
            this._status = "completed";
        }
    }

    Scene_AutoUpdate.prototype.deleteFile = function () {
        UpdateUtils.startUpdateFiles();

        this._deleteFileList.forEach(function (file_info) {
            FileUtils.delete(file_info.file_name)
        });

        this._status = "completed";
    }

    Scene_AutoUpdate.prototype.updateFile = function () {
        this._updateFileIndex = 0;
        this._updateFileCount = this._updateFileList.length;
        if (this._updateFileCount === 0) {
            this._status = "completed";
            return;
        }
        this._updateFile = this._updateFileList[this._updateFileIndex];
        this.updateFileNext();
    }

    Scene_AutoUpdate.prototype.updateFileNext = function () {
        var success = (function () {
            this._updateFileIndex++;
            if (this._updateFileIndex >= this._updateFileCount) {
                this._status = "completed";
                this._updateSuccess = true;
            } else {
                this._updateFile = this._updateFileList[this._updateFileIndex];
                this.updateFileNext();
            }
        }).bind(this);

        var fail = (function () {
            // auto try again
            this.updateFileNext();
        }).bind(this);

        var file = this._updateFile;
        if (file.is_dir) {
            success();
            return;
        }

        if (!FileUtils.exists(FileUtils.getParent(file.file_name))) {
            FileUtils.mkdirs(FileUtils.getParent(file.file_name));
        }

        UpdateUtils.downloadRelativeUrl(
            file.file_name,
            file.file_name,
            CallBack.registerOneTime(success),
            CallBack.registerOneTime(fail)
        );
    }
    //=============================================================================
    // SceneManager
    //=============================================================================

    SF_AutoUpdate.SceneManager_initialize = SceneManager.initialize;
    SceneManager.initialize = function () {
        SF_AutoUpdate.SceneManager_initialize.call(this);
        this.addSceneBefore(Scene_AutoUpdate, Scene_Title);
    }

})();