//=============================================================================
// Yanfly Engine Plugins - Job Points
// YEP_JobPoints.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_JobPoints = true;

var Yanfly = Yanfly || {};
Yanfly.JP = Yanfly.JP || {};
Yanfly.JP.version = 1.09;

//=============================================================================
 /*:
 * @plugindesc v1.09 这个插件本身并没有多大作用，但它可以让参与者获得用于其他插件的JP（工作点数）。
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param JP Text
 * @parent ---General---
 * @desc 这会改变你希望JP出现在游戏中的方式。
 * @default JP
 *
 * @param JP Icon
 * @parent ---General---
 * @type number
 * @min 0
 * @desc 这是用于JP的图标。如果不想使用图标，请使用0。
 * @default 188
 *
 * @param Max JP
 * @parent ---General---
 * @type number
 * @min 0
 * @desc 这是职业能拥有的最大JP。如果希望没有限制，请使用0。
 * @default 0
 *
 * @param JP Per Action
 * @parent ---General---
 * @desc 战斗中增加的JP值
 * @default 10 + Math.randomInt(10)
 *
 * @param JP Per Level
 * @parent ---General---
 * @desc 这是演员每升一级获得的JP值。
 * @default 100 + Math.randomInt(100)
 *
 * @param JP Per Enemy
 * @parent ---General---
 * @desc 这是每个被击败的敌人获得的JP值。
 * @default 50 + Math.randomInt(10)
 *
 * @param Show Results
 * @parent ---General---
 * @type boolean
 * @on Show
 * @off Hide
 * @desc 获胜后，是否显示JP金额
 * NO - false     YES - true
 * @default true
 *
 * @param JP Gained in Battle
 * @parent ---General---
 * @desc 整战斗后获得的JP文本的显示方式。
 * %1 - Actor     %2 Value     %3 JP
 * @default %1 gains %2%3!
 *
 * @param Alive Actors
 * @parent ---General---
 * @type boolean
 * @on Alive Requirement
 * @off No Requirement
 * @desc 主角们必须活着才能从敌人那里获得JP。
 * NO - false     YES - true
 * @default true
 *
 * @param ---Menu---
 * @default
 *
 * @param Show In Menu
 * @parent ---Menu---
 * @type boolean
 * @on Show
 * @off Hide
 * @desc 在主菜单中显示JP？
 * NO - false     YES - true
 * @default true
 *
 * @param Menu Format
 * @parent ---Menu---
 * @desc 菜单中JP文本格式的显示方式。
 * %1 - Value     %2 - Amount     %3 - Icon
 * @default %1\c[4]%2\c[0]%3
 *
 * @param ---Victory Aftermath---
 * @default
 *
 * @param Enable Aftermath
 * @parent ---Victory Aftermath---
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc 是否开启胜利JP窗口
 * NO - false     YES - true
 * @default true
 *
 * @param Aftermath Text
 * @parent ---Victory Aftermath---
 * @desc 用于描述JP收入的文本。
 * @default JP Earned
 *
 * @param Aftermath Format
 * @parent ---Victory Aftermath---
 * @desc 如何去描述收入文本的内容
 * %1 - Value     %2 - Amount     %3 - Icon
 * @default +%1\c[4]%2\c[0]%3
 *
 * @param Aftermath JP Earned
 * @parent ---Victory Aftermath---
 * @desc 描述每个演员能挣多少JP。
 * @default JP Earned in Battle
 *
 * @help
 *
 *
 * 魔改作者: 流逝的岁月
 * 魔改版本: v1.01
 *
 *
 *
 * 魔改内容: v1.01 拓展角色可使用 备注的方式来定义JP公式
 * 魔改内容: v1.00 将JP的概念提升到每个角色级,而并不是原本的职业级,因此涉及到角色职业级的功能将自动向上安排,谨记!
 *
 *
 *
 * 可以使用脚本 Zzy.CYJP.GetJP(actorId)                返回值为指定角色的JP值,actorId是角色的ID值
 * 可以使用脚本 Zzy.CYJP.SetJP(actorId,value)          设置一个角色的JP点,为指定值,actorId是角色ID值,value是一个固定的数值
 * 可以使用脚本 Zzy.CYJP.GainJP(actorId,value)         增加一个角色的JP点,为指定值,actorId是角色ID值,value是一个固定的数值
 * 可以使用脚本 Zzy.CYJP.LoseJP(actorId,value)         减少一个角色的JP点,为指定值,actorId是角色ID值,value是一个固定的数值
 * 
 *
 *
 *
 *
 *
 * ============================================================================
 * 介绍
 * ============================================================================
 *
 * 这个插件本身不会改变任何主要的游戏功能，但是如果你决定在游戏中加入工作点数，它会与其他插件一起使用这个插件的功能。
 *
 * 当获得工作分数时，会将其分配给演员当前的班级。如果参与者要切换类，那么作业点将更改为该类的作业点，直到恢复。
 *
 * ============================================================================
 * 胜利后的兼容性
 * ============================================================================
 *
 * 如果你安装了YEP_VictoryAffairs插件，并希望使用JP windows，请在插件管理器中将该插件放置在YEP_VictoryAffairs之下。
 *
 * 之后，如果您希望定义JP窗口在某个时间点出现的时间，而不是插件自动执行该操作，请在希望JP窗口出现的Victory Founder内的“Victory Order”参数中插入“JP”。
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * 以下是一些与工作点相关的标签。
 *
 * Actor Notetags
 *
 *   <ZzyJP Per Level: x>  升级将会获取到多少JP,其中x可以是一个公式
 *   --魔改--  拓展功能
 *
 *
 *
 *
 *   <Starting JP: x>
 *   对于参与者的初始类，将参与者的起始JP值设置为x。
 *
 *   <Class x Starting JP: y>
 *   将类x的演员起始JP值设置为y。
 *
 *   <JP Rate: x%>
*这改变了JP上涨x%的速度。默认情况下，所有对象的默认比率均为100%。将这一比例提高到200%将使获得的JP增加两倍，而50%将使获得的JP减半。
 *
 * Skill and Item Notetags
 *   <JP Gain: x>
 *   这使得使用此技能或物品的演员将获得x数量的JP，而不是参数中的默认JP。
 *
 *   <Target JP Gain: x>
 *   这使得受此技能或物品影响的目标演员获得x点JP。
 *
 * Class, Weapon, Armor, and State Notetag
 *   <JP Rate: x%>
*这改变了日元上涨x%的速度。默认情况下，所有对象的默认比率均为100%。将这一比例提高到200%将使获得的日元增加两倍，而50%将使获得的日元减半。
 *
 * Enemy Notetag
 *   <JP: x>
 *   当敌人被击败时，在场的党员每人将获得x日元。
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * 对于那些想知道如何手动为演员提供、删除或设置JP的人，可以使用lowing Plugin Commands.
 *
 * Plugin Commands:
 *
 *   gainJp actorId jp
 *   gainJp actorId jp classId
 *  将“actorId”替换为您希望更改其JP的演员的ID。将“jp”替换为您希望更改的jp金额。如果您使用的是“classId”，请将其替换为您希望更改的参与者类的ID。此命令将使演员获得JP。
 *
 *   loseJp actorId jp
 *   loseJp actorId jp classId
*将“actorId”替换为您希望更改其JP的演员的ID。将“jp”替换为您希望更改的jp金额。如果您使用的是“classId”，请将其替换为您希望更改的参与者类的ID。此命令将导致演员失去JP。
 *
 *   setJp actorId jp
 *   setJp actorId jp classId
*将“actorId”替换为您希望更改其JP的演员的ID。将“jp”替换为您希望更改的jp金额。如果您使用的是“classId”，请将其替换为您希望更改的参与者类的ID。此命令将演员的JP设置为特定值。
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.09:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.08:
 * - Lunatic Mode fail safes added.
 *
 * Version 1.07:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.06:
 * - Added 'Alive Actors' plugin parameter to prevent dead actors from gaining
 * JP from enemies. Any JP that currently dead actors earned in battle from
 * actions will still be 'earned' at the end of battle.
 *
 * Version 1.05:
 * - Updated compatibility for Subclasses gaining JP.
 *
 * Version 1.04a:
 * - Added failsafes to prevent JP from turning into NaN midbattle.
 * - Added failsafes to prevent no-target scopes from crashing the game.
 *
 * Version 1.03:
 * - Added 'Show Results' parameter to show/hide JP earned after battle for
 * those who aren't using the Victory Aftermath plugin.
 *
 * Version 1.02:
 * - Fixed a bug that would gain JP for changing classes of a higher level.
 *
 * Version 1.01:
 * - Added failsafes to prevent JP from turning into NaN.
 * 
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_JobPoints');
Yanfly.Param = Yanfly.Param || {};
Yanfly.Icon = Yanfly.Icon || {};

Yanfly.Param.Jp = String(Yanfly.Parameters['JP Text']);
Yanfly.Icon.Jp = Number(Yanfly.Parameters['JP Icon']);
Yanfly.Param.JpMax = Number(Yanfly.Parameters['Max JP']);
Yanfly.Param.JpPerAction = String(Yanfly.Parameters['JP Per Action']);
Yanfly.Param.JpPerEnemy = String(Yanfly.Parameters['JP Per Enemy']);
Yanfly.Param.JpShowResults = eval(String(Yanfly.Parameters['Show Results']));
Yanfly.Param.JpTextFormat = String(Yanfly.Parameters['JP Gained in Battle']);
Yanfly.Param.JpAliveActors = eval(String(Yanfly.Parameters['Alive Actors']));

Yanfly.Param.JpShowMenu = String(Yanfly.Parameters['Show In Menu']);
Yanfly.Param.JpShowMenu = eval(Yanfly.Param.JpShowMenu);
Yanfly.Param.JpMenuFormat = String(Yanfly.Parameters['Menu Format']);

Yanfly.Param.JpPerLevel = String(Yanfly.Parameters['JP Per Level']);
Yanfly.Param.JpEnableAftermath = String(Yanfly.Parameters['Enable Aftermath']);
Yanfly.Param.JpAftermathText = String(Yanfly.Parameters['Aftermath Text']);
Yanfly.Param.JpAftermathFmt = String(Yanfly.Parameters['Aftermath Format']);
Yanfly.Param.JpAftermathEarn = String(Yanfly.Parameters['Aftermath JP Earned']);

//=============================================================================
// DataManager
//=============================================================================


var Zzy = Zzy || {};
Zzy.CYJP = Zzy.CYJP || {};



Yanfly.JP.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.JP.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_JobPoints) {
  	this.processJPNotetags1($dataActors);
    this.processJPNotetags2($dataSkills);
    this.processJPNotetags2($dataItems);
  	this.processJPNotetags3($dataEnemies);
  	this.processJPNotetags4($dataClasses);
  	this.processJPNotetags4($dataWeapons);
  	this.processJPNotetags4($dataArmors);
  	this.processJPNotetags4($dataStates);
    Yanfly._loaded_YEP_JobPoints = true;
  }
	return true;
};

DataManager.processJPNotetags1 = function(group) {
  var note1 = /<(?:STARTING JP):[ ](\d+)>/i;
  var note2 = /<(?:CLASS)[ ](\d+)[ ](?:STARTING JP):[ ](\d+)>/i;
	var note3 = /<(?:JP RATE):[ ](\d+)([%％])>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.startingJp = {};
		obj.jpRate = 1.0;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				obj.startingJp[obj.classId] = parseInt(RegExp.$1);
			} else if (line.match(note2)) {
        obj.startingJp[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
      } 
	  else if (line.match(note3)) 
	  {
				obj.jpRate = parseFloat(RegExp.$1 * 0.01);
	  }//---魔改--- v1.01 拓展ZzyJP Per Level: x
	  else if(line.match(/<ZZYJP PER LEVEL:[ ](.*)>/i))
	  {
		  obj.ZzyJpLv = String(RegExp.$1);
	  }
		}
	}
};

DataManager.processJPNotetags2 = function(group) {
  var note1 = /<(?:GAIN JP|JP GAIN):[ ](\d+)>/i;
  var note2 = /<(?:TARGET GAIN JP|TARGET JP GAIN):[ ](\d+)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.gainJp = Yanfly.Param.JpPerAction;
    obj.targetGainJp = 0;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				obj.gainJp = parseInt(RegExp.$1);
			} else if (line.match(note2)) {
				obj.targetGainJp = parseInt(RegExp.$1);
			}
		}
	}
};

DataManager.processJPNotetags3 = function(group) {
  var note1 = /<(?:JP):[ ](\d+)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.jp = Yanfly.Param.JpPerEnemy;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				obj.jp = parseInt(RegExp.$1);
			}
		}
	}
};

DataManager.processJPNotetags4 = function(group) {
  var note1 = /<(?:JP RATE):[ ](\d+)([%％])>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.jpRate = 1.0;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				obj.jpRate = parseFloat(RegExp.$1 * 0.01);
			}
		}
	}
};

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.JP.BattleManager_makeRewards = BattleManager.makeRewards;
BattleManager.makeRewards = function() {
    Yanfly.JP.BattleManager_makeRewards.call(this);
    this._rewards.jp = $gameTroop.jpTotal();
    this.gainJp();
};

BattleManager.gainJp = function() {
		var jp = $gameTroop.jpTotal();
		$gameMessage.newPage();
    if (Yanfly.Param.JpAliveActors) {
      var members = $gameParty.aliveMembers();
    } else {
      var members = $gameParty.members();
    }
		members.forEach(function(actor) {
			actor.gainJp(jp);
		});
};

Yanfly.JP.BattleManager_displayRewards = BattleManager.displayRewards;
BattleManager.displayRewards = function() {
    Yanfly.JP.BattleManager_displayRewards.call(this);
		this.displayJpGain();
};

BattleManager.displayJpGain = function() {
    if (!Yanfly.Param.JpShowResults) return;
    var jp = $gameTroop.jpTotal();
    $gameMessage.newPage();
    $gameParty.members().forEach(function(actor) {
			var fmt = Yanfly.Param.JpTextFormat;
			var text = fmt.format(actor.name(), Yanfly.Util.toGroup(actor.battleJp()),
				Yanfly.Param.Jp);
			$gameMessage.add('\\.' + text);
		});
};

//=============================================================================
// Game_Battler
//=============================================================================

Yanfly.JP.Game_Battler_useItem = Game_Battler.prototype.useItem;
Game_Battler.prototype.useItem = function(item) {
    Yanfly.JP.Game_Battler_useItem.call(this, item);
    if (!$gameParty.inBattle()) return;
    if (this.isActor()) this.gainJp(eval(item.gainJp), this.currentClass().id);
};

Yanfly.JP.Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
Game_Battler.prototype.onBattleStart = function() {
    Yanfly.JP.Game_Battler_onBattleStart.call(this);
		this._battleJp = 0;
};

Yanfly.JP.Game_Battler_onBattleEnd = Game_Battler.prototype.onBattleEnd;
Game_Battler.prototype.onBattleEnd = function() {
    Yanfly.JP.Game_Battler_onBattleEnd.call(this);
    this._battleJp = 0;
};

//=============================================================================
// Game_Actor
//=============================================================================

//此处将会对GP进行调整,不再使用原版的JP功能,而是调用一个统一的JP功能


Yanfly.JP.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) 
{
    Yanfly.JP.Game_Actor_setup.call(this, actorId);
    this.initJp();
};

Game_Actor.prototype.jp = function(classId) 
{
	//---魔改--- v1.00 输出修改后的jp
	if(this._ZzyCYTPJP === undefined)
	{this.initJp();}

	return this._ZzyCYTPJP;
	
	
    if (!this._jp) this.initJp();
		if (!this._jp) return 0;
    if (classId === undefined) classId = this.currentClass().id;
    if (!this._jp[classId]) this._jp[classId] = 0;
    return this._jp[classId];
};

Game_Actor.prototype.initJp = function() //初始化JP效果
{
    var actor = this.actor();
    for (var i = 0; i < $dataClasses.length; i++) {
			if (actor.startingJp) {
				var jp = actor.startingJp[i] || 0;
				this.setJp(jp, i);
			}
    }
	
	//---魔改--- v1.00 设置JP点数为当前职业的JP点
	var cid = this.currentClass().id;
	var initJP = this._jp[cid] ? this._jp[cid] : 0;
	this._ZzyCYTPJP = initJP;//获取初始化JP的效果
};

Game_Actor.prototype.setJp = function(value, classId) //设置JP值
{
    value = parseInt(value);
    if (value === NaN) value = 0;
    classId = classId || this.currentClass().id;
		if (!this._jp) this._jp = {};
    if (!this._jp[classId]) this._jp[classId] = 0;
    this._jp[classId] = Math.max(0, value);
    if (Yanfly.Param.JpMax > 0) {
      this._jp[classId] = Math.min(Yanfly.Param.JpMax, value);
    }
	
	
	//---魔改--- v1.00 将忽略classId的参数调整
	if (Yanfly.Param.JpMax > 0)this._ZzyCYTPJP = Math.min(Yanfly.Param.JpMax, value);
	else this._ZzyCYTPJP = value;
};

Game_Actor.prototype.jpRate = function() //jp增加的倍数
{
		var rate = 1.0;
		rate *= this.actor().jpRate;
		rate *= this.currentClass().jpRate;
		var equips = this.equips();
    for (var i = 0; i < equips.length; i++) {
        var item = equips[i];
        if (item) rate *= item.jpRate;
    }
		var states = this.states();
    for (var i = 0; i < states.length; i++) {
        var state = states[i];
        if (state) rate *= state.jpRate;
    }
		return rate;
};

Game_Actor.prototype.gainJp = function(value, classId) 
{
    value = parseInt(value);
    if (value === NaN) value = 0;
		classId = classId || this.currentClass().id;
		value = Math.floor(value * this.jpRate());
		if ($gameParty.inBattle()) {
      this._battleJp = this._battleJp || 0;
			this._battleJp += value;
		}

		this.setJp(this.jp(classId) + value, classId);
    if (classId === this.currentClass().id && this.isSublcassEarnJp()) 
	{
		
      this.gainJpSubclass(value);
    }
};

Game_Actor.prototype.isSublcassEarnJp = function() {
    if (!Imported.YEP_X_Subclass) return false;
    if (!this.subclass()) return false;
    return Yanfly.Param.SubclassJp;
};

Game_Actor.prototype.gainJpSubclass = function(value) {
    var classId = this.subclass().id;
    value = Math.round(value * Yanfly.Param.SubclassJp);
    this.setJp(this.jp(classId) + value, classId);
};

Game_Actor.prototype.loseJp = function(value, classId) {
		classId = classId || this.currentClass().id;
		this.setJp(this.jp(classId) - value, classId);
};

Game_Actor.prototype.battleJp = function() {
    this._battleJp = this._battleJp || 0;
		return this._battleJp;
};

Yanfly.JP.Game_Actor_changeClass = Game_Actor.prototype.changeClass;
Game_Actor.prototype.changeClass = function(classId, keepExp) {
    this._preventJpLevelUpGain = true;
    Yanfly.JP.Game_Actor_changeClass.call(this, classId, keepExp);
    this._preventJpLevelUpGain = false;
};

Yanfly.JP.Game_Actor_levelUp = Game_Actor.prototype.levelUp;
Game_Actor.prototype.levelUp = function() //---魔改---   v1.01增加JP值拓展
{
    Yanfly.JP.Game_Actor_levelUp.call(this);
    if (this._preventJpLevelUpGain) return;
    var user = this;
    var target = this;
    var a = this;
    var b = this;
    var level = this.level;
    var code = this.GetZzyJPOfLevelEval();//替换使用公式
    try {
      var value = eval(code)
    } catch (e) {
      var value = 0;
      Yanfly.Util.displayError(e, code, 'LEVEL UP JP FORMULA ERROR');
    }
	

		this.gainJp(value, this.currentClass().id);
};



Game_Actor.prototype.GetZzyJPOfLevelEval = function()
{
	var data = $dataActors[this.actorId()];
	if(!data)return Yanfly.Param.JpPerLevel;
	return data.ZzyJpLv ? data.ZzyJpLv : Yanfly.Param.JpPerLevel;
}



//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.jp = function() {
    var user = this;
    var target = this;
    var a = this;
    var b = this;
    var code = this.enemy().jp;
    try {
      return eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'ENEMY JP FORMULA ERROR');
      return 0;
    }
};

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.JP.Game_Action_applyItemUserEffect =
    Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
    Yanfly.JP.Game_Action_applyItemUserEffect.call(this, target);
    if (target) this.applyItemJpEffect(target);
};

Game_Action.prototype.applyItemJpEffect = function(target) {
    var item = this.item();
    if (!item) return;
    if (target.isActor()) target.gainJp(item.targetGainJp);
};

Yanfly.JP.Game_Action_hasItemAnyValidEffects =
    Game_Action.prototype.hasItemAnyValidEffects;
Game_Action.prototype.hasItemAnyValidEffects = function(target) {
    var item = this.item();
    if (!item) return;
    if (target.isActor() && item.targetGainJp !== 0) return true;
    return Yanfly.JP.Game_Action_hasItemAnyValidEffects.call(this, target);
};

//=============================================================================
// Game_Troop
//=============================================================================

Game_Troop.prototype.jpTotal = function() {
    return this.deadMembers().reduce(function(r, enemy) {
        return r + enemy.jp();
    }, 0);
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.JP.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Yanfly.JP.Game_Interpreter_pluginCommand.call(this, command, args)
  	if (command === 'gainJp') this.modifyJp('gain', args);
    if (command === 'loseJp') this.modifyJp('lose', args);
    if (command === 'setJp') this.modifyJp('set', args);
};

Game_Interpreter.prototype.modifyJp = function(type, args) {
    if (!args) return;
    var actorId = parseInt(args[0]);
    var actor = $gameActors.actor(actorId);
    var jpValue = args[1] || 0;
    jpValue = parseInt(jpValue);
    var classId = args[2] || 0;
    classId = parseInt(classId);
    if (jpValue <= 0) return;
    if (classId <= 0) classId = actor.currentClass().id;
    if (type === 'gain') {
      actor.gainJp(jpValue, classId);
    } else if (type === 'lose') {
      actor.loseJp(jpValue, classId);
    } else if (type === 'set') {
      actor.setJp(jpValue, classId);
    }
};

//=============================================================================
// Window_Base
//=============================================================================

Yanfly.JP.Window_Base_dASS = Window_Base.prototype.drawActorSimpleStatus;
Window_Base.prototype.drawActorSimpleStatus = function(actor, wx, wy, ww) {
    this._drawMenuJP = Yanfly.Param.JpShowMenu;
    Yanfly.JP.Window_Base_dASS.call(this, actor, wx, wy, ww);
    this._drawMenuJP = undefined;
};

Yanfly.JP.Window_Base_drawActorClass = Window_Base.prototype.drawActorClass;
Window_Base.prototype.drawActorClass = function(actor, wx, wy, ww) {
    ww = ww || 168;
    Yanfly.JP.Window_Base_drawActorClass.call(this, actor, wx, wy, ww);
    if (!this._drawMenuJP) return;
    var classId = actor.currentClass().id;
    this.drawActorJp(actor, classId, wx, wy, ww, 'right');
};

Window_Base.prototype.drawActorJp = function(actor, id, wx, wy, ww, align) {
    var jp = actor.jp(id);
    var icon = '\\i[' + Yanfly.Icon.Jp + ']';
    var fmt = Yanfly.Param.JpMenuFormat;
    var text = fmt.format(Yanfly.Util.toGroup(jp), Yanfly.Param.Jp, icon);
    if (align === 'left') {
      wx = 0;
    } else if (align === 'center') {
      wx += (ww - this.textWidthEx(text)) / 2;
    } else {
      wx += ww - this.textWidthEx(text);
    }
    this.drawTextEx(text, wx, wy);
};

Window_Base.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height);
};

//=============================================================================
// Window_VictoryJp
//=============================================================================

if (Imported.YEP_VictoryAftermath && Yanfly.Param.JpEnableAftermath) {

function Window_VictoryJp() {
    this.initialize.apply(this, arguments);
}

Window_VictoryJp.prototype = Object.create(Window_VictoryExp.prototype);
Window_VictoryJp.prototype.constructor = Window_VictoryJp;

Window_VictoryJp.prototype.drawActorGauge = function(actor, index) {
    this.clearGaugeRect(index);
    var rect = this.gaugeRect(index);
    this.changeTextColor(this.normalColor());
    this.drawActorName(actor, rect.x + 2, rect.y);
    this.drawLevel(actor, rect);
    this.drawJpGained(actor, rect);
};

Window_VictoryJp.prototype.drawJpGained = function(actor, rect) {
    var wy = rect.y + this.lineHeight() * 1;
    this.changeTextColor(this.systemColor());
    this.drawText(Yanfly.Param.JpAftermathEarn, rect.x + 2, wy, rect.width - 4,
      'left');
    var bonusJp = 1.0 * actor.battleJp() * this._tick /
      Yanfly.Param.VAGaugeTicks;
    var value = Yanfly.Util.toGroup(parseInt(bonusJp));
    var fmt = Yanfly.Param.JpAftermathFmt;
    var icon = '\\i[' + Yanfly.Icon.Jp + ']';
    var JpText = fmt.format(value, Yanfly.Param.Jp, icon);
    this.changeTextColor(this.normalColor());
    wx = rect.x + rect.width - this.textWidthEx(JpText);
    this.drawTextEx(JpText, wx, wy);
};

//=============================================================================
// Scene_Battle
//=============================================================================

Yanfly.JP.Scene_Battle_addCustomVictorySteps =
    Scene_Battle.prototype.addCustomVictorySteps;
Scene_Battle.prototype.addCustomVictorySteps = function(array) {
    array = Yanfly.JP.Scene_Battle_addCustomVictorySteps.call(this, array);
    if (!array.contains('JP')) array.push('JP');
    return array;
};

Yanfly.JP.Scene_Battle_updateVictorySteps =
    Scene_Battle.prototype.updateVictorySteps;
Scene_Battle.prototype.updateVictorySteps = function() {
    Yanfly.JP.Scene_Battle_updateVictorySteps.call(this);
    if (this.isVictoryStep('JP')) this.updateVictoryJp();
};

Scene_Battle.prototype.updateVictoryJp = function() {
    if (!this._victoryJpWindow) {
      this.createVictoryJp();
    } else if (this._victoryJpWindow.isReady()) {
      if (this.victoryTriggerContinue()) this.finishVictoryJp();
    }
};

Scene_Battle.prototype.createVictoryJp = function() {
    this._victoryTitleWindow.refresh(Yanfly.Param.JpAftermathText);
    this._victoryJpWindow = new Window_VictoryJp();
    this.addWindow(this._victoryJpWindow);
    this._victoryJpWindow.open();
};

Scene_Battle.prototype.finishVictoryJp = function() {
    SoundManager.playOk();
    this._victoryJpWindow.close();
    this.processNextVictoryStep();
};

}; // Imported.YEP_VictoryAftermath

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

if (!Yanfly.Util.toGroup) {
		Yanfly.Util.toGroup = function(inVal) {
				return inVal;
		}
};

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
// End of File
//=============================================================================

Zzy.CYJP.SetJP = function(actorId,value)
{
	var actor = $gameActors.actor(actorId);
	value = value ? value : 0;
	if(actor)
	{
		actor.setJp(value);return true;	
	}
	return false;
}


Zzy.CYJP.GainJP = function(actorId,value)
{
	var actor = $gameActors.actor(actorId);
	value = value ? value : 0;
	if(actor)
	{
		actor.gainJp(value);return true;
	}
	return false;
}


Zzy.CYJP.LoseJP = function(actorId,value)
{
	var actor = $gameActors.actor(actorId);
	value = value ? value : 0;	
	if(actor)
	{
		actor.loseJp(value);return true;
	}
	return false;	
}


Zzy.CYJP.GetJP = function(actorId)
{
	var actor = $gameActors.actor(actorId);
	if(actor)return actor.jp();
	return 0;
}
