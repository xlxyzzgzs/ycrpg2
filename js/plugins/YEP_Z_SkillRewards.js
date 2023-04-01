//=============================================================================
// Yanfly Engine Plugins - Lunatic Pack - Skill Rewards
// YEP_Z_SkillRewards.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_Z_SkillRewards = true;

var Yanfly = Yanfly || {};
Yanfly.LunSkRew = Yanfly.LunSkRew || {};
Yanfly.LunSkRew.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 行动后奖励效果☁️
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 导言
 *  ============================================================================
 * 
 * 此插件需要以下插件：
 * -战斗引擎核心
 * -技能核心
 * 
 * 将此插件放在插件管理器中上述插件的下面。
 * 
 * 这个插件允许你添加各种效果到你的项目和技能
 * 奖励玩家好的（或坏的）游戏。某些效果只能
 * 在特定条件下触发，例如击溃目标、着陆
 * 暴击，或打击目标的弱点。在这些情况发生之后
 * 如果已经达到，效果可以从技能费用退款，增加buff，
 * 移除减益，甚至应用状态。
 * 
 *  * 注 * ：此插件最好与RPG Maker MV版本1.5.0+一起使用。你可以
 * 仍然使用这个版本号较低的插件，但你会有很多
 * 没有它就很难改变插件参数。
 * 
 *  ============================================================================
 * 便签
 *  ============================================================================
 * 
 * 在技能或项目的记事本框中插入以下记事本标签，为技能或项目添加
 * 一个记事本这些影响包括：
 * 
 *  ---
 * 
*技能和物品标签：
 *
 *   <Reward Animation: x>
 * - 如果此技能/物品效果有奖励且满足条件，则将播放此动画代替默认动画，
 * 以指示已发生效果。
 *
 *   <condition Reward: effect>
 *   - 这个插件的大部分NoteTag都将遵循上述格式便签中的“条件”和
 * “效果”将分别替换为以下“条件”和“效果”部分中的条目。
 * 插入多个条目以赋予您的技能/项目多重效果。
 *
 * =-=-=-= 奖励条件 =-=-=-=
 *
 *   <Defeat Reward: effect>
 *   - 将“条件”替换为“失败”，
 * 当目标被击败（生命值达到0或收到死亡状态）时，你将使便签生效。
 *
 *   <Critical Reward: effect>
 *   - 将“condition”替换为“Critical”，这样当用户对目标造成
 * 致命一击时，便签就会生效。
 *
 *   <Noncritical Reward: effect>
 *   - 将“condition”替换为“Nonnritical”，当用户未能对目标
 * 进行致命一击时，您将使notetag生效。
 *
 *   <Hit Reward: effect>
 *   - 将“condition”替换为“Hit”，当用户成功命中目标时，您
 * 将使notetag生效。
 *
 *   <Missed Reward: effect>
 *   - 将“condition”替换为“Missed”，当用户错过操作或目标
 * 逃避操作时，您将使notetag生效。
 *
 *   <Weakness Reward: effect>
 *   - 将“条件”替换为“弱点”，这样当用户在目标上点击一个
 * 基本弱点时，便签就会生效。
 *
 *   <Resisted Reward: effect>
 *   - 将“condition”替换为“Resisted”，这样当用户在目标上
 * 命中元素抗性时，便签就会生效。
 *
 *   <Nulled Reward: effect>
 *   - 将“condition”替换为“Nulled”，这样当用户在目标上
 * 点击一个为null的元素时，notetag就会生效。
 *
 *   <Absorb Reward: effect>
 *   - 将“condition”替换为“Nulled”，这样当用户点击目标上
 * 的某个元素时，notetag就会生效。
 *
 * =-=-=-= 奖励效应 =-=-=-=
 *
 *   --- HP效果 ---
 *
 *   <condition Reward: +x HP>
 *   - 用上述格式替换“effect”。将“x”替换为您希望在满足
 * 技能/物品条件时奖励用户的固定HP值。
 * 建议：Yanfly
 *
 *   <condition Reward: +x% HP>
 *   - 用上述格式替换“effect”。将“x”替换为等于用户
 * 最大HP的x%的HP，以在满足条件时奖励用户。
 * 建议：Yanfly
 *
 *   <condition Reward: +x% Refund HP Cost>
 *   - 用上述格式替换“effect”。如果满足条件，则将“x”替换为
 * 用于奖励用户的HP技能成本的百分比。
 **注意：只能与技能一起使用。
 *建议：Yanfly
 *
 *   --- MP效果 ---
 *
 *   <condition Reward: +x MP>
 *   - 用上述格式替换“effect”。将“x”替换为您希望在
 * 技能/物品条件满足时奖励用户的固定MP金额。
 * 建议：Yanfly
 *
 *   <condition Reward: +x% MP>
 *   - 用上述格式替换“effect”。用等于用户MaxMP的x%的
 * MP替换“x”，以在满足条件时奖励用户。
 * 建议：Yanfly
 *
 *   <condition Reward: +x% Refund MP Cost>
 *   - 用上述格式替换“effect”。如果满足条件，则将“x”替换
 * 为用于奖励用户的HP技能成本的百分比。
 ** 注意：只能与技能一起使用。
 *  建议：Yanfly
 *
 *   --- TP效果 ---
 *
 *   <condition Reward: +x TP>
 *   - 用上述格式替换“effect”。将“x”替换为您希望在满足
 * 技能/物品条件时奖励用户的固定数量的TP。
 * 建议：Yanfly
 *
 *   <condition Reward: +x% TP>
 *   - 用上述格式替换“效果”。将“x”替换为等于用户最大
 * TP的x%的TP，以在满足条件时奖励用户。
 * 建议：Yanfly
 *
 *   <condition Reward: +x% Refund TP Cost>
 *   - 用上述格式替换“effect”。如果满足条件，则将“x”替换
 * 为用于奖励用户的HP技能成本的百分比。
 ** 注意：只能与技能一起使用。
 *  建议：Yanfly
 *
 *   --- 物品效果 ---
 *
 *   <condition Reward: x% Refund Item>
 *   - 用上述格式替换“effect”。将“x”替换为在满足条件时用户
 * 必须退款（取回）的机会。
 *
 ** 注意：只能与物品一起使用。最好与消耗品一起使用。
 *  建议：Yanfly
 *
 *   --- Buff/Debuff效果 ---
 *
 *   <condition Reward: Add x Buff>
 *   <condition Reward: Add x Buff, y Turns>
 *   <condition Reward: Add x Debuff>
 *   <condition Reward: Add x Debuff, y Turns>
 *   - 将“effect”替换为上述格式。将“x”替换为以下任何参数：
 * “MaxHP”、“MaxMP”、“ATK”、“DEF”、“MAT”、
 * “MDF”、“AGI”或“LUK”，以改变相应的状态。
 * 如果使用带有“y”回合的格式，则将“y”替换为希望buff或
 * 减益持续的回合数。如果不使用“y”，它将持续5圈。
*建议：Yanfly
 *
 *   <condition Reward: Remove x Buff>
 *   <condition Reward: Remove x Debuff>
 *   - 将“effect”替换为上述格式。将“x”替换为以下任何参数：
 * “MaxHP”、“MaxMP”、“ATK”、“DEF”、“MAT”、
 * “MDF”、“AGI”或“LUK”，以便在满足条件时从
 * 用户中移除相应的buff/debuff。如果不使用“y”，它将持续5圈。
 * 建议：Yanfly
 *
 *   --- State Effects ---
 *
 *   <condition Reward: Add State x>
 *   - 将“effect”替换为上述格式。将“x”替换为满足条件时要添加
 * 到用户的状态ID。
 * 建议：Yanfly
 *
 *   <condition Reward: Remove State x>
 *   - 将“effect”替换为上述格式。将“x”替换为满足条件时要从
 * 用户中删除的状态ID。
 * 建议：Yanfly
 *
 *   --- 滚动临界 ---
 *
 *   <condition Reward: Rolling Critical +x%>
 *   <condition Reward: Rolling Critical -x%>
 *   - 将“effect”替换为上述格式。将“x”替换为技能下次使用时
 * 的增减百分比。只有满足条件时，用户才会发生此更改。
*
 ** 注意：只能与技能一起使用。开启技能的暴击。
 *  建议：Goldschuss
 *
 *   <condition Reward: Rolling Critical x%>
 *   - 将“effect”替换为上述格式。将“x”替换为满足条件时下次
 * 使用技能的百分比。
 *
 ** 注意：只能与技能一起使用。开启技能的暴击。
 *  建议：Goldschuss
 *
 * =-=-=-= 示例 =-=-=-=
 *
 *   <Defeat Reward: +50% MP>
 *   - 当目标被此技能击败时，退还该用户为施展此技能所花费MP的50%。
 *
 *   <Critical Reward: Add ATK Buff, 8 Turns>
 *   - 当用户对敌人造成暴击时，给予用户持续8回合的ATK buff。
 *
 *   <Hit Reward: Add DEF Buff, 2 Turns>
 *   - 当用户成功命中敌人时，将用户的DEF缓冲2圈。
 *
 *   <Missed Reward: Refund Item>
 *   - 当用户无法使用物品着陆时，请确保它不会被退款所消耗。
 *
 *   <Weakness Reward: +20 TP>
 *   - 如果用户对弱于此技能元素的敌人执行此技能，
 * 则授予用户+20额外TP。
 *
 *   <Critical Reward: Rolling Critical 0%>
 *   <Noncritical Reward: Rolling Critical +10%>
 *   - 如果用户无法使用此技能获得暴击，则下次用户执行此技能时，
 * 有10%的几率获得暴击。每次的暴击率将继续上升10%，
 * 直到用户最终成功获得暴击。一旦用户这样做，暴击率加成将重置回0%。
 *
 * ============================================================================
 * 疯狂模式-效果代码
 * ============================================================================
 *
 * For experienced users that know JavaScript and have RPG Maker MV 1.5.0+, you
 * can add new notetag effects that can be used by the plugin or alter the
 * effects of currently existing notetag effects from the plugin parameters
 * entry: Effect Code. It should look something like this:
 *
 * ---
 *
 * // ----------
 * // Flat Gains
 * // ----------
 * if (data.match(/([\+\-]\d+)[ ]HP/i)) {
 *   value = parseInt(RegExp.$1);
 *   user.gainHp(value);
 *   animation = animation || hpAnimation;

 * } else if (data.match(/([\+\-]\d+)[ ]MP/i)) {
 *   value = parseInt(RegExp.$1);
 *   user.gainMp(value);
 *   animation = animation || mpAnimation;
 *
 * ...
 *
 * // -------------------------------
 * // Add new effects above this line
 * // -------------------------------
 * } else {
 *   skip = true;
 * }
 *
 * ---
 *
 * Here's what each of the variables used in this code bit refer to:
 *
 *   --------------------   ---------------------------------------------------
 *   Variable:              Refers to:
 *   --------------------   ---------------------------------------------------
 *   item                   The item being used by this action
 *   skill                  The skill being used by this action
 *
 *   isItem                 Returns true if action is an item
 *   isSkill                Returns true if action is a skill
 *
 *   a                      Returns the action user
 *   user                   Returns the action user
 *   subject                Returns the action user
 *
 *   b                      Returns the action's current target
 *   target                 Returns the action's current target
 *
 *   s[x]                   Return switch x (true/false)
 *   v[x]                   Return variable x's current value
 *
 *   user._result           The current results for the user
 *   target._result         The current results for the target
 *   userPreviousResult     The results for the user before any changes
 *   targetPreviousResult   The results for the target before any changes
 *
 *   animation              The animation to be played. You can set it equal to
 *                          any of the following which corresponds to plugin
 *                          parameter settings:
 *                          - hpAnimation
 *                          - mpAnimation
 *                          - tpAnimation
 *                          - itemAnimation
 *                          - buffAnimation
 *                          - debuffAnimation
 *                          - addStateAnimation
 *                          - removeStateAnimation
 *                          - miscAnimation
 *
 *   skip                   Default: false. If true, skips popups & animations
 *
 * ---
 *
 * If you need to revert the Effect Code back to its original state, delete the
 * plugin from your plugin manager list and then add it again. The code will be
 * back to default.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.00:
 * - Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @param ---General---
 * @text ---全局---
 * @default
 *
 * @param Effect Code
 * @text 效果代码
 * @parent ---General---
 * @type note
 * @desc LUNATIC MODE: This is the code used for each of the notetag
 * effects. Refer to the help file for variables used here.
 * @default "// ----------\n// Flat Gains\n// ----------\nif (data.match(/([\\+\\-]\\d+)[ ]HP/i)) {\n  value = parseInt(RegExp.$1);\n  user.gainHp(value);\n  animation = animation || hpAnimation;\n\n} else if (data.match(/([\\+\\-]\\d+)[ ]MP/i)) {\n  value = parseInt(RegExp.$1);\n  user.gainMp(value);\n  animation = animation || mpAnimation;\n\n} else if (data.match(/([\\+\\-]\\d+)[ ]TP/i)) {\n  value = parseInt(RegExp.$1);\n  user.gainTp(value);\n  animation = animation || tpAnimation;\n\n// ----------------\n// Percentile Gains\n// ----------------\n} else if (data.match(/([\\+\\-]\\d+)([%％])[ ]HP/i)) {\n  rate = parseFloat(RegExp.$1) * 0.01;\n  value = Math.round(user.mhp * rate);\n  user.gainHp(value);\n  animation = animation || hpAnimation;\n\n} else if (data.match(/([\\+\\-]\\d+)([%％])[ ]MP/i)) {\n  rate = parseFloat(RegExp.$1) * 0.01;\n  value = Math.round(user.mmp * rate);\n  user.gainMp(value);\n  animation = animation || mpAnimation;\n\n} else if (data.match(/([\\+\\-]\\d+)([%％])[ ]TP/i)) {\n  rate = parseFloat(RegExp.$1) * 0.01;\n  value = Math.round(user.maxTp() * rate);\n  user.gainTp(value);\n  animation = animation || tpAnimation;\n\n// ------------------\n// Refund Skill Costs\n// ------------------\n} else if (data.match(/([\\+\\-]\\d+)([%％])[ ]REFUND HP COST/i)) {\n  if (isSkill) {\n    rate = parseFloat(RegExp.$1) * 0.01;\n    value = Math.round(user.skillHpCost(skill) * rate);\n    user.gainHp(value);\n    animation = animation || hpAnimation;\n  } else {\n    skip = true;\n  }\n\n} else if (data.match(/([\\+\\-]\\d+)([%％])[ ]REFUND MP COST/i)) {\n  if (isSkill) {\n    rate = parseFloat(RegExp.$1) * 0.01;\n    value = Math.round(user.skillMpCost(skill) * rate);\n    user.gainMp(value);\n    animation = animation || mpAnimation;\n  } else {\n    skip = true;\n  }\n\n} else if (data.match(/([\\+\\-]\\d+)([%％])[ ]REFUND TP COST/i)) {\n  if (isSkill) {\n    rate = parseFloat(RegExp.$1) * 0.01;\n    value = Math.round(user.skillTpCost(skill) * rate);\n    user.gainTp(value);\n    animation = animation || tpAnimation;\n  } else {\n    skip = true;\n  }\n\n// -----------\n// Refund Item\n// -----------\n} else if (data.match(/(\\d+)([%％])[ ]REFUND ITEM/i)) {\n  rate = parseFloat(RegExp.$1) * 0.01;\n  if (isItem && Math.random() < chance) {\n    $gameParty.gainItem(item, 1);\n    SoundManager.playUseItem();\n    animation = animation || itemAnimation;\n  } else {\n    skip = true;\n  }\n\n// ------------------------\n// Add/Remove Buffs/Debuffs\n// ------------------------\n} else if (data.match(/ADD[ ](.*)[ ]BUFF,[ ](\\d+)[ ]TURN/i)) {\n  var str = String(RegExp.$1).toUpperCase();\n  var turns = parseInt(RegExp.$2);\n  var paramId = DataManager.getParamId(str);\n  if (paramId >= 0) {\n    user.addBuff(paramId, turns);\n  } else {\n    skip = true;\n  }\n  animation = animation || buffAnimation;\n\n} else if (data.match(/ADD[ ](.*)[ ]BUFF/i)) {\n  var str = String(RegExp.$1).toUpperCase();\n  var turns = 5;\n  var paramId = DataManager.getParamId(str);\n  if (paramId >= 0) {\n    user.addBuff(paramId, turns);\n  } else {\n    skip = true;\n  }\n  animation = animation || buffAnimation;\n\n} else if (data.match(/ADD[ ](.*)[ ]DEBUFF,[ ](\\d+)[ ]TURN/i)) {\n  var str = String(RegExp.$1).toUpperCase();\n  var turns = parseInt(RegExp.$2);\n  var paramId = DataManager.getParamId(str);\n  if (paramId >= 0) {\n    user.addDebuff(paramId, turns);\n  } else {\n    skip = true;\n  }\n  animation = animation || debuffAnimation;\n\n} else if (data.match(/ADD[ ](.*)[ ]DEBUFF/i)) {\n  var str = String(RegExp.$1).toUpperCase();\n  var turns = 5;\n  var paramId = DataManager.getParamId(str);\n  if (paramId >= 0) {\n    user.addDebuff(paramId, turns);\n  } else {\n    skip = true;\n  }\n  animation = animation || debuffAnimation;\n\n} else if (data.match(/REMOVE[ ](.*)[ ](?:BUFF|DEBUFF)/i)) {\n  var str = String(RegExp.$1).toUpperCase();\n  var paramId = DataManager.getParamId(str);\n  if (paramId >= 0) {\n    user.removeBuff(paramId);\n  } else {\n    skip = true;\n  }\n  animation = animation || miscAnimation;\n\n// -----------------\n// Add/Remove States\n// -----------------\n} else if (data.match(/ADD STATE[ ](\\d+)/i)) {\n  var stateId = parseInt(RegExp.$1);\n  user.addState(stateId);\n  animation = animation || addStateAnimation;\n\n} else if (data.match(/REMOVE STATE[ ](\\d+)/i)) {\n  var stateId = parseInt(RegExp.$1);\n  if (user.isStateAffected(stateId)) {\n    user.removeState(stateId);\n    animation = animation || removeStateAnimation;\n  } else {\n    skip = true;\n  }\n\n// ----------------\n// Rolling Critical\n// ----------------\n} else if (data.match(/ROLLING CRITICAL[ ]([\\+\\-]\\d+)([%％])/i)) {\n  if (isSkill) {\n    rate = parseFloat(RegExp.$1) * 0.01;\n    user._rollingCritical = user._rollingCritical || {};\n    user._rollingCritical[skill.id] = user._rollingCritical[skill.id] || 0;\n    user._rollingCritical[skill.id] += rate;\n  } else {\n    skip = true;\n  }\n\n} else if (data.match(/ROLLING CRITICAL[ ](\\d+)([%％])/i)) {\n  if (isSkill) {\n    rate = parseFloat(RegExp.$1) * 0.01;\n    user._rollingCritical = user._rollingCritical || {};\n    user._rollingCritical[skill.id] = user._rollingCritical[skill.id] || 0;\n    user._rollingCritical[skill.id] = rate;\n  } else {\n    skip = true;\n  }\n\n// -------------------------------\n// Add new effects above this line\n// -------------------------------\n} else {\n  skip = true;\n}"
 *
 * @param Weakness Rate
 * @text 弱点率
 * @parent ---General---
 * @type number
 * @decimals 2
 * @min 0
 * @max 31
 * @desc 在什么时候元素率算是弱点？
 * At what point does an element rate count as a weakness?
 * @default 1.20
 *
 * @param Resisted Rate
 * @text 抵抗率
 * @parent ---General---
 * @type number
 * @decimals 2
 * @min 0
 * @max 31
 * @desc 元素率在什么时候被抵抗？
 * At what point does an element rate count as resisted?
 * @default 0.80
 *
 * @param ---Animations---
 * @text  ---动画---
 * @default
 *
 * @param HP Animation
 * @text HP动画
 * @parent ---Animations---
 * @type animation
 * @desc Animation to play when reward involves healing HP.
 * @default 41
 *
 * @param MP Animation
 * @text MP动画
 * @parent ---Animations---
 * @type animation
 * @desc Animation to play when reward involves restoring MP.
 * @default 45
 *
 * @param TP Animation
 * @text TP动画
 * @parent ---Animations---
 * @type animation
 * @desc Animation to play when reward involves raising TP.
 * @default 45
 *
 * @param Item Animation
 * @text 物品动画
 * @parent ---Animations---
 * @type animation
 * @desc Animation to play when reward involves refunding items.
 * @default 46
 *
 * @param Buff Animation
 * @text buff动画
 * @parent ---Animations---
 * @type animation
 * @desc Animation to play when reward involves buffing parameters.
 * @default 51
 *
 * @param Debuff Animation
 * @text Debuff动画
 * @parent ---Animations---
 * @type animation
 * @desc Animation to play when reward involves debuffing parameters.
 * @default 54
 *
 * @param Add State Animation
 * @text 添加状态动画
 * @parent ---Animations---
 * @type animation
 * @desc Animation to play when reward involves adding states.
 * @default 53
 *
 * @param Remove State Animation
 * @text 移除状态动画
 * @parent ---Animations---
 * @type animation
 * @desc Animation to play when reward involves removing states.
 * @default 56
 *
 * @param Misc Animation
 * @text 杂项动画
 * @parent ---Animations---
 * @type animation
 * @desc 当奖励包含其他效果时播放的动画。
 * Animation to play when reward involves misc effects.
 * @default 97
 *
 */
//=============================================================================

Yanfly.PluginRequirements = function() {
  return Imported.YEP_BattleEngineCore &&
         Imported.YEP_SkillCore;
};

if (Yanfly.PluginRequirements()) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_Z_SkillRewards');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.LunSkRewEffect = JSON.parse(Yanfly.Parameters['Effect Code']);
Yanfly.Param.LunSkRewWeakness = Number(Yanfly.Parameters['Weakness Rate']);
Yanfly.Param.LunSkRewResisted = Number(Yanfly.Parameters['Resisted Rate']);

Yanfly.Param.LunSkRewAniHp = 
  Number(Yanfly.Parameters['HP Animation']);
Yanfly.Param.LunSkRewAniMp = 
  Number(Yanfly.Parameters['MP Animation']);
Yanfly.Param.LunSkRewAniTp = 
  Number(Yanfly.Parameters['TP Animation']);
Yanfly.Param.LunSkRewAniItem = 
  Number(Yanfly.Parameters['Item Animation']);
Yanfly.Param.LunSkRewAniBuff = 
  Number(Yanfly.Parameters['Buff Animation']);
Yanfly.Param.LunSkRewAniDebuff = 
  Number(Yanfly.Parameters['Debuff Animation']);
Yanfly.Param.LunSkRewAniAddState = 
  Number(Yanfly.Parameters['Add State Animation']);
Yanfly.Param.LunSkRewAniRemoveState = 
  Number(Yanfly.Parameters['Remove State Animation']);
Yanfly.Param.LunSkRewAniMisc = 
  Number(Yanfly.Parameters['Misc Animation']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.LunSkRew.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.LunSkRew.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_Z_SkillRewards) {
    this.processLunSkRewNotetags1($dataSkills);
    this.processLunSkRewNotetags1($dataItems);
    Yanfly._loaded_YEP_Z_SkillRewards = true;
  }
  
  return true;
};

DataManager.processLunSkRewNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.rewardAnimation = 0;
    obj.criticalRewards = [];
    obj.noncriticalRewards = [];
    obj.defeatRewards = [];
    obj.hitRewards = [];
    obj.missedRewards = [];
    obj.weaknessRewards = [];
    obj.resistRewards = [];
    obj.nulledRewards = [];
    obj.absorbRewards = [];

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<REWARD[ ](?:ANI|ANIMATION):[ ](\d+)>/i)) {
        obj.rewardAnimation = parseInt(RegExp.$1);
      } else if (line.match(/<(.*)[ ](?:REWARD|REWARDS):[ ](.*)>/i)) {
        var condition = String(RegExp.$1);
        var data = String(RegExp.$2);
        if (condition.match(/DEFEAT/i)) {
          obj.defeatRewards.push(data);
        } else if (condition.match(/NONCRITICAL/i)) {
          obj.noncriticalRewards.push(data);
        } else if (condition.match(/CRITICAL/i)) {
          obj.criticalRewards.push(data);
        } else if (condition.match(/HIT/i)) {
          obj.hitRewards.push(data);
        } else if (condition.match(/(?:MISSED|EVADE)/i)) {
          obj.missedRewards.push(data);
        } else if (condition.match(/WEAKNESS/i)) {
          obj.weaknessRewards.push(data);
        } else if (condition.match(/RESIST/i)) {
          obj.resistRewards.push(data);
        } else if (condition.match(/NULLED/i)) {
          obj.nulledRewards.push(data);
        } else if (condition.match(/ABSORB/i)) {
          obj.absorbRewards.push(data);
        }
      }
    }
  }
};

DataManager.getParamId = function(str) {
  switch (str.toUpperCase()) {
  case 'HP':
  case 'MAXHP':
  case 'MAX HP':
    return 0;
    break;
  case 'MP':
  case 'MAXMP':
  case 'MAX MP':
  case 'SP':
  case 'MAXSP':
  case 'MAX SP':
    return 1;
    break;
  case 'ATK':
  case 'STR':
    return 2;
    break;
  case 'DEF':
    return 3;
    break;
  case 'MAT':
  case 'INT':
  case 'SPI':
    return 4;
    break;
  case 'MDF':
  case 'RES':
    return 5;
    break;
  case 'AGI':
  case 'SPD':
    return 6;
    break;
  case 'LUK':
    return 7;
    break;
  default:
    return -1;
    break;
  }
};

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.LunSkRew.Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
  var alive = target.hp > 0;
  Yanfly.LunSkRew.Game_Action_apply.call(this, target);
  var result = target.result();
  if (alive) {
    if (target.hp <= 0 || target.isDead()) {
      this.processLunaticSkillReward(target, 'defeat');
    }
  }
  if (result.isHit()) {
    this.processLunaticSkillReward(target, 'hit');
    if (result.critical) {
      this.processLunaticSkillReward(target, 'critical');
    } else {
      this.processLunaticSkillReward(target, 'noncritical');
    }
    var rate = this.calcElementRate(target);
    if (rate >= Yanfly.Param.LunSkRewWeakness) {
      this.processLunaticSkillReward(target, 'weakness');
    } else if (rate < 0) {
      this.processLunaticSkillReward(target, 'absorb');
    } else if (rate === 0) {
      this.processLunaticSkillReward(target, 'nulled');
    } else if (rate <= Yanfly.Param.LunSkRewResisted) {
      this.processLunaticSkillReward(target, 'resist');
    }
  } else {
    this.processLunaticSkillReward(target, 'missed');
  }
};

Yanfly.LunSkRew.Game_Action_itemCri = Game_Action.prototype.itemCri;
Game_Action.prototype.itemCri = function(target) {
  var cri = Yanfly.LunSkRew.Game_Action_itemCri.call(this, target);
  var user = this.subject();
  if (this.isSkill() && user && user._rollingCritical) {
    user._rollingCritical[skill.id] = user._rollingCritical[skill.id] || 0;
    cri += user._rollingCritical[skill.id];
  }
  return cri;
};

Game_Action.prototype.processLunaticSkillReward = function(target, type) {
  switch (type) {
  case 'defeat':
    var dataInfo = this.item().defeatRewards;
    break;
  case 'noncritical':
    var dataInfo = this.item().noncriticalRewards;
    break;
  case 'critical':
    var dataInfo = this.item().criticalRewards;
    break;
  case 'hit':
    var dataInfo = this.item().hitRewards;
    break;
  case 'missed':
    var dataInfo = this.item().missedRewards;
    break;
  case 'weakness':
    var dataInfo = this.item().weaknessRewards;
    break;
  case 'resist':
    var dataInfo = this.item().resistRewards;
    break;
  case 'nulled':
    var dataInfo = this.item().nulledRewards;
    break;
  case 'absorb':
    var dataInfo = this.item().absorbRewards;
    break;
  default:
    return;
  }
  var length = dataInfo.length;
  for (var i = 0; i < length; ++i) {
    var data = dataInfo[i];
    this.lunaticSkillRewardEval(target, type, data);
  }
};

Game_Action.prototype.lunaticSkillRewardEval = function(target, type, data) {
  var item = this.item();
  var skill = this.item();
  var isSkill = DataManager.isSkill(skill);
  var isItem = DataManager.isSkill(item);
  var user = this.subject();
  var a = user;
  var subject = user;
  var b = target;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var userPreviousResult = JsonEx.makeDeepCopy(user._result);
  var targetPreviousResult = JsonEx.makeDeepCopy(target._result);
  var skip = false;
  var value = 0;
  var rate = 1;

  var hpAnimation = Yanfly.Param.LunSkRewAniHp;
  var mpAnimation = Yanfly.Param.LunSkRewAniMp;
  var tpAnimation = Yanfly.Param.LunSkRewAniTp;
  var itemAnimation = Yanfly.Param.LunSkRewAniItem;
  var buffAnimation = Yanfly.Param.LunSkRewAniBuff;
  var debuffAnimation = Yanfly.Param.LunSkRewAniDebuff;
  var addStateAnimation = Yanfly.Param.LunSkRewAniAddState;
  var removeStateAnimation = Yanfly.Param.LunSkRewAniRemoveState;
  var miscAnimation = Yanfly.Param.LunSkRewAniMisc;

  var animation = this.item().rewardAnimation || 0;

  var code = Yanfly.Param.LunSkRewEffect;
  try {
    eval(code)
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'LUNATIC SKILL REWARDS ERROR');
  }

  if (!skip) {
    user.startDamagePopup();
    if (animation > 0) {
      user.startAnimation(animation);
    }
  }
  
  if (user.isDead()) user.performCollapse();
  if (target.isDead()) target.performCollapse();
  user._result = userPreviousResult;
  target._result = targetPreviousResult;
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.displayError = function(e, code, message) {
  console.log(message);
  console.log(code || 'NON-EXISTENT');
  console.error(e);
  if (Utils.isNwjs() && Utils.isOptionValid('test')) {
    if (!require('nw.gui').Window.get().isDevToolsOpen()) {
      require('nw.gui').Window.get().showDevTools();
    }
  }
};

//=============================================================================
// Default Effect Code
//=============================================================================

if (false) {

// ----------
// Flat Gains
// ----------
if (data.match(/([\+\-]\d+)[ ]HP/i)) {
  value = parseInt(RegExp.$1);
  user.gainHp(value);
  animation = animation || hpAnimation;

} else if (data.match(/([\+\-]\d+)[ ]MP/i)) {
  value = parseInt(RegExp.$1);
  user.gainMp(value);
  animation = animation || mpAnimation;

} else if (data.match(/([\+\-]\d+)[ ]TP/i)) {
  value = parseInt(RegExp.$1);
  user.gainTp(value);
  animation = animation || tpAnimation;

// ----------------
// Percentile Gains
// ----------------
} else if (data.match(/([\+\-]\d+)([%％])[ ]HP/i)) {
  rate = parseFloat(RegExp.$1) * 0.01;
  value = Math.round(user.mhp * rate);
  user.gainHp(value);
  animation = animation || hpAnimation;

} else if (data.match(/([\+\-]\d+)([%％])[ ]MP/i)) {
  rate = parseFloat(RegExp.$1) * 0.01;
  value = Math.round(user.mmp * rate);
  user.gainMp(value);
  animation = animation || mpAnimation;

} else if (data.match(/([\+\-]\d+)([%％])[ ]TP/i)) {
  rate = parseFloat(RegExp.$1) * 0.01;
  value = Math.round(user.maxTp() * rate);
  user.gainTp(value);
  animation = animation || tpAnimation;

// ------------------
// Refund Skill Costs
// ------------------
} else if (data.match(/([\+\-]\d+)([%％])[ ]REFUND HP COST/i)) {
  if (isSkill) {
    rate = parseFloat(RegExp.$1) * 0.01;
    value = Math.round(user.skillHpCost(skill) * rate);
    user.gainHp(value);
    animation = animation || hpAnimation;
  } else {
    skip = true;
  }

} else if (data.match(/([\+\-]\d+)([%％])[ ]REFUND MP COST/i)) {
  if (isSkill) {
    rate = parseFloat(RegExp.$1) * 0.01;
    value = Math.round(user.skillMpCost(skill) * rate);
    user.gainMp(value);
    animation = animation || mpAnimation;
  } else {
    skip = true;
  }

} else if (data.match(/([\+\-]\d+)([%％])[ ]REFUND TP COST/i)) {
  if (isSkill) {
    rate = parseFloat(RegExp.$1) * 0.01;
    value = Math.round(user.skillTpCost(skill) * rate);
    user.gainTp(value);
    animation = animation || tpAnimation;
  } else {
    skip = true;
  }

// -----------
// Refund Item
// -----------
} else if (data.match(/(\d+)([%％])[ ]REFUND ITEM/i)) {
  rate = parseFloat(RegExp.$1) * 0.01;
  if (isItem && Math.random() < chance) {
    $gameParty.gainItem(item, 1);
    SoundManager.playUseItem();
    animation = animation || itemAnimation;
  } else {
    skip = true;
  }

// ------------------------
// Add/Remove Buffs/Debuffs
// ------------------------
} else if (data.match(/ADD[ ](.*)[ ]BUFF,[ ](\d+)[ ]TURN/i)) {
  var str = String(RegExp.$1).toUpperCase();
  var turns = parseInt(RegExp.$2);
  var paramId = DataManager.getParamId(str);
  if (paramId >= 0) {
    user.addBuff(paramId, turns);
  } else {
    skip = true;
  }
  animation = animation || buffAnimation;

} else if (data.match(/ADD[ ](.*)[ ]BUFF/i)) {
  var str = String(RegExp.$1).toUpperCase();
  var turns = 5;
  var paramId = DataManager.getParamId(str);
  if (paramId >= 0) {
    user.addBuff(paramId, turns);
  } else {
    skip = true;
  }
  animation = animation || buffAnimation;

} else if (data.match(/ADD[ ](.*)[ ]DEBUFF,[ ](\d+)[ ]TURN/i)) {
  var str = String(RegExp.$1).toUpperCase();
  var turns = parseInt(RegExp.$2);
  var paramId = DataManager.getParamId(str);
  if (paramId >= 0) {
    user.addDebuff(paramId, turns);
  } else {
    skip = true;
  }
  animation = animation || debuffAnimation;

} else if (data.match(/ADD[ ](.*)[ ]DEBUFF/i)) {
  var str = String(RegExp.$1).toUpperCase();
  var turns = 5;
  var paramId = DataManager.getParamId(str);
  if (paramId >= 0) {
    user.addDebuff(paramId, turns);
  } else {
    skip = true;
  }
  animation = animation || debuffAnimation;

} else if (data.match(/REMOVE[ ](.*)[ ](?:BUFF|DEBUFF)/i)) {
  var str = String(RegExp.$1).toUpperCase();
  var paramId = DataManager.getParamId(str);
  if (paramId >= 0) {
    user.removeBuff(paramId);
  } else {
    skip = true;
  }
  animation = animation || miscAnimation;

// -----------------
// Add/Remove States
// -----------------
} else if (data.match(/ADD STATE[ ](\d+)/i)) {
  var stateId = parseInt(RegExp.$1);
  user.addState(stateId);
  animation = animation || addStateAnimation;

} else if (data.match(/REMOVE STATE[ ](\d+)/i)) {
  var stateId = parseInt(RegExp.$1);
  if (user.isStateAffected(stateId)) {
    user.removeState(stateId);
    animation = animation || removeStateAnimation;
  } else {
    skip = true;
  }

// ----------------
// Rolling Critical
// ----------------
} else if (data.match(/ROLLING CRITICAL[ ]([\+\-]\d+)([%％])/i)) {
  if (isSkill) {
    rate = parseFloat(RegExp.$1) * 0.01;
    user._rollingCritical = user._rollingCritical || {};
    user._rollingCritical[skill.id] = user._rollingCritical[skill.id] || 0;
    user._rollingCritical[skill.id] += rate;
  } else {
    skip = true;
  }

} else if (data.match(/ROLLING CRITICAL[ ](\d+)([%％])/i)) {
  if (isSkill) {
    rate = parseFloat(RegExp.$1) * 0.01;
    user._rollingCritical = user._rollingCritical || {};
    user._rollingCritical[skill.id] = user._rollingCritical[skill.id] || 0;
    user._rollingCritical[skill.id] = rate;
  } else {
    skip = true;
  }

// -------------------------------
// Add new effects above this line
// -------------------------------
} else {
  skip = true;
}

}; // Default Effect Code

//=============================================================================
// End of File
//=============================================================================
} else {

var text = '';
text += 'You are getting this error because you are trying to run ';
text += 'YEP_Z_SkillRewards without the required plugins. Please visit ';
text += 'Yanfly.moe and install the required plugins neede for this plugin ';
text += 'found in this plugin\'s help file before you can use it.';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // Yanfly.PluginRequirements