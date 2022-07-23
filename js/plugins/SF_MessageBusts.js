//=============================================================================
// Salted Fish Plugins - Message Busts
// SF_MessageBusts.js
//=============================================================================
"use strict";
var Imported = Imported || {};
Imported.SF_MessageBusts = true;

var SF_Plugins = SF_Plugins || {};

//=============================================================================
/**
 /*:
 * 
 * @plugindesc Message Busts
 * @author Salted Fish
 * 
 * @help
 * 基于 Galv_MessageBusts.js 插件编写。
 * 
 * 尝试在“显示文本”时自动展示大号脸图（如果文件存在的话），否则展示原本的图片。
 * 
 * 将对应的图片放在
 * img/faces/large 文件夹下。
 * 
 * 命名方式为：
 * {图片名称}_编号.png
 * 
 * 举例：如果在“显示文本”的命令中选择脸图的文件为"Actor1"的第二个图，
 * 那么这个插件就会使用 img/faces/large/Actor1_2.png 这张图片作为大号的脸图。
 * 
 * @param scanFiles
 * @desc 扫描本地文件夹，生成对应的
 * 
 */