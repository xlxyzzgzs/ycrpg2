//=============================================================================
// ActorEquipSlots.js
//=============================================================================

/*:
* @plugindesc Actor Equip Slots
* @author Morpho(dongdongDJH)
*
* @help
*  在角色备注栏添加相应备注可自定义装备栏，装备类型序号参考系统设置。
*  用途：自由定义装备栏。
*  格式：<equipSlots:装备类型序号,装备类型序号,装备类型序号,装备类型序号,装备类型序号>。
*  例：<equipSlots:1,1,1,2,3>。
*  备注：不要填入不存在的装备类型序号。
*  windows.js   2295行Window_EquipStatus.prototype.numVisibleRows
*/
(function() {
    Game_Actor.prototype.equipSlots = function() {
        var slots = [];
        for (var i = 1; i < $dataSystem.equipTypes.length; i++) {
            slots.push(i);
        }
        if (slots.length >= 2 && this.isDualWield()) {
            slots[1] = 1;
        }
        if (this.actor().meta.equipSlots) {
            var n = 0
            do {
                slots[n] = Number(this.actor().meta.equipSlots.split(",")[n]);
                n += 1;
            } while (this.actor().meta.equipSlots.split(",")[n] != null);
            slots.length = n;
        };
        return slots;
    };
   
}());