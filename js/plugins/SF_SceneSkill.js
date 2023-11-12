//=============================================================================
// Salted Fish Plugins - Scene SKill
// SF_SceneSkill.js
//=============================================================================

"use strict";
var Imported = Imported || {};
Imported.SF_SceneSkill = true;

var SF_Plugins = SF_Plugins || {};

//=============================================================================
/*:
 * @plugindesc v1.0.0 - Scene Skill
 * @author Salted Fish
 *
 *
 * @help
 *
 * ===========================================================================
 * Introduction
 * ===========================================================================
 *
 * This plugin is used to show the skill list.
 * Any config just change the file.
 *
 */
//=============================================================================

(function () {
    var SF_SceneSkill = {};
    SF_Plugins.SF_SceneSkill = SF_SceneSkill;

    SF_SceneSkill.version = 1.0;

    //=============================================================================
    // Window_UserSelect
    //=============================================================================

    function Window_UserSelect() {
        this.initialize.apply(this, arguments);
    }

    SF_SceneSkill.Window_UserSelect = Window_UserSelect;
    window.Window_UserSelect = Window_UserSelect;

    Window_UserSelect.prototype = Object.create(Window_PagingBase.prototype);
    Window_UserSelect.prototype.constructor = Window_UserSelect;

    Window_UserSelect.prototype.initialize = function () {
        Window_PagingBase.prototype.initialize.apply(this, arguments);
        this.refresh();
    };

    //=============================================================================
    // Scene_Skill
    //=============================================================================
})();
