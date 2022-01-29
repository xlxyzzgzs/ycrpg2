//=============================================================================
/*:
    * @plugindesc Test Plugins
    * @author SaltedFish
    * 
    * @param test1
    * @type actor
    */
var Imported = Imported || {};
Imported.SF_TestPlugins = true;

var SF_Plugins = SF_Plugins || {};
SF_Plugins.SF_TestPlugins = SF_Plugins.SF_TestPlugins || {};
SF_Plugins.SF_TestPlugins.version = 1.0;

sc = Scene_Title.prototype.create;
Scene_Title.prototype.create = function () {
    sc.call(this);

}
