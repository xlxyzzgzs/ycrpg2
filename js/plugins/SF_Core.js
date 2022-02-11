//=============================================================================
// Salted Fish Plugins - Core
// SF_Core.js
//=============================================================================
"use strict";
var Imported = Imported || {};
Imported.SF_Core = true;

var SF_Plugins = SF_Plugins || {};
//=============================================================================
/*:
    * @plugindesc core lib for salted fish plugins
    * @author Salted Fish
    */
//=============================================================================

(function () {
    var SF_Core = {};
    SF_Plugins.Core = SF_Core;

    SF_Core.version = 1.0;

    //=============================================================================
    // Sprite
    //=============================================================================

    Sprite.prototype.canvasToLocalX = function (x) {
        var node = this;
        while (node) {
            x -= node.x;
            node = node.parent;
        }
        return x;
    };

    Sprite.prototype.canvasToLocalY = function (y) {
        var node = this;
        while (node) {
            y -= node.y;
            node = node.parent;
        }
        return y;
    };

    //=============================================================================
    // Pointer
    //=============================================================================

    // event[array]: pointer-down, pointer-up, pointer-move, pointer-cancel
    function Pointer() {
        this.initialize.apply(this, arguments);
    }
    SF_Core.Pointer = Pointer;

    Pointer.prototype = Object.create(Object.prototype);
    Pointer.prototype.constructor = Pointer;

    Pointer.prototype.initialize = function (x, y) {
        this.x = x;
        this.y = y;
        this.event = [];
        this.ext = null;
        this.user = null;
    }

    Pointer.prototype.set = function (x, y) {
        this.x = x;
        this.y = y;
    }

    Pointer.prototype.setEvents = function (events) {
        this.event = events;
    }

    Pointer.prototype.addEvent = function (event) {
        this.event.push(event);
    }

    Pointer.prototype.clearEvent = function () {
        this.event = [];
    }

    Pointer.prototype.getEvents = function () {
        return this.event;
    }

    Pointer.prototype.setExt = function (ext) {
        this.ext = ext;
    }

    Pointer.prototype.getExt = function () {
        return this.ext;
    }

    Pointer.prototype.setUser = function (user) {
        this.user = user;
    }

    Pointer.prototype.getUser = function () {
        return this.user;
    }

    Pointer.prototype.removeUser = function () {
        this.user = null;
    }

    Pointer.prototype.isEmpty = function () {
        return this.event.length === 0;
    }

    Pointer.prototype.clear = function () {
        this.event = [];
        this.ext = null;
    }

    Pointer.prototype.isDown = function () {
        return this.event.indexOf('pointer-down') >= 0;
    }

    Pointer.prototype.isUp = function () {
        return this.event.indexOf('pointer-up') >= 0;
    }

    Pointer.prototype.isMove = function () {
        return this.event.indexOf('pointer-move') >= 0;
    }

    Pointer.prototype.isCancel = function () {
        return this.event.indexOf('pointer-cancel') >= 0;
    }

    Pointer.prototype.isCanUsed = function (user) {
        return this.user === user || this.user === null;
    }

    //=============================================================================
    // TouchInput
    //=============================================================================
    SF_Core.TouchInput_clear = TouchInput.clear;
    TouchInput.clear = function () {
        SF_Core.TouchInput_clear.call(this);

        this._pointer = {};
        this._losedPointer = [];

        this._mouseValid = false;
        this._mouse = new Pointer(0, 0);
        this._events._mouse = new Pointer(0, 0);
        this._events._mouseValid = false;

        this._events.event = null;
        this._events._pointer = {};
        this._events._losedPointer = [];
    }

    SF_Core.TouchInput_update = TouchInput.update;
    TouchInput.update = function () {
        SF_Core.TouchInput_update.call(this);

        // update mouse
        if (this._events._mouseValid) {
            this._mouse.set(this._events._mouse.x, this._events._mouse.y);
            this._mouse.setEvents(this._events._mouse.getEvents());
            this._mouse.setExt(this._events._mouse.getExt());
            this._mouseValid = true;

            this._events._mouseValid = false;
            this._events._mouse.clear();
        } else {
            this._mouse.clear();
        }

        // update pointer
        this._losedPointer = this._events._losedPointer;
        this._events._losedPointer = [];

        // delete losed pointer
        var tmp_pointer = {};
        for (var i in this._pointer) {
            var pointer = this._pointer[i];
            if (pointer.isCancel() || pointer.isUp()) {
                continue;
            }
            tmp_pointer[i] = pointer;
        }
        this._pointer = tmp_pointer;

        for (var i in this._events._pointer) {
            var pointer = this._events._pointer[i];
            if (pointer.isCancel() || pointer.isUp()) {
                SF_Core.Utils.error('pointer cancel or up');
            }
            var p = this._pointer[i];
            if (p) {
                p.set(pointer.x, pointer.y);
                p.setEvents(pointer.getEvents());
                p.setExt(pointer.getExt());

            } else {
                this._pointer[i] = pointer;
            }
        }
    }

    SF_Core.TouchInput_onMouseDown = TouchInput._onMouseDown;
    TouchInput._onMouseDown = function (event) {
        SF_Core.TouchInput_onMouseDown.call(this, event);

        this._events.event = event;
        this._events._mouseValid = true;
        var x = Graphics.pageToCanvasX(event.pageX);
        var y = Graphics.pageToCanvasY(event.pageY);
        this._events._mouse.set(x, y);
        this._events._mouse.addEvent('pointer-down');
    }

    SF_Core.TouchInput__onMouseMove = TouchInput._onMouseMove;
    TouchInput._onMouseMove = function (event) {
        SF_Core.TouchInput__onMouseMove.call(this, event);

        this._events.event = event;
        this._events._mouseValid = true;
        var x = Graphics.pageToCanvasX(event.pageX);
        var y = Graphics.pageToCanvasY(event.pageY);
        this._events._mouse.set(x, y);
        this._events._mouse.addEvent('pointer-move');
    }

    SF_Core.TouchInput__onMouseUp = TouchInput._onMouseUp;
    TouchInput._onMouseUp = function (event) {
        SF_Core.TouchInput__onMouseUp.call(this, event);

        this._events.event = event;
        this._events._mouseValid = true;
        var x = Graphics.pageToCanvasX(event.pageX);
        var y = Graphics.pageToCanvasY(event.pageY);
        this._events._mouse.set(x, y);
        this._events._mouse.addEvent('pointer-up');
    }

    SF_Core.TouchInput__onMouseWheel = TouchInput._onMouseWheel;
    TouchInput._onMouseWheel = function (event) {
        SF_Core.TouchInput__onMouseWheel.call(this, event);

        this._events.event = event;
    }

    SF_Core.TouchInput__onTouchStart = TouchInput._onTouchStart;
    TouchInput._onTouchStart = function (event) {
        SF_Core.TouchInput__onTouchStart.call(this, event);
        this._events.event = event;
        this._pointerFromTouch(event, "pointer-down");
    }

    SF_Core.TouchInput__onTouchMove = TouchInput._onTouchMove;
    TouchInput._onTouchMove = function (event) {
        SF_Core.TouchInput__onTouchMove.call(this, event);
        this._events.event = event;
        this._pointerFromTouch(event, "pointer-move");
    }

    SF_Core.TouchInput__onTouchEnd = TouchInput._onTouchEnd;
    TouchInput._onTouchEnd = function (event) {
        SF_Core.TouchInput__onTouchEnd.call(this, event);
        //console.log(event.changedTouches);
        this._events.event = event;
        this._pointerFromTouch(event, "pointer-up");
    }

    SF_Core.TouchInput__onTouchCancel = TouchInput._onTouchCancel;
    TouchInput._onTouchCancel = function (event) {
        SF_Core.TouchInput__onTouchCancel.call(this, event);
        this._events.event = event;
        this._pointerFromTouch(event, "pointer-cancel");
    }

    TouchInput._pointerFromTouch = function (event, type) {
        for (var i = 0; i < event.changedTouches.length; i++) {
            var touch = event.changedTouches[i];
            var x = Graphics.pageToCanvasX(touch.pageX);
            var y = Graphics.pageToCanvasY(touch.pageY);
            var id = touch.identifier;
            var pointer = this._events._pointer[id];
            if (!pointer) {
                pointer = new Pointer(x, y);
                this._events._pointer[id] = pointer;
            }
            pointer.set(x, y);
            pointer.addEvent(type);

            switch (type) {
                case "pointer-down":
                    break;
                case "pointer-up":
                case "pointer-cancel":
                    delete this._events._pointer[id];
                    this._events._losedPointer.push(pointer);
                    break;
            }

        }
    }

    TouchInput.getPointers = function (user) {
        var result = [];
        if (this._mouseValid && this._mouse.isCanUsed(user)) {
            result.push(this._mouse);
        }
        for (var i = 0; i < this._losedPointer.length; i++) {
            var pointer = this._losedPointer[i];
            if (pointer.isCanUsed(user)) {
                result.push(pointer);
            }
        }
        for (var i in this._pointer) {
            var pointer = this._pointer[i];
            if (pointer.isCanUsed(user)) {
                result.push(pointer);
            }
        }
        return result;
    }

    TouchInput.removeUsers = function () {
        for (var i in this._pointer) {
            var pointer = this._pointer[i];
            pointer.removeUser();
        }
        for (var i = 0; i < this._losedPointer.length; i++) {
            var pointer = this._losedPointer[i];
            pointer.removeUser();
        }
        this._mouse.removeUser();
    }

    //=============================================================================
    // PIXI.Container
    //=============================================================================

    PIXI.Container.prototype.getPointer = function () {
        var pointers = TouchInput.getPointers(this);
        var lastUsePointer = null;
        var inFramePointer = null;
        for (var i = 0; i < pointers.length; i++) {
            if (pointers[i].getUser() === this) {
                lastUsePointer = pointers[i];
                break;
            }
            if (this.containsPoint(new Point(pointers[i].x, pointers[i].y))) {
                inFramePointer = pointers[i];
            }
        }

        return lastUsePointer || inFramePointer || pointers[0] || null;
    }

    PIXI.Container.prototype.releasePointer = function () {
        var pointer = this.getPointer();
        if (pointer) {
            pointer.removeUser();
        }
    }

    //=============================================================================
    // SF_Utils
    //=============================================================================

    SF_Core.Utils = {};

    SF_Core.Utils.assert = function (condition, message) {
        if (!condition) {
            SF_Core.Utils.error(message);
        }
    };

    SF_Core.Utils.error = function (message) {
        if (typeof console === "object") {
            console.error(message);
        }
        throw new Error(message);
    };

    //=============================================================================
    // CallBack Scope Transport
    //=============================================================================

    function CallBack() {
        throw new Exception("this is static method");
    }
    window.CallBack = CallBack;

    CallBack.initialize = function () {
        this.clear();
    }

    // Return closureIndex
    CallBack.getNew = function () {
        var closureIndex = this._closureIndex++;
        return closureIndex;
    }

    CallBack.setByClosureIndex = function (closureIndex, closureFunction) {
        this._closureFunction[closureIndex] = closureFunction;
    }

    CallBack.unregister = function (closureIndex) {
        delete this._closureFunction[closureIndex];
    }

    CallBack.callByClosureIndex = function (closureIndex) {
        if (this._closureFunction[closureIndex]) {
            this._closureFunction[closureIndex]();
        }
    }

    CallBack.convertToString = function (closureIndex) {
        return "CallBack.callByClosureIndex(" + closureIndex + ")";
    }

    CallBack.clear = function () {
        this._closureFunction = {};
        this._closureIndex = 0;
    }

    CallBack.registerOneTime = function (closureFunction) {
        var closureIndex = this.getNew();
        this.setByClosureIndex(closureIndex, (function () { closureFunction(); this.unregister(closureIndex); }).bind(this));
        return this.convertToString(closureIndex);
    }

    CallBack.registerOneTimeList = function (closureFunctionList) {
        var indexList = [];
        var result = [];

        for (var i = 0; i < closureFunctionList.length; i++) {
            var index = this.getNew();
            indexList.push(index);
        }

        var removeAllFunc = (function () {
            for (var i = 0; i < indexList.length; i++) {
                this.unregister(indexList[i]);
            }
        }).bind(this);

        for (var i = 0; i < indexList.length; i++) {
            this.setByClosureIndex(indexList[i], (function (i) {
                return (function () { closureFunctionList[i](); removeAllFunc(); });
            })(i).bind(this));
            result.push(this.convertToString(indexList[i]));
        }

        return result;
    }

})();