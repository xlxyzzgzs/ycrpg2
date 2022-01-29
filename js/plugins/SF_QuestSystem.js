//=============================================================================
// SaltedFish Plugins - Quest System
// SF_QuestSystem.js
//=============================================================================

"use strict";
var Imported = Imported || {};
Imported.SF_QuestSystem = true;

var SF_Plugins = SF_Plugins || {};
var $gameQuests = null;
var $dataQuests = null;

//=============================================================================
/*~struct~Quest:
    * @param name
    * @text Quest Name
    * @desc The name of the quest.
    * @type text
    * @default
    * 
    * @param desc
    * @text Quest Description
    * @desc The description of the quest.
    * @type note
    * @default
    * 
    */
/*:
    * @plugindesc v1.0 Allows you to show quests.
    * @author SaltedFish
    * 
    * @param Quest List Window
    * 
    * @param Quest List Window X
    * @desc The X position of the quest list window.
    * @default 0
    * @type number
    * @parent Quest List Window
    * 
    * @param Quest List Window Y
    * @desc The Y position of the quest list window.
    * @default 0
    * @type number
    * @parent Quest List Window
    * 
    * @param Quest List Window Width
    * @desc The width of the quest list window.
    * @default 240
    * @type number
    * @parent Quest List Window
    * 
    * @param Quest List Window Height
    * @desc The height of the quest list window.
    * @default 480
    * @type number
    * @parent Quest List Window
    * 
    * @param Quest List Window Font Size
    * @desc The font size of the quest list window.
    * @default 28
    * @type number
    * @parent Quest List Window
    * @min 1
    * 
    * @param Quest Detail Window
    * 
    * @param Quest Detail Window X
    * @desc The X position of the quest detail window.
    * @default 0
    * @type number
    * @parent Quest Detail Window
    * 
    * @param Quest Detail Window Y
    * @desc The Y position of the quest detail window.
    * @default 0
    * @type number
    * @parent Quest Detail Window
    * 
    * @param Quest Detail Window Width
    * @desc The width of the quest detail window.
    * @default 240
    * @type number
    * @parent Quest Detail Window
    * 
    * @param Quest Detail Window Height
    * @desc The height of the quest detail window.
    * @default 480
    * @type number
    * @parent Quest Detail Window
    * 
    * @param Quest Detail Window Font Size
    * @desc The font size of the quest detail window.
    * @default 28
    * @type number
    * @parent Quest Detail Window
    * @min 1
    * 
    * @param Quest Editor
    * 
    * @param Quest Editor Enable
    * @desc Enable the quest editor.
    * @default false
    * @type boolean
    * @parent Quest Editor
    * 
    * @param Quest List Info X
    * @desc The X position of the quest list info.
    * @default 0
    * @type number
    * @parent Quest Editor
    * 
    * @param Quest List Info Y
    * @desc The Y position of the quest list info.
    * @default 0
    * @type number
    * @parent Quest Editor
    * 
    * @param Quest List Info Width
    * @desc The width of the quest list info.
    * @default 240
    * @type number
    * @parent Quest Editor
    * 
    * @param Quest List Info Height
    * @desc The height of the quest list info.
    * @default 480
    * @type number
    * @parent Quest Editor
    * 
    * @param Quest List Info Font Size
    * @desc The font size of the quest list info.
    * @default 28
    * @type number
    * @parent Quest Editor
    * @min 1 
    * 
    * 
    * 
    * @help
    * ============================================================================
    * Introduction
    * ============================================================================
    *
    * plugin requirement:
    * - SF_WindowScrollCommand
    * 
    * Modified from Gameus's Quest System plugin.
    * This plugin allows you to show quests.
    *
    * ============================================================================
    * Plugin Commands
    * ============================================================================
    *
    * SF_Quest Add QuestID
    *   Adds a quest to the player's quest list.
    *
    * SF_Quest Complete QuestID
    *   Marks a quest as completed.
    *
    * SF_Quest Open
    *   Opens the quest scene.
    *
    * ============================================================================
    * Script Calls
    * ============================================================================
    *   
    * $gameParty.addQuest(questId)
    *   Adds a quest to the player's quest list.
    * 
    * $gameParty.removeQuest(questId)
    *   Removes a quest from the player's quest list.
    */
//=============================================================================

//=============================================================================
// Requires
//=============================================================================

if (!Imported.SF_WindowScrollCommand) {
    console.error("SF_QuestSystem requires SF_WindowScrollCommand.");
    alert("SF_QuestSystem requires SF_WindowScrollCommand.");
}
(function () {

    var SF_QuestSystem = {};
    SF_Plugins.SF_QuestSystem = SF_QuestSystem;
    SF_QuestSystem.version = 1.0;

    //=============================================================================
    // Parameters
    //=============================================================================

    SF_QuestSystem.Parameters = PluginManager.parameters('SF_QuestSystem');

    SF_QuestSystem.QuestListWindow_X = Number(SF_QuestSystem.Parameters["Quest List Window X"]);
    SF_QuestSystem.QuestListWindow_Y = Number(SF_QuestSystem.Parameters["Quest List Window Y"]);
    SF_QuestSystem.QuestListWindowWidth = Number(SF_QuestSystem.Parameters["Quest List Window Width"]);
    SF_QuestSystem.QuestListWindowHeight = Number(SF_QuestSystem.Parameters["Quest List Window Height"]);
    SF_QuestSystem.QuestListWindow_FontSize = Number(SF_QuestSystem.Parameters["Quest List Window Font Size"]);

    SF_QuestSystem.QuestDetailWindowX = Number(SF_QuestSystem.Parameters["Quest Detail Window X"]);
    SF_QuestSystem.QuestDetailWindowY = Number(SF_QuestSystem.Parameters["Quest Detail Window Y"]);
    SF_QuestSystem.QuestDetailWindowWidth = Number(SF_QuestSystem.Parameters["Quest Detail Window Width"]);
    SF_QuestSystem.QuestDetailWindowHeight = Number(SF_QuestSystem.Parameters["Quest Detail Window Height"]);
    SF_QuestSystem.QuestDetailWindowFontSize = Number(SF_QuestSystem.Parameters["Quest Detail Window Font Size"]);

    SF_QuestSystem.QuestEditorEnable = String(SF_QuestSystem.Parameters["Quest Editor Enable"]) === "true";
    SF_QuestSystem.QuestListInfoX = Number(SF_QuestSystem.Parameters["Quest List Info X"]);
    SF_QuestSystem.QuestListInfoY = Number(SF_QuestSystem.Parameters["Quest List Info Y"]);
    SF_QuestSystem.QuestListInfoWidth = Number(SF_QuestSystem.Parameters["Quest List Info Width"]);
    SF_QuestSystem.QuestListInfoHeight = Number(SF_QuestSystem.Parameters["Quest List Info Height"]);
    SF_QuestSystem.QuestListInfoFontSize = Number(SF_QuestSystem.Parameters["Quest List Info Font Size"]);

    SF_QuestSystem.default_quest = function () {
        var quest = {};
        quest.name = "";
        quest.desc = "";
        return quest;
    }

    //=============================================================================
    // DataManager
    //=============================================================================

    SF_QuestSystem.DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function () {
        var contents = SF_QuestSystem.DataManager_makeSaveContents.call(this);
        contents.quests = $gameQuests;
        return contents;
    }

    SF_QuestSystem.DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function (contents) {
        SF_QuestSystem.DataManager_extractSaveContents.call(this, contents);
        $gameQuests = contents.quests;
    }

    SF_QuestSystem.DataManager_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function () {
        SF_QuestSystem.DataManager_createGameObjects.call(this);
        $gameQuests = new Game_Quests();
    }

    //=============================================================================
    // Game_Quest
    //=============================================================================

    function Game_Quest() {
        this.initialize.apply(this, arguments);
    }

    Game_Quest.prototype.initialize = function (questId) {
        var questData = $dataQuests[questId] || SF_QuestSystem.default_quest;
        this._questId = questId;
        this.rawData = questData;
        this.name = questData.name;
        this.desc = questData.desc;
        this.status = "progress";
    }

    Game_Quest.prototype.completed = function () {
        return this.status == "completed";
    }

    Game_Quest.prototype.inProgress = function () {
        return this.status == "progress";
    }

    Game_Quest.prototype.complete = function () {
        this.status = "completed";
    };

    Game_Quest.prototype.reset = function () {
        this.status = "progress";
    };


    //---------------------------------------------------------------------------------------------
    // Game_Quests
    //---------------------------------------------------------------------------------------------
    function Game_Quests() {
        this.initialize.apply(this, arguments);
    };

    Game_Quests.prototype.initialize = function () {
        this.data = [];
    };

    Game_Quests.prototype.get = function (quest_id) {
        if ($dataQuests[quest_id]) {
            if (!this.data[quest_id]) {
                this.data[quest_id] = new Game_Quest(quest_id);
            }
            return this.data[quest_id];
        }
        return null;
    };

    Game_Quests.prototype.complete = function (quest_id) {
        if (this.get(quest_id)) {
            this.get(quest_id).complete();
        }
    }

    //=============================================================================
    // Game_Party
    //=============================================================================

    SF_QuestSystem.Game_Party_initialize = Game_Party.prototype.initialize;
    Game_Party.prototype.initialize = function () {
        SF_QuestSystem.Game_Party_initialize.call(this);
        this.quests = [];
    };

    Game_Party.prototype.addQuest = function (quest_id) {
        if (this.quests.indexOf(quest_id) < 0) {
            this.quests.push(quest_id);
        }
    };

    // Removes the quest from the party. NOTE: This does NOT reset the quest
    Game_Party.prototype.removeQuest = function (quest_id) {
        var index = this.quests.indexOf(quest_id);
        if (index > -1) {
            this.quests.splice(index, 1);
        }
    };

    // Returns true if the quest is in the party
    Game_Party.prototype.hasQuest = function (quest_id) {
        return this.quests.indexOf(quest_id) > -1;
    };

    // Returns true if the quest is completed
    Game_Party.prototype.isQuestCompleted = function (quest_id) {
        return this.getQuest(quest_id).completed();
    };

    // Returns true if the quest is in progress
    Game_Party.prototype.isQuestInProgress = function (quest_id) {
        return this.getQuest(quest_id).inProgress();
    };

    // Returns the quest object
    Game_Party.prototype.getQuest = function (quest_id) {
        return $gameQuests.get(quest_id);
    };



    //=============================================================================
    // Window_QuestList
    //=============================================================================

    function Window_QuestList() {
        this.initialize.apply(this, arguments);
    }

    Window_QuestList.prototype = Object.create(Window_ScrollCommand.prototype);
    Window_QuestList.prototype.constructor = Window_QuestList;

    Window_QuestList.prototype.initialize = function () {
        this._filter = "progress";
        Window_ScrollCommand.prototype.initialize.call(this, arguments);
        this.x = SF_QuestSystem.QuestListWindow_X;
        this.y = SF_QuestSystem.QuestListWindow_Y;
    }

    Window_QuestList.prototype.standardFontSize = function () {
        return SF_QuestSystem.QuestListWindow_FontSize;
    }

    Window_QuestList.prototype.lineHeight = function () {
        return this.standardFontSize() + 8;
    }

    // Sets the filter for the quest list
    // "completed" - Completed quests
    // "progress" - In progress quests
    Window_QuestList.prototype.setFilter = function (filter) {
        this._filter = filter;
    }

    Window_QuestList.prototype.windowWidth = function () {
        return SF_QuestSystem.QuestListWindowWidth;
    }

    Window_QuestList.prototype.windowHeight = function () {
        return SF_QuestSystem.QuestListWindowHeight;
    }

    Window_QuestList.prototype.makeCommandList = function () {
        for (var i = 0; i < $gameParty.quests.length; i += 1) {
            var quest = $gameQuests.get($gameParty.quests[i]);
            if (quest.status === this._filter.toLowerCase()) {
                this.addCommand(quest.name, "quest", true, $gameParty.quests[i]);
            }
        }
    }

    Window_QuestList.prototype.updateHelp = function () {
        Window_ScrollCommand.prototype.updateHelp.call(this);
        if (this._helpWindow) {
            this._helpWindow.setQuest(this.currentExt());
        }
    }

    //=============================================================================
    // Window_QuestDetail
    //=============================================================================

    function Window_QuestDetail() {
        this.initialize.apply(this, arguments);
    }

    Window_QuestDetail.prototype = Object.create(Window_ScrollHelp.prototype);
    Window_QuestDetail.prototype.constructor = Window_QuestDetail;

    Window_QuestDetail.prototype.initialize = function () {
        Window_ScrollHelp.prototype.initialize.call(this,
            SF_QuestSystem.QuestDetailWindowX,
            SF_QuestSystem.QuestDetailWindowY,
            SF_QuestSystem.QuestDetailWindowWidth,
            SF_QuestSystem.QuestDetailWindowHeight);
        this._questId = null;
    }

    Window_QuestDetail.prototype.windowWidth = function () {
        return SF_QuestSystem.QuestDetailWindowWidth;
    }

    Window_QuestDetail.prototype.lineHeight = function () {
        return this.standardFontSize() + 8;
    }

    Window_QuestDetail.prototype.standardFontSize = function () {
        return SF_QuestSystem.QuestDetailWindowFontSize;
    }

    Window_QuestDetail.prototype.windowHeight = function () {
        return SF_QuestSystem.QuestDetailWindowHeight;
    }

    Window_QuestDetail.prototype.setQuest = function (questId) {
        this._questId = questId;
        if (this._questId >= 0) {
            var quest = $gameQuests.get(this._questId);
            this.setText(quest.desc);
        }
    }

    //=============================================================================
    // Scene_Quest
    //=============================================================================

    function Scene_Quest() {
        this.initialize.apply(this, arguments);
    }

    SF_QuestSystem.Scene_Quest = Scene_Quest;

    Scene_Quest.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_Quest.prototype.constructor = Scene_Quest;

    Scene_Quest.prototype.initialize = function () {
        Scene_MenuBase.prototype.initialize.call(this);
    }

    Scene_Quest.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        this.createQuestDetailWindow();
        this.createQuestListWindow();
        this._questListWindow.setHelpWindow(this._questDetailWindow);
    }

    Scene_Quest.prototype.createQuestListWindow = function () {
        this._questListWindow = new Window_QuestList();
        this._questListWindow.setHandler("quest", this.onQuestListOk.bind(this));
        this._questListWindow.setHandler("cancel", this.popScene.bind(this));
        this.addWindow(this._questListWindow);
    }

    Scene_Quest.prototype.createQuestDetailWindow = function () {
        this._questDetailWindow = new Window_QuestDetail();
        //this._questDetailWindow.setHandler("cancel", this.popScene.bind(this));
        this.addWindow(this._questDetailWindow);
    }

    Scene_Quest.prototype.onQuestListOk = function () {
        //var questId = this._questListWindow.currentExt();
        //this._questDetailWindow.setQuest(questId);
        this._questListWindow.activate();
    }

    //=============================================================================
    // Game_Interpreter
    //=============================================================================

    SF_QuestSystem.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        SF_QuestSystem.Game_Interpreter_pluginCommand.call(this, command, args);
        if (command.toLowerCase() === "sf_quest") {
            switch (args[0].toLowerCase()) {
                case "add":
                    $gameParty.addQuest(Number(args[1]));
                    break;
                case "complete":
                    $gameParty.removeQuest(Number(args[1]));
                    $gameQuests.complete(Number(args[1]));
                    break;
                case "open":
                    SceneManager.push(Scene_Quest);
                    break;
            }
        }
    }

    if (Utils.isNwjs() && SF_QuestSystem.QuestEditorEnable) {

        var fs = require('fs');
        var path = require('path');
        var process = require('process');
        var quest_path = path.join(process.cwd(), 'data/Quests.json');
        var quest_data = null;
        if (fs.existsSync(quest_path)) {
            quest_data = JsonEx.parse(fs.readFileSync(quest_path, 'utf8'));
        } else {
            quest_data = [SF_QuestSystem.default_quest()];
        }
        var quest_one_page = 10;
        //=============================================================================
        // Window_QuestListInfo
        //=============================================================================

        function Window_QuestListInfo() {
            this.initialize.apply(this, arguments);
        }

        Window_QuestListInfo.prototype = Object.create(Window_ScrollCommand.prototype);
        Window_QuestListInfo.prototype.constructor = Window_QuestListInfo;

        Window_QuestListInfo.prototype.initialize = function () {
            Window_ScrollCommand.prototype.initialize.call(this);
            this.x = SF_QuestSystem.QuestListInfoX;
            this.y = SF_QuestSystem.QuestListInfoY;
        }

        Window_QuestListInfo.prototype.windowWidth = function () {
            return SF_QuestSystem.QuestListInfoWidth;
        }

        Window_QuestListInfo.prototype.windowHeight = function () {
            return SF_QuestSystem.QuestListInfoHeight;
        }

        Window_QuestListInfo.prototype.standardFontSize = function () {
            return SF_QuestSystem.QuestListInfoFontSize;
        }

        Window_QuestListInfo.prototype.lineHeight = function () {
            return this.standardFontSize() + 8;
        }

        Window_QuestListInfo.prototype.makeCommandList = function () {
            var i;
            for (i = 0; i * quest_one_page + 1 < quest_data.length; i++) {
                this.addCommand(`${i * quest_one_page + 1}-${i * quest_one_page + quest_one_page}`, 'quest_page', true, i);
            }
            if (i * quest_one_page + 1 == quest_data.length) {
                this.addCommand('newpage', 'newpage');
            }
        }

        Window_QuestListInfo.prototype.select = function (index) {
            Window_ScrollCommand.prototype.select.call(this, index);
            if (index >= 0 && this.currentSymbol() == 'quest_page' && this._questListWindow) {
                this._questListWindow.setPage(this.currentExt());
            }
        }

        Window_QuestListInfo.prototype.newPage = function () {
            quest_data.push(SF_QuestSystem.default_quest());
            this.refresh();
        }
        //=============================================================================
        // Window_QuestList
        //=============================================================================

        Window_QuestList.prototype.initialize = function () {
            Window_ScrollCommand.prototype.initialize.call(this, arguments);
            this.x = SF_QuestSystem.QuestListWindow_X;
            this.y = SF_QuestSystem.QuestListWindow_Y;
            this._page = null;
        }

        Window_QuestList.prototype.setPage = function (page) {
            this._page = page;
            this.refresh();
        }

        Window_QuestList.prototype.makeCommandList = function () {
            if (this._page >= 0) {
                for (var i = this._page * quest_one_page + 1; i <= (this._page + 1) * quest_one_page; i++) {
                    if (i >= quest_data.length) {
                        this.addCommand('newquest', 'newquest');
                        break;
                    }
                    this.addCommand(quest_data[i].name, 'quest', true, i);
                }
            }
        }

        Window_QuestList.prototype.newQuest = function () {
            quest_data.splice(quest_data.length, 0, SF_QuestSystem.default_quest());
            this.refresh();
            var i;
            for (i = 0; i * quest_one_page + 1 < quest_data.length; i++) {
            }
            if (i * quest_one_page + 1 == quest_data.length) {
                this._questListInfoWindow.addCommand('newpage', 'newpage');
                this._questListInfoWindow.refresh();
            }
        }

        Window_QuestList.prototype.updateHelp = function () {
            Window_ScrollCommand.prototype.updateHelp.call(this);
            if (this._helpWindow) {
                this._helpWindow.setQuest(this.currentExt());
            }
        }

        //=============================================================================
        // Window_QuestDetail
        //=============================================================================

        Window_QuestDetail.prototype.clear = function () {
            this.contents.clear();
        }

        Window_QuestDetail.prototype.setQuest = function (questId) {
            this._questId = questId;

            var quest = quest_data[this._questId];

            if (!quest) {
                quest = SF_QuestSystem.default_quest();
            }

            this._allTextHeight = this.measureTextHeight(quest.name);
            this._detail_bitmap = new Bitmap(this.contentsWidth(), this._allTextHeight);

            var tmp_content = this.contents;
            this.contents = this._detail_bitmap;
            this.drawTextEx(textState.text, 0, 0);
            this._detail_bitmap = this.contents;
            this.contents = tmp_content;

            this._offset_Y = 0;
            if (this._detail_bitmap.height > this.contentsHeight()) {
                this._need_scroll = true;
            } else {
                this._need_scroll = false;
            }

            this.refresh();
        }

        //=============================================================================
        // Scene_Quest_Editor
        //=============================================================================

        function Scene_QuestEditor() {
            this.initialize.apply(this, arguments);
        }

        SF_QuestSystem.Scene_QuestEditor = Scene_QuestEditor;
        Scene_QuestEditor.prototype = Object.create(Scene_MenuBase.prototype);
        Scene_QuestEditor.prototype.constructor = Scene_QuestEditor;

        Scene_QuestEditor.prototype.initialize = function () {
            Scene_MenuBase.prototype.initialize.call(this);
            this.createEditorDiv();
        }

        Scene_QuestEditor.prototype.create = function () {
            Scene_MenuBase.prototype.create.call(this);
            this.createQuestListWindow();
            this.createQuestDetailWindow();
            this.createQuestListInfoWindow();
            this._questListWindow.setHelpWindow(this._questDetailWindow);
            //  this._questListInfoWindow.setHelpWindow(this._questListWindow);
            this._questListInfoWindow._questListWindow = this._questListWindow;
            this._questListWindow._questListInfoWindow = this._questListInfoWindow;
            this._questListInfoWindow.select(0);
            this._questListWindow.select(0);
        }

        Scene_QuestEditor.prototype.createQuestListWindow = function () {
            this._questListWindow = new Window_QuestList();
            this._questListWindow.setHandler("quest", this.onQuestListOk.bind(this));
            this._questListWindow.setHandler("newquest", this.onQuestListNewQuest.bind(this));
            //this._questListWindow.setHandler("cancel", this.onQuestListCancel.bind(this));
            this.addWindow(this._questListWindow);
        }

        Scene_QuestEditor.prototype.createQuestListInfoWindow = function () {
            this._questListInfoWindow = new Window_QuestListInfo();
            // this._questListInfoWindow.setHandler("cancel", this.popScene.bind(this));
            this._questListInfoWindow.setHandler('quest_page', this.onQuestListInfoPage.bind(this));
            this._questListInfoWindow.setHandler('newpage', this.onQuestListInfoNewPage.bind(this));
            this.addWindow(this._questListInfoWindow);
        }

        Scene_QuestEditor.prototype.createQuestDetailWindow = function () {
            this._questDetailWindow = new Window_QuestDetail();
            this.addWindow(this._questDetailWindow);
        }

        Scene_QuestEditor.prototype.onQuestListOk = function () {
            this._questListWindow.deactivate();
            this._questListInfoWindow.deactivate();
            Input.removeEventHandlers();
            TouchInput.removeEventHandlers();

            this._questListWindow._questId = this._questListWindow.currentExt();
            document.body.appendChild(this._editor_div);
            this._editor_name = document.getElementById("quest_editor_name");
            this._editor_desc = document.getElementById("quest_editor_desc");
            this._editor_save = document.getElementById("quest_editor_save");
            this._editor_cancel = document.getElementById("quest_editor_cancel");
            this._editor_save.addEventListener('click', this._editor_save_bind);
            this._editor_cancel.addEventListener('click', this._editor_cancel_bind);
            this._editor_name.value = quest_data[this._questListWindow._questId].name;
            this._editor_desc.value = quest_data[this._questListWindow._questId].desc;

        }

        Scene_QuestEditor.prototype.onQuestListNewQuest = function () {
            this._questListWindow.newQuest();
            this._questListWindow.activate();
        }

        Scene_QuestEditor.prototype.onQuestListInfoPage = function () {
            this._questListInfoWindow.activate();
        }

        Scene_QuestEditor.prototype.onQuestListInfoNewPage = function () {
            this._questListInfoWindow.newPage();
            this._questListInfoWindow.activate();
        }

        Scene_QuestEditor.prototype.createEditorDiv = function () {
            var canvas = document.getElementById("UpperCanvas");
            this._editor_div = this._editor_div || document.createElement("div");
            this._editor_div.setAttribute("style", "position: absolute;margin: auto; top: 0px; left: 0px; right: 0px; bottom: 0px;z-index: 1000; height:" +
                canvas.offsetHeight + "px; width:" + canvas.offsetWidth + "px; background-color: rgba(0, 0, 0, 0.3); color: #FFFFFF; user-select:text;");
            this._editor_div.setAttribute("id", "quest_editor");

            this._editor_div.innerHTML = `
                <label for="quest_editor_name">Name:</label>
                <input type="text" id="quest_editor_name" value=""><br/>
                <label for="quest_editor_desc">Description:</label><br/>
                <textarea id="quest_editor_desc" style="
                    height: 300px;width: 800px;"></textarea><br/>
                <button id="quest_editor_save">Save</button>
                <button id="quest_editor_cancel">Cancel</button>
            `;
            this._editor_save_bind = this.onEditorSave.bind(this);
            this._editor_cancel_bind = this.onEditorCancel.bind(this);
        }

        Scene_QuestEditor.prototype.onEditorSave = function () {
            var quest = quest_data[this._questListWindow._questId];
            quest.name = this._editor_name.value;
            quest.desc = this._editor_desc.value;
            fs.writeFileSync(quest_path, JsonEx.stringify(quest_data));
            this.onEditorCancel();
        }

        Scene_QuestEditor.prototype.onEditorCancel = function () {
            this._editor_div.remove();
            this._editor_save.removeEventListener("click", this._editor_save_bind);
            this._editor_cancel.removeEventListener("click", this._editor_cancel_bind);
            Input._setupEventHandlers();
            TouchInput._setupEventHandlers();
            Input.clear();
            TouchInput.clear();
            this._questListWindow.activate();
            this._questListInfoWindow.activate();
            this._questListWindow.refresh();
            this._questListWindow.selectExt(this._questListWindow._questId);
        }

        //=============================================================================
        // Scene_Title
        //=============================================================================

        Scene_Title.prototype.start = function () {
            SceneManager.goto(Scene_QuestEditor);
        }
    } else {
        //=============================================================================
        // DataManager
        //=============================================================================

        DataManager._databaseFiles.push({ name: '$dataQuests', src: 'Quests.json' });
    }

})();