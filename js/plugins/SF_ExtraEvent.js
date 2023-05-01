//=============================================================================
// Salted Fish Plugins - Extra Event
// SF_ExtraEvent.js
//=============================================================================

"use strict";
var Imported = Imported || {};
Imported.SF_ExtraEvent = true;

var SF_Plugins = SF_Plugins || {};
var $dataMapExt = null;
var $gameMapsExt = null;

//=============================================================================
/*:
 * @plugindesc This plugin provide extra event.
 * @author Salted Fish
 *
 * @param ExportMapExtraEvent
 * @desc Export map extra event to json file.
 * only available in nwjs.
 * @default false
 * @type boolean
 *
 * @help
 * ============================================================================
 * Introduction 介绍
 * ============================================================================
 *
 * This plugin provide extra event.
 * 这个插件提供额外的事件。
 *
 * put in event note:
 * 把这东西放进事件的note中来将这个事件导出
 *  <SF_EXTRA_EVENT: eventExtId>
 *
 *
 * ============================================================================
 * Plugin Commands 插件命令
 * ============================================================================
 *
 * SF_Extra_Event Insert_Event <mapId> <evenExttId>
 *   Add an event to the map.
 *   将一个额外事件添加到地图中
 *
 * SF_Extra_Event Remove_Event <mapId> <eventExtId>
 *   Remove an event from the map.
 *   将一个额外事件从地图中移除
 *
 * SF_Extra_Event Ext Show_Balloon_Icon <eventExtId> <ballonId> <waitForComplete>
 *   用来将不在地图上的事件能添加 显示气球图标 的命令
 *   这个命令会在导出事件的时候将其转换成对应的事件指令
 *   eventExtId 事件的额外ID
 *   ballonId 要显示的气球的ID （从1开始计数）
 *   waifForComplete 是否要等待完成，使用 true 或 false，其余样式会作为false来生成
 *
 * SF_Extra_Event Ext Set_Event_Location <eventExtId> <direct|variables|exchange> <param1> <param2> <direction>
 *   用来设置额外事件的位置
 *   eventExtId 是设置额外事件的对象
 *   设置的位置有三种方式 direct variables exchange
 *   direct是直接指定目标位置，param1和param2就是目标的x,y坐标
 *   variables是用变量来计算目标的位置 param1和param2就是目标x,y坐标所在的变量标号
 *   exchange是与地图上的事件进行对换
 *       param1为normal或ext代表与普通事件或额外事件对换
 *       param2则指定事件的Id，使用0则代指自身
 *   direction则是指定事件的朝向 使用stay, down, left, right, up来代指朝向。
 *
 * 在设置移动路线时，填入脚本$gameMapsExt.set_route_target(eventExtId)来修改本次移动路线
 * 设置的事件对象，只有最后一次有效。这个脚本是无法执行的，要经过导出转成语义可用的。
 *
 * ============================================================================
 * Script Calls
 * ============================================================================
 *
 * $gameMapsExt.insert_event_to_need(mapId, eventExtId)
 *  Add an event to the map.
 *
 * $gameMapsExt.remove_event_from_need(mapId, eventExtId)
 *  Remove an event from the map.
 *
 * ============================================================================
 * Compatibility
 * ============================================================================
 *
 *   This plugin is compatible with xdRs_MiniMap.js
 *
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.0:
 *  - Release
 */
//=============================================================================

(function () {
    var SF_ExtraEvent = SF_ExtraEvent || {};
    SF_Plugins.SF_ExtraEvent = SF_ExtraEvent;

    SF_ExtraEvent.version = 1.0;
    SF_ExtraEvent.EventExtIdStart = 100000;

    //=============================================================================
    // Parameter
    //=============================================================================

    SF_ExtraEvent.Parameters = PluginManager.parameters("SF_ExtraEvent");
    SF_ExtraEvent.ExportMapExtraEvent = String(SF_ExtraEvent.Parameters["ExportMapExtraEvent"] || "false") === "true";

    //=============================================================================
    // DataManager
    //=============================================================================

    SF_ExtraEvent.DataManager_loadMapData = DataManager.loadMapData;
    DataManager.loadMapData = function (mapId) {
        SF_ExtraEvent.DataManager_loadMapData.call(this, mapId);
        if (mapId > 0) {
            var filename = "Map%1Ext.json".format(mapId.padZero(3));
            this.loadDataFile("$dataMapExt", filename);
        } else {
            this.makeEmptyMapExt();
        }
    };

    DataManager.makeEmptyMapExt = function () {
        $dataMapExt = {};
        $dataMapExt.events = {};
    };

    SF_ExtraEvent.DataManager_isMapLoaded = DataManager.isMapLoaded;
    DataManager.isMapLoaded = function () {
        if (!SF_ExtraEvent.DataManager_isMapLoaded.call(this)) return false;
        return !!$dataMapExt;
    };

    SF_ExtraEvent.DataManager_onLoad = DataManager.onLoad;
    DataManager.onLoad = function (object) {
        SF_ExtraEvent.DataManager_onLoad.call(this, object);
        if (object === $dataMapExt) {
            var events = $dataMapExt.events;
            for (var key in events) {
                var event = events[key];
                if (event && event.note !== undefined) {
                    this.extractMetadata(event);
                }
            }
        }
    };

    SF_ExtraEvent.DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function () {
        var contents = SF_ExtraEvent.DataManager_makeSaveContents.call(this);
        contents.mapsExt = $gameMapsExt;
        return contents;
    };

    SF_ExtraEvent.DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function (contents) {
        SF_ExtraEvent.DataManager_extractSaveContents.call(this, contents);
        $gameMapsExt = contents.mapsExt;
    };

    SF_ExtraEvent.DataManager_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function () {
        SF_ExtraEvent.DataManager_createGameObjects.call(this);
        $gameMapsExt = new Game_MapsExt();
    };

    //=============================================================================
    // Game_MapsExt
    //=============================================================================

    function Game_MapsExt() {
        this.initialize.apply(this, arguments);
    }

    window.Game_MapsExt = Game_MapsExt;

    Game_MapsExt.prototype.initialize = function () {
        this._need_insert_events_id = {}; // key: mapId, value: [eventId]
    };

    // Get Extra event Ids
    Game_MapsExt.prototype.need_insert_events_id = function (mapId) {
        if (this._need_insert_events_id[mapId] === undefined) {
            this._need_insert_events_id[mapId] = [];
        }
        return this._need_insert_events_id[mapId];
    };

    // Insert an event to the need List
    Game_MapsExt.prototype.insert_event_to_need = function (mapId, eventId) {
        var events = this.need_insert_events_id(mapId);
        eventId += SF_ExtraEvent.EventExtIdStart;
        if (events.indexOf(eventId) === -1) {
            events.push(eventId);

            if (mapId == $gameMap.mapId()) {
                $gameMap.addEvent(eventId);
            }
        }
    };

    // Remove an event from the need List
    Game_MapsExt.prototype.remove_event_from_need = function (mapId, eventId) {
        var events = this.need_insert_events_id(mapId);
        eventId += SF_ExtraEvent.EventExtIdStart;
        var index = events.indexOf(eventId);
        if (index !== -1) {
            events.splice(index, 1);
        }
        if (mapId == $gameMap.mapId()) {
            $gameMap.removeEvent(eventId);
        }
    };

    // Get Extra events in the map
    // return {eventId: event}
    Game_MapsExt.prototype.need_insert_events = function (mapId) {
        var events_id = this.need_insert_events_id(mapId);
        var events = {};
        for (var i = 0; i < events_id.length; i++) {
            var eventId = events_id[i];
            events[eventId] = $dataMapExt.events[eventId];
        }
        return events;
    };

    //=============================================================================
    // Game_Map
    //=============================================================================

    SF_ExtraEvent.Game_Map_initialize = Game_Map.prototype.initialize;
    Game_Map.prototype.initialize = function () {
        SF_ExtraEvent.Game_Map_initialize.call(this);
        this._events = {};
    };

    SF_ExtraEvent.Game_Map_setupEvents = Game_Map.prototype.setupEvents;
    Game_Map.prototype.setupEvents = function () {
        this._events = {};
        for (var i = 0; i < $dataMap.events.length; i++) {
            if ($dataMap.events[i]) {
                this._events[i] = new Game_Event(this.mapId(), i);
            }
        }

        var event_ids = $gameMapsExt.need_insert_events_id(this.mapId());
        for (var i = 0; i < event_ids.length; i++) {
            var eventId = event_ids[i];
            this._events[eventId] = new Game_Event(this.mapId(), eventId);
        }

        this._commonEvents = this.parallelCommonEvents().map(function (commonEvent) {
            return new Game_CommonEvent(commonEvent.id);
        });

        this.refreshTileEvents();
    };

    SF_ExtraEvent.Game_Map_events = Game_Map.prototype.events;
    Game_Map.prototype.events = function () {
        var events = [];
        for (var key in this._events) {
            var event = this._events[key];
            events.push(event);
        }
        return events;
    };

    Game_Map.prototype.addEvent = function (eventId) {
        this._events[eventId] = new Game_Event(this.mapId(), eventId);
        if (SceneManager._scene instanceof Scene_Map && SceneManager._scene._spriteset) {
            SceneManager._scene._spriteset.addEvent(this._events[eventId]);
        }
        this._events[eventId].refresh();
        this.requestRefresh();
    };

    Game_Map.prototype.removeEvent = function (eventId) {
        this._events[eventId].erase();
        if (SceneManager._scene instanceof Scene_Map && SceneManager._scene._spriteset) {
            SceneManager._scene._spriteset.removeEvent(this._events[eventId]);
        }
        delete this._events[eventId];
        this.requestRefresh();
    };

    //=============================================================================
    // Game_Event
    //=============================================================================

    SF_ExtraEvent.Game_Event_event = Game_Event.prototype.event;
    Game_Event.prototype.event = function () {
        if (this._eventId >= SF_ExtraEvent.EventExtIdStart) {
            return $dataMapExt.events[this._eventId];
        } else {
            return SF_ExtraEvent.Game_Event_event.call(this);
        }
    };

    //=============================================================================
    // Spriteset_Map
    //=============================================================================

    Spriteset_Map.prototype.addEvent = function (event) {
        var sprite = new Sprite_Character(event);
        this._characterSprites.push(sprite);
        this._tilemap.addChild(sprite);
    };

    Spriteset_Map.prototype.removeEvent = function (event) {
        var sprite = this._characterSprites.filter(function (sprite) {
            return sprite._character === event;
        })[0];

        this._characterSprites = this._characterSprites.filter(function (sprite) {
            return sprite !== sprite;
        });

        this._tilemap.removeChild(sprite);
    };

    //=============================================================================
    // Game_Interpreter
    //=============================================================================

    SF_ExtraEvent.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        SF_ExtraEvent.Game_Interpreter_pluginCommand.call(this, command, args);
        if (command.toLowerCase() === "sf_extra_event") {
            switch (args[0].toLowerCase()) {
                case "insert_event":
                    var mapId = Number(args[1]);
                    var eventId = Number(args[2]);
                    $gameMapsExt.insert_event_to_need(mapId, eventId);
                    break;
                case "remove_event":
                    var mapId = Number(args[1]);
                    var eventId = Number(args[2]);
                    $gameMapsExt.remove_event_from_need(mapId, eventId);
                    break;
                case "ext":
                    throw new Error("在运行之前要先导出，完成生成过程");
            }
        }
    };

    //=============================================================================
    // Try To Export Extra Event to MapExt json
    //=============================================================================

    if (Utils.isNwjs() && Utils.isOptionValid("test") && SF_ExtraEvent.ExportMapExtraEvent) {
        var fs = require("fs");
        var path = require("path");
        var note_reg = new RegExp(/<SF_EXTRA_EVENT:\s*(\d*)>/i);

        var move_route_target = new RegExp(/\$gameMapsExt\.set_route_target\(\s*(\d+)\s*\)/);

        function processCommand213(command, map_events) {
            if (command.parameters[0] > 0) {
                var tmp_event = map_events[command.parameters[0]];
                if (tmp_event) {
                    var match = note_reg.exec(tmp_event.note);
                    if (match) {
                        command.parameters[0] = Number(match[1]) + SF_ExtraEvent.EventExtIdStart;
                    }
                }
            }
        }

        function processCommand203(command, map_events) {
            if (command.parameters[0] > 0) {
                var tmp_event = map_events[command.parameters[0]];
                if (tmp_event) {
                    var match = note_reg.exec(tmp_event.note);
                    if (match) {
                        command.parameters[0] = Number(match[1]) + SF_ExtraEvent.EventExtIdStart;
                    }
                }
            }
            if (command.parameters[1] !== 0 && command.parameters[1] !== 1) {
                var tmp_event = map_events[command.parameters[2]];
                if (tmp_event) {
                    var match = note_reg.exec(tmp_event.note);
                    if (match) {
                        command.parameters[2] = Number(match[1]) + SF_ExtraEvent.EventExtIdStart;
                    }
                }
            }
        }

        function processCommand205(command, map_events) {
            if (command.parameters[0] > 0) {
                var tmp_event = map_events[command.parameters[0]];
                if (tmp_event) {
                    var match = note_reg.exec(tmp_event.note);
                    if (match) {
                        command.parameters[0] = Number(match[1]) + SF_ExtraEvent.EventExtIdStart;
                    }
                }
            }
            var list = command.parameters[1]["list"];
            var target = command.parameters[0];
            list = list.filter(function (elem) {
                if (elem.code !== 45) {
                    return true;
                }
                var script = elem.parameters[0];
                var match = move_route_target.exec(script);
                if (!match) {
                    return true;
                }
                target = Number(match[1]) + SF_ExtraEvent.EventExtIdStart;
                return false;
            });
            command.parameters[0] = target;
            command.parameters[1]["list"] = list;
        }

        function toCommand213(command, args, map_event) {
            var event_id = Number(args[2]) + SF_ExtraEvent.EventExtIdStart;
            command.code = 213;
            command.parameters = [event_id, Number(args[3]), args[4].toLowerCase() === "true"];
        }

        function toCommand203(command, args, map_event) {
            var event_id = Number(args[2]) + SF_ExtraEvent.EventExtIdStart;
            command.code = 203;
            command.parameters = [event_id, 0, 0, 0, 0];
            switch (args[3].toLowerCase()) {
                case "direct":
                    command.parameters[1] = 0;
                    command.parameters[2] = Number(args[4]);
                    command.parameters[3] = Number(args[5]);
                    break;
                case "variables":
                    command.parameters[1] = 1;
                    command.parameters[2] = Number(args[4]);
                    command.parameters[3] = Number(args[5]);
                    break;
                case "exchange":
                    command.parameters[1] = 2;
                    if (args[4].toLowerCase() === "normal") {
                        command.parameters[2] = Number(args[5]);
                    } else if (args[4].toLowerCase() === "ext") {
                        command.parameters[2] = Number(args[5]) + SF_ExtraEvent.EventExtIdStart;
                    } else {
                        throw new Error("not support excahnge target");
                    }
                    break;
                default:
                    throw new Error("not support event location mode");
            }
            const dirct_map = {
                stay: 0,
                down: 1,
                left: 2,
                right: 3,
                up: 4,
            };
            command.parameters[4] = dirct_map[args[6].toLowerCase()];
            if ((typeof command.parameters[4]).toLowerCase() !== "number") {
                throw new Error("not support direction");
            }
        }

        function processCommand365(command, map_event) {
            var args = command.parameters[0].split(" ");
            var com = args.shift();
            if (com.toLowerCase() !== "sf_extra_event" || args[0].toLowerCase() !== "ext") {
                return;
            }
            switch (args[1].toLowerCase()) {
                case "show_balloon_icon":
                    toCommand213(com, args, map_event);
                    break;
                case "set_event_location":
                    toCommand203(com, args, map_event);
            }
        }

        function exportExtraEvent(mapId) {
            var map_data_path = path.join(process.cwd(), "data/Map%1.json".format(mapId.padZero(3)));
            var map_ext_data_path = path.join(process.cwd(), "data/Map%1Ext.json".format(mapId.padZero(3)));
            var map_data = JSON.parse(fs.readFileSync(map_data_path, "utf8"));

            var map_events = map_data.events;
            var map_ext_event_list = [];
            var map_event_list = [];

            for (var i = 0; i < map_events.length; i++) {
                var event = map_events[i];
                if (event) {
                    var pages = event.pages;
                    for (var j = 0; j < pages.length; j++) {
                        var list = pages[j].list;
                        for (var k = 0; k < list.length; k++) {
                            var command = list[k];
                            if (command.code === 213) {
                                processCommand213(command, map_events);
                            } else if (command.code === 203) {
                                processCommand203(command, map_events);
                            } else if (command.code === 205) {
                                processCommand205(command, map_events);
                            } else if (command.code === 365) {
                                processCommand365(command, map_events);
                            }
                        }
                        pages[j].list = pages[j].list.filter(function (command) {
                            if (command.code !== 505) {
                                return true;
                            }
                            if (command.parameters[0].code !== 45) {
                                return true;
                            }
                            if (!move_route_target.exec(command.parameters[0].parameters[0])) {
                                return true;
                            }
                            return false;
                        });
                    }
                }
            }

            for (var i = 0; i < map_events.length; i++) {
                var event = map_events[i];

                if (map_events[i]) {
                    var match = note_reg.exec(map_events[i].note);
                    if (match) {
                        var event_id = Number(match[1]) + SF_ExtraEvent.EventExtIdStart;
                        event.ext_id = event_id;
                        map_ext_event_list.push(event);
                    } else {
                        map_event_list.push(event);
                    }
                } else {
                    map_event_list.push(null);
                }
            }

            map_data.events = map_event_list;
            fs.writeFileSync(map_data_path, JSON.stringify(map_data), "utf8");

            var map_ext_data = null;
            var old_ext_data = null;
            if (fs.existsSync(map_ext_data_path)) {
                map_ext_data = JSON.parse(fs.readFileSync(map_ext_data_path, "utf8"));
                old_ext_data = map_ext_data.events;
            } else {
                old_ext_data = {};
                map_ext_data = { events: old_ext_data };
            }
            map_ext_event_list.forEach(function (event) {
                event.id = event.ext_id;
                old_ext_data[event.ext_id] = event;
            });
            map_ext_data.events = old_ext_data;
            fs.writeFileSync(map_ext_data_path, JSON.stringify(map_ext_data), "utf8");
        }

        var mapInfoPath = path.join(process.cwd(), "data/MapInfos.json");
        var mapInfos = JSON.parse(fs.readFileSync(mapInfoPath, "utf8"));
        mapInfos.forEach(function (mapInfo) {
            if (mapInfo) {
                exportExtraEvent(mapInfo.id);
            }
        });
    }

    //=============================================================================
    // Compatible with xdRs_MiniMap
    //=============================================================================

    if (Imported.xdRs_MiniMap) {
        SF_ExtraEvent.xdRs_MiniMap = {};

        //=============================================================================
        // Game_Map
        //=============================================================================

        SF_ExtraEvent.xdRs_MiniMap.Game_Map_addEvent = Game_Map.prototype.addEvent;
        Game_Map.prototype.addEvent = function (eventId) {
            SF_ExtraEvent.xdRs_MiniMap.Game_Map_addEvent.call(this, eventId);
            if (SceneManager._scene instanceof Scene_Map && SceneManager._scene._miniMap) {
                SceneManager._scene._miniMap.addEvent(this._events[eventId]);
            }
        };

        SF_ExtraEvent.xdRs_MiniMap.Game_Map_removeEvent = Game_Map.prototype.removeEvent;
        Game_Map.prototype.removeEvent = function (eventId) {
            SF_ExtraEvent.xdRs_MiniMap.Game_Map_removeEvent.call(this, eventId);
            if (SceneManager._scene instanceof Scene_Map && SceneManager._scene._miniMap) {
                SceneManager._scene._miniMap.removeEvent(this._events[eventId]);
            }
        };

        SF_ExtraEvent.xdRs_MiniMap.Game_Map_eraseEvent = Game_Map.prototype.eraseEvent;
        Game_Map.prototype.eraseEvent = function (eventId) {
            SF_ExtraEvent.xdRs_MiniMap.Game_Map_eraseEvent.call(this, eventId);
            if (SceneManager._scene instanceof Scene_Map && SceneManager._scene._miniMap) {
                SceneManager._scene._miniMap.removeEvent(this._events[eventId]);
            }
        };
        //=============================================================================
        // Window_MiniMap
        //=============================================================================

        Window_MiniMap.prototype.addEvent = function (event) {
            this._sprite.addEvent(event);
        };

        Window_MiniMap.prototype.removeEvent = function (event) {
            this._sprite.removeEvent(event);
        };

        //=============================================================================
        // Sprite_MiniMap
        //=============================================================================

        Sprite_MiniMap.prototype.addEvent = function (event) {
            var sprite = new Sprite_MiniPart(event);
            this._parts.push(sprite);
            this.addChild(sprite);
        };

        Sprite_MiniMap.prototype.removeEvent = function (event) {
            var sprite = this._parts.filter(function (sprite) {
                return sprite._obj === event;
            })[0];

            this._parts = this._parts.filter(function (sprite) {
                return sprite !== sprite;
            });

            this.removeChild(sprite);
        };
    }
})();
