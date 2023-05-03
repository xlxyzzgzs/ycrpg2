//=============================================================================
// SaltedFish Plugins - Exp For Reserve Member
// SF_ReserveMemberExp.js
//=============================================================================
"use strict";

var Imported = Imported || {};
Imported.SF_ReserveMemberExp = true;

var SF_Plugins = SF_Plugins || {};

//=============================================================================
/*:
 * @plugindesc 支持队伍中的预备队员在战斗时，按照比例获得经验值
 * @version 1.0
 * @author SaltedFish
 *
 * @text 经验值比例
 * @param Rate
 * @desc 预备队员获得经验值的比例，0-100 的整数，表示百分比
 * @default 50
 * @type number
 * @min 0
 * @max 100
 * @decimals 0
 *
 * @help
 * ============================================================================
 * 介绍
 * ============================================================================
 *
 * 这个插件支持队伍中的预备队员在战斗时，按照比例获得经验值
 *
 * ============================================================================
 * 插件命令
 * ============================================================================
 *
 * SF_ReserveMemberExp rate
 * 设置预备队员获得经验值的比例，rate 为 0-100 的整数，表示百分比
 */
//=============================================================================

(function () {
    var SF_ReserveMemberExp = SF_Plugins.SF_ReserveMemberExp || {};
    SF_Plugins.SF_ReserveMemberExp = SF_ReserveMemberExp;

    SF_ReserveMemberExp.parameters = PluginManager.parameters("SF_ReserveMemberExp");
    SF_ReserveMemberExp.rate = Number(SF_ReserveMemberExp.parameters["Rate"]);

    SF_ReserveMemberExp.Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function () {
        SF_ReserveMemberExp.Game_System_initialize.call(this);
        this._reserveMemberExpRate = SF_ReserveMemberExp.rate;
    };

    SF_ReserveMemberExp.BattleManager_benchMembersExpRate = BattleManager.benchMembersExpRate;
    BattleManager.benchMembersExpRate = function () {
        var rate = SF_ReserveMemberExp.BattleManager_benchMembersExpRate.call(this);
        var systemRate = $gameSystem._reserveMemberExpRate / 100;
        return rate * systemRate;
    };

    SF_ReserveMemberExp.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        SF_ReserveMemberExp.Game_Interpreter_pluginCommand.call(this, command, args);

        if (command === "SF_ReserveMemberExp") {
            $gameSystem._reserveMemberExpRate = Number(args[0]);
        }
    };
})();
