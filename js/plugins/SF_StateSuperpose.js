//=============================================================================
// Salted Fish Plugins - State Superpose
// SF_StateSuperpose.js
//=============================================================================
"use strict";
var Imported = Imported || {};
Imported.SF_StateSuperpose = true;

var SF_Plugins = SF_Plugins || {};
//=============================================================================
/*:
 * @plugindesc 状态叠加插件
 * @author Salted Fish
 *
 * @help
 * ============================================================================
 * 介绍
 * ============================================================================
 * 获得同类状态时，将已有的同类状态持续时间刷新到与新获得的同类状态一致
 *
 * 使用 状态ID 作为状态的类别标识。
 *
 * ============================================================================
 * 使用
 * ============================================================================
 * <SF_StatesSuperpose: 状态ID>
 *
 * ============================================================================
 * 举例
 * ============================================================================
 * 定义五个状态
 * 1.a 抓伤a
 * 1.b 抓伤b
 * 1.c 抓伤c
 * 1.d 抓伤d
 * 1.e 抓伤e
 *
 * 插件需要实现的效果是：
 * 在拥有1.a 抓伤a的情况下，获得1.e抓伤e，
 * 则将1.a抓伤a的持续回合数刷新到与1.e抓伤e相同
 *
 * 在拥有1.b 抓伤b和1.d 抓伤d的情况下，获得1.a 抓伤a，
 * 则将1.b 抓伤b和1.d 抓伤d的持续回合数刷新到与1.a 抓伤a相同
 *
 * ============================================================================
 * 已知问题
 * ============================================================================
 * - 与状态覆盖插件不兼容，不能两个状态既属于需要覆盖的，又属于需要叠加的。
 * 如果出现这种情况，取决于在插件列表中的顺序，行为暂时不可预测
 *
 */
//=============================================================================
SF_Plugins.SF_StateSuperpose = SF_Plugins.SF_StateSuperpose || {};
SF_Plugins.SF_StateSuperpose.version = 1.0;

//=============================================================================
// DataManager
//=============================================================================

SF_Plugins.SF_StateSuperpose.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function () {
    if (!SF_Plugins.SF_StateSuperpose.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!this.SF_StateSuperpose_isDatabaseLoaded($dataStates)) return false;
    return true;
};

DataManager.SF_StateSuperpose_isDatabaseLoaded = function (group) {
    var note = /<SF_StateSuperpose:\s*?(\d+)\s*?>/i;
    for (var i = 1; i < group.length; i++) {
        var obj = group[i];
        var noteData = obj.note.split(/[\r\n]+/);
        for (var j = 0; j < noteData.length; j++) {
            var line = noteData[j];
            if (line.match(note)) {
                obj.SF_StateSuperpose_ID = RegExp.$1;
            }
        }
    }
    return true;
};

//=============================================================================
// Game_Battler
//=============================================================================
SF_Plugins.SF_StateSuperpose.GameBattler_addState = Game_Battler.prototype.addState;
Game_Battler.prototype.addState = function (stateId) {
    SF_Plugins.SF_StateSuperpose.GameBattler_addState.call(this, stateId);

    var stateSuperpose_ID = $dataStates[stateId].SF_StateSuperpose_ID;
    if (this.result().isStateAdded(stateId) && stateSuperpose_ID !== undefined) {
        var turns = this._stateTurns[stateId];
        this.states().forEach(function (state) {
            if (state.SF_StateSuperpose_ID === stateSuperpose_ID) {
                SF_Plugins.SF_StateSuperpose.GameBattler_addState.call(this, stateId);
                this._stateTurns[state.id] = turns;
            }
        }, this);
    }
};
