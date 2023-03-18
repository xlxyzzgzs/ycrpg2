//=============================================================================
// Yanfly Engine Plugins - Item Core Extension - Item Requirements
// YEP_X_ItemRequirements.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_ItemRequirements = true;

var Yanfly = Yanfly || {};
Yanfly.ItemReq = Yanfly.ItemReq || {};
Yanfly.ItemReq.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.01 物品使用限制★
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 导言
 *  ============================================================================
 * 
 * 这个插件需要YEP\u ItemCore。确保此插件位于
 * 是的，插件列表中有ItemCore。
 * 
 * 在RPG Maker MV中，默认情况下物品只有一些限制，
 * 不管他们是否能在战场上使用，或者永远不会使用。没有
 * 您可以设置的任何其他条件，这些条件将决定
 * 项目可以使用，也不能使用。这个插件提供了更多的方法来限制项目
 * 使用基于开关、变量、使用它们的参与者、类、状态
 * 要求，等等。
 * 
 *  ============================================================================
 * 便签
 *  ============================================================================
 * 
 * 使用以下NoteTag强制项目的要求，然后才可以
 * 被使用。
 * 
 * 项目注释标签：
 *
 *   <Enable Requirements>
 *    condition
 *    condition
 *   </Enable Requirements>
 *   - 将“条件”替换为所需的条件设置。您可以在notetag中插入任意数量的
 * 条件。必须满足所有条件才能使用该物品。下面列出可以使用的可能条件。
 *
 * ---
 *
 * 条件：
 *
 * ---
 *
 * Eval: code
 * - 将“code”替换为要对其运行检查以启用该项的JavaScript代码。
 * 如果检查返回false，则无论其他条件如何，该项都将被禁用。
 *
 * 示例：
 *   Eval: $gameActors.actor(1).name() === 'Harold'
 *   Eval: $gameActors.leader().name() !== 'Ralph'
 *
 * ---
 *
 * Actor: x
 * Actor: x, x, x
 * - 需要参与者ID“x”才能使用该项。如果参与者不是使用所述项目的人，
 * 则该项目被禁用，并且无论其他条件如何都不能使用。
 *
 * Not Actor: x
 * Not Actor: x, x, x
 * - 要求使用该项的参与者不是参与者ID“x”。如果参与者的ID与列出的
 * “x”之一匹配，则该项将被禁用，并且无论其他条件如何，都无法使用。
 *
 * 例如:
 *   Actor: 1
 *   Actor: 2, 3, 4, 5, 6
 *   Not Actor: 7
 *   Not Actor: 8, 9, 10
 *
 * ---
 *
 * Armor: x
 * Armor: x, x, x
 * - 要求演员特别装备防具ID“x”来使用物品。如果使用多个“x”，
 * 演员可以装备其中任何一个。如果演员没有装备护甲“x”，
 * 那么该物品将被禁用，并且无论其他条件如何都不能使用。
 *
 * Not Armor: x
 * Not Armor: x, x, x
 * - 要求演员没有装备护甲ID“x”来使用该物品。
 * 如果使用了多个“x”，则演员不能装备其中任何一个。
 * 如果演员装备了护甲“x”，那么该物品将被禁用，
 * 并且无论其他条件如何都不能使用。
 *
 * 例如:
 *   Armor: 1
 *   Armor: 2, 3, 4, 5, 6
 *   Not Armor: 7
 *   Not Armor: 8, 9, 10
 *
 * ---
 *
 * Class: x
 * Class: x, x, x
 * - 需要ID为“x”的类才能使用该项。如果参与者的类与项要求不匹配，
 * 则该项将被禁用，并且无论其他条件如何都不能使用。
 *
 * Not Class: x
 * Not Class: x, x, x
 * - 要求使用该项的参与者不是类ID“x”。如果参与者的类ID与列出的
 * “x”之一匹配，则该项将被禁用，并且无论其他条件如何，都无法使用。
 *
 * 例如:
 *   Class: 1
 *   Class: 2, 3, 4, 5, 6
 *   Not Class: 7
 *   Not Class: 8, 9, 10
 *
 * ---
 *
 * Subclass: x
 * Subclass: x, x, x
 * - 需要YEP\u X\u Subclass.js
 * - 需要子类ID“x”才能使用该项。如果参与者的类与项要求不匹配，
 * 则该项将被禁用，并且无论其他条件如何都不能使用。
 *
 * Not Subclass: x
 * Not Subclass: x, x, x
 * - Requires YEP_X_Subclass.js
 * - 要求使用项的参与者不是子类ID“x”。如果参与者的子类ID与列出的
 * “x”之一匹配，则该项将被禁用，并且无论其他条件如何，都无法使用。
 *
 * 例如:
 *   Subclass: 1
 *   Subclass: 2, 3, 4, 5, 6
 *   Not Subclass: 7
 *   Not Subclass: 8, 9, 10
 *
 * ---
 *
 * Either Class: x
 * Either Class: x, x, x
 * - Requires YEP_X_Subclass.js
 * - Requires YEP_X_Subclass.js
 * - 参与者的主类或子类ID必须与“x”匹配。如果其中至少有一个匹配，
 * 则条件通过。否则，条件失败，项目被禁用，无论其他条件如何，都无法使用。
 *
 * Neither Class: x
 * Neither Class: x, x, x
 * - Requires YEP_X_Subclass.js
 * - Requires YEP_X_Subclass.js
 * - 参与者的主类或子类ID必须与“x”不匹配。如果其中至少有一个匹配，
 * 则条件失败，并且该项被禁用，并且无论其他条件如何，都无法使用。
 *
 * 例如:
 *   Either Class: 1
 *   Either Class: 2, 3, 4, 5, 6
 *   Neither Class: 7
 *   Neither Class: 8, 9, 10
 *
 * ---
 *
 * State: x
 * State: x, x, x
 * - 要求使用该项的参与者受状态“x”的影响。如果使用多个“x”，
 * 则参与者可能会受到其中任何一个的影响。如果参与者不受状态“x”的影响，
 * 则条件将失败，并且该项将被禁用，并且无论其他条件如何，都无法使用。
 *
 * Not State: x
 * Not State: x, x, x
 * - 要求使用该项的参与者不受状态“x”的影响。如果使用了多个“x”，
 * 则参与者不会受到其中任何一个的影响。如果参与者不受状态“x”的影响，
 * 则条件将失败，并且该项将被禁用，并且无论其他条件如何，都无法使用。
 *
 * 例如:
 *   State: 10
 *   State: 11, 12, 13, 14, 15
 *   Not State: 16
 *   Not Stage: 17, 18, 19, 20
 *
 * ---
 *
 * Switch Off: x
 * Switch Off: x, x, x
 * - 需要关闭开关x才能使用该项目。如果开关打开，则该项目被禁用，无论
 * 其他条件如何，都无法使用。
 *
 * 例如:
 *   Switch Off: 1
 *   Switch Off: 2, 3, 4, 5, 6
 *
 * ---
 *
 * Switch On: x
 * Switch On: x, x, x
 * - 需要先打开开关x，然后才能使用该项。
 * 如果开关关闭，则该项目将被禁用，并且无论其他条件如何，都无法使用。
 *
 * 例如:
 *   Switch On: 1
 *   Switch On: 2, 3, 4, 5, 6
 *
 * ---
 *
 * Variable x eval
 * - 检查变量x。将“x”替换为整数值，“eval”替换为要对其运行的代码检查。
 *
 * 例如:
 *   Variable 1 >= 5
 *   Variable 2 < 6
 *   Variable 3 === 7
 *   Variable 4 !== 8
 *
 * ---
 *
 * Weapon: x
 * Weapon: x, x, x
 * - 要求演员特别装备武器ID“x”来使用物品。如果使用多个“x”，演员可以
 * 装备其中任何一个。如果演员没有装备武器“x”，那么该物品将被禁用，
 * 并且无论其他条件如何都不能使用。
 *
 * Not Weapon: x
 * Not Weapon: x, x, x
 * - 要求演员没有装备武器ID“x”来使用物品。
 * 如果使用了多个“x”，则演员不能装备其中任何一个。
 * 如果演员装备了武器“x”，那么该物品将被禁用，并且
 * 无论其他条件如何都不能使用。
 *
 * 例如:
 *   Weapon: 1
 *   Weapon: 2, 3, 4, 5, 6
 *   Not Weapon: 7
 *   Not Weapon: 8, 9, 10
 *
 * ---
 *
 * Weapon Type: x
 * Weapon Type: x, x, x
 * - 要求演员装备“x”型武器。如果使用多个“x”，演员可以装备
 * 任何一种“x”武器。如果参与者没有匹配的武器类型，那么该物品
 * 将被禁用，并且无论其他条件如何都不能使用。
 *
 * Not Weapon Type: x
 * Not Weapon Type: x, x, x
 * - 要求演员没有装备“x”型武器。如果使用了多个“x”，演员就不能
 * 装备任何“x”类武器。如果参与者确实拥有匹配的武器类型，那么该物品
 * 将被禁用，并且无论其他条件如何都不能使用。
 *
 * 例如:
 *   Weapon Type: 1
 *   Weapon Type: 2, 3, 4, 5, 6
 *   Not Weapon Type: 7
 *   Not Weapon Type: 8, 9, 10
 *
 * ============================================================================
 * 疯狂模式-自定义启用要求
 * ============================================================================
 *
 * For those with JavaScript experience, you can create your own custom
 * requirements for whether or not items can be used using the following
 * notetag setup:
 *
 * Item Notetags:
 *
 *   <Custom Enable Requirement>
 *    condition = battler.level >= item.price;
 *   </Custom Enable Requirement>
 *   - The 'condition' variable will determine whether or not the item will be
 *   enabled/disabled. If the 'condition' variable returns true, then the item
 *   is enabled provided all other conditions (if any) are also met. Otherwise,
 *   the item is disabled and cannot be used. The 'battler' variable will refer
 *   to the battler using the item. The 'item' variable will refer to the item
 *   being checked.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Imported.YEP_ItemCore) {

//=============================================================================
// DataManager
//=============================================================================

Yanfly.ItemReq.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.ItemReq.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_X_ItemRequirements) {
    this.processItemRequirementsNotetags1($dataItems);
    Yanfly._loaded_YEP_X_ItemRequirements = true;
  }
  
  return true;
};

DataManager.processItemRequirementsNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.itemRequirements = [];
    var evalMode = 'none';
    obj.customItemRequirements = '';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<ENABLE (?:REQUIREMENT|REQUIREMENTS)>/i)) {
        evalMode = 'enable requirements';
      } else if (line.match(/<\/ENABLE (?:REQUIREMENT|REQUIREMENTS)>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'enable requirements') {
        obj.itemRequirements.push(line);
      } else if (line.match(/<CUSTOM ENABLE (?:REQUIREMENT|REQUIREMENTS)>/i)) {
        evalMode = 'custom enable requirements';
      } else if (line.match(/<\/CUSTOM ENABLE (?:REQUIREMENT|REQUIREMENTS)>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'custom enable requirements') {
        obj.customItemRequirements += line + '\n';
      }
    }
  }
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Yanfly.ItemReq.Game_BattlerBase_mIC =
  Game_BattlerBase.prototype.meetsItemConditions;
Game_BattlerBase.prototype.meetsItemConditions = function(item) {
  if (!Yanfly.ItemReq.Game_BattlerBase_mIC.call(this, item)) {
    return false;
  }
  return ItemManager.meetsUsableItemRequirements(item, this);
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.isAtypeEquipped = function(atypeId) {
  return this.armors().some(function(armor) {
    return armor.atypeId === atypeId;
  });
};

//=============================================================================
// ItemManager
//=============================================================================

ItemManager.meetsUsableItemRequirements = function(item, battler) {
  if (!item) return false;
  if (!item.itemRequirements) {
    var baseItem = DataManager.getBaseItem(item);
    item.itemRequirements = JsonEx.makeDeepCopy(baseItem.itemRequirements);
  }
  var length = item.itemRequirements.length;
  if ($gameParty.inBattle()) var battler = this.battleSubject() || battler;
  for (var i = 0; i < length; ++i) {
    var line = item.itemRequirements[i];
    if (!line) continue;
    if (!this.checkUsableItemRequirement(line, item, battler)) return false;
  }
  if (item.customItemRequirements && item.customItemRequirements.length >= 1) {
    if (!this.checkCustomUsableItemRequirement(item, battler)) return false;
  }
  return true;
};

ItemManager.battleSubject = function() {
  return BattleManager.actor() || BattleManager._subject;
};

ItemManager.checkUsableItemRequirement = function(line, item, battler) {
  // EVAL
  if (line.match(/EVAL:(.*)/i)) {
    var code = String(RegExp.$1);
    return this.usableItemRequirementEval(code);
  }
  // NOT ACTOR
  if (line.match(/NOT ACTOR:(.*)/i)) {
    var data = String(RegExp.$1);
    return this.usableItemRequirementActor(data, battler, false);
  }
  // ACTOR
  if (line.match(/ACTOR:(.*)/i)) {
    var data = String(RegExp.$1);
    return this.usableItemRequirementActor(data, battler, true);
  }
  // NOT ARMOR TYPE
  if (line.match(/NOT ARMOR TYPE:(.*)/i)) {
    var data = String(RegExp.$1);
    return this.usableItemRequirementAtype(data, battler, false);
  }
  // ARMOR TYPE
  if (line.match(/ARMOR TYPE:(.*)/i)) {
    var data = String(RegExp.$1);
    return this.usableItemRequirementAtype(data, battler, true);
  }
  // NOT ARMOR
  if (line.match(/NOT ARMOR:(.*)/i)) {
    var data = String(RegExp.$1);
    return this.usableItemRequirementArmor(data, battler, false);
  }
  // ARMOR
  if (line.match(/ARMOR:(.*)/i)) {
    var data = String(RegExp.$1);
    return this.usableItemRequirementArmor(data, battler, true);
  }
  if (Imported.YEP_X_Subclass) {
    // NOT SUBCLASS
    if (line.match(/NOT SUBCLASS:(.*)/i)) {
      var data = String(RegExp.$1);
      return this.usableItemRequirementSubclass(data, battler, false);
    }
    // SUBCLASS
    if (line.match(/SUBCLASS:(.*)/i)) {
      var data = String(RegExp.$1);
      return this.usableItemRequirementSubclass(data, battler, true);
    }
    // EITHER CLASS
    if (line.match(/EITHER CLASS:(.*)/i)) {
      var data = String(RegExp.$1);
      return this.usableItemRequirementDuoClass(data, battler, true);
    }
    // NEITHER CLASS
    if (line.match(/NEITHER CLASS:(.*)/i)) {
      var data = String(RegExp.$1);
      return this.usableItemRequirementDuoClass(data, battler, false);
    }
  }
  // NOT CLASS
  if (line.match(/NOT CLASS:(.*)/i)) {
    var data = String(RegExp.$1);
    return this.usableItemRequirementClass(data, battler, false);
  }
  // CLASS
  if (line.match(/CLASS:(.*)/i)) {
    var data = String(RegExp.$1);
    return this.usableItemRequirementClass(data, battler, true);
  }
  // NOT STATE
  if (line.match(/NOT STATE:(.*)/i)) {
    var data = String(RegExp.$1);
    return this.usableItemRequirementState(data, battler, false);
  }
  // STATE
  if (line.match(/STATE:(.*)/i)) {
    var data = String(RegExp.$1);
    return this.usableItemRequirementState(data, battler, true);
  }
  // NOT WEAPON TYPE
  if (line.match(/NOT WEAPON TYPE:(.*)/i)) {
    var data = String(RegExp.$1);
    return this.usableItemRequirementWtype(data, battler, false);
  }
  // WEAPON TYPE
  if (line.match(/WEAPON TYPE:(.*)/i)) {
    var data = String(RegExp.$1);
    return this.usableItemRequirementWtype(data, battler, true);
  }
  // NOT WEAPON
  if (line.match(/NOT WEAPON:(.*)/i)) {
    var data = String(RegExp.$1);
    return this.usableItemRequirementWeapon(data, battler, false);
  }
  // WEAPON
  if (line.match(/WEAPON:(.*)/i)) {
    var data = String(RegExp.$1);
    return this.usableItemRequirementWeapon(data, battler, true);
  }
  // SWITCH OFF
  if (line.match(/SWITCH OFF:(.*)/i)) {
    var data = String(RegExp.$1);
    return this.usableItemRequirementSwitch(data, false);
  }
  // SWITCH ON
  if (line.match(/SWITCH ON:(.*)/i)) {
    var data = String(RegExp.$1);
    return this.usableItemRequirementSwitch(data, true);
  }
  // VARIABLE
  if (line.match(/VARIABLE[ ](\d+)[ ](.*)/i)) {
    var variableId = parseInt(RegExp.$1);
    var code = String(RegExp.$2);
    return this.usableItemRequirementVariable(variableId, code);
  }
  return true;
};

ItemManager.usableItemRequirementEval = function(code) {
  var value = false;
  try {
    eval(code);
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'CUSTOM ITEM USE EVAL CODE ERROR');
  }
  return value;
};

ItemManager.usableItemRequirementActor = function(data, battler, condition) {
  var array = data.split(',');
  var length = array.length;
  for (var i = 0; i < length; ++i) {
    var actorId = parseInt(array[i].trim());
    if (battler.actorId() === actorId) return condition;
  }
  return !condition;
};

ItemManager.usableItemRequirementClass = function(data, battler, condition) {
  var array = data.split(',');
  var length = array.length;
  for (var i = 0; i < length; ++i) {
    var classId = parseInt(array[i].trim());
    if (battler._classId === classId) return condition;
  }
  return !condition;
};

ItemManager.usableItemRequirementDuoClass = function(data, battler, condition) {
  var array = data.split(',');
  var length = array.length;
  for (var i = 0; i < length; ++i) {
    var classId = parseInt(array[i].trim());
    var subclassId = parseInt(array[i].trim());
    if (battler._classId === classId || battler._subclassId === subclassId) {
      return condition;
    }
  }
  return !condition;
};

ItemManager.usableItemRequirementSubclass = function(data, battler, condition) {
  var array = data.split(',');
  var length = array.length;
  for (var i = 0; i < length; ++i) {
    var subclassId = parseInt(array[i].trim());
    if (battler._subclassId === subclassId) return condition;
  }
  return !condition;
};

ItemManager.usableItemRequirementState = function(data, battler, condition) {
  var array = data.split(',');
  var length = array.length;
  for (var i = 0; i < length; ++i) {
    var stateId = parseInt(array[i].trim());
    var state = $dataStates[stateId];
    if (battler.states().contains(state)) return condition;
  }
  return !condition;
};

ItemManager.usableItemRequirementWtype = function(data, battler, condition) {
  var array = data.split(',');
  var length = array.length;
  for (var i = 0; i < length; ++i) {
    var id = parseInt(array[i].trim());
    if (battler.isWtypeEquipped(id)) return condition;
  }
  return !condition;
};

ItemManager.usableItemRequirementWeapon = function(data, battler, condition) {
  var array = data.split(',');
  var length = array.length;
  for (var i = 0; i < length; ++i) {
    var id = parseInt(array[i].trim());
    var equip = $dataWeapons[id];
    if (battler.hasWeapon(equip)) return condition;
  }
  return !condition;
};

ItemManager.usableItemRequirementAtype = function(data, battler, condition) {
  var array = data.split(',');
  var length = array.length;
  for (var i = 0; i < length; ++i) {
    var id = parseInt(array[i].trim());
    if (battler.isAtypeEquipped(id)) return condition;
  }
  return !condition;
};

ItemManager.usableItemRequirementArmor = function(data, battler, condition) {
  var array = data.split(',');
  var length = array.length;
  for (var i = 0; i < length; ++i) {
    var id = parseInt(array[i].trim());
    var equip = $dataArmors[id];
    if (battler.hasArmor(equip)) return condition;
  }
  return !condition;
};

ItemManager.usableItemRequirementSwitch = function(data, condition) {
  var array = data.split(',');
  var length = array.length;
  for (var i = 0; i < length; ++i) {
    var switchId = parseInt(array[i].trim());
    if ($gameSwitches.value(switchId) !== condition) return false;
  }
  return true;
};

ItemManager.usableItemRequirementVariable = function(variableId, code) {
  return eval('$gameVariables.value(variableId) ' + code);
};

ItemManager.checkCustomUsableItemRequirement = function(item, battler) {
  var condition = false;
  var user = battler;
  var a = battler;
  var b = battler;
  var target = battler;
  var subject = battler;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var code = item.customItemRequirements;
  try {
    eval(code);
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'CUSTOM ITEM USE REQUIREMENT CODE ERROR');
  }
  return condition;
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
// End of File
//=============================================================================
} else {

var text = '================================================================\n';
text += 'YEP_X_ItemRequirements requires YEP_ItemCore to be at the ';
text += 'latest version to run properly.\n\nPlease go to www.yanfly.moe and ';
text += 'update to the latest version for the YEP_ItemCore plugin.\n';
text += '================================================================\n';
console.log(text);
require('nw.gui').Window.get().showDevTools();

} // // Imported.YEP_ItemCore