//=============================================================================
// Yanfly Engine Plugins - Status Menu Extension - Battle Statistics
// YEP_X_BattleStatistics.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_BattleStatistics = true;

var Yanfly = Yanfly || {};
Yanfly.BStats = Yanfly.BStats || {};
Yanfly.BStats.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.01 战斗统计☁️
 * @author Yanfly Engine Plugins
 *
 * @param Command Name
 * @text 命令名称
 * @desc This is the text used for the command name in the Status
 * Menu command list.
 * @default 统计
 *
 * @param Battle Count Text
 * @text 战斗计数文本
 * @desc This is the category text for Battle Count.
 * @default 开始战斗
 *
 * @param Battle Count Format
 * @text 战斗计数格式
 * @desc This is how the text format will appear.
 * %1 - Actor Battles  %2 - Party Battles  %3 - Percentage
 * @default %1 out of %2 Battles (%3%)
 *
 * @param Kill Count Text
 * @text 击杀计数文本
 * @desc This is the category text for Kill Count.
 * @default 杀敌数
 *
 * @param Kill Count Format
 * @text 击杀计数格式
 * @desc This is how the text format will appear.
 * %1 - Kill Ratio
 * @default %1每场战斗的死亡人数
 *
 * @param Death Count Text
 * @text 死亡计数文本
 * @desc This is the category text for Death Count.
 * @default 死亡数
 *
 * @param Death Count Format
 * @text 死亡计数格式
 * @desc This is how the text format will appear.
 * %1 - Death Ratio
 * @default %1 每场战斗死亡
 *
 *
 * @param Damage Dealt
 * @text 造成的伤害
 * @desc This is the category text for Damage Dealt.
 * @default 造成伤害数
 *
 * @param Damage Taken
 * @text 受到的伤害
 * @desc This is the category text for Damage Taken.
 * @default 受到伤害数
 *
 * @param Healing Dealt
 * @text 治疗成功
 * @desc This is the category text for Healing Dealt.
 * @default 造成治疗数
 *
 *
 * @help
 *
 * 魔改作者: 流逝的岁月
 * 魔改版本: v1.02
 *
 * 魔改内容: v1.02 转移封装到YEP_BattleEngineCore.js中,功能不变
 * 魔改内容: v1.01 封装了一些函数功能,可以使用
 * 魔改内容: v1.00 移除受到治疗数,移除助攻数
 *
 *
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * 想要你玩家战斗记录统计吗？现在你可以了
 * 这个插件需要身份菜单核心插件
 * 这个插件需要YEP_StatusMenuCore，确保它在YEP_StatusMenuCore下面。
 *
 * 如果你想把战斗记录栏放在菜单，请把‘Statistics‘放入身份菜单核心
 * 命令顺序参数里。如果没有设置，将会自动出现在‘Custom’栏。
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * 这个插件是即插即用。所以战斗信息将会记录在战斗统计栏。这个信息如下：
 *
 * Battles Initiated
 * 战斗场数记录
 *
 * Kills/Deaths/Assists
 * 显示杀敌数、死亡数和助攻数。杀敌数是玩家击败敌方个数。
 * 死亡数是玩家战斗死亡数。助攻数是敌方死亡时玩家在场的个数。
 *
 * Damage Dealt
 * 造成伤害数
 *
 * Damage Taken
 * 遭受伤害数
 *
 * Healing Dealt
 * 造成治疗数
 *
 * Healing Taken
 * 受到治疗数
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Calculations for recorded HP damage dealt are now calculated based on the
 * actual HP damage taken as per the results rather than based off of the raw
 * incoming value (in the event that raw value gets modified as per the effects
 * of other plugins).
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================


var Zzy = Zzy || {};
Zzy.CXBS = Zzy.CXBS || {};

if (Imported.YEP_StatusMenuCore) {

//=============================================================================
// Parameter Variables
//=============================================================================



 // * @param Assist Count Text
 // * @text 辅助计数文本
 // * @desc This is the category text for Assist Count.
 // * @default 助攻数
 // *
 // * @param Assist Count Format
 // * @text 辅助计数格式
 // * @desc This is how the text format will appear.
 // * %1 - Assist Ratio
 // * @default %1 每战助攻数
 // *
 // * @param Healing Taken
 // * @text 正在治疗
 // * @desc This is the category text for Healing Taken.
 // * @default 受到治疗数




Yanfly.Parameters = PluginManager.parameters('YEP_X_BattleStatistics');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.BStatsCmdName = String(Yanfly.Parameters['Command Name']);
Yanfly.Param.BStatsBCountText = String(Yanfly.Parameters['Battle Count Text']);
Yanfly.Param.BStatsBCountFmt = String(Yanfly.Parameters['Battle Count Format']);
Yanfly.Param.BStatsKCountText = String(Yanfly.Parameters['Kill Count Text']);
Yanfly.Param.BStatsKCountFmt = String(Yanfly.Parameters['Kill Count Format']);
Yanfly.Param.BStatsDCountText = String(Yanfly.Parameters['Death Count Text']);
Yanfly.Param.BStatsDCountFmt = String(Yanfly.Parameters['Death Count Format']);
Yanfly.Param.BStatsACountText = String(Yanfly.Parameters['Assist Count Text']);
Yanfly.Param.BStatsACountFmt = String(Yanfly.Parameters['Assist Count Format']);
Yanfly.Param.BStatsDmgDealt = String(Yanfly.Parameters['Damage Dealt']);
Yanfly.Param.BStatsDmgTaken = String(Yanfly.Parameters['Damage Taken']);
Yanfly.Param.BStatsHealDealt = String(Yanfly.Parameters['Healing Dealt']);
Yanfly.Param.BStatsHealTaken = String(Yanfly.Parameters['Healing Taken']);

//=============================================================================
// Game_BattlerBase
//=============================================================================

Yanfly.BStats.Game_BattlerBase_addNewState =
		Game_BattlerBase.prototype.addNewState;
Game_BattlerBase.prototype.addNewState = function(stateId) {
    if (stateId === this.deathStateId()) this.updateBattleStats();
		Yanfly.BStats.Game_BattlerBase_addNewState.call(this, stateId);
};

Game_BattlerBase.prototype.updateBattleStats = function() {
		if (!$gameParty.inBattle()) return;
		if (this.isActor()) this.increaseDeathCount();
		if (this.isEnemy()) {
			for (var i = 0; i < $gameParty.battleMembers().length; ++i) {
				var actor = $gameParty.battleMembers()[i];
				if (!actor) continue;
				if (actor === BattleManager._subject) {
					actor.increaseKillCount();
				} else {
					actor.increaseAssistCount();
				}
			}
		}
};

//=============================================================================
// Game_Battler
//=============================================================================

Yanfly.BStats.Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
Game_Battler.prototype.onBattleStart = function() {
    Yanfly.BStats.Game_Battler_onBattleStart.call(this);
    if (!this.isActor()) return;
		if (this._battleCount === undefined) this.initBattleStatistics();
		if (this.isBattleMember()) this._battleCount++;
};

//=============================================================================
// Game_Actor
//=============================================================================

Yanfly.BStats.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    Yanfly.BStats.Game_Actor_setup.call(this, actorId);
		this.initBattleStatistics();
};

Game_Actor.prototype.initBattleStatistics = function() {
		this._battleCount = 0;
		this._killCount = 0;
		this._deathCount = 0;
		this._assistCount = 0;
		this._totalDamageDealt = 0;
		this._totalDamageTaken = 0;
		this._totalHealingDealt = 0;
		this._totalHealingTaken = 0;
};

Game_Actor.prototype.battleCount = function() {
    if (this._battleCount === undefined) this.initBattleStatistics();
		return this._battleCount;
};

Game_Actor.prototype.killCount = function() {
    if (this._killCount === undefined) this.initBattleStatistics();
		return this._killCount;
};

Game_Actor.prototype.killCountRatio = function() {
    if (this._killCount === undefined) this.initBattleStatistics();
		return this._killCount / Math.max(this._battleCount, 1);
};

Game_Actor.prototype.increaseKillCount = function(value) {
    value = value || 1;
		if (this._killCount === undefined) this.initBattleStatistics();
		this._killCount += value;
};

Game_Actor.prototype.deathCount = function() {
    if (this._deathCount === undefined) this.initBattleStatistics();
		return this._deathCount;
};

Game_Actor.prototype.deathCountRatio = function() {
    if (this._deathCount === undefined) this.initBattleStatistics();
		return this._deathCount / Math.max(this._battleCount, 1);
};

Game_Actor.prototype.increaseDeathCount = function(value) {
    value = value || 1;
		if (this._deathCount === undefined) this.initBattleStatistics();
		this._deathCount += value;
};

Game_Actor.prototype.assistCount = function() {
    if (this._assistCount === undefined) this.initBattleStatistics();
		return this._assistCount;
};

Game_Actor.prototype.assistCountRatio = function() {
    if (this._assistCount === undefined) this.initBattleStatistics();
		return this._assistCount / Math.max(this._battleCount, 1);
};

Game_Actor.prototype.increaseAssistCount = function(value) {
    value = value || 1;
		if (this._assistCount === undefined) this.initBattleStatistics();
		this._assistCount += value;
};

Game_Actor.prototype.totalDamageDealt = function() {
    if (this._totalDamageDealt === undefined) this.initBattleStatistics();
		return this._totalDamageDealt;
};

Game_Actor.prototype.increaseTotalDamageDealt = function(value) {
    value = value || 1;
		if (this._totalDamageDealt === undefined) this.initBattleStatistics();
		this._totalDamageDealt += value;
};

Game_Actor.prototype.totalDamageTaken = function() {
    if (this._totalDamageTaken === undefined) this.initBattleStatistics();
		return this._totalDamageTaken;
};

Game_Actor.prototype.increaseTotalDamageTaken = function(value) {
    value = value || 1;
		if (this._totalDamageTaken === undefined) this.initBattleStatistics();
		this._totalDamageTaken += value;
};

Game_Actor.prototype.totalHealingDealt = function() {
    if (this._totalHealingDealt === undefined) this.initBattleStatistics();
		return this._totalHealingDealt;
};

Game_Actor.prototype.increaseTotalHealingDealt = function(value) {
    value = value || 1;
		if (this._totalHealingDealt === undefined) this.initBattleStatistics();
		this._totalHealingDealt += value;
};

Game_Actor.prototype.totalHealingTaken = function() {
    if (this._totalHealingTaken === undefined) this.initBattleStatistics();
		return this._totalHealingTaken;
};

Game_Actor.prototype.increaseTotalHealingTaken = function(value) {
		value = value || 1;
		if (this._totalHealingTaken === undefined) this.initBattleStatistics();
		this._totalHealingTaken += value;
};

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.BStats.Game_Action_executeHpDamage =
    Game_Action.prototype.executeHpDamage;
Game_Action.prototype.executeHpDamage = function(target, value) {
    Yanfly.BStats.Game_Action_executeHpDamage.call(this, target, value);
    var dmg = target.result().hpDamage;
    if (this.subject().isActor()) {
      if (dmg > 0) this.subject().increaseTotalDamageDealt(dmg);
      if (dmg < 0) this.subject().increaseTotalHealingDealt(-dmg);
    }
    if (target.isActor()) {
      if (dmg > 0) target.increaseTotalDamageTaken(dmg);
      if (dmg < 0) target.increaseTotalHealingTaken(-dmg);
    }
};

//=============================================================================
// Window_StatusCommand
//=============================================================================

Yanfly.BStats.Window_StatusCommand_createCommand =
		Window_StatusCommand.prototype.createCommand;
Window_StatusCommand.prototype.createCommand = function(command) {
		if (command.toUpperCase() === 'STATISTICS') {
			var text = Yanfly.Param.BStatsCmdName;
			this.addCommand(text, 'battleStatistics', true);
		} else {
			Yanfly.BStats.Window_StatusCommand_createCommand.call(this, command);
		}
};

Yanfly.BStats.Window_StatusCommand_addCustomCommands =
		Window_StatusCommand.prototype.addCustomCommands;
Window_StatusCommand.prototype.addCustomCommands = function() {
		Yanfly.BStats.Window_StatusCommand_addCustomCommands.call(this);
		if (this.findSymbol('battleStatistics') > -1) return;
		var text = Yanfly.Param.BStatsCmdName;
		this.addCommand(text, 'battleStatistics', true);
};

//=============================================================================
// Window_StatusInfo
//=============================================================================

Yanfly.BStats.Window_StatusInfo_drawInfoContents =
		Window_StatusInfo.prototype.drawInfoContents;
Window_StatusInfo.prototype.drawInfoContents = function(symbol) {
		if (symbol === 'battleStatistics') {
			this.drawBattleStatistics();
		} else {
			Yanfly.BStats.Window_StatusInfo_drawInfoContents.call(this, symbol);
		}
};

Window_StatusInfo.prototype.drawBattleStatistics = function() {
		this.resetFontSettings();
		this.drawBattleCount();
		this.drawKDACount();
		this.drawKDARatios();
		this.drawTotalDamageHealing();
};

Window_StatusInfo.prototype.drawBattleCount = function() {
		this.drawDarkRect(0, 0, this.contents.width, this.lineHeight());
		this.changeTextColor(this.systemColor());
		var p = this.textPadding();
		var text = Yanfly.Param.BStatsBCountText;
		this.drawText(text, p, 0, this.contents.width - p * 2);
		this.changeTextColor(this.normalColor());
		var fmt = Yanfly.Param.BStatsBCountFmt;
		var n1 = Yanfly.Util.toGroup(this._actor.battleCount());
		var n2 = Yanfly.Util.toGroup($gameSystem.battleCount());
		var n3 = parseInt(100 * this._actor.battleCount() / Math.max(1,
			$gameSystem.battleCount()));
		text = fmt.format(n1, n2, n3);
		this.drawText(text, p, 0, this.contents.width - p * 2, 'right');
};

Window_StatusInfo.prototype.drawKDACount = function() {
		var p = this.textPadding();
		var lh = this.lineHeight();
		var dw = this.contents.width / 2;
		
		//---魔改--- v1.00 绘制黑色底框
		
		this.drawDarkRect(0, lh * 1, dw, lh);
		this.drawDarkRect(0, lh * 2, dw, lh);
		//this.drawDarkRect(0, lh * 3, dw, lh);
		this.changeTextColor(this.systemColor());
		var text = Yanfly.Param.BStatsKCountText;
		this.drawText(text, p, lh * 1, this.contents.width - p * 2);
		text = Yanfly.Param.BStatsDCountText;
		this.drawText(text, p, lh * 2, this.contents.width - p * 2);
		
		//---魔改--- v1.00 取消绘制 辅助
		// text = Yanfly.Param.BStatsACountText;
		// this.drawText(text, p, lh * 3, this.contents.width - p * 2);
		
		this.changeTextColor(this.powerUpColor());
		text = Yanfly.Util.toGroup(this._actor.killCount());
		this.drawText(text, p, lh * 1, dw - p * 2, 'right');
		this.changeTextColor(this.powerDownColor());
		text = Yanfly.Util.toGroup(this._actor.deathCount());
		this.drawText(text, p, lh * 2, dw - p * 2, 'right');
		this.changeTextColor(this.normalColor());
		
		
		//---魔改--- v1.00 隐藏辅助
		//text = Yanfly.Util.toGroup(this._actor.assistCount());
		//this.drawText(text, p, lh * 3, dw - p * 2, 'right');
};

Window_StatusInfo.prototype.drawKDARatios = function() {
		var p = this.textPadding();
		var lh = this.lineHeight();
		var dw = this.contents.width / 2;
		this.drawDarkRect(dw, lh * 1, dw, lh);
		this.drawDarkRect(dw, lh * 2, dw, lh);
		//this.drawDarkRect(dw, lh * 3, dw, lh);
		this.changeTextColor(this.normalColor());
		var fmt = Yanfly.Param.BStatsKCountFmt;
		var ratio = Yanfly.Util.toGroup(this._actor.killCountRatio().toFixed(2));
		var text = fmt.format(ratio);
		this.drawText(text, dw + p, lh * 1, dw - p * 2, 'right');
		fmt = Yanfly.Param.BStatsDCountFmt;
		ratio = Yanfly.Util.toGroup(this._actor.deathCountRatio().toFixed(2));
		text = fmt.format(ratio);
		this.drawText(text, dw + p, lh * 2, dw - p * 2, 'right');
		fmt = Yanfly.Param.BStatsACountFmt;
		ratio = Yanfly.Util.toGroup(this._actor.assistCountRatio().toFixed(2));
		text = fmt.format(ratio);
		this.drawText(text, dw + p, lh * 3, dw - p * 2, 'right');
};

Window_StatusInfo.prototype.drawTotalDamageHealing = function() {
		var lh = this.lineHeight();
		var p = this.textPadding();
		
		
		
		//此处改动将修改向上一层
		
		var layerY = 1;
		
		
		this.drawDarkRect(0, lh * (4-layerY), this.contents.width, lh);
		this.drawDarkRect(0, lh * (5-layerY), this.contents.width, lh);
		this.drawDarkRect(0, lh * (6-layerY), this.contents.width, lh);
		//this.drawDarkRect(0, lh * 7, this.contents.width, lh);
		this.changeTextColor(this.systemColor());
		var text = Yanfly.Param.BStatsDmgDealt;
		this.drawText(text, p, lh * (4-layerY), this.contents.width - p * 2);
		text = Yanfly.Param.BStatsDmgTaken;
		this.drawText(text, p, lh * (5-layerY), this.contents.width - p * 2);
		text = Yanfly.Param.BStatsHealDealt;
		this.drawText(text, p, lh * (6-layerY), this.contents.width - p * 2);
		
		
		//---魔改--- v1.00 取消绘制 治疗术
		// text = Yanfly.Param.BStatsHealTaken;
		// this.drawText(text, p, lh * 7, this.contents.width - p * 2);
		
		
		this.changeTextColor(this.normalColor());
		text = Yanfly.Util.toGroup(this._actor.totalDamageDealt());
		this.drawText(text, p, lh * (4-layerY), this.contents.width - p * 2, 'right');
		text = Yanfly.Util.toGroup(this._actor.totalDamageTaken());
		this.drawText(text, p, lh * (5-layerY), this.contents.width - p * 2, 'right');
		text = Yanfly.Util.toGroup(this._actor.totalHealingDealt());
		this.drawText(text, p, lh * (6-layerY), this.contents.width - p * 2, 'right');
		
		//---魔改--- v1.00 取消绘制 治疗术
		// text = Yanfly.Util.toGroup(this._actor.totalHealingTaken());
		// this.drawText(text, p, lh * 7, this.contents.width - p * 2, 'right');
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



