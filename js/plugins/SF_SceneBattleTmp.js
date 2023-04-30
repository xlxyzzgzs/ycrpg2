//=============================================================================
// SF_SceneBattleTmp.js - Scene_Battle temporary
//=============================================================================

/*:
 * @plugindesc Scene_Battle 临时使用，功能不保证。
 * @version 1.0.0
 * @help
 * 放在 YEP_Core Engine 之前。
 */

var SF_Plugins = SF_Plugins || {};
SF_Plugins.SF_SceneBattleTmp = {};

//=============================================================================
// Game_Party
//=============================================================================
SF_Plugins.SF_SceneBattleTmp.Game_Party_maxBattleMembers = Game_Party.prototype.maxBattleMembers;
Game_Party.prototype.maxBattleMembers = function () {
    return 5;
};

//=============================================================================
// Window_PartyCommand
//=============================================================================
SF_Plugins.SF_SceneBattleTmp.Window_PartyCommand_initialize = Window_PartyCommand.prototype.initialize;
Window_PartyCommand.prototype.initialize = function () {
    var y = Graphics.boxHeight - this.windowHeight() * 2;
    Window_Command.prototype.initialize.call(this, 0, y);
    this.openness = 0;
    this.deactivate();
};

//=============================================================================
// Window_ActorCommand
//=============================================================================
SF_Plugins.SF_SceneBattleTmp.Window_ActorCommand_initialize = Window_ActorCommand.prototype.initialize;
Window_ActorCommand.prototype.initialize = function () {
    var y = Graphics.boxHeight - this.windowHeight() * 2;
    Window_Command.prototype.initialize.call(this, 0, y);
    this.openness = 0;
    this.deactivate();
    this._actor = null;
};

//=============================================================================
// Window_BattleStatus
//=============================================================================
SF_Plugins.SF_SceneBattleTmp.Window_BattleStatus_initialize = Window_BattleStatus.prototype.initialize;

//=============================================================================
// Scene_Battle
//=============================================================================
SF_Plugins.SF_SceneBattleTmp.Scene_Battle_createSkillWindow = Scene_Battle.prototype.createSkillWindow;
Scene_Battle.prototype.createSkillWindow = function () {
    var wx = this._actorCommandWindow.x + this._actorCommandWindow.width;
    var wy = this._actorCommandWindow.y;
    var ww = Graphics.boxWidth - wx;
    var wh = this._actorCommandWindow.height;
    this._skillWindow = new Window_BattleSkill(wx, wy, ww, wh);
    this._skillWindow.setHelpWindow(this._helpWindow);
    this._skillWindow.setHandler("ok", this.onSkillOk.bind(this));
    this._skillWindow.setHandler("cancel", this.onSkillCancel.bind(this));
    this.addWindow(this._skillWindow);
};

SF_Plugins.SF_SceneBattleTmp.Scene_Battle_createItemWindow = Scene_Battle.prototype.createItemWindow;
Scene_Battle.prototype.createItemWindow = function () {
    var wx = this._actorCommandWindow.x + this._actorCommandWindow.width;
    var wy = this._actorCommandWindow.y;
    var ww = Graphics.boxWidth - wx;
    var wh = this._actorCommandWindow.height;
    this._itemWindow = new Window_BattleItem(wx, wy, ww, wh);
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler("ok", this.onItemOk.bind(this));
    this._itemWindow.setHandler("cancel", this.onItemCancel.bind(this));
    this.addWindow(this._itemWindow);
};
