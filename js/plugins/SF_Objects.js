//=============================================================================
// Salted Fish Plugins - Objects
// SF_Objects.js
//=============================================================================
"use strict";
var Imported = Imported || {};
Imported.SF_Objects = true;

var SF_Plugins = SF_Plugins || {};
//=============================================================================
/*:
    * @plugindesc objects lib for salted fish plugins
    * @author Salted Fish
    */
//=============================================================================

(function () {
    var SF_Objects = {};
    SF_Plugins.Objects = SF_Objects;

    SF_Objects.version = 1.0;

    //=============================================================================
    // Game_Action
    //=============================================================================

    SF_Objects.Game_Action_applyCritical = Game_Action.prototype.applyCritical;
    Game_Action.prototype.applyCritical = function (damage) {
        return damage * 2.4;
    };
})();