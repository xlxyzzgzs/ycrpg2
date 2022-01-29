//=============================================================================
// SaltedFish Plugins - Input Bind Control
// SF_InputBindControl.js
//=============================================================================

"use strict";

var Imported = Imported || {};
Imported.SF_InputBindControl = true;

var SF_Plugins = SF_Plugins || {};

//=============================================================================
/*:
    * @plugindesc v1.0 support add anf remove input event listener
    * @author SaltedFish
    *
    * @help
    * ============================================================================
    * Introduction
    * ============================================================================
    *
    * This plugin support add and remove input event listener.
    *
    * ============================================================================
    * Plugin Commands
    * ============================================================================
    *
    * SF_InputBind Remove TouchInput
    * SF_InputBind Remove  Input
    *
    * to remove input / touchinput event listener
    *
    * -----------------------------------------------------------------------------
    *
    * SF_InputBind Setup  TouchInput
    * SF_InputBind Setup  Input
    *
    * to rebind input / touchinput event listener
    *
    * ============================================================================
    * Script Calls
    * ============================================================================
    *
    * TouchInput.removeEventHandlers()
    * Input.removeEventHandlers()
    *
    * to remove input / touchinput event listener
    *
    * -----------------------------------------------------------------------------
    *
    * TouchInput._setupEventHandlers()
    * Input._setupEventHandlers()
    *
    * to rebind input / touchinput event listener
    *
    * ============================================================================
    * Changelog
    * ============================================================================
    *
    * Version 1.0:
    * - Finished plugin
    */
//=============================================================================

(function () {
    var SF_InputBindControl = {};
    SF_Plugins.SF_InputBindControl = SF_InputBindControl;
    SF_InputBindControl.version = 1.0;

    //=============================================================================
    // TouchInput
    //=============================================================================

    //remove touch input event listener
    TouchInput.removeEventHandlers = function () {
        document.removeEventListener('mousedown', this._onMouseDownBind);
        document.removeEventListener('mousemove', this._onMouseMoveBind);
        document.removeEventListener('mouseup', this._onMouseUpBind);
        document.removeEventListener('wheel', this._onWheelBind);
        document.removeEventListener('touchstart', this._onTouchStartBind);
        document.removeEventListener('touchmove', this._onTouchMoveBind);
        document.removeEventListener('touchend', this._onTouchEndBind);
        document.removeEventListener('touchcancel', this._onTouchCancelBind);
        document.removeEventListener('pointerdown', this._onPointerDownBind);
    }

    //setup touch input event listener
    TouchInput._setupEventHandlers = function () {
        var isSupportPassive = Utils.isSupportPassiveEvent();
        this._onMouseDownBind = this._onMouseDown.bind(this);
        this._onMouseMoveBind = this._onMouseMove.bind(this);
        this._onMouseUpBind = this._onMouseUp.bind(this);
        this._onWheelBind = this._onWheel.bind(this);
        this._onTouchStartBind = this._onTouchStart.bind(this);
        this._onTouchMoveBind = this._onTouchMove.bind(this);
        this._onTouchEndBind = this._onTouchEnd.bind(this);
        this._onTouchCancelBind = this._onTouchCancel.bind(this);
        this._onPointerDownBind = this._onPointerDown.bind(this);
        document.addEventListener('mousedown', this._onMouseDownBind);
        document.addEventListener('mousemove', this._onMouseMoveBind);
        document.addEventListener('mouseup', this._onMouseUpBind);
        document.addEventListener('wheel', this._onWheelBind, isSupportPassive ? { passive: false } : false);
        document.addEventListener('touchstart', this._onTouchStartBind, isSupportPassive ? { passive: false } : false);
        document.addEventListener('touchmove', this._onTouchMoveBind, isSupportPassive ? { passive: false } : false);
        document.addEventListener('touchend', this._onTouchEndBind);
        document.addEventListener('touchcancel', this._onTouchCancelBind);
        document.addEventListener('pointerdown', this._onPointerDownBind);
    }

    //=============================================================================
    // Input
    //=============================================================================

    //remove input event listener
    Input.removeEventHandlers = function () {
        document.removeEventListener('keydown', this._onKeyDownBind);
        document.removeEventListener('keyup', this._onKeyUpBind);
        window.removeEventListener('blur', this._onLostFocusBind);
    }


    //setup input event listener
    Input._setupEventHandlers = function () {
        this._onKeyDownBind = this._onKeyDown.bind(this);
        this._onKeyUpBind = this._onKeyUp.bind(this);
        this._onLostFocusBind = this._onLostFocus.bind(this);
        document.addEventListener('keydown', this._onKeyDownBind);
        document.addEventListener('keyup', this._onKeyUpBind);
        window.addEventListener('blur', this._onLostFocusBind);
    }

    //=============================================================================
    // Plugin Command
    //=============================================================================

    SF_InputBindControl.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        SF_InputBindControl.Game_Interpreter_pluginCommand.call(this, command, args);
        if (command.toLowerCase() === 'sf_inputbind') {
            switch (args[0].toLowerCase()) {
                case 'remove':
                    switch (args[1].toLowerCase()) {
                        case 'touchinput':
                            TouchInput.removeEventHandlers();
                            break;
                        case 'input':
                            Input.removeEventHandlers();
                            break;
                    }
                    break;
                case 'setup':
                    switch (args[1].toLowerCase()) {
                        case 'touchinput':
                            TouchInput._setupEventHandlers();
                            break;
                        case 'input':
                            Input._setupEventHandlers();
                            break;
                    }
                    break;
            }
        }
    }

    //=============================================================================
    // TouchInput
    //=============================================================================

    SF_InputBindControl.TouchInput__onMouseMove = TouchInput._onMouseMove;
    TouchInput._onMouseMove = function (event) {
        SF_InputBindControl.TouchInput__onMouseMove.call(this, event);
        this._mouseOverX = Graphics.pageToCanvasX(event.pageX);
        this._mouseOverY = Graphics.pageToCanvasY(event.pageY);
    }

    SF_InputBindControl.TouchInput_clear = TouchInput.clear;
    TouchInput.clear = function () {
        SF_InputBindControl.TouchInput_clear.call(this);
        this._mouseOverX = -1;
        this._mouseOverY = -1;
    }

})()