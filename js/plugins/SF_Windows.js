//=============================================================================
// Salted Fish Plugins - Windows
// SF_Windows.js
//=============================================================================
"use strict";
var Imported = Imported || {};
Imported.SF_Windows = true;

var SF_Plugins = SF_Plugins || {};
//=============================================================================
/*:
    * @plugindesc window base for salted fish plugins
    * @author Salted Fish
    */
//=============================================================================

(function () {
    var SF_Windows = {};
    SF_Plugins.Windows = SF_Windows;

    SF_Windows.version = 1.0;

    //=============================================================================
    // Window_SFBase
    //=============================================================================

    function Window_SFBase() {
        this.initialize.apply(this, arguments);
    }

    SF_Windows.Window_SFBase = Window_SFBase;
    window.Window_SFBase = Window_SFBase;

    Window_SFBase.prototype = Object.create(Window_Base.prototype);
    Window_SFBase.prototype.constructor = Window_SFBase;

    Window_SFBase.prototype.initialize = function () {
        var x = this.windowX();
        var y = this.windowY();
        var width = this.windowWidth();
        var height = this.windowHeight();
        Window_Base.prototype.initialize.call(this, x, y, width, height);
    }

    Window_SFBase.prototype.windowWidth = function () {
        return Graphics.boxWidth;// overwrite this
    }

    Window_SFBase.prototype.windowHeight = function () {
        return Graphics.boxHeight;// overwrite this
    }

    Window_SFBase.prototype.windowX = function () {
        return 0;// overwrite this 
    }

    Window_SFBase.prototype.windowY = function () {
        return 0;// overwrite this
    }

    Window_SFBase.prototype.canUpdate = function () {
        return this.active && this.visible && this.worldVisible;
    }

    Window_SFBase.prototype.containsPoint = function (point) {
        var x = this.canvasToLocalX(point.x);
        var y = this.canvasToLocalY(point.y);
        return x >= 0 && y >= 0 && x < this.width && y < this.height;

    }

    //=============================================================================
    // Window_PagingBase
    //=============================================================================

    function Window_PagingBase() {
        this.initialize.apply(this, arguments);
    }

    SF_Windows.Window_PagingBase = Window_PagingBase;
    window.Window_PagingBase = Window_PagingBase;

    Window_PagingBase.prototype = Object.create(Window_SFBase.prototype);
    Window_PagingBase.prototype.constructor = Window_PagingBase;

    Window_PagingBase.prototype.initialize = function () {
        Window_SFBase.prototype.initialize.call(this);
        this._pageIndex = 0;
        this._pageMax = 0;

        this._pageUpButton = null;
        this._pageDownButton = null;
        this._pageIndexText = null;

        this.createPageButtons();
        this.createPageNumber();
        this.setItemList(this.makeItemList());

        this._state = 'pointer-out';// pointer-out, pointer-over, pointer-down
        this._pointerIndex = -1;
    }

    Window_PagingBase.prototype.standardPadding = function () {
        return 0;
    }

    Window_PagingBase.prototype.itemWidth = function () {
        // overwrite this
        return 0;
    }

    Window_PagingBase.prototype.itemHeight = function () {
        // overwrite this
        return 0;
    }

    Window_PagingBase.prototype.maxCols = function () {
        // overwrite this
        return 1;
    }

    Window_PagingBase.prototype.maxRows = function () {
        // overwrite this
        return 1;
    }

    Window_PagingBase.prototype.maxPageItems = function () {
        return this.maxCols() * this.maxRows();
    }

    Window_PagingBase.prototype.maxItems = function () {
        return this._itemList.length;
    }

    Window_PagingBase.prototype.itemPadding = function () {
        // overwrite this
        return new Point(0, 0);
    }

    Window_PagingBase.prototype.itemStartPosition = function () {
        // overwrite this
        return new Point(0, 0);
    }

    Window_PagingBase.prototype.itemPaddingWidth = function () {
        return this.itemPadding().x;
    }

    Window_PagingBase.prototype.itemPaddingHeight = function () {
        return this.itemPadding().y;
    }

    Window_PagingBase.prototype.itemRect = function (index) {
        var maxPageItems = this.maxPageItems();
        index = index % maxPageItems;
        var rect = new Rectangle();
        var maxCols = this.maxCols();
        var itemWidth = this.itemWidth();
        var itemHeight = this.itemHeight();
        var itemPaddingWidth = this.itemPaddingWidth();
        var itemPaddingHeight = this.itemPaddingHeight();
        var startPosition = this.itemStartPosition();
        rect.width = itemWidth;
        rect.height = itemHeight;
        rect.x = index % maxCols * (itemWidth + itemPaddingWidth) + startPosition.x;
        rect.y = Math.floor(index / maxCols) * (itemHeight + itemPaddingHeight) + startPosition.y;
        return rect;
    }

    Window_PagingBase.prototype.pageUpPosition = function () {
        // overwrite this
        return new Point(0, 0);
    }

    Window_PagingBase.prototype.pageUpBitmap = function () {
        // overwrite this
        var bitmap = new Bitmap(32, 32);
        bitmap.fillAll('white');
        return { "cold": bitmap, "hot": bitmap };
    }

    Window_PagingBase.prototype.pageDownPosition = function () {
        // overwrite this
        return new Point(0, 0);
    }

    Window_PagingBase.prototype.pageDownBitmap = function () {
        // overwrite this
        var bitmap = new Bitmap(32, 32);
        bitmap.fillAll('white');
        return { "cold": bitmap, "hot": bitmap };
    }

    Window_PagingBase.prototype.isShowPageButton = function () {
        return true;
    }

    Window_PagingBase.prototype.isShowPageNumber = function () {
        return true;
    }

    Window_PagingBase.prototype.pageNumberPosition = function () {
        // overwrite this
        return new Point(0, 0);
    }

    Window_PagingBase.prototype.pageNumberStyle = function () {
        return new PIXI.TextStyle();
    }

    Window_PagingBase.prototype.updatePageNumber = function (text, pageIndex, pageCount) {
        // overwrite this
        text.text = `${pageIndex + 1}/${pageCount}`;
    }

    Window_PagingBase.prototype.createPageButtons = function () {
        var bitmaps = null;
        var position = null;

        this._pageUpButton = new Sprite_SFButton();
        this._pageUpButton.setClickHandler(this.onPageUpButtonClick.bind(this));
        bitmaps = this.pageUpBitmap();
        this._pageUpButton.setColdBitmap(bitmaps.cold);
        this._pageUpButton.setHotBitmap(bitmaps.hot);
        position = this.pageUpPosition();
        this._pageUpButton.move(position.x, position.y);
        this._pageUpButton.visible = false;
        this._pageUpButton.refresh();

        this._pageDownButton = new Sprite_SFButton();
        this._pageDownButton.setClickHandler(this.onPageDownButtonClick.bind(this));
        bitmaps = this.pageDownBitmap();
        this._pageDownButton.setColdBitmap(bitmaps.cold);
        this._pageDownButton.setHotBitmap(bitmaps.hot);
        position = this.pageDownPosition();
        this._pageDownButton.move(position.x, position.y);
        this._pageDownButton.visible = false;
        this._pageDownButton.refresh();

        this.addChild(this._pageUpButton);
        this.addChild(this._pageDownButton);
    }

    Window_PagingBase.prototype.createPageNumber = function () {
        var style = this.pageNumberStyle();
        var position = this.pageNumberPosition();
        this._pageIndexText = new PIXI.Text('', style);
        this._pageIndexText.anchor.set(0.5, 0.5);
        this._pageIndexText.position.set(position.x, position.y);
        this._pageIndexText.visible = false;
        this.addChild(this._pageIndexText);
    }

    Window_PagingBase.prototype.makeItemList = function () {
        // overwrite this
        return [];
    }

    Window_PagingBase.prototype.setItemList = function (itemList) {
        this._itemList = itemList;
        this._pageMax = Math.ceil(this._itemList.length / this.maxPageItems());
        this._pageIndex = 0;
        // this.refresh();
    }

    Window_PagingBase.prototype.setPageIndex = function (pageIndex) {
        this._pageIndex = pageIndex.clamp(0, this._pageMax);
        this.refresh();
    }

    Window_PagingBase.prototype.refresh = function () {
        this.refreshItem();
        this.refreshPageNumber();
        this.refreshPageButton();
        this.setStateToItem(-1, 'pointer-out');
    }

    Window_PagingBase.prototype.refreshItem = function () {
        this.contents.clear();
        this.drawAllItems();
    }

    Window_PagingBase.prototype.refreshPageNumber = function () {
        if (!this.isShowPageNumber()) return;
        var text = this._pageIndexText;
        var pageIndex = this._pageIndex;
        var pageCount = this._pageMax;
        this.updatePageNumber(text, pageIndex, pageCount);
    }

    Window_PagingBase.prototype.refreshPageButton = function () {
        if (!this.isShowPageButton()) return;
        var pageIndex = this._pageIndex;
        var pageCount = this._pageMax;
        var pageUpButton = this._pageUpButton;
        var pageDownButton = this._pageDownButton;
        pageUpButton.visible = pageIndex > 0;
        pageDownButton.visible = pageIndex < pageCount - 1;

        if (!pageUpButton.visible) pageUpButton.releasePointer();
        if (!pageDownButton.visible) pageDownButton.releasePointer();
    }

    Window_PagingBase.prototype.onPageUpButtonClick = function () {
        this.setPageIndex(this._pageIndex - 1);
    }

    Window_PagingBase.prototype.onPageDownButtonClick = function () {
        this.setPageIndex(this._pageIndex + 1);
    }


    Window_PagingBase.prototype.drawAllItems = function () {
        var index = this._pageIndex * this.maxPageItems();
        var maxItems = this.maxPageItems();
        for (var i = 0; i < maxItems; i++) {
            this.drawItem(index + i);
        }
    }

    Window_PagingBase.prototype.getItem = function (index) {
        return this._itemList[index];
    }

    Window_PagingBase.prototype.drawItem = function (index) {
        // overwrite this
    }

    Window_PagingBase.prototype.update = function () {
        if (this.canUpdate()) {
            Window_Base.prototype.update.call(this);
            if (this._state !== 'pointer-out') {
                this.onItemPointerOver(this._pointerIndex);
            }
            this.updatePointer();
        }
    }

    Window_PagingBase.prototype.updatePointer = function () {
        var pointer = this.getPointer();
        if (pointer) {
            var x = this.canvasToLocalX(pointer.x);
            var y = this.canvasToLocalY(pointer.y);
            var maxItems = this.maxPageItems();
            var inFrame = false;
            var baseIndex = this._pageIndex * maxItems;
            for (var i = 0; i < maxItems; i++) {
                var rect = this.itemRect(i);
                if (rect.contains(x, y)) {
                    this.setPointerIndex(i + baseIndex, pointer);
                    inFrame = true;
                    break;
                }
            }

            if (!inFrame) {
                this.setPointerIndex(-1, pointer);
                pointer.removeUser();
            } else {
                pointer.setUser(this);
            }

        }
    }

    Window_PagingBase.prototype.setPointerIndex = function (index, pointer) {
        if (this._pointerIndex !== index) {
            this.setStateToItem(index, 'pointer-over');
        }
        if (index === -1) {
            return;
        }
        var events = pointer.getEvents();
        for (var i = 0; i < events.length; i++) {
            var event = events[i];
            if (event === 'pointer-down') {
                this.setStateToItem(index, 'pointer-down');
            } else if (event === 'pointer-up') {
                this.setStateToItem(index, 'pointer-over');
            } else if (event === 'pointer-cancel') {
                this.setStateToItem(index, 'pointer-out');
            }
        }
    }

    Window_PagingBase.prototype.setStateToItem = function (index, state) {
        if (index !== this._pointerIndex && this._pointerIndex !== -1) {
            if (this._state === 'pointer-down') {
                this._state = 'pointer-over';
                this.onItemPointerUp(this._pointerIndex);
            }
            if (this._state === 'pointer-over') {
                this._state = 'pointer-out';
                this.onItemPointerLeave(this._pointerIndex);
            }

        }
        this._pointerIndex = index;

        if (this._pointerIndex === -1 || this._state === state) {
            return;
        }

        if (state === 'pointer-out') {
            if (this._state === 'pointer-down') {
                this._state = 'pointer-over';
                this.onItemPointerUp(this._pointerIndex);
            }
            if (this._state === 'pointer-over') {
                this._state = 'pointer-out';
                this.onItemPointerLeave(this._pointerIndex);
            }
        } else if (state === 'pointer-down') {
            if (this._state === 'pointer-out') {
                this._state = 'pointer-over';
                this.onItemPointerEnter(this._pointerIndex);
            }
            if (this._state === 'pointer-over') {
                this._state = 'pointer-down';
                this.onItemPointerDown(this._pointerIndex);
            }
        } else if (state === 'pointer-over') {
            if (this._state === 'pointer-out') {
                this._state = 'pointer-over';
                this.onItemPointerEnter(this._pointerIndex);
            }
            if (this._state === 'pointer-down') {
                this._state = 'pointer-over';
                this.onItemPointerUp(this._pointerIndex);
                this.onItemClick(this._pointerIndex);
            }
        }

    }

    Window_PagingBase.prototype.onItemPointerDown = function (index) {
        // overwrite this
    }

    Window_PagingBase.prototype.onItemPointerUp = function (index) {
        // overwrite this
    }

    Window_PagingBase.prototype.onItemPointerMove = function (index) {
        // overwrite this
    }

    Window_PagingBase.prototype.onItemPointerOver = function (index) {
        // overwrite this
    }

    Window_PagingBase.prototype.onItemPointerEnter = function (index) {
        // overwrite this
    }

    Window_PagingBase.prototype.onItemPointerLeave = function (index) {
        // overwrite this
    }

    Window_PagingBase.prototype.onItemClick = function (index) {
        // overwrite this
    }

    Window_PagingBase.prototype.releasePointer = function () {
        Window_SFBase.prototype.releasePointer.call(this);
        this.setStateToItem(-1, 'pointer-out');
    }

})();