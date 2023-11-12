//=============================================================================
// SaltedFish Plugins - Scene Title
// SF_SceneTitle.js
//=============================================================================

"use strict";
var Imported = Imported || {};
Imported.SF_SceneTitle = true;

var SF_Plugins = SF_Plugins || {};

//=============================================================================
/*:
 * @plugindesc Scene Title
 * @author SaltedFish
 *
 * @help
 *
 * This plugin does not provide plugin commands.
 *
 * overwrite:
 *  Scene_Title
 */
//=============================================================================

(function () {
    var SF_SceneTitle = {};
    SF_Plugins.SF_SceneTitle = SF_SceneTitle;

    SF_SceneTitle.version = 1.0;

    //=============================================================================
    // Scene_Title
    //=============================================================================

    Scene_Title.prototype.initialize = function () {
        Scene_Base.prototype.initialize.call(this);
        this.button_name = {
            start: [195, 400],
            load: [405, 400],
            exit: [605, 400],
            cg: [285, 452],
            music: [495, 452],
            qq_group: [756, 490],
        };
    };

    SF_SceneTitle.Scene_Title_create = Scene_Title.prototype.create;
    Scene_Title.prototype.create = function () {
        Scene_Base.prototype.create.call(this);
        this.createBackground();
        this.createWindowLayer();
        this.createGameTitle();
        this.createTitleButton();
    };

    Scene_Title.prototype.createBackground = function () {
        this._backgroundSprite = new Sprite(ImageManager.loadSceneTitle("back_ground"));
        this.addChild(this._backgroundSprite);
        this._backgroundSprite.move(0, 0);
    };

    Scene_Title.prototype.createGameTitle = function () {
        this._titleSprite = new Sprite(ImageManager.loadSceneTitle("game_title"));
        this.addChild(this._titleSprite);
        this._titleSprite.move(280, 122);
    };

    Scene_Title.prototype.createTitleButton = function () {
        for (var key in this.button_name) {
            var x = this.button_name[key][0];
            var y = this.button_name[key][1];
            var button = new Sprite_SFButton();
            button.setColdBitmap(ImageManager.loadSceneTitle(key + "_cold"));
            button.setHotBitmap(ImageManager.loadSceneTitle(key + "_hot"));
            button.setClickHandler(this["on_" + key + "_button"].bind(this));
            button.deactivate();
            button.move(x, y);
            this["_" + key + "_buttonSprite"] = button;
            this.addChild(button);
        }
    };

    Scene_Title.prototype.on_start_button = function () {
        this._start_buttonSprite.releasePointer();
        DataManager.setupNewGame();
        this.fadeOutAll();
        SceneManager.goto(Scene_Map);
    };

    Scene_Title.prototype.on_load_button = function () {
        this._load_buttonSprite.releasePointer();
        SceneManager.push(Scene_Load);
    };

    Scene_Title.prototype.on_exit_button = function () {
        this._exit_buttonSprite.releasePointer();
        SceneManager.exit();
        window.close();
    };

    Scene_Title.prototype.on_cg_button = function () {
        this._cg_buttonSprite.releasePointer();
        SceneManager.push(Scene_CG);
    };

    Scene_Title.prototype.on_music_button = function () {
        this._music_buttonSprite.releasePointer();
        SceneManager.push(Scene_Music);
    };

    Scene_Title.prototype.on_qq_group_button = function () {
        this._qq_group_buttonSprite.releasePointer();
        window.open("https://qm.qq.com/cgi-bin/qm/qr?k=4eiJfzkMBKVqv3ufNyOUjL_gbAC_7rcn&jump_from=webapi", "_blank");
    };

    Scene_Title.prototype.start = function () {
        Scene_Base.prototype.start.call(this);
        SceneManager.clearStack();
        this.playTitleMusic();
        this.startFadeIn(this.fadeSpeed(), false);
        for (var key in this.button_name) {
            this["_" + key + "_buttonSprite"].activate();
            this["_" + key + "_buttonSprite"].refresh();
        }
        if (!DataManager.isAnySavefileExists()) {
            this._load_buttonSprite.deactivate();
        }
        this._cg_buttonSprite.deactivate();
        this._music_buttonSprite.deactivate();
    };

    Scene_Title.prototype.update = function () {
        Scene_Base.prototype.update.call(this);
    };

    Scene_Title.prototype.isBusy = function () {
        return Scene_Base.prototype.isBusy.call(this);
    };
})();
