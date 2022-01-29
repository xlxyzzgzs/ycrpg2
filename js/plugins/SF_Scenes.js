//=============================================================================
// Salted Fish Plugins - Scenes
// SF_Scenes.js
//=============================================================================
"use strict";
var Imported = Imported || {};
Imported.SF_Scenes = true;

var SF_Plugins = SF_Plugins || {};

//=============================================================================
/*:
    * @plugindesc scenes lib for salted fish plugins
    * @author Salted Fish
    */
//=============================================================================

(function () {
    var SF_Scenes = {};
    SF_Plugins.SF_Scenes = SF_Scenes;

    SF_Scenes.version = 1.0;

    //=============================================================================
    // Scene_Base
    //=============================================================================

    SF_Scenes.Scene_Base_terminate = Scene_Base.prototype.terminate;
    Scene_Base.prototype.terminate = function () {
        SF_Scenes.Scene_Base_terminate.call(this);
        TouchInput.removeUsers();
    }
})();