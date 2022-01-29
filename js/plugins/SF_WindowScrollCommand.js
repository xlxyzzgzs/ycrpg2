//=============================================================================
// SaltedFish Plugins - Window Scroll Command
// SF_WindowScrollCommand.js
// License: MIT
//=============================================================================

var Imported = Imported || {};
Imported.SF_WindowScrollCommand = true;

var SF_Plugins = SF_Plugins || {};
SF_Plugins.SF_WindowScrollCommand = SF_Plugins.SF_WindowScrollCommand || {};
SF_Plugins.SF_WindowScrollCommand.version = 1.0;

//=============================================================================
/*:
    * @plugindesc v1.0 Allows you to scroll text in selected commands.
    * @author SaltedFish
    *
    * @help
    * ============================================================================
    * Introduction
    * ============================================================================
    *
    * This plugin allows you to scroll text in selected commands.
    * As a dependent library.
    */
//=============================================================================

//=============================================================================
// Window  for Arrow
//=============================================================================
SF_Plugins.SF_WindowScrollCommand.Window_initialize = Window.prototype.initialize;
Window.prototype.initialize = function () {
    SF_Plugins.SF_WindowScrollCommand.Window_initialize.call(this);

    this.leftArrowVisible = false;
    this.rightArrowVisible = false;
}

SF_Plugins.SF_WindowScrollCommand.Window__createAllParts = Window.prototype._createAllParts;
Window.prototype._createAllParts = function () {
    SF_Plugins.SF_WindowScrollCommand.Window__createAllParts.call(this);

    var index = this.getChildIndex(this._downArrowSprite);
    this._leftArrowSprite = new Sprite();
    this._rightArrowSprite = new Sprite();
    this.addChildAt(this._leftArrowSprite, index);
    this.addChildAt(this._rightArrowSprite, index);
}

SF_Plugins.SF_WindowScrollCommand.Window__refreshArrows = Window.prototype._refreshArrows;
Window.prototype._refreshArrows = function () {
    SF_Plugins.SF_WindowScrollCommand.Window__refreshArrows.call(this);
    var w = this._width;
    var h = this._height;
    var p = 24;
    var q = p / 2;
    var sx = 96 + p;
    var sy = 0 + p;

    this._leftArrowSprite.bitmap = this._windowskin;
    this._leftArrowSprite.anchor.x = 0.5;
    this._leftArrowSprite.anchor.y = 0.5;
    this._leftArrowSprite.setFrame(sx, sy + q, q, p);
    this._leftArrowSprite.move(q, h / 2);

    this._rightArrowSprite.bitmap = this._windowskin;
    this._rightArrowSprite.anchor.x = 0.5;
    this._rightArrowSprite.anchor.y = 0.5;
    this._rightArrowSprite.setFrame(sx + p + q, sy + q, q, p);
    this._rightArrowSprite.move(w - q, h / 2);
}

SF_Plugins.SF_WindowScrollCommand.Window__updateArrows = Window.prototype._updateArrows;
Window.prototype._updateArrows = function () {
    SF_Plugins.SF_WindowScrollCommand.Window__updateArrows.call(this);
    this._leftArrowSprite.visible = this.isOpen() && this.leftArrowVisible;
    this._rightArrowSprite.visible = this.isOpen() && this.rightArrowVisible;
}

//=============================================================================

Window_Command.prototype.commandExt = function (index) {
    return this._list[index].ext;
}

Window_Base.prototype.isMouseInsideFrame = function () {
    var x = this.canvasToLocalX(TouchInput._mouseOverX);
    var y = this.canvasToLocalY(TouchInput._mouseOverY);
    return x >= 0 && y >= 0 && x < this.width && y < this.height;
}

SF_Plugins.SF_WindowScrollCommand.Window_Selectable_processWheel = Window_Selectable.prototype.processWheel;
Window_Selectable.prototype.processWheel = function () {
    if (this.isOpenAndActive() && this.isMouseInsideFrame()) {
        SF_Plugins.SF_WindowScrollCommand.Window_Selectable_processWheel.call(this);
    }
};

Window_Base.prototype.measureTextHeight = function (text) {
    var textState = { index: 0 };
    textState.text = this.convertEscapeCharacters(text);
    this.resetFontSettings();
    return this.calcTextHeight(textState, true);
}

Window_Base.prototype.isOpenAndActive = function () {
    return this.isOpen() && this.active;
};

Window_Base.prototype.isTouchedInsideFrame = function () {
    var x = this.canvasToLocalX(TouchInput.x);
    var y = this.canvasToLocalY(TouchInput.y);
    return x >= 0 && y >= 0 && x < this.width && y < this.height;
};

/**
 * 
 * Each Command Bitmap need Scroll
 * -------------------------------------------------------------------------------------
 * Empty Bitmap(this.contentsWidth()) | Text Bitmap | Empty Bitmap(this.contentsWidth())
 * -------------------------------------------------------------------------------------
 */
function Window_ScrollCommand() {
    this.initialize.apply(this, arguments);
}

Window_ScrollCommand.prototype = Object.create(Window_Command.prototype);
Window_ScrollCommand.prototype.constructor = Window_ScrollCommand;

Window_ScrollCommand.prototype.initialize = function () {
    this._need_scroll = false;
    this._commands_bitmap = [];
    this._commands_bitmap_offset = [];
    this._commands_need_scroll = [];
    this._offset_threshold = [];
    Window_Command.prototype.initialize.call(this, 0, 0);
}

// return width of text
Window_ScrollCommand.prototype.drawItemContent = function (index) {
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    return this.drawTextEx(this.commandName(index), this.contentsWidth(), 0);
}

Window_ScrollCommand.prototype.drawItem = function (index) {
    if (this._commands_bitmap[index] == undefined) {
        this._commands_bitmap[index] = new Bitmap(this.itemTextRectWidth(index), this.lineHeight());
        var bitmap = this._commands_bitmap[index];
        this._commands_bitmap_offset[index] = 0;

        var tmp_content = this.contents;
        this.contents = bitmap;
        var text_width = this.drawItemContent(index);
        if (text_width > bitmap.width) {
            this._commands_need_scroll[index] = true;
            this._commands_bitmap_offset[index] = this.contentsWidth();
        } else {
            this._commands_need_scroll[index] = false;
            this._commands_bitmap_offset[index] = this.contentsWidth();
        }
        this.contents.clear();
        this.contents.resize(text_width + this.contentsWidth() * 2, this.lineHeight());
        this._offset_threshold[index] = text_width + this.contentsWidth();
        this.drawItemContent(index);
        this.contents = tmp_content;
    }

    var rect = this.itemRectForText(index);
    var offset_x = this._commands_bitmap_offset[index];
    this.contents.blt(
        this._commands_bitmap[index],
        offset_x, 0, this.itemTextRectWidth(index), rect.height,
        rect.x, rect.y);
};

Window_ScrollCommand.prototype.itemTextRectWidth = function (index) {
    return this.itemRectForText(index).width;
}

Window_ScrollCommand.prototype.select = function (index) {
    //var old_index = this.index();
    Window_Command.prototype.select.call(this, index);
    if (index >= 0 && index < this.maxItems()) {
        this._need_scroll = this._commands_need_scroll[index];
        //this._commands_bitmap_offset[old_index] = this.contentsWidth();
        //this.redrawItem(old_index);
    }
}

Window_ScrollCommand.prototype.updateSelected = function () {
    var index = this.index();
    if (index >= 0 && index < this.maxItems()) {
        this._commands_bitmap_offset[index] += 1;
        if (this._commands_bitmap_offset[index] > this._offset_threshold[index]) {
            this._commands_bitmap_offset[index] = 0;
        }
        this.redrawItem(index);
    }
};

Window_ScrollCommand.prototype.update = function () {
    Window_Command.prototype.update.call(this);
    if (this.isOpenAndActive() && this._need_scroll) {
        this.updateSelected();
    }
}

Window_ScrollCommand.prototype.refresh = function () {
    this._commands_bitmap = [];
    this._commands_bitmap_offset = [];
    this._commands_need_scroll = [];
    this._offset_threshold = [];
    this._need_scroll = false;
    Window_Command.prototype.refresh.call(this);
};

(function () {
    //=============================================================================
    // Window_ScrollHelp
    //=============================================================================
    function Window_ScrollHelp() {
        this.initialize.apply(this, arguments);
    }
    window.Window_ScrollHelp = Window_ScrollHelp;

    Window_ScrollHelp.prototype = Object.create(Window_Base.prototype);
    Window_ScrollHelp.prototype.constructor = Window_ScrollHelp;
    Window_ScrollHelp.prototype.initialize = function (x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._text = '';
        this._offset_Y = 0;
        this._wheel_multiplier = 1;
        this._need_scroll = false;
        this.refresh();
    }
    Window_ScrollHelp.prototype.clear = function () {
        this._text = '';
        this._wheel_multiplier = 1;
        this._touching = false;
        this._need_scroll_X = false;
        this._need_scroll_Y = false;
        this.refresh();
    }
    Window_ScrollHelp.prototype.setText = function (text) {
        this._text = text;
        this.refresh();
    }
    Window_ScrollHelp.prototype.measureContentHeight = function () {
        return this.measureTextHeight(this._text);
    }
    Window_ScrollHelp.prototype.measureContentWidth = function () {
        return this.contentsWidth();
    }
    Window_ScrollHelp.prototype.drawContent = function () {
        this.drawTextEx(this._text, 1, 0);
    }
    Window_ScrollHelp.prototype.isHaveContent = function () {
        return !!this._text;
    }
    Window_ScrollHelp.prototype.refresh = function () {
        this.contents.clear();
        this._offset_Y = 0;
        this._offset_X = 0;
        this._need_scroll_X = false;
        this._need_scroll_Y = false;
        if (this.isHaveContent()) {
            this._bitmap_height = this.measureContentHeight();
            this._bitmap_width = this.measureContentWidth();
            this.contents.resize(this._bitmap_width, this._bitmap_height);
            this._need_scroll_Y = this._bitmap_height > this.contentsHeight();
            this._need_scroll_X = this._bitmap_width > this.contentsWidth();
            this.drawContent();
            this._windowContentsSprite.setFrame(0, 0, this.contentsWidth(), this.contentsHeight());
            this._windowContentsSprite._refresh();
        }
    }
    Window_ScrollHelp.prototype.update = function () {
        Window_Base.prototype.update.call(this);
        if (this.isOpenAndActive() && (this._need_scroll_X || this._need_scroll_Y)) {
            this.updateScroll();
        }
    }
    Window_ScrollHelp.prototype.updateScroll = function () {
        this.updateWheel();
        this.updateTouch();
    }
    Window_ScrollHelp.prototype.setWheelMultiplier = function (multiplier) {
        this._wheel_multiplier = multiplier;
    }
    Window_ScrollHelp.prototype.setOriginY = function (y) {
        this.origin.y = y;
        if (this.origin.y < 0) {
            this.origin.y = 0;
        } else if (this.origin.y > this._bitmap_height - this.contentsHeight()) {
            this.origin.y = this._bitmap_height - this.contentsHeight();
        }
    }
    Window_ScrollHelp.prototype.setOriginX = function (x) {
        this.origin.x = x;
        if (this.origin.x < 0) {
            this.origin.x = 0;
        } else if (this.origin.x > this._bitmap_width - this.contentsWidth()) {
            this.origin.x = this._bitmap_width - this.contentsWidth();
        }
    }
    Window_ScrollHelp.prototype.updateWheel = function () {
        if (Input.isPressed('shift')) { // wheel Y as scroll X
            if (this._need_scroll_X && Math.abs(TouchInput.wheelY) > 0) {
                if (this.isMouseInsideFrame()) {
                    var offset = this._wheel_multiplier * TouchInput.wheelY;
                    this.setOriginX(this.origin.x + offset);

                }
            }
        } else {
            if (this._need_scroll_Y && Math.abs(TouchInput.wheelY) > 0) {
                if (this.isMouseInsideFrame()) {
                    var offset = this._wheel_multiplier * TouchInput.wheelY;
                    this.setOriginY(this.origin.y + offset);

                }
            }
        }

        if (this._need_scroll_X && Math.abs(TouchInput.wheelX) > 0) {
            if (this.isMouseInsideFrame()) {
                var offset = this._wheel_multiplier * TouchInput.wheelX;
                this.setOriginX(this.origin.x + offset);
            }
        }
    }

    Window_ScrollHelp.prototype.updateTouch = function () {
        var inFrame = this.isTouchedInsideFrame();
        if (TouchInput.isTriggered() && inFrame) {
            this._touching = true;
            this._last_touch_y = TouchInput.y;
            this._last_touch_x = TouchInput.x;
        } else if (TouchInput.isReleased()) {
            this._touching = false;
        }
        if (this._touching) {
            if (this._need_scroll_Y) {
                var offset = this._last_touch_y - TouchInput.y;
                this._last_touch_y = TouchInput.y;
                this.setOriginY(this.origin.y + offset);
            }
            if (this._need_scroll_X) {
                var offset = this._last_touch_x - TouchInput.x;
                this._last_touch_x = TouchInput.x;
                this.setOriginX(this.origin.x + offset);
            }
        }
    }
})();


//=============================================================================
// Window_SFSelectable
//=============================================================================

function Window_SFSelectable() {
    this.initialize.apply(this, arguments);
}

Window_SFSelectable.prototype = Object.create(Window_Base.prototype);
Window_SFSelectable.prototype.constructor = Window_SFSelectable;

Window_SFSelectable.prototype.initialize = function (x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._index = -1;
    this._handlers = {};

    this._helpWindow = null;

    this._cursorFixed = false;
    this._cursorAll = false;

    this._touching = false;
    this._last_touch_x = 0;
    this._last_touch_y = 0;

    this._need_scroll_X = false;
    this._need_scroll_Y = false;
    this._wheel_multiplier = 1;

    this._scrollX = 0;
    this._scrollY = 0;
    this._scrolled = false;

    this._origin_x = 0;
    this._origin_y = 0;
    this._origin_width = 0;
    this._origin_height = 0;

    this.deactivate();
}

Window_SFSelectable.prototype.index = function () {
    return this._index;
}

Window_SFSelectable.prototype.cursorFixed = function () {
    return this._cursorFixed;
};

Window_SFSelectable.prototype.setCursorFixed = function (cursorFixed) {
    this._cursorFixed = cursorFixed;
};

Window_SFSelectable.prototype.cursorAll = function () {
    return this._cursorAll;
};

Window_SFSelectable.prototype.setCursorAll = function (cursorAll) {
    this._cursorAll = cursorAll;
};

Window_SFSelectable.prototype.maxCols = function () {
    return 1;
}

Window_SFSelectable.prototype.maxItems = function () {
    return 0;
}

Window_SFSelectable.prototype.maxRows = function () {
    return Math.max(Math.ceil(this.maxItems() / this.maxCols()), 1);
}

Window_SFSelectable.prototype.spacing = function () {
    return 12;
}

Window_SFSelectable.prototype.itemWidth = function () {
    throw new Error('This method needs to be overwritten.');
}

Window_SFSelectable.prototype.itemHeight = function () {
    throw new Error('This method needs to be overwritten.');
}

Window_SFSelectable.prototype.activate = function () {
    Window_Base.prototype.activate.call(this);
    this.reselect();
}

Window_SFSelectable.prototype.deactivate = function () {
    Window_Base.prototype.deactivate.call(this);
    this.reselect();
}

Window_SFSelectable.prototype.select = function (index) {
    this._index = index;
    this.ensureCursorVisible();
    this.updateCursor();
    this.callUpdateHelp();
}

Window_SFSelectable.prototype.deselect = function () {
    this.select(-1);
}

Window_SFSelectable.prototype.reselect = function () {
    this.select(this._index);
}

Window_SFSelectable.prototype.row = function () {
    return Math.floor(this.index() / this.maxCols());
}

Window_SFSelectable.prototype.topRow = function () {
    return Math.max(0, this._scrollY);
}

Window_SFSelectable.prototype.setTopRow = function (row) {
    var scrollY = row.clamp(0, this.maxTopRow());
    if (this._scrollY !== scrollY) {
        this._scrollY = scrollY;
        this.refresh();
        this.updateCursor();
    }
}

Window_SFSelectable.prototype.bottomRow = function () {
    return Math.max(0, this.topRow() + this.maxPageRows() - 1);
}

Window_SFSelectable.prototype.setBottomRow = function (row) {
    this.setTopRow(row - (this.maxPageRows() - 1));
}

Window_SFSelectable.prototype.maxPageRows = function () {
    var pageHeight = this.height - this.padding * 2;
    return Math.min(Math.floor(pageHeight / this.itemHeight()) || 1, this.maxRows());
}

Window_SFSelectable.prototype.maxTopRow = function () {
    return Math.max(0, this.maxRows() - this.maxPageRows());
}

Window_SFSelectable.prototype.col = function () {
    return this.index() % this.maxCols();
}

Window_SFSelectable.prototype.leftCol = function () {
    return Math.max(0, this._scrollX);
}

Window_SFSelectable.prototype.setLeftCol = function (col) {
    var scrollX = col.clamp(0, this.maxLeftCol());
    if (this._scrollX !== scrollX) {
        this._scrollX = scrollX;
        this.refresh();
        this.updateCursor();
    }
}

Window_SFSelectable.prototype.rightCol = function () {
    return Math.max(0, this.leftCol() + this.maxPageCols() - 1);
}

Window_SFSelectable.prototype.setRightCol = function (col) {
    this.setLeftCol(col - (this.maxPageCols() - 1));
}

Window_SFSelectable.prototype.maxPageCols = function () {
    var pageWidth = this.width - this.padding * 2;
    return Math.min(Math.floor(pageWidth / this.itemWidth()) || 1, this.maxCols());
}

Window_SFSelectable.prototype.maxLeftCol = function () {
    return Math.max(0, this.maxCols() - this.maxPageCols());
}

Window_SFSelectable.prototype.resetScroll = function () {
    this.setTopRow(0);
    this.setLeftCol(0);
}

Window_SFSelectable.prototype.maxPageItems = function () {
    return this.maxPageRows() * this.maxPageCols();
}

Window_SFSelectable.prototype.topIndex = function () {
    return this.topRow() * this.maxCols() + this.leftCol();
}

Window_SFSelectable.prototype.itemRect = function (index) {
    var rect = new Rectangle();
    var maxCols = this.maxCols();
    rect.width = this.itemWidth();
    rect.height = this.itemHeight();
    rect.x = (index % maxCols - this.leftCol()) * (rect.width + this.spacing());
    rect.y = Math.floor(index / maxCols - this.topRow()) * rect.height;
    return rect;
}

Window_SFSelectable.prototype.itemRectForText = function (index) {
    var rect = this.itemRect(index);
    rect.x += this.textPadding();
    rect.width -= this.textPadding() * 2;
    return rect;
}

Window_SFSelectable.prototype.setHelpWindow = function (helpWindow) {
    this._helpWindow = helpWindow;
    this.callUpdateHelp();
};

Window_SFSelectable.prototype.showHelpWindow = function () {
    if (this._helpWindow) {
        this._helpWindow.show();
    }
};

Window_SFSelectable.prototype.hideHelpWindow = function () {
    if (this._helpWindow) {
        this._helpWindow.hide();
    }
};

Window_SFSelectable.prototype.setHandler = function (symbol, method) {
    this._handlers[symbol] = method;
};

Window_SFSelectable.prototype.isHandled = function (symbol) {
    return !!this._handlers[symbol];
};

Window_SFSelectable.prototype.callHandler = function (symbol) {
    if (this.isHandled(symbol)) {
        this._handlers[symbol]();
    }
};

Window_SFSelectable.prototype.isOpenAndActive = function () {
    return this.isOpen() && this.active;
};

Window_SFSelectable.prototype.isCursorMovable = function () {
    return (this.isOpenAndActive() && !this._cursorFixed &&
        !this._cursorAll && this.maxItems() > 0);
};

Window_SFSelectable.prototype.cursorUp = function (wrap) {
    var index = this.index();
    var maxItems = this.maxItems();
    var maxCols = this.maxCols();
    if (index >= maxCols || (wrap && maxCols === 1)) {
        this.select((index - maxCols + maxItems) % maxItems);
    }
};

Window_SFSelectable.prototype.cursorDown = function (wrap) {
    var index = this.index();
    var maxItems = this.maxItems();
    var maxCols = this.maxCols();
    if (index < maxItems - maxCols || (wrap && maxCols === 1)) {
        this.select((index + maxCols) % maxItems);
    }
};

Window_Selectable.prototype.isHorizontal = function () {
    return this.maxPageRows() === 1;
};

Window_SFSelectable.prototype.cursorRight = function (wrap) {
    var index = this.index();
    var maxItems = this.maxItems();
    var maxCols = this.maxCols();
    if (maxCols >= 2 && (index < maxItems - 1 || (wrap && this.isHorizontal()))) {
        this.select((index + 1) % maxItems);
    }
};

Window_SFSelectable.prototype.cursorLeft = function (wrap) {
    var index = this.index();
    var maxItems = this.maxItems();
    var maxCols = this.maxCols();
    if (maxCols >= 2 && (index > 0 || (wrap && this.isHorizontal()))) {
        this.select((index - 1 + maxItems) % maxItems);
    }
};

Window_Selectable.prototype.scrollUp = function () {
    if (this.topRow() > 0) {
        this.setTopRow(this.topRow() - 1);
    }
};

Window_Selectable.prototype.scrollDown = function () {
    if (this.topRow() + 1 < this.maxRows()) {
        this.setTopRow(this.topRow() + 1);
    }
};

Window_Selectable.prototype.scrollLeft = function () {
    if (this.leftCol() > 0) {
        this.setLeftCol(this.leftCol() - 1);
    }
}

Window_SFSelectable.prototype.scrollRight = function () {
    if (this.rightCol() < this.maxCols()) {
        this.setRightCol(this.rightCol() + 1);
    }
}

Window_SFSelectable.prototype.update = function () {
    Window_Base.prototype.update.call(this);
    this.updateArrows();
    this.processCursorMove();
    this.processHandling();
    this.processWheel();
    this.processTouch();
}

Window_SFSelectable.prototype.updateArrows = function () {
    var topRow = this.topRow();
    var maxTopRow = this.maxTopRow();
    this.downArrowVisible = maxTopRow > 0 && topRow < maxTopRow;
    this.upArrowVisible = topRow > 0;

    var leftCol = this.leftCol();
    var maxLeftCol = this.maxLeftCol();
    this.rightArrowVisible = maxLeftCol > 0 && leftCol < maxLeftCol;
    this.leftArrowVisible = leftCol > 0;
}

Window_SFSelectable.prototype.processCursorMove = function () {
    if (this.isCursorMovable()) {
        var lastIndex = this.index();
        if (Input.isRepeated('down')) {
            this.cursorDown(Input.isTriggered('down'));
        }
        if (Input.isRepeated('up')) {
            this.cursorUp(Input.isTriggered('up'));
        }
        if (Input.isRepeated('right')) {
            this.cursorRight(Input.isTriggered('right'));
        }
        if (Input.isRepeated('left')) {
            this.cursorLeft(Input.isTriggered('left'));
        }
        if (this.index() !== lastIndex) {
            SoundManager.playCursor();
        }
    }
}

Window_SFSelectable.prototype.processHandling = function () {
    if (this.isOpenAndActive()) {
        if (this.isOkEnabled() && this.isOkTriggered()) {
            this.processOk();
        } else if (this.isCancelEnabled() && this.isCancelTriggered()) {
            this.processCancel();
        }
    }
};

Window_SFSelectable.prototype.processWheel = function () {
    var inFrame = this.isMouseInsideFrame();
    if (inFrame && this.isOpen()) {
        var threshold = 20;
        var hasShift = Input.isPressed('shift');
        if (TouchInput.wheelY >= threshold) {
            if (!hasShift) {
                this.scrollDown();
            } else {
                this.scrollRight();
            }
        }
        if (TouchInput.wheelY <= threshold) {
            if (!hasShift) {
                this.scrollUp();
            } else {
                this.scrollLeft();
            }
        }
    }
}

Window_SFSelectable.prototype.processTouch = function () {
    var inFrame = this.isTouchedInsideFrame();
    if (this.isOpenAndActive()) {
        if (TouchInput.isTriggered() && inFrame) {
            this._touching = true;
            this._last_touch_x = TouchInput.x;
            this._last_touch_y = TouchInput.y;
            this._scrolled = false;
            this.onTouch(true);
        } else if (TouchInput.isReleased() || !inFrame) {
            this._touching = false;
            this.onTouch(false);
        } else if (TouchInput.isCancelled()) {
            if (this.isCancelEnabled()) {
                this.processCancel();
            }
        }
        if (this._touching) {
            var x = TouchInput.x;
            var y = TouchInput.y;
            var offset_x = x - this._last_touch_x;
            var offset_y = y - this._last_touch_y;
            var iw = this.itemWidth();
            var ih = this.itemHeight();
            if (offset_x >= iw) {
                this._last_touch_x = this._last_touch_x + iw;
                this._scrolled = true;
                this.scrollRight();
            }
            if (offset_x <= -iw) {
                this._last_touch_x = this._last_touch_x - iw;
                this._scrolled = true;
                this.scrollLeft();
            }
            if (offset_y >= ih) {
                this._last_touch_y = this._last_touch_y + ih;
                this._scrolled = true;
                this.scrollDown();
            }
            if (offset_y <= -ih) {
                this._last_touch_y = this._last_touch_y - ih;
                this._scrolled = true;
                this.scrollUp();
            }
        }
    }
}


Window_SFSelectable.prototype.hitTest = function (x, y) {
    var x2 = this.canvasToLocalX(x);
    var y2 = this.canvasToLocalY(y);
    if (this.isContentArea(x2, y2)) {
        var cx = x2 - this.padding;
        var cy = y2 - this.padding;
        var topIndex = this.topIndex();
        var maxPageItems = this.maxPageItems();
        var maxItems = this.maxItems();
        for (var i = 0; i < maxPageItems; i++) {
            var index = topIndex + i;
            if (index < maxItems) {
                var rect = this.itemRect(index);
                var right = rect.x + rect.width;
                var bottom = rect.y + rect.height;
                if (cx >= rect.x && cy >= rect.y && cx < right && cy < bottom) {
                    return index;
                }
            }
        }
    }
    return -1;
}
