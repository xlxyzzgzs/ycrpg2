//=============================================================================
// Salted Fish Plugins - Scene Actor
// SF_SceneActor.js
//=============================================================================
"use strict";
var Imported = Imported || {};
Imported.SF_SceneActor = true;

var SF_Plugins = SF_Plugins || {};

//=============================================================================
/*:
    * @plugindesc Scene Actor
    * @author Salted Fish
    */
//=============================================================================

(function () {
    var SF_SceneActor = {};
    SF_Plugins.SF_SceneActor = SF_SceneActor;

    SF_SceneActor.version = 1.0;

    // Bitmap.prototype.drawTextEx = function (text, x, y) {
    //     if (text) {
    //         var textState = {
    //             index: 0, x: x, y: y, left: x
    //         };
    //         textState.text = this.convertEscapeCharacters(text);
    //     } else {
    //         return 0;
    //     }
    // };

    // Bitmap.prototype.convertEscapeCharacters = function (text) {
    //     text = text.replace(/\\/g, '\x1b');
    //     text = text.replace(/\x1b\x1b/g, '\\');
    //     text = text.replace(/\x1bV\[(\d+)\]/gi, function () {
    //         return $gameVariables.value(parseInt(arguments[1]));
    //     }.bind(this));
    //     text = text.replace(/\x1bV\[(\d+)\]/gi, function () {
    //         return $gameVariables.value(parseInt(arguments[1]));
    //     }.bind(this));
    //     text = text.replace(/\x1bN\[(\d+)\]/gi, function () {
    //         return this.actorName(parseInt(arguments[1]));
    //     }.bind(this));
    //     text = text.replace(/\x1bP\[(\d+)\]/gi, function () {
    //         return this.partyMemberName(parseInt(arguments[1]));
    //     }.bind(this));
    //     text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
    //     return text;
    // };

    Game_Actor.prototype.equipSlots = function () {
        var slots = [1, 2, 3, 4, 5, 6, 7, 7];
        slots = slots.map(function (id) { return id; });
        if (slots.length >= 2 && this.isDualWield()) {
            slots[1] = 1;
        }
        return slots;
    };



    //=============================================================================
    // Window_ActorSelect
    //=============================================================================

    function Window_ActorSelect() {
        this.initialize.apply(this, arguments);
    }

    Window_ActorSelect.prototype = Object.create(Window_Base.prototype);
    Window_ActorSelect.prototype.constructor = Window_ActorSelect;

    Window_ActorSelect.prototype._refreshBack = function () {
        // nothing to do
    }

    Window_ActorSelect.prototype._refreshFrame = function () {
        // nothing to do
    }

    Window_ActorSelect.prototype.standardPadding = function () {
        return 0;
    }

    Window_ActorSelect.prototype.initialize = function () {
        Window_Base.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, Graphics.boxHeight);
        this._actorList = [];
        this._actorBitmap = {};
        for (var i = 0; i < $dataActors.length; i++) {
            if ($dataActors[i]) {
                var actor = $gameActors.actor($dataActors[i].id);
                this._actorList.push(actor);
                this._actorBitmap[actor.faceName()] = ImageManager.loadFace(actor.faceName());
            }
        }
        this._pageNumber = 0;
        this._pageSize = 12;
        this._maxPage = Math.ceil(this._actorList.length / this._pageSize);
        this._faceBackBitmap = ImageManager.loadSceneActorSelect('face_back');

        this._handler = null;
    };

    Window_ActorSelect.prototype.refresh = function () {
        this.contents.clear();
        this.drawAllItems();
    };

    Window_ActorSelect.prototype.drawAllItems = function () {
        var index = this._pageNumber * this._pageSize;
        for (var i = 0; i < this._pageSize; i++) {
            if (index < this._actorList.length) {
                this.drawItem(index);
            }
            index++;
        }
    }

    Window_ActorSelect.prototype.drawItem = function (index) {
        var actor = this._actorList[index];
        var rect = this.itemRect(index);
        this.contents.blt(this._faceBackBitmap,
            0, 0, this._faceBackBitmap.width, this._faceBackBitmap.height,
            rect.x, rect.y)
        this.drawActorFace(actor, rect.x, rect.y, rect.width, rect.width);
        this.drawActorName(actor, rect.x, rect.y + rect.width, rect.width, rect.height - rect.width);
    }

    Window_ActorSelect.prototype.drawActorFace = function (actor, x, y, width, height) {
        var faceIndex = actor.faceIndex();
        var bitmap = this._actorBitmap[actor.faceName()];
        var pw = Window_Base._faceWidth;
        var ph = Window_Base._faceHeight;
        var sx = faceIndex % 4 * pw;
        var sy = Math.floor(faceIndex / 4) * ph;
        this.contents.blt(bitmap, sx, sy, pw, ph, x, y, width, height);
    }

    Window_ActorSelect.prototype.drawActorName = function (actor, x, y, width, height) {
        this.changeTextColor(this.normalColor());
        this.contents.fontSize = 20;
        this.contents.drawText(actor.name(), x, y, width, height, 'center');
    }

    Window_ActorSelect.prototype.itemRect = function (index) {
        var rect = new Rectangle();
        var i = index - this._pageNumber * this._pageSize;
        rect.width = 124;
        rect.height = 160;
        rect.x = (i % 6) * (rect.width + 33) + 58;
        rect.y = Math.floor(i / 6) * (rect.height + 40) + 93;
        return rect;
    }

    Window_ActorSelect.prototype.maxPage = function () {
        return this._maxPage;
    }

    Window_ActorSelect.prototype.pageNumber = function () {
        return this._pageNumber;
    }

    Window_ActorSelect.prototype.setPageNumber = function (pageNumber) {
        this._pageNumber = pageNumber;
        this.refresh();
    }

    Window_ActorSelect.prototype.update = function () {
        Window_Base.prototype.update.call(this);
        if (this.isOpenAndActive()) {
            this.updateInput();
        }
    }

    Window_ActorSelect.prototype.updateInput = function () {
        if (TouchInput.isTriggered()) {
            var x = this.canvasToLocalX(TouchInput.x);
            var y = this.canvasToLocalY(TouchInput.y);
            var index = this.hitTest(x, y);
            if (index >= 0 && index < this._pageSize) {
                this.callHandler(index + this._pageNumber * this._pageSize);
            }
        }
    }

    Window_ActorSelect.prototype.hitTest = function (x, y) {
        x = x - 58;
        y = y - 93;
        if (x < 0 || y < 0) {
            return -1;
        }
        var col = Math.floor(x / (124 + 33));
        var row = Math.floor(y / (160 + 40));
        var dx = x - col * (124 + 33);
        var dy = y - row * (160 + 40);
        if (dx < 0 || dy < 0 || dx > 124 || dy > 160 || col >= 6 || row >= 2) {
            return -1;
        }
        return row * 6 + col;
    }

    Window_ActorSelect.prototype.callHandler = function (index) {
        if (index >= 0 && index < this._actorList.length) {
            if (this._handler) {
                this._handler(this._actorList[index]);
            }
        }
    }

    Window_ActorSelect.prototype.setHandler = function (handler) {
        this._handler = handler;
    }


    //=============================================================================
    // Scene_ActorSelect
    //=============================================================================

    function Scene_ActorSelect() {
        this.initialize.apply(this, arguments);
    }

    window.Scene_ActorSelect = Scene_ActorSelect;

    Scene_ActorSelect.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_ActorSelect.prototype.constructor = Scene_ActorSelect;

    Scene_ActorSelect.prototype.createBackground = function () {
        this._backgroundSprite = new Sprite();
        this._backgroundSprite.bitmap = ImageManager.loadSceneActorSelect('background');
        this.addChild(this._backgroundSprite);
    }

    Scene_ActorSelect.prototype.initialize = function () {
        Scene_MenuBase.prototype.initialize.call(this);
    }

    Scene_ActorSelect.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        this.createActorSelectWindow();
        this.createCancelButton();
        this.createPageButtons();
    }

    Scene_ActorSelect.prototype.start = function () {
        Scene_MenuBase.prototype.start.call(this);
        this._actorSelectWindow.setPageNumber(0);
        this.updatePageButtons();
        this.updatePageNumber();
    }

    Scene_ActorSelect.prototype.createActorSelectWindow = function () {
        this._actorSelectWindow = new Window_ActorSelect();
        this._actorSelectWindow.setHandler(this.onActorSelect.bind(this));
        this.addChild(this._actorSelectWindow);
    }

    Scene_ActorSelect.prototype.onActorSelect = function (actor) {
        SF_SceneActor._actorSelected = actor;
        SceneManager.push(Scene_Actor);
    }

    Scene_ActorSelect.prototype.createCancelButton = function () {
        this._cancelButton = new Sprite_SFButton();
        var bitmap = ImageManager.loadSceneActorSelect('cancel');
        this._cancelButton.setColdBitmap(bitmap);
        this._cancelButton.setHotBitmap(bitmap);
        this._cancelButton.setClickHandler(this.onCancelButtonClick.bind(this));
        this._cancelButton.refresh();
        this._cancelButton.move(21, 7);
        this.addChild(this._cancelButton);
    }

    Scene_ActorSelect.prototype.onCancelButtonClick = function () {
        this.popScene();
    }

    Scene_ActorSelect.prototype.updatePageButtons = function () {
        var num = this._actorSelectWindow.pageNumber();
        var max = this._actorSelectWindow.maxPage();
        if (num == 0) {
            this._pageUpButton.deactivate();
            this._pageUpButton.visible = false;
        } else {
            this._pageUpButton.activate();
            this._pageUpButton.visible = true;
        }

        if (num == max - 1) {
            this._pageDownButton.deactivate();
            this._pageDownButton.visible = false;
        } else {
            this._pageDownButton.activate();
            this._pageDownButton.visible = true;
        }

    }

    Scene_ActorSelect.prototype.updatePageNumber = function () {
        var num = this._actorSelectWindow.pageNumber();
        var bitmap = this._pageNumberText.bitmap;
        bitmap.clear();
        bitmap.fontSize = 16;
        bitmap.drawText(num + 1, 0, 0, bitmap.width, bitmap.height, 'center');
    }

    Scene_ActorSelect.prototype.createPageButtons = function () {
        this._pageUpButton = new Sprite_SFButton();
        var bitmap = ImageManager.loadSceneActorSelect('page_up');
        this._pageUpButton.setColdBitmap(bitmap);
        this._pageUpButton.setHotBitmap(bitmap);
        this._pageUpButton.setClickHandler(this.onPageUpButtonClick.bind(this));
        this._pageUpButton.refresh();
        this._pageUpButton.move(442, 493);
        this.addChild(this._pageUpButton);

        this._pageDownButton = new Sprite_SFButton();
        var bitmap = ImageManager.loadSceneActorSelect('page_down');
        this._pageDownButton.setColdBitmap(bitmap);
        this._pageDownButton.setHotBitmap(bitmap);
        this._pageDownButton.setClickHandler(this.onPageDownButtonClick.bind(this));
        this._pageDownButton.refresh();
        this._pageDownButton.move(544, 493);
        this.addChild(this._pageDownButton);

        this._pageNumberContainer = new PIXI.Container();
        this._pageNumberContainer.position.set(493, 493);
        this._pageNumberBackSprite = new Sprite(ImageManager.loadSceneActorSelect('num_back'));
        this.addChild(this._pageNumberContainer);
        this._pageNumberContainer.addChild(this._pageNumberBackSprite);

        this._pageNumberText = new Sprite(new Bitmap(40, 40));
        this._pageNumberText.move(0, 0);
        this._pageNumberContainer.addChild(this._pageNumberText);
    }

    Scene_ActorSelect.prototype.onPageUpButtonClick = function () {
        this._actorSelectWindow.setPageNumber(this._actorSelectWindow.pageNumber() - 1);
        this.updatePageButtons();
        this.updatePageNumber();
    }

    Scene_ActorSelect.prototype.onPageDownButtonClick = function () {
        this._actorSelectWindow.setPageNumber(this._actorSelectWindow.pageNumber() + 1);
        this.updatePageButtons();
        this.updatePageNumber();
    }


    //=============================================================================
    // Window_ActorProps
    //=============================================================================

    function Window_ActorProps() {
        this.initialize.apply(this, arguments);
    }

    Window_ActorProps.prototype = Object.create(Window_Base.prototype);
    Window_ActorProps.prototype.constructor = Window_ActorProps;

    Window_ActorProps.prototype._refreshBack = function () {
        // nothing to do here
    }

    Window_ActorProps.prototype._refreshFrame = function () {
        this._windowFrameSprite.bitmap = ImageManager.loadSceneActor('actor_prop');
    }

    Window_ActorProps.prototype.initialize = function () {
        Window_Base.prototype.initialize.apply(this, arguments);
        this._key_position = {
            "mhp": [70, 96],
            "mmp": [300, 96],
            "atk": [70, 120],
            "mat": [300, 120],
            "def": [70, 144],
            "mdf": [300, 144],
            "agi": [70, 168],
            "cri": [300, 168],
            "hit": [70, 192],
            "eva": [300, 192],
        }
        this._actor = null;
        this._states = [];
        this._statePage = 0;
        this._stateMaxPage = 0;
        this._stateMaxInPage = 6;
        this._iconBitmap = ImageManager.loadSystem('IconSet');

        this._stateWidth = 133;
        this._stateHeight = 44;
        this._statePaddingX = 35;
        this._statePaddingY = 18;

    }

    Window_ActorProps.prototype.standardPadding = function () {
        return 0;
    }

    Window_ActorProps.prototype.setActor = function (actor) {
        this._actor = actor;
        this.refresh();
    }

    Window_ActorProps.prototype.refresh = function () {
        if (!this._actor) { return; }
        this.contents.clear();
        this.contents.fontSize = 18;
        for (var key in this._key_position) {
            this.drawActorParam(this._actor, key);
        }

        this._states = this._actor.states();
        this._statePage = 0;
        this._stateMaxPage = Math.floor(this._states.length / this._stateMaxInPage);
        this.drawActorStatePage();
    }

    Window_ActorProps.prototype.drawActorParam = function (actor, key) {
        var x = this._key_position[key][0];
        var y = this._key_position[key][1];
        var value = actor[key];
        var text = "";
        if (value < 1) {
            text = value.toFixed(2);
        } else {
            text = value.toString();
        }
        this.contents.drawText(text, x, y, 180, 24, 'right');
    }



    Window_ActorProps.prototype.getStateRect = function (index) {
        var i = index - this._statePage * this._stateMaxInPage;
        var sw = this._stateWidth;
        var sh = this._stateHeight;
        var x = 23 + (i % 3) * (sw + this._statePaddingX);
        var y = 278 + Math.floor(i / 3) * (sh + this._statePaddingY);
        return new Rectangle(x, y, sw, sh);
    }

    Window_ActorProps.prototype.drawActorStatePage = function () {
        var pw = Window_Base._iconWidth;
        var ph = Window_Base._iconHeight;
        this.contents.fontSize = 32;
        for (var i = 0; i < this._stateMaxInPage; i++) {
            var index = this._statePage * this._stateMaxInPage + i;
            var rect = this.getStateRect(index);
            this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
            if (index < this._states.length) {
                var state = this._states[index];
                var iconIndex = state.iconIndex;
                var sx = iconIndex % 116 * pw;
                var sy = Math.floor(iconIndex / 16) * ph;
                this.contents.blt(this._iconBitmap, sx, sy, pw, ph, rect.x, rect.y, this._stateHeight, this._stateHeight);

                var text = state.name;
                this.contents.drawText(text, rect.x + this._stateHeight, rect.y, rect.width - this._stateHeight, this._stateHeight, 'left');
            }
        }
    }

    //=============================================================================
    // Window_ActorSkill
    //=============================================================================

    function Window_ActorSkill() {
        this.initialize.apply(this, arguments);
    }

    Window_ActorSkill.prototype = Object.create(Window_Base.prototype);
    Window_ActorSkill.prototype.constructor = Window_ActorSkill;

    Window_ActorSkill.prototype._refreshBack = function () {
        // nothing to do here
    }

    Window_ActorSkill.prototype._refreshFrame = function () {
        this._windowFrameSprite.bitmap = ImageManager.loadSceneActor('actor_skill');
    }

    Window_ActorSkill.prototype.initialize = function () {
        Window_Base.prototype.initialize.apply(this, arguments);
        this._actor = null;

        this._skillPage = 0;
        this._skillMaxPage = 0;
        this._skillMaxInPage = 18;

        this._skillWidth = 142;
        this._skillHeight = 35;
        this._skillPaddingX = 9;
        this._skillPaddingY = 17;

        this._iconBitmap = ImageManager.loadSystem('IconSet');
        this._skillBackBitmap = ImageManager.loadSceneActor('skill_back');
        this._skillHandler = null;

        this.createPageButtons();
    }

    Window_ActorSkill.prototype.standardPadding = function () {
        return 0;
    }

    Window_ActorSkill.prototype.createPageButtons = function () {
        var bitmap = null;
        bitmap = ImageManager.loadSceneActor('skill_page_up');
        this._pageUpButton = new Sprite_SFButton();
        this._pageUpButton.setColdBitmap(bitmap);
        this._pageUpButton.setHotBitmap(bitmap);
        this._pageUpButton.setClickHandler(this.onPageUpButtonClick.bind(this));
        this._pageUpButton.refresh();
        this._pageUpButton.move(214, 372);
        this.addChild(this._pageUpButton);

        bitmap = ImageManager.loadSceneActor('skill_page_down');
        this._pageDownButton = new Sprite_SFButton();
        this._pageDownButton.setColdBitmap(bitmap);
        this._pageDownButton.setHotBitmap(bitmap);
        this._pageDownButton.setClickHandler(this.onPageDownButtonClick.bind(this));
        this._pageDownButton.refresh();
        this._pageDownButton.move(258, 372);
        this.addChild(this._pageDownButton);

        this._pageUpButton.visible = false;
        this._pageDownButton.visible = false;

        this._pageNumberContainer = new PIXI.Container();
        this._pageNumberContainer.position.set(236, 372);
        this._pageNumberBackSprite = new Sprite(ImageManager.loadSceneActor('skill_page_number_back'));
        this.addChild(this._pageNumberContainer);
        this._pageNumberContainer.addChild(this._pageNumberBackSprite);

        this._pageNumberText = new Sprite(new Bitmap(22, 22));
        this._pageNumberText.move(0, 0);
        this._pageNumberText.bitmap.fontSize = 14;
        this._pageNumberContainer.addChild(this._pageNumberText);
    }

    Window_ActorSkill.prototype.onPageUpButtonClick = function () {
        this._skillPage--;
        this.refresh();
    }

    Window_ActorSkill.prototype.onPageDownButtonClick = function () {
        this._skillPage++;
        this.refresh();
    }

    Window_ActorSkill.prototype.setActor = function (actor) {
        this._actor = actor;
        this._skillList = this._actor.skills().filter(function (skill) {
            return !!skill && this._actor.noHiddenSkillConditionsMet(skill);
        }, this);
        this._skillPage = 0;
        this._skillMaxPage = Math.ceil(this._skillList.length / this._skillMaxInPage);
        this.refresh();
    }

    Window_ActorSkill.prototype.refresh = function () {
        if (!this._actor) { return; }

        this.contents.clear();
        this.drawActorSkillPage();
        this.updatePageButtons();
        this.updatePageNumber();
    }

    Window_ActorSkill.prototype.updatePageButtons = function () {
        this._pageUpButton.visible = this._skillPage > 0;
        this._pageDownButton.visible = this._skillPage < this._skillMaxPage - 1;

        if (this._pageUpButton.visible) {
            this._pageUpButton.activate();
        } else {
            this._pageUpButton.deactivate();
        }

        if (this._pageDownButton.visible) {
            this._pageDownButton.activate();
        } else {
            this._pageDownButton.deactivate();
        }
    }

    Window_ActorSkill.prototype.updatePageNumber = function () {
        this._pageNumberText.bitmap.clear();
        this._pageNumberText.bitmap.drawText(this._skillPage + 1, 0, 0, 22, 22, 'center');
    }

    Window_ActorSkill.prototype.getSkillRect = function (index) {
        var i = index - this._skillPage * this._skillMaxInPage;
        var sw = this._skillWidth;
        var sh = this._skillHeight;
        var x = 23 + (i % 3) * (sw + this._skillPaddingX);
        var y = 62 + Math.floor(i / 3) * (sh + this._skillPaddingY);
        return new Rectangle(x, y, sw, sh);
    }

    Window_ActorSkill.prototype.drawActorSkillPage = function () {
        var pw = Window_Base._iconWidth;
        var ph = Window_Base._iconHeight;
        this.contents.fontSize = 24;
        var index = this._skillPage * this._skillMaxInPage;
        for (var i = 0; i < this._skillMaxInPage && index < this._skillList.length; i++, index++) {
            var rect = this.getSkillRect(index);
            this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
            this.contents.blt(
                this._skillBackBitmap,
                0, 0, this._skillBackBitmap.width, this._skillBackBitmap.height,
                rect.x, rect.y, rect.width, rect.height
            );
            var skill = this._skillList[index];
            var iconIndex = skill.iconIndex;
            var sx = iconIndex % 16 * pw;
            var sy = Math.floor(iconIndex / 16) * ph;
            this.contents.blt(this._iconBitmap, sx, sy, pw, ph, rect.x, rect.y, this._skillHeight, this._skillHeight);

            var text = skill.name;
            this.contents.drawText(text, rect.x + this._skillHeight, rect.y, rect.width - this._skillHeight, this._skillHeight, 'left');
        }
    }

    Window_ActorSkill.prototype.update = function () {
        Window_Base.prototype.update.apply(this, arguments);
        if (this.isOpenAndActive()) {
            this.updateInput();
        }
    }

    Window_ActorSkill.prototype.updateInput = function () {
        if (TouchInput.isTriggered()) {
            var x = this.canvasToLocalX(TouchInput.x);
            var y = this.canvasToLocalY(TouchInput.y);
            var index = this.hitTest(x, y);
            if (index >= 0) {
                index = index + this._skillPage * this._skillMaxInPage;
                if (index < this._skillList.length) {
                    var skill = this._skillList[index];
                    this.callSkillHandler(skill);
                }
            }
        }
    }

    Window_ActorSkill.prototype.callSkillHandler = function (skill) {
        if (skill && this._skillHandler) {
            this._skillHandler(skill);
        }
    }

    Window_ActorSkill.prototype.setSkillHandler = function (handler) {
        this._skillHandler = handler;
    }

    Window_ActorSkill.prototype.hitTest = function (x, y) {
        x = x - 23;
        y = y - 62;
        if (x < 0 || y < 0) { return -1; }
        var row = Math.floor(y / (this._skillHeight + this._skillPaddingY));
        var col = Math.floor(x / (this._skillWidth + this._skillPaddingX));
        var dx = x - col * (this._skillWidth + this._skillPaddingX);
        var dy = y - row * (this._skillHeight + this._skillPaddingY);
        if (
            dx < 0 || dy < 0 ||
            dx > this._skillWidth || dy > this._skillHeight ||
            row >= 6 || col >= 3
        ) { return -1; }

        var index = row * 3 + col;
        return index;
    }

    //=============================================================================
    // Window_SkillPopup
    //=============================================================================

    function Window_SkillPopup() {
        this.initialize.apply(this, arguments);
    }

    Window_SkillPopup.prototype = Object.create(Window_Base.prototype);
    Window_SkillPopup.prototype.constructor = Window_SkillPopup;

    Window_SkillPopup.prototype._refreshBack = function () {
        // nothing to do
    }

    Window_SkillPopup.prototype._refreshFrame = function () {
        this._windowFrameSprite.bitmap = ImageManager.loadSceneActor('skill_pop_window_back');
    }

    Window_SkillPopup.prototype.initialize = function () {
        Window_Base.prototype.initialize.apply(this, arguments);

        this._actor = null;
        this._skill = null;
        this._action = null;

        this._cancelHandler = null;
        this._useHandler = null;
        this._faceBackBitmap = ImageManager.loadSceneActor('skill_pop_face_back');
        this.createCancelButton();
        this.createUseButton();
    }

    Window_SkillPopup.prototype.standardPadding = function () {
        return 0;
    }

    Window_SkillPopup.prototype.setActor = function (actor) {
        this._actor = actor;
        this._action = new Game_Action(actor);
    }

    Window_SkillPopup.prototype.setSkill = function (skill) {
        this._skill = skill;
        this._action.setItemObject(skill);
        this.refresh();
    }

    Window_SkillPopup.prototype.setCancelHandler = function (handler) {
        this._cancelHandler = handler;
        this._cancelButton.setClickHandler(this._cancelHandler);
    }

    Window_SkillPopup.prototype.setUseHandler = function (handler) {
        this._useHandler = handler;
        this._useButton.setClickHandler(this.callUseHandler.bind(this));
    }

    Window_SkillPopup.prototype.callUseHandler = function () {
        if (this._useHandler) {
            this._useHandler();
        }
    }

    Window_SkillPopup.prototype.createCancelButton = function () {
        this._cancelButton = new Sprite_SFButton();
        var bitmap = ImageManager.loadSceneActor('skill_pop_cancel');
        this._cancelButton.setColdBitmap(bitmap);
        this._cancelButton.setHotBitmap(bitmap);
        this._cancelButton.setClickHandler(this._cancelHandler);
        this._cancelButton.move(670, 0);
        this._cancelButton.refresh();
        this.addChild(this._cancelButton);
    }

    Window_SkillPopup.prototype.createUseButton = function () {
        this._useButton = new Sprite_SFButton();
        var bitmap = ImageManager.loadSceneActor('skill_pop_use');
        this._useButton.setColdBitmap(bitmap);
        this._useButton.setHotBitmap(bitmap);
        this._useButton.setClickHandler(this._useHandler);
        this._useButton.move(592, 313);
        this._useButton.refresh();
        this.addChild(this._useButton);
    }

    Window_SkillPopup.prototype.refresh = function () {
        this._cancelButton.refresh();
        this._useButton.refresh();
        this.contents.clear();
        if (!this._actor || !this._skill) { return; }
        this.refreshSkill();

        if (this._actor.canUse(this._skill)) {
            this._useButton.visible = true;
            this._useButton.activate();
        } else {
            this._useButton.visible = false;
            this._useButton.deactivate();
        }
    }

    Window_SkillPopup.prototype.refreshSkill = function () {
        var text = this._skill.name;
        this.contents.fontSize = 20;
        this.contents.drawText(text, 18, 17, this.contentsWidth(), 20, 'left');


        this.contents.fontSize = 16;
        text = this._skill.description;
        var lines = text.split('\n');
        var y = 60;
        for (var i = 0; i < lines.length; i++) {
            this.contents.drawText(lines[i], 36, y, this.contentsWidth(), 20, 'left');
            y += 20;
        }
    }

    //=============================================================================
    // Scene_Actor
    //=============================================================================

    function Scene_Actor() {
        this.initialize.apply(this, arguments);
    }

    window.Scene_Actor = Scene_Actor;

    Scene_Actor.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_Actor.prototype.constructor = Scene_Actor;

    Scene_Actor.prototype.initialize = function () {
        Scene_MenuBase.prototype.initialize.call(this);
        this._iconBitmap = ImageManager.loadSystem('IconSet');
        this._childStatus = 'prop'; // prop skill equip skill_popup
    }

    Scene_Actor.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        this._actor = SF_SceneActor._actorSelected || $gameParty.menuActor();
        this.createNameSprite();
        this.createActorContainer();
        this.createStatusWindow();
        this.createCancelButton();
        this.createSkillWindow();
        //this.createEquipWindow();
        //this.createTabButton();
    }

    Scene_Actor.prototype.start = function () {
        Scene_MenuBase.prototype.start.call(this);
        this._statusWindow.setActor(this._actor);
        this._skillWindow.setActor(this._actor);
        this._skillPopup.setActor(this._actor);

        this._childStatus = 'skill';
        this.updateChildrenList();
    }

    Scene_Actor.prototype.createBackground = function () {
        this._backgroundSprite = new Sprite();
        this._backgroundSprite.bitmap = ImageManager.loadSceneActor('background');
    }

    Scene_Actor.prototype.createNameSprite = function () {
        this._nameSprite = new Sprite();
        this._nameSprite.bitmap = new Bitmap(230, 47);
        this._nameSprite.bitmap.fontSize = 32;
        this._nameSprite.bitmap.textColor = '#ffffff';
        this._nameSprite.move(45, 73);
        this._nameSprite.bitmap.drawText(this._actor.name(), 0, 0, 230, 47, 'center');
    }

    Scene_Actor.prototype.createActorContainer = function () {
        this._actorContainer = new PIXI.Container();
        this._actorContainer.x = 52;
        this._actorContainer.y = 139;
        var slots = this._actor.equipSlots();
        for (var i = 0; i < slots; i++) {
            // not completely sure what this does
        }
    }

    Scene_Actor.prototype.createStatusWindow = function () {
        this._statusWindow = new Window_ActorProps(487, 86, 495, 417);

    }

    Scene_Actor.prototype.createSkillWindow = function () {
        this._skillWindow = new Window_ActorSkill(487, 86, 495, 417);
        this._skillWindow.setSkillHandler(this.onSkillOk.bind(this));

        this._skillPopup = new Window_SkillPopup(166, 83, 707, 363);
        this._skillPopup.setCancelHandler(this.onSkillCancel.bind(this));
        this._skillPopup.setUseHandler(this.onSkillUse.bind(this));

        this._skillPopBack = new Sprite();
        this._skillPopBackBitmap = ImageManager.loadSceneActor('skill_pop_back');
    }

    Scene_Actor.prototype.createCancelButton = function () {
        this._cancelButton = new Sprite_SFButton();
        var bitmap = ImageManager.loadSceneActor('cancel');
        this._cancelButton.setColdBitmap(bitmap);
        this._cancelButton.setHotBitmap(bitmap);
        this._cancelButton.setClickHandler(this.onCancelButtonClick.bind(this));
        this._cancelButton.move(21, 7);
        this._cancelButton.refresh();
    }

    Scene_Actor.prototype.onCancelButtonClick = function () {
        this.popScene();
    }

    Scene_Actor.prototype.onSkillOk = function (skill) {
        this._skillPopBack.bitmap = Bitmap.snap(this);
        this._skillPopBack.bitmap.blt(this._skillPopBackBitmap, 0, 0, this._skillPopBackBitmap.width, this._skillPopBackBitmap.height, 0, 0);
        this._skillPopup.setSkill(skill);

        this._childStatus = 'skill_popup';
        this.updateChildrenList();
    }

    Scene_Actor.prototype.onSkillCancel = function () {
        this._childStatus = 'skill';
        this.updateChildrenList();
    }

    Scene_Actor.prototype.onSkillUse = function (skill) {
        var action = new Game_Action(this._actor);

        this._childStatus = 'skill';
        this.updateChildrenList();
    }

    Scene_Actor.prototype.useSkill = function (action) {
        this._actor.useItem(action.item());
        this.a
    }

    Scene_Actor.prototype.updateChildrenList = function () {
        this.removeChildren();
        switch (this._childStatus) {
            case 'prop':
                this.addBackChildren();
                this.addChild(this._statusWindow);
                break;
            case 'skill':
                this.addBackChildren();
                this.addChild(this._skillWindow);
                break;
            case 'equip':
                this.addBackChildren();
                this.addChild(this._equipWindow);
                break;
            case 'skill_popup':
                this.addChild(this._skillPopBack);
                this.addChild(this._skillPopup);
                break;
            default:
                this.popScene();
        }
    }

    Scene_Actor.prototype.addBackChildren = function () {
        this.addChild(this._backgroundSprite);
        this.addChild(this._cancelButton);
        this.addChild(this._nameSprite);
        this.addChild(this._actorContainer);
    }
})();