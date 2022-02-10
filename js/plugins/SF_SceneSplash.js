//=============================================================================
// Salted Fish Plugins - Scene Splash
// SF_SceneSplash.js
//=============================================================================

"use strict";
var Imported = Imported || {};
Imported.SF_SceneSplash = true;

var SF_Plugins = SF_Plugins || {};

//=============================================================================
/*:
    * @plugindesc v1.0.0 - Scene Splash
    * @author Salted Fish
    *
    * @help
    *
    * ===========================================================================
    * Introduction
    * ===========================================================================
    *
    * This plugin adds a splash scene after Scene_Boot.
    */
//=============================================================================

(function () {
    var SF_SceneSplash = {};
    SF_Plugins.SF_SceneSplash = SF_SceneSplash;

    SF_SceneSplash.version = 1.0;

    SF_SceneSplash.FADE_IN_FRAMES = 60; // Number of frames for the fade in effect.
    SF_SceneSplash.FADE_OUT_FRAMES = 60;// Number of frames for the fade out effect.
    SF_SceneSplash.SHOW_TIME = 150;// Number of frames for the splash to be shown.

    //=============================================================================
    // Sprite_SplashBase
    //=============================================================================

    function Sprite_SplashBase() {
        this.initialize.apply(this, arguments);
    }

    Sprite_SplashBase.prototype = Object.create(Sprite.prototype);
    Sprite_SplashBase.prototype.constructor = Sprite_SplashBase;

    Sprite_SplashBase.prototype.initialize = function (index) {
        Sprite.prototype.initialize.call(this);
        this.state = "fadeIn";// "fadeIn", "show", "fadeOut"
        this.FADE_IN_FRAMES = SF_SceneSplash.FADE_IN_FRAMES;
        this.FADE_OUT_FRAMES = SF_SceneSplash.FADE_OUT_FRAMES;
        this.SHOW_TIME = SF_SceneSplash.SHOW_TIME;
        this.index = index;
        this.showTime = 0;
        this.opacity = 0;
    }

    Sprite_SplashBase.prototype.update = function () {
        Sprite.prototype.update.call(this);

        if (TouchInput.isTriggered()) {
            this.state = "fadeOut";
        }

        if (this.state === "fadeIn") {
            this.updateFadeIn();
        } else if (this.state === "show") {
            this.updateShow();
        } else if (this.state === "fadeOut") {
            this.updateFadeOut();
        }
    }

    Sprite_SplashBase.prototype.updateFadeIn = function () {
        this.opacity += 255 / this.FADE_IN_FRAMES;
        if (this.opacity >= 255) {
            this.opacity = 255;
            this.state = "show";
        }
    }

    Sprite_SplashBase.prototype.updateShow = function () {
        this.opacity = 255;
        this.updateShowTime();
    }

    Sprite_SplashBase.prototype.updateShowTime = function () {
        this.showTime++;
        if (this.showTime >= this.SHOW_TIME) {
            this.state = "fadeOut";
        }
    }

    Sprite_SplashBase.prototype.updateFadeOut = function () {
        this.opacity -= 255 / this.FADE_OUT_FRAMES;
        if (this.opacity <= 0) {
            this.opacity = 0;
            this.state = "fadeIn";
            this.showTime = 0;

            if (this.index + 1 < SF_SceneSplash.SpriteClassList.length) {
                var spriteClass = SF_SceneSplash.SpriteClassList[this.index + 1];
                var sprite = new spriteClass(this.index + 1);
                this.parent.addChild(sprite);
            } else {
                SceneManager.pop();
            }

            this.parent.removeChild(this);
        }
    }

    Sprite_SplashBase.prototype.centerSelf = function () {
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.x = Graphics.width / 2;
        this.y = Graphics.height / 2;
    }

    //=============================================================================
    // Sprite_SplashLogo
    //=============================================================================

    function Sprite_SplashLogo() {
        this.initialize.apply(this, arguments);
    }

    Sprite_SplashLogo.prototype = Object.create(Sprite_SplashBase.prototype);
    Sprite_SplashLogo.prototype.constructor = Sprite_SplashLogo;

    Sprite_SplashLogo.prototype.initialize = function (index) {
        Sprite_SplashBase.prototype.initialize.call(this, index);
        this.bitmap = ImageManager.loadSceneSplash("spalsh_logo");
        this.centerSelf();
    }

    //=============================================================================
    // Sprite_SplashHealthTip
    //=============================================================================

    function Sprite_SplashHealthTip() {
        this.initialize.apply(this, arguments);
    }

    Sprite_SplashHealthTip.prototype = Object.create(Sprite_SplashBase.prototype);
    Sprite_SplashHealthTip.prototype.constructor = Sprite_SplashHealthTip;

    Sprite_SplashHealthTip.prototype.initialize = function (index) {
        Sprite_SplashBase.prototype.initialize.call(this, index);
        this.bitmap = ImageManager.loadSceneSplash("spalsh_health_tip");
        this.centerSelf();
    }

    //=============================================================================
    // Sprite_SplashAdapted
    //=============================================================================

    function Sprite_SplashAdapted() {
        this.initialize.apply(this, arguments);
    }

    Sprite_SplashAdapted.prototype = Object.create(Sprite_SplashBase.prototype);
    Sprite_SplashAdapted.prototype.constructor = Sprite_SplashAdapted;

    Sprite_SplashAdapted.prototype.initialize = function (index) {
        Sprite_SplashBase.prototype.initialize.call(this, index);
        this.bitmap = ImageManager.loadSceneSplash("splash_adapted");
        this.centerSelf();
    }

    //=============================================================================
    // Sprite_SplashEnd
    //=============================================================================

    function Sprite_SplashEnd() {
        this.initialize.apply(this, arguments);
    }

    Sprite_SplashEnd.prototype = Object.create(Sprite_SplashBase.prototype);
    Sprite_SplashEnd.prototype.constructor = Sprite_SplashEnd;

    Sprite_SplashEnd.prototype.initialize = function (index) {
        Sprite_SplashBase.prototype.initialize.call(this, index);
        SceneManager.pop();
    }

    //=============================================================================
    // Sprite Class for Scene Splash
    //=============================================================================

    SF_SceneSplash.SpriteClassList = [
        Sprite_SplashLogo, Sprite_SplashHealthTip, Sprite_SplashAdapted, Sprite_SplashEnd
    ];

    //=============================================================================
    // Scene_Splash
    //=============================================================================

    function Scene_Splash() {
        this.initialize.apply(this, arguments);
    }
    window.Scene_Splash = Scene_Splash;
    SF_SceneSplash.Scene_Splash = Scene_Splash;

    Scene_Splash.prototype = Object.create(Scene_Base.prototype);
    Scene_Splash.prototype.constructor = Scene_Splash;

    Scene_Splash.prototype.initialize = function () {
        Scene_Base.prototype.initialize.call(this);
    }

    Scene_Splash.prototype.create = function () {
        Scene_Base.prototype.create.call(this);
        this.createBackground();
        this.createSplash();
    }

    Scene_Splash.prototype.createBackground = function () {
        var bitmap = new Bitmap(Graphics.width, Graphics.height);
        bitmap.fillAll("white");
        this._backgroundSprite = new Sprite(bitmap);
        this.addChild(this._backgroundSprite);
    }

    Scene_Splash.prototype.createSplash = function () {
        var spriteClass = SF_SceneSplash.SpriteClassList[0];
        var sprite = new spriteClass(0);
        this.addChild(sprite);
    }

    Scene_Splash.prototype.start = function () {
        Scene_Base.prototype.start.call(this);
    }

    Scene_Splash.prototype.update = function () {
        Scene_Base.prototype.update.call(this);
    }

    //=============================================================================
    // SceneManager
    //=============================================================================

    SF_SceneSplash.SceneManager_initialize = SceneManager.initialize;
    SceneManager.initialize = function () {
        SF_SceneSplash.SceneManager_initialize.apply(this, arguments);
        this.addSceneBefore(Scene_Splash, Scene_Title);
    }

})();