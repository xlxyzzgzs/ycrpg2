//=============================================================================
// Yanfly Engine Plugins - Options Core
// YEP_OptionsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_OptionsCore = true;

var Yanfly = Yanfly || {};
Yanfly.Options = Yanfly.Options || {};
Yanfly.Options.version = 1.01;

//=============================================================================
/*:
 * @plugindesc v1.01 选项核心☁️
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * 警告：此插件将与RPG Maker MV 1.5.0或更高版本一起使用！
 * 这是因为MV 1.5.0+编辑器允许以有序和高效的方式制作插件。
 * 请确保您的RPG Maker MV软件在使用此插件前是最新的。
 *
 * 选项菜单可以改变玩家在游戏中的设置。在选项菜单中，玩家可以根据自己
 * 的喜好改变任何设置以适应他们的游戏风格。
 * 默认情况下，RPG Maker MV中包含“Always Dash”和“Command Remember”等设置，
 * 为MV制作的其他插件也可能会将更新的选项添加到列表中。
 * 但是，菜单本身总是有点不便，无法便捷查看或调整。
 * 这个插件可以设置选项菜单的选项以适应游戏！
 *
 * 这个插件支持以下插件：
 * - GamepadConfig.js
 * - YEP_AnimateTilesOption.js
 * - YEP_BattleAniSpeedOpt.js
 * - YEP_FpsSynchOption.js
 * - YEP_KeyboardConfig.js
 * - YEP_X_ActSeqPack3.js
 * - YEP_X_BattleSysATB.js
 * - YEP_X_DifficultySlider.js
 *
 * 请将它们更新到最新版本，以便与Options Core具有兼容性。
 *
 * ============================================================================
 * 说明-选项类别插件参数
 * ============================================================================
 *
 * 该插件将“选项类别”添加到选项菜单中。除了“全部”和“退出”类别之外，
 * 所有类别都自定义显示。
 *
 * 以下是每个参数的介绍:
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *   Name:
 *   - 名称：- 确定显示的类别名称。按照您认为合适的名称重命名类别。
 * 您可以使用此参数的文本代码，允许您添加图标（\ i [x]）或更改类别
 * 文本颜色（\ c [x]）。
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *   Help Description:
 *   - 帮助说明：- 这是帮助中显示在选项菜单的顶部。
 * 用它来描述此类别中将出现哪些选项以及它们将如何影响游戏。
 * 您也可以使用此参数的文本代码。
 *
 *   Options List:
 *   - 选项列表：- 这是显示出现在选项菜单右侧的选项列表。
 * 您可以添加，编辑，移动或删除此列表中的选项。
 * 有关选项列表的插件参数如何工作的详细信息，请参阅下面的下一部分：
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * ============================================================================
 * 说明-选项列表插件参数
 * ============================================================================
 *
 * 本节介绍Options List的插件参数以及它们如何交互。
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *   Name:
 *   - 名称：- 确定选项名称的显示名称。请重命名该选项。这不会默认
 * 使用其他插件提供的命令名称。您可以使用此参数的文本代码，
 * 允许您添加图标（\ i [x]）或更改选项的文本颜色（\ c [x]）。
 *
 * 如果您将此名称命名为'EVAL：code'而不带'引号'，则此选项的
 * 名称将为代码输出的任何字符串。
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *   Help Description:
 *   - 帮助说明：- 这是帮助中显示的在选项菜单的顶部文字，用它来描述
 * 这个选项在游戏中的变化。
 *
 *   ---
 *
 *   Symbol:
 *   - 符号：- 这是选项的标识符。每个选项都应该有一个唯一的符号，
 * 以免在选项设置中导致冲突。但是，只要您选择时执行相同的功能，您就
 * 可以使用共享符号。
 *
 *   ---
 *
 *   Show/Hide:
 *   - 显示/隐藏：- 这是用于确定此选项是否可见。
 *
 *     确保它始终显示，请使用以下代码:
 *     show = true;
 *
 *   ---
 *
 *   Enable:
 *   - 启用：- 这是用于确定是否启用此选项的代码。
 * 建议您将所有选项保留为启用状态。
 *
 *     要确保它始终处于启用状态，请使用以下代码:
 *     enabled = true;
 *
 *   ---
 *
 *   Ext:
 *   - 分机：- 代表分机。
 * 这是该选项的第二个符号，它几乎可以用于任何事情。
 * 它对选项没有直接的影响。
 *
 *     To leave it alone the following code:
 *     ext = 0;
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *   如果您不熟悉编程，以下部分最好不要触动任何JS代码，这是因为
 *   所有与选项有关的行为都可以从这里控制，而错误会导致游戏崩溃。
 *
 *   Make Command Code:
 *   - 制作命令代码：- 这是用于将选项命令添加到选项列表的代码。
 *     使用它来修改名称，符号（如果已启用），或在最终将其添加到
 *     列表之前更改ext值。
 *
 *     The default code:
 *     this.addCommand(name, symbol, enabled, ext);
 *
 *   ---
 *
 *   Draw Option Code:
 *   - 绘制选项代码：- 这是如何将选项“绘制”到“选项”窗口
 * 并由玩家看到的。这里的一切都控制着选项从命名方式到文本位置的方式。
 * 为了方便起见，将定义在默认代码开始处的大部分变量放在那里。
 *
 *     The default code:
 *     var rect = this.itemRectForText(index);
 *     var statusWidth = this.statusWidth();
 *     var titleWidth = rect.width - statusWidth;
 *     this.resetTextColor();
 *     this.changePaintOpacity(this.isCommandEnabled(index));
 *     this.drawOptionsName(index);
 *     this.drawOptionsOnOff(index);
 *
 *   ---
 *
 *   Process OK Code:
 *   - 处理OK代码：- 这是当玩家在此选项上按下任何种类的确认按钮
 * （Z，Enter，Left Click）时运行的代码。对于大多数选项，
 * 这将在ON / OFF选项之间切换，或者循环选项。
 *
 * The default code:
 *
 *     The default code:
 *     var index = this.index();
 *     var symbol = this.commandSymbol(index);
 *     var value = this.getConfigValue(symbol);
 *     this.changeValue(symbol, !value);
 *
 *   ---
 *
 *   Cursor Right Code:
 *   - 光标右代码：- 这是当玩家按下右键按钮时运行的代码。
 * 通常情况下，这会将大部分选项移至ON位置，或者选择上一个。
 *
 *     The default code:
 *     var index = this.index();
 *     var symbol = this.commandSymbol(index);
 *     var value = this.getConfigValue(symbol);
 *     this.changeValue(symbol, true);
 *
 *   ---
 *
 *   Cursor Left Code:
 *   - 光标左代码：- 这是当玩家按下左键时运行的代码。
 * 通常情况下，这会将大多数选项移至OFF位置，选择下一个。
 *
 *     The default code:
 *     var index = this.index();
 *     var symbol = this.commandSymbol(index);
 *     var value = this.getConfigValue(symbol);
 *     this.changeValue(symbol, false);
 *
 *   ---
 *
 *   Default Config Code:
 *   - 默认配置代码：- 创建新选项时，这决定了选项的默认值。
 * 对于大多数选项来说，这从OFF位置开始，通常由“假”布尔值表示。
 *
 *     The default code:
 *     ConfigManager[symbol] = false;
 *
 *   ---
 *
 *   Save Config Code:
 *   - This 保存配置代码：- 这决定了如何通过代码保存选项设置。
 * 通常情况下，它的值与ConfigManager相同。
 *
 *     The default code:
 *     config[symbol] = ConfigManager[symbol];
 *
 *   ---
 *
 *   Load Config Code:
 *   - 加载配置代码：- 这决定了ConfigManager在加载游戏时如何加载保存
 * 的选项设置。通常情况下，这会采用配置
 * 文件中存储的任何设置，并直接将其直接植入ConfigManager中。
 *
 *     The default code:
 *     ConfigManager[symbol] = !!config[symbol];
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Updated for Message Speed Options.
 *
 * Version 1.00:
 * - Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @param ---Categories---
 * @default
 *
 * @param OptionsCategories
 * @text 选项类别
 * @parent ---Categories---
 * @type struct<Categories>[]
 * @desc 在"选项"场景中找到的类别。
 * @default ["{\"Name\":\"\\\\i[87]General\",\"---Settings---\":\"\",\"HelpDesc\":\"\\\"General settings that alter the way the game behaves.\\\"\",\"OptionsList\":\"[\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[87]Always Dash\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Player walks when OFF. Player dashes when ON.\\\\\\\\\\\\\\\\nHolding SHIFT switches between walking and dashing.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"alwaysDash\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nthis.drawOptionsOnOff(index);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, !value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, true);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, false);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = false;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"config[symbol] = ConfigManager[symbol];\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = config[symbol];\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[87]Command Remember\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Game remembers the last command selected during battle.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"commandRemember\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nthis.drawOptionsOnOff(index);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, !value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, true);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, false);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = false;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"config[symbol] = ConfigManager[symbol];\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = config[symbol];\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[87]ATB Speed\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Determines how fast the ATB Gauge fills up during battle.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"atbSpeed\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"if (Imported.YEP_X_BattleSysATB) {\\\\\\\\\\\\\\\\n  show = $gameSystem.getBattleSystem() === 'atb';\\\\\\\\\\\\\\\\n} else {\\\\\\\\\\\\\\\\n  show = false;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvar rate = value / 10;\\\\\\\\\\\\\\\\nvar gaugeColor1 = this.textColor(13);\\\\\\\\\\\\\\\\nvar gaugeColor2 = this.textColor(5);\\\\\\\\\\\\\\\\nthis.drawOptionsGauge(index, rate, gaugeColor1, gaugeColor2);\\\\\\\\\\\\\\\\nthis.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'center');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += 1;\\\\\\\\\\\\\\\\nif (value > 10) value = 1;\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += 1;\\\\\\\\\\\\\\\\nif (value > 10) value = 1;\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue -= 1;\\\\\\\\\\\\\\\\nif (value < 1) value = 10;\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[87]Enemy Difficulty\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Determines the level strength of enemies.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"difficultySlider\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"if (Imported.YEP_X_DifficultySlider) {\\\\\\\\\\\\\\\\n  show = $gameSystem.showDifficultySlider();\\\\\\\\\\\\\\\\n} else {\\\\\\\\\\\\\\\\n  show = false;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvar rate = value / Yanfly.Param.DSliderMaxDif;\\\\\\\\\\\\\\\\nvar gaugeColor1 = this.textColor(28);\\\\\\\\\\\\\\\\nvar gaugeColor2 = this.textColor(29);\\\\\\\\\\\\\\\\nthis.drawOptionsGauge(index, rate, gaugeColor1, gaugeColor2);\\\\\\\\\\\\\\\\nthis.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'center');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += Yanfly.Param.DSliderChange;\\\\\\\\\\\\\\\\nif (value > Yanfly.Param.DSliderMaxDif) value = Yanfly.Param.DSliderMinDif;\\\\\\\\\\\\\\\\nvalue = value.clamp(Yanfly.Param.DSliderMinDif, Yanfly.Param.DSliderMaxDif);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += Yanfly.Param.DSliderChange;\\\\\\\\\\\\\\\\nvalue = value.clamp(Yanfly.Param.DSliderMinDif, Yanfly.Param.DSliderMaxDif);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue -= Yanfly.Param.DSliderChange;\\\\\\\\\\\\\\\\nvalue = value.clamp(Yanfly.Param.DSliderMinDif,\\\\\\\\\\\\\\\\nYanfly.Param.DSliderMaxDif);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[87]Message Speed\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Changes the speed text is displayed during messages.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"messageSpeed\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = Imported.YEP_X_MessageSpeedOpt;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvar rate = ((value) / 10).clamp(0, 1);\\\\\\\\\\\\\\\\nif (value > 10) {\\\\\\\\\\\\\\\\n  var gaugeColor1 = this.textColor(14);\\\\\\\\\\\\\\\\n  var gaugeColor2 = this.textColor(6);\\\\\\\\\\\\\\\\n} else {\\\\\\\\\\\\\\\\n  var gaugeColor1 = this.textColor(20);\\\\\\\\\\\\\\\\n  var gaugeColor2 = this.textColor(21);\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\\nthis.drawOptionsGauge(index, rate, gaugeColor1, gaugeColor2);\\\\\\\\\\\\\\\\nthis.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'center');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += 1;\\\\\\\\\\\\\\\\nif (value > 11) value = 0;\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 11);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += 1;\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 11);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue -= 1;\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 11);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[87]Quest Window\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Show a window displaying the currently active\\\\\\\\\\\\\\\\nquest on the screen while exploring.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"mapQuestWindow\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = Imported.YEP_X_MapQuestWindow;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nthis.drawOptionsOnOff(index);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, !value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, true);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, false);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\" \\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\" \\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"none\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}","{\"Name\":\"\\\\i[80]Audio\",\"---Settings---\":\"\",\"HelpDesc\":\"\\\"Adjust the audio settings for the game.\\\"\",\"OptionsList\":\"[\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[80]Master Volume\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Adjusts the overall volume of the game.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"masterVolume\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvar rate = value / 100;\\\\\\\\\\\\\\\\nvar gaugeColor1 = this.textColor(22);\\\\\\\\\\\\\\\\nvar gaugeColor2 = this.textColor(23);\\\\\\\\\\\\\\\\nthis.drawOptionsGauge(index, rate, gaugeColor1, gaugeColor2);\\\\\\\\\\\\\\\\nthis.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'center');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += this.volumeOffset();\\\\\\\\\\\\\\\\nif (value > 100) {\\\\\\\\\\\\\\\\n  value = 0;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += this.volumeOffset();\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue -= this.volumeOffset();\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = 100;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"config[symbol] = ConfigManager[symbol];\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var value = config[symbol];\\\\\\\\\\\\\\\\nif (value !== undefined) {\\\\\\\\\\\\\\\\n  ConfigManager[symbol] = Number(value).clamp(0, 100);\\\\\\\\\\\\\\\\n} else {\\\\\\\\\\\\\\\\n  ConfigManager[symbol] = 100;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[80]BGM Volume\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Adjusts the volume of the background music.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"bgmVolume\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvar rate = value / 100;\\\\\\\\\\\\\\\\nvar gaugeColor1 = this.textColor(30);\\\\\\\\\\\\\\\\nvar gaugeColor2 = this.textColor(31);\\\\\\\\\\\\\\\\nthis.drawOptionsGauge(index, rate, gaugeColor1, gaugeColor2);\\\\\\\\\\\\\\\\nthis.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'center');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += this.volumeOffset();\\\\\\\\\\\\\\\\nif (value > 100) {\\\\\\\\\\\\\\\\n  value = 0;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += this.volumeOffset();\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue -= this.volumeOffset();\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = 100;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"config[symbol] = ConfigManager[symbol];\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var value = config[symbol];\\\\\\\\\\\\\\\\nif (value !== undefined) {\\\\\\\\\\\\\\\\n  ConfigManager[symbol] = Number(value).clamp(0, 100);\\\\\\\\\\\\\\\\n} else {\\\\\\\\\\\\\\\\n  ConfigManager[symbol] = 100;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[80]BGS Volume\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Adjusts the volume of the background sound effects.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"bgsVolume\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvar rate = value / 100;\\\\\\\\\\\\\\\\nvar gaugeColor1 = this.textColor(30);\\\\\\\\\\\\\\\\nvar gaugeColor2 = this.textColor(31);\\\\\\\\\\\\\\\\nthis.drawOptionsGauge(index, rate, gaugeColor1, gaugeColor2);\\\\\\\\\\\\\\\\nthis.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'center');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += this.volumeOffset();\\\\\\\\\\\\\\\\nif (value > 100) {\\\\\\\\\\\\\\\\n  value = 0;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += this.volumeOffset();\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue -= this.volumeOffset();\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = 100;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"config[symbol] = ConfigManager[symbol];\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var value = config[symbol];\\\\\\\\\\\\\\\\nif (value !== undefined) {\\\\\\\\\\\\\\\\n  ConfigManager[symbol] = Number(value).clamp(0, 100);\\\\\\\\\\\\\\\\n} else {\\\\\\\\\\\\\\\\n  ConfigManager[symbol] = 100;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[80]ME Volume\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Adjusts the volume of the melody effects\\\\\\\\\\\\\\\\nsuch as fanfares.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"meVolume\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvar rate = value / 100;\\\\\\\\\\\\\\\\nvar gaugeColor1 = this.textColor(30);\\\\\\\\\\\\\\\\nvar gaugeColor2 = this.textColor(31);\\\\\\\\\\\\\\\\nthis.drawOptionsGauge(index, rate, gaugeColor1, gaugeColor2);\\\\\\\\\\\\\\\\nthis.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'center');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += this.volumeOffset();\\\\\\\\\\\\\\\\nif (value > 100) {\\\\\\\\\\\\\\\\n  value = 0;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += this.volumeOffset();\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue -= this.volumeOffset();\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = 100;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"config[symbol] = ConfigManager[symbol];\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var value = config[symbol];\\\\\\\\\\\\\\\\nif (value !== undefined) {\\\\\\\\\\\\\\\\n  ConfigManager[symbol] = Number(value).clamp(0, 100);\\\\\\\\\\\\\\\\n} else {\\\\\\\\\\\\\\\\n  ConfigManager[symbol] = 100;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[80]SE Volume\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Adjusts the volume of the sound effects.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"seVolume\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvar rate = value / 100;\\\\\\\\\\\\\\\\nvar gaugeColor1 = this.textColor(30);\\\\\\\\\\\\\\\\nvar gaugeColor2 = this.textColor(31);\\\\\\\\\\\\\\\\nthis.drawOptionsGauge(index, rate, gaugeColor1, gaugeColor2);\\\\\\\\\\\\\\\\nthis.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'center');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += this.volumeOffset();\\\\\\\\\\\\\\\\nif (value > 100) {\\\\\\\\\\\\\\\\n  value = 0;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += this.volumeOffset();\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue -= this.volumeOffset();\\\\\\\\\\\\\\\\nvalue = value.clamp(0, 100);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = 100;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"config[symbol] = ConfigManager[symbol];\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var value = config[symbol];\\\\\\\\\\\\\\\\nif (value !== undefined) {\\\\\\\\\\\\\\\\n  ConfigManager[symbol] = Number(value).clamp(0, 100);\\\\\\\\\\\\\\\\n} else {\\\\\\\\\\\\\\\\n  ConfigManager[symbol] = 100;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\" \\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\" \\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"none\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}","{\"Name\":\"\\\\i[302]Visual\",\"---Settings---\":\"\",\"HelpDesc\":\"\\\"Settings that adjust the visual properties of the game.\\\"\",\"OptionsList\":\"[\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[309]Window Tone: Red\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Changes the window tone's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[2]red\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] value.\\\\\\\\\\\\\\\\nHold SHIFT while pressing LEFT/RIGHT to adjust more.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"windowToneRed\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nvar value = $gameSystem.windowTone()[0];\\\\\\\\\\\\\\\\nvar rate = (value + 255) / 510;\\\\\\\\\\\\\\\\nvar gaugeColor1 = this.textColor(2);\\\\\\\\\\\\\\\\nvar gaugeColor2 = this.textColor(10);\\\\\\\\\\\\\\\\nthis.drawOptionsGauge(index, rate, gaugeColor1, gaugeColor2);\\\\\\\\\\\\\\\\nthis.drawText(value, titleWidth, rect.y, statusWidth, 'center');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = $dataSystem.windowTone[0];\\\\\\\\\\\\\\\\nthis.changeWindowTone(symbol, value, 'red');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = $gameSystem.windowTone()[0];\\\\\\\\\\\\\\\\nvar offset = this.windowToneOffset();\\\\\\\\\\\\\\\\nif (Input.isPressed('shift')) offset *= 10;\\\\\\\\\\\\\\\\nvalue += offset;\\\\\\\\\\\\\\\\nthis.changeWindowTone(symbol, value, 'red');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = $gameSystem.windowTone()[0];\\\\\\\\\\\\\\\\nvar offset = this.windowToneOffset();\\\\\\\\\\\\\\\\nif (Input.isPressed('shift')) offset *= 10;\\\\\\\\\\\\\\\\nvalue -= offset;\\\\\\\\\\\\\\\\nthis.changeWindowTone(symbol, value, 'red');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = false;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"config[symbol] = ConfigManager[symbol];\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = !!config[symbol];\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[311]Window Tone: Green\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Changes the window tone's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[3]green\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] value.\\\\\\\\\\\\\\\\nHold SHIFT while pressing LEFT/RIGHT to adjust more.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"windowToneGreen\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nvar value = $gameSystem.windowTone()[1];\\\\\\\\\\\\\\\\nvar rate = (value + 255) / 510;\\\\\\\\\\\\\\\\nvar gaugeColor1 = this.textColor(3);\\\\\\\\\\\\\\\\nvar gaugeColor2 = this.textColor(11);\\\\\\\\\\\\\\\\nthis.drawOptionsGauge(index, rate, gaugeColor1, gaugeColor2);\\\\\\\\\\\\\\\\nthis.drawText(value, titleWidth, rect.y, statusWidth, 'center');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = $dataSystem.windowTone[1];\\\\\\\\\\\\\\\\nthis.changeWindowTone(symbol, value, 'green');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = $gameSystem.windowTone()[1];\\\\\\\\\\\\\\\\nvar offset = this.windowToneOffset();\\\\\\\\\\\\\\\\nif (Input.isPressed('shift')) offset *= 10;\\\\\\\\\\\\\\\\nvalue += offset;\\\\\\\\\\\\\\\\nthis.changeWindowTone(symbol, value, 'green');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = $gameSystem.windowTone()[1];\\\\\\\\\\\\\\\\nvar offset = this.windowToneOffset();\\\\\\\\\\\\\\\\nif (Input.isPressed('shift')) offset *= 10;\\\\\\\\\\\\\\\\nvalue -= offset;\\\\\\\\\\\\\\\\nthis.changeWindowTone(symbol, value, 'green');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = false;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"config[symbol] = ConfigManager[symbol];\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = !!config[symbol];\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[312]Window Tone: Blue\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Changes the window tone's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[1]blue\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] value.\\\\\\\\\\\\\\\\nHold SHIFT while pressing LEFT/RIGHT to adjust more.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"windowToneBlue\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nvar value = $gameSystem.windowTone()[2];\\\\\\\\\\\\\\\\nvar rate = (value + 255) / 510;\\\\\\\\\\\\\\\\nvar gaugeColor1 = this.textColor(1);\\\\\\\\\\\\\\\\nvar gaugeColor2 = this.textColor(9);\\\\\\\\\\\\\\\\nthis.drawOptionsGauge(index, rate, gaugeColor1, gaugeColor2);\\\\\\\\\\\\\\\\nthis.drawText(value, titleWidth, rect.y, statusWidth, 'center');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = $dataSystem.windowTone[2];\\\\\\\\\\\\\\\\nthis.changeWindowTone(symbol, value, 'blue');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = $gameSystem.windowTone()[2];\\\\\\\\\\\\\\\\nvar offset = this.windowToneOffset();\\\\\\\\\\\\\\\\nif (Input.isPressed('shift')) offset *= 10;\\\\\\\\\\\\\\\\nvalue += offset;\\\\\\\\\\\\\\\\nthis.changeWindowTone(symbol, value, 'blue');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = $gameSystem.windowTone()[2];\\\\\\\\\\\\\\\\nvar offset = this.windowToneOffset();\\\\\\\\\\\\\\\\nif (Input.isPressed('shift')) offset *= 10;\\\\\\\\\\\\\\\\nvalue -= offset;\\\\\\\\\\\\\\\\nthis.changeWindowTone(symbol, value, 'blue');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = false;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"config[symbol] = ConfigManager[symbol];\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ConfigManager[symbol] = !!config[symbol];\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\" \\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\" \\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"none\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"if (Imported.YEP_StaticTilesOption) {\\\\\\\\\\\\\\\\n  show = true;\\\\\\\\\\\\\\\\n} else if (Imported.YEP_BattleAniSpeedOpt) {\\\\\\\\\\\\\\\\n  show = true;\\\\\\\\\\\\\\\\n} else if (Imported.YEP_X_ActSeqPack3) {\\\\\\\\\\\\\\\\n  show = true;\\\\\\\\\\\\\\\\n} else if (Imported.YEP_SynchFpsOption) {\\\\\\\\\\\\\\\\n  show = true;\\\\\\\\\\\\\\\\n} else {\\\\\\\\\\\\\\\\n  show = false;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[302]Animated Tiles\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Turns animated tiles ON or OFF.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"animateTiles\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = Imported.YEP_StaticTilesOption;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nthis.drawOptionsOnOff(index);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, !value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, true);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, false);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[302]Battle Animation Speed\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Changes the speed of battle animations.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"battleAniSpeed\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = Imported.YEP_BattleAniSpeedOpt;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar quarterWidth = statusWidth / 4;\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changePaintOpacity(value === 4);\\\\\\\\\\\\\\\\nvar text = this.battleAnimationSpeedText(4);\\\\\\\\\\\\\\\\nthis.drawText(text, titleWidth + quarterWidth * 0, rect.y, quarterWidth, 'center');\\\\\\\\\\\\\\\\nthis.changePaintOpacity(value === 3);\\\\\\\\\\\\\\\\nvar text = this.battleAnimationSpeedText(3);\\\\\\\\\\\\\\\\nthis.drawText(text, titleWidth + quarterWidth * 1, rect.y, quarterWidth, 'center');\\\\\\\\\\\\\\\\nthis.changePaintOpacity(value === 2);\\\\\\\\\\\\\\\\nvar text = this.battleAnimationSpeedText(2);\\\\\\\\\\\\\\\\nthis.drawText(text, titleWidth + quarterWidth * 2, rect.y, quarterWidth, 'center');\\\\\\\\\\\\\\\\nthis.changePaintOpacity(value === 1);\\\\\\\\\\\\\\\\nvar text = this.battleAnimationSpeedText(1);\\\\\\\\\\\\\\\\nthis.drawText(text, titleWidth + quarterWidth * 3, rect.y, quarterWidth, 'center');\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue -= 1;\\\\\\\\\\\\\\\\nif (value <= 0) value = 4;\\\\\\\\\\\\\\\\nvalue = value.clamp(1, 4);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue -= 1;\\\\\\\\\\\\\\\\nvalue = value.clamp(1, 4);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nvalue += 1;\\\\\\\\\\\\\\\\nvalue = value.clamp(1, 4);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[302]Battle Camera\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"If ON, the camera in battle will move around.\\\\\\\\\\\\\\\\nIf OFF, the camera in battle will be locked in place.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"battleCamera\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = Imported.YEP_X_ActSeqPack3;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nthis.drawOptionsOnOff(index);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, !value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, true);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, false);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[302]Synch Monitor FPS\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Turn this ON if your monitor runs above 60 FPS\\\\\\\\\\\\\\\\nto synchronize the game to run at 60 FPS.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"synchFps\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = Imported.YEP_SynchFpsOption;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\\nthis.drawOptionsOnOff(index);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, !value);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, true);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var index = this.index();\\\\\\\\\\\\\\\\nvar symbol = this.commandSymbol(index);\\\\\\\\\\\\\\\\nvar value = this.getConfigValue(symbol);\\\\\\\\\\\\\\\\nthis.changeValue(symbol, false);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\" \\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\" \\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"none\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}","{\"Name\":\"\\\\i[83]Controls\",\"---Settings---\":\"\",\"HelpDesc\":\"\\\"Change the way you can control the game.\\\"\",\"OptionsList\":\"[\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[83]Gamepad Config\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Configure the game's gamepad settings.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"gamepadConfig\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"if (Imported.GamepadConfig && Input.isControllerConnected()) {\\\\\\\\\\\\\\\\n  show = !Utils.isMobileDevice();\\\\\\\\\\\\\\\\n} else {\\\\\\\\\\\\\\\\n  show = false;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.playOkSound();\\\\\\\\\\\\\\\\nSceneManager.push(Scene_GamepadConfig);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[83]Keyboard Config\\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Configure the game's keyboard settings.\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"keyConfig\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"if (Imported.YEP_KeyboardConfig) {\\\\\\\\\\\\\\\\n  show = !Utils.isMobileDevice();\\\\\\\\\\\\\\\\n} else {\\\\\\\\\\\\\\\\n  show = false;\\\\\\\\\\\\\\\\n}\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"var rect = this.itemRectForText(index);\\\\\\\\\\\\\\\\nvar statusWidth = this.statusWidth();\\\\\\\\\\\\\\\\nvar titleWidth = rect.width - statusWidth;\\\\\\\\\\\\\\\\nthis.resetTextColor();\\\\\\\\\\\\\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\\\\\\\\\\\\\nthis.drawOptionsName(index);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.playOkSound();\\\\\\\\\\\\\\\\nSceneManager.push(Scene_KeyConfig);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Name\\\\\\\":\\\\\\\" \\\\\\\",\\\\\\\"---Settings---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"HelpDesc\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\" \\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Symbol\\\\\\\":\\\\\\\"none\\\\\\\",\\\\\\\"ShowHide\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"show = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Enable\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"enabled = true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"Ext\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ext = 0;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"---Functions---\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"MakeCommandCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"this.addCommand(name, symbol, enabled, ext);\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DrawItemCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ProcessOkCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorRightCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CursorLeftCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"DefaultConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"SaveConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"LoadConfigCode\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}"]
 *
 * @param ---Options Menu---
 * @text ---选项菜单---
 * @default
 *
 * @param AllCommand
 * @text 所有命令
 * @parent ---Options Menu---
 * @desc 用于 'All' 命令的字符串.
 * 如果您不想使用此命令，请将此选项留空。
 * @default \i[160]All
 *
 * @param AllHelpDesc
 * @text 所有帮助说明
 * @parent AllCommand
 * @type note
 * @desc 选择 'All' 时的帮助描述。
 * 您可以为此参数使用文本代码。
 * @default "游戏所有设置的列表。"
 *
 * @param ExitCommand
 * @text 退出命令
 * @parent ---Options Menu---
 * @desc 用于 'Exit' 命令的字符串。
 * 如果您不想使用此命令，请将此选项留空。
 * @default \i[16]Exit
 *
 * @param ExitHelpDesc
 * @text 退出帮助说明
 * @parent ExitCommand
 * @type note
 * @desc 选择 'Exit' 时的帮助描述。
 * 您可以为此参数使用文本代码。
 * @default "退出“选项”菜单。"
 *
 * @param ---Options Settings---
 * @text ---选项设置---
 * @default
 *
 * @param CategoryWidth
 * @text 类别窗口宽度
 * @parent ---Options Settings---
 * @type number
 * @min 1
 * @desc 选项菜单屏幕左侧的类别窗口的宽度。
 * @default 240
 *
 * @param StatusWidth
 * @text 状态宽度
 * @parent ---Options Settings---
 * @type number
 * @min 1
 * @desc 用于选项状态宽度的空间量。
 * @default 400
 *
 * @param VolumeOffset
 * @text 体积偏移量
 * @parent ---Options Settings---
 * @type number
 * @min 1
 * @max 100
 * @desc 调整音量时的变化量。.
 * 默认: 20
 * @default 10
 *
 * @param WindowToneOffset
 * @text 窗口色调偏移
 * @parent ---Options Settings---
 * @type number
 * @min 1
 * @max 255
 * @desc 调整窗口色调时的变化量。
 * @default 5
 *
 */
/* ----------------------------------------------------------------------------
 * Categories Parameter Structure
 * ----------------------------------------------------------------------------
 */
/*~struct~Categories:
 * @param Name
 * @desc The name of this category as seen in the Category Window.
 * You can use text codes for this parameter.
 * @default 类别名称
 *
 * @param ---Settings---
 *
 * @param HelpDesc
 * @text 帮助说明
 * @parent ---Settings---
 * @type note
 * @desc The help description of this category when selected.
 * You can use text codes for this parameter.
 * @default "<insert category description>\n<category description line 2>"
 *
 * @param OptionsList
 * @text 选项列表
 * @parent ---Settings---
 * @type struct<Options>[]
 * @desc The options used for this category.
 * @default ["{\"Name\":\"Option 1\",\"---Settings---\":\"\",\"HelpDesc\":\"\\\"<insert option description>\\\\n<option description line 2>\\\"\",\"Symbol\":\"Option1\",\"ShowHide\":\"\\\"show = true;\\\"\",\"Enable\":\"\\\"enabled = true;\\\"\",\"Ext\":\"\\\"ext = 0;\\\"\",\"---Functions---\":\"\",\"MakeCommandCode\":\"\\\"this.addCommand(name, symbol, enabled, ext);\\\"\",\"DrawItemCode\":\"\\\"var rect = this.itemRectForText(index);\\\\nvar statusWidth = this.statusWidth();\\\\nvar titleWidth = rect.width - statusWidth;\\\\nthis.resetTextColor();\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\nthis.drawOptionsName(index);\\\\nthis.drawOptionsOnOff(index);\\\"\",\"ProcessOkCode\":\"\\\"var index = this.index();\\\\nvar symbol = this.commandSymbol(index);\\\\nvar value = this.getConfigValue(symbol);\\\\nthis.changeValue(symbol, !value);\\\"\",\"CursorRightCode\":\"\\\"var index = this.index();\\\\nvar symbol = this.commandSymbol(index);\\\\nvar value = this.getConfigValue(symbol);\\\\nthis.changeValue(symbol, true);\\\"\",\"CursorLeftCode\":\"\\\"var index = this.index();\\\\nvar symbol = this.commandSymbol(index);\\\\nvar value = this.getConfigValue(symbol);\\\\nthis.changeValue(symbol, false);\\\"\",\"DefaultConfigCode\":\"\\\"ConfigManager[symbol] = false;\\\"\",\"SaveConfigCode\":\"\\\"config[symbol] = ConfigManager[symbol];\\\"\",\"LoadConfigCode\":\"\\\"ConfigManager[symbol] = !!config[symbol];\\\"\"}","{\"Name\":\"Option 2\",\"---Settings---\":\"\",\"HelpDesc\":\"\\\"<insert option description>\\\\n<option description line 2>\\\"\",\"Symbol\":\"Option2\",\"ShowHide\":\"\\\"show = true;\\\"\",\"Enable\":\"\\\"enabled = true;\\\"\",\"Ext\":\"\\\"ext = 0;\\\"\",\"---Functions---\":\"\",\"MakeCommandCode\":\"\\\"this.addCommand(name, symbol, enabled, ext);\\\"\",\"DrawItemCode\":\"\\\"var rect = this.itemRectForText(index);\\\\nvar statusWidth = this.statusWidth();\\\\nvar titleWidth = rect.width - statusWidth;\\\\nthis.resetTextColor();\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\nthis.drawOptionsName(index);\\\\nthis.drawOptionsOnOff(index);\\\"\",\"ProcessOkCode\":\"\\\"var index = this.index();\\\\nvar symbol = this.commandSymbol(index);\\\\nvar value = this.getConfigValue(symbol);\\\\nthis.changeValue(symbol, !value);\\\"\",\"CursorRightCode\":\"\\\"var index = this.index();\\\\nvar symbol = this.commandSymbol(index);\\\\nvar value = this.getConfigValue(symbol);\\\\nthis.changeValue(symbol, true);\\\"\",\"CursorLeftCode\":\"\\\"var index = this.index();\\\\nvar symbol = this.commandSymbol(index);\\\\nvar value = this.getConfigValue(symbol);\\\\nthis.changeValue(symbol, false);\\\"\",\"DefaultConfigCode\":\"\\\"ConfigManager[symbol] = false;\\\"\",\"SaveConfigCode\":\"\\\"config[symbol] = ConfigManager[symbol];\\\"\",\"LoadConfigCode\":\"\\\"ConfigManager[symbol] = !!config[symbol];\\\"\"}","{\"Name\":\"Option 3\",\"---Settings---\":\"\",\"HelpDesc\":\"\\\"<insert option description>\\\\n<option description line 2>\\\"\",\"Symbol\":\"Option3\",\"ShowHide\":\"\\\"show = true;\\\"\",\"Enable\":\"\\\"enabled = true;\\\"\",\"Ext\":\"\\\"ext = 0;\\\"\",\"---Functions---\":\"\",\"MakeCommandCode\":\"\\\"this.addCommand(name, symbol, enabled, ext);\\\"\",\"DrawItemCode\":\"\\\"var rect = this.itemRectForText(index);\\\\nvar statusWidth = this.statusWidth();\\\\nvar titleWidth = rect.width - statusWidth;\\\\nthis.resetTextColor();\\\\nthis.changePaintOpacity(this.isCommandEnabled(index));\\\\nthis.drawOptionsName(index);\\\\nthis.drawOptionsOnOff(index);\\\"\",\"ProcessOkCode\":\"\\\"var index = this.index();\\\\nvar symbol = this.commandSymbol(index);\\\\nvar value = this.getConfigValue(symbol);\\\\nthis.changeValue(symbol, !value);\\\"\",\"CursorRightCode\":\"\\\"var index = this.index();\\\\nvar symbol = this.commandSymbol(index);\\\\nvar value = this.getConfigValue(symbol);\\\\nthis.changeValue(symbol, true);\\\"\",\"CursorLeftCode\":\"\\\"var index = this.index();\\\\nvar symbol = this.commandSymbol(index);\\\\nvar value = this.getConfigValue(symbol);\\\\nthis.changeValue(symbol, false);\\\"\",\"DefaultConfigCode\":\"\\\"ConfigManager[symbol] = false;\\\"\",\"SaveConfigCode\":\"\\\"config[symbol] = ConfigManager[symbol];\\\"\",\"LoadConfigCode\":\"\\\"ConfigManager[symbol] = !!config[symbol];\\\"\"}"]
 *
 */
/* ----------------------------------------------------------------------------
 * Options Parameter Structure
 * ----------------------------------------------------------------------------
 */
/*~struct~Options:
 * @param Name
 * @desc The name of this option as seen in the Options Window.
 * You can use text codes for this parameter.
 * @default <insert option name>
 *
 * @param ---Settings---
 *
 * @param HelpDesc
 * @text 帮助说明
 * @type note
 * @parent ---Settings---
 * @desc The help description of this option when selected.
 * You can use text codes for this parameter.
 * @default "<insert option description>\n<option description line 2>"
 *
 * @param Symbol
 * @parent ---Settings---
 * @desc Symbol used for this option when selected.
 * Make sure this is unique from other symbols.
 * @default <insert option symbol>
 *
 * @param ShowHide
 * @text显示/隐藏
 * @parent ---Settings---
 * @type note
 * @desc The code used to determine if this option will be visible.
 * @default "show = true;"
 *
 * @param Enable
 * @parent ---Settings---
 * @type note
 * @desc The code used to determine if this option will be enabled.
 * @default "enabled = true;"
 *
 * @param Ext
 * @parent ---Settings---
 * @type note
 * @desc The code used to determine this option's Ext value.
 * @default "ext = 0;"
 *
 * @param ---Functions---
 *
 * @param MakeCommandCode
 * @text 生成选项代码
 * @parent ---Functions---
 * @type note
 * @desc The code used to add the option command.
 * @default "this.addCommand(name, symbol, enabled, ext);"
 *
 * @param DrawItemCode
 * @text 绘制选项代码
 * @parent ---Functions---
 * @type note
 * @desc The code used to draw the options.
 * @default "var rect = this.itemRectForText(index);\nvar statusWidth = this.statusWidth();\nvar titleWidth = rect.width - statusWidth;\nthis.resetTextColor();\nthis.changePaintOpacity(this.isCommandEnabled(index));\nthis.drawOptionsName(index);\nthis.drawOptionsOnOff(index);"
 *
 * @param ProcessOkCode
 * @text 过程正常代码
 * @parent ---Functions---
 * @type note
 * @desc The code used when selected with a Confirm button.
 * @default "var index = this.index();\nvar symbol = this.commandSymbol(index);\nvar value = this.getConfigValue(symbol);\nthis.changeValue(symbol, !value);"
 *
 * @param CursorRightCode
 * @text 光标右代码
 * @parent ---Functions---
 * @type note
 * @desc The code used when the Right button is pressed.
 * @default "var index = this.index();\nvar symbol = this.commandSymbol(index);\nvar value = this.getConfigValue(symbol);\nthis.changeValue(symbol, true);"
 *
 * @param CursorLeftCode
 * @text 光标左代码
 * @parent ---Functions---
 * @type note
 * @desc The code used when the Left button is pressed.
 * @default "var index = this.index();\nvar symbol = this.commandSymbol(index);\nvar value = this.getConfigValue(symbol);\nthis.changeValue(symbol, false);"
 *
 * @param DefaultConfigCode
 * @text 默认配置代码
 * @parent ---Functions---
 * @type note
 * @desc The code used to determine the default setting for this option.
 * @default "ConfigManager[symbol] = false;"
 *
 * @param SaveConfigCode
 * @text 保存配置代码
 * @parent ---Functions---
 * @type note
 * @desc The code used when saving the set options configuration.
 * @default "config[symbol] = ConfigManager[symbol];"
 *
 * @param LoadConfigCode
 * @text 显示/隐藏配置代码
 * @parent ---Functions---
 * @type note
 * @desc The code used when loading the saved options configuration.
 * @default "ConfigManager[symbol] = !!config[symbol];"
 *
 */
//=============================================================================

if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= "1.5.0") {
    //=============================================================================
    // Parameter Variables
    //=============================================================================

    Yanfly.Parameters = PluginManager.parameters("YEP_OptionsCore");
    Yanfly.Param = Yanfly.Param || {};

    Yanfly.Param.OptionsAllCmd = String(Yanfly.Parameters["AllCommand"]);
    Yanfly.Param.OptionsAllCmdHelp = String(Yanfly.Parameters["AllHelpDesc"]);
    Yanfly.Param.OptionsExitCmd = String(Yanfly.Parameters["ExitCommand"]);
    Yanfly.Param.OptionsExitCmdHelp = String(Yanfly.Parameters["ExitHelpDesc"]);

    Yanfly.Param.OptionsCategoryWidth = Number(Yanfly.Parameters["CategoryWidth"]);
    Yanfly.Param.OptionsStatusWidth = Number(Yanfly.Parameters["StatusWidth"]);
    Yanfly.Param.OptionsVolumeOffset = Number(Yanfly.Parameters["VolumeOffset"]);
    Yanfly.Param.OptionsWinToneOffset = Number(Yanfly.Parameters["WindowToneOffset"]);

    Yanfly.SetupParameters = function () {
        Yanfly.Param.OptionsSymbols = {};
        var data = JSON.parse(Yanfly.Parameters["OptionsCategories"]);
        var length = data.length;
        // Options Categories
        for (var i = 0; i < length; ++i) {
            data[i] = JSON.parse(data[i]);
            data[i]["OptionsList"] = JSON.parse(data[i]["OptionsList"]);
            var optionsLength = data[i]["OptionsList"].length;
            // Options List
            for (var j = 0; j < optionsLength; ++j) {
                data[i]["OptionsList"][j] = JSON.parse(data[i]["OptionsList"][j]);
                var settings = data[i]["OptionsList"][j];
                var symbol = settings.Symbol;
                var name = symbol;
                eval(JSON.parse(settings.DefaultConfigCode));
                Yanfly.Param.OptionsSymbols[symbol] = {
                    SaveConfigCode: settings.SaveConfigCode,
                    LoadConfigCode: settings.LoadConfigCode,
                };
            }
        }
        Yanfly.Param.OptionsCategories = data;
    };
    Yanfly.SetupParameters();

    //=============================================================================
    // ConfigManager
    //=============================================================================

    ConfigManager.masterVolume = 100;
    Object.defineProperty(ConfigManager, "masterVolume", {
        get: function () {
            return parseInt(AudioManager.masterVolume * 100);
        },
        set: function (value) {
            AudioManager.masterVolume = value / 100;
        },
        configurable: true,
    });

    Yanfly.Options.ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function () {
        var config = Yanfly.Options.ConfigManager_makeData.call(this);
        for (var key in Yanfly.Param.OptionsSymbols) {
            var setting = Yanfly.Param.OptionsSymbols[key];
            var symbol = key;
            var name = symbol;
            eval(JSON.parse(Yanfly.Param.OptionsSymbols[key].SaveConfigCode));
        }
        return config;
    };

    Yanfly.Options.ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function (config) {
        Yanfly.Options.ConfigManager_applyData.call(this, config);
        for (var key in Yanfly.Param.OptionsSymbols) {
            var setting = Yanfly.Param.OptionsSymbols[key];
            var symbol = key;
            var name = symbol;
            eval(JSON.parse(Yanfly.Param.OptionsSymbols[key].LoadConfigCode));
        }
    };

    //=============================================================================
    // Window_OptionsCategory
    //=============================================================================

    function Window_OptionsCategory() {
        this.initialize.apply(this, arguments);
    }

    Window_OptionsCategory.prototype = Object.create(Window_Command.prototype);
    Window_OptionsCategory.prototype.constructor = Window_OptionsCategory;

    Window_OptionsCategory.prototype.initialize = function (helpWin, optionsWin) {
        var x = 0;
        var y = helpWin.y + helpWin.height;
        this._width = Yanfly.Param.OptionsCategoryWidth;
        this._height = Graphics.boxHeight - y;
        Window_Command.prototype.initialize.call(this, x, y);
        this.setOptionsWindow(optionsWin);
        this.setHelpWindow(helpWin);
        this.refresh();
        this.select(0);
        this.activate();
    };

    Window_OptionsCategory.prototype.windowWidth = function () {
        return this._width;
    };

    Window_OptionsCategory.prototype.windowHeight = function () {
        return this._height;
    };

    Window_OptionsCategory.prototype.setOptionsWindow = function (optionsWindow) {
        this._optionsWindow = optionsWindow;
    };

    Window_OptionsCategory.prototype.makeCommandList = function () {
        this.addAllCommand();
        this.addCategoryList();
        this.addExitCommand();
    };

    Window_OptionsCategory.prototype.addCategoryList = function () {
        var categories = Yanfly.Param.OptionsCategories;
        var length = categories.length;
        for (var i = 0; i < length; ++i) {
            var category = categories[i];
            var name = category.Name;
            this.addCommand(name, "category", true, category);
        }
    };

    Window_OptionsCategory.prototype.addAllCommand = function () {
        if (!Yanfly.Param.OptionsAllCmd) return;
        var data = {
            HelpDesc: Yanfly.Param.OptionsAllCmdHelp,
            OptionsList: [],
        };
        for (var key in Yanfly.Param.OptionsCategories) {
            var category = Yanfly.Param.OptionsCategories[key];
            var list = category.OptionsList;
            if (list) {
                var length = list.length;
                for (var i = 0; i < length; ++i) {
                    data.OptionsList.push(list[i]);
                }
            }
        }
        this.addCommand(Yanfly.Param.OptionsAllCmd, "category", true, data);
    };

    Window_OptionsCategory.prototype.addExitCommand = function () {
        if (!Yanfly.Param.OptionsExitCmd) return;
        var data = {
            HelpDesc: Yanfly.Param.OptionsExitCmdHelp,
            OptionsList: [],
        };
        this.addCommand(Yanfly.Param.OptionsExitCmd, "cancel", true, data);
    };

    Window_OptionsCategory.prototype.updateHelp = function () {
        if (!this._helpWindow) return;
        if (this.currentExt()) {
            var data = this.currentExt();
            this._helpWindow.setText(JSON.parse(data.HelpDesc));
            if (data.OptionsList.length > 0) {
                this._optionsWindow.makeCommandListFromData(data.OptionsList);
            } else {
                this._optionsWindow.clearRefresh();
            }
        } else {
            this._helpWindow.clear();
        }
    };

    Window_OptionsCategory.prototype.drawItem = function (index) {
        var rect = this.itemRectForText(index);
        var align = this.itemTextAlign();
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.drawTextEx(this.commandName(index), rect.x, rect.y);
    };

    //=============================================================================
    // Window_Options
    //=============================================================================

    Window_Options.prototype.initialize = function () {
        this._commandListData = undefined;
        Window_Command.prototype.initialize.call(this, 0, 0);
        this.deactivate();
        this.deselect();
    };

    Window_Options.prototype.updatePlacement = function () {
        this._placementUpdated = true;
        this.x = Yanfly.Param.OptionsCategoryWidth;
        this.y = this._helpWindow.y + this._helpWindow.height;
    };

    Window_Options.prototype.windowWidth = function () {
        return Graphics.boxWidth - Yanfly.Param.OptionsCategoryWidth;
    };

    Window_Options.prototype.windowHeight = function () {
        if (this._placementUpdated) {
            return Graphics.boxHeight - this.y;
        } else {
            return Graphics.boxHeight - this.fittingHeight(2);
        }
    };

    Window_Options.prototype.setHelpWindow = function (helpWindow) {
        Window_Command.prototype.setHelpWindow.call(this, helpWindow);
        this.updatePlacement();
        this.refresh();
    };

    Window_Options.prototype.clearRefresh = function () {
        this.clearCommandList();
        this.createContents();
        Window_Selectable.prototype.refresh.call(this);
    };

    Window_Options.prototype.makeCommandList = function () {
        if (!this._commandListData) return;
        this._symbolData = {};
        var data = this._commandListData;
        var length = data.length;
        for (var i = 0; i < length; ++i) {
            this.processCommandData(data[i]);
        }
    };

    Window_Options.prototype.statusWidth = function () {
        return Math.min(Yanfly.Param.OptionsStatusWidth, this.contents.width / 2);
    };

    Window_Options.prototype.volumeOffset = function () {
        return Yanfly.Param.OptionsVolumeOffset || 20;
    };

    Window_Options.prototype.windowToneOffset = function () {
        return Yanfly.Param.OptionsWinToneOffset || 5;
    };

    Window_Options.prototype.makeCommandListFromData = function (data) {
        if (!data) return;
        this._commandListData = data;
        this.refresh();
    };

    Window_Options.prototype.processCommandData = function (data) {
        // Check if Shown
        var show = false;
        eval(JSON.parse(data.ShowHide));
        if (!show) return;
        // Add Command
        var name = data.Name;
        if (name === "<insert option name>") return;
        if (name.match(/EVAL:[ ](.*)/i)) {
            var code = String(RegExp.$1);
            try {
                name = eval(code);
            } catch (e) {
                Yanfly.Util.displayError(e, formula, "CUSTOM OPTIONS NAME ERROR");
            }
        }
        var symbol = data.Symbol;
        if (symbol === "<insert option symbol>") symbol = name;
        var enable = false;
        var ext = 0;
        eval(JSON.parse(data.Enable));
        eval(JSON.parse(data.Ext));
        eval(JSON.parse(data.MakeCommandCode));
        // Save symbol data
        this._symbolData[symbol] = {
            DrawItemCode: data.DrawItemCode,
            ProcessOkCode: data.ProcessOkCode,
            CursorLeftCode: data.CursorLeftCode,
            CursorRightCode: data.CursorRightCode,
            HelpDesc: data.HelpDesc,
        };
    };

    Yanfly.Options.Window_Options_drawItem = Window_Options.prototype.drawItem;
    Window_Options.prototype.drawItem = function (index) {
        var symbol = this.commandSymbol(index);
        if (symbol) {
            eval(JSON.parse(this._symbolData[symbol].DrawItemCode));
        } else {
            Yanfly.Options.Window_Options_drawItem.call(this, index);
        }
    };

    Window_Options.prototype.drawOptionsName = function (index) {
        var rect = this.itemRectForText(index);
        var statusWidth = this.statusWidth();
        var titleWidth = rect.width - statusWidth;
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.drawTextEx(this.commandName(index), rect.x, rect.y);
    };

    Window_Options.prototype.drawOptionsOnOff = function (index, onText, offText) {
        onText = onText || "ON";
        offText = offText || "OFF";
        var rect = this.itemRectForText(index);
        var statusWidth = this.statusWidth();
        var halfStatusWidth = this.statusWidth() / 2;
        var titleWidth = rect.width - statusWidth;
        this.resetTextColor();
        var symbol = this.commandSymbol(index);
        var value = this.getConfigValue(symbol);
        this.changePaintOpacity(!value);
        this.drawText(offText, titleWidth, rect.y, halfStatusWidth, "center");
        this.changePaintOpacity(value);
        this.drawText(onText, titleWidth + halfStatusWidth, rect.y, halfStatusWidth, "center");
    };

    Window_Options.prototype.drawOptionsGauge = function (index, rate, c1, c2) {
        var rect = this.itemRectForText(index);
        var statusWidth = this.statusWidth();
        var halfStatusWidth = this.statusWidth() / 2;
        var titleWidth = rect.width - statusWidth;
        this.drawGauge(titleWidth, rect.y, statusWidth, rate, c1, c2);
    };

    Yanfly.Options.Window_Options_processOk = Window_Options.prototype.processOk;
    Window_Options.prototype.processOk = function () {
        var symbol = this.commandSymbol(this.index());
        if (symbol) {
            eval(JSON.parse(this._symbolData[symbol].ProcessOkCode));
        } else {
            Yanfly.Options.Window_Options_processOk.call(this);
        }
    };

    Yanfly.Options.Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
    Window_Options.prototype.cursorLeft = function (wrap) {
        var symbol = this.commandSymbol(this.index());
        if (symbol) {
            eval(JSON.parse(this._symbolData[symbol].CursorLeftCode));
        } else {
            Yanfly.Options.Window_Options_cursorLeft.call(this, wrap);
        }
    };

    Yanfly.Options.Window_Options_cursorRight = Window_Options.prototype.cursorRight;
    Window_Options.prototype.cursorRight = function (wrap) {
        var symbol = this.commandSymbol(this.index());
        if (symbol) {
            eval(JSON.parse(this._symbolData[symbol].CursorRightCode));
        } else {
            Yanfly.Options.Window_Options_cursorRight.call(this, wrap);
        }
    };

    Window_Options.prototype.changeWindowTone = function (symbol, value, color) {
        var index = ["red", "green", "blue"].indexOf(color);
        if (index < 0) return;
        var tone = JsonEx.makeDeepCopy($gameSystem.windowTone());
        var lastValue = tone[index];
        tone[index] = value.clamp(-255, 255);
        if (lastValue !== tone[index]) {
            $gameSystem.setWindowTone(tone);
            this.redrawItem(this.findSymbol(symbol));
            SoundManager.playCursor();
        }
    };

    Window_Options.prototype.updateHelp = function () {
        if (!this._helpWindow) return;
        if (this.index() < 0) return;
        var symbol = this.commandSymbol(this.index());
        if (this._symbolData && this._symbolData[symbol]) {
            this._helpWindow.setText(JSON.parse(this._symbolData[symbol].HelpDesc));
        } else {
            this._helpWindow.clear();
        }
    };

    //=============================================================================
    // Scene_Options
    //=============================================================================

    Scene_Options.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        this.createHelpWindow();
        this.createOptionsWindow();
        this.createCategoryWindow();
    };

    Yanfly.Options.Scene_Options_createOptionsWindow = Scene_Options.prototype.createOptionsWindow;
    Scene_Options.prototype.createOptionsWindow = function () {
        Yanfly.Options.Scene_Options_createOptionsWindow.call(this);
        this._optionsWindow.setHelpWindow(this._helpWindow);
        this._optionsWindow.setHandler("cancel", this.onOptionsCancel.bind(this));
    };

    Scene_Options.prototype.createCategoryWindow = function () {
        var helpWin = this._helpWindow;
        var optionsWin = this._optionsWindow;
        this._categoryWindow = new Window_OptionsCategory(helpWin, optionsWin);
        this._categoryWindow.setHandler("cancel", this.popScene.bind(this));
        this._categoryWindow.setHandler("category", this.onCategoryOk.bind(this));
        this.addWindow(this._categoryWindow);
    };

    Scene_Options.prototype.onCategoryOk = function () {
        this._optionsWindow.activate();
        this._optionsWindow.select(0);
    };

    Scene_Options.prototype.onOptionsCancel = function () {
        this._optionsWindow.deselect();
        this._categoryWindow.activate();
    };

    //=============================================================================
    // Utilities
    //=============================================================================

    Yanfly.Util = Yanfly.Util || {};

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
    // End of Main Functions
    //=============================================================================
} else {
    var text = "";
    text += "You are getting this error because you are trying to run ";
    text += "YEP_OptionsCore while your project files are lower than version ";
    text += "1.5.0.\n\nPlease visit this thread for instructions on how to update ";
    text += "your project files to 1.5.0 or higher: \n\n";
    text += "https://forums.rpgmakerweb.com/index.php";
    console.log(text);
    require("nw.gui").Window.get().showDevTools();
} // (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= '1.5.0')
//=============================================================================
// End of File
//=============================================================================
