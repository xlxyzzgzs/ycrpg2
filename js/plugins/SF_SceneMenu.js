//=============================================================================
// Salted Fish Plugins - Scene Menu
// SF_SceneMenu.js
//=============================================================================

var Imported = Imported || {};
Imported.SF_SceneMenu = true;

var SF_Plugins = SF_Plugins || {};

//=============================================================================
/*:
    * @plugindesc Scene Menu
    * @author SaltedFish
    * 
    * @help
    * 
    * This plugin does not provide plugin commands.
    */
//=============================================================================

(function () {
    var SF_SceneMenu = {};
    SF_Plugins.SF_SceneMenu = SF_SceneMenu;
    SF_SceneMenu.version = 1.0;


    SF_SceneMenu.dialogContents = ['文本文本文本文本文本'];

    //=============================================================================
    // Sprite Dialog
    //=============================================================================

    function Sprite_Dialog() {
        this.initialize.apply(this, arguments);
    }

    Sprite_Dialog.prototype = Object.create(Sprite.prototype);
    Sprite_Dialog.prototype.constructor = Sprite_Dialog;

    Sprite_Dialog.prototype.initialize = function () {
        Sprite.prototype.initialize.call(this);
        this._backgroundSprite = new Sprite(ImageManager.loadSceneMenu('dialog_background'));
        this._textSprite = new Sprite();
        this._textSprite.bitmap = new Bitmap(300, 180);
        this._textSprite.move(10, 10);
        this._textSprite.bitmap.fontSize = 24;
        this._textSprite.bitmap.textColor = '#ffffff';
        this.addChild(this._backgroundSprite);
        this.addChild(this._textSprite);

        this._tmpWindow = new Window_Base(0, 0, this._textSprite.width, this._textSprite.height);
        this._tmpWindow.rotation = 0;
        this._tmpWindow.contents = this._textSprite.bitmap;
        this._tmpWindow.opacity = 0;
        this._needFadeIn = false;
        this._needMoveIn = false;
    }

    Sprite_Dialog.prototype.setText = function (text) {
        this._tmpWindow.contents.clear();
        this._tmpWindow.drawTextEx(text, 0, 0);
        this._textSprite.bitmap.blt(this._tmpWindow.contents, 0, 0, this._textSprite.width, this._textSprite.height, 0, 0);
    }

    Sprite_Dialog.prototype.update = function () {
        Sprite.prototype.update.call(this);
    }

    //=============================================================================
    // Scene Menu
    //=============================================================================

    Scene_Menu.prototype.initialize = function () {
        Scene_Base.prototype.initialize.call(this);
        this.button_name = {// button name: [x, y]
            'title': [897, 278],
            'actor': [438, 175],
            'formation': [645, 94],
            'save': [868, 94],
            "quest": [756, 278],
            'options': [746, 33],
            'achivement': [645, 278],
            'help': [814, 33],
            'cancel': [678, 463],
            'database': [438, 348],
            'skill': [438, 94]
        };
    }

    Scene_Menu.prototype.create = function () {
        Scene_Base.prototype.create.call(this);
        this.createWindowLayer();

        this.createBackSprite();
        this.createRotateContainer();

        this.createDialog();
        this.createCommandButton();

    }

    Scene_Menu.prototype.createRotateContainer = function () {
        this._rotateContainer = new Sprite();
        this.addChild(this._rotateContainer);
    }

    Scene_Menu.prototype.createBackSprite = function () {
        this._backSprite = new Sprite(ImageManager.loadSceneMenu('background'));
        this.addChild(this._backSprite);
    }

    Scene_Menu.prototype.createDialog = function () {
        this._dialogSprite = new Sprite_Dialog();
        this._rotateContainer.addChild(this._dialogSprite);
        this._dialogSprite.move(37, 167);
        this._dialogSprite.setText(
            SF_SceneMenu.dialogContents[
            Math.floor(Math.random() * SF_SceneMenu.dialogContents.length)
            ]
        );
    }

    Scene_Menu.prototype.createCommandButton = function () {
        for (var key in this.button_name) {
            var button = new Sprite_SFButton();
            this._rotateContainer.addChild(button);

            button.move(this.button_name[key][0], this.button_name[key][1]);
            button.setHotBitmap(ImageManager.loadSceneMenu(key + '_hot'));
            button.setColdBitmap(ImageManager.loadSceneMenu(key + '_cold'));
            button.setClickHandler(this['on_' + key + "_button"].bind(this));
            button.deactivate();
            button.refresh();
            this['_' + key + '_buttonSprite'] = button;
        }
    }

    Scene_Menu.prototype.start = function () {
        Scene_MenuBase.prototype.start.call(this);
        for (var key in this.button_name) {
            this['_' + key + '_buttonSprite'].activate();
        }
        this._backSprite.move(Graphics.boxWidth - this._backSprite.bitmap.width, (Graphics.boxHeight - this._backSprite.bitmap.height) / 2);

        this.pivot.x = Graphics.boxWidth / 2;
        this.pivot.y = Graphics.boxHeight / 2;
        this.x = Graphics.boxWidth / 2;
        this.y = Graphics.boxHeight / 2;
        // this.rotation = -0.03;
    }

    Scene_Menu.prototype.update = function () {
        Scene_MenuBase.prototype.update.call(this);
    }

    Scene_Menu.prototype.on_title_button = function () {
        this.fadeOutAll();
        SceneManager.goto(Scene_Title);
    }

    Scene_Menu.prototype.on_actor_button = function () {
        SceneManager.push(Scene_Actor);
    }

    Scene_Menu.prototype.on_formation_button = function () {
        SceneManager.push(Scene_Formation);
    }

    Scene_Menu.prototype.on_save_button = function () {
        SceneManager.push(Scene_Save);
    }

    Scene_Menu.prototype.on_quest_button = function () {
        SceneManager.push(Scene_Quest);
    }

    Scene_Menu.prototype.on_options_button = function () {
        SceneManager.push(Scene_Options);
    }

    Scene_Menu.prototype.on_achivement_button = function () {
        SceneManager.push(Scene_Achievement);

    }

    Scene_Menu.prototype.on_help_button = function () {
        SceneManager.push(Scene_Help);
    }

    Scene_Menu.prototype.on_cancel_button = function () {
        this.popScene();
    }

    Scene_Menu.prototype.on_database_button = function () {
        SceneManager.push(Scene_Database);
    }

    Scene_Menu.prototype.on_skill_button = function () {
        SceneManager.push(Scene_Skill);
    }

})();