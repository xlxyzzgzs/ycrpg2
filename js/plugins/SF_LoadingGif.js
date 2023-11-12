//=============================================================================
// Salted Fish Plugins - Loaidng Gif
// SF_LoadingGif.js
//=============================================================================

"use strict";
var Imported = Imported || {};
Imported.SF_LoadingGif = true;

var SF_Plugins = SF_Plugins || {};

//=============================================================================
/*~struct~tip:
 * @param tips
 * @desc The text to display in the tip.
 * @type text[]
 * @default []
 *
 * @param initialize
 * @text initialize function
 * @desc The function to call when the tip is initialized.
 * This function is called with the tip as the only argument.
 * This function is called only once when game started
 * @type note
 * @default ""
 *
 * @param create
 * @text create function
 * @desc The function to call when the tip is created.
 * This function is called when start loading
 * @type note
 * @default ""
 *
 * @param update
 * @text update function
 * @desc The function to call each frame.
 * @type note
 * @default ""
 *
 * @param terminate
 * @text terminate function
 * @desc The function to call when the tip is terminated.
 * @type note
 * @default ""
 *
 * @param canExit
 * @text can exit function
 * @desc The function to call to check if loading can be exited.
 * @type note
 * @default ""
 *
 */
/*~struct~gif:
 * @param gifs
 * @desc The gif to display.
 * @default
 * @type file[]
 *
 * @param initialize
 * @text initialize function
 * @desc The function to call when the tip is initialized.
 * This function is called with the tip as the only argument.
 * This function is called only once when game started
 * @type note
 * @default ""
 *
 * @param create
 * @text create function
 * @desc The function to call when the tip is created.
 * This function is called when start loading
 * @type note
 * @default ""
 *
 * @param update
 * @text update function
 * @desc The function to call each frame.
 * @type note
 * @default ""
 *
 * @param terminate
 * @text terminate function
 * @desc The function to call when the tip is terminated.
 * @type note
 * @default ""
 *
 * @param canExit
 * @text can exit function
 * @desc The function to call to check if loading can be exited.
 * @type note
 * @default "return true;"
 *
 */
/*:
 * @plugindesc v1.0.0 - Adds a loading gif to the game.
 * @author Salted Fish
 *
 * @param Loading Gif
 * @text Loading Gif
 * @desc The gif to display.
 * @default []
 * @type struct<gif>
 *
 * @param Tips
 * @text Tips
 * @desc The tips to display.
 * @default []
 * @type struct<tip>
 *
 *
 */

(function () {
    var SF_LoadingGif = {};
    SF_Plugins.SF_LoadingGif = SF_LoadingGif;
    SF_LoadingGif.version = 1.0;

    //=============================================================================
    // Parameters
    //=============================================================================

    SF_LoadingGif.Parameters = PluginManager.parameters("SF_LoadingGif");
    SF_LoadingGif.Param = SF_LoadingGif.Param || {};
    SF_LoadingGif.Param.LoadingGif = JSON.parse(SF_LoadingGif.Parameters["Loading Gif"] || "[]");
    SF_LoadingGif.Param.Tips = JSON.parse(SF_LoadingGif.Parameters["Tips"] || "[]");

    //=============================================================================
    // Loading_Tip
    //=============================================================================

    function Loading_Tip() {
        this.initialize.apply(this, arguments);
    }

    Loading_Tip.prototype = Object.create(PIXI.Text.prototype);
    Loading_Tip.prototype.constructor = Loading_Tip;

    Loading_Tip.prototype.initialize = function (tip) {
        PIXI.Text.call(this);

        this.tip = tip.tips;
        this.customFunc = {};
        this.customFunc.initialize = new Function("tip", JsonEx.parse(tip.initialize)).bind(this, this);
        this.customFunc.create = new Function("tip", JsonEx.parse(tip.create)).bind(this, this);
        this.customFunc.update = new Function("tip", JsonEx.parse(tip.update)).bind(this, this);
        this.customFunc.terminate = new Function("tip", JsonEx.parse(tip.terminate)).bind(this, this);
        this.customFunc.canExit = new Function("tip", JsonEx.parse(tip.canExit)).bind(this, this);
        this.customFunc.initialize();
    };

    Loading_Tip.prototype.create = function () {
        this.customFunc.create();
    };

    Loading_Tip.prototype.update = function () {
        this.customFunc.update();
    };

    Loading_Tip.prototype.terminate = function () {
        this.customFunc.terminate();
    };

    Loading_Tip.prototype.canExit = function () {
        return this.customFunc.canExit();
    };

    //=============================================================================
    // Loading_Gif
    //=============================================================================

    function Loading_Gif() {
        this.initialize.apply(this, arguments);
    }
})();
