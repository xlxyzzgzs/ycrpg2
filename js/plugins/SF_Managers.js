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

})();