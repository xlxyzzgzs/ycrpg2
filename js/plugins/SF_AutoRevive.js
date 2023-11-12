//=============================================================================
// Salted Fish Plugins - Auto Revive
// SF_AutoRevive.js
//=============================================================================

"use strict";
var Imported = Imported || {};
Imported.SF_AutoRevive = true;

var SF_Plugins = SF_Plugins || {};

//=============================================================================
/*:
 * @plugindesc v1.0.0 - Automatically revive dead party members.
 * @author Salted Fish
 *
 * @help
 *
 * ===========================================================================
 * Introduction
 * ===========================================================================
 *
 * This plugin automatically revives dead party members before Game Over.
 *
 * ===========================================================================
 * Map Notetags
 * ===========================================================================
 *
 * You can use the following notetags to specify the position of the revive
 *
 * <Revive Position:x,y,d>
 *  - x and y are the coordinates of the revive position.
 *   - x and y are relative to the map.
 *   - d is the direction the revive will face.
 *       - 0 is same as before.
 *       - 1 is down.
 *       - 2 is left.
 *       - 3 is right.
 *       - 4 is up.
 *
 * ===========================================================================
 * Plugin Commands
 * ===========================================================================
 *
 * You can use the following plugin commands to change the settings.
 *
 * SF_AutoRevive_Enable
 *   - Enables the revive system.
 *
 * SF_AutoRevive_Disable
 *   - Disables the revive system.
 *
 */
//=============================================================================

(function () {
    var SF_AutoRevive = {};
    SF_Plugins.SF_AutoRevive = SF_AutoRevive;

    SF_AutoRevive.version = 1.0;

    //=============================================================================
    // Game_System
    //=============================================================================

    SF_AutoRevive.Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function () {
        SF_AutoRevive.Game_System_initialize.call(this);
        this._autoRevive = true;
    };

    Game_System.prototype.isAutoReviveEnabled = function () {
        return this._autoRevive;
    };

    Game_System.prototype.setAutoReviveEnabled = function (value) {
        this._autoRevive = value;
    };

    Game_System.prototype.isSupportAutoRevive = function () {
        return this.isAutoReviveEnabled && $gameMap.getRevivePosition();
    };

    //=============================================================================
    // Game_Map
    //=============================================================================

    SF_AutoRevive.Game_Map_setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function (mapId) {
        SF_AutoRevive.Game_Map_setup.call(this, mapId);
        this._revivePosition = null;
    };

    Game_Map.prototype.getRevivePosition = function () {
        if (this._revivePosition) {
            return this._revivePosition;
        }
        var meta = $dataMap.meta;
        if (meta["Revive Position"]) {
            var position = meta["Revive Position"].split(",");
            this._revivePosition = {
                x: Number(position[0]),
                y: Number(position[1]),
                d: Number(position[2]),
            };
        }
        return this._revivePosition;
    };

    //=============================================================================
    // Game_Interpreter
    //=============================================================================

    SF_AutoRevive.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        SF_AutoRevive.Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === "SF_AutoRevive_Enable") {
            $gameSystem.setAutoReviveEnabled(true);
        } else if (command === "SF_AutoRevive_Disable") {
            $gameSystem.setAutoReviveEnabled(false);
        }
    };

    //=============================================================================
    // Game_BattlerBase
    //=============================================================================

    Game_BattlerBase.prototype.reviveFull = function () {
        this.recoverAll();
    };

    //=============================================================================
    // Game_Party
    //=============================================================================

    Game_Party.prototype.autoReviveAllMembers = function () {
        var loss_gold = this.gold() * 0.1;
        this.loseGold(loss_gold);
        this.members().forEach(function (member) {
            if (member.isDead()) {
                member.reviveFull();
            }
        });
    };

    //=============================================================================
    // Game_Player
    //=============================================================================

    Game_Player.prototype.reviveTransfer = function () {
        var revive_position = $gameMap.getRevivePosition();
        if (revive_position) {
            this.reserveTransfer($gameMap.mapId(), revive_position.x, revive_position.y, revive_position.d);
        }
    };

    //=============================================================================
    // BattleManager
    //=============================================================================

    SF_AutoRevive.BattleManager_updateBattleEnd = BattleManager.updateBattleEnd;
    BattleManager.updateBattleEnd = function () {
        if (this.isBattleTest()) {
            AudioManager.stopBgm();
            SceneManager.exit();
        } else if (!this._escaped && $gameParty.isAllDead()) {
            if (this._canLose) {
                $gameParty.reviveBattleMembers();
                SceneManager.pop();
            } else if ($gameSystem.isSupportAutoRevive()) {
                $gameParty.autoReviveAllMembers();
                $gamePlayer.reviveTransfer();
                SceneManager.pop();
            } else {
                SceneManager.goto(Scene_Gameover);
            }
        } else {
            SceneManager.pop();
        }
        this._phase = null;
    };

    //=============================================================================
    // Scene_Base
    //=============================================================================

    SF_AutoRevive.Scene_Base_checkGameover = Scene_Base.prototype.checkGameover;
    Scene_Base.prototype.checkGameover = function () {
        if ($gameParty.isAllDead()) {
            if ($gameSystem.isSupportAutoRevive()) {
                $gameParty.autoReviveAllMembers();
                $gamePlayer.reviveTransfer();
            } else {
                SceneManager.goto(Scene_Gameover);
            }
        }
    };
})();
