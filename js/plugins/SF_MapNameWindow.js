//=============================================================================
// SaltedFish Plugins - Map Name Window
// SF_MapNameWindow.js
//=============================================================================

"use strict";
var Imported = Imported || {};
Imported.SF_MapNameWindow = true;

var SF_Plugins = SF_Plugins || {};

//=============================================================================
/*:
    * @plugindesc v1.0 Adds a window to the map screen that displays the name of the map.
    * @author SaltedFish
    * 
    * @param Map Name Window
    * 
    * @param Map Name Window X
    * @desc The X position of the map name window.
    * @default 0
    * @type text
    * @parent Map Name Window
    * 
    * @param Map Name Window Y
    * @desc The Y position of the map name window.
    * @default 0
    * @type text
    * @parent Map Name Window
    * 
    * @param Map Name Window Width
    * @desc The width of the map name window.
    * @default Graphics.boxWidth
    * @type text
    * @parent Map Name Window
    * 
    * @param Map Name Window Height
    * @desc The height of the map name window.
    * @default Graphics.boxHeight
    * @type text
    * @parent Map Name Window
    * 
    * @param Map Name Window Font Size
    * @desc The font size of the map name window.
    * @default 28
    * @type text
    * @parent Map Name Window
    * 
    * @help
    * ============================================================================
    * Introduction
    * ============================================================================
    * 
    * This plugin adds a window to the map screen that displays the name of the map.
    * 
    */
//=============================================================================

(function () {
    var SF_MapNameWindow = SF_MapNameWindow || {};
    SF_Plugins.SF_MapNameWindow = SF_MapNameWindow;
    SF_MapNameWindow.version = 1.0;

    //=============================================================================
    // Parameters
    //=============================================================================

    SF_MapNameWindow.Parameters = PluginManager.parameters('SF_MapNameWindow');

    SF_MapNameWindow.MapNameWindow_X = SF_MapNameWindow.Parameters['Map Name Window X'] || 0;
    SF_MapNameWindow.MapNameWindow_Y = SF_MapNameWindow.Parameters['Map Name Window Y'] || 0;
    SF_MapNameWindow.MapNameWindow_Width = SF_MapNameWindow.Parameters['Map Name Window Width'] || Graphics.boxWidth;
    SF_MapNameWindow.MapNameWindow_Height = SF_MapNameWindow.Parameters['Map Name Window Height'] || Graphics.boxHeight;
    SF_MapNameWindow.MapNameWindow_FontSize = SF_MapNameWindow.Parameters['Map Name Window Font Size'] || 28;

    SF_MapNameWindow.MapNameWindow_ShowOpacity = 180;
    SF_MapNameWindow.MapNameWindow_HideOpacity = 50;
    //=============================================================================
    // Winddow_SFMapName 
    //=============================================================================


    /**
     * The window that displays the name of the map.
     * 
     * this._mapNameBitmap:
     * The bitmap that displays the name of the map.
     * -----------------------------------------------------------------------------
     * Empty Area(this.contentsWidth()) |  Name of the map | Empty Area(this.contentsWidth())
     * -----------------------------------------------------------------------------
     */
    function Window_SFMapName() {
        this.initialize.apply(this, arguments);
    }

    Window_SFMapName.prototype = Object.create(Window_Base.prototype);
    Window_SFMapName.prototype.constructor = Window_SFMapName;

    Window_SFMapName.prototype.initialize = function () {
        this._x = eval(SF_MapNameWindow.MapNameWindow_X);
        this._y = eval(SF_MapNameWindow.MapNameWindow_Y);
        this._width = eval(SF_MapNameWindow.MapNameWindow_Width);
        this._height = eval(SF_MapNameWindow.MapNameWindow_Height);
        this._fontSize = eval(SF_MapNameWindow.MapNameWindow_FontSize);
        this._mapName = "";
        this._mapNameBitmap = null;
        this._mapNameScroll = false;
        this._mapNameOffset = 0;

        Window_Base.prototype.initialize.call(this, this._x, this._y, this._width, this._height);

        this.opacity = SF_MapNameWindow.MapNameWindow_ShowOpacity;

    }

    Window_SFMapName.prototype.windowWidth = function () {
        return this._width;
    }

    Window_SFMapName.prototype.windowHeight = function () {
        return this._height;
    }

    Window_SFMapName.prototype.standardFontSize = function () {
        return this._fontSize;
    }

    Window_SFMapName.prototype.lineHeight = function () {
        return this.standardFontSize() + 8;
    }

    Window_SFMapName.prototype.standardPadding = function () {
        return 8;
    }

    Window_SFMapName.prototype.refresh = function () {
        this.contents.clear();
        if (this._mapNameScroll) {
            //this._windowContentsSprite.setFrame(this._mapNameOffset, 0, this.contentsWidth(), this.contentsHeight());
            this.contents.blt(
                this._mapNameBitmap,
                this._mapNameOffset, 0,
                this.contentsWidth(),
                this.contentsHeight(),
                0, 0
            );
        } else {
            //this.contents.setFrame(-this._mapNameOffset, 0, this.contentsWidth(), this.contentsHeight());
            this.contents.blt(
                this._mapNameBitmap,
                this.contentsWidth(), 0,
                this._mapNameBitmap.width - this.contentsWidth() * 2,
                this._mapNameBitmap.height,
                this._mapNameOffset, 0
            );
        }
    }

    Window_SFMapName.prototype.update = function () {
        Window_Base.prototype.update.call(this);
        if (this._mapNameScroll) {
            this._mapNameOffset += 1;
            if (this._mapNameOffset > this._mapNameBitmap.width - this.contentsWidth()) {
                this._mapNameOffset = 0;
            }
            this.refresh();
        }
        this.updatePlayerTouched();
    }

    Window_SFMapName.prototype.setMapName = function (mapName) {
        this._mapName = mapName;

        var w = this.drawTextEx(this._mapName, 0, 0);
        if (w > this.contentsWidth()) {
            this._mapNameScroll = true;
            this._mapNameOffset = 0;
            //w = w + this.contentsWidth();
        } else {
            this._mapNameScroll = false;
            this._mapNameOffset = (this.contentsWidth() - w) / 2;
        }

        this._mapNameBitmap = new Bitmap(w + this.contentsWidth() * 2, this.contentsHeight());
        var tmp_bitmap = this.contents;
        this.contents = this._mapNameBitmap;
        this.drawTextEx(this._mapName, this.contentsWidth(), 0);
        this.contents = tmp_bitmap;

        this.refresh();
    }

    Window_SFMapName.prototype.isPlayerTouched = function () {
        var lx = $gamePlayer.screenX() - 40;
        var rx = $gamePlayer.screenX() + 40;
        var ty = $gamePlayer.screenY() - 80;
        var by = $gamePlayer.screenY() + 20;
        if (rx < this._x || by < this._y) return false;
        if (lx > (this._x + this._width)) return false;
        if (ty > (this._y + this._height)) return false;
        return true;
    };

    Window_SFMapName.prototype.updatePlayerTouched = function () {
        if (this.isPlayerTouched()) {
            this.opacity = SF_MapNameWindow.MapNameWindow_HideOpacity;
        } else {
            this.opacity = SF_MapNameWindow.MapNameWindow_ShowOpacity;
        }
    }
    //=============================================================================
    // Scene_Map
    //=============================================================================

    SF_MapNameWindow.Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function () {
        SF_MapNameWindow.Scene_Map_createAllWindows.call(this);
        if ($gameMap.displayName()) {
            this._sfmapNameWindow = new Window_SFMapName();
            this._sfmapNameWindow.setMapName($gameMap.displayName());
            this.addWindow(this._sfmapNameWindow);
            this._sfmapNameWindow.open();
            this._sfmapNameWindow.deactivate();
        }
    }
})();