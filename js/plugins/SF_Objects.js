//=============================================================================
// Salted Fish Plugins - Objects
// SF_Objects.js
//=============================================================================
"use strict";
var Imported = Imported || {};
Imported.SF_Objects = true;

var SF_Plugins = SF_Plugins || {};
//=============================================================================
/*:
 * @plugindesc objects lib for salted fish plugins
 * @author Salted Fish
 */
//=============================================================================

(function () {
    var SF_Objects = {};
    SF_Plugins.Objects = SF_Objects;

    SF_Objects.version = 1.0;

    //=============================================================================
    // Game_Action
    //=============================================================================

    SF_Objects.Game_Action_applyCritical = Game_Action.prototype.applyCritical;
    Game_Action.prototype.applyCritical = function (damage) {
        return damage * 2.4;
    };

    Game_Action.prototype.attackHit = function (target) {
        return this.subject().hit;
    };

    SF_Objects.Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function (target) {
        if (this.isAttack() || this.isSkill()) {
            var result = target.result();
            this.subject().clearResult();
            result.clear();
            result.used = this.testApply(target);
            result.missed = false;
            result.evaded =
                !result.missed &&
                !this.isCertainHit() &&
                Math.random() >= this.attackHit(target) - this.itemEva(target);
            result.physical = this.isPhysical();
            result.drain = this.isDrain();
            if (result.isHit()) {
                if (this.item().damage.type > 0) {
                    result.critical = Math.random() < this.subject().cri - target.cev;
                    var value = this.makeDamageValue(target, result.critical);
                    this.executeDamage(target, value);
                }
                this.item().effects.forEach(function (effect) {
                    this.applyItemEffect(target, effect);
                }, this);
                this.applyItemUserEffect(target);
            }
        } else {
            SF_Objects.Game_Action_apply.apply(this, arguments);
        }
    };
})();
