﻿//=============================================================================
// Yanfly Engine Plugins - Buffs & States Core
// YEP_BuffsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_BuffsStatesCore = true;

var Yanfly = Yanfly || {};
Yanfly.BSC = Yanfly.BSC || {};
Yanfly.BSC.version = 1.12;

//=============================================================================
/*:
 * @plugindesc v1.12a 效果状态核心☁️
 * @author Yanfly Engine Plugins
 *
 * @param ---Turn指示器---
 * @default
 *
 * @param Show Turns
 * @text 显示回合数
 * @desc 显示buff和states的剩余回合数？
 * NO - false     YES - true
 * @default true
 *
 * @param Font Size
 * @text 字体大小
 * @desc The default font size used for turn count.
 * Default: 28
 * @default 16
 *
 * @param Turn Alignment
 * @text 回合对准
 * @desc How do you want to align the turns?
 * left     center     right
 * @default right
 *
 * @param Turn Buffer X
 * @text 回合缓冲器X
 * @desc Buffer the x position of the turn by this much.
 * @default -3
 *
 * @param Turn Buffer Y
 * @text 回合缓冲器Y
 * @desc Buffer the y position of the turn by this much.
 * @default -6
 *
 * @param State Color
 * @desc The default text color used for state turns.
 * @default 0
 *
 * @param Buff Color
 * @desc The default text color used for buffs.
 * @default 24
 *
 * @param Debuff Color
 * @desc The default text color used for debuffs.
 * @default 2
 *
 * @param ---敌人图标---
 * @default
 *
 * @param Show Enemy Icons
 * @text 显示敌人图标
 * @desc Do you wish to show enemy state icons?
 * NO - false     YES - true
 * @default true
 *
 * @param Enemy Buff Turn
 * @desc Do you wish to show enemy buff turns remaining?
 * NO - false     YES - true
 * @default true
 *
 * @param Enemy State Turn
 * @desc Do you wish to show enemy state turns remaining?
 * NO - false     YES - true
 * @default true
 *
 * @param Enemy State Counter
 * @text 显示敌人状态计数器
 * @desc Do you wish to show enemy state counters?
 * NO - false     YES - true
 * @default true
 *
 * @param ---Buff设置---
 * @default
 *
 * @param Default Limit
 * @text 默认限制
 * @desc The default number of times you can stack buff/debuff.
 * Default: 2
 * @default 4
 *
 * @param Maximum Limit
 * @text 最大限度
 * @desc The maximum number of times you can stack buff/debuff.
 * @default 8
 *
 * @param Buff Formula
 * @text Buff公式
 * @desc The formula used for buff rate calculation.
 * Default: this._buffs[paramId] * 0.25 + 1.0
 * @default this._buffs[paramId] * 0.25 + 1.0
 *
 * @param Show Buff Rate
 * @text 显示Buff增/减益
 * @desc Shows the buff/debuff rate for buffs and debuffs.
 * YES - true     NO - false
 * @default false
 *
 * @param ---状态设置---
 * @default
 *
 * @param Reapply Rules
 * @text 重新应用规则
 * @desc 重新应用已存在状态时的规则：
 * 0 - Ignore     1 - Reset     2 - Add
 * @default 1
 *
 * @param Show Enemy Turns
 * @text 显示敌人回合
 * @desc If using Battle Engine Core, show turns in help window?
 * NO - false     YES - true
 * @default true
 *
 * @param ---计数器设置---
 * @default
 *
 * @param Counter Font Size
 * @text 计数器字体大小
 * @desc The default font size used for state counters.
 * Default: 28
 * @default 16
 *
 * @param Counter Alignment
 * @text 计数器对齐
 * @desc How do you want to align the counter?
 * left     center     right
 * @default center
 *
 * @param Counter Buffer X
 * @text 计数器缓冲区X
 * @desc Buffer the x position of the counter by this much.
 * @default 0
 *
 * @param Counter Buffer Y
 * @text 计数器缓冲区Y
 * @desc Buffer the y position of the counter by this much.
 * @default 8
 *
 * @param Counter Color
 * @text 计数器颜色
 * @desc The default text color used for state counters.
 * @default 0
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * 如果你在使用YEP_BattleEngineCore.js，请放在YEP_BattleEngineCore.js下面
 *
 * Alter the basic mechanics behind buffs and states that aren't adjustable
 * within the RPG Maker editor. Such mechanics include altering the maximum
 * number of times buffs can stack, changing the turns remaining on buffs and
 * 这可以改变增益效果和状态。这些包括增益效果持续时间，回合等等
 *
 * 我们为增益效果、减益效果、状态等添加了一个回合指示器。你可以通过插件参
 * 数来设置增益和减益效果，或者也可以用单独的设置来改变状态
 *
 * 并且，有很多自定义模式可以来设置，你可以用JS语言来更好的设置状态或者其
 * 他特殊影响
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * 下面这个标签你可以用来调整状态和效果
 *
 * --- Buff Related ---
 *
 * Actor, Class, Enemy, Weapon, Armor, and State notetags:
 *   <Max stat Buff: +x>
 *   <Max stat Buff: -x>
 *   <Max stat Debuff: +x>
 *   <Max stat Debuff: -x>
 *   Replace 'stat' with 'maxhp', 'maxmp', 'atk', 'def', 'mat', 'mdf', 'agi',
 *   or 'luk' without the quotes. This notetag adjusts the maximum number of
 *   times the stat can be buffed or debuffed to the Maximum Limit cap in the
 *   plugin parameters.设置状态调整数值
 *
 * Skill and Item Notetags:
 *   <stat Buff Turns: +x>
 *   <stat Buff Turns: -x>
 *   <stat Debuff Turns: +x>
 *   <stat Debuff Turns: -x>    设置持续回合
 *   Modifies already applied buff/debuff turns on target by x value. If this
 *   brings a buff/debuff to 0 or below, the buff/debuff is removed.
 *
 * --- State Related ---
 *
 * State Notetags:
 *   <Show Turns>
 *   <Hide Turns>
 *   Show/hide the turn count remaining for the state. This will override the
 *   default setting.显示回合数
 *
 *   <Turn Font Size: x>
 *   Sets the font size used for this specific state to be x. This will
 *   override the default setting.显示回合数文本大小
 *
 *   <Turn Alignment: Left>
 *   <Turn Alignment: Center>
 *   <Turn Alignment: Right>
 *   This sets the text alignment for the turn count indicator. This will
 *   override the default setting.显示回合数的位置
 *
 *   <Turn Buffer X: +x>
 *   <Turn Buffer X: -x>
 *   <Turn Buffer Y: +x>
 *   <Turn Buffer Y: -x>
 *   Allows you to adjust the x/y position manually for the turn count for this
 *   particular state. This will override the settings.调整显示回合数的位置
 *
 *   <Turn Color: x>
 *   This will set the turn count display color to text color x. This will
 *   override the default setting.显示回合数的文本颜色
 *
 *   <Reapply Ignore Turns>
 *   <Reapply Reset Turns>
 *   <Reapply Add Turns>
 *   当状态再次应用时的规则。如果是忽略，则继续计回合数，如果重置，则回合数
 *   为默认值，如果叠加，则加到原有回合数上
 *
 * Skill and Item Notetags:
 *   <State x Turns: +y>
 *   <State x Turns: -y>
 *   <State named Turns: +y>
 *   <State named Turns: -y>
 *   Modifies already applied state x turns on target by y value. If this
 *   brings the state to 0 or below turns, the state is removed. If you are
 *   using named states and have multiple states with the same name, priority
 *   改变已附加的状态持续回合数，结算回合数小于零时移除状态。如果你使用名字来设置，
 *   当重名时，优先考虑ID最高的。
 *
 * Enemy Notetags:
 *   <Show State Turns>
 *   <Hide State Turns>
 *   Affected by the Battle Engine Core. When selecting enemies, the state
 *   turns will show up in the help window. You can use this to have certain
 *   enemies show the state turns or hide them.显示状态持续回合
 *
 * ============================================================================
 * Lunatic Mode - Custom Turn Modifiers
 * ============================================================================
 *
 * For those with an understanding of JavaScript, you can use these notetags to
 * give conditional turn modifiers when altering a target's buff/state turn
 * count. Follow the instructions below:
 *
 * Skill and Item Notetags:
 *
 *   <Custom stat Buff Turn>
 *    turn = 10;
 *    turn += user.agi;
 *   </Custom stat Buff Turn>
 *   Replace 'stat' with 'maxhp', 'maxmp', 'atk', 'def', 'mat', 'mdf', 'agi',
 *   or 'luk' without the quotes. Whatever the 'turn' variable returns is what
 *   the turn count will be set to for the stat buff.
 *   将“stat”替换为“maxhp”、“maxmp”、“atk”、“def”、“mat”、“mdf”、“agi”、“luk”，
 *   不带引号。无论“turn”变量返回什么，都会为属性增益设置回合计数。
 *
 *   <Custom stat Debuff Turn>
 *    turn = 10;
 *    turn += user.agi;
 *   </Custom stat Debuff Turn>
 *   Replace 'stat' with 'maxhp', 'maxmp', 'atk', 'def', 'mat', 'mdf', 'agi',
 *   or 'luk' without the quotes. Whatever the 'turn' variable returns is what
 *   the turn count will be set to for the stat debuff.
 *   将“stat”替换为“maxhp”、“maxmp”、“atk”、“def”、“mat”、“mdf”、“agi”或“luk”，
 *   不带引号。无论“turn”变量返回什么，都会为属性减益设置回合计数。
 *
 *   <Custom State X Turn>
 *    turn = 10;
 *    turn += user.agi;
 *   </Custom State X Turn>
 *   This alters the turn count for state x. Whatever the 'turn' variable
 *   returns is what the turn count will be set for state x.
 *   这将更改状态 x 的回合计数。无论“turn”变量返回什么，都将为状态 x 设置回合计数。
 *
 *   <Custom State name Turn>
 *    turn = 10;
 *    turn += user.agi;
 *   </Custom State name Turn>
 *   This alters the turn count for state 'name'. Whatever the 'turn' variable
 *   returns is what the turn count will be set for state 'name'. If you have
 *   multiple states in your database with the same name, priority will be
 *   given to the state with the highest ID.
 *   这会更改状态“name”的回合计数。无论“turn”变量返回什么，都将为状态“name”
 *   设置的回合计数。如果数据库中有多个同名状态，则将优先考虑具有最高 ID 的状态。
 *
 * ============================================================================
 * Lunatic Mode - Custom Timing Effects
 * ============================================================================
 *
 * For those with an understanding of JavaScript, you can use these notetags to
 * cause code to run at certain times.
 *
 * Quick Reference:
 *   - Apply:        When a state is added.
 *   - Remove:       When a state is removed.
 *   - Leave:        When a state expires by reaching 0 turns.
 *   - Turn Start:   Whenever the battler's turn starts.
 *   - Action Start: Whenever the battler performs a new action.
 *   - Action End:   Whenever the battler finishes an action.
 *   - Regenerate:   Whenever the battler would regenerate HP/MP/TP.
 *   - Turn End:     Whenever the battler's turn ends.
 *   - Battle:       Whenever a battle is started.
 *   - Victory:      Whenever a battle is won. *Note1
 *   - Escape:       Whenever a battle is escaped. *Note1
 *   - Defeat:       Whenever a battle is lost. *Note1
 *
 * *Note1: If the state is set to expire on battle end, the expiration will
 * occur before the custom effects would take place, meaning the effects will
 * not occur at all unless the expiration is set to off.
 * 如果状态设置为在战斗结束时过期，则过期将在自定义效果发生之前发生，
 * 这意味着除非过期设置为关闭，否则效果根本不会发生。
 *
 * State Notetags:
 *
 * --- Timing Effects ---
 *
 * These effects specifically occur at certain intervals or timings.
 *
 *   <Custom Apply Effect>
 *    code
 *    code
 *   </Custom Apply Effect>
 *   The code in between these notetags will run when the state is added onto
 *   a battler. The code will process after the state is actually applied.
 *   这些注释标签之间的代码将在状态添加到战斗者时运行。代码将在实际应用状态后执行。
 *
 *   <Custom Remove Effect>
 *    code
 *    code
 *   </Custom Remove Effect>
 *   The code in between these notetags will run when the state is removed from
 *   a battler either manually or due to turn decay. The code will process
 *   after the state is actually removed but before <Custom Leave Effect>.
 *   这些注释标签之间的代码将在手动或由于回合衰减而从战斗器中删除状态时运行。
 *   代码将在状态实际删除后但在<Custom Leave Effect>之前进行处理。
 *
 *   <Custom Leave Effect>
 *    code
 *    code
 *   </Custom Leave Effect>
 *   The code in between these notetags will run when the state is removed from
 *   a battler due to turn decay. The code will process after the state is
 *   actually removed and after <Custom Remove Effect>.
 *   这些注释标签之间的代码将在由于回合衰减而从战斗者中删除状态时运行。
 *   代码将在状态实际删除后和<Custom Remove Effect>之后进行处理。
 *
 *   <Custom Turn Start Effect>
 *    code
 *    code
 *   </Custom Turn Start Effect>
 *   This requires YEP_BattleEngineCore. This effect will run at the start of
 *   each of the battler's turns. The code will process after all the other
 *   turn start effects have taken course.
 *   这需要YEP_BattleEngineCore。此效果将在战斗者每个回合开始时运行。
 *   代码将在所有其他回合开始效果发生后进行处理。
 *
 *   <Custom Action Start Effect>
 *    code
 *    code
 *   </Custom Action Start Effect>
 *   This effect will run at the start of each of the battler's actions. The
 *   code will process before the skill/item cost takes place.
 *   此效果将在战斗者的每个行动开始时运行。代码将在技能/项物品消耗发生之前进行处理。
 *
 *   <Custom Action End Effect>
 *    code
 *    code
 *   </Custom Action End Effect>
 *   This effect will run at the end of each of the battler's actions. The
 *   code will process before the action end steps takes place.
 *   此效果将在战斗者的每个动作结束时运行。代码将在执行操作结束步骤之前进行处理。
 *
 *   <Custom Regenerate Effect>
 *    code
 *    code
 *   </Custom Regenerate Effect>
 *   This effect will run whenever the battler would regenerate HP, MP, or TP.
 *   The code will process after all the other regenerate effects have ran.
 *   只要战斗者再生HP、MP或TP，这个效果就会运行。代码将在所有其他再生效果运行后
 *   进行处理。
 *
 *   <Custom Turn End Effect>
 *    code
 *    code
 *   </Custom Turn End Effect>
 *   This effect will run at the end of each of the battler's turns. The code
 *   will process after all the other turn end effects have taken course.
 *   此效果将在战斗者的每个回合结束时运行。代码将在所有其他回合结束效果发生后
 *   进行处理。
 *
 *   <Custom Battle Effect>
 *    code
 *    code
 *   </Custom Battle Effect>
 *   This effect will occur at the start of battle if the battler has the state
 *   already applied (usually through a passive state).
 *   如果战斗者已经应用了状态（通常通过被动状态），则此效果将在战斗开始时发生。
 *
 *   <Custom Victory Effect>
 *    code
 *    code
 *   </Custom Victory Effect>
 *   This effect will occur at the end of battle if the party is victorious.
 *   This will only apply to the player's party. If this state can expire at
 *   the end of battle, this effect will not occur as state expiration will
 *   occur before this effect will happen.
 *   如果一方获胜，这种效果将在战斗结束时发生。这仅适用于玩家的队伍。
 *   如果此状态可以在战斗结束时过期，则不会发生此效果，因为状态过期将在此效果发生
 *   之前发生。
 *
 *   <Custom Escape Effect>
 *    code
 *    code
 *   </Custom Escape Effect>
 *   This effect will occur at the end of battle if the party has escaped.
 *   This will only apply to the player's party. If this state can expire at
 *   the end of battle, this effect will not occur as state expiration will
 *   occur before this effect will happen.
 *   如果队伍逃脱，这种效果将在战斗结束时发生。这仅适用于玩家的队伍。
 *   如果此状态可以在战斗结束时过期，则不会发生此效果，因为状态过期将在此效果发生
 *   之前发生。
 *
 *   <Custom Defeat Effect>
 *    code
 *    code
 *   </Custom Defeat Effect>
 *   This effect will occur at the end of battle if the party is defeated.
 *   This will only apply to the player's party. If this state can expire at
 *   the end of battle, this effect will not occur as state expiration will
 *   occur before this effect will happen.
 *   如果一方被击败，这种效果将在战斗结束时发生。这仅适用于玩家的队伍。
 *   如果此状态可以在战斗结束时过期，则不会发生此效果，因为状态过期将在此效果发生之前发生。
 *
 * ============================================================================
 * Lunatic Mode - Custom Action Effects
 * ============================================================================
 *
 * For those with an understanding of JavaScript, you can use these notetags to
 * cause code to run during actions.
 *
 * Quick Reference:
 *   Action Starts
 *   - Attacker: Initiate
 *   - Defender: Select
 *   Action Connects as a Success Hit, skip if Missed or Evaded
 *   - Attacker: Confirm
 *   - Defender: React
 *   Damage is Applied to the Defender
 *   - Defender: Respond
 *   - Attacker: Establish
 *   These occur regardless if the action is successfully hit.
 *   - Defender: Deselect
 *   - Attacker: Conclude
 *   操作开始时触发的效果
 *   - 攻击方：发起 Initiate
 *   - 被攻击方：选择 Select
 *   动作连接为成功命中，如果错过或躲避，则跳过，成功命中时触发以下效果
 *   - 攻击方：确认 Confirm
 *   - 被攻击方：反应 React
 *   伤害施加到防御者身上时触发以下效果
 *   - 被攻击方：回应 Respond
 *   - 攻击方：建立 Establish
 *   无论操作是否成功命中，都会触发以下效果
 *   - 被攻击方：取消选择 Deselect
 *   - 攻击方：结束 Conclude
 *
 * State Notetags:
 *
 * --- On Action Effects ---
 *
 * These effects specifically occur when the battler is a target of an action.
 *
 *   <Custom Initiate Effect>
 *    code
 *    code
 *   </Custom Initiate Effect>
 *   This effect will run when the battler selects a target. This will occur
 *   before hit/miss/evade confirmation and damage execution. This effect will
 *   run before everything else has taken course.
 *   此效果将在战斗者选择目标时运行。这将在命中/未命中/躲避确认和损坏执行之前发生。
 *   这种效果将在其他一切发生之前运行。
 *
 *   <Custom Select Effect>
 *    code
 *    code
 *   </Custom Select Effect>
 *   This effect will run when the battler is selected as a target. This will
 *   occur before hit/miss/evade confirmation and damage execution. This effect
 *   will run after <Custom Initiate Effect> before everything else has ran.
 *   当战斗者被选为目标时，此效果将运行。这将在命中/未命中/躲避确认和损坏执行之前发生。
 *   此效果将在<Custom Initiate Effect>之后运行，然后其他所有内容都运行。
 *
 *   <Custom Confirm Effect>
 *    code
 *    code
 *   </Custom Confirm Effect>
 *   This effect will run when the battler connects a hit and before damage
 *   execution occurs. This effect will run after <Custom Initiate Effect> and
 *   <Custom Select Effect> and before everything else.
 *   此效果将在战斗者连接命中时和伤害执行发生之前运行。
 *   此效果将在<Custom Initiate Effect>和<Custom Select Effect>之后运行，
 *   并在其他所有内容之前运行。
 *   此时value变量为伤害数值。
 *
 *   <Custom React Effect>
 *    value -= 100;
 *    value -= user.def;
 *   </Custom React Effect>
 *   This effect will run when the battler is selected as a target. This will
 *   occur only if the action connects and will occur before damage execution.
 *   This effect will run before damage calculation occurs and will return the
 *   'value' variable as a damage modifier. After <Custom Confirm Effect>, this
 *   effect will run.
 *   当战斗者被选为目标时，此效果将运行。仅当操作连接时，才会发生这种情况，
 *   并且将在损害执行之前发生。此效果将在伤害计算发生之前运行，
 *   并将返回“value”变量作为伤害修饰符。<自定义确认效果>后，将运行此效果。
 *
 *   <Custom Respond Effect>
 *    code
 *    code
 *   </Custom Respond Effect>
 *   This effect will run when the battler is selected as a target. This will
 *   occur only if the action connects and will occur after damage execution.
 *   This effect will run after damage calculation occurs. The 'value' variable
 *   is equal to the damage dealt to the battler. This is the first effect to
 *   run after damage execution has taken place.
 *   当战斗者被选为目标时，此效果将运行。仅当操作连接时才会发生这种情况，
 *   并且将在损害执行后发生。此效果将在损失计算发生后运行。此时
 *   “value”变量等于对战斗者造成的伤害。这是在执行损害后运行的第一个效果。
 *
 *   <Custom Establish Effect>
 *    code
 *    code
 *   </Custom Establish Effect>
 *   This effect will run when the battler connects a hit and after damage
 *   execution occurs. This effect will run after <Custom Respond Effect> has
 *   occurred and before everything else.
 *   此效果将在战斗者连接命中和伤害执行后运行。
 *   此效果将在<Custom Respond Effect>发生后和其他所有内容之前运行。
 *   此时value变量的值为伤害数值；
 *
 *   <Custom Deselect Effect>
 *    code
 *    code
 *   </Custom Deselect Effect>
 *   This effect will run when the battler is selected as a target. This will
 *   occur after hit/miss/evade confirmation and damage execution. This effect
 *   will run after everything else has taken course.
 *   当战斗者被选为目标时，此效果将运行。这将在命中/未命中/躲避确认和损坏执行后直接发生。
 *   这种效果将在其他一切都顺其自然之后运行。
 *
 *   <Custom Conclude Effect>
 *    code
 *    code
 *   </Custom Conclude Effect>
 *   This is the final effect to be run after the battler selects a target and
 *   will occur after hit/miss/evade confirmation and damage execution.
 *   这是战斗人员选择目标后运行的最终效果，将在命中/未命中/躲避确认和伤害执行后发生。
 *
 * ============================================================================
 * Lunatic Mode - State Counters
 * ============================================================================
 *
 *  State Counters are newly added features to suplement states. They are used
 *  purely in custom manners, which means they do not serve any function by
 *  themselves. State Counters can be used to note a number of stacks, a stored
 *  percentage, display a message, etc. All of it is purely updated based on
 *  JavaScript functions.
 *  状态计数器是新增到补充状态的功能。它们纯粹以自定义方式使用，这意味着
 *  它们本身没有任何功能。状态计数器可用于记录多个堆栈、
 *  存储的百分比、显示消息等。所有这些都纯粹是基于JavaScript函数更新的。
 *
 * ---
 *
 * There are a couple of notetags you can use for states:
 * 有几个注释标签可用于状态：
 *
 *   <Counter Font Size>
 *   This adjusts the font size of the counter.
 *   这将调整计数器的字体大小。
 *
 *   <Counter Alignment: left>
 *   <Counter Alignment: center>
 *   <Counter Alignment: right>
 *   This changes the alignment of the counter text.
 *   这将更改计数器文本的对齐方式。
 *
 *   <Counter Buffer X: +x>
 *   <Counter Buffer X: -x>
 *   This adjusts the X buffer range for the counter text.
 *   这将调整计数器文本的 X 缓冲区范围。
 *
 *   <Counter Buffer Y: +x>
 *   <Counter Buffer Y: -x>
 *   This adjusts the Y buffer range for the counter text.
 *   这将调整计数器文本的 Y 缓冲区范围。
 *
 *   <Counter Text Color: x>
 *   This changes the font color of the text to the text color x.
 *   这会将文本的字体颜色更改为文本颜色 x。
 *
 * ---
 *
 * The following are JavaScript functions you may use to adjust counters:
 *
 *   battler.clearStateCounters();
 *   - This will clear all the counter values for all states.
 *   - 这将清除所有状态的所有计数器值。
 *
 *   battler.setStateCounter(stateId, value);
 *   - This will set the counter value for the particular state to 'value'.
 *   - 这会将特定状态的计数器值设置为“value”。
 *
 *   battler.addStateCounter(stateId, value);
 *   - This will add to the counter value for the state. The counter must be
 *   a number in order for this to work.
 *   - 这将添加到状态的计数器值，必须是数字才能正常工作。
 *
 *   battler.clampStateCounter(stateId, min, max);
 *   - This will set a minimum and maximum value for the counter value of the
 *   particular state. The counter must be a number in order for this to work.
 *   - 这将为特定状态的计数器值设置最小值和最大值。必须是数字才能正常工作。
 *
 *   battler.removeStateCounter(stateId)
 *   - This will clear the counter value for the state.
 *   - 这将清除状态的计数器值。
 *
 *   battler.getStateCounter(stateId)
 *   - This will return the current state counter value.
 *   - 这将返回当前状态计数器值。
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.12a:
 * - Lunatic Mode fail safes added.
 * - Optimization update.
 *
 * Version 1.11:
 * - Fixed a bug involving Lunatic state effects not occuring in the right
 * order when a state is removed.
 *
 * Version 1.10b:
 * - Added new plugin parameter: Show Buff Rate. This will display the current
 * buff or debuff rate on the buff icon.
 * - Optimization Update.
 * - Documentation fix for battler.clampStateCounter(stateId, min, max).
 *
 * Version 1.09b:
 * - Added new plugin parameters: Show Enemy Icons, Enemy Buff Turn, Enemy
 * State Turn, and Enemy State Counter to optionally display the enemy state
 * icons, states, buffs, their turns, and their counters.
 * - Added 'Lunatic Mode - State Counters'. Read more on it in the help file!
 * - Added anti-crash method for newly added effect in case non-YEP plugins
 * have non-battlers attached to battler sprites.
 * - Fixed a bug that prevented screen flashes when walking around on the map
 * when an actor is poisoned.
 *
 * Version 1.08:
 * - Fixed an issue that caused adding states midway through Lunatic Mode to
 * shift the order of states around causing some effects to be skipped.
 *
 * Version 1.07:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.06:
 * - Added new notetags for <Custom Battle Effect>, <Custom Victory Effect>,
 * <Custom Escape Effect>, and <Custom Defeat Effect> for Lunatic Mode.
 *
 * Version 1.05a:
 * - Fixed a bug with the 'Show Turns' parameter not working properly.
 * - Fixed a bug with math issues for timed states.
 *
 * Version 1.04:
 * - Changed timing of when Add/Remove/Leave Lunatic Effects occur to add more
 * flexibility in custom effects.
 * - Added a fail safe for when there are no targets to modify.
 * - Fixed a bug with reapply ignore states.
 *
 * Version 1.03a:
 * - Fixed a bug that would cause NaN to show up in state turns.
 *
 * Version 1.02:
 * - Synched up <Custom Turn End Effect> with tick-based battle systems.
 *
 * Version 1.01:
 * - Fixed a bug that didn't reset the font settings with the battle status.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters("YEP_BuffsStatesCore");
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.BSCShowTurns = eval(String(Yanfly.Parameters["Show Turns"]));
Yanfly.Param.BSCFontSize = String(Yanfly.Parameters["Font Size"]);
Yanfly.Param.BSCTurnAlign = String(Yanfly.Parameters["Turn Alignment"]);
Yanfly.Param.BSCTurnBufferX = Number(Yanfly.Parameters["Turn Buffer X"]);
Yanfly.Param.BSCTurnBufferY = Number(Yanfly.Parameters["Turn Buffer Y"]);
Yanfly.Param.BSCTurnColor = Number(Yanfly.Parameters["State Color"]);
Yanfly.Param.BSCBuffColor = Number(Yanfly.Parameters["Buff Color"]);
Yanfly.Param.BSCDebuffColor = Number(Yanfly.Parameters["Debuff Color"]);

Yanfly.Param.BSCShowEnemyIcon = String(Yanfly.Parameters["Show Enemy Icons"]);
Yanfly.Param.BSCShowEnemyIcon = eval(Yanfly.Param.BSCShowEnemyIcon);
Yanfly.Param.BSCEnemyBTurn = String(Yanfly.Parameters["Enemy Buff Turn"]);
Yanfly.Param.BSCEnemyBTurn = eval(Yanfly.Param.BSCEnemyBTurn);
Yanfly.Param.BSCEnemyTurn = String(Yanfly.Parameters["Enemy State Turn"]);
Yanfly.Param.BSCEnemyTurn = eval(Yanfly.Param.BSCEnemyTurn);
Yanfly.Param.BSCEnemyCounter = String(Yanfly.Parameters["Enemy State Counter"]);
Yanfly.Param.BSCEnemyCounter = eval(Yanfly.Param.BSCEnemyCounter);

Yanfly.Param.BSCDefaultLimit = Number(Yanfly.Parameters["Default Limit"]);
Yanfly.Param.BSCMaximumLimit = Number(Yanfly.Parameters["Maximum Limit"]);
Yanfly.Param.BSCBuffFormula = String(Yanfly.Parameters["Buff Formula"]);
Yanfly.Param.BSCShowBuffRate = String(Yanfly.Parameters["Show Buff Rate"]);
Yanfly.Param.BSCShowBuffRate = eval(Yanfly.Param.BSCShowBuffRate);

Yanfly.Param.BSCReapplyRules = Number(Yanfly.Parameters["Reapply Rules"]);
Yanfly.Param.BSCShowEnemyTurns = String(Yanfly.Parameters["Show Enemy Turns"]);
Yanfly.Param.BSCShowEnemyTurns = eval(Yanfly.Param.BSCShowEnemyTurns);

Yanfly.Param.BSCCounterSize = Number(Yanfly.Parameters["Counter Font Size"]);
Yanfly.Param.BSCCounterAlign = String(Yanfly.Parameters["Counter Alignment"]);
Yanfly.Param.BSCCounterBufferX = Number(Yanfly.Parameters["Counter Buffer X"]);
Yanfly.Param.BSCCounterBufferY = Number(Yanfly.Parameters["Counter Buffer Y"]);
Yanfly.Param.BSCCounterColor = Number(Yanfly.Parameters["Counter Color"]);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.BSC.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function () {
    if (!Yanfly.BSC.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!Yanfly._loaded_YEP_BuffsStatesCore) {
        this.processBSCNotetagsT($dataStates);
        this.processBSCNotetags1($dataStates);
        this.processBSCNotetags2($dataActors);
        this.processBSCNotetags2($dataClasses);
        this.processBSCNotetags2($dataEnemies);
        this.processBSCNotetags2($dataWeapons);
        this.processBSCNotetags2($dataArmors);
        this.processBSCNotetags2($dataStates);
        this.processBSCNotetags3($dataSkills);
        this.processBSCNotetags3($dataItems);
        this.processBSCNotetags4($dataEnemies);
        Yanfly._loaded_YEP_BuffsStatesCore = true;
    }
    return true;
};

DataManager.processBSCNotetagsT = function (group) {
    if (Yanfly.StateIdRef) return;
    Yanfly.StateIdRef = {};
    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
        if (obj.name.length <= 0) continue;
        Yanfly.StateIdRef[obj.name.toUpperCase()] = n;
    }
};

DataManager.processBSCNotetags1 = function (group) {
    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
        var notedata = obj.note.split(/[\r\n]+/);

        obj.showTurns = Yanfly.Param.BSCShowTurns;
        obj.turnAlign = Yanfly.Param.BSCTurnAlign;
        obj.turnFontSize = Yanfly.Param.BSCFontSize;
        obj.turnBufferX = Yanfly.Param.BSCTurnBufferX;
        obj.turnBufferY = Yanfly.Param.BSCTurnBufferY;
        obj.turnColor = Yanfly.Param.BSCTurnColor;
        obj.reapplyRules = Yanfly.Param.BSCReapplyRules;
        this.initStateEval(obj);
        this.initStateCounter(obj);
        var evalMode = "none";
        var evalType = "none";

        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (line.match(/<(?:SHOW TURNS)>/i)) {
                obj.showTurns = true;
            } else if (line.match(/<(?:HIDE TURNS)>/i)) {
                obj.showTurns = false;
            } else if (line.match(/<(?:TURN ALIGNMENT|turn align):[ ](.*)>/i)) {
                obj.turnAlign = String(RegExp.$1).toLowerCase();
            } else if (line.match(/<(?:TURN FONT SIZE):[ ](\d+)>/i)) {
                obj.turnFontSize = parseInt(RegExp.$1);
            } else if (line.match(/<(?:TURN BUFFER X):[ ]([\+\-]\d+)>/i)) {
                obj.turnBufferX = parseInt(RegExp.$1);
            } else if (line.match(/<(?:TURN BUFFER Y):[ ]([\+\-]\d+)>/i)) {
                obj.turnBufferY = parseInt(RegExp.$1);
            } else if (line.match(/<(?:TURN COLOR):[ ](\d+)>/i)) {
                obj.turnColor = parseInt(RegExp.$1);
            } else if (line.match(/<(?:REAPPLY IGNORE TURNS)>/i)) {
                obj.reapplyRules = 0;
            } else if (line.match(/<(?:REAPPLY RESET TURNS)>/i)) {
                obj.reapplyRules = 1;
            } else if (line.match(/<(?:REAPPLY ADD TURNS)>/i)) {
                obj.reapplyRules = 2;
            } else if (line.match(/<CUSTOM[ ](.*)[ ]EFFECT>/i)) {
                var name = String(RegExp.$1).toUpperCase();
                evalMode = "custom state effect";
                if (["APPLY", "ADD"].contains(name)) {
                    evalType = "addState";
                } else if (["REMOVE", "ERASE"].contains(name)) {
                    evalType = "removeState";
                } else if (["LEAVE", "DECAY"].contains(name)) {
                    evalType = "leaveState";
                } else if (["TURN START", "BEGIN"].contains(name)) {
                    evalType = "turnStartState";
                } else if (["TURN END", "CLOSE"].contains(name)) {
                    evalType = "turnEndState";
                } else if (["REGENERATE", "REGEN", "WHILE"].contains(name)) {
                    evalType = "regenerateState";
                } else if (["SELECT", "ONTARGET"].contains(name)) {
                    evalType = "selectState";
                } else if (["DESELECT", "OFFTARGET"].contains(name)) {
                    evalType = "deselectState";
                } else if (["REACT", "REACTION"].contains(name)) {
                    evalType = "reactState";
                } else if (["RESPOND", "RESPONSE"].contains(name)) {
                    evalType = "respondState";
                } else if (["INITIATE", "ONAPPLY"].contains(name)) {
                    evalType = "initiateState";
                } else if (["CONFIRM", "PREDAMAGE", "PRE-DAMAGE"].contains(name)) {
                    evalType = "confirmState";
                } else if (["ESTABLISH", "POSTDAMAGE", "POST-DAMAGE"].contains(name)) {
                    evalType = "establishState";
                } else if (["CONCLUDE", "OFFAPPLY"].contains(name)) {
                    evalType = "concludeState";
                } else if (["ACTION START", "START"].contains(name)) {
                    evalType = "actionStartState";
                } else if (["ACTION END", "FINISH"].contains(name)) {
                    evalType = "actionEndState";
                } else if (["BATTLE", "BATTLE START"].contains(name)) {
                    evalType = "battle";
                } else if (["VICTORY", "BATTLE VICTORY"].contains(name)) {
                    evalType = "victory";
                } else if (["DEFEAT", "BATTLE DEFEAT"].contains(name)) {
                    evalType = "defeat";
                } else if (["ESCAPE", "BATTLE ESCAPE"].contains(name)) {
                    evalType = "escape";
                }
            } else if (line.match(/<\/CUSTOM[ ](.*)[ ]EFFECT>/i)) {
                evalMode = "none";
                evalType = "none";
            } else if (evalMode === "custom state effect") {
                obj.customEffectEval[evalType] = obj.customEffectEval[evalType] + line + "\n";
            } else if (line.match(/<COUNTER FONT SIZE:[ ](\d+)>/i)) {
                obj.stateCounterSettings["size"] = parseInt(RegExp.$1);
            } else if (line.match(/<COUNTER[ ](?:ALIGNMENT|align):[ ](.*)>/i)) {
                obj.stateCounterSettings["align"] = String(RegExp.$1).toLowerCase();
            } else if (line.match(/<COUNTER BUFFER X:[ ]([\+\-]\d+)>/i)) {
                obj.stateCounterSettings["bufferX"] = parseInt(RegExp.$1);
            } else if (line.match(/<COUNTER BUFFER Y:[ ]([\+\-]\d+)>/i)) {
                obj.stateCounterSettings["bufferY"] = parseInt(RegExp.$1);
            } else if (line.match(/<COUNTER TEXT COLOR:[ ](\d+)>/i)) {
                obj.stateCounterSettings["color"] = parseInt(RegExp.$1);
            }
        }
    }
};

DataManager.initStateEval = function (obj) {
    obj.customEffectEval = {};
    obj.customEffectEval["addState"] = "";
    obj.customEffectEval["removeState"] = "";
    obj.customEffectEval["leaveState"] = "";
    obj.customEffectEval["turnStartState"] = "";
    obj.customEffectEval["turnEndState"] = "";
    obj.customEffectEval["regenerateState"] = "";
    obj.customEffectEval["selectState"] = "";
    obj.customEffectEval["deselectState"] = "";
    obj.customEffectEval["reactState"] = "";
    obj.customEffectEval["respondState"] = "";
    obj.customEffectEval["initiateState"] = "";
    obj.customEffectEval["concludeState"] = "";
    obj.customEffectEval["confirmState"] = "";
    obj.customEffectEval["establishState"] = "";
    obj.customEffectEval["actionStartState"] = "";
    obj.customEffectEval["actionEndState"] = "";
    obj.customEffectEval["battle"] = "";
    obj.customEffectEval["victory"] = "";
    obj.customEffectEval["defeat"] = "";
    obj.customEffectEval["escape"] = "";
};

DataManager.initStateCounter = function (obj) {
    obj.stateCounterSettings = {};
    obj.stateCounterSettings["size"] = Yanfly.Param.BSCCounterSize || 16;
    obj.stateCounterSettings["align"] = Yanfly.Param.BSCCounterAlign;
    if (obj.stateCounterSettings["align"] === "undefined") {
        obj.stateCounterSettings["align"] = "center";
    }
    obj.stateCounterSettings["bufferX"] = Yanfly.Param.BSCCounterBufferX || 0;
    obj.stateCounterSettings["bufferY"] = Yanfly.Param.BSCCounterBufferY || 8;
    obj.stateCounterSettings["color"] = Yanfly.Param.BSCCounterColor || 0;
};

DataManager.processBSCNotetags2 = function (group) {
    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
        var notedata = obj.note.split(/[\r\n]+/);

        obj.maxBuff = [0, 0, 0, 0, 0, 0, 0, 0];
        obj.maxDebuff = [0, 0, 0, 0, 0, 0, 0, 0];

        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (line.match(/<(?:MAX)[ ](.*)[ ](?:BUFF):[ ]([\+\-]\d+)>/i)) {
                var paramId = 8;
                var stat = String(RegExp.$1).toUpperCase();
                var limit = parseInt(RegExp.$2);
                if (["MAXHP", "MAX HP", "MHP", "HP"].contains(stat)) {
                    paramId = 0;
                } else if (["MAXMP", "MAX MP", "MMP", "MP"].contains(stat)) {
                    paramId = 1;
                } else if (["ATK", "STR"].contains(stat)) {
                    paramId = 2;
                } else if (["DEF"].contains(stat)) {
                    paramId = 3;
                } else if (["MAT", "INT"].contains(stat)) {
                    paramId = 4;
                } else if (["MDF", "RES"].contains(stat)) {
                    paramId = 5;
                } else if (["AGI", "SPD"].contains(stat)) {
                    paramId = 6;
                } else if (["LUK"].contains(stat)) {
                    paramId = 7;
                }
                obj.maxBuff[paramId] = limit;
            } else if (line.match(/<(?:MAX)[ ](.*)[ ](?:DEBUFF):[ ]([\+\-]\d+)>/i)) {
                var paramId = 8;
                var stat = String(RegExp.$1).toUpperCase();
                var limit = parseInt(RegExp.$2);
                if (["MAXHP", "MAX HP", "MHP", "HP"].contains(stat)) {
                    paramId = 0;
                } else if (["MAXMP", "MAX MP", "MMP", "MP"].contains(stat)) {
                    paramId = 1;
                } else if (["ATK", "STR"].contains(stat)) {
                    paramId = 2;
                } else if (["DEF"].contains(stat)) {
                    paramId = 3;
                } else if (["MAT", "INT"].contains(stat)) {
                    paramId = 4;
                } else if (["MDF", "RES"].contains(stat)) {
                    paramId = 5;
                } else if (["AGI", "SPD"].contains(stat)) {
                    paramId = 6;
                } else if (["LUK"].contains(stat)) {
                    paramId = 7;
                }
                obj.maxDebuff[paramId] = limit;
            }
        }
    }
};

DataManager.processBSCNotetags3 = function (group) {
    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
        var notedata = obj.note.split(/[\r\n]+/);

        obj.modifyTurnBuff = [0, 0, 0, 0, 0, 0, 0, 0];
        obj.modifyTurnDebuff = [0, 0, 0, 0, 0, 0, 0, 0];
        obj.modifyTurnBuffEval = ["", "", "", "", "", "", "", ""];
        obj.modifyTurnDebuffEval = ["", "", "", "", "", "", "", ""];
        obj.modifyTurnState = {};
        obj.modifyTurnStateEval = {};
        var evalMode = "none";
        var evalLine = "";

        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (line.match(/<(.*)[ ](?:BUFF TURNS):[ ]([\+\-]\d+)>/i)) {
                var paramId = 8;
                var stat = String(RegExp.$1).toUpperCase();
                var value = parseInt(RegExp.$2);
                if (["MAXHP", "MAX HP", "MHP", "HP"].contains(stat)) {
                    paramId = 0;
                } else if (["MAXMP", "MAX MP", "MMP", "MP"].contains(stat)) {
                    paramId = 1;
                } else if (["ATK", "STR"].contains(stat)) {
                    paramId = 2;
                } else if (["DEF"].contains(stat)) {
                    paramId = 3;
                } else if (["MAT", "INT"].contains(stat)) {
                    paramId = 4;
                } else if (["MDF", "RES"].contains(stat)) {
                    paramId = 5;
                } else if (["AGI", "SPD"].contains(stat)) {
                    paramId = 6;
                } else if (["LUK"].contains(stat)) {
                    paramId = 7;
                }
                obj.modifyTurnBuff[paramId] = value;
            } else if (line.match(/<(.*)[ ](?:DEBUFF TURNS):[ ]([\+\-]\d+)>/i)) {
                var paramId = 8;
                var stat = String(RegExp.$1).toUpperCase();
                var value = parseInt(RegExp.$2);
                if (["MAXHP", "MAX HP", "MHP", "HP"].contains(stat)) {
                    paramId = 0;
                } else if (["MAXMP", "MAX MP", "MMP", "MP"].contains(stat)) {
                    paramId = 1;
                } else if (["ATK", "STR"].contains(stat)) {
                    paramId = 2;
                } else if (["DEF"].contains(stat)) {
                    paramId = 3;
                } else if (["MAT", "INT"].contains(stat)) {
                    paramId = 4;
                } else if (["MDF", "RES"].contains(stat)) {
                    paramId = 5;
                } else if (["AGI", "SPD"].contains(stat)) {
                    paramId = 6;
                } else if (["LUK"].contains(stat)) {
                    paramId = 7;
                }
                obj.modifyTurnDebuff[paramId] = value;
            } else if (line.match(/<(?:CUSTOM)[ ](.*)[ ](?:BUFF TURNS)>/i)) {
                evalMode = "custom buff";
                evalLine = "";
            } else if (line.match(/<\/(?:CUSTOM)[ ](.*)[ ](?:BUFF TURNS)>/i)) {
                var paramId = 8;
                var stat = String(RegExp.$1).toUpperCase();
                if (["MAXHP", "MAX HP", "MHP", "HP"].contains(stat)) {
                    paramId = 0;
                } else if (["MAXMP", "MAX MP", "MMP", "MP"].contains(stat)) {
                    paramId = 1;
                } else if (["ATK", "STR"].contains(stat)) {
                    paramId = 2;
                } else if (["DEF"].contains(stat)) {
                    paramId = 3;
                } else if (["MAT", "INT"].contains(stat)) {
                    paramId = 4;
                } else if (["MDF", "RES"].contains(stat)) {
                    paramId = 5;
                } else if (["AGI", "SPD"].contains(stat)) {
                    paramId = 6;
                } else if (["LUK"].contains(stat)) {
                    paramId = 7;
                }
                obj.modifyTurnBuffEval[paramId] = evalLine;
                evalMode = "none";
                evalLine = "";
            } else if (evalMode === "custom buff") {
                evalLine = evalLine + line + "\n";
            } else if (line.match(/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i)) {
                obj.modifyTurnState[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
            } else if (line.match(/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)) {
                var name = String(RegExp.$1).toUpperCase();
                var value = parseInt(RegExp.$2);
                var id = Yanfly.StateIdRef[name];
                obj.modifyTurnState[id] = value;
            } else if (line.match(/<(?:CUSTOM STATE)[ ](.*)[ ](?:TURNS)>/i)) {
                evalMode = "custom state";
                evalLine = "";
            } else if (line.match(/<\/(?:CUSTOM STATE)[ ](.*)[ ](?:TURNS)>/i)) {
                var text = String(RegExp.$1);
                if (text.match(/(\d+)/i)) {
                    var id = parseInt(RegExp.$1);
                } else {
                    var id = Yanfly.StateIdRef[text.toUpperCase()];
                }
                obj.modifyTurnStateEval[id] = evalLine;
                evalMode = "none";
                evalLine = "";
            } else if (evalMode === "custom state") {
                evalLine = evalLine + line + "\n";
            }
        }
    }
};

DataManager.processBSCNotetags4 = function (group) {
    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
        var notedata = obj.note.split(/[\r\n]+/);

        obj.showStateTurns = Yanfly.Param.BSCShowEnemyTurns;

        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (line.match(/<(?:SHOW STATE TURNS)>/i)) {
                obj.showStateTurns = true;
            } else if (line.match(/<(?:HIDE STATE TURNS)>/i)) {
                obj.showStateTurns = false;
            }
        }
    }
};

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.BSC.BattleManager_startAction = BattleManager.startAction;
BattleManager.startAction = function () {
    if (this._subject) this._subject.onActionStartStateEffects();
    Yanfly.BSC.BattleManager_startAction.call(this);
};

Yanfly.BSC.BattleManager_endAction = BattleManager.endAction;
BattleManager.endAction = function () {
    if (this._subject) this._subject.onActionEndStateEffects();
    Yanfly.BSC.BattleManager_endAction.call(this);
};

Yanfly.BSC.BattleManager_endBattle = BattleManager.endBattle;
BattleManager.endBattle = function (result) {
    if (result === 0) {
        $gameParty.processStateEval("victory");
    } else if (result === 1) {
        $gameParty.processStateEval("escape");
    } else if (result === 2) {
        $gameParty.processStateEval("defeat");
    }
    Yanfly.BSC.BattleManager_endBattle.call(this, result);
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Yanfly.BSC.Game_BattlerBase_initMembers = Game_BattlerBase.prototype.initMembers;
Game_BattlerBase.prototype.initMembers = function () {
    Yanfly.BSC.Game_BattlerBase_initMembers.call(this);
    this.initStateCounter();
};

Yanfly.BSC.Game_BattlerBase_refresh = Game_BattlerBase.prototype.refresh;
Game_BattlerBase.prototype.refresh = function () {
    this._cacheParamBuffRate = {};
    Yanfly.BSC.Game_BattlerBase_refresh.call(this);
};

Game_BattlerBase.prototype.stateOrigin = function (stateId) {
    if (this._stateOrigin === undefined) this._stateOrigin = {};
    if (!this._stateOrigin[stateId]) return this;
    var arr = this._stateOrigin[stateId];
    if (arr[0] === 0) return $gameActors.actor(arr[1]);
    if (arr[0] === 1) return $gameTroop.members()[arr[1]];
    return this;
};

Game_BattlerBase.prototype.setStateOrigin = function (stateId, battler) {
    if (this._stateOrigin === undefined) this._stateOrigin = {};
    if (!$gameParty.inBattle()) return;
    if (!battler) {
        var battler = BattleManager._subject;
        if (!battler) return;
    }
    if (battler.isActor()) {
        var arr = [0, battler._actorId];
    } else {
        var arr = [1, battler.index()];
    }
    this._stateOrigin[stateId] = arr;
};

Game_BattlerBase.prototype.clearStateOrigin = function (stateId) {
    if (this._stateOrigin === undefined) this._stateOrigin = {};
    this._stateOrigin[stateId] = undefined;
};

Game_BattlerBase.prototype.clearEnemyStateOrigins = function () {
    var length = $dataStates.length;
    for (var i = 0; i < length; ++i) {
        if (this._stateOrigin === undefined) this._stateOrigin = {};
        if (this._stateOrigin[i] === undefined) continue;
        var data = this._stateOrigin[i];
        if (data[0] === 1) this.clearStateOrigin(i);
    }
};

Game_BattlerBase.prototype.stateTurns = function (stateId) {
    return this._stateTurns[stateId];
};

Game_BattlerBase.prototype.setStateTurns = function (stateId, turns) {
    if (Imported.YEP_BattleEngineCore && !Yanfly.Param.BECTimeStates) {
        turns = Math.floor(turns);
    }
    this._stateTurns[stateId] = turns;
};

Game_BattlerBase.prototype.buffTurns = function (paramId) {
    return this._buffTurns[paramId];
};

Game_BattlerBase.prototype.setBuffTurns = function (paramId, turns) {
    if (Imported.YEP_BattleEngineCore && !Yanfly.Param.BECTimeBuffs) {
        turns = Math.floor(turns);
    }
    this._buffTurns[paramId] = turns;
};

Game_BattlerBase.prototype.paramBuffRate = function (paramId) {
    if (this._cacheParamBuffRate === undefined) this._cacheParamBuffRate = {};
    if (this._cacheParamBuffRate[paramId] !== undefined) {
        return this._cacheParamBuffRate[paramId];
    }
    var code = Yanfly.Param.BSCBuffFormula;
    try {
        var rate = eval(code);
    } catch (e) {
        var rate = 1;
        Yanfly.Util.displayError(e, code, "PARAM BUFF RATE FORMULA ERROR");
    }
    this._cacheParamBuffRate[paramId] = rate;
    return this._cacheParamBuffRate[paramId];
};

Game_BattlerBase.prototype.isMaxBuffAffected = function (paramId) {
    var limit = Math.max(1, this.maxBuffLimit(paramId));
    var max = Yanfly.Param.BSCMaximumLimit;
    return this._buffs[paramId] === Math.min(limit, max);
};

Game_BattlerBase.prototype.maxBuffLimit = function (paramId) {
    var value = Yanfly.Param.BSCDefaultLimit;
    var states = this.states();
    var length = states.length;
    for (var i = 0; i < length; ++i) {
        var state = states[i];
        if (!state) continue;
        if (state.maxBuff) value += state.maxBuff[paramId];
    }
    return value;
};

Game_BattlerBase.prototype.isMaxDebuffAffected = function (paramId) {
    var limit = Math.min(-1, this.maxDebuffLimit(paramId));
    var max = Yanfly.Param.BSCMaximumLimit * -1;
    return this._buffs[paramId] === Math.max(limit, max);
};

Game_BattlerBase.prototype.maxDebuffLimit = function (paramId) {
    var value = -1 * Yanfly.Param.BSCDefaultLimit;
    var states = this.states();
    var length = states.length;
    for (var i = 0; i < length; ++i) {
        var state = states[i];
        if (!state) continue;
        if (state.maxDebuff) value -= state.maxDebuff[paramId];
    }
    return value;
};

Game_BattlerBase.prototype.buffIconIndex = function (buffLevel, paramId) {
    if (buffLevel > 0) {
        var level = Math.min(buffLevel - 1, 1);
        return Game_BattlerBase.ICON_BUFF_START + level * 8 + paramId;
    } else if (buffLevel < 0) {
        var level = Math.min(-buffLevel - 1, 1);
        return Game_BattlerBase.ICON_DEBUFF_START + level * 8 + paramId;
    } else {
        return 0;
    }
};

Yanfly.BSC.Game_BattlerBase_resetStateCounts = Game_BattlerBase.prototype.resetStateCounts;
Game_BattlerBase.prototype.resetStateCounts = function (stateId) {
    var state = $dataStates[stateId];
    if (state.reapplyRules === 1) {
        Yanfly.BSC.Game_BattlerBase_resetStateCounts.call(this, stateId);
    } else if (state.reapplyRules === 2) {
        this._stateTurns[stateId] = this._stateTurns[stateId] || 0;
        var variance = 1 + Math.max(state.maxTurns - state.minTurns, 0);
        this._stateTurns[stateId] += state.minTurns + Math.randomInt(variance);
    } else if (state.reapplyRules === 0 && state.minTurns) {
        if (this._stateTurns[stateId] === undefined) {
            Yanfly.BSC.Game_BattlerBase_resetStateCounts.call(this, stateId);
        }
    }
};

Game_BattlerBase.prototype.initStateCounter = function () {
    this._stateCounter = {};
};

Game_BattlerBase.prototype.clearStateCounters = function () {
    this._stateCounter = {};
};

Game_BattlerBase.prototype.setStateCounter = function (stateId, value) {
    if (this._stateCounter === undefined) this.initStateCounter();
    this._stateCounter[stateId] = value;
    this.refresh();
};

Game_BattlerBase.prototype.addStateCounter = function (stateId, value) {
    if (this._stateCounter === undefined) this.initStateCounter();
    this.setStateCounter(stateId, value + (this.getStateCounter(stateId) || 0));
};

Game_BattlerBase.prototype.clampStateCounter = function (stateId, min, max) {
    var value = this.getStateCounter(stateId).clamp(min, max);
    this.setStateCounter(stateId, value);
};

Game_BattlerBase.prototype.removeStateCounter = function (stateId) {
    if (this._stateCounter === undefined) this.initStateCounter();
    this._stateCounter[stateId] = undefined;
};

Game_BattlerBase.prototype.getStateCounter = function (stateId) {
    if (this._stateCounter === undefined) this.initStateCounter();
    return this._stateCounter[stateId];
};

Game_BattlerBase.prototype.statesAndBuffs = function () {
    var group = this.states();
    var length = group.length;
    var array = [];
    for (var i = 0; i < length; ++i) {
        var state = group[i];
        if (state && state.iconIndex > 0) array.push(state);
    }
    for (var i = 0; i < 8; ++i) {
        if (this._buffs[i]) array.push(i);
    }
    return array;
};

//=============================================================================
// Game_Battler
//=============================================================================

Game_Battler.prototype.hasState = function (stateId) {
    return this.states().contains($dataStates[stateId]);
};

Game_Battler.prototype.customEffectEval = function (stateId, type) {
    var state = $dataStates[stateId];
    if (!state) return;
    if (state.customEffectEval[type] === "") return;
    var a = this;
    var user = this;
    var target = this;
    var origin = this.stateOrigin(stateId);
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var code = state.customEffectEval[type];
    try {
        eval(code);
    } catch (e) {
        Yanfly.Util.displayError(e, code, "CUSTOM STATE " + stateId + " CODE ERROR");
    }
};

Yanfly.BSC.Game_Battler_addState = Game_Battler.prototype.addState;
Game_Battler.prototype.addState = function (stateId) {
    var addable = this.isStateAddable(stateId);
    Yanfly.BSC.Game_Battler_addState.call(this, stateId);
    if (addable) {
        this.setStateOrigin(stateId);
        this.addStateEffects(stateId);
    }
};

Game_Battler.prototype.addStateEffects = function (stateId) {
    this.customEffectEval(stateId, "addState");
};

Yanfly.BSC.Game_Battler_removeState = Game_Battler.prototype.removeState;
Game_Battler.prototype.removeState = function (stateId) {
    var affected = this.isStateAffected(stateId);
    Yanfly.BSC.Game_Battler_removeState.call(this, stateId);
    this.removeStateCounter(stateId);
    if (affected) {
        this.removeStateEffects(stateId);
        this.clearStateOrigin(stateId);
    }
};

Game_Battler.prototype.removeStateEffects = function (stateId) {
    this.customEffectEval(stateId, "removeState");
    if ($gameTemp._customLeaveEffectEval) this.leaveStateEffects(stateId);
};

Yanfly.BSC.Game_Battler_removeStatesAuto = Game_Battler.prototype.removeStatesAuto;
Game_Battler.prototype.removeStatesAuto = function (timing) {
    $gameTemp._customLeaveEffectEval = true;
    Yanfly.BSC.Game_Battler_removeStatesAuto.call(this, timing);
    $gameTemp._customLeaveEffectEval = undefined;
};

Game_Battler.prototype.leaveStateEffects = function (stateId) {
    this.customEffectEval(stateId, "leaveState");
};

Game_Battler.prototype.onTurnStartStateEffects = function () {
    var states = this.states();
    var length = states.length;
    for (var i = 0; i < length; ++i) {
        var state = states[i];
        if (state) this.turnStartStateEffects(state.id);
    }
};

Game_Battler.prototype.turnStartStateEffects = function (stateId) {
    this.customEffectEval(stateId, "turnStartState");
};

Game_Battler.prototype.onTurnEndStateEffects = function () {
    var states = this.states();
    var length = states.length;
    for (var i = 0; i < length; ++i) {
        var state = states[i];
        if (state) this.turnEndStateEffects(state.id);
    }
};

Game_Battler.prototype.turnEndStateEffects = function (stateId) {
    this.customEffectEval(stateId, "turnEndState");
};

Yanfly.BSC.Game_Battler_onTurnEnd = Game_Battler.prototype.onTurnEnd;
Game_Battler.prototype.onTurnEnd = function () {
    Yanfly.BSC.Game_Battler_onTurnEnd.call(this);
    if (this.meetTurnEndStateEffectsConditions()) this.onTurnEndStateEffects();
};

Game_Battler.prototype.meetTurnEndStateEffectsConditions = function () {
    if (Imported.YEP_BattleEngineCore) {
        if (BattleManager.isTurnBased()) {
            return true;
        } else if (BattleManager.isTickBased() && !BattleManager.isTurnEnd()) {
            return true;
        } else {
            return false;
        }
    }
    return true;
};

Game_Battler.prototype.onRegenerateStateEffects = function () {
    var states = this.states();
    var length = states.length;
    for (var i = 0; i < length; ++i) {
        var state = states[i];
        if (state) this.regenerateStateEffects(state.id);
    }
};

Game_Battler.prototype.regenerateStateEffects = function (stateId) {
    if ($gameParty.inBattle()) this.clearResult();
    var lifeState = this.isAlive();
    this.customEffectEval(stateId, "regenerateState");
    if ($gameParty.inBattle() && this.isDead() && lifeState === true) {
        this.performCollapse();
    }
    if (!Imported.YEP_BattleEngineCore) return;
    if ($gameParty.inBattle()) this.startDamagePopup();
};

Yanfly.BSC.Game_Battler_regenerateAll = Game_Battler.prototype.regenerateAll;
Game_Battler.prototype.regenerateAll = function () {
    this.onRegenerateStateEffects();
    Yanfly.BSC.Game_Battler_regenerateAll.call(this);
};

if (Imported.YEP_BattleEngineCore) {
    Yanfly.BSC.Game_BattlerBase_updateStateTicks = Game_BattlerBase.prototype.updateStateTicks;
    Game_BattlerBase.prototype.updateStateTicks = function () {
        $gameTemp._customLeaveEffectEval = true;
        Yanfly.BSC.Game_BattlerBase_updateStateTicks.call(this);
        $gameTemp._customLeaveEffectEval = undefined;
    };

    Yanfly.BSC.Game_BattlerBase_updateStateTurnTiming = Game_BattlerBase.prototype.updateStateTurnTiming;
    Game_BattlerBase.prototype.updateStateTurnTiming = function (timing) {
        $gameTemp._customLeaveEffectEval = true;
        Yanfly.BSC.Game_BattlerBase_updateStateTurnTiming.call(this, timing);
        $gameTemp._customLeaveEffectEval = undefined;
    };

    Yanfly.BSC.Game_Battler_onTurnStart = Game_Battler.prototype.onTurnStart;
    Game_Battler.prototype.onTurnStart = function () {
        Yanfly.BSC.Game_Battler_onTurnStart.call(this);
        if (this.meetTurnStartStateEffectsConditions()) {
            this.onTurnStartStateEffects();
        }
    };

    Game_Battler.prototype.meetTurnStartStateEffectsConditions = function () {
        return true;
    };
} // Imported.YEP_BattleEngineCore

Game_Battler.prototype.onActionStartStateEffects = function () {
    var states = this.states();
    var length = states.length;
    for (var i = 0; i < length; ++i) {
        var state = states[i];
        if (state) this.actionStartStateEffects(state.id);
    }
};

Game_Battler.prototype.actionStartStateEffects = function (stateId) {
    this.customEffectEval(stateId, "actionStartState");
};

Game_Battler.prototype.onActionEndStateEffects = function () {
    var states = this.states();
    var length = states.length;
    for (var i = 0; i < length; ++i) {
        var state = states[i];
        if (state) this.actionEndStateEffects(state.id);
    }
};

Game_Battler.prototype.actionEndStateEffects = function (stateId) {
    this.customEffectEval(stateId, "actionEndState");
};

Yanfly.BSC.Game_Battler_onBattleEnd = Game_Battler.prototype.onBattleEnd;
Game_Battler.prototype.onBattleEnd = function () {
    Yanfly.BSC.Game_Battler_onBattleEnd.call(this);
    this.clearEnemyStateOrigins();
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.maxBuffLimit = function (paramId) {
    var value = Game_Battler.prototype.maxBuffLimit.call(this, paramId);
    value += this.actor().maxBuff[paramId];
    value += this.currentClass().maxBuff[paramId];
    var length = this.equips().length;
    for (var i = 0; i < length; ++i) {
        var equip = this.equips()[i];
        if (!equip) continue;
        if (equip.maxBuff) value += equip.maxBuff[paramId];
    }
    return value;
};

Game_Actor.prototype.maxDebuffLimit = function (paramId) {
    var value = Game_Battler.prototype.maxDebuffLimit.call(this, paramId);
    value -= this.actor().maxDebuff[paramId];
    value -= this.currentClass().maxDebuff[paramId];
    var length = this.equips().length;
    for (var i = 0; i < length; ++i) {
        var equip = this.equips()[i];
        if (!equip) continue;
        if (equip.maxDebuff) value -= equip.maxDebuff[paramId];
    }
    return value;
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.maxBuffLimit = function (paramId) {
    var value = Game_Battler.prototype.maxBuffLimit.call(this, paramId);
    value += this.enemy().maxBuff[paramId];
    return value;
};

Game_Enemy.prototype.maxDebuffLimit = function (paramId) {
    var value = Game_Battler.prototype.maxDebuffLimit.call(this, paramId);
    value -= this.enemy().maxDebuff[paramId];
    return value;
};

//=============================================================================
// Game_Unit
//=============================================================================

Game_Unit.prototype.processStateEval = function (type) {
    var length1 = this.allMembers().length;
    for (var i = 0; i < length1; ++i) {
        var member = this.allMembers()[i];
        if (!member) return;
        member.refresh();
        var states = member.states();
        var length2 = states.length;
        for (var j = 0; j < length2; ++j) {
            var state = states[j];
            if (state) member.customEffectEval(state.id, type);
        }
    }
};

Yanfly.BSC.Game_Unit_onBattleStart = Game_Unit.prototype.onBattleStart;
Game_Unit.prototype.onBattleStart = function () {
    Yanfly.BSC.Game_Unit_onBattleStart.call(this);
    this.processStateEval("battle");
};

//=============================================================================
// Game_Troop
//=============================================================================

Game_Troop.prototype.allMembers = function () {
    return this.members();
};

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.BSC.Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function (target) {
    Yanfly.BSC.Game_Action_applyItemUserEffect.call(this, target);
    if (!target) return;
    this.applyModifyBuffTurns(target);
    this.applyModifyDebuffTurns(target);
    this.applyModifyStateTurns(target);
};

Game_Action.prototype.applyModifyBuffTurns = function (target) {
    if (!this.item()) return;
    var affected = false;
    for (var i = 0; i < 8; ++i) {
        if (!target.isBuffAffected(i)) continue;
        var turn = this.item().modifyTurnBuff[i] + target.buffTurns(i);
        turn = this.applyBuffTurnsEval(turn, i, target);
        target.setBuffTurns(i, turn);
        if (target.buffTurns(i) <= 0) target.eraseBuff(i);
        affected = true;
    }
    if (affected) target.refresh();
};

Game_Action.prototype.applyBuffTurnsEval = function (turn, paramId, target) {
    if (this.item().modifyTurnBuffEval[paramId] === "") return turn;
    var item = this.item();
    var a = this.subject();
    var b = target;
    var user = this.subject();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var code = this.item().modifyTurnBuffEval[paramId];
    try {
        eval(code);
    } catch (e) {
        Yanfly.Util.displayError(e, code, "CUSTOM BUFF TURN SET ERROR");
    }
    return turn;
};

Game_Action.prototype.applyModifyDebuffTurns = function (target) {
    if (!this.item()) return;
    var affected = false;
    for (var i = 0; i < 8; ++i) {
        if (!target.isDebuffAffected(i)) continue;
        var turn = this.item().modifyTurnDebuff[i] + target.buffTurns(i);
        turn = this.applyDebuffTurnsEval(turn, i, target);
        target.setBuffTurns(i, turn);
        if (target.buffTurns(i) <= 0) target.eraseBuff(i);
        affected = true;
    }
    if (affected) target.refresh();
};

Game_Action.prototype.applyDebuffTurnsEval = function (turn, paramId, target) {
    if (this.item().modifyTurnBuffEval[paramId] === "") return turn;
    var item = this.item();
    var a = this.subject();
    var b = target;
    var user = this.subject();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var code = this.item().modifyTurnBuffEval[paramId];
    try {
        eval(code);
    } catch (e) {
        Yanfly.Util.displayError(e, code, "CUSTOM DEBUFF TURN SET ERROR");
    }
    return turn;
};

Game_Action.prototype.applyModifyStateTurns = function (target) {
    if (!this.item()) return;
    var affected = false;
    var states = target.states();
    var length = states.length;
    var removed = [];
    for (var i = 0; i < length; ++i) {
        var state = states[i];
        if (state.autoRemovalTiming <= 0) continue;
        if (!target.isStateAffected(state.id)) continue;
        var turn = target.stateTurns(state.id);
        if (this.item().modifyTurnState[state.id]) {
            turn += this.item().modifyTurnState[state.id];
        }
        turn = this.applyStateTurnsEval(turn, state.id, target);
        target.setStateTurns(state.id, turn);
        if (target.stateTurns(state.id) <= 0) removed.push(state.id);
    }
    for (var i = 0; i < removed.length; ++i) {
        target.removeState(removed[i]);
        affected = true;
    }
    if (affected) target.refresh();
};

Game_Action.prototype.applyStateTurnsEval = function (turn, stateId, target) {
    if (this.item().modifyTurnStateEval[stateId] === undefined) return turn;
    var item = this.item();
    var a = this.subject();
    var b = target;
    var user = this.subject();
    var origin = target.stateOrigin(stateId);
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var code = this.item().modifyTurnStateEval[stateId];
    try {
        eval(code);
    } catch (e) {
        Yanfly.Util.displayError(e, code, "CUSTOM STATE TURN SET ERROR");
    }
    return turn;
};

Yanfly.BSC.Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function (target) {
    this.onApplyStateEffects(target);
    this.onSelectStateEffects(target);
    Yanfly.BSC.Game_Action_apply.call(this, target);
    this.onDeselectStateEffects(target);
    this.offApplyStateEffects(target);
};

Game_Action.prototype.customEffectEval = function (target, stateId, type, side, value) {
    var state = $dataStates[stateId];
    if (!state) return value;
    if (state.customEffectEval[type] === "") return value;
    var attacker = this.subject();
    var defender = target;
    var a = this.subject();
    var b = target;
    var user = this.subject();
    var origin = side.stateOrigin(stateId);
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var code = state.customEffectEval[type];
    try {
        eval(code);
    } catch (e) {
        Yanfly.Util.displayError(e, code, "CUSTOM STATE " + stateId + " CODE ERROR");
    }
    return value;
};

Game_Action.prototype.onApplyStateEffects = function (target) {
    var states = this.subject().states();
    var length = this.subject().states().length;
    for (var i = 0; i < length; ++i) {
        var state = states[i];
        if (!state) continue;
        this.initiateStateEffects(target, state.id);
    }
};

Game_Action.prototype.initiateStateEffects = function (target, stateId) {
    this.customEffectEval(target, stateId, "initiateState", this.subject());
};

Game_Action.prototype.onSelectStateEffects = function (target) {
    var states = target.states();
    var length = states.length;
    for (var i = 0; i < length; ++i) {
        var state = states[i];
        if (!state) continue;
        this.selectStateEffects(target, state.id);
    }
};

Game_Action.prototype.selectStateEffects = function (target, stateId) {
    this.customEffectEval(target, stateId, "selectState", target);
};

Game_Action.prototype.onDeselectStateEffects = function (target) {
    var states = target.states();
    var length = states.length;
    for (var i = 0; i < length; ++i) {
        var state = states[i];
        if (!state) continue;
        this.deselectStateEffects(target, state.id);
    }
};

Game_Action.prototype.deselectStateEffects = function (target, stateId) {
    this.customEffectEval(target, stateId, "deselectState", target);
};

Game_Action.prototype.offApplyStateEffects = function (target) {
    var states = this.subject().states();
    var length = states.length;
    for (var i = 0; i < length; ++i) {
        var state = states[i];
        if (!state) continue;
        this.concludeStateEffects(target, state.id);
    }
};

Game_Action.prototype.concludeStateEffects = function (target, stateId) {
    this.customEffectEval(target, stateId, "concludeState", this.subject());
};

Yanfly.BSC.Game_Action_executeDamage = Game_Action.prototype.executeDamage;
Game_Action.prototype.executeDamage = function (target, value) {
    value = this.onPreDamageStateEffects(target, value);
    value = this.onReactStateEffects(target, value);
    Yanfly.BSC.Game_Action_executeDamage.call(this, target, value);
    value = this.onRespondStateEffects(target, value);
    value = this.onPostDamageStateEffects(target, value);
};

Game_Action.prototype.onPreDamageStateEffects = function (target, value) {
    var states = this.subject().states();
    var length = states.length;
    for (var i = 0; i < length; ++i) {
        var state = states[i];
        if (!state) continue;
        value = this.confirmStateEffects(target, state.id, value);
    }
    return value;
};

Game_Action.prototype.confirmStateEffects = function (target, stateId, value) {
    return this.customEffectEval(target, stateId, "confirmState", this.subject(), value);
};

Game_Action.prototype.onReactStateEffects = function (target, value) {
    var states = target.states();
    var length = states.length;
    for (var i = 0; i < length; ++i) {
        var state = states[i];
        if (!state) continue;
        value = this.reactStateEffects(target, state.id, value);
    }
    return value;
};

Game_Action.prototype.reactStateEffects = function (target, stateId, value) {
    return this.customEffectEval(target, stateId, "reactState", target, value);
};

Game_Action.prototype.onRespondStateEffects = function (target, value) {
    var states = target.states();
    var length = states.length;
    for (var i = 0; i < length; ++i) {
        var state = states[i];
        if (!state) continue;
        value = this.respondStateEffects(target, state.id, value);
    }
    return value;
};

Game_Action.prototype.respondStateEffects = function (target, stateId, value) {
    return this.customEffectEval(target, stateId, "respondState", target, value);
};

Game_Action.prototype.onPostDamageStateEffects = function (target, value) {
    var states = this.subject().states();
    var length = states.length;
    for (var i = 0; i < length; ++i) {
        var state = states[i];
        if (!state) continue;
        value = this.establishStateEffects(target, state.id, value);
    }
    return value;
};

Game_Action.prototype.establishStateEffects = function (target, stateId, value) {
    return this.customEffectEval(target, stateId, "establishState", this.subject(), value);
};

//=============================================================================
// Sprite_StateIcon
//=============================================================================

if (!Yanfly.Param.BSCShowEnemyIcon) {
    Sprite_StateIcon.prototype.updateFrame = function () {};
} else {
    Yanfly.BSC.Sprite_StateIcon_initMembers = Sprite_StateIcon.prototype.initMembers;
    Sprite_StateIcon.prototype.initMembers = function () {
        Yanfly.BSC.Sprite_StateIcon_initMembers.call(this);
        this._turnCounterSprite = new Sprite();
        this.addChild(this._turnCounterSprite);
        this._turnCounterSprite.anchor.x = 0.5;
        this._turnCounterSprite.anchor.y = 0.5;
        var w = Window_Base._iconWidth;
        var h = Window_Base._iconHeight;
        this._turnCounterSprite.bitmap = new Bitmap(w, h);
    };

    Yanfly.BSC.Sprite_StateIcon_updateFrame = Sprite_StateIcon.prototype.updateFrame;
    Sprite_StateIcon.prototype.updateFrame = function () {
        Yanfly.BSC.Sprite_StateIcon_updateFrame.call(this);
        if (this._turnCounterSprite) this.updateTurnAndCounter();
    };

    Sprite_StateIcon.prototype.updateTurnAndCounter = function () {
        this._turnCounterSprite.bitmap.clear();
        if (!this._battler) return;
        var group = this._battler.statesAndBuffs();
        if (group.length <= 0) return;
        var state = group[this._animationIndex];
        if (typeof state === "number") {
            if (Yanfly.Param.BSCEnemyBTurn) {
                this.drawBuffTurns(state);
                if (Yanfly.Param.BSCShowBuffRate) {
                    this.drawBuffRate(state);
                }
            }
        } else {
            if (Yanfly.Param.BSCEnemyTurn) this.drawStateTurns(state);
            if (Yanfly.Param.BSCEnemyCounter) this.drawStateCounter(state);
        }
    };

    Sprite_StateIcon.prototype.textColor = function (n) {
        return SceneManager._scene._statusWindow.textColor(n);
    };

    Sprite_StateIcon.prototype.drawStateTurns = function (state) {
        if (!state) return;
        if (!state.showTurns) return;
        if (state.autoRemovalTiming <= 0) return;
        var turns = this._battler.stateTurns(state.id);
        if (turns !== 0 && !turns) return;
        var turns = Yanfly.Util.toGroup(Math.ceil(turns));
        var wx = state.turnBufferX;
        var wy = state.turnBufferY - 2;
        var ww = Window_Base._iconWidth;
        var wh = Window_Base.prototype.lineHeight.call(this);
        var contents = this._turnCounterSprite.bitmap;
        contents.fontSize = state.turnFontSize;
        contents.textColor = this.textColor(state.turnColor);
        contents.drawText(turns, wx, wy, ww, wh, state.turnAlign);
    };

    Sprite_StateIcon.prototype.drawStateCounter = function (state) {
        var value = this._battler.getStateCounter(state.id);
        if (value === undefined) return;
        var settings = state.stateCounterSettings;
        value = Yanfly.Util.toGroup(value);
        var wx = settings.bufferX;
        var wy = settings.bufferY - 2;
        var ww = Window_Base._iconWidth;
        var wh = Window_Base.prototype.lineHeight.call(this);
        var contents = this._turnCounterSprite.bitmap;
        contents.fontSize = settings.size;
        contents.textColor = this.textColor(settings.color);
        contents.drawText(value, wx, wy, ww, wh, settings.align);
    };

    Sprite_StateIcon.prototype.drawBuffTurns = function (paramId) {
        if (!Yanfly.Param.BSCShowTurns) return;
        var turns = this._battler.buffTurns(paramId);
        turns = Yanfly.Util.toGroup(Math.ceil(turns));
        var wx = Yanfly.Param.BSCTurnBufferX;
        var wy = Yanfly.Param.BSCTurnBufferY - 2;
        var ww = Window_Base._iconWidth;
        var wh = Window_Base.prototype.lineHeight.call(this);
        var contents = this._turnCounterSprite.bitmap;
        contents.fontSize = Yanfly.Param.BSCFontSize;
        if (this._battler.isBuffAffected(paramId)) {
            contents.textColor = this.textColor(Yanfly.Param.BSCBuffColor);
        } else {
            contents.textColor = this.textColor(Yanfly.Param.BSCDebuffColor);
        }
        contents.drawText(turns, wx, wy, ww, wh, Yanfly.Param.BSCTurnAlign);
    };

    Sprite_StateIcon.prototype.drawBuffRate = function (paramId) {
        if (!Yanfly.Param.BSCShowTurns) return;
        var value = this._battler.paramBuffRate(paramId);
        var text = Math.floor(value * 100) + "%";
        var wx = Yanfly.Param.BSCCounterBufferX || 0;
        var wy = (Yanfly.Param.BSCCounterBufferY || 8) - 2;
        var ww = Window_Base._iconWidth;
        var wh = Window_Base.prototype.lineHeight.call(this);
        var contents = this._turnCounterSprite.bitmap;
        contents.fontSize = Yanfly.Param.BSCFontSize * 0.75;
        contents.textColor = this.textColor(0);
        contents.drawText(text, wx, wy, ww, wh, "center");
    };
} // Yanfly.Param.BSCShowEnemyIcon

//=============================================================================
// Window_Base
//=============================================================================

Yanfly.BSC.Window_Base_drawActorIcons = Window_Base.prototype.drawActorIcons;
Window_Base.prototype.drawActorIcons = function (actor, wx, wy, ww) {
    ww = ww || 144;
    Yanfly.BSC.Window_Base_drawActorIcons.call(this, actor, wx, wy, ww);
    this.drawActorIconsTurns(actor, wx, wy, ww);
};

Window_Base.prototype.drawActorIconsTurns = function (actor, wx, wy, ww) {
    var iw = Window_Base._iconWidth;
    var icons = actor.allIcons().slice(0, Math.floor(ww / iw));
    var max = icons.length;
    var shownMax = Math.floor(ww / iw);
    for (var i = 0; i < actor.states().length; ++i) {
        if (shownMax <= 0) break;
        var state = actor.states()[i];
        if (state.iconIndex <= 0) continue;
        if (state.autoRemovalTiming > 0) {
            this.drawStateTurns(actor, state, wx, wy);
        }
        this.drawStateCounter(actor, state, wx, wy);
        wx += iw;
        --shownMax;
    }
    for (var i = 0; i < 8; ++i) {
        if (shownMax <= 0) break;
        if (actor._buffs[i] === 0) continue;
        this.drawBuffTurns(actor, i, wx, wy);
        if (Yanfly.Param.BSCShowBuffRate) {
            this.drawBuffRate(actor, i, wx, wy);
        }
        wx += iw;
        --shownMax;
    }
    this.resetFontSettings();
    this.resetTextColor();
};

Window_Base.prototype.drawStateTurns = function (actor, state, wx, wy) {
    if (!state.showTurns) return;
    var turns = actor.stateTurns(state.id);
    if (turns !== 0 && !turns) return;
    var turns = Yanfly.Util.toGroup(Math.ceil(turns));
    wx += state.turnBufferX;
    wy += state.turnBufferY;
    this.changePaintOpacity(true);
    this.changeTextColor(this.textColor(state.turnColor));
    this.contents.fontSize = state.turnFontSize;
    this.drawText(turns, wx, wy, Window_Base._iconWidth, state.turnAlign);
    this.resetFontSettings();
    this.resetTextColor();
};

Window_Base.prototype.drawStateCounter = function (actor, state, wx, wy) {
    var value = actor.getStateCounter(state.id);
    if (value === undefined) return;
    var settings = state.stateCounterSettings;
    value = Yanfly.Util.toGroup(value);
    wx += settings.bufferX;
    wy += settings.bufferY;
    this.changePaintOpacity(true);
    this.changeTextColor(this.textColor(settings.color));
    this.contents.fontSize = settings.size;
    this.drawText(value, wx, wy, Window_Base._iconWidth, settings.align);
    this.resetFontSettings();
    this.resetTextColor();
};

Window_Base.prototype.drawBuffTurns = function (actor, paramId, wx, wy) {
    if (!Yanfly.Param.BSCShowTurns) return;
    var turns = Yanfly.Util.toGroup(Math.ceil(actor.buffTurns(paramId)));
    wx += Yanfly.Param.BSCTurnBufferX;
    wy += Yanfly.Param.BSCTurnBufferY;
    this.changePaintOpacity(true);
    this.contents.fontSize = Yanfly.Param.BSCFontSize;
    if (actor.isBuffAffected(paramId)) {
        this.changeTextColor(this.textColor(Yanfly.Param.BSCBuffColor));
    } else {
        this.changeTextColor(this.textColor(Yanfly.Param.BSCDebuffColor));
    }
    var align = Yanfly.Param.BSCTurnAlign;
    this.drawText(turns, wx, wy, Window_Base._iconWidth, align);
    this.resetFontSettings();
    this.resetTextColor();
};

Window_Base.prototype.drawBuffRate = function (actor, paramId, wx, wy) {
    var value = actor.paramBuffRate(paramId);
    if (value === undefined) return;
    value = Math.floor(value * 100) + "%";
    this.contents.fontSize = (Yanfly.Param.BSCCounterSize || 16) * 0.75;
    wx += Yanfly.Param.BSCCounterBufferX || 0;
    wy += Yanfly.Param.BSCCounterBufferY || 8;
    this.changePaintOpacity(true);
    this.drawText(value, wx, wy, Window_Base._iconWidth, "center");
    this.resetFontSettings();
    this.resetTextColor();
};

//=============================================================================
// Window_Help
//=============================================================================

if (Imported.YEP_BattleEngineCore) {
    Yanfly.BSC.Window_Help_drawBattler = Window_Help.prototype.drawBattler;
    Window_Help.prototype.drawBattler = function (battler) {
        this.resetFontSettings();
        var length = battler.allIcons().length;
        if (length <= 0) {
            Yanfly.BSC.Window_Help_drawBattler.call(this, battler);
        } else {
            this.drawBattlerWithIcons(battler);
        }
    };

    Window_Help.prototype.drawBattlerWithIcons = function (battler) {
        var icons = battler.allIcons();
        var text = battler.name();
        var wx = 0;
        var wy = 0;
        this.drawText(text, wx, wy, this.contents.width, "center");
        wy += this.lineHeight();
        var ww = icons.length * Window_Base._iconWidth;
        ww = Math.min(ww, this.contents.width);
        wx = (this.contents.width - ww) / 2;
        this.drawActorIcons(battler, wx, wy, ww);
    };
} // Imported.YEP_BattleEngineCore

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

if (!Yanfly.Util.toGroup) {
    Yanfly.Util.toGroup = function (inVal) {
        return inVal;
    };
}

Yanfly.Util.displayError = function (e, code, message) {
    console.log(message);
    console.log(code || "NON-EXISTENT");
    console.error(e);
    if (Utils.isNwjs() && Utils.isOptionValid("test")) {
        if (!require("nw.gui").Window.get().isDevToolsOpen()) {
            require("nw.gui").Window.get().showDevTools();
        }
    }
};

//=============================================================================
// End of File
//=============================================================================
