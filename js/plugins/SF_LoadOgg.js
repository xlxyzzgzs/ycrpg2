//=============================================================================
// SaltedFish Plugins - Load Ogg Audio File
// SF_LoadOgg.js
//=============================================================================
"use strict";
var Imported = Imported || {};
Imported.SF_LoadOgg = true;

var SF_Plugins = SF_Plugins || {};

//=============================================================================
/*:
 * @plugindesc force load ogg audio file
 * @author SaltedFish
 *
 * @help
 * just enable this plugin.
 */
//=============================================================================

SF_Plugins.SF_LoadOgg = SF_Plugins.SF_LoadOgg || {};
SF_Plugins.SF_LoadOgg.version = 1.0;

SF_Plugins.SF_LoadOgg.AudioManager_audioFileExt = AudioManager.audioFileExt;
AudioManager.audioFileExt = function () {
    return ".ogg";
};
