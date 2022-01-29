//=============================================================================
// Saletd Fish Plugins - Sprites
// SF_Sprites.js
//=============================================================================
"use strict";
var Imported = Imported || {};
Imported.SF_Sprites = true;

var SF_Plugins = SF_Plugins || {};
//=============================================================================
/*:
    * @plugindesc sprite base for salted fish plugins
    * @author Salted Fish
    * 
    * @help
    * ============================================================================
    * Requirements
    * ============================================================================
    * 
    * This plugin requires the following plugins:
    *   SF_Core
    */
//=============================================================================

(function () {
    var SF_Sprites = {};
    SF_Plugins.Sprites = SF_Sprites;

    SF_Sprites.version = 1.0;


    //=============================================================================
    // Sprite_SFBase
    //=============================================================================

    function Sprite_SFBase() {
        this.initialize.apply(this, arguments);
    }

    SF_Sprites.Sprite_SFBase = Sprite_SFBase;
    window.Sprite_SFBase = Sprite_SFBase;

    Sprite_SFBase.prototype = Object.create(Sprite.prototype);
    Sprite_SFBase.prototype.constructor = Sprite_SFBase;

    Sprite_SFBase.prototype.initialize = function () {
        Sprite.prototype.initialize.apply(this, arguments);
        this._active = true;
    }

    Sprite_SFBase.prototype.activate = function () {
        this._active = true;
    }

    Sprite_SFBase.prototype.deactivate = function () {
        this._active = false;
    }

    Sprite_SFBase.prototype.isActive = function () {
        return this._active;
    }

    Sprite_SFBase.prototype.canUpdate = function () {
        return this.isActive() && this.visible && this.worldVisible;
    }

    //=============================================================================
    // Sprite_ButtonBase
    //=============================================================================

    function Sprite_ButtonBase() {
        this.initialize.apply(this, arguments);
    }

    SF_Sprites.Sprite_ButtonBase = Sprite_ButtonBase;
    window.Sprite_ButtonBase = Sprite_ButtonBase;

    Sprite_ButtonBase.prototype = Object.create(Sprite_SFBase.prototype);
    Sprite_ButtonBase.prototype.constructor = Sprite_ButtonBase;

    Sprite_ButtonBase.prototype.initialize = function () {
        Sprite_SFBase.prototype.initialize.apply(this, arguments);
        this._state = 'pointer-out';// pointer-over pointer-out pointer-down
    }

    Sprite_ButtonBase.prototype.onPointerOver = function () {
        // override 
    }

    Sprite_ButtonBase.prototype.onPointerMove = function () {
        // override
    }

    Sprite_ButtonBase.prototype.onPointerEnter = function () {
        // override
    }

    Sprite_ButtonBase.prototype.onPointerLeave = function () {
        // override
    }

    Sprite_ButtonBase.prototype.onPointerDown = function () {
        // override
    }

    Sprite_ButtonBase.prototype.onPointerUp = function () {
        // override
    }

    Sprite_ButtonBase.prototype.onClick = function () {
        // override
    }

    Sprite_ButtonBase.prototype.releasePointer = function () {
        Sprite_SFBase.prototype.releasePointer.call(this);
        this.setState('pointer-out');
    }

    Sprite_ButtonBase.prototype.update = function () {
        if (this.canUpdate()) {
            Sprite_SFBase.prototype.update.call(this);
            if (this._state !== 'pointer-out') {
                this.onPointerOver();
            }
            this.updatePointerEvent();
        }
    }

    Sprite_ButtonBase.prototype.updatePointerEvent = function () {
        var pointer = this.getPointer();
        if (pointer) {
            var events = pointer.getEvents();
            var inFrame = this.containsPoint(new Point(pointer.x, pointer.y));
            if (inFrame) {
                pointer.setUser(this);
                if (this._state === 'pointer-out') {
                    this.setState('pointer-over');
                }
                for (var i = 0; i < events.length; i++) {
                    var event = events[i];
                    if (event === 'pointer-down') {
                        this.setState('pointer-down');
                    } else if (event === 'pointer-up') {
                        this.setState('pointer-over');
                    } else if (event === 'pointer-move') {
                        this.onPointerMove();
                    } else if (event === 'pointer-cancel') {
                        this.setState('pointer-out');
                    }
                }
            } else {
                pointer.removeUser(this);
                this.setState('pointer-out');
            }
        } else if (this._state !== 'pointer-out') {
            this.setState('pointer-out');
        }
    }

    Sprite_ButtonBase.prototype.setState = function (state) {
        if (this._state !== state) {
            if (state === 'pointer-out') {
                if (this._state === 'pointer-down') {
                    this._state = 'pointer-over';
                    this.onPointerUp();
                }
                if (this._state === 'pointer-over') {
                    this._state = 'pointer-out';
                    this.onPointerLeave();
                }
            } else if (state === 'pointer-down') {
                if (this._state === 'pointer-out') {
                    this._state = 'pointer-over';
                    this.onPointerEnter();
                }
                if (this._state === 'pointer-over') {
                    this._state = 'pointer-down';
                    this.onPointerDown();
                }
            } else if (state === 'pointer-over') {
                if (this._state === 'pointer-out') {
                    this._state = 'pointer-over';
                    this.onPointerEnter();
                }
                if (this._state === 'pointer-down') {
                    this._state = 'pointer-over';
                    this.onPointerUp();
                    this.onClick();
                }
            } else {
                SF_Plugins.SF_Core.Utils.error('Sprite_ButtonBase.setState: unknown state: ' + state);
            }
        }
    }

    //=============================================================================
    // Sprite_SFButton
    //=============================================================================

    function Sprite_SFButton() {
        this.initialize.apply(this, arguments);
    }

    SF_Sprites.Sprite_SFButton = Sprite_SFButton;
    window.Sprite_SFButton = Sprite_SFButton;

    Sprite_SFButton.prototype = Object.create(Sprite_ButtonBase.prototype);
    Sprite_SFButton.prototype.constructor = Sprite_SFButton;

    Sprite_SFButton.prototype.initialize = function () {
        Sprite_ButtonBase.prototype.initialize.apply(this, arguments);
        this._coldBitmap = null;
        this._hotBitmap = null;
        this._clickHandler = null;
    }

    Sprite_SFButton.prototype.setColdBitmap = function (bitmap) {
        this._coldBitmap = bitmap;
    }

    Sprite_SFButton.prototype.setHotBitmap = function (bitmap) {
        this._hotBitmap = bitmap;
    }

    Sprite_SFButton.prototype.setClickHandler = function (handler) {
        this._clickHandler = handler;
    }

    Sprite_SFButton.prototype.onClick = function () {
        if (this._clickHandler) {
            this._clickHandler();
        }
    }

    Sprite_SFButton.prototype.refresh = function () {
        this.bitmap = this._coldBitmap;
    }

    Sprite_SFButton.prototype.onPointerEnter = function () {
        this.bitmap = this._hotBitmap;
    }

    Sprite_SFButton.prototype.onPointerLeave = function () {
        this.bitmap = this._coldBitmap;
    }
})();