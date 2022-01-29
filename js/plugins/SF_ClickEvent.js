//=============================================================================
// Salted Fish Plugins - Click Event
// SF_ClickEvent.js
//=============================================================================

var Imported = Imported || {};
Imported.SF_ClickEvent = true;

var SF_Plugins = SF_Plugins || {};

//=============================================================================
/*:
    * @plugindesc Allows you to add a click event to object.
    * @author Salted Fish
    * 
    * @help
    * ============================================================================
    * Introduction
    * ============================================================================
    * 
    * This plugin allows you to add a click event to object.
    *
    * Use as a dependency.
    */

//=============================================================================
(function () {
    var SF_ClickEvent = {};
    SF_Plugins.SF_ClickEvent = SF_ClickEvent;

    SF_ClickEvent.version = 1.0;



    //=============================================================================
    // Scene_Base
    //=============================================================================

    SF_ClickEvent.Scene_Base_initialize = Scene_Base.prototype.initialize;
    Scene_Base.prototype.initialize = function () {
        SF_ClickEvent.Scene_Base_initialize.call(this);
        this._clickEvent = {};
        this._clicking = false;
        this._clickingName = null;
    }

    SF_ClickEvent.Scene_Base_update = Scene_Base.prototype.update;
    Scene_Base.prototype.update = function () {
        SF_ClickEvent.Scene_Base_update.call(this);
        this.updateClickEvent();
    }

    // register click event
    // @param {String} name
    // @param {Rectangle} rect - the hitArea of the object
    // @param {function} mousedown - the callback function
    // @param {function} mouseup - the callback function
    // @param {function} mouseclick - the callback function
    Scene_Base.prototype.registerClickEvent = function (name, hitArea, mousedown, mouseup, mouseclick) {
        this._clickEvent[name] = {
            name: name,
            hitArea: hitArea,
            mousedown: mousedown,
            mouseup: mouseup,
            mouseclick: mouseclick,
            enabled: true
        };
    }

    // unregister click event
    // @param {String} name
    Scene_Base.prototype.unregisterClickEvent = function (name) {
        delete this._clickEvent[name];
    }

    // enable click event
    // @param {String} name
    Scene_Base.prototype.enableClickEvent = function (name) {
        this._clickEvent[name].enabled = true;
    }

    // disable click event
    // @param {String} name
    Scene_Base.prototype.disableClickEvent = function (name) {
        this._clickEvent[name].enabled = false;
    }

    // update click event
    Scene_Base.prototype.updateClickEvent = function () {
        var touch_x = TouchInput.x;
        var touch_y = TouchInput.y;
        if (this._clicking) {
            if (
                this._clickingName &&
                this._clickEvent[this._clickingName]
            ) {
                var clickEvent = this._clickEvent[this._clickingName];
                var isContain = clickEvent.hitArea.contains(touch_x, touch_y);
                if (!isContain || !clickEvent.enabled) {
                    this._clicking = false;
                    this._clickingName = null;
                    if (clickEvent.mouseup) {
                        clickEvent.mouseup();
                    }
                } else if (TouchInput.isReleased()) {
                    this._clicking = false;
                    this._clickingName = null;
                    if (clickEvent.mouseup) {
                        clickEvent.mouseup();
                    }
                    if (clickEvent.mouseclick) {
                        clickEvent.mouseclick();
                    }
                }
            } else {
                this._clicking = false;
                this._clickingName = null;
            }
        } else {
            var isTriggered = TouchInput.isTriggered();
            if (!isTriggered) {
                return;
            }
            for (var name in this._clickEvent) {
                var event = this._clickEvent[name];
                if (!event.enabled) {
                    continue;
                }
                var isContain = event.hitArea.contains(touch_x, touch_y);
                if (isContain) {
                    this._clicking = true;
                    this._clickingName = name;
                    if (event.mousedown) {
                        event.mousedown();
                    }
                    break;
                }
            }
        }
    }



})();

