//=============================================================================
// Salted Fish Plugins - Custom Bless
// SF_CustomBless.js
//=============================================================================
"use strict";

var Imported = Imported || {};
Imported.SF_CustomBless = true;

var SF_Plugins = SF_Plugins || {};

//=============================================================================
/*:
 * @plugindesc 自定义加护，改自 LiuYue_FieldBless.js，感谢原作者！
 * @Author Salted Fish
 * @help
 * ============================================================================
 * - 介绍
 * ============================================================================
 * 加护，改自 LiuYue_FieldBless.js，感谢原作者！
 *
 * ============================================================================
 * - 使用方法
 * ============================================================================
 * 自定义位置均为 js 方法，需要通过 return 返回最终结果
 * this 如无特殊说明均指向 actor
 *
 * ============================================================================
 *  - 加护效果
 * ============================================================================
 * 加护本质是一个装备，需要放在数据库的装备中。
 *
 * ============================================================================
 *      - 加护的基本效果
 * ============================================================================
 * 加护支持修改角色的各种属性，包括：
 *      - 最大 HP (mhp param 0)
 *      - 最大 MP (mmp param 1)
 *      - 攻击力 (atk param 2)
 *      - 防御力 (def param 3)
 *      - 魔法攻击力 (mat param 4)
 *      - 魔法防御力 (mdf param 5)
 *      - 敏捷 (agi param 6)
 *      - 幸运 (luk xparam 0)
 *      - 命中率 (hit xparam 1)
 *      - 闪避率 (eva xparam 2)
 *      - 暴击率 (cri xparam 3)
 *      - 暴击闪避率 (cev xparam 4)
 *      - 魔法闪避率 (mev xparam 5)
 *      - 魔法反射率 (mrf xparam 6)
 *      - 反击率 (cnt xparam 7)
 *      - HP 回复率 (hrg xparam 8)
 *      - MP 回复率 (mrg xparam 9)
 *      - TP 回复率 (trg xparam 10)
 *      - 被敌人攻击率 (tgr sparam 0)
 *      - 防御效果率 (grd sparam 1)
 *      - 恢复效果率 (rec sparam 2)
 *      - 药水恢复率(pha sparam 3)
 *      - MP 消耗率 (mcr sparam 4)
 *      - TP 消耗率 (tcr sparam 5)
 *      - 物理伤害率 (pdr sparam 6)
 *      - 魔法伤害率 (mdr sparam 7)
 *      - 地形伤害率 (fdr sparam 8)
 *      - 经验获得率 (exr sparam 9)
 *
 *      - 最大 TP (maxtp)
 *
 * 命令方式为：
 * <SF_CustomBlessBasic Attr>
 * return x;
 * </SF_CustomBlessBasic Attr>
 * 执行时机：
 *      每次获取该属性的值时
 *      名称中的 Attr 为属性名称，具体名称参考上面的列表，比如 mhp
 *      执行顺序为：按照列表顺序，从第一个加护开始执行
 * 参数为：
 *      actor: 角色对象
 *      item: 装备
 *      value: 原始值
 * 返回值为：
 *      最终值
 * 默认为原始值
 *
 * <SF_CustomBlessBasic Attr: value>
 * 执行时机：
 *      每次获取该属性的值时
 *      名称中的 Attr 为属性名称，具体名称参考上面的列表，比如 mhp
 *      value 为该加护的追加值, 可以为负数
 * 参数为：
 *      actor: 角色对象
 *      item: 装备
 *      value: 原始值
 * 计算结果为：
 *      最终值 = 原始值 + value
 *
 * <SF_CustomBlessBasic Attr Per: per>
 * 执行时机：
 *      每次获取该属性的值时
 *      名称中的 Attr 为属性名称，具体名称参考上面的列表，比如 mhp
 *      per 为该加护的追加百分比, 可以为负数
 * 参数为：
 *      actor: 角色对象
 *      item: 装备
 *      value: 原始值
 * 计算结果为：
 *      最终值 = 原始值 * (1 + per / 100)
 *
 * 最终属性值计算方式为：
 *      - 最终值 = 原始值
 *      - 对于每个加护，按照列表顺序，依次执行命令 <SF_CustomBlessBasic Attr>，
 *          修改最终值, 此时传入的原始值为上一个加护的最终值
 *      - 对于每个加护，按照列表顺序，依次执行命令 <SF_CustomBlessBasic Attr: value>，
 *          修改最终值, 此时传入的原始值为上一个加护的最终值
 *      - 对于每个加护，按照列表顺序，依次执行命令
 *          <SF_CustomBlessBasic Attr Per: per>.
 *          先将 per 加起来, 然后计算最终值, 此时传入的原始值为步骤 3 的最终值
 *          比如有两个加护，第一个加护的 per 为 10，第二个加护的 per 为 20，
 *          则最终值 = 第 3 步的值 * (1 + (10 + 20) / 100)
 *
 */

(function () {
    var SF_CustomBless = SF_CustomBless || {};
    SF_Plugins.SF_CustomBless = SF_CustomBless;

    SF_CustomBless.BasicEffectAttrList = [
        "mhp",
        "mmp",
        "atk",
        "def",
        "mat",
        "mdf",
        "agi",
        "luk",
        "hit",
        "eva",
        "cri",
        "cev",
        "mev",
        "mrf",
        "cnt",
        "hrg",
        "mrg",
        "trg",
        "tgr",
        "grd",
        "rec",
        "pha",
        "mcr",
        "tcr",
        "pdr",
        "mdr",
        "fdr",
        "exr",
        "mtp",
    ];

    //=============================================================================
    // DataManager
    //=============================================================================
    SF_CustomBless.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function () {
        if (!SF_CustomBless.DataManager_isDatabaseLoaded.call(this)) return false;

        this.process_SF_CustomBlessBasicEffect($dataWeapons);
        this.process_SF_CustomBlessBasicEffect($dataArmors);
        return true;
    };

    DataManager.process_SF_CustomBlessBasicEffect = function (group) {
        var effectNoteStart = /^<SF_CustomBlessBasic \s*([^\s>:]*)\s*>$/i;
        var effectNoteEnd = /^<\/SF_CustomBlessBasic \s*([^\s>:]*)\s*>$/i;

        var effectAppendNote = /^<SF_CustomBlessBasic \s*([^\s>:]*)\s*:([^>]*)>$/i;
        var effectPerNote = /^<SF_CustomBlessBasic \s*([^\s>:]*)\s*Per\s*:([^>]*)>$/i;

        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            var notedata = obj.note.split(/[\r\n]+/);

            var attr = "";
            var evalMode = "none";

            var effectFuncStr = {};
            var effectAppendFuncStr = {};
            var effectPerFuncStr = {};

            obj.SF_CustomBless = obj.SF_CustomBless || {};

            obj.SF_CustomBless.basicEffectFunc = obj.SF_CustomBless.basicEffectFunc || {};
            obj.SF_CustomBless.basicEffectAppendFuncs = obj.SF_CustomBless.basicEffectAppendFuncs || {};
            obj.SF_CustomBless.basicEffectPerFuncs = obj.SF_CustomBless.basicEffectPerFuncs || {};

            for (var i = 0; i < notedata.length; i++) {
                var line = notedata[i];

                if (line.match(effectNoteStart)) {
                    evalMode = "effect";
                    attr = RegExp.$1.toLowerCase();
                    effectFuncStr[attr] = effectFuncStr[attr] || "";
                } else if (line.match(effectNoteEnd)) {
                    evalMode = "none";
                } else if (line.match(effectAppendNote)) {
                    attr = RegExp.$1.toLowerCase();
                    effectAppendFuncStr[attr] = effectAppendFuncStr[attr] || [];
                    effectAppendFuncStr[attr].push(RegExp.$2);
                } else if (line.match(effectPerNote)) {
                    attr = RegExp.$1.toLowerCase();
                    effectPerFuncStr[attr] = effectAppendFuncStr[attr] || [];
                    effectPerFuncStr[attr].push(RegExp.$2);
                } else if (evalMode === "effect") {
                    effectFuncStr[attr] += line + "\n";
                }
            }

            for (var attr in effectFuncStr) {
                if (!SF_CustomBless.BasicEffectAttrList.contains(attr)) {
                    continue;
                }
                if (!effectFuncStr[attr]) {
                    continue;
                }
                if (effectFuncStr[attr] === "") {
                    continue;
                }

                obj.SF_CustomBless.basicEffectFunc[attr] = new Function("actor", "item", "value", effectFuncStr[attr]);
            }

            for (var attr in effectAppendFuncStr) {
                if (!SF_CustomBless.BasicEffectAttrList.contains(attr)) {
                    continue;
                }
                if (!effectAppendFuncStr[attr]) {
                    continue;
                }
                for (var i = 0; i < effectAppendFuncStr[attr].length; i++) {
                    var funcStr = effectAppendFuncStr[attr][i];
                    if (!funcStr) {
                        continue;
                    }

                    obj.SF_CustomBless.basicEffectAppendFuncs[attr] =
                        obj.SF_CustomBless.basicEffectAppendFuncs[attr] || [];
                    obj.SF_CustomBless.basicEffectAppendFuncs[attr].push(
                        new Function("actor", "item", "value", "return (" + funcStr + ");")
                    );
                }
            }

            for (var attr in effectPerFuncStr) {
                if (!SF_CustomBless.BasicEffectAttrList.contains(attr)) {
                    continue;
                }
                if (!effectPerFuncStr[attr]) {
                    continue;
                }
                for (var i = 0; i < effectPerFuncStr[attr].length; i++) {
                    var funcStr = effectPerFuncStr[attr][i];
                    if (!funcStr) {
                        continue;
                    }

                    obj.SF_CustomBless.basicEffectPerFuncs[attr] = obj.SF_CustomBless.basicEffectPerFuncs[attr] || [];
                    obj.SF_CustomBless.basicEffectPerFuncs[attr].push(
                        new Function("actor", "item", "value", "return (" + funcStr + ");")
                    );
                }
            }
        }
    };

    //=============================================================================
    // Game_BattlerBase
    //=============================================================================
    Game_BattlerBase.prototype.SF_CustomBless = Game_BattlerBase.prototype.SF_CustomBless || {};
    Game_BattlerBase.prototype.SF_CustomBless.Installed = function () {
        return this.equips();
    };

    Game_BattlerBase.prototype.SF_CustomBless.InstalledNum = function () {
        return this.SF_CustomBless.Installed.call(this).length;
    };

    Game_BattlerBase.prototype.SF_CustomBless.BasicEffect_Item = function (item, effect, value) {
        var effect = effect.toLowerCase();
        if (!item) {
            return value;
        }
        if (!item.SF_CustomBless) {
            return value;
        }
        if (!item.SF_CustomBless.basicEffectFunc) {
            return value;
        }
        if (!item.SF_CustomBless.basicEffectFunc[effect]) {
            return value;
        }

        return item.SF_CustomBless.basicEffectFunc[effect].call(this, this, item, value);
    };

    Game_BattlerBase.prototype.SF_CustomBless.BasicEffect_Item_Append = function (item, effect, value) {
        var effect = effect.toLowerCase();
        if (!item) {
            return value;
        }
        if (!item.SF_CustomBless) {
            return value;
        }
        if (!item.SF_CustomBless.basicEffectAppendFuncs) {
            return value;
        }
        if (!item.SF_CustomBless.basicEffectAppendFuncs[effect]) {
            return value;
        }

        return item.SF_CustomBless.basicEffectAppendFuncs[effect].reduce(
            function (r, func) {
                return func.call(this, this, item, r);
            }.bind(this),
            value
        );
    };

    Game_BattlerBase.prototype.SF_CustomBless.BasicEffect_Item_Per = function (item, effect, value) {
        var effect = effect.toLowerCase();
        if (!item) {
            return 0;
        }
        if (!item.SF_CustomBless) {
            return 0;
        }
        if (!item.SF_CustomBless.basicEffectPerFuncs) {
            return 0;
        }
        if (!item.SF_CustomBless.basicEffectPerFuncs[effect]) {
            return 0;
        }

        return item.SF_CustomBless.basicEffectPerFuncs[effect].reduce(
            function (r, func) {
                return r + func.call(this, this, item, value);
            }.bind(this),
            0
        );
    };

    Game_BattlerBase.prototype.SF_CustomBless.BasicEffect = function (effect, value) {
        var percent = 100;

        value = this.SF_CustomBless.Installed.call(this).reduce(
            function (r, item) {
                return this.SF_CustomBless.BasicEffect_Item.call(this, item, effect, r);
            }.bind(this),
            value
        );

        value = this.SF_CustomBless.Installed.call(this).reduce(
            function (r, item) {
                return this.SF_CustomBless.BasicEffect_Item_Append.call(this, item, effect, r);
            }.bind(this),
            value
        );

        percent = this.SF_CustomBless.Installed.call(this).reduce(
            function (r, item) {
                return r + this.SF_CustomBless.BasicEffect_Item_Per.call(this, item, effect, value);
            }.bind(this),
            0
        );

        return value * (1 + percent / 100);
    };

    SF_CustomBless.Game_BattlerBase_maxTp = Game_BattlerBase.prototype.maxTp;
    Game_BattlerBase.prototype.maxTp = function () {
        var maxTp = SF_CustomBless.Game_BattlerBase_maxTp.call(this);
        return Math.floor(this.SF_CustomBless.BasicEffect.call(this, "mtp", maxTp));
    };

    SF_CustomBless.Game_BattlerBase_properties = Object.getOwnPropertyDescriptors(Game_BattlerBase.prototype);
    SF_CustomBless.Game_BattlerBase_OverridedProperties = [
        { name: "mhp", needFloor: true },
        { name: "mmp", needFloor: true },
        { name: "atk", needFloor: true },
        { name: "def", needFloor: true },
        { name: "mat", needFloor: true },
        { name: "mdf", needFloor: true },
        { name: "agi", needFloor: true },
        { name: "luk", needFloor: true },
        { name: "hit", needFloor: false },
        { name: "eva", needFloor: false },
        { name: "cri", needFloor: false },
        { name: "cev", needFloor: false },
        { name: "mev", needFloor: false },
        { name: "mrf", needFloor: false },
        { name: "cnt", needFloor: false },
        { name: "hrg", needFloor: false },
        { name: "mrg", needFloor: false },
        { name: "trg", needFloor: false },
        { name: "tgr", needFloor: false },
        { name: "grd", needFloor: false },
        { name: "rec", needFloor: false },
        { name: "pha", needFloor: false },
        { name: "mcr", needFloor: false },
        { name: "tcr", needFloor: false },
        { name: "pdr", needFloor: false },
        { name: "mdr", needFloor: false },
        { name: "fdr", needFloor: false },
        { name: "exr", needFloor: false },
    ];

    SF_CustomBless.Game_BattlerBase_OverridedProperties.forEach(function (prop) {
        var propFunc = SF_CustomBless.Game_BattlerBase_properties[prop.name];

        Object.defineProperty(Game_BattlerBase.prototype, prop.name, {
            get: function () {
                var value = null;

                if (propFunc && propFunc.get) {
                    value = propFunc.get.call(this);
                }
                value = value || 0;

                value = this.SF_CustomBless.BasicEffect.call(this, prop.name, value);
                return prop.needFloor ? Math.floor(value) : value;
            },
            configurable: true,
        });
    });
})();
