//=============================================================================
// Yanfly Engine Plugins - Battle Engine Extension - Counter Control
// YEP_X_CounterControl.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_CounterControl = true;

var Yanfly = Yanfly || {};
Yanfly.Counter = Yanfly.Counter || {};
Yanfly.Counter.version = 1.07;

//=============================================================================
/*:
 * @plugindesc v1.07 反击控制
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Queue Max
 * @desc What's the maximum size for the counter queue?
 * @default 20
 *
 * @param ---Default Traits---
 * @default
 *
 * @param Counter Skill
 * @desc This is the default skill used for counterattacks.
 * Insert the skill ID here. Use 0 for the MV default.
 * @default 1
 *
 * @param Evade Counter
 * @desc Counter skills to evade,then counter by default?
 * NO - false     YES - true
 * @default false
 *
 * @param Counter Name
 * @desc The default counter skill name used per skill.
 * %1 - Skill Name
 * @default Counter-%1
 *
 * @param Counter Icon
 * @desc The icon ID used for counter attacks. Leave at 0
 * to use the default skill's icon.
 * @default 78
 *
 * @param Counter Total
 * @desc Default amount of counters per actor and enemy.
 * @default 1
 *
 * @param Ally Counter
 * @desc Allow allies to counter the actions of other allies?
 * NO - false     YES - true
 * @default false
 *
 * @param --Default Conditions-
 * @default
 *
 * @param Physical
 * @desc Require the countered action to be physical?
 * NO - false     YES - true
 * @default true
 *
 * @param Single Target
 * @desc Require the countered action scope to be single target?
 * NO - false     YES - true
 * @default true
 *
 * @param Not Counter
 * @desc Require the countered action to not be a counter?
 * NO - false     YES - true
 * @default false
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * 这个插件需要 YEP_BattleEngineCore。确保他放在 YEP_BattleEngineCore下面
 *
 * 如果你使用了YEP_X_BattleSysATB或者YEP_X_BattleSysCTB，请放在他们下面
 *
 * 默认的反击特性没有太多开发设置。这是一个可以躲避敌方攻击并且反击的技能。
 * 这个插件可以让你更好的控制反击方式。
 *
 * ============================================================================
 * Instructions - How Advanced Counters Work
 * ============================================================================
 *
 * A counterattack is an action that serves as a reaction to an action used by
 * an opposing battler unless the action is marked as able of being countered
 * by allied members.反击是作为对一项行动的反馈行动。
 *
 * Now begins a clash between the attacker's anti-counter stat (newly added)
 * against the target's counter stat plus any of the action's modifiers. Once
 * the finalized counter rate is decided, a random number check is made to see
 * if the counter will pass. If it doesn't, no counter will occur. If it does,
 * the next step occurs.当判断反击成功时，才会行动
 *
 * The target will then generate a pool of skills it can use as counters. It
 * will go in a priority list mentioned in the next section below. The battle
 * system will then go through the pool of skills in order and select the first
 * counter skill that meets all of the conditions required. If no skill is
 * selected, no skill will be used as a counter. All skills have a mandatory
 * requirement of being able to pay the skill's cost and can use it.
 * 将会从反击技能池选择技能进行反击
 * 
 * Once the skill is selected, the counter skill is placed in the counter 
 * queue and waits for the current attacker's turn to be over. Once over, 
 * the actions in the counter queue will begin. The counterattacker will 
 * perform counter actions without conflicting with their own turns. 
 * This process will repeat itself until the counter queue is emptied.
 * 选择技能后，反击技能将被放置在反击队列中，并等待当前攻击者的回合结束。
 * 结束后，反击队列中的操作将开始。反击者将执行反击动作，而不会与自己
 * 的回合发生冲突。此过程将重复，直到反击队列被清空。
 *
 * During the counter queue process, counter skills can trigger counter skills,
 * too. For that reason, there is a maximum queue size determined by the plugin
 * parameters. Once the queue count reaches this size, no more counter skills
 * will be added to the counter queue.反击也可以诱发反击，你可以设置最大值
 *
 * ============================================================================
 * Instructions - Counter Skill Priority List
 * ============================================================================
 *
 * 技能池产生后，执行顺序如下： 
 *
 * 1. States - 从高优先度的状态到低优先度状态 
 * 2. States - 从高优先度的状态到低优先度状态 
 * 3. Equipment - 武器标签
 * 4. Equipment - 装备标签
 * 5. Actor - 职业标签
 * 6. Actor - 角色标签
 * 7. Enemy - 敌人标签
 *
 * The order of the pool of counter skills matter in that when going through
 * the conditions of the counter skill to be used, the first counter skill
 * whose condition is met will be the one used.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * 使用下面标签设置
 *
 * Actor and Enemy Notetags:
 *
 *   <Default Counter: x>
 *   <Default Counter: name> 默认反击技能
 *   Sets the default counter skill to x. If it is left as 0, then the counter
 *   skill will be RPG Maker MV's default counter skill. If you are using the
 *   name of the skill, and there are multiple skills in the database with the
 *   same name, then priority will be given to the skill with the highest ID.
 *   *Note: Use 0 for x if you wish to add RPG Maker MV's default counter.
 *   将默认反击技能设置为 x。如果保留为 0，则反击技能将是 RPG Maker MV 的默认反击技能。
 *   如果您使用的是技能名称，并且数据库中有多个同名的技能，则 ID 最高的技能将优先。
 *   注意：如果您希望添加 RPG Maker MV 的默认反击，请使用 0 替换 x。
 * 
 * Actor, Class, Enemy, Weapon, Armor, and State Notetags:
 *
 *   <Counter Skills: x>
 *   <Counter Skills: x, x, x>
 *   <Counter Skills: x to y> 反击技能表
 *   This will add to the list of possible counter skills for the battler.
 *   If multiple skill ID's are listed, then they're all added. Priority will
 *   be given to the counter skills listed earlier.
 *   *Note: Use 0 for x if you wish to add RPG Maker MV's default counter.
 *   *Note2: See the Counter List priority to see which skills will be given
 *   priority on the counter skill list.
 *   这将添加到战斗者可能的反击技能列表中。
 *   如果列出了多个技能 ID，则会将它们全部添加。将优先考虑前面列出的反击技能。
 *   注意：如果您希望添加 RPG Maker MV 的默认反击，请使用 0 表示 x。
 *   注2：查看反击列表优先级，查看反击技能列表中哪些技能将优先。
 *
 *   <Counter Skill: name> 反击技能表
 *   This will add the named skill to the list of possible counter skills for
 *   the battler. If there are multiple skills in the database with the same
 *   name, then priority will be given to the skill with the highest ID.
 *   *Note: See the Counter List priority to see which skills will be given
 *   priority on the counter skill list.
 *   这会将命名的技能添加到战斗人员可能的反击技能列表中。如果数据库中有多个同名的技能，
 *   则将优先考虑 ID 最高的技能。
 *   *注意：请参阅反击列表优先级，查看反击技能列表中将优先考虑哪些技能。
 *
 *   <Counter Total: +x>
 *   <Counter Total: -x> 反击次数
 *   Alters the number of times the battler can counter by x. This is the
 *   amount of times the battler can counter until the battler's turn comes up
 *   at which, the number of times is reset.
 *   改变战斗者可以反击的次数 x 次。这是战斗者可以反击的次数，直到战斗者回合出现，重置次数。
 * 
 *   <Target Counter: x%> 目标反击率
 *   When this battler attacks an opponent target, this will cause the target
 *   counter rate to be altered by x% rate. If a target has 10% CNT, then a
 *   notetag of 50% will cause the counter rate to become 5%.
 *   当该战斗者攻击敌方目标时，这将导致目标反击率改变 x% 率。
 *   如果目标具有 10% 的 反击率，则 50% 的 notetag 将导致目标反击率变为 5%。
 *
 *   <Target Counter: +x%>
 *   <Target Counter: -x%> 目标反击率
 *   When this battler attacks an opponent target, this will cause the target
 *   counter rate to increase or decrease by x%. If a target has 10% CNT, then
 *   a notetag of +50% will cause the counter rate to become +60%.
 *   当该战斗者攻击敌方目标时，这将导致目标反击率增加或减少 x%。
 *   如果目标具有 10% 的 反击率，则 +50% 的 notetag 将导致反击率变为 +60%。

 *   <Evade Counter> 躲避反击
 *   This will change all counter skills used by the related battler to become
 *   evade counters regardless of their default nature. However, if the battler
 *   is affected by a trait that is <Hit Counter>, then priority will be given
 *   to the <Hit Counter> trait instead.
 *   这将改变相关战斗者使用的所有反击技能，使其成为闪避反击，无论其默认性质如何。
 *   但是，如果战斗人员受到<命中反击>特性的影响，则将优先考虑<命中反击>特性。
 *
 *   <Hit Counter> 命中反击
 *   This will change all counter skills used by the related battler to become
 *   hit counters regardless of their default nature. If the battler is also
 *   affected by <Evade Counter>, this effect will take priority.
 *   这将改变相关战斗者使用的所有反击技能，使其成为命中反击，无论其默认性质如何。
 *   如果战斗者也受到<闪避反击>的影响，则本效果将优先。
 *
 * Skill and Item Notetags:
 *
 *   <Ally Counter> 可以被队员用来反击
 *   Makes this action able to proc counter skills by allied members.
 *
 *   <Ally Cannot Counter> 不可以被队员用来反击
 *   Makes this action unable to proc counter skills by allied members.
 *
 *   <Cannot Counter> 不能反击
 *   Causes this action to be un-counterable. This means that it will always
 *   return a 0% counterattack possibility.
 *   导致此操作不可反击。这意味着它将始终返回 0% 的反击可能性。
 *
 *   <Counter Rate: x%> 反击概率
 *   This will cause this action to proc a counter from the target by x% rate.
 *   This means if the target has a 10% chance to counter and this notetag is
 *   50%, then the target will have a 5% chance to counter.
 *   将目标对此次行动的反击概率乘以设定的比率 x%。
 *   这意味着如果目标有 10% 的反击几率，而这个注释标签是 50%，那么目标将有 5% 的反击几率。
 *
 *   <Counter Rate: +x%>
 *   <Counter Rate: -x%> 反击概率
 *   This will cause this action to proc a counter from the target by an
 *   additive x%. This means if the target has a 10% chance to counter and this
 *   notetag is +50%, then the target has a 60% chance to counter.
 *   将目标对此次行动的反击概率乘以设定的几率 x%。
 *   这意味着如果目标有 10% 的反击几率，而此注释标签为 +50%，那么目标有 60% 的反击几率。
 *
 * Skill Notetags:
 *
 *   <Evade Counter> 躲避后反击
 *   If this skill is being used as the counter skill, the battler will evade
 *   the current action and then counter.
 *   如果此技能用作反击技能，则战斗者在触发闪避效果后进行反击。
 *
 *   <Hit Counter> 伤害后反击
 *   If this skill is being used as the counter skill, the battler will take
 *   the hit against the current action and then counter.
 *   如果此技能用作反击技能，则战斗者在被命中后进行反击。
 *
 *   <Counter Name: text> 反击技能名
 *   This changes the displayed name of the skill when used as a counter skill
 *   to 'text'.
 *   将当前技能用作反击技能时，技能的显示名称更改为“text”。
 *
 *   <Counter Icon: x> 反击技能图标
 *   This changes the displayed icon of the skill when used as a counter skill
 *   to x icon.
 *   将当前技能用作反击技能时，技能的显示图标更改为x号图标。
 * 
 * ============================================================================
 * Notetags - Counter Conditions
 * ============================================================================
 *
 * When making your counter skills, you can have those counter skills respond
 * only to specific conditions. If all conditions are met, the counter skill
 * will occur. If a single condition isn't met, that counter skill will then be
 * skipped and the next one will be checked. To add counter conditions, use the
 * following notetags:
 * 在制作反击技能时，您可以让这些反击技能仅对特定条件做出反应。
 * 如果满足所有条件，则会出现反击技能。如果不满足单个条件，则将跳过该反击技能，
 * 并检查下一个反击技能。要添加反击条件，请使用以下 notetags
 * 设置反击条件
 *
 * Skill Notetags:
 *
 *   <Counter Condition>
 *    condition
 *    condition
 *   </Counter Condition>
 *   Replace the 'condition' text in between the notetags with the listed in
 *   the conditions list below to best fit what you want.
 *   将注释标签之间的“条件”文本替换为下面条件列表中列出的文本，以最适合您的需求。
 *
 * --- Example ---
 *
 *   <Counter Condition>
 *    physical hit
 *    single target
 *   </Counter Condition> 单一目标物理伤害后反击
 *   This skill will only be used as a counter skill if the current action is
 *   a physical hit that's single target.
 *   仅当当前动作是单个目标的物理命中时，此技能才会用作反击技能。
 *
 * ============================================================================
 * Counter Condition List
 * ============================================================================
 *
 * Here is a list of all the counter conditions that come with this plugin that
 * you can use. Keep in mind that all of the counter conditions must be met
 * before a counter will take effect. If even a single counter condition fails
 * to be met, the counter skill will not proc.
 * 以下是您可以使用的此插件附带的所有反击条件的列表。
 * 请记住，在反击生效之前，必须满足所有反击条件。
 * 如果连一个反击条件都无法满足，反击技能也不会触发。
 * 
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * ATTACKER param eval
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Replace 'param' with 'level', 'maxhp', 'hp', 'maxmp', 'mp', 'atk', 'def',
 * 'mat', 'mdf', 'agi', or 'luk'. This will run a check against the attacker's
 * parameter. If the check returns 'true', the counter condition is met. If it
 * returns 'false', the counter condition isn't met.
 * 将 'param' 替换为 'level'、'maxhp'、'hp'、'maxmp'、'mp'、'atk'、'def'、
 * 'mat'、'mdf'、'agi' 或 'luk'。这将对攻击者的参数进行检查。
 * 如果检查返回“true”，则满足反击条件。如果返回“false”，则不满足反击条件。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Attacker level > 50
 *            Attacker hp <= attacker.mhp * 0.50
 *            Attacker atk > defender.def
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * CERTAIN HIT
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If the current action used against the target is a certain hit, the counter
 * condition is met. If it isn't, the counter condition isn't met.
 * 如果当前对目标使用的操作是必定命中，则满足反击条件。如果不是，则不满足反击条件。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Certain Hit
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * COUNTER HIT
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If the current action used against the target is a counter skill, the
 * counter condition is met. If it isn't, the counter condition isn't met.
 * 如果当前针对目标使用的动作是反击技能，则满足反击条件。否则，则不满足反条件。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Counter Hit
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * DEFENDER param eval
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Replace 'param' with 'level', 'maxhp', 'hp', 'maxmp', 'mp', 'atk', 'def',
 * 'mat', 'mdf', 'agi', or 'luk'. This will run a check against the defender's
 * parameter. If the check returns 'true', the counter condition is met. If it
 * returns 'false', the counter condition isn't met.
 * 将“参数”替换为“level”、“maxhp”、“hp”、“maxmp”、“mp”、“atk”、“def”、“mat”、
 * “mdf”、“agi”或“luk”。这将针对防御者的参数运行检查。
 * 如果检查返回“true”，则满足反击条件。如果它返回“false”，则不满足反击条件。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Defender level > 50
 *            Defender hp <= defender.mhp * 0.50
 *            Defender atk > attacker.def
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * ELEMENT: x
 * ELEMENT: name
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If the current action used against the target has element X attached to it,
 * the counter condition is met. If it isn't, the counter condition isn't met.
 * Replace 'x' with the element ID or the element name in the database system
 * tab. If multiple elements share the same name, priority will be given to the
 * element with the highest ID.
 * 如果对目标使用的当前操作附加了伤害属性 X，则满足反击条件。如果不是，
 * 则不满足反击条件。将“x”替换为数据库系统选项卡中的伤害属性 ID 或伤害属性名称。
 * 如果多个伤害属性共享相同的名称，则将优先考虑具有最高 ID 的伤害属性。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Element: 4
 *            Element: Fire
 *            Element: Ice
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * EVAL: code
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * For those with JavaScript experience, you can use the above line to perform
 * an eval check to see if the conditions are met for the counter skill. If the
 * eval check returns 'true', the condition is met. If it returns 'false', the
 * condition isn't met.
 * 对于那些有 JavaScript 经验的人，您可以使用上面的行执行评估检查，
 * 以查看是否满足反击技能的条件。如果评估检查返回“true”，则满足条件。
 * 如果返回“false”，则不满足条件。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Eval: attacker.name() === 'Harold'
 *            Eval: defender.hpRate() <= 0.50
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * ITEM: x
 * ITEM: name
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If the current aciton used against the target is item x, the counter
 * condition is met. If it isn't, the counter condition isn't met. Replace 'x'
 * with the item ID. If you choose to use the item name, and your database
 * has multiple items with the same name, priority will be given to the item
 * with the highest ID.
 * 如果对目标使用的当前行动是物品 x，则满足反击条件。否则，则不满足反条件。
 * 将“x”替换为商品 ID。如果选择使用物品名称，并且数据库中有多个具有相同名称的物品，
 * 则将优先考虑具有最高 ID 的物品。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Item: 30
 *            Item: Bomb
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * MAGICAL HIT
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If the current action used against the target is a magical hit, the counter
 * condition is met. If it isn't, the counter condition isn't met.
 * 如果当前对目标使用的操作是魔法命中，则满足计数条件。如果不是，则不满足反击条件。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Magical Hit
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * MULTI TARGET
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If the current action used against the target is a multi target action, the
 * counter condition is met. If it isn't, the counter condition isn't met.
 * 如果对目标使用的当前行动是多目标行动，则满足反击条件。如果不是，则不满足反击条件。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Multi Target
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * NOT CERTAIN HIT
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If the current action used against the target is NOT certain hit, the
 * counter condition is met. If it is, the counter condition isn't met.
 * 如果对目标使用的当前操作不是必定命中，则满足反击条件。如果是，则不满足反击条件。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Not Certain Hit
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * NOT COUNTER HIT
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If the current action used against the target is NOT a counter skill, the
 * counter condition is met. If it is, the counter condition isn't met.
 * 如果当前对目标使用的操作不是反技能，则满足反技能。如果是，则不满足反击条件。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Not Counter Hit
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * NOT ELEMENT: x
 * NOT ELEMENT: name
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If the current action used against the target has element X attached to it,
 * the counter condition is NOT met. If it isn't, the counter condition is met.
 * Replace 'x' with the element ID or the element name in the database system
 * tab. If multiple elements share the same name, priority will be given to the
 * element with the highest ID.
 * 如果对目标使用的当前操作附加了伤害属性 X，则不满足反击条件。
 * 如果不是，则满足反击条件。将“x”替换为数据库系统选项卡中的伤害属性 ID 或伤害属性名称。
 * 如果多个伤害属性共享相同的名称，则将优先考虑具有最高 ID 的伤害属性。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Not Element: 4
 *            Not Element: Fire
 *            Not Element: Ice
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * NOT ITEM: x
 * NOT ITEM: name
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If the current aciton used against the target is NOT item x, the counter
 * condition is met. If it is, the counter condition isn't met. Replace 'x'
 * with the item ID. If you choose to use the item name, and your database
 * has multiple items with the same name, priority will be given to the item
 * with the highest ID.
 * 如果当前用于目标的行动不是物品 x，则满足反击条件。
 * 如果是，则不满足反击条件。将“x”替换为物品 ID。
 * 如果选择使用物品名称，并且数据库包含多个同名物品，则将优先考虑具有最高 ID 的物品。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Not Item: 30
 *            Not Item: Bomb
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * NOT MAGICAL HIT
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If the current action used against the target is NOT a magical hit, the
 * counter condition is met. If it is, the counter condition isn't met.
 * 如果当前对目标的动作不是魔法命中，则满足反击条件。如果是，则不满足反击条件。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Not Magical Hit
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * NOT PHYSICAL HIT
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If the current action used against the target is NOT a physical hit, the
 * counter condition is met. If it is, the counter condition isn't met.
 * 如果当前对目标的动作不是物理命中，则满足反击条件。如果是，则不满足反击条件。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Not Physical Hit
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * NOT SKILL: x
 * NOT SKILL: name
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If the current aciton used against the target is NOT skill x, the counter
 * condition is met. If it is, the counter condition isn't met. Replace 'x'
 * with the skill ID. If you choose to use the skill name, and your database
 * has multiple skills with the same name, priority will be given to the skill
 * with the highest ID.
 * 如果当前用于对付目标的动作不是技能 x，则满足反击条件。如果是，则不满足反条件。
 * 将“x”替换为技能 ID。如果您选择使用技能名称，并且您的数据库有多个同名的技能，
 * 则将优先考虑具有最高 ID 的技能。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Not Skill: 50
 *            Not Skill: Firaga
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * NOT STYPE: x
 * NOT STYPE: name
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If the current action used against the target is NOT a skill and skill type
 * x, the counter condition is met. If it isn't the counter condition isn't
 * met. Replace 'x' with the Skill Type ID. If you choose to use the skill type
 * name and your database has multiple skill types with the same name, priority
 * will be given to the skill type with the highest ID.
 * 如果当前针对目标使用的动作不是技能或不属于技能类型 x，则满足反击条件。
 * 如果不是，则不满足反击条件。将“x”替换为技能类型 ID。
 * 如果选择使用技能类型名称，并且数据库中有多个同名的技能类型，
 * 则将优先考虑 ID 最高的技能类型。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Not Stype: 1
 *            Not Stype: Magic
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * PHYSICAL HIT
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If the current action used against the target is a physical hit, the counter
 * condition is met. If it isn't, the counter condition isn't met.
 * 如果当前对目标的动作是物理命中，则满足反击条件。如果不是，则不满足反击条件。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Physical Hit
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * RANDOM: x%
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This will run a random check. There is a x% chance that this counter check
 * will pass. If it passes, the counter condition is met. If it doesn't, the
 * counter condition isn't met.
 * 这将运行随机检查。此反击检查有 x% 的机会通过。
 * 如果通过，则满足反击条件。如果不满足，则不满足反击条件。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Random: 30%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * SINGLE TARGET
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If the current action used against the target is a single target action, the
 * counter condition is met. If it isn't, the counter condition isn't met.
 * 如果对目标使用的当前行动是单一目标行动，则满足反击条件。
 * 如果不是，则不满足反击条件。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Single Target
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * SKILL: x
 * SKILL: name
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If the current aciton used against the target is skill x, the counter
 * condition is met. If it isn't, the counter condition isn't met. Replace 'x'
 * with the skill ID. If you choose to use the skill name, and your database
 * has multiple skills with the same name, priority will be given to the skill
 * with the highest ID.
 * 如果当前用于对付目标的动作是技能 x，则满足反击条件。如果不是，则不满足反条件。
 * 将“x”替换为技能 ID。如果您选择使用技能名称，并且您的数据库有多个同名的技能，
 * 则将优先考虑具有最高 ID 的技能。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Skill: 50
 *            Skill: Firaga
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * STYPE: x
 * STYPE: name
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If the current action used against the target is a skill and skill type x,
 * the counter condition is met. If it isn't the counter condition isn't met.
 * Replace 'x' with the Skill Type ID. If you choose to use the skill type name
 * and your database has multiple skill types with the same name, priority will
 * be given to the skill type with the highest ID.
 * 如果当前针对目标使用的动作是技能和技能类型 x，则满足反击条件。
 * 如果不是，则不满足反击条件。将“x”替换为技能类型 ID。
 * 如果选择使用技能类型名称，并且数据库中有多个同名的技能类型，
 * 则将优先考虑 ID 最高的技能类型。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Stype: 1
 *            Stype: Magic
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * SWITCH x OFF
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If switch x is OFF (false) prior to the current action being used against
 * the target, the counter condition is met. If it is ON (true), the counter
 * condition isn't met.
 * 如果开关 x 在对目标使用当前操作之前处于 OFF （false），
 * 则满足反击条件。如果为 ON （true），则不满足反击条件。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Switch 10 Off
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * SWITCH x ON
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If switch x is ON (ftrue) prior to the current action being used against
 * the target, the counter condition is met. If it is OFF (false), the counter
 * condition isn't met.
 * 如果开关 x 在对目标使用当前操作之前处于 ON （true），
 * 则满足反击条件。如果为 OFF （false），则不满足反击条件。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Switch 10 On
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * VARIABLE x eval
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This runs an eval check against variable x. If the eval check returns 'true'
 * the condition is met. If it returns 'false' then the condition isn't met.
 * 这将对变量 x 运行评估检查。如果评估检查返回“true”，则满足条件。
 * 如果它返回“false”，则不满足条件。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Variable 15 >= 15
 *            Variable 16 <= 20
 *            Variable 17 === $gameParty.aliveMembers().length
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * ============================================================================
 * Lunatic Mode - Custom Counter Skills
 * ============================================================================
 *
 * For those with JavaScript proficiency, you can use the following Lunatic
 * Mode notetags to give a dynamic set of skills granted for counter usage.
 * 对于那些精通 JavaScript 的人，您可以使用以下 Lunatic Mode 注释标签来提供
 * 一组动态技能，以授予反击使用。
 *
 * Actor, Class, Enemy, Weapon, Armor, and State Notetags:
 *
 *   <Custom Counter Skills>
 *    if (user.name() === 'Harold') {
 *      skills.push(50, 51, 52);
 *    } else if (user.name() === 'Therese') {
 *      skills.push(53, 54, 55);
 *    } else if (user.name() === 'Marsha') {
 *      skills.push(56, 57, 58);
 *    } else if (user.name() === 'Lucius') {
 *      skills.push(59, 60, 61);
 *    }
 *   </Custom Counter Skills>
 *   The 'skills' variable is an array that will contain all the counter skills
 *   that will be added to the list of potential skills the battler can counter
 *   actions with provided that their requirements are met.
 *   “Skills”变量是一个数组，其中包含所有反击技能，
 *   这些技能将被添加到战斗者可以反击的潜在技能列表中，前提是满足其要求。
 *
 * ============================================================================
 * Lunatic Mode - Custom Counter Total
 * ============================================================================
 *
 * For those with JavaScript proficiency, you can use the following Lunatic
 * Mode notetags to give a dynamic counter total bonus:
 * 对于那些精通JavaScript的人，您可以使用以下疯狂模式笔记标签来提供动态反击次数奖励：
 *
 * Actor, Class, Enemy, Weapon, Armor, and State Notetags:
 *
 *   <Custom Counter Total>
 *    value = user.level;
 *   </Custom Counter Total>
 *   The 'value' variable is the total amount of counters is increased or
 *   decreased by. If the total counter value reaches 0 or less than 0 for the
 *   battler, the battler is unable to use counter skills.
 *   “value”变量是反击次数总数增加或减少。如果战斗者的总反击次数达到 0 或小于 0，
 *   则战斗者无法使用战斗技能。
 *
 *
 * ============================================================================
 * Lunatic Mode - Custom Target Counter Rate
 * ============================================================================
 *
 * For those with JavaScript proficiency, you can use the following Lunatic
 * Mode notetags to make the attacker's traits alter the target's CNT rate.
 * 对于那些精通JavaScript的人，您可以使用以下疯狂模式笔记标签来使攻击者的特征
 * 改变目标的反击率。
 *
 * Actor, Class, Enemy, Weapon, Armor, and State Notetags:
 *
 *   <Custom Target Counter Rate>
 *    rate -= user.hpRate();
 *   </Custom Target Counter Rate>
 *   The 'rate' variable is the final rate used to determine the counter rate
 *   the target has. It is already given the value calculated from the target's
 *   CNT value. This is calculated before the skill's custom counter rate.
 *   “反击率”变量是用于确定目标的反击利率的最终利率。
 *   它已经被赋予了根据目标反击率值计算得出的值。
 *   这是在技能的自定义反击率之前计算的。
 *
 * ============================================================================
 * Lunatic Mode - Custom Counter Rates
 * ============================================================================
 *
 * For those with JavaScript proficiency, you can use the following Lunatic
 * Mode notetags to give skills a dynamic chance for the target to counter.
 *
 * Skill and Item Notetags:
 *
 *   <Custom Counter Rate>
 *    rate += target.hpRate();
 *   </Custom Counter Rate>
 *   The 'rate' variable is the final rate used to determine the counter rate
 *   the target has. It is already given the value calculated from the target's
 *   CNT value plus any additional counter rate modifiers from the skill. This
 *   is calculated after the attacker's custom target counter rate.
 *   “rate”变量是用于确定目标反击率的最终几率。它已经给出了根据目标的 CNT 值
 *   加上技能中的任何其他反击率修饰符计算的值。
 *   这是在攻击者的自定义目标反击率之后计算的。
 *
 * ============================================================================
 * Lunatic Mode - Custom Counter Condition
 * ============================================================================
 *
 * For those with JavaScript proficiency, you can use the following Luantic
 * Mode notetags to give counter skills a custom counter condition. While you
 * can do the same with an Eval condition, this notetag is for those who prefer
 * to take control over everything at once.
 * 对于精通 JavaScript 的人，您可以使用以下 Luantic 模式笔记标签为反击技能
 * 提供自定义反击条件。虽然您可以对 Eval 条件执行相同的操作，
 * 但此 notetag 适用于那些喜欢一次控制所有内容的人。
 * 
 * Skill Notetags:
 *
 *   <Custom Counter Condition>
 *    if (attacker.name() === 'Harold') {
 *      condition = true;
 *    } else if (defender.name() === 'Therese') {
 *      condition = true;
 *    } else {
 *      condition = false;
 *    }
 *   </Custom Counter Condition>
 *   The 'condition' variable determines whether or not the counter skill will
 *   pass or fail. If the 'condition' variable returns 'true', the condition is
 *   met. If the 'condition' variable returns 'false', the condition fails to
 *   be met. Once the condition is met, the rest of the <Counter Condition>
 *   conditions will be checked.
 *   “condition”变量确定反击技能是通过还是失败。
 *   如果“condition”变量返回“true”，则满足反击条件。
 *   如果“condition”变量返回“false”，则无法满足反击条件。
 *   满足当前反击条件后，将检查其余的<反击条件>条件。
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.07:
 * - Lunatic Mode fail safes added.
 * 
 * Version 1.06:
 * - Updated for RPG Maker MV version 1.3.2.
 *
 * Version 1.05:
 * - Fixed a bug that caused the Eval: condition to not work and crash.
 * - Fixed an issue that caused default counter attacks to trigger upon magical
 * actions.
 *
 * Version 1.04:
 * - Fixed a bug that caused counter-countered actions to no longer disappear
 * from queue.
 *
 * Version 1.03:
 * - Fixed a bug that caused enemies to get a free action after a counter in
 * the DTB engine.
 *
 * Version 1.02:
 * - Fixed a bug that didn't replace the proper skill for the countered battler
 * appropriate causing some action effects to not proc correctly.
 *
 * Version 1.01:
 * - Fixed a bug that caused the <Counter Skills: 0> notetag to not work.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Imported.YEP_BattleEngineCore) {
    //=============================================================================
    // Parameter Variables
    //=============================================================================

    Yanfly.Parameters = PluginManager.parameters("YEP_X_CounterControl");
    Yanfly.Param = Yanfly.Param || {};

    Yanfly.Param.CounterMaxQueue = Number(Yanfly.Parameters["Queue Max"]);

    Yanfly.Param.CounterDefault = Number(Yanfly.Parameters["Counter Skill"]);
    Yanfly.Param.CounterEvade = eval(String(Yanfly.Parameters["Evade Counter"]));
    Yanfly.Param.CounterFmt = String(Yanfly.Parameters["Counter Name"]);
    Yanfly.Param.CounterIcon = Number(Yanfly.Parameters["Counter Icon"]);
    Yanfly.Param.CounterTotal = Number(Yanfly.Parameters["Counter Total"]);
    Yanfly.Param.CounterAllyCnt = eval(String(Yanfly.Parameters["Ally Counter"]));

    Yanfly.Param.CounterConditions = [];
    if (eval(String(Yanfly.Parameters["Physical"]))) {
        Yanfly.Param.CounterConditions.push("PHYSICAL HIT");
    }
    if (eval(String(Yanfly.Parameters["Single Target"]))) {
        Yanfly.Param.CounterConditions.push("SINGLE TARGET");
    }
    if (eval(String(Yanfly.Parameters["Not Counter"]))) {
        Yanfly.Param.CounterConditions.push("NOT COUNTER HIT");
    }

    //=============================================================================
    // DataManager
    //=============================================================================

    Yanfly.Counter.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function () {
        if (!Yanfly.Counter.DataManager_isDatabaseLoaded.call(this)) return false;
        if (!Yanfly._loaded_YEP_X_CounterControl) {
            this.processCounterNotetagsI($dataItems);
            this.processCounterNotetagsW($dataWeapons);
            this.processCounterNotetagsA($dataArmors);
            this.processCounterNotetagsS($dataSkills);
            this.processCounterNotetagsT($dataStates);
            this.processCounterNotetagsSys($dataSystem);
            this.processCounterNotetags1($dataActors);
            this.processCounterNotetags1($dataEnemies);
            this.processCounterNotetags2($dataActors);
            this.processCounterNotetags2($dataClasses);
            this.processCounterNotetags2($dataEnemies);
            this.processCounterNotetags2($dataWeapons);
            this.processCounterNotetags2($dataArmors);
            this.processCounterNotetags2($dataStates);
            this.processCounterNotetags3($dataSkills);
            this.processCounterNotetags4($dataSkills);
            this.processCounterNotetags4($dataItems);
            Yanfly._loaded_YEP_X_CounterControl = true;
        }
        return true;
    };

    DataManager.processCounterNotetagsI = function (group) {
        if (Yanfly.ItemIdRef) return;
        Yanfly.ItemIdRef = {};
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            if (obj.name.length <= 0) continue;
            Yanfly.ItemIdRef[obj.name.toUpperCase()] = n;
        }
    };

    DataManager.processCounterNotetagsW = function (group) {
        if (Yanfly.WeaponIdRef) return;
        Yanfly.WeaponIdRef = {};
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            if (obj.name.length <= 0) continue;
            Yanfly.WeaponIdRef[obj.name.toUpperCase()] = n;
        }
    };

    DataManager.processCounterNotetagsA = function (group) {
        if (Yanfly.ArmorIdRef) return;
        Yanfly.ArmorIdRef = {};
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            if (obj.name.length <= 0) continue;
            Yanfly.ArmorIdRef[obj.name.toUpperCase()] = n;
        }
    };

    DataManager.processCounterNotetagsS = function (group) {
        if (Yanfly.SkillIdRef) return;
        Yanfly.SkillIdRef = {};
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            if (obj.name.length <= 0) continue;
            Yanfly.SkillIdRef[obj.name.toUpperCase()] = n;
        }
    };

    DataManager.processCounterNotetagsT = function (group) {
        if (Yanfly.StateIdRef) return;
        Yanfly.StateIdRef = {};
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            if (obj.name.length <= 0) continue;
            Yanfly.StateIdRef[obj.name.toUpperCase()] = n;
        }
    };

    DataManager.processCounterNotetagsSys = function (group) {
        Yanfly.STypeIdRef = {};
        for (var i = 1; i < group.skillTypes.length; ++i) {
            var name = group.skillTypes[i].toUpperCase();
            name = name.replace(/\\I\[(\d+)\]/gi, "");
            Yanfly.STypeIdRef[name] = i;
        }
        Yanfly.ElementIdRef = {};
        for (var i = 1; i < group.elements.length; ++i) {
            var name = group.elements[i].toUpperCase();
            name = name.replace(/\\I\[(\d+)\]/gi, "");
            Yanfly.ElementIdRef[name] = i;
        }
    };

    DataManager.processCounterNotetags1 = function (group) {
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            var notedata = obj.note.split(/[\r\n]+/);

            obj.defaultCounter = Yanfly.Param.CounterDefault;
            obj.counterTotal = Yanfly.Param.CounterTotal;

            for (var i = 0; i < notedata.length; i++) {
                var line = notedata[i];
                if (line.match(/<DEFAULT COUNTER:[ ](\d+)>/i)) {
                    obj.defaultCounter = parseInt(RegExp.$1);
                } else if (line.match(/<DEFAULT COUNTER:[ ](.*)>/i)) {
                    var name = String(RegExp.$1).toUpperCase();
                    var id = Yanfly.SkillIdRef[name];
                    if (id) obj.defaultCounter = id;
                }
            }
        }
    };

    DataManager.processCounterNotetags2 = function (group) {
        var noteA1 = /<(?:COUNTER SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
        var noteA2 = /<(?:COUNTER SKILLS):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            var notedata = obj.note.split(/[\r\n]+/);

            obj.counterSkills = [];
            obj.counterTotal = 0;
            obj.targetCounterRate = 1;
            obj.targetCounterFlat = 0;
            obj.evadeCounter = false;
            obj.hitCounter = false;
            var evalMode = "none";
            obj.counterTotalEval = "";
            obj.counterSkillsEval = "";
            obj.targetCounterRateEval = "";

            for (var i = 0; i < notedata.length; i++) {
                var line = notedata[i];
                if (line.match(noteA1)) {
                    var array = JSON.parse("[" + RegExp.$1.match(/\d+/g) + "]");
                    obj.counterSkills = obj.counterSkills.concat(array);
                } else if (line.match(noteA2)) {
                    var range = Yanfly.Util.getRange(parseInt(RegExp.$1), parseInt(RegExp.$2));
                    obj.counterSkills = obj.counterSkills.concat(range);
                } else if (line.match(/<(?:COUNTER SKILL):[ ](.*)>/i)) {
                    var name = String(RegExp.$1).toUpperCase();
                    var id = Yanfly.SkillIdRef[name];
                    if (id) obj.counterSkills.push(id);
                } else if (line.match(/<(?:COUNTER TOTAL):[ ]([\+\-]\d+)>/i)) {
                    obj.counterTotal = parseInt(RegExp.$1);
                } else if (line.match(/<(?:TARGET COUNTER):[ ](\d+)([%％])>/i)) {
                    obj.targetCounterRate = parseFloat(RegExp.$1) * 0.01;
                } else if (line.match(/<(?:TARGET COUNTER):[ ]([\+\-]\d+)([%％])>/i)) {
                    obj.targetCounterFlat = parseFloat(RegExp.$1) * 0.01;
                } else if (line.match(/<(?:EVADE COUNTER|COUNTER EVADE)>/i)) {
                    obj.evadeCounter = true;
                } else if (line.match(/<(?:HIT COUNTER|COUNTER HIT)>/i)) {
                    obj.hitCounter = true;
                } else if (line.match(/<CUSTOM COUNTER TOTAL>/i)) {
                    evalMode = "custom counter total";
                } else if (line.match(/<\/CUSTOM COUNTER TOTAL>/i)) {
                    evalMode = "none";
                } else if (evalMode === "custom counter total") {
                    obj.counterTotalEval = obj.counterTotalEval + line + "\n";
                } else if (line.match(/<CUSTOM COUNTER SKILLS>/i)) {
                    evalMode = "custom counter skills";
                } else if (line.match(/<\/CUSTOM COUNTER SKILLS>/i)) {
                    evalMode = "none";
                } else if (evalMode === "custom counter skills") {
                    obj.counterSkillsEval = obj.counterSkillsEval + line + "\n";
                } else if (line.match(/<CUSTOM TARGET COUNTER RATE>/i)) {
                    evalMode = "custom target counter rate";
                } else if (line.match(/<\/CUSTOM TARGET COUNTER RATE>/i)) {
                    evalMode = "none";
                } else if (evalMode === "custom target counter rate") {
                    obj.targetCounterRateEval = obj.targetCounterRateEval + line + "\n";
                }
            }
        }
    };

    DataManager.processCounterNotetags3 = function (group) {
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            var notedata = obj.note.split(/[\r\n]+/);

            obj.evadeCounter = Yanfly.Param.CounterEvade;
            obj.counterName = Yanfly.Param.CounterFmt.format(obj.name);
            obj.counterIcon = Yanfly.Param.CounterIcon || obj.iconIndex;
            obj.cannotCounter = false;
            var evalMode = "none";
            obj.counterConditions = Yanfly.Param.CounterConditions.slice();
            obj.counterConditionEval = "";

            for (var i = 0; i < notedata.length; i++) {
                var line = notedata[i];
                if (line.match(/<(?:EVADE COUNTER|COUNTER EVADE)>/i)) {
                    obj.evadeCounter = true;
                } else if (line.match(/<(?:HIT COUNTER|COUNTER HIT)>/i)) {
                    obj.evadeCounter = false;
                } else if (line.match(/<(?:COUNTER NAME):[ ](.*)>/i)) {
                    obj.counterName = String(RegExp.$1);
                } else if (line.match(/<(?:COUNTER ICON):[ ](\d+)>/i)) {
                    obj.counterIcon = String(RegExp.$1);
                } else if (line.match(/<CANNOT COUNTER>/i)) {
                    obj.cannotCounter = true;
                } else if (line.match(/<(?:COUNTER CONDITION|COUNTER CONDITIONS)>/i)) {
                    evalMode = "counter condition";
                    obj.counterConditions = [];
                } else if (line.match(/<\/(?:COUNTER CONDITION|COUNTER CONDITIONS)>/i)) {
                    evalMode = "none";
                } else if (evalMode === "counter condition") {
                    obj.counterConditions.push(line);
                } else if (line.match(/<CUSTOM COUNTER CONDITION>/i)) {
                    evalMode = "custom counter condition";
                } else if (line.match(/<\/CUSTOM COUNTER CONDITION>/i)) {
                    evalMode = "none";
                } else if (evalMode === "custom counter condition") {
                    obj.counterConditionEval = obj.counterConditionEval + line + "\n";
                }
            }
        }
    };

    DataManager.processCounterNotetags4 = function (group) {
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            var notedata = obj.note.split(/[\r\n]+/);

            obj.allyCounter = Yanfly.Param.CounterAllyCnt;
            obj.cannotCounter = false;
            obj.counterRate = 1;
            obj.counterMod = 0;
            var evalMode = "none";
            obj.counterRateEval = "";

            for (var i = 0; i < notedata.length; i++) {
                var line = notedata[i];
                if (line.match(/<ALLY COUNTER>/i)) {
                    obj.allyCounter = true;
                } else if (line.match(/<ALLY CANNOT COUNTER>/i)) {
                    obj.allyCounter = false;
                } else if (line.match(/<CANNOT COUNTER>/i)) {
                    obj.cannotCounter = true;
                } else if (line.match(/<COUNTER RATE:[ ](\d+)([%％])>/i)) {
                    obj.counterRate = parseFloat(RegExp.$1) * 0.01;
                } else if (line.match(/<COUNTER RATE:[ ]([\+\-]\d+)([%％])>/i)) {
                    obj.counterMod = parseFloat(RegExp.$1) * 0.01;
                } else if (line.match(/<CUSTOM COUNTER RATE>/i)) {
                    evalMode = "custom counter rate";
                } else if (line.match(/<\/CUSTOM COUNTER RATE>/i)) {
                    evalMode = "none";
                } else if (evalMode === "custom counter rate") {
                    obj.counterRateEval = obj.counterRateEval + line + "\n";
                }
            }
        }
    };

    //=============================================================================
    // BattleManager
    //=============================================================================

    Yanfly.Counter.BattleManager_initMembers = BattleManager.initMembers;
    BattleManager.initMembers = function () {
        Yanfly.Counter.BattleManager_initMembers.call(this);
        this._counterQueue = [];
        this._counterSequence = 0;
        this._counterOriginalSubject = undefined;
        this._counterOriginalAction = undefined;
        this._countering = false;
    };

    BattleManager.isCountering = function () {
        return this._countering;
    };

    Yanfly.Counter.BattleManager_invokeCounter = BattleManager.invokeCounterAttack;
    BattleManager.invokeCounterAttack = function (subject, target) {
        this._counterQueue = this._counterQueue || [];
        if (this.isValidCounterAction(target)) this._counterSequence += 1;
        if (!this.isMaxCounterQueue()) {
            if (this.isValidCounterAction(target)) target.payCounter();
        }
        if (target.canCounter()) {
            this._counterSkill = this.getCounterSkill(subject, target);
            this._counterQueue = this._counterQueue || [];
            if (this._counterSkill === null) {
                if (this._action.isPhysical() && target.canMove()) {
                    Yanfly.Counter.BattleManager_invokeCounter.call(this, subject, target);
                } else {
                    this.invokeNormalAction(subject, target);
                }
                return;
            } else if (this.evadeAndCounter(subject, target)) {
                target.performEvasion();
                target.forceEvadePopup();
                this.addCounterQueue(subject, target);
            } else if (this._counterSkill !== undefined) {
                this.invokeNormalAction(subject, target);
                this.addCounterQueue(subject, target);
            } else {
                if (this.isValidCounterAction(target)) {
                    target.payCounter(-1);
                    this._counterSequence -= 1;
                }
                this.invokeNormalAction(subject, target);
                return;
            }
            this._logWindow.displayActionResults(target, subject);
            if (subject.isDead()) subject.performCollapse();
        } else {
            this.invokeNormalAction(subject, target);
        }
    };

    BattleManager.getCounterSkill = function (subject, target) {
        target.makeCounterSkills();
        var skills = target.counterSkills();
        var length = skills.length;
        for (var i = 0; i < length; ++i) {
            var skill = skills[i];
            if (this.meetCounterConditions(skill, subject, target)) return skill;
        }
        return undefined;
    };

    BattleManager.meetCounterConditions = function (skill, subject, target) {
        if (skill === null) return true;
        if (!target.canUse(skill)) return false;
        if (!this.meetCounterConditionsEval(skill, subject, target));
        var condition = this.getCounterCondition(skill, subject, target);
        return condition;
    };

    BattleManager.meetCounterConditionsEval = function (skill, subject, target) {
        var action = this._action;
        if (this._action.item().counterConditionEval === "") return true;
        var condition = true;
        var a = subject;
        var user = subject;
        var attacker = subject;
        var b = target;
        var defender = target;
        var item = skill;
        var s = $gameSwitches._data;
        var v = $gameVariables._data;
        var code = this._action.item().counterConditionEval;
        try {
            eval(code);
        } catch (e) {
            Yanfly.Util.displayError(e, code, "COUNTER CONDITIONS EVAL ERROR");
        }
        return condition;
    };

    BattleManager.getCounterCondition = function (skill, subject, target) {
        var conditions = skill.counterConditions;
        var length = conditions.length;
        for (var i = 0; i < length; ++i) {
            var line = conditions[i];
            if (!this.checkCounterLine(line, skill, subject, target)) return false;
        }
        return true;
    };

    BattleManager.checkCounterLine = function (line, skill, subject, target) {
        // EVAL
        if (line.match(/EVAL:[ ](.*)/i)) {
            var value = String(RegExp.$1);
            return this.checkCounterEval(value, skill, subject, target);
            // CERTAIN HIT
        } else if (line.toUpperCase() === "CERTAIN HIT") {
            return this.checkCounterHitType(Game_Action.HITTYPE_CERTAIN);
            // PHYSICAL HIT
        } else if (line.toUpperCase() === "PHYSICAL HIT") {
            return this.checkCounterHitType(Game_Action.HITTYPE_PHYSICAL);
            // MAGICAL HIT
        } else if (line.toUpperCase() === "MAGICAL HIT") {
            return this.checkCounterHitType(Game_Action.HITTYPE_MAGICAL);
            // NOT CERTAIN HIT
        } else if (line.toUpperCase() === "NOT CERTAIN HIT") {
            return !this.checkCounterHitType(Game_Action.HITTYPE_CERTAIN);
            // NOT PHYSICAL HIT
        } else if (line.toUpperCase() === "NOT PHYSICAL HIT") {
            return !this.checkCounterHitType(Game_Action.HITTYPE_PHYSICAL);
            // NOT MAGICAL HIT
        } else if (line.toUpperCase() === "NOT MAGICAL HIT") {
            return !this.checkCounterHitType(Game_Action.HITTYPE_MAGICAL);
            // SINGLE TARGET
        } else if (line.toUpperCase() === "SINGLE TARGET") {
            return this.checkCounterSingleTarget();
            // MULTI TARGET
        } else if (line.toUpperCase() === "MULTI TARGET") {
            return !this.checkCounterSingleTarget();
            // COUNTER HIT
        } else if (line.toUpperCase() === "COUNTER HIT") {
            return !this.checkCounterCounterHit();
            // NOT COUNTER HIT
        } else if (line.toUpperCase() === "NOT COUNTER HIT") {
            return !this.checkCounterCounterHit();
            // RANDOM
        } else if (line.match(/RANDOM:[ ](\d+)([%％])/i)) {
            var value = parseFloat(RegExp.$1) * 0.01;
            return !this.checkCounterRandom(value);
            // NOT ELEMENT
        } else if (line.match(/NOT ELEMENT:[ ](.*)/i)) {
            var value = String(RegExp.$1);
            return !this.checkCounterElement(value);
            // ELEMENT
        } else if (line.match(/ELEMENT:[ ](.*)/i)) {
            var value = String(RegExp.$1);
            return this.checkCounterElement(value);
            // SWITCH ON
        } else if (line.match(/SWITCH[ ](\d+)[ ]ON/i)) {
            var value = parseInt(RegExp.$1);
            return this.checkCounterSwitch(value);
            // SWITCH OFF
        } else if (line.match(/SWITCH[ ](\d+)[ ]OFF/i)) {
            var value = parseInt(RegExp.$1);
            return !this.checkCounterSwitch(value);
            // VARIABLE
        } else if (line.match(/VARIABLE[ ](\d+)[ ](.*)/i)) {
            var varId = parseInt(RegExp.$1);
            var eval = String(RegExp.$2);
            eval = "$gameVariables.value(" + varId + ") " + eval;
            return this.checkCounterEval(eval, skill, subject, target);
            // NOT SKILL
        } else if (line.match(/NOT SKILL:[ ](.*)/i)) {
            var value = String(RegExp.$1);
            return !this.checkCounterSkill(value);
            // SKILL
        } else if (line.match(/SKILL:[ ](.*)/i)) {
            var value = String(RegExp.$1);
            return this.checkCounterSkill(value);
            // NOT STYPE
        } else if (line.match(/NOT STYPE:[ ](.*)/i)) {
            var value = String(RegExp.$1);
            return !this.checkCounterStype(value);
            // STYPE
        } else if (line.match(/STYPE:[ ](.*)/i)) {
            var value = String(RegExp.$1);
            return this.checkCounterStype(value);
            // NOT ITEM
        } else if (line.match(/NOT ITEM:[ ](.*)/i)) {
            var value = String(RegExp.$1);
            return !this.checkCounterItem(value);
            // ITEM
        } else if (line.match(/ITEM:[ ](.*)/i)) {
            var value = String(RegExp.$1);
            return this.checkCounterItem(value);
            // ATTACKER PARAM
        } else if (line.match(/ATTACKER[ ](.*)[ ](.*)/i)) {
            var value1 = String(RegExp.$1);
            var value2 = String(RegExp.$1);
            return this.checkCounterAttacker(value1, value2, skill, subject, target);
            // DEFENDER PARAM
        } else if (line.match(/DEFENDER[ ](.*)[ ](.*)/i)) {
            var value1 = String(RegExp.$1);
            var value2 = String(RegExp.$1);
            return this.checkCounterDefender(value1, value2, skill, subject, target);
            // ELSE - NOTHING LISTED
        } else {
            return true;
        }
    };

    BattleManager.checkCounterEval = function (code, skill, subject, target) {
        var action = this._action;
        var a = subject;
        var user = subject;
        var attacker = subject;
        var b = target;
        var defender = target;
        var item = skill;
        var s = $gameSwitches._data;
        var v = $gameVariables._data;
        var code = line;
        try {
            return eval(code);
        } catch (e) {
            Yanfly.Util.displayError(e, code, "COUNTER CHECK ERROR");
            return false;
        }
    };

    BattleManager.checkCounterHitType = function (value) {
        return this._action.item().hitType === value;
    };

    BattleManager.checkCounterCounterHit = function () {
        return this._action.isCounter();
    };

    BattleManager.checkCounterRandom = function (value) {
        return Math.random() < value;
    };

    BattleManager.checkCounterSingleTarget = function () {
        return this._action.isForOne();
    };

    BattleManager.checkCounterElement = function (value) {
        if (value.match(/(\d+)/i)) {
            var elementId = parseInt(RegExp.$1);
        } else {
            var elementId = Yanfly.ElementIdRef[value.toUpperCase()];
            if (!elementId) return true;
        }
        var actionElement = this._action.item().damage.elementId;
        if (actionElement < 0) {
            return this._subject.attackElements().contains(elementId);
        } else {
            return elementId === actionElement;
        }
    };

    BattleManager.checkCounterSwitch = function (value) {
        return $gameSwitches.value(value);
    };

    BattleManager.checkCounterSkill = function (value) {
        if (!this._action.isSkill()) return false;
        if (value.match(/(\d+)/i)) {
            var skillId = parseInt(RegExp.$1);
        } else {
            var skillId = Yanfly.SkillIdRef[value.toUpperCase()];
        }
        var skill = $dataSkills[skillId];
        return this._action.item() === skill;
    };

    BattleManager.checkCounterStype = function (value) {
        if (!this._action.isSkill()) return false;
        if (value.match(/(\d+)/i)) {
            var stypeId = parseInt(RegExp.$1);
        } else {
            var stypeId = Yanfly.STypeIdRef[value.toUpperCase()];
        }
        var skill = this._action.item();
        return skill.stypeId === stypeId;
    };

    BattleManager.checkCounterItem = function (value) {
        if (!this._action.isItem()) return false;
        if (value.match(/(\d+)/i)) {
            var itemId = parseInt(RegExp.$1);
        } else {
            var itemId = Yanfly.SkillIdRef[value.toUpperCase()];
        }
        var skill = $dataSkills[skillId];
        return this._action.item() === skill;
    };

    BattleManager.checkCounterAttacker = function (v1, v2, skill, subject, target) {
        var eval = "subject.";
        if (["LEVEL", "LV", "LVL"].contains(v1.toUpperCase())) {
            eval += "level";
        } else if (["MAX HP", "MAXHP", "MHP"].contains(v1.toUpperCase())) {
            eval += "mhp";
        } else if (["HP", "CURRENT HP"].contains(v1.toUpperCase())) {
            eval += "hp";
        } else if (["MAX MP", "MAXMP", "MMP"].contains(v1.toUpperCase())) {
            eval += "mmp";
        } else if (["MP", "CURRENT MP"].contains(v1.toUpperCase())) {
            eval += "mp";
        } else if (["ATK", "STR"].contains(v1.toUpperCase())) {
            eval += "atk";
        } else if (["DEF"].contains(v1.toUpperCase())) {
            eval += "def";
        } else if (["MAT", "INT", "SPI"].contains(v1.toUpperCase())) {
            eval += "mat";
        } else if (["MDF", "RES"].contains(v1.toUpperCase())) {
            eval += "mdf";
        } else if (["AGI", "SPD"].contains(v1.toUpperCase())) {
            eval += "agi";
        } else if (["LUK"].contains(v1.toUpperCase())) {
            eval += "luk";
        } else {
            return false;
        }
        eval += " " + v2;
        return this.checkCounterEval(eval, skill, subject, target);
    };

    BattleManager.checkCounterDefender = function (v1, v2, skill, subject, target) {
        var eval = "target.";
        if (["LEVEL", "LV", "LVL"].contains(v1.toUpperCase())) {
            eval += "level";
        } else if (["MAX HP", "MAXHP", "MHP"].contains(v1.toUpperCase())) {
            eval += "mhp";
        } else if (["HP", "CURRENT HP"].contains(v1.toUpperCase())) {
            eval += "hp";
        } else if (["MAX MP", "MAXMP", "MMP"].contains(v1.toUpperCase())) {
            eval += "mmp";
        } else if (["MP", "CURRENT MP"].contains(v1.toUpperCase())) {
            eval += "mp";
        } else if (["ATK", "STR"].contains(v1.toUpperCase())) {
            eval += "atk";
        } else if (["DEF"].contains(v1.toUpperCase())) {
            eval += "def";
        } else if (["MAT", "INT", "SPI"].contains(v1.toUpperCase())) {
            eval += "mat";
        } else if (["MDF", "RES"].contains(v1.toUpperCase())) {
            eval += "mdf";
        } else if (["AGI", "SPD"].contains(v1.toUpperCase())) {
            eval += "agi";
        } else if (["LUK"].contains(v1.toUpperCase())) {
            eval += "luk";
        } else {
            return false;
        }
        eval += " " + v2;
        return this.checkCounterEval(eval, skill, subject, target);
    };

    BattleManager.evadeAndCounter = function (subject, target) {
        if (this._counterSkill === undefined) return false;
        if (this._counterSkill === null) return false;
        if (target.forceHitCounter()) return false;
        if (target.forceEvadeCounter()) return true;
        return this._counterSkill.evadeCounter;
    };

    BattleManager.isValidCounterAction = function (target) {
        if (this._counterQueue.length <= 0) return true;
        return this._counterQueue[0].subject() !== target;
    };

    BattleManager.addCounterQueue = function (subject, target) {
        if (!target.canCounter()) return;
        if (!this.isValidCounterAction(target)) return;
        var action = new Game_Action(target);
        action.setSkill(this._counterSkill.id);
        action.setCounter();
        if (action.isForOpponent()) {
            action.setTarget(subject.index());
        } else {
            action.setTarget(target.index());
        }
        this._counterQueue = this._counterQueue || [];
        this._counterQueue.push(action);
        this._counterOriginalSubject = this._counterOriginalSubject || subject;
        this._counterOriginalAction = this._counterOriginalAction || this._action;
    };

    Yanfly.Counter.BattleManager_createFinishActions = BattleManager.createFinishActions;
    BattleManager.createFinishActions = function () {
        Yanfly.Counter.BattleManager_createFinishActions.call(this);
        this._actionList.push(["START COUNTER PHASE"]);
    };

    Yanfly.Counter.BattleManager_processActionSequence = BattleManager.processActionSequence;
    BattleManager.processActionSequence = function (actionName, actionArgs) {
        // START COUNTER PHASE
        if (actionName === "START COUNTER PHASE") {
            return this.actionStartCounterPhase();
        }
        return Yanfly.Counter.BattleManager_processActionSequence.call(this, actionName, actionArgs);
    };

    BattleManager.isMaxCounterQueue = function () {
        return this._counterSequence > Yanfly.Param.CounterMaxQueue;
    };

    BattleManager.actionStartCounterPhase = function () {
        this._counterQueue = this._counterQueue || [];
        var action = this._counterQueue.shift();
        if (this.isMaxCounterQueue() || !action) {
            this.actionEndCounterPhase();
        } else if (action && action.subject().isDead()) {
            this.actionStartCounterPhase();
        } else {
            this.actionPerformCounterPhase(action);
        }
        this._counterQueue = this._counterQueue || [];
    };

    BattleManager.actionEndCounterPhase = function () {
        this._countering = false;
        if (this._counterOriginalSubject) {
            this._subject = this._counterOriginalSubject;
            this._action = this._counterOriginalAction;
            if (this.isSetCounterOriginal()) {
                this._subject.setCounterAction(this._action);
            }
        }
        this._counterOriginalSubject = undefined;
        this._counterOriginalAction = undefined;
        this._counterSequence = 0;
        this._counterQueue = [];
    };

    BattleManager.isSetCounterOriginal = function () {
        if (this.isDTB()) return false;
        return true;
    };

    BattleManager.actionPerformCounterPhase = function (action) {
        this._countering = true;
        this._subject.removeCounterAction();
        this._subject = action.subject();
        this._action = action;
        var subject = this._subject;
        var targets = action.makeTargets();
        this.setTargets(targets);
        this._allTargets = targets.slice();
        this._individualTargets = targets.slice();
        this._phase = "phaseChange";
        this._phaseSteps = ["setup", "whole", "target", "follow", "finish"];
        this._returnPhase = "";
        this._actionList = [];
        subject.useItem(this._action.item());
        this._action.applyGlobal();
        this._logWindow.startAction(this._subject, this._action, this._targets);
    };

    //=============================================================================
    // Game_BattlerBase
    //=============================================================================

    Yanfly.Counter.Game_BattlerBase_updateStateActionStart = Game_BattlerBase.prototype.updateStateActionStart;
    Game_BattlerBase.prototype.updateStateActionStart = function () {
        if (BattleManager.isCountering()) return;
        Yanfly.Counter.Game_BattlerBase_updateStateActionStart.call(this);
    };

    //=============================================================================
    // Game_Battler
    //=============================================================================

    Yanfly.Counter.Game_Battler_refresh = Game_Battler.prototype.refresh;
    Game_Battler.prototype.refresh = function () {
        this._counterTotalCache = undefined;
        Yanfly.Counter.Game_Battler_refresh.call(this);
    };

    Game_Battler.prototype.counterSkills = function () {
        if (this._counterSkills === undefined || this._counterSkills === []) {
            return [];
        }
        var array = [];
        var length = this._counterSkills.length;
        for (var i = 0; i < length; ++i) {
            var skillId = this._counterSkills[i];
            var skill = $dataSkills[skillId];
            array.push(skill);
        }
        return array;
    };

    Game_Battler.prototype.makeCounterSkills = function () {
        this._counterSkills = [];
        var length = this.states().length;
        for (var i = 0; i < length; ++i) {
            var obj = this.states()[i];
            if (!obj) continue;
            if (obj.counterSkills) {
                Yanfly.Util.extend(this._counterSkills, obj.counterSkills);
            }
            this.extendCounterSkillsEval(obj);
        }
    };

    Game_Battler.prototype.extendCounterSkillsEval = function (obj) {
        if (!obj) return;
        if (!obj.counterSkillsEval) return;
        if (obj.counterSkillsEval === "") return;
        var skills = [];
        var a = this;
        var user = this;
        var subject = this;
        var b = this;
        var target = this;
        var s = $gameSwitches._data;
        var v = $gameVariables._data;
        var code = obj.counterSkillsEval;
        try {
            eval(code);
        } catch (e) {
            Yanfly.Util.displayError(e, code, "COUNTER SKILLS ERROR");
        }
        Yanfly.Util.extend(this._counterSkills, obj.counterSkills);
    };

    Yanfly.Counter.Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
    Game_Battler.prototype.onBattleStart = function () {
        Yanfly.Counter.Game_Battler_onBattleStart.call(this);
        this._counters = 0;
    };

    Yanfly.Counter.Game_Battler_onTurnStart = Game_Battler.prototype.onTurnStart;
    Game_Battler.prototype.onTurnStart = function () {
        Yanfly.Counter.Game_Battler_onTurnStart.call(this);
        this._counters = 0;
    };

    Game_Battler.prototype.counterTotal = function () {
        var value = Yanfly.Param.CounterTotal;
        var length = this.states().length;
        for (var i = 0; i < length; ++i) {
            var obj = this.states()[i];
            if (!obj) continue;
            if (obj.counterTotal) value += obj.counterTotal;
            value += this.getCounterTotalEval(obj);
        }
        return value;
    };

    Game_Battler.prototype.getCounterTotalEval = function (obj) {
        if (!obj) return 0;
        if (!obj.counterTotalEval) return 0;
        if (obj.counterTotalEval === "") return 0;
        var value = 0;
        var a = this;
        var user = this;
        var subject = this;
        var b = this;
        var target = this;
        var s = $gameSwitches._data;
        var v = $gameVariables._data;
        var code = obj.counterTotalEval;
        try {
            eval(code);
        } catch (e) {
            Yanfly.Util.displayError(e, code, "COUNTER TOTAL ERROR");
        }
        return value;
    };

    Game_Battler.prototype.payCounter = function (value) {
        value = value || 1;
        this._counters += value;
    };

    Game_Battler.prototype.canCounter = function () {
        if (!this.canMove()) return false;
        return this.counterTotal() >= this._counters;
    };

    Game_Battler.prototype.targetCounterRate = function () {
        var rate = 1;
        var length = this.states().length;
        for (var i = 0; i < length; ++i) {
            var obj = this.states()[i];
            if (!obj) continue;
            rate *= obj.targetCounterRate;
        }
        return rate;
    };

    Game_Battler.prototype.targetCounterFlat = function () {
        var value = 0;
        var length = this.states().length;
        for (var i = 0; i < length; ++i) {
            var obj = this.states()[i];
            if (!obj) continue;
            value += obj.targetCounterFlat;
        }
        return value;
    };

    Game_Battler.prototype.targetCounterRateEval = function (rate, target, item) {
        var length = this.states().length;
        for (var i = 0; i < length; ++i) {
            var obj = this.states()[i];
            rate = this.getTargetCntRateEval(obj, rate, target, item);
        }
        return rate;
    };

    Game_Battler.prototype.getTargetCntRateEval = function (obj, rate, trg, item) {
        if (!obj) return rate;
        if (!obj.targetCounterRateEval) return rate;
        if (obj.targetCounterRateEval === "") return rate;
        var skill = item;
        var a = this;
        var user = this;
        var subject = this;
        var b = trg;
        var target = trg;
        var s = $gameSwitches._data;
        var v = $gameVariables._data;
        var code = obj.targetCounterRateEval;
        try {
            eval(code);
        } catch (e) {
            Yanfly.Util.displayError(e, code, "TARGET COUNTER RATE ERROR");
        }
        return rate;
    };

    Game_Battler.prototype.forceEvadeCounter = function () {
        var length = this.states().length;
        for (var i = 0; i < length; ++i) {
            var obj = this.states()[i];
            if (!obj) continue;
            if (obj.evadeCounter) return true;
        }
        return false;
    };

    Game_Battler.prototype.forceHitCounter = function () {
        var length = this.states().length;
        for (var i = 0; i < length; ++i) {
            var obj = this.states()[i];
            if (!obj) continue;
            if (obj.hitCounter) return true;
        }
        return false;
    };

    Game_Battler.prototype.forceEvadePopup = function () {
        this._result = new Game_ActionResult();
        this._result.evaded = true;
        this.startDamagePopup();
        this.clearResult();
    };

    Game_Battler.prototype.setCounterAction = function (action) {
        if (!this._originalPreCounterActions) {
            this._originalPreCounterActions = JsonEx.makeDeepCopy(this._actions);
        }
        action.setCounter();
        this.setAction(0, action);
    };

    Game_Battler.prototype.removeCounterAction = function () {
        if (this._originalPreCounterActions) {
            this._actions = JsonEx.makeDeepCopy(this._originalPreCounterActions);
        }
        this._originalPreCounterActions = undefined;
    };

    //=============================================================================
    // Game_Actor
    //=============================================================================

    Game_Actor.prototype.makeCounterSkills = function () {
        Game_Battler.prototype.makeCounterSkills.call(this);
        var length = this.equips().length;
        for (var i = 0; i < length; ++i) {
            var obj = this.equips()[i];
            if (!obj) continue;
            if (obj.counterSkills) {
                Yanfly.Util.extend(this._counterSkills, obj.counterSkills);
            }
            this.extendCounterSkillsEval(obj);
        }
        if (this.currentClass().counterSkills) {
            obj = this.currentClass();
            Yanfly.Util.extend(this._counterSkills, obj.counterSkills);
            this.extendCounterSkillsEval(obj);
        }
        if (this.actor().counterSkills) {
            obj = this.actor();
            Yanfly.Util.extend(this._counterSkills, obj.counterSkills);
            this.extendCounterSkillsEval(obj);
        }
        if (this._counterSkills.length <= 0) {
            this._counterSkills.push(obj.defaultCounter);
        }
    };

    Game_Actor.prototype.counterTotal = function () {
        if (this._counterTotalCache !== undefined) return this._counterTotalCache;
        var value = Game_Battler.prototype.counterTotal.call(this);
        var length = this.equips().length;
        for (var i = 0; i < length; ++i) {
            var obj = this.equips()[i];
            if (!obj) continue;
            if (obj.counterTotal) value += obj.counterTotal;
            value += this.getCounterTotalEval(obj);
        }
        value += this.currentClass().counterTotal;
        value += this.getCounterTotalEval(this.currentClass());
        value += this.actor().counterTotal;
        value += this.getCounterTotalEval(this.actor());
        this._counterTotalCache = value;
        return this._counterTotalCache;
    };

    Game_Actor.prototype.targetCounterRate = function () {
        var rate = Game_Battler.prototype.targetCounterRate.call(this);
        var length = this.equips().length;
        for (var i = 0; i < length; ++i) {
            var obj = this.equips()[i];
            if (!obj) continue;
            rate *= obj.targetCounterRate;
        }
        rate *= this.currentClass().targetCounterRate;
        rate *= this.actor().targetCounterRate;
        return rate;
    };

    Game_Actor.prototype.targetCounterFlat = function () {
        var value = Game_Battler.prototype.targetCounterFlat.call(this);
        var length = this.equips().length;
        for (var i = 0; i < length; ++i) {
            var obj = this.equips()[i];
            if (!obj) continue;
            value += obj.targetCounterFlat;
        }
        value += this.currentClass().targetCounterFlat;
        value += this.actor().targetCounterFlat;
        return value;
    };

    Game_Actor.prototype.targetCounterRateEval = function (rate, target, item) {
        var rate = Game_Battler.prototype.targetCounterRateEval.call(this, rate, target, item);
        var length = this.equips().length;
        for (var i = 0; i < length; ++i) {
            var obj = this.equips()[i];
            rate = this.getTargetCntRateEval(obj, rate, target, item);
        }
        rate = this.getTargetCntRateEval(this.currentClass(), rate, target, item);
        rate = this.getTargetCntRateEval(this.actor(), rate, target, item);
        return rate;
    };

    Game_Actor.prototype.forceEvadeCounter = function () {
        if (Game_Battler.prototype.forceEvadeCounter.call(this)) return true;
        if (this.actor().evadeCounter) return true;
        if (this.currentClass().evadeCounter) return true;
        var length = this.equips().length;
        for (var i = 0; i < length; ++i) {
            var obj = this.equips()[i];
            if (!obj) continue;
            if (obj.evadeCounter) return true;
        }
        return false;
    };

    Game_Actor.prototype.forceHitCounter = function () {
        if (Game_Battler.prototype.forceHitCounter.call(this)) return true;
        if (this.actor().hitCounter) return true;
        if (this.currentClass().hitCounter) return true;
        var length = this.equips().length;
        for (var i = 0; i < length; ++i) {
            var obj = this.equips()[i];
            if (!obj) continue;
            if (obj.hitCounter) return true;
        }
        return false;
    };

    //=============================================================================
    // Game_Enemy
    //=============================================================================

    Game_Enemy.prototype.makeCounterSkills = function () {
        Game_Battler.prototype.makeCounterSkills.call(this);
        if (this.enemy().counterSkills) {
            obj = this.enemy();
            Yanfly.Util.extend(this._counterSkills, obj.counterSkills);
            this.extendCounterSkillsEval(obj);
        }
        if (this._counterSkills.length <= 0) {
            this._counterSkills.push(obj.defaultCounter);
        }
    };

    Game_Enemy.prototype.counterTotal = function () {
        if (this._counterTotalCache !== undefined) return this._counterTotalCache;
        var value = Game_Battler.prototype.counterTotal.call(this);
        value += this.enemy().counterTotal;
        value += this.getCounterTotalEval(this.enemy());
        this._counterTotalCache = value;
        return this._counterTotalCache;
    };

    Game_Enemy.prototype.targetCounterRate = function () {
        var rate = Game_Battler.prototype.targetCounterRate.call(this);
        rate *= this.enemy().targetCounterRate;
        return rate;
    };

    Game_Enemy.prototype.targetCounterFlat = function () {
        var value = Game_Battler.prototype.targetCounterFlat.call(this);
        value += this.enemy().targetCounterFlat;
        return value;
    };

    Game_Enemy.prototype.targetCounterRateEval = function (rate, target, item) {
        var rate = Game_Battler.prototype.targetCounterRateEval.call(this, rate, target, item);
        rate = this.getTargetCntRateEval(this.enemy(), rate, target, item);
        return rate;
    };

    Game_Enemy.prototype.forceEvadeCounter = function () {
        if (Game_Battler.prototype.forceEvadeCounter.call(this)) return true;
        if (this.enemy().evadeCounter) return true;
        return false;
    };

    Game_Enemy.prototype.forceHitCounter = function () {
        if (Game_Battler.prototype.forceHitCounter.call(this)) return true;
        if (this.enemy().hitCounter) return true;
        return false;
    };

    //=============================================================================
    // Game_Action
    //=============================================================================

    Game_Action.prototype.itemCnt = function (target) {
        if (this.item().cannotCounter) return 0;
        if (!this.item().allyCounter) {
            if (target.isActor() === this.subject().isActor()) return 0;
        }
        if (!target.canMove()) return 0;
        if (!target.canCounter()) return 0;
        var rate = target.cnt;
        rate *= this.subject().targetCounterRate();
        rate *= this.item().counterRate;
        rate += this.subject().targetCounterFlat();
        rate += this.item().counterMod;
        rate = this.subject().targetCounterRateEval(rate, target, this.item());
        rate = this.customCounterRateEval(rate, target);
        return rate;
    };

    Game_Action.prototype.customCounterRateEval = function (rate, target) {
        if (this.item().counterRateEval === "") return rate;
        var item = this.item();
        var skill = this.item();
        var a = this.subject();
        var user = this.subject();
        var subject = this.subject();
        var b = target;
        var s = $gameSwitches._data;
        var v = $gameVariables._data;
        var code = this.item().counterRateEval;
        try {
            eval(code);
        } catch (e) {
            Yanfly.Util.displayError(e, code, "COUNTER RATE ERROR");
        }
        return rate;
    };

    if (Imported.YEP_X_BattleSysCTB) {
        Yanfly.Counter.Game_Action_rebalanceCTBSpeed = Game_Action.prototype.rebalanceCTBSpeed;
        Game_Action.prototype.rebalanceCTBSpeed = function (target) {
            if (BattleManager.isCountering()) return;
            Yanfly.Counter.Game_Action_rebalanceCTBSpeed.call(this, target);
        };
    } // Imported.YEP_X_BattleSysCTB

    Yanfly.Counter.Game_Action_clear = Game_Action.prototype.clear;
    Game_Action.prototype.clear = function () {
        Yanfly.Counter.Game_Action_clear.call(this);
        this._isCounter = false;
        this._isForceMiss = false;
    };

    Game_Action.prototype.setCounter = function () {
        this._isCounter = true;
    };

    Game_Action.prototype.isCounter = function () {
        return this._isCounter;
    };

    //=============================================================================
    // Window_BattleLog
    //=============================================================================

    Yanfly.Counter.Window_BattleLog_displayIcon = Window_BattleLog.prototype.displayIcon;
    Window_BattleLog.prototype.displayIcon = function (item) {
        if (BattleManager.isCountering()) return item.counterIcon;
        return Yanfly.Counter.Window_BattleLog_displayIcon.call(this, item);
    };

    Yanfly.Counter.Window_BattleLog_displayText = Window_BattleLog.prototype.displayText;
    Window_BattleLog.prototype.displayText = function (item) {
        if (BattleManager.isCountering()) return item.counterName;
        return Yanfly.Counter.Window_BattleLog_displayText.call(this, item);
    };

    //=============================================================================
    // Utilities
    //=============================================================================

    Yanfly.Util = Yanfly.Util || {};

    Yanfly.Util.extend = function (mainArray, otherArray) {
        otherArray.forEach(function (i) {
            mainArray.push(i);
        }, this);
    };

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
}
