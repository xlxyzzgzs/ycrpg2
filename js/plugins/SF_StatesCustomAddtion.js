//=============================================================================
// Salted Fish Plugins - State Custom Addition
// SF_StatesCustomAddtion.js
//=============================================================================
"use strict";
var Imported = Imported || {};
Imported.SF_StatesCustomAddtion = true;

var SF_Plugins = SF_Plugins || {};
//=============================================================================
/*:
 * @plugindesc 状态添加过程自定义插件
 * @author Salted Fish
 *
 * @help
 * ============================================================================
 * 介绍
 * ============================================================================
 * 该插件可以自定义状态添加过程，可以在状态添加前进行自定义的判断。
 * 添加前，提供一个回调函数，可以在添加前进行自定义操作。
 * this 指向 target Game_Battler
 *
 * ============================================================================
 * 使用
 * ============================================================================
 * 添加前的自定义操作，提供一个回调函数，可以在添加前进行自定义操作。
 * this 指向 target Game_Battler
 * <SF_StatesCustomAddtion_Before>
 * 代码
 * </SF_StatesCustomAddtion_Before>
 *
 * 提供参数：
 * - target：目标 Game_Battler
 * - stateId：即将添加的状态ID
 * 返回值：
 * {
 *    // 是否终止后续操作
 *    "result": true/false,
 *    // 需要添加的状态数组
 *    "statesAdd": [1, 2, 3],
 *    // 需要删除的状态数组
 *    "statesRemove": [1, 2, 3],
 *    // 需要刷新回合数的状态数组
 *    "statesRefresh": [1, 2, 3],
 * }
 * 后续操作：
 * - 如果 result 为 true，则终止后续操作
 * - 如果 result 为 false，则继续后续操作
 * - 如果 statesRemove 不为空，则删除 statesRemove 中的状态
 * - 如果 statesRefresh 不为空，则刷新 statesRefresh 中的状态回合数
 * - 如果 statesAdd 不为空，则添加 statesAdd 中的状态，
 *   这里不会再次触发添加前的自定义操作
 *
 * ============================================================================
 * 举例
 * ============================================================================
 * 1. 添加状态 125 前，
 *    如果目标已经拥有状态 124，则删除状态 124，添加状态 125
 *    否则，添加状态 125、
 *
 * <SF_StatesCustomAddtion_Before>
 * var result = {
 *   "result": false,
 *   "statesAdd": [],
 *   "statesRemove": [],
 *   "statesRefresh": [],
 * };
 * if (this.isStateAffected(124)) {
 *   result.statesRemove.push(124);
 *   result.statesAdd.push(125);
 * }
 * else {
 *   result.statesAdd.push(125);
 * }
 * return result;
 * </SF_StatesCustomAddtion_Before>
 *
 *============================================================================
 * 举例2
 *============================================================================
 * 2. 添加状态60前，
 * 生成整随机数1~10，如果随机数小于等于5，则添加状态148
 * （随机数结果不影响状态60）的添加
 *
 * <SF_StatesCustomAddtion_Before>
 * var result = {
 *   "result": false,
 *   "statesAdd": [],
 *   "statesRemove": [],
 *   "statesRefresh": [],
 * };
 * result.statesAdd.push(60);
 * var random = Math.floor(Math.random() * 10 + 1);
 * if (random <= 5) {
 * result.statesAdd.push(148);
 * }
 * return result;
 * </SF_StatesCustomAddtion_Before>
 *
 *
 * ============================================================================
 * 已知问题
 * ============================================================================
 * - 与状态叠加插件和状态覆盖插件不兼容。
 *
 */
//=============================================================================

SF_Plugins.SF_StatesCustomAddtion = SF_Plugins.SF_StatesCustomAddtion || {};
SF_Plugins.SF_StatesCustomAddtion.version = 1.0;

//=============================================================================
// DataManager
//=============================================================================
SF_Plugins.SF_StatesCustomAddtion.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function () {
    if (!SF_Plugins.SF_StatesCustomAddtion.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!this.processStatesCustomAddtionNotetags($dataStates)) return false;
    return true;
};

DataManager.processStatesCustomAddtionNotetags = function (group) {
    var note1 = /<(?:SF_StatesCustomAddtion_Before)>/i;
    var note2 = /<\/(?:SF_StatesCustomAddtion_Before)>/i;

    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
        var notedata = obj.note.split(/[\r\n]+/);
        var mode = "none";

        obj.SF_StatesCustomAddtion_Before = "";
        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (line.match(note1)) {
                mode = "SF_StatesCustomAddtion_Before";
            } else if (line.match(note2)) {
                mode = "none";
            } else if (mode === "SF_StatesCustomAddtion_Before") {
                obj.SF_StatesCustomAddtion_Before += line + "\n";
            }
        }

        if (obj.SF_StatesCustomAddtion_Before) {
            obj.SF_StatesCustomAddtion_Before = new Function("target", "stateId", obj.SF_StatesCustomAddtion_Before);
        }
    }

    return true;
};

//=============================================================================
// Game_Battler
//=============================================================================
SF_Plugins.SF_StatesCustomAddtion.Game_Battler_addState = Game_Battler.prototype.addState;
Game_Battler.prototype.addState = function (stateId) {
    var state = $dataStates[stateId];
    if (state.SF_StatesCustomAddtion_Before) {
        var result = state.SF_StatesCustomAddtion_Before.call(this, this, stateId);

        if (result.result) return;

        if (result.statesRemove) {
            for (var i = 0; i < result.statesRemove.length; i++) {
                this.removeState(result.statesRemove[i]);
            }
        }

        if (result.statesRefresh) {
            for (var i = 0; i < result.statesRefresh.length; i++) {
                this.resetStateCounts(result.statesRefresh[i]);
            }
        }

        if (result.statesAdd) {
            for (var i = 0; i < result.statesAdd.length; i++) {
                SF_Plugins.SF_StatesCustomAddtion.Game_Battler_addState.call(this, result.statesAdd[i]);
            }
        }

        return;
    }

    SF_Plugins.SF_StatesCustomAddtion.Game_Battler_addState.call(this, stateId);
};
