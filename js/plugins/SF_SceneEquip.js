//=============================================================================
// SaltedFish Plugins - Scene Equip
// SF_SceneEquip.js
//=============================================================================
"use strict";
var Imported = Imported || {};
Imported.SF_SceneEquip = true;

var SF_Plugins = SF_Plugins || {};

//=============================================================================
/*:
 * @plugindesc Scene Equip
 * @author SaltedFish
 *
 * @help
 *
 * This plugin does not provide plugin commands.
 */
//=============================================================================

(function () {
    var SF_SceneEquip = {};
    SF_Plugins.SF_SceneEquip = SF_SceneEquip;
    SF_SceneEquip.version = 1.0;

    //=============================================================================
    // Window_BackGround
    //=============================================================================

    function Window_BackGround() {
        this.initialize.apply(this, arguments);
    }

    Window_BackGround.prototype = Object.create(Window_Base.prototype);
    Window_BackGround.prototype.constructor = Window_BackGround;

    Window_BackGround.prototype.initialize = function () {
        Window_Base.prototype.initialize.call(this, 380, 90, 440, 370);
    };

    //=============================================================================
    // Window_EquipStatus
    //=============================================================================

    SF_SceneEquip.ActorStatus = {
        hp: "血量",
        mp: "魔力",
        tp: "怒气",
        mhp: "血量上限",
        mmp: "魔法上限",
        atk: "攻击力",
        def: "防御力",
        mat: "魔法攻击力",
        mdf: "魔法防御力",
        agi: "敏捷",
        luk: "幸运",
        hit: "命中率",
        eva: "回避率",
        cri: "会心率",
        cev: "会心回避率",
        mev: "魔法回避率",
        mrf: "魔法反射率",
        cnt: "反击率",
        hrg: "生命自动回复率",
        mrg: "魔法自动回复率",
        trg: "TP自动回复率",
        tgr: "受到攻击机率",
        grd: "防御有效率",
        rec: "回复效果",
        pha: "药品有效率",
        mcr: "魔法消耗率",
        tcr: "TP消耗率",
        pdr: "物理伤害率",
        mdr: "魔法伤害率",
        fdr: "地形伤害率",
        exr: "经验值率",
    };

    function Window_EquipStatus() {
        this.initialize.apply(this, arguments);
    }

    Window_EquipStatus.prototype = Object.create(Window_ScrollHelp.prototype);
    Window_EquipStatus.prototype.constructor = Window_EquipStatus;

    Window_EquipStatus.prototype.initialize = function () {
        Window_ScrollHelp.prototype.initialize.call(this, 220, 170, 130, 250);
        this._actor = null;
        this._tempActor = null;
        this.refresh();
    };

    Window_EquipStatus.prototype.setActor = function (actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
        }
    };

    Window_EquipStatus.prototype.standardFontSize = function () {
        return 18;
    };

    Window_EquipStatus.prototype.lineHeight = function () {
        return this.standardFontSize() + 8;
    };

    Window_EquipStatus.prototype.measureContentHeight = function () {
        return this.fittingHeight(this.numVisibleRows());
    };

    Window_EquipStatus.prototype.measureContentWidth = function () {
        var max_w = 0;
        var h = this.measureContentHeight();
        for (var key in SF_SceneEquip.ActorStatus) {
            var w = this.drawItem(key, h + 10);
            if (w > max_w) {
                max_w = w;
            }
        }
        return max_w;
    };

    Window_EquipStatus.prototype.numVisibleRows = function () {
        return 28;
    };

    Window_EquipStatus.prototype.drawContent = function () {
        var y = 0;
        for (var key in SF_SceneEquip.ActorStatus) {
            this.drawItem(key, y);
            y += this.lineHeight();
        }
    };

    Window_EquipStatus.prototype.drawRightArrow = function (x, y) {
        this.changeTextColor(this.systemColor());
        return this.drawTextEx("\u2192", x, y);
    };

    Window_EquipStatus.prototype.drawItem = function (key, y) {
        var text = SF_SceneEquip.ActorStatus[key];
        var x = 0;
        this.changeTextColor(this.systemColor());
        x += this.drawTextEx(text + ": ", x, y);
        if (this._actor) {
            this.resetTextColor();
            x += this.drawTextEx(this._actor[key], x, y) + 10;
            x += this.drawRightArrow(x, y) + 10;
        }
        if (this._tempActor) {
            var newValue = this._tempActor[key];
            var diffvalue = newValue - this._actor[key];
            this.changeTextColor(this.paramchangeTextColor(diffvalue));
            x += this.drawTextEx(newValue, x, y);
        }
        return x;
    };

    Window_EquipStatus.prototype.isHaveContent = function () {
        return true;
    };

    Window_EquipStatus.prototype.windowWidth = function () {
        return 440;
    };

    Window_EquipStatus.prototype.windowHeight = function () {
        return 370;
    };

    //=============================================================================
    // Scene_Equip
    //=============================================================================

    SF_SceneEquip.Scene_Equip_create = Scene_Equip.prototype.create;
    Scene_Equip.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        // this.createHelpWindow();
        this.createCommandInBackground();
        this.createBackgroundWindow();
        //this.createCommandWindow();
        this.createStatusWindow();
        //this.createSlotWindow();
        //this.createItemWindow();
        //this.createActorWindow();
        //this.createEquipWindow();
    };

    Scene_Equip.prototype.createCommandInBackground = function () {
        this._commandBackground = new Sprite(SF_Plugins.SF_SceneMenu.commandBitmap);
        this._commandBackground.x = 0;
        this._commandBackground.y = 0;
        this.addChild(this._commandBackground);
    };

    // 380,90 440,370
    Scene_Equip.prototype.createBackgroundWindow = function () {
        this._backgroundWindow = new Window_BackGround();
        this.addChild(this._backgroundWindow);
    };

    Scene_Equip.prototype.createStatusWindow = function () {
        this._statusWindow = new Window_EquipStatus();
        this._backgroundWindow.addChild(this._statusWindow);
    };
})();
