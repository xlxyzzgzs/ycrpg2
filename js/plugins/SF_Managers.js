//=============================================================================
// Salted Fish Plugins - Managers
// SF_Managers.js
//=============================================================================
"use strict";
var Imported = Imported || {};
Imported.SF_Managers = true;

var SF_Plugins = SF_Plugins || {};
//=============================================================================
/*:
    * @plugindesc Managers lib for salted fish plugins
    * @author Salted Fish
    */
//=============================================================================

(function () {
    var SF_Managers = {};
    SF_Plugins.Managers = SF_Managers;

    SF_Managers.version = 1.0;

    //=============================================================================
    // ImageManager
    //=============================================================================

    ImageManager.loadSceneActor = function (filename) {
        return this.loadBitmap('img/scene_ui/scene_actor/', filename, 0, true);
    };

    ImageManager.loadSceneActorSelect = function (filename) {
        return this.loadBitmap('img/scene_ui/scene_actor_select/', filename, 0, true);
    }

    ImageManager.loadSceneTitle = function (filename) {
        return this.loadBitmap("img/scene_ui/scene_title/", filename, 0, true);
    }

    ImageManager.loadSceneMenu = function (filename) {
        return this.loadBitmap('img/scene_ui/scene_menu/', filename, 0, true);
    };

    ImageManager.loadSceneSplash = function (filename) {
        return this.loadBitmap('img/scene_ui/scene_splash/', filename, 0, true);
    }

    //=============================================================================
    // SceneManager
    //=============================================================================

    SceneManager._sceneBeforeClasses = {};

    SF_Managers.SceneManager_initialize = SceneManager.initialize;
    SceneManager.initialize = function () {
        SF_Managers.SceneManager_initialize.call(this);
        this._sceneBeforeClasses = {};
        this.initCallBack();
    };

    SF_Managers.SceneManager_goto = SceneManager.goto;
    SceneManager.goto = function (sceneClass) {
        if (this._sceneBeforeClasses[sceneClass]) {
            var beforeSceneList = this._sceneBeforeClasses[sceneClass];
            var index = beforeSceneList.indexOf(this._scene.constructor);
            if (index == -1) { // if the scene is not in the array
                this._stack.push(sceneClass);
                SF_Managers.SceneManager_goto.call(this, beforeSceneList[0]);
            } else if (index == beforeSceneList.length - 1) {
                SF_Managers.SceneManager_goto.call(this, sceneClass);
            } else {
                SF_Managers.SceneManager_goto.call(this, beforeSceneList[index + 1]);
            }
        } else {
            SF_Managers.SceneManager_goto.call(this, sceneClass);
        }
    }

    SceneManager.addSceneBefore = function (beforeSceneClass, sceneClass) {
        if (this._sceneBeforeClasses[sceneClass]) {
            this._sceneBeforeClasses[sceneClass].push(beforeSceneClass);
        } else {
            this._sceneBeforeClasses[sceneClass] = [beforeSceneClass];
        }
    }

    SceneManager.initCallBack = function () {
        CallBack.initialize();
    }

})();