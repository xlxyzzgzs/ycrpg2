//=============================================================================
// Salted Fish Plugins - Scene Actor Select
// SF_SceneActorSelect.js
//=============================================================================
"use strict";
var Imported = Imported || {};
Imported.SF_SceneActorSelect = true;

var SF_Plugins = SF_Plugins || {};
//=============================================================================
/*:
    * @plugindesc v1.0.0 Allows you to select an actor from the scene.
    * @author Salted Fish
    */
//=============================================================================

(function () {
    var SF_SceneActorSelect = {};
    SF_Plugins.SceneActorSelect = SF_SceneActorSelect;

    SF_SceneActorSelect.version = 1.0;

    //=============================================================================
    // Window_ActorSelect
    //=============================================================================

    function Window_ActorSelect() {
        this.initialize.apply(this, arguments);
    }

    SF_SceneActorSelect.Window_ActorSelect = Window_ActorSelect;
    window.Window_ActorSelect = Window_ActorSelect;

    Window_ActorSelect.prototype = Object.create(Window_PagingBase.prototype);
    Window_ActorSelect.prototype.constructor = Window_ActorSelect;

    Window_ActorSelect.prototype.initialize = function () {
        Window_PagingBase.prototype.initialize.apply(this, arguments);

        this._actorBackBitmap = ImageManager.loadSceneActorSelect("actor_back");
        this._faceBackBitmap = ImageManager.loadSceneActorSelect("face_back");
        this._levelBackBitmap = ImageManager.loadSceneActorSelect("level_back");
        this._actorFaceSprites = [];
        var pageItems = this.maxPageItems();
        for (var i = 0; i < pageItems; i++) {
            this._actorFaceSprites.push(new Sprite());
            var rect = this.itemRect(i);
            this._actorFaceSprites[i].x = rect.x + 3 + 4;
            this._actorFaceSprites[i].y = rect.y + 42 + 4;
            this.addChild(this._actorFaceSprites[i]);
        }
    }

    Window_ActorSelect.prototype._refreshFrame = function () {
        // nothing to do
    }

    Window_ActorSelect.prototype._refreshBack = function () {
        // nothing to do
    }

    Window_ActorSelect.prototype.windowWidth = function () {
        return Graphics.boxWidth;
    }

    Window_ActorSelect.prototype.windowHeight = function () {
        return Graphics.boxHeight;
    }

    Window_ActorSelect.prototype.windowX = function () {
        return 0;
    }

    Window_ActorSelect.prototype.windowY = function () {
        return 0;
    }

    Window_ActorSelect.prototype.itemWidth = function () {
        return 142;
    }

    Window_ActorSelect.prototype.itemHeight = function () {
        return 209;
    }

    Window_ActorSelect.prototype.maxCols = function () {
        return 5;
    }

    Window_ActorSelect.prototype.maxRows = function () {
        return 2;
    }

    Window_ActorSelect.prototype.itemPadding = function () {
        return new Point(20, 14);
    }

    Window_ActorSelect.prototype.itemStartPosition = function () {
        return new Point(109, 76);
    }

    Window_ActorSelect.prototype.pageUpPosition = function () {
        return new Point(46, 288);
    }

    Window_ActorSelect.prototype.pageDownPosition = function () {
        return new Point(943, 288);
    }

    Window_ActorSelect.prototype.pageUpBitmap = function () {
        var bitmap = ImageManager.loadSceneActorSelect("page_up");
        return { cold: bitmap, hot: bitmap };
    }

    Window_ActorSelect.prototype.pageDownBitmap = function () {
        var bitmap = ImageManager.loadSceneActorSelect("page_down");
        return { cold: bitmap, hot: bitmap };
    }

    Window_PagingBase.prototype.isShowPageNumber = function () {
        return false;
    }

    Window_ActorSelect.prototype.makeItemList = function () {
        var list = [];
        for (var i = 0; i < $dataActors.length; i++) {
            if ($dataActors[i]) {
                var actor = $gameActors.actor($dataActors[i].id);
                list.push(actor);
            }
        }
        return list;
    }

    Window_ActorSelect.prototype.drawItem = function (index) {
        if (index >= this.maxItems()) {
            this._actorFaceSprites[index % this.maxPageItems()].visible = false;
            return;
        }

        this._actorFaceSprites[index % this.maxPageItems()].visible = true;
        var rect = this.itemRect(index);
        this.contents.blt(this._actorBackBitmap, 0, 0, this._actorBackBitmap.width, this._actorBackBitmap.height, rect.x, rect.y);
        this.contents.blt(this._faceBackBitmap, 0, 0, this._faceBackBitmap.width, this._faceBackBitmap.height, rect.x + 3, rect.y + 42);
        this.contents.blt(this._levelBackBitmap, 0, 0, this._levelBackBitmap.width, this._levelBackBitmap.height, rect.x, rect.y + 172);

        this.drawActorFace(index);
        this.drawActorName(index);
        this.drawActorLevel(index);
    }

    Window_ActorSelect.prototype.getFaceRect = function (faceIndex) {
        var pw = Window_Base._faceWidth;
        var ph = Window_Base._faceHeight;
        var sw = this._faceBackBitmap.width - 8;
        var sh = this._faceBackBitmap.height - 8;
        var sx = faceIndex % 4 * pw + (pw - sw) / 2;
        var sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
        return new Rectangle(sx, sy, sw, sh);
    }

    Window_ActorSelect.prototype.drawActorLevel = function (index) {
        var actor = this.getItem(index);
        var rect = this.itemRect(index);
        var levelText = 'LV. ' + actor.level.toString();
        this.contents.fontSize = 18;
        this.contents.textColor = 'white';
        this.contents.drawText(levelText, rect.x, rect.y + 172, rect.width, 37, 'center');
    }

    Window_ActorSelect.prototype.drawActorFace = function (index) {
        var actor = this.getItem(index);
        var faceIndex = actor.faceIndex();
        var faceRect = this.getFaceRect(faceIndex);
        index = index % this._actorFaceSprites.length;
        this._actorFaceSprites[index].bitmap = ImageManager.loadFace(actor.faceName());
        this._actorFaceSprites[index].setFrame(faceRect.x, faceRect.y, faceRect.width, faceRect.height);
    }

    Window_ActorSelect.prototype.drawActorName = function (index) {
        var actor = this.getItem(index);
        var rect = this.itemRect(index);
        var nameText = actor.name();
        this.contents.fontSize = 24;
        this.contents.textColor = 'white';
        this.contents.drawText(nameText, rect.x, rect.y + 10, rect.width, 32, 'center');
    }


    Window_ActorSelect.prototype.onItemPointerDown = function (index) {
        console.log(`onItemPointerDown: ${index}`);
    }

    Window_ActorSelect.prototype.onItemPointerUp = function (index) {
        console.log(`onItemPointerUp: ${index}`);
    }

    Window_ActorSelect.prototype.onItemPointerMove = function (index) {
        console.log(`onItemPointerMove: ${index}`);
    }

    Window_ActorSelect.prototype.onItemPointerCancel = function (index) {
        console.log(`onItemPointerCancel: ${index}`);
    }

    Window_ActorSelect.prototype.onItemPointerLeave = function (index) {
        console.log(`onItemPointerLeave: ${index}`);
    }

    Window_ActorSelect.prototype.onItemPointerEnter = function (index) {
        console.log(`onItemPointerEnter: ${index}`);
    }

    Window_ActorSelect.prototype.onItemPointerOver = function (index) {
        // console.log(`onItemPointerOver: ${index}`);
    }

    Window_ActorSelect.prototype.onItemClick = function (index) {
        console.log(`onItemClick: ${index}`);
    }
    //=============================================================================
    // Scene_ActorSelect
    //=============================================================================

    function Scene_ActorSelect() {
        this.initialize.apply(this, arguments);
    }

    SF_SceneActorSelect.Scene_ActorSelect = Scene_ActorSelect;
    window.Scene_ActorSelect = Scene_ActorSelect;

    Scene_ActorSelect.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_ActorSelect.prototype.constructor = Scene_ActorSelect;

    Scene_ActorSelect.prototype.initialize = function () {
        Scene_MenuBase.prototype.initialize.call(this);
    }

    Scene_ActorSelect.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        this.createWindowActorSelect();
        this.createButtons();
    }

    Scene_ActorSelect.prototype.start = function () {
        Scene_MenuBase.prototype.start.call(this);
        this._windowActorSelect.refresh();
        this._cancelButton.refresh();
        this._homeButton.refresh();
        this._cancelButton.activate();
        this._homeButton.activate();
    }

    Scene_ActorSelect.prototype.createBackground = function () {
        this._backgroundSprite = new Sprite();
        this._backgroundSprite.bitmap = ImageManager.loadSceneActorSelect('background');
        this.addChild(this._backgroundSprite);
    }

    Scene_ActorSelect.prototype.createWindowActorSelect = function () {
        this._windowActorSelect = new Window_ActorSelect();
        this.addWindow(this._windowActorSelect);
    }

    Scene_ActorSelect.prototype.createButtons = function () {
        this._cancelButton = new Sprite_SFButton();
        var bitmap = ImageManager.loadSceneActorSelect('cancel');
        this._cancelButton.setColdBitmap(bitmap);
        this._cancelButton.setHotBitmap(bitmap);
        this._cancelButton.setClickHandler(this.onCancelButtonClick.bind(this));
        this.addChild(this._cancelButton);
        this._cancelButton.deactivate();
        this._cancelButton.move(30, 12);

        this._homeButton = new Sprite_SFButton();
        bitmap = ImageManager.loadSceneActorSelect('home');
        this._homeButton.setColdBitmap(bitmap);
        this._homeButton.setHotBitmap(bitmap);
        this._homeButton.setClickHandler(this.onHomeButtonClick.bind(this));
        this.addChild(this._homeButton);
        this._homeButton.deactivate();
        this._homeButton.move(108, 12);
    }

    Scene_ActorSelect.prototype.onCancelButtonClick = function () {
        this.popScene();
    }

    Scene_ActorSelect.prototype.onHomeButtonClick = function () {
        SceneManager.goto(Scene_Map);
    }

    Scene_ActorSelect.prototype.update = function () {
        Scene_MenuBase.prototype.update.call(this);
    }
})();