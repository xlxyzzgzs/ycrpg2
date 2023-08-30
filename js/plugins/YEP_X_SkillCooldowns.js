﻿//=============================================================================
// Yanfly Engine Plugins - Skill Cost Extension - Cooldowns
// YEP_X_SkillCooldowns.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_SkillCooldowns = true;

var Yanfly = Yanfly || {};
Yanfly.SCD = Yanfly.SCD || {};
Yanfly.SCD.version = 1.11;

//=============================================================================
 /*:
 * @plugindesc v1.11 技能冷却☁️
 * @author Yanfly Engine Plugins
 *
 * @param ---冷却时间---
 * @default
 *
 * @param Cooldown Format
 * @text 冷却时间格式
 * @desc This is the text format used for cooldowns.
 * %1 - Turns Remaining
 * @default %1CD
 *
 * @param Cooldown Font Size
 * @text 冷却时间字体大小
 * @desc This is the font size used for cooldowns.
 * Default: 28
 * @default 20
 *
 * @param Cooldown Text Color
 * @text 冷却时间文本颜色
 * @desc Adjusts the text color used for cooldowns.
 * @default 6
 *
 * @param Cooldown Icon
 * @text 冷却时间图标
 * @desc What icon to be used for cooldowns.
 * Use 0 for no icon.
 * @default 75
 *
 * @param Cooldown After Battle
 * @text 战斗后冷却
 * @desc How are cooldowns handled after battle?
 * @default -10
 *
 * @param Cooldown Steps
 * @text 走路后冷却
 * @desc Outside of battle, this is how many steps on the map the
 * player must walk to drop each cooldown by 1.
 * @default 5
 *
 * @param Cooldown Bypass
 * @text 不受冷却影响
 * @desc This is a list of skills that cannot be on cooldown so that
 * way, skills like Attack, Guard.
 * @default 1 2 3 4 5 6 7
 *
 * @param ---热身---
 * @default
 *
 * @param Warmup Format
 * @text 热身格式
 * @desc This is the text format used for warmups.
 * %1 - Turns Remaining
 * @default %1WU
 *
 * @param Warmup Font Size
 * @text 热身字体大小
 * @desc This is the font size used for warmups.
 * Default: 28
 * @default 20
 *
 * @param Warmup Text Color
 * @text 热身文本颜色
 * @desc Adjusts the text color used for warmups.
 * @default 4
 *
 * @param Warmup Icon
 * @text 预热图标
 * @desc What icon to be used for warmups.
 * Use 0 for no icon.
 * @default 75
 *
 * @param ---战斗核心---
 * @default
 *
 * @param Time Based
 * @text 基于时间
 * @desc If a battle system is Tick-based, use time instead
 * of turns for cooldowns? NO - false   YES - true
 * @default false
 *
 * @param Turn Time
 * @text 回合时间
 * @desc How many ticks must pass to equal 1 cooldown turn?
 * @default 100
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * 技能冷却是一个技能核心的拓展插件。这个插件可以让你实现技能冷却，
 * 让玩家需要等待几个回合才能继续使用。
 * 这个插件需要YEP_SkillCore，确保它放在YEP_SkillCore下面
 * 
 * 这个插件让你实现技能冷却，避免连续使用技能
 *
 * ============================================================================
 * Cooldown Types
 * ============================================================================
 *
 * Cooldown (Standard)
 * 标准冷却。当被使用时，技能需要等x回合才可以使用。这里可以利用
 * 某些东西让冷却降低。最简单的就是等待，每回合都会降低。技能或者
 * 类似的也可以降低冷却。除此之外，你还可以结束战斗，战斗结束后冷却
 * 都会到一个定值。第三种方法就是在地图上走动，走动步数可以降低冷却
 *
 * Warmups
 * 就大多数而言，热身和冷却一样，时间结束才可以使用技能，区别是，
 * 热身仅仅发生在战斗一开始。如果一个技能有热身时间，他会进入战斗
 * 中触发，战斗结束后小时。热身不会叠在任何冷却之上，当技能同时
 * 拥有冷却和热身时，会同步更新
 * 
 * Linked Cooldowns
 * 关联冷却是某个技能造成另一个技能冷却时。所有的冷却都看做
 * 关联冷却。冷却将会优先考虑技能冷却和全局冷却
 *
 * Skill Type Cooldowns
 * 当技能类型冷却时，所有匹配的技能类型都在冷却中。另外的技能
 * 将会是标准冷却。技能冷却优先考虑全局冷却
 *
 * 当冷却应用于已存在冷却的技能，冷却将会改变最大值。这意味着，
 * 当一个技能有3回合冷却时，技能类型冷却设置为1回合，则3回合会保留。
 * 如果技能有3回合冷却，技能类型冷却设置为5回合，冷却时间变更为5回合
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * 使用下面的标签来改变冷却
 *
 * 技能注释:
 *   <Cooldown: x>
 *   设计技能冷却回合数x。这只会影响技能自身。这个值会优先考虑技能类型
 *   冷却和全局冷却
 *
 *   <Warmup: x>
 *   设计技能热身回合数x。这只会影响技能自身。这个值会优先考虑技能类型
 *   冷却和全局冷却
 *
 *   <After Battle Cooldown: +x>
 *   <After Battle Cooldown: -x>
 *   战斗之后，技能冷却增加或者减少
 *
 *   <Cooldown Steps: x>
 *   每走x步，技能冷却减少1
 *
 *   <Skill x Cooldown: y>
 *   <Skill name Cooldown: y>
 *   使用技能后，并且支付技能消耗以后，技能x将会关联冷却y回合。
 *   这个值优先考虑技能类型冷却和全局冷却
 *
 *   <SType x Cooldown: y>
 *   使用技能后，并且支付技能消耗以后，所有技能类型x将会关联冷却y回合。
 *   这个值优先考虑全局冷却
 *
 *   <Global Cooldown: x>
 *   使用技能后，所有技能将会设置冷却x回合。这个值优先于独立冷却和
 *   技能类型冷却
 *
 *   <Bypass Cooldown>
 *   技能不需要冷却。例如攻击，防御，逃跑等不需要冷却的指令。
 *
 * 技能和物品注释:
 *   <Skill x Cooldown: +y>
 *   <Skill x Cooldown: -y>
 *   <Skill name Cooldown: +y>
 *   <Skill name Cooldown: -y>
 *   目标技能x的冷却增加或者减少。仅适用于目标，不能用于自己
 *
 *   <SType x Cooldown: +y>
 *   <SType x Cooldown: -y>
 *   目标技能类型x的冷却增加或者减少。仅适用于目标，不能用于自己
 *
 *   <Global Cooldown: +x>
 *   <Global Cooldown: -x>
 *   目标全部技能的冷却增加或者减少x。仅适用于目标，不能用于自己
 *
 * Actor, Class, Enemy, Weapon, Armor, and State Notetags:
 *
 *   <Skill x Cooldown Duration: y%>
 *   <Skill name Cooldown Duration: y%>
 *   改变技能x的冷却持续时间为y%。
 *
 *   <SType x Cooldown Duration: y%>
 *   改变技能类型x的冷却持续时间为y%。
 *
 *   <Global Cooldown Duration: x%>
 *   改变全部技能的冷却持续时间为x%。
 *
 *   <Skill x Cooldown Rate: y%>
 *   <Skill name Cooldown Rate: y%>
 *   冷却需要下降时，技能x的冷却率为y%。
 *
 *   <SType x Cooldown Rate: y%>
 *   冷却需要下降时，技能类型x的冷却率为y%。
 *
 *   <Global Cooldown Rate: x%>
 *   冷却需要下降时，全部技能的冷却率为x%。
 *
 *   <Skill x Cooldown: +y>
 *   <Skill x Cooldown: -y>
 *   <Skill name Cooldown: +y>
 *   <Skill name Cooldown: -y>
 *   如果玩家是特点玩家，职业，或者装备特定物品时，或者存在特点状态，
 *   这个技能x冷却将会改变y。这将在所有计算完成后应用一个平均冷却。
 *
 *   <SType x Cooldown: +y>
 *   <SType x Cooldown: -y>
 *   如果玩家是特点玩家，职业，或者装备特定物品时，或者存在特点状态，
 *   这个技能类型x冷却将会改变y。这将在所有计算完成后应用一个平均冷却。
 *
 *   <Global Cooldown: +x>
 *   <Global Cooldown: -x>
 *   如果玩家是特点玩家，职业，或者装备特定物品时，或者存在特点状态，
 *   全部技能冷却将会改变x。这将在所有计算完成后应用一个平均冷却。
 *
 *   <Skill x Warmup: +y>
 *   <Skill x Warmup: -y>
 *   <Skill name Warmup: +y>
 *   <Skill name Warmup: -y>
 *   如果玩家是特点玩家，职业，或者装备特定物品时，或者存在特点状态，
 *   战斗开始时，技能x热身时间改变y。这将在所有计算完成后
 *   应用一个平均热身时间。
 * 
 *   <SType x Warmup: +y>
 *   <SType x Warmup: -y>
 *   如果玩家是特点玩家，职业，或者装备特定物品时，或者存在特点状态，
 *   战斗开始时，技能类型x热身时间改变y。这将在所有计算完成后
 *   应用一个平均热身时间。
 * 
 *   <Global Warmup: +x>
 *   <Global Warmup: -x>
 *   如果玩家是特点玩家，职业，或者装备特定物品时，或者存在特点状态，
 *   战斗开始时，全部技能热身时间改变x。这将在所有计算完成后
 *   应用一个平均热身时间。
 * 
 * ============================================================================
 * Lunatic Mode - Specialized Cooldowns
 * ============================================================================
 *
 * For skills, you can set cooldowns to have a special code determine its value
 * when the skill is used.
 *
 * Skill Notetag
 *   <Cooldown Eval>
 *   cooldown = x;
 *   cooldown += x;
 *   </Cooldown Eval>
 *   
 *   将这两个标签插入技能的记事框中，为其提供一种确定冷却时间值的独特方法。
 *   “cooldown”变量确定冷却时间的回合数。
 *
 *   <Warmup Eval>
 *   warmup = x;
 *   warmup += x;
 *   </Warmup Eval>
 *   
 *   将这两个标签插入技能的记事框中，为其提供确定预热值的独特方法。
 *   “warmup”变量确定预热的回合数。
 *
 * ============================================================================
 * Yanfly Engine Plugins - Battle Engine Extension - Action Sequence Commands
 * ============================================================================
 *
 * If you have YEP_BattleEngineCore.js installed with this plugin located
 * underneath it in the Plugin Manager, you can make use of these extra
 * cooldown related action sequences.
 *
 *=============================================================================
 * GLOBAL COOLDOWN: targets, +X
 * GLOBAL COOLDOWN: targets, -X
 * GLOBAL COOLDOWN: targets, X
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Sets the cooldown for all of the targets to be adjusted by X value. This
 * applies to every skill that doesn't bypass cooldowns.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: global cooldown: target, +5
 *                global cooldown: user, -3
 *                global cooldown: enemies, 10
 *=============================================================================
 *
 *=============================================================================
 * SKILL X COOLDOWN: targets, +Y
 * SKILL X COOLDOWN: targets, -Y
 * SKILL X COOLDOWN: targets, Y
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Causes skill X to be adjusted by Y value for the targets. This only applies
 * the specific skill x's cooldown.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: skill 10 cooldown: target, +5
 *                skill 12 cooldown: user, -3
 *                skill 15 cooldown: enemies, 10
 *=============================================================================
 *
 *=============================================================================
 * SKILL TYPE X COOLDOWN: targets, +Y
 * SKILL TYPE X COOLDOWN: targets, -Y
 * SKILL TYPE X COOLDOWN: targets, Y
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Causes skill type X skills to be adjusted by Y value for the targets. This
 * only applies the specific skill type x skill's cooldown.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: skill type 1 cooldown: target, +5
 *                skill type 2 cooldown: user, -3
 *                skill type 5 cooldown: enemies, 10
 *=============================================================================
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.11:
 * - Lunatic Mode fail safes added.
 *
 * Version 1.10:
 * - Compatibility update with Equip Battle Skills.
 * - Documentation update. Added help information for <warmup: x>.
 *
 * Version 1.09:
 * - Fixed a bug with the <Skill x Cooldown Rate: y%>,
 * <SType x Cooldown Rate: y%>, and <Global Cooldown Rate: x%> notetags not
 * working as intended.
 *
 * Version 1.08:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.07:
 * - Named versions of these notetags have been added:
 * <Skill x Cooldown: y>, <Skill x Cooldown: +/-y>,
 * <Skill x Cooldown Duration: y%>, <Skill x Cooldown: +/-y>,
 * <Skill x Warmup: +/-y>
 *
 * Version 1.06a:
 * - Fixed a bug with cooldown duration modifiers not modifying by the correct
 * value indicated.
 * - Added a fail safe for when there are no targets.
 *
 * Version 1.05:
 * - Fixed a bug that prevented <Cooldown Eval> from running properly.
 *
 * Version 1.04:
 * - Fixed a bug that didn't alter cooldowns correctly.
 *
 * Version 1.03:
 * - Optimized for Battle Engine Core v1.08.
 *
 * Version 1.02a:
 * - Added return for drawSkillCost to assist others scripters when making
 * compatibility notes.
 *
 * Version 1.01:
 * - Cooldowns can now be applied to skills that aren't learned by the actor.
 *
 * Version 1.00:
 * - Finished plugin!
 */
//=============================================================================

if (Imported.YEP_SkillCore) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_SkillCooldowns');
Yanfly.Param = Yanfly.Param || {};
Yanfly.Icon = Yanfly.Icon || {};

Yanfly.Param.CDFmt = String(Yanfly.Parameters['Cooldown Format']);
Yanfly.Param.CDFontSize = Number(Yanfly.Parameters['Cooldown Font Size']);
Yanfly.Param.CDTextColor = Number(Yanfly.Parameters['Cooldown Text Color']);
Yanfly.Icon.Cooldown = Number(Yanfly.Parameters['Cooldown Icon']);
Yanfly.Param.CDAfterBattle = String(Yanfly.Parameters['Cooldown After Battle']);
Yanfly.Param.CDSteps = Number(Yanfly.Parameters['Cooldown Steps']);
Yanfly.Param.CDBypass = String(Yanfly.Parameters['Cooldown Bypass']);
Yanfly.Param.CDBypass = Yanfly.Param.CDBypass.split(' ');
for (Yanfly.i = 0; Yanfly.i < Yanfly.Param.CDBypass.length; ++Yanfly.i) {
  Yanfly.Param.CDBypass[Yanfly.i] = parseInt(Yanfly.Param.CDBypass[Yanfly.i]);
}
Yanfly.Param.WUFmt = String(Yanfly.Parameters['Warmup Format']);
Yanfly.Param.WUFontSize = Number(Yanfly.Parameters['Warmup Font Size']);
Yanfly.Param.WUTextColor = Number(Yanfly.Parameters['Warmup Text Color']);
Yanfly.Param.CDTimeBased = String(Yanfly.Parameters['Time Based']);
Yanfly.Param.CDTurnTime = Number(Yanfly.Parameters['Turn Time']);
Yanfly.Icon.Warmup = Number(Yanfly.Parameters['Warmup Icon']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.SCD.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.SCD.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_X_SkillCooldowns) {
    this.processSCDNotetagsS($dataSkills);
    this.processSCDNotetags1($dataSkills);
    this.processSCDNotetags2($dataSkills);
    this.processSCDNotetags2($dataItems);
    this.processSCDNotetags2($dataActors);
    this.processSCDNotetags2($dataClasses);
    this.processSCDNotetags2($dataEnemies);
    this.processSCDNotetags2($dataWeapons);
    this.processSCDNotetags2($dataArmors);
    this.processSCDNotetags2($dataStates);
    this.processSCDNotetags3($dataActors);
    this.processSCDNotetags3($dataClasses);
    this.processSCDNotetags3($dataEnemies);
    this.processSCDNotetags3($dataWeapons);
    this.processSCDNotetags3($dataArmors);
    this.processSCDNotetags3($dataStates);
    Yanfly._loaded_YEP_X_SkillCooldowns = true;
  }
  return true;
};

DataManager.processSCDNotetagsS = function(group) {
  if (Yanfly.SkillIdRef) return;
  Yanfly.SkillIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.SkillIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processSCDNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.cooldown = {};
    obj.stypeCooldown = {}
    obj.globalCooldown = 0;
    obj.afterBattleCooldown = eval(Yanfly.Param.CDAfterBattle);
    obj.cooldownSteps = Math.max(1, parseInt(Yanfly.Param.CDSteps));
    obj.warmup = 0;
    obj.bypassCooldown = Yanfly.Param.CDBypass.contains(obj.id);
    obj.cooldownEval = '';
    obj.warmupEval = '';
    var evalMode = 'none';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:COOLDOWN):[ ](\d+)>/i)) {
        obj.cooldown[obj.id] = parseInt(RegExp.$1);
      } else if (line.match(/<(?:AFTER BATTLE COOLDOWN):[ ]([\+\-]\d+)>/i)) {
        obj.afterBattleCooldown = parseInt(RegExp.$1);
      } else if (line.match(/<(?:COOLDOWN STEPS):[ ](\d+)>/i)) {
        obj.cooldownSteps = parseInt(RegExp.$1);
      } else if (line.match(/<(?:WARMUP):[ ](\d+)>/i)) {
        obj.warmup = parseInt(RegExp.$1);
      } else if (line.match(/<(?:SKILL)[ ](\d+)[ ](?:COOLDOWN):[ ](\d+)>/i)) {
        obj.cooldown[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
      } else if (line.match(/<(?:SKILL)[ ](.*)[ ](?:COOLDOWN):[ ](\d+)>/i)) {
        var name = String(RegExp.$1).toUpperCase();
        if (Yanfly.SkillIdRef[name]) {
          var id = Yanfly.SkillIdRef[name];
        } else {
          continue;
        }
        obj.cooldown[id] = parseInt(RegExp.$2);
      } else if (line.match(/<(?:STYPE)[ ](\d+)[ ](?:COOLDOWN):[ ](\d+)>/i)) {
        obj.stypeCooldown[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
      } else if (line.match(/<(?:GLOBAL COOLDOWN):[ ](\d+)>/i)) {
        obj.globalCooldown = parseInt(RegExp.$1);
      } else if (line.match(/<(?:BYPASS COOLDOWN)>/i)) {
        obj.bypassCooldown = true;
      } else if (line.match(/<(?:COOLDOWN EVAL)>/i)) {
        obj.cooldown[obj.id] = obj.cooldown[obj.id] || 0;
        evalMode = 'cooldown';
      } else if (line.match(/<\/(?:COOLDOWN EVAL)>/i)) {
        evalMode = 'none';
      } else if (line.match(/<(?:WARMUP EVAL)>/i)) {
        evalMode = 'warmup';
      } else if (line.match(/<\/(?:WARMUP EVAL)>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'cooldown') {
        obj.cooldownEval = obj.cooldownEval + line + '\n';
      } else if (evalMode === 'warmup') {
        obj.warmupEval = obj.warmupEval + line + '\n';
      }
    }
  }
};

DataManager.processSCDNotetags2 = function(group) {
  var note1 = /<(?:SKILL)[ ](\d+)[ ](?:COOLDOWN):[ ]([\+\-]\d+)>/i;
  var note1a = /<(?:SKILL)[ ](.*)[ ](?:COOLDOWN):[ ]([\+\-]\d+)>/i;
  var note2 = /<(?:STYPE)[ ](\d+)[ ](?:COOLDOWN):[ ]([\+\-]\d+)>/i;
  var note3 = /<(?:GLOBAL COOLDOWN):[ ]([\+\-]\d+)>/i;
  var note4 = /<(?:SKILL)[ ](\d+)[ ](?:WARMUP):[ ]([\+\-]\d+)>/i;
  var note4a = /<(?:SKILL)[ ](.*)[ ](?:WARMUP):[ ]([\+\-]\d+)>/i;
  var note5 = /<(?:STYPE)[ ](\d+)[ ](?:WARMUP):[ ]([\+\-]\d+)>/i;
  var note6 = /<(?:GLOBAL WARMUP):[ ]([\+\-]\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.cooldownChange = {};
    obj.stypeCooldownChange = {};
    obj.globalCooldownChange = 0;
    obj.warmupChange = {};
    obj.stypeWarmupChange = {};
    obj.globalWarmupChange = 0;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        obj.cooldownChange[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
      } else if (line.match(note1a)) {
        var name = String(RegExp.$1).toUpperCase();
        if (Yanfly.SkillIdRef[name]) {
          var id = Yanfly.SkillIdRef[name];
        } else {
          continue;
        }
        obj.cooldownChange[id] = parseInt(RegExp.$2);
      } else if (line.match(note2)) {
        obj.stypeCooldownChange[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
      } else if (line.match(note3)) {
        obj.globalCooldownChange = parseInt(RegExp.$1);
      } else if (line.match(note4)) {
        obj.warmupChange[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
      } else if (line.match(note4a)) {
        var name = String(RegExp.$1).toUpperCase();
        if (Yanfly.SkillIdRef[name]) {
          var id = Yanfly.SkillIdRef[name];
        } else {
          continue;
        }
        obj.warmupChange[id] = parseInt(RegExp.$2);
      } else if (line.match(note5)) {
        obj.stypeWarmupChange[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
      } else if (line.match(note6)) {
        obj.globalWarmupChange = parseInt(RegExp.$1);
      }
    }
  }
};

DataManager.processSCDNotetags3 = function(group) {
  var note1 = /<(?:SKILL)[ ](\d+)[ ](?:COOLDOWN DURATION):[ ](\d+)([%％])>/i;
  var note1a = /<(?:SKILL)[ ](.*)[ ](?:COOLDOWN DURATION):[ ](\d+)([%％])>/i;
  var note2 = /<(?:STYPE)[ ](\d+)[ ](?:COOLDOWN DURATION):[ ](\d+)([%％])>/i;
  var note3 = /<(?:GLOBAL COOLDOWN DURATION):[ ](\d+)([%％])>/i;
  var note4 = /<(?:SKILL)[ ](\d+)[ ](?:COOLDOWN RATE):[ ](\d+)([%％])>/i;
  var note4a = /<(?:SKILL)[ ](.*)[ ](?:COOLDOWN RATE):[ ](\d+)([%％])>/i;
  var note5 = /<(?:STYPE)[ ](\d+)[ ](?:COOLDOWN RATE):[ ](\d+)([%％])>/i;
  var note6 = /<(?:GLOBAL COOLDOWN RATE):[ ](\d+)([%％])>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.cooldownDuration = {};
    obj.stypeCooldownDuration = {};
    obj.globalCooldownDuration = 1.0;
    obj.cooldownRate = {};
    obj.stypeCooldownRate = {};
    obj.globalCooldownRate = 1.0;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        obj.cooldownDuration[parseInt(RegExp.$1)] = 
          parseFloat(RegExp.$2) * 0.01;
      } else if (line.match(note1a)) {
        var name = String(RegExp.$1).toUpperCase();
        if (Yanfly.SkillIdRef[name]) {
          var id = Yanfly.SkillIdRef[name];
        } else {
          continue;
        }
        obj.cooldownDuration[id] = parseFloat(RegExp.$2) * 0.01;
      } else if (line.match(note2)) {
        obj.stypeCooldownDuration[parseInt(RegExp.$1)] = 
          parseFloat(RegExp.$2) * 0.01;
      } else if (line.match(note3)) {
        obj.globalCooldownDuration = parseFloat(RegExp.$1) * 0.01;
      } else if (line.match(note4)) {
        obj.cooldownRate[parseInt(RegExp.$1)] = parseFloat(RegExp.$2) * 0.01;
      } else if (line.match(note4a)) {
        var name = String(RegExp.$1).toUpperCase();
        if (Yanfly.SkillIdRef[name]) {
          var id = Yanfly.SkillIdRef[name];
        } else {
          continue;
        }
        obj.cooldownRate[id] = parseFloat(RegExp.$2) * 0.01;
      } else if (line.match(note5)) {
        obj.stypeCooldownRate[parseInt(RegExp.$1)] = 
          parseFloat(RegExp.$2) * 0.01;
      } else if (line.match(note6)) {
        obj.globalCooldownRate = parseFloat(RegExp.$1 * 0.01);
      }
    }
  }
};

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.SCD.BattleManager_endBattle = BattleManager.endBattle;
BattleManager.endBattle = function(result) {
    Yanfly.SCD.BattleManager_endBattle.call(this, result);
    $gameParty.endBattleCooldowns();
};

BattleManager.timeBasedCooldowns = function() {
  if (!$gameParty.inBattle()) return false;
  if (!Imported.YEP_BattleEngineCore) return false;
  if (this.isTurnBased()) return false;
  if (this._timeBasedCooldowns !== undefined) return this._timeBasedCooldowns;
  this._timeBasedCooldowns = eval(Yanfly.Param.CDTimeBased);
  return this._timeBasedCooldowns;
};

if (Imported.YEP_BattleEngineCore) {
Yanfly.SCD.BattleManager_processActionSequence =
  BattleManager.processActionSequence;
  BattleManager.processActionSequence = function(actionName, actionArgs) {
    // GLOBAL COOLDOWN
    if (actionName === 'GLOBAL COOLDOWN') {
      return this.actionGlobalCooldown(actionArgs);
    }
    // SKILL COOLDOWN
    if (actionName.match(/SKILL[ ](\d+)[ ]COOLDOWN/i)) {
      return this.actionSkillCooldown(parseInt(RegExp.$1), actionArgs);
    }
    // SKILL TYPE COOLDOWN
    if (actionName.match(/SKILL[ ]TYPE[ ](\d+)[ ]COOLDOWN/i)) {
      return this.actionSTypeCooldown(parseInt(RegExp.$1), actionArgs);
    }
    // STYPE COOLDOWN
    if (actionName.match(/STYPE[ ](\d+)[ ]COOLDOWN/i)) {
      return this.actionSTypeCooldown(parseInt(RegExp.$1), actionArgs);
    }
    return Yanfly.SCD.BattleManager_processActionSequence.call(this,
      actionName, actionArgs);
  };
};

BattleManager.actionGlobalCooldown = function(actionArgs) {
    var targets = this.makeActionTargets(actionArgs[0]);
    if (targets.length < 1) return true;
    var cmd = actionArgs[1];
    if (cmd.match(/([\+\-]\d+)/i)) {
      var value = parseInt(RegExp.$1);
      for (var t = 0; t < targets.length; ++t) {
        var target = targets[t];
        for (var i = 0; i < target.allSkills().length; ++i) {
          var skill = target.allSkills()[i];
          if (skill) {
            target.addCooldown(skill.id, value);
          }
        }
      }
    } else if (cmd.match(/(\d+)/i)) {
      var value = parseInt(RegExp.$1);
      for (var t = 0; t < targets.length; ++t) {
        var target = targets[t];
        for (var i = 0; i < target.allSkills().length; ++i) {
          var skill = target.allSkills()[i];
          if (skill) {
            target.setCooldown(skill.id, value);
          }
        }
      }
    } else {
      return true;
    }
    return true;
};

BattleManager.actionSkillCooldown = function(skillId, actionArgs) {
    var targets = this.makeActionTargets(actionArgs[0]);
    if (targets.length < 1) return true;
    var cmd = actionArgs[1];
    if (cmd.match(/([\+\-]\d+)/i)) {
      var value = parseInt(RegExp.$1);
      for (var t = 0; t < targets.length; ++t) {
        var target = targets[t];
        target.addCooldown(skillId, value);
      }
    } else if (cmd.match(/(\d+)/i)) {
      var value = parseInt(RegExp.$1);
      for (var t = 0; t < targets.length; ++t) {
        var target = targets[t];
        target.setCooldown(skillId, value);
      }
    } else {
      return true;
    }
    return true;
};

BattleManager.actionSTypeCooldown = function(stypeId, actionArgs) {
    var targets = this.makeActionTargets(actionArgs[0]);
    if (targets.length < 1) return true;
    var cmd = actionArgs[1];
    if (cmd.match(/([\+\-]\d+)/i)) {
      var value = parseInt(RegExp.$1);
      for (var t = 0; t < targets.length; ++t) {
        var target = targets[t];
        for (var i = 0; i < target.allSkills().length; ++i) {
          var skill = target.allSkills()[i];
          if (skill && skill.stypeId === stypeId) {
            target.addCooldown(skill.id, value);
          }
        }
      }
    } else if (cmd.match(/(\d+)/i)) {
      var value = parseInt(RegExp.$1);
      for (var t = 0; t < targets.length; ++t) {
        var target = targets[t];
        for (var i = 0; i < target.allSkills().length; ++i) {
          var skill = target.allSkills()[i];
          if (skill && skill.stypeId === stypeId) {
            target.setCooldown(skill.id, value);
          }
        }
      }
    } else {
      return true;
    }
    return true;
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Yanfly.SCD.Game_BattlerBase_initMembers =
    Game_BattlerBase.prototype.initMembers;
Game_BattlerBase.prototype.initMembers = function() {
    Yanfly.SCD.Game_BattlerBase_initMembers.call(this);
    this.clearCooldowns();
    this.clearWarmups();
};

Game_BattlerBase.prototype.clearCooldowns = function() {
    this._cooldownTurns = {};
};

Game_BattlerBase.prototype.clearWarmups = function() {
    this._warmupTurns = {};
};

Game_BattlerBase.prototype.cooldown = function(skillId) {
    if (this._cooldownTurns === undefined) this.clearCooldowns();
    if (this._cooldownTurns[skillId] === undefined) {
      this._cooldownTurns[skillId] = 0;
    }
    return this._cooldownTurns[skillId];
};

Game_BattlerBase.prototype.warmup = function(skillId) {
    if (this._warmupTurns === undefined) this.clearWarmups();
    if (this._warmupTurns[skillId] === undefined) {
      this._warmupTurns[skillId] = 0;
    }
    return this._warmupTurns[skillId];
};

Game_BattlerBase.prototype.setCooldown = function(skillId, value) {
    if (!$dataSkills[skillId]) return;
    if ($dataSkills[skillId].bypassCooldown) return;
    if (this._cooldownTurns === undefined) this.clearCooldowns();
    this._cooldownTurns[skillId] = value;
};

Game_BattlerBase.prototype.addCooldown = function(skillId, value) {
    if (!$dataSkills[skillId]) return;
    if ($dataSkills[skillId].bypassCooldown) return;
    if (this._cooldownTurns === undefined) this.clearCooldowns();
    if (!this._cooldownTurns[skillId]) this._cooldownTurns[skillId] = 0;
    this._cooldownTurns[skillId] += value;
};

Game_BattlerBase.prototype.setWarmup = function(skillId, value) {
    if (!$dataSkills[skillId]) return;
    if ($dataSkills[skillId].bypassCooldown) return;
    if (this._warmupTurns === undefined) this.clearWarmups();
    this._warmupTurns[skillId] = value;
};

Game_BattlerBase.prototype.startWarmups = function() {
    if (this._warmupTurns === undefined) this.clearWarmups();
    for (var i = 0; i < this.allSkills().length; ++i) {
      var skill = this.allSkills()[i];
      if (!skill) continue;
      var warmup = skill.warmup;
      if (skill.warmupEval.length > 0) {
        var item = skill;
        var a = this;
        var user = this;
        var subject = this;
        var s = $gameSwitches._data;
        var v = $gameVariables._data;
        var code = skill.warmupEval;
        try {
          eval(code);
        } catch (e) {
          Yanfly.Util.displayError(e, code, 'CUSTOM WARMUP EVAL ERROR');
        }
      }
      warmup *= this.cooldownDuration(skill);
      warmup += this.getWarmupMods(skill);
      this.setWarmup(skill.id, warmup);
    }
};

Game_BattlerBase.prototype.updateCooldowns = function() {
    if (this._cooldownTurns === undefined) this.clearCooldowns();
    for (var skillId in this._cooldownTurns) {
      var skill = $dataSkills[skillId];
      if (!skill) continue;
      this._cooldownTurns[skillId] -= this.cooldownRate(skill);
    }
};

Game_BattlerBase.prototype.updateWarmups = function() {
    if (this._warmupTurns === undefined) this.clearWarmups();
    for (var skillId in this._warmupTurns) {
      var skill = $dataSkills[skillId];
      if (!skill) continue;
      this._warmupTurns[skillId] -= this.cooldownRate(skill);
    }
};

Game_BattlerBase.prototype.cooldownRateTick = function(skill) {
    this._cooldownTickRate = this._cooldownTickRate || {};
    if (!this._cooldownTickRate[skill.id]) {
      this._cooldownTickRate[skill.id] = this.cooldownRate(skill);
    }
    var rate = this._cooldownTickRate[skill.id];
    rate *= BattleManager.tickRate() / Yanfly.Param.CDTurnTime;
    return rate;
};

Game_BattlerBase.prototype.updateCooldownTicks = function() {
    if (this._cooldownTurns === undefined) this.clearCooldowns();
    for (var skillId in this._cooldownTurns) {
      var skill = $dataSkills[skillId];
      if (!skill) continue;
      if (this._cooldownTurns[skillId] <= 0) continue;
      this._cooldownTurns[skillId] -= this.cooldownRateTick(skill);
      this._cooldownTurns[skillId] = Math.max(0, this._cooldownTurns[skillId]);
    }
};

Game_BattlerBase.prototype.updateWarmupTicks = function() {
    if (this._warmupTurns === undefined) this.clearWarmups();
    for (var skillId in this._warmupTurns) {
      var skill = $dataSkills[skillId];
      if (!skill) continue;
      if (this._warmupTurns[skillId] <= 0) continue;
      this._warmupTurns[skillId] -= this.cooldownRateTick(skill);
      this._warmupTurns[skillId] = Math.max(0, this._warmupTurns[skillId]);
    }
};

Yanfly.SCD.Game_BattlerBase_meetsSkillConditions =
    Game_BattlerBase.prototype.meetsSkillConditions;
Game_BattlerBase.prototype.meetsSkillConditions = function(skill) {
    if (this.cooldown(skill.id) > 0) return false;
    if (this.warmup(skill.id) > 0) return false;
    return Yanfly.SCD.Game_BattlerBase_meetsSkillConditions.call(this, skill);
};

Yanfly.SCD.Game_BattlerBase_paySkillCost =
    Game_BattlerBase.prototype.paySkillCost;
Game_BattlerBase.prototype.paySkillCost = function(skill) {
    Yanfly.SCD.Game_BattlerBase_paySkillCost.call(this, skill);
    this.payGlobalCooldown(skill);
    this.payStypeCooldownCost(skill);
    this.payCooldownCost(skill);
    this.applyCooldownMods(skill);
};

Game_BattlerBase.prototype.payGlobalCooldown = function(mainSkill) {
    for (var i = 0; i < this.allSkills().length; ++i) {
      var skill = this.allSkills()[i];
      if (!skill) continue;
      var value = mainSkill.globalCooldown;
      value *= this.cooldownDuration(mainSkill);
      value = Math.max(value, this.cooldown(skill.id));
      this.setCooldown(skill.id, value);
    }
};

Game_BattlerBase.prototype.payStypeCooldownCost = function(mainSkill) {
    for (var stypeId in mainSkill.stypeCooldown) {
      stypeId = parseInt(stypeId);
      for (var i = 0; i < this.allSkills().length; ++i) {
        var skill = this.allSkills()[i];
        if (!skill) continue;
        if (skill.stypeId !== stypeId) continue;
        var value = mainSkill.stypeCooldown[stypeId];
        value *= this.cooldownDuration(mainSkill);
        value = Math.max(value, this.cooldown(skill.id));
        this.setCooldown(skill.id, value);
      }
    }
};

Game_BattlerBase.prototype.payCooldownCost = function(skill) {
    for (var skillId in skill.cooldown) {
      skillId = parseInt(skillId);
      if (!$dataSkills[skillId]) continue;
      var cooldown = skill.cooldown[skillId];
      if (skill.id === skillId) {
        if (skill.cooldownEval.length > 0) {
          var item = skill;
          var a = this;
          var user = this;
          var subject = this;
          var s = $gameSwitches._data;
          var v = $gameVariables._data;
          var code = skill.cooldownEval;
          try {
            eval(code);
          } catch (e) {
            Yanfly.Util.displayError(e, code, 'CUSTOM COOLDOWN EVAL ERROR');
          }
        }
      }
      cooldown *= this.cooldownDuration(skill);
      cooldown = Math.max(cooldown, this.cooldown(skillId));
      this.setCooldown(skillId, cooldown);
    }
};

Game_BattlerBase.prototype.endBattleCooldowns = function() {
    this.resetCooldownTickRates();
    for (var skillId in this._cooldownTurns) {
      this._cooldownTurns[skillId] += $dataSkills[skillId].afterBattleCooldown;
    }
};

Game_BattlerBase.prototype.resetCooldownTickRates = function() {
    this._cooldownTickRate = {};
};

Game_BattlerBase.prototype.updateCooldownSteps = function() {
    for (var skillId in this._cooldownTurns) {
      var skill = $dataSkills[skillId];
      if (skill) {
        if ($gameParty.steps() % skill.cooldownSteps === 0) {
          this._cooldownTurns[skillId] -= this.cooldownRate(skill);
        }
      }
    }
};

Game_BattlerBase.prototype.applyCooldownEffect = function(skill) {
    this.applyGlobalCooldownChange(skill);
    this.applyStypeCooldownChange(skill);
    this.applyCooldownChange(skill);
};

Game_BattlerBase.prototype.applyCooldownChange = function(skill) {
    for (var skillId in skill.cooldownChange) {
      skillId = parseInt(skillId);
      if (!$dataSkills[skillId]) continue;
      if (!skill.cooldownChange[skillId]) continue;
      var value = skill.cooldownChange[skillId];
      this.addCooldown(skillId, value);
    }
};

Game_BattlerBase.prototype.applyStypeCooldownChange = function(mainSkill) {
    for (var stypeId in mainSkill.stypeCooldownChange) {
      stypeId = parseInt(stypeId);
      for (var i = 0; i < this.allSkills().length; ++i) {
        var skill = this.allSkills()[i];
        if (!skill) continue;
        if (skill.stypeId !== stypeId) continue;
        if (!mainSkill.stypeCooldownChange[stypeId]) continue;
        var value = mainSkill.stypeCooldownChange[stypeId];
        this.addCooldown(skill.id, value);
      }
    }
};

Game_BattlerBase.prototype.applyGlobalCooldownChange = function(mainSkill) {
    for (var i = 0; i < this.allSkills().length; ++i) {
      var skill = this.allSkills()[i];
      if (!skill) continue;
      var value = mainSkill.globalCooldownChange;
      this.addCooldown(skill.id, value);
    }
};

Game_BattlerBase.prototype.getWarmupMods = function(skill) {
    var value = 0;
    value += this.flatWarmupChange(skill);
    return value;
};

Game_BattlerBase.prototype.applyCooldownMods = function(skill) {
    var value = this.cooldown(skill.id);
    value += this.flatCooldownChange(skill);
    this.setCooldown(skill.id, Math.max(0, value));
};

//=============================================================================
// Game_Battler
//=============================================================================

Game_Battler.prototype.onBattleStartCooldowns = function() {
    this.resetCooldownTickRates();
    this.startWarmups();
};

Game_Battler.prototype.cooldownDuration = function(skill) {
    var skillId = skill.id;
    var stypeId = skill.stypeId;
    var value = 1.0;
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.cooldownDuration[skillId] !== undefined) {
        value *= state.cooldownDuration[skillId];
      }
      if (state.stypeCooldownDuration[stypeId] !== undefined) {
        value *= state.stypeCooldownDuration[stypeId];
      }
      value *= state.globalCooldownDuration;
    }
    return value;
};

Game_Battler.prototype.cooldownRate = function(skill) {
    var skillId = skill.id;
    var stypeId = skill.stypeId;
    var value = 1;
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.cooldownRate[skillId] !== undefined) {
        value *= state.cooldownRate[skillId];
      }
      if (state.stypeCooldownRate[stypeId] !== undefined) {
        value *= state.stypeCooldownRate[stypeId];
      }
      value *= state.globalCooldownRate;
    }
    return value;
};

Game_Battler.prototype.flatCooldownChange = function(skill) {
    var skillId = skill.id;
    var stypeId = skill.stypeId;
    var value = 0;
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.cooldownChange[skillId] !== undefined) {
        value += state.cooldownChange[skillId];
      }
      if (state.stypeCooldownChange[stypeId] !== undefined) {
        value += state.stypeCooldownChange[stypeId];
      }
      value += state.globalCooldownChange;
    }
    return value;
};

Game_Battler.prototype.flatWarmupChange = function(skill) {
    var skillId = skill.id;
    var stypeId = skill.stypeId;
    var value = 0;
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.warmupChange[skillId] !== undefined) {
        value += state.warmupChange[skillId];
      }
      if (state.stypeWarmupChange[stypeId] !== undefined) {
        value += state.stypeWarmupChange[stypeId];
      }
      value += state.globalWarmupChange;
    }
    return value;
};

Yanfly.SCD.Game_Battler_refresh = Game_Battler.prototype.refresh;
Game_Battler.prototype.refresh = function() {
    Yanfly.SCD.Game_Battler_refresh.call(this);
    this.resetCooldownTickRates();
};

if (Imported.YEP_BattleEngineCore) {

  Yanfly.SCD.Game_Battler_onTurnStart = Game_Battler.prototype.onTurnStart;
  Game_Battler.prototype.onTurnStart = function() {
    Yanfly.SCD.Game_Battler_onTurnStart.call(this);
    if (BattleManager.isTickBased() && !BattleManager.timeBasedCooldowns()) {
      this.updateCooldowns();
      this.updateWarmups();
    }
  };

  Yanfly.SCD.Game_Battler_updateTick = Game_Battler.prototype.updateTick;
  Game_Battler.prototype.updateTick = function() {
    Yanfly.SCD.Game_Battler_updateTick.call(this);
    if (BattleManager.isTickBased() && BattleManager.timeBasedCooldowns()) {
      this.updateCooldownTicks();
      this.updateWarmupTicks();
    };
  };

}; // Imported.YEP_BattleEngineCore

Game_Battler.prototype.allSkills = function() {
  var prevCase = $gameTemp._disableBattleSkills;
  $gameTemp._disableBattleSkills = true;
  var skills = this.skills();
  $gameTemp._disableBattleSkills = prevCase;
  return skills;
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.cooldownDuration = function(skill) {
    var value = Game_Battler.prototype.cooldownDuration.call(this, skill);
    var skillId = skill.id;
    var stypeId = skill.stypeId;
    if (this.actor().cooldownDuration[skillId] !== undefined) {
      value *= this.actor().cooldownDuration[skillId];
    }
    if (this.currentClass().cooldownDuration[skillId] !== undefined) {
      value *= this.currentClass().cooldownDuration[skillId];
    }
    if (this.actor().stypeCooldownDuration[stypeId] !== undefined) {
      value *= this.actor().stypeCooldownDuration[stypeId];
    }
    if (this.currentClass().stypeCooldownDuration[stypeId] !== undefined) {
      value *= this.currentClass().stypeCooldownDuration[stypeId];
    }
    value *= this.actor().globalCooldownDuration;
    value *= this.currentClass().globalCooldownDuration;
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (!equip) continue;
      if (equip.cooldownDuration !== undefined) {
        if (equip.cooldownDuration[skillId] !== undefined) {
          value *= equip.cooldownDuration[skillId];
        }
      }
      if (equip.stypeCooldownDuration !== undefined) {
        if (equip.stypeCooldownDuration[stypeId] !== undefined) {
          value *= equip.stypeCooldownDuration[stypeId];
        }
      }
      if (equip.globalCooldownDuration !== undefined) {
        value *= equip.globalCooldownDuration;
      }
    }
    return value;
};

Game_Actor.prototype.cooldownRate = function(skill) {
    var value = Game_Battler.prototype.cooldownRate.call(this, skill);
    var skillId = skill.id;
    var stypeId = skill.stypeId;
    if (this.actor().cooldownRate[skillId] !== undefined) {
      value *= this.actor().cooldownRate[skillId];
    }
    if (this.currentClass().cooldownRate[skillId] !== undefined) {
      value *= this.currentClass().cooldownRate[skillId];
    }
    if (this.actor().stypeCooldownRate[stypeId] !== undefined) {
      value *= this.actor().stypeCooldownRate[stypeId];
    }
    if (this.currentClass().stypeCooldownRate[stypeId] !== undefined) {
      value *= this.currentClass().stypeCooldownRate[stypeId];
    }
    value *= this.actor().globalCooldownRate;
    value *= this.currentClass().globalCooldownRate;
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (!equip) continue;
      if (equip.cooldownRate !== undefined) {
        if (equip.cooldownRate[skillId] !== undefined) {
          value *= equip.cooldownRate[skillId];
        }
      }
      if (equip.stypeCooldownRate !== undefined) {
        if (equip.stypeCooldownRate[stypeId] !== undefined) {
          value *= equip.stypeCooldownRate[stypeId];
        }
      }
      if (equip.globalCooldownRate !== undefined) {
        value *= equip.globalCooldownRate;
      }
    }
    return value;
};

Game_Actor.prototype.flatCooldownChange = function(skill) {
    var skillId = skill.id;
    var stypeId = skill.stypeId;
    var value = Game_Battler.prototype.flatCooldownChange.call(this, skill);
    if (this.actor().cooldownChange[skillId] !== undefined) {
      value += this.actor().cooldownChange[skillId];
    }
    if (this.currentClass().cooldownChange[skillId] !== undefined) {
      value += this.currentClass().cooldownChange[skillId];
    }
    if (this.actor().stypeCooldownChange[stypeId] !== undefined) {
      value += this.actor().stypeCooldownChange[stypeId];
    }
    if (this.currentClass().stypeCooldownChange[stypeId] !== undefined) {
      value += this.currentClass().stypeCooldownChange[stypeId];
    }
    value += this.actor().globalCooldownChange;
    value += this.currentClass().globalCooldownChange;
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (!equip) continue;
      if (equip.cooldownChange === undefined) continue;
      if (equip.cooldownChange[skillId] !== undefined) {
        value += equip.cooldownChange[skillId];
      }
      if (equip.stypeCooldownChange[stypeId] !== undefined) {
        value += equip.stypeCooldownChange[stypeId];
      }
      value += equip.globalCooldownChange;
    }
    return value;
};

Game_Actor.prototype.flatWarmupChange = function(skill) {
    var skillId = skill.id;
    var stypeId = skill.stypeId;
    var value = Game_Battler.prototype.flatWarmupChange.call(this, skill);
    if (this.actor().warmupChange[skillId] !== undefined) {
      value += this.actor().warmupChange[skillId];
    }
    if (this.currentClass().warmupChange[skillId] !== undefined) {
      value += this.currentClass().warmupChange[skillId];
    }
    if (this.actor().stypeWarmupChange[stypeId] !== undefined) {
      value += this.actor().stypeWarmupChange[stypeId];
    }
    if (this.currentClass().stypeWarmupChange[stypeId] !== undefined) {
      value += this.currentClass().stypeWarmupChange[stypeId];
    }
    value += this.actor().globalWarmupChange;
    value += this.currentClass().globalWarmupChange;
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (!equip) continue;
      if (equip.warmupChange === undefined) continue;
      if (equip.warmupChange[skillId] !== undefined) {
        value += equip.warmupChange[skillId];
      }
      if (equip.stypeWarmupChange[stypeId] !== undefined) {
        value += equip.stypeWarmupChange[stypeId];
      }
      value += equip.globalWarmupChange;
    }
    return value;
};

//=============================================================================
// Game_Enemy
//=============================================================================

if (!Game_Enemy.prototype.skills) {
    Game_Enemy.prototype.skills = function() {
      var skills = []
      for (var i = 0; i < this.enemy().actions.length; ++i) {
        var skill = $dataSkills[this.enemy().actions[i].skillId]
        if (skill) skills.push(skill);
      }
      return skills;
    }
};

Game_Enemy.prototype.cooldownDuration = function(skill) {
    var value = Game_Battler.prototype.cooldownDuration.call(this, skill);
    var skillId = skill.id;
    var stypeId = skill.stypeId;
    if (this.enemy().cooldownDuration[skillId] !== undefined) {
      value *= this.enemy().cooldownDuration[skillId];
    }
    if (this.enemy().stypeCooldownDuration[stypeId] !== undefined) {
      value *= this.enemy().stypeCooldownDuration[stypeId];
    }
    value *= this.enemy().globalCooldownDuration;
    return value;
};

Game_Enemy.prototype.cooldownRate = function(skill) {
    var value = Game_Battler.prototype.cooldownRate.call(this, skill);
    var skillId = skill.id;
    var stypeId = skill.stypeId;
    if (this.enemy().cooldownRate[skillId] !== undefined) {
      value *= this.enemy().cooldownRate[skillId];
    }
    if (this.enemy().stypeCooldownRate[stypeId] !== undefined) {
      value *= this.enemy().stypeCooldownRate[stypeId];
    }
    value *= this.enemy().globalCooldownRate;
    return value;
};

Game_Enemy.prototype.flatCooldownChange = function(skill) {
    var skillId = skill.id;
    var stypeId = skill.stypeId;
    var value = Game_Battler.prototype.flatCooldownChange.call(this, skill);
    if (this.enemy().cooldownChange[skillId] !== undefined) {
      value += this.enemy().cooldownChange[skillId];
    }
    if (this.enemy().stypeCooldownChange[stypeId] !== undefined) {
      value += this.enemy().stypeCooldownChange[stypeId];
    }
    value += this.enemy().globalCooldownChange;
    return value;
};

Game_Enemy.prototype.flatWarmupChange = function(skill) {
    var skillId = skill.id;
    var stypeId = skill.stypeId;
    var value = Game_Battler.prototype.flatWarmupChange.call(this, skill);
    if (this.enemy().warmupChange[skillId] !== undefined) {
      value += this.enemy().warmupChange[skillId];
    }
    if (this.enemy().stypeWarmupChange[stypeId] !== undefined) {
      value += this.enemy().stypeWarmupChange[stypeId];
    }
    value += this.enemy().globalWarmupChange;
    return value;
};

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.SCD.Game_Action_applyItemUserEffect =
    Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
    Yanfly.SCD.Game_Action_applyItemUserEffect.call(this, target);
    if (target) target.applyCooldownEffect(this.item());
};

//=============================================================================
// Game_Unit
//=============================================================================

Yanfly.SCD.Game_Unit_onBattleStart = Game_Unit.prototype.onBattleStart;
Game_Unit.prototype.onBattleStart = function() {
  Yanfly.SCD.Game_Unit_onBattleStart.call(this);
  this.onBattleStartCooldowns();
};

Game_Unit.prototype.onBattleStartCooldowns = function() {
  var members = this.cooldownMembers();
  var length = members.length
  for (var i = 0; i < length; ++i) {
    var member = members[i];
    if (member) member.onBattleStartCooldowns();
  }
};

Game_Unit.prototype.updateCooldowns = function() {
  if (BattleManager.timeBasedCooldowns()) return;
  var members = this.members();
  var length = members.length
  for (var i = 0; i < length; ++i) {
    var member = members[i];
    if (member) {
      member.updateCooldowns();
      member.updateWarmups();
    }
  }
};

Game_Unit.prototype.endBattleCooldowns = function() {
  var members = this.members();
  var length = members.length
  for (var i = 0; i < length; ++i) {
    var member = members[i];
    if (member) {
      member.endBattleCooldowns();
      member.clearWarmups();
    }
  }
};

Game_Unit.prototype.cooldownMembers = function() {
  return this.members();
};

//=============================================================================
// Game_Party
//=============================================================================

Yanfly.SCD.Game_Party_increaseSteps = Game_Party.prototype.increaseSteps;
Game_Party.prototype.increaseSteps = function() {
    Yanfly.SCD.Game_Party_increaseSteps.call(this);
    this.updateCooldownSteps();
};

Game_Party.prototype.updateCooldownSteps = function() {
    return this.members().forEach(function(member) {
        return member.updateCooldownSteps();
    });
};

Game_Party.prototype.cooldownMembers = function() {
  return this.allMembers();
};

//=============================================================================
// Game_Troop
//=============================================================================

Yanfly.SCD.Game_Troop_increaseTurn = Game_Troop.prototype.increaseTurn;
Game_Troop.prototype.increaseTurn = function() {
    Yanfly.SCD.Game_Troop_increaseTurn.call(this);
    if (Imported.YEP_BattleEngineCore) {
      if (BattleManager.isTurnBased()) {
        this.updateCooldowns();
        $gameParty.updateCooldowns();
      }
    } else {
      this.updateCooldowns();
      $gameParty.updateCooldowns();
    }
};

//=============================================================================
// Window_SkillList
//=============================================================================

Yanfly.SCD.Window_SkillList_drawCost = Window_SkillList.prototype.drawSkillCost;
Window_SkillList.prototype.drawSkillCost = function(skill, wx, wy, ww) {
    if (this._actor.warmup(skill.id) > 0) {
      return this.drawWarmup(skill, wx, wy, ww);
    } else if (this._actor.cooldown(skill.id) > 0) {
      return this.drawCooldown(skill, wx, wy, ww);
    } else {
      return Yanfly.SCD.Window_SkillList_drawCost.call(this, skill, wx, wy, ww);
    }
};

Window_SkillList.prototype.drawCooldown = function(skill, wx, wy, dw) {
    if (Yanfly.Icon.Cooldown > 0) {
      var iw = wx + dw - Window_Base._iconWidth;
      this.drawIcon(Yanfly.Icon.Cooldown, iw, wy + 2);
      dw -= Window_Base._iconWidth + 2;
    }
    this.changeTextColor(this.textColor(Yanfly.Param.CDTextColor));
    var fmt = Yanfly.Param.CDFmt;
    var value = this._actor.cooldown(skill.id);
    if (value % 1 !== 0) value = value.toFixed(2);
    if (value <= 0.009) value = 0.01;
    var text = fmt.format(Yanfly.Util.toGroup(value));
    this.contents.fontSize = Yanfly.Param.CDFontSize;
    this.drawText(text, wx, wy, dw, 'right');
    var returnWidth = dw - this.textWidth(text) - Yanfly.Param.SCCCostPadding;
    this.resetFontSettings();
    return returnWidth;
};

Window_SkillList.prototype.drawWarmup = function(skill, wx, wy, dw) {
    if (Yanfly.Icon.Warmup > 0) {
      var iw = wx + dw - Window_Base._iconWidth;
      this.drawIcon(Yanfly.Icon.Warmup, iw, wy + 2);
      dw -= Window_Base._iconWidth + 2;
    }
    this.changeTextColor(this.textColor(Yanfly.Param.WUTextColor));
    var fmt = Yanfly.Param.WUFmt;
    var value = this._actor.warmup(skill.id);
    if (value % 1 !== 0) value = value.toFixed(2);
    if (value <= 0.009) value = 0.01;
    var text = fmt.format(Yanfly.Util.toGroup(value));
    this.contents.fontSize = Yanfly.Param.WUFontSize;
    this.drawText(text, wx, wy, dw, 'right');
    var returnWidth = dw - this.textWidth(text) - Yanfly.Param.SCCCostPadding;
    this.resetFontSettings();
    return returnWidth;
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

if (!Yanfly.Util.toGroup) {
    Yanfly.Util.toGroup = function(inVal) {
        return inVal;
    }
};

//=============================================================================
// End of File
//=============================================================================
};
