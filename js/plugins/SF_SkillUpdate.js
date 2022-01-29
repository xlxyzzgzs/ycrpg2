//=============================================================================
// SaltedFish Plugins - Skill Update
// SF_SkillUpdate.js
// License: MIT
//=============================================================================

var Imported = Imported || {};
Imported.SF_SkillUpdate = true;

var SF_Plugins = SF_Plugins || {};
SF_Plugins.SF_SkillUpdate = SF_Plugins.SF_SkillUpdate || {};
SF_Plugins.SF_SkillUpdate.version = 1.0;

//=============================================================================
/*:
* @plugindesc v1.0 Allows you to auto update skills.
* @author SaltedFish
* 
* @help
* ============================================================================
* Introduction
* ============================================================================
* 
* When learning a high-priority skill with the same ID, the skill will be 
* automatically forgotten
* 
* ============================================================================
* Skill Notes
* ============================================================================
* 
* You can set the skill to auto update by adding the following to the skill's
* notebox:
* <SF_SkillUpdate: ID, priority>
* 
* ID: The skill ID 
* priority: The skill priority. High-priority skills override low-priority
* skills
* 
*/
//=============================================================================

//=============================================================================
// DataManager
//=============================================================================

SF_Plugins.SF_SkillUpdate.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function () {
    if (!SF_Plugins.SF_SkillUpdate.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!this.SF_SkillUpdate_isDatabaseLoaded($dataSkills)) return false;
    return true;
}

DataManager.SF_SkillUpdate_isDatabaseLoaded = function (group) {
    var note = /<SF_SkillUpdate:\s*?(\d+),\s*?(\d+)>/i;
    for (var i = 1; i < group.length; i++) {
        var obj = group[i];
        var notedata = obj.note.split(/[\r\n]+/);
        obj.SF_Skill_ID = 0;
        obj.SF_Skill_priority = 0;
        for (var j = 0; j < notedata.length; j++) {
            var line = notedata[j];
            if (line.match(note)) {
                obj.SF_Skill_ID = parseInt(RegExp.$1);
                obj.SF_Skill_priority = parseInt(RegExp.$2);
            }
        }
    }
    return true;
}

//=============================================================================
// Game_Actor
//=============================================================================

SF_Plugins.SF_SkillUpdate.Game_Actor_learnSkill = Game_Actor.prototype.learnSkill;
Game_Actor.prototype.learnSkill = function (skillId) {
    SF_Plugins.SF_SkillUpdate.Game_Actor_learnSkill.call(this, skillId);
    var skill = $dataSkills[skillId];
    if (skill.SF_Skill_ID > 0 && skill.SF_Skill_priority > 0) {
        var needForgetSkills = this.skills().filter(function (obj) {
            return obj.SF_Skill_ID === skill.SF_Skill_ID && obj.SF_Skill_priority < skill.SF_Skill_priority;
        });
        for (var i = 0; i < needForgetSkills.length; i++) {
            this.forgetSkill(needForgetSkills[i].id);
        }
    }
}
