//=============================================================================
// Salted Fish Plugins - State Override
// SF_StateOverride.js
//=============================================================================
"use strict";
var Imported = Imported || {};
Imported.SF_StateOverride = true;

var SF_Plugins = SF_Plugins || {};
//=============================================================================
/*:
 * @plugindesc 状态覆盖插件
 * @author Salted Fish
 *
 * @help
 * ============================================================================
 * 介绍
 * ============================================================================
 * 同类状态同时存在时，保留高级状态，解除低级状态，避免属性过量叠加。
 * 如果存在高级状态，则不会添加低级状态。
 *
 * 使用 状态ID 作为状态的类别标识。
 *
 * ============================================================================
 * 使用
 * ============================================================================
 * <SF_StatesOverride: 状态ID, 状态级别>
 * 状态级别只能是非负整数。
 *
 * ============================================================================
 * 举例
 * ============================================================================
 * 定义三个状态
 * 1.1 力量增强I，物理攻击*120%
 * 1.2 力量增强II，物理攻击*130%
 * 1.3 力量增强III，物理攻击*140%
 *
 * 插件效果是，状态1.1 力量增强I存在时，若获得状态1.2力量增强II，
 * 直接解除状态1.1力量增强I
 *
 * 同理，状态1.1力量增强I存在时，若获得状态1.3力量增强III，
 * 直接解除状态1.1力量增强I
 *
 * 状态1.2力量增强II存在时，若获得状态1.3力量增强III，
 * 直接解除状态1.2力量增强II
 *
 * 状态1.3存在时，无法获得状态 1.1 和状态 1.2
 *
 * ============================================================================
 * 已知问题
 * ============================================================================
 * - 与状态叠加插件不兼容，不能两个状态既属于需要覆盖的，又属于需要叠加的。
 * 如果出现这种情况，取决于在插件列表中的顺序，行为暂时不可预测
 *
 */
//=============================================================================
SF_Plugins.SF_StateOverride = SF_Plugins.SF_StateOverride || {};
SF_Plugins.SF_StateOverride.version = 1.0;

//=============================================================================
// DataManager
//=============================================================================

SF_Plugins.SF_StateOverride.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function () {
    if (!SF_Plugins.SF_StateOverride.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!this.SF_StateOverride_isDatabaseLoaded($dataStates)) return false;
    return true;
};

DataManager.SF_StateOverride_isDatabaseLoaded = function (group) {
    var note = /<SF_StatesOverride:\s*?(\d+),\s*?(\d+)>/i;
    for (var i = 1; i < group.length; i++) {
        var obj = group[i];
        var noteData = obj.note.split(/[\r\n]+/);
        for (var j = 0; j < noteData.length; j++) {
            var line = noteData[j];
            if (line.match(note)) {
                obj.SF_StateOverride_ID = RegExp.$1;
                obj.SF_StateOverride_Priority = RegExp.$2;
            }
        }
    }
    return true;
};

//=============================================================================
// Game_Battler
//=============================================================================
SF_Plugins.SF_StateOverride.GameBattler_addState = Game_Battler.prototype.addState;
Game_Battler.prototype.addState = function (stateId) {
    var needAddState = $dataStates[stateId];
    var existStates = this.states();
    var isAddable = true;

    if (needAddState.SF_StateOverride_ID !== undefined) {
        needRemoveState = existStates.filter(function (state) {
            if (state.SF_StateOverride_ID === needAddState.SF_StateOverride_ID) {
                if (state.SF_StateOverride_Priority < needAddState.SF_StateOverride_Priority) {
                    return true;
                }
                if (state.SF_StateOverride_Priority > needAddState.SF_StateOverride_Priority) {
                    isAddable = false;
                }
            }
            return false;
        });

        // 存在优先级更高的状态，不添加。
        if (!isAddable) {
            return;
        }
        needRemoveState.forEach(function (state) {
            this.removeState(state.id);
        }, this);
    }
    SF_Plugins.SF_StateOverride.GameBattler_addState.call(this, stateId);
};
