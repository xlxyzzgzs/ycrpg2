//=============================================================================
// Salted Fish Plugins - Common Attack
// SF_CommonAttack.js
//=============================================================================

"use strict";
var Imported = Imported || {};
Imported.SF_CommonAttack = true;

var SF_Plugins = SF_Plugins || {};
SF_Plugins.SF_CommonAttack = SF_Plugins.SF_CommonAttack || {};
SF_Plugins.SF_CommonAttack.version = 1.0;

//=============================================================================
/*:
 *
 * @plugindesc v1.0 普攻替换插件
 * @author Salted Fish
 *
 * @help
 * ===========================================================================
 * 介绍
 * ===========================================================================
 * 插件可以将普通攻击依据不同的职业、武器、状态等替换为不同的技能。
 *
 * ===========================================================================
 * 使用
 * ===========================================================================
 *
 * 在职业、武器、状态的备注中添加如下标签：
 * <SF_CommonAttack: SkillID, Priority>
 *
 * 在普攻时依次遍历职业、武器、状态，选取优先级最高的技能。
 * 如果优先级相同，则使用最后遍历到的技能
 *
 * 优先级必须大于0且为整数
 * 技能ID就是rm数据库中的编号
 */
//=============================================================================

//=============================================================================
// DataManager
//=============================================================================

SF_Plugins.SF_CommonAttack.DataManager_isDatabaseLoaded =
    DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function () {
    if (!SF_Plugins.SF_CommonAttack.DataManager_isDatabaseLoaded.call(this)) {
        return false;
    }
    if (!this.SF_CommonAttack_isDatabaseLoaded($dataClasses)) {
        return false;
    }
    if (!this.SF_CommonAttack_isDatabaseLoaded($dataWeapons)) {
        return false;
    }
    if (!this.SF_CommonAttack_isDatabaseLoaded($dataStates)) {
        return false;
    }
    return true;
};

DataManager.SF_CommonAttack_isDatabaseLoaded = function (group) {
    var note = /<SF_CommonAttack:\s*?(\d+),\s*?(\d+)>/i;
    for (var i = 1; i < group.length; i++) {
        var obj = group[i];
        var notedata = obj.note.split(/[\r\n]+/);
        for (var j = 0; j < notedata.length; j++) {
            var line = notedata[j];
            if (line.match(note)) {
                obj.SF_CommonAttack_Skill_ID = parseInt(RegExp.$1);
                obj.SF_CommonAttack_Priority = parseInt(RegExp.$2);
            }
        }
    }
    return true;
};

//=============================================================================
// Game_Actor
//=============================================================================
SF_Plugins.SF_CommonAttack.Game_Actor_attackSkillId =
    Game_Actor.prototype.attackSkillId;
Game_Actor.prototype.attackSkillId = function () {
    var normalId =
        SF_Plugins.SF_CommonAttack.Game_Actor_attackSkillId.call(this);
    var maxPriority = 0;

    // 职业
    var currentClass = this.currentClass();
    if (currentClass.SF_CommonAttack_Priority >= maxPriority) {
        maxPriority = currentClass.SF_CommonAttack_Priority;
        normalId = currentClass.SF_CommonAttack_Skill_ID;
    }

    // 武器
    this.weapons().forEach(function (weapon) {
        if (weapon.SF_CommonAttack_Priority >= maxPriority) {
            maxPriority = weapon.SF_CommonAttack_Priority;
            normalId = weapon.SF_CommonAttack_Skill_ID;
        }
    });

    // 状态
    this.states().forEach(function (state) {
        if (state.SF_CommonAttack_Priority >= maxPriority) {
            maxPriority = state.SF_CommonAttack_Priority;
            normalId = state.SF_CommonAttack_Skill_ID;
        }
    });

    return normalId;
};

//=============================================================================
// SceneBattle
//=============================================================================
SF_Plugins.SF_CommonAttack.Scene_Battle_commandAttack =
    Scene_Battle.prototype.commandAttack;
Scene_Battle.prototype.commandAttack = function () {
    BattleManager.inputtingAction().setAttack();
    this.onSelectAction();
};
