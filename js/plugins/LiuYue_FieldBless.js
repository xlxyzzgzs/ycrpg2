/*:
 * @plugindesc v1.08 FieldBless 领域加护
 * @author 流逝的岁月
 *
 * @help
 * ============================================================================
 * 介绍
 * ============================================================================ *
 *
 * 
 * 这个插件赋予一个额外的卡槽,可以用于添加'加护'效果,可以在这个'加护'卡槽中,添加你想拥有的增益效果
 *
 * 
 *
 *
 *-------------------------------------------------------------------
 *
 *使用条例：本插件完全免费，随意魔改
 * 
 *-------------------------------------------------------------------
 *
 * 
 *
 *
 *
 * 注意:关于公式,可用以下的内容信息,当然如果对js不熟悉,也可以直接输入数字
 *
 *	actor              //角色 
 *  a                  //角色,与actor相同
 *  target             //目标(如果有,则可以使用)
 *  b                  //目标,与target相同
 *	variables[ID]      //全局变量
 *  v[ID]              //全局变量,与variables相同
 *  V[ID]              //全局变量,与variables相同
 *	switchs[ID]        //全局开关
 *  s[ID]              //全局开关,与switchs相同
 *  S[ID]              //全局开关,与switchs相同
 *	level              //角色等级
 *  usecount           //角色所使用的加护容量(并非加护数量)
 *  nullcount          //角色剩余加护容量
 *
 *
 *
 *
 *
 *
 *
 * 比如想要实现HP通过人物等级*100点的效果,做出'成长形'的加护,那么可以在物品备注中这样写:
 * <ZzyFBF HP: 100*level>
 *
 *
 *
 *
 *
 * 
 *以下是一些插件用到的插件指令
 *---------------------Plugin Command--------------------
 *
 *
 * ZzyFBF EnableMenu x(true/false)                             //是否激活菜单'加护'选项
 * ZzyFBF InsertMenu x(true/false)                             //是否隐藏菜单'加护'选项
 * ZzyFBF CommandName x                                        //这会改变命令的文本内容
 *
 * ZzyFBF EnableSMenu x(true/false)                            //是否激活角色技能菜单'加护'选项
 * ZzyFBF InsertSMenu x(true/false)                            //是否隐藏角色技能菜单'加护'选项
 * ZzyFBF SCommandName x                                       //这会改变角色技能命令的文本内容
 *
 *
 * ZzyFBF OpenActor x                                          //这将会打开数据库x号角色的守护窗口界面
 * ZzyFBF OpenParty x                                          //这将会打开队伍中x号角色的守护窗口面板,请注意队长代表0号
 *
 *
 *
 * ZzyFBF EnableActorFB x(true/false)                          //则会开启或是关闭角色拥有的领域效果,注意这不包含自定义设定
 * ZzyFBF MaxCount x                                           //角色默认的最大加护槽数量,角色的加护槽不会超过这个值,这可以是一个公式,也可以输入Infinite代表无上限
 * ZzyFBF CurrentCount x                                       //角色目前的加护槽数量,这个值可通过角色的属性进行调整,这可以是一个公式
 * ZzyFBF MemoryCount x                                        //这会设置道具的默认占用格子量
 *
 * ZzyFBF ForceUnInstallAll x                                  //这会强制卸载一位角色所有的加护 
 * x:输入角色的ID值
 *
 * 
 *
 *
 *以下是一些插件用到的脚本函数
 *---------------------Script Function--------------------
 *
 *
 * Zzy.FBF.EnableMenu(enable)                                 //是否激活菜单'加护'选项
 * Zzy.FBF.InsertMenu(enable)                                 //是否隐藏菜单'加护'选项
 * Zzy.FBF.CommandName(commandText)                           //这会改变命令的文本内容
 * Zzy.FBF.EnableSMenu(enable)                                //是否激活角色技能菜单'加护'选项
 * Zzy.FBF.InsertSMenu(enable)                                //是否隐藏角色技能菜单'加护'选项
 * Zzy.FBF.SCommandName(commandText)                          //这会改变角色技能命令的文本内容
 * Zzy.FBF.OpenActor(actorId)                                 //这将会打开数据库x号角色的守护窗口界面
 * Zzy.FBF.OpenParty(index)                                   //这将会打开队伍中x号角色的守护窗口面板,请注意队长代表0号
 * Zzy.FBF.EnableActorFB(enable)                              //则会开启或是关闭角色拥有的领域效果,注意这不包含自定义设定
 * Zzy.FBF.MaxCount(formula)                                  //角色默认的最大加护槽数量,角色的加护槽不会超过这个值,这可以是一个公式,也可以输入Infinite代表无上限
 * Zzy.FBF.CurrentCount(formula)                              //角色目前的加护槽数量,这个值可通过角色的属性进行调整,这可以是一个公式
 * Zzy.FBF.MemoryCount(count)                                 //这会设置道具的默认占用格子量
 * Zzy.FBF.ForceUnInstallAll(actorId)                         //这会强制卸载一位角色所有的加护 
 *
 *
 *
 *
 *以下是一些插件用到的便签信息
 *---------------------Data Case--------------------
 *可以在 数据库 物品 备注 中添加以下内容: 
 * <ZzyFBF Enable>                                               //将此道具视为拥有'加护'效果,使用以下指令必须先为物品添加这条备注信息
 * <ZzyFBF TextColor: x>         --文字颜色--                    //这将会修改显示加护文字的色彩,填写#000000~#ffffff 或是 rpga(0~255,0~255,0~255,0~1)
 * <ZzyFBF BorderWidth: x>       --文字边框宽度--                //这将会修改显示文字边框的宽度,请填写整数
 * <ZzyFBF BorderColor: x>       --文字边框颜色--                //这将会修改显示文字边框的颜色,填写#000000~#ffffff 或是 rpga(0~255,0~255,0~255,0~1)
 * <ZzyFBF TextSize: x>          --文字字体大小--                //这将会修改显示文字的字体大小,请填写整数
 *
 *
 * //注意标签中公式不可以存在空格
 *
 *
 * <ZzyFBF HP: x>          ----生命----                              //装备加护时增加HP,这可以是一个公式
 * <ZzyFBF HPPer: x>                                                 //装备加护时增加HP百分比,这可以是一个公式
 *
 * <ZzyFBF MP: x>          ----魔法----                              //装备加护时增加MP,这可以是一个公式
 * <ZzyFBF MPPer: x>                                                 //装备加护时增加MP百分比,这可以是一个公式
 *
 * <ZzyFBF ATK: x>         ----攻击----                              //装备加护时增加ATK,这可以是一个公式
 * <ZzyFBF ATKPer: x>                                                //装备加护时增加ATK百分比,这可以是一个公式
 *
 * <ZzyFBF DEF: x>         ----防御----                              //装备加护时增加DEF,这可以是一个公式
 * <ZzyFBF DEFPer: x>                                                //装备加护时增加DEF百分比,这可以是一个公式
 *
 * <ZzyFBF MAT: x>         ----魔攻----                              //装备加护时增加MAT,这可以是一个公式
 * <ZzyFBF MATPer: x>                                                //装备加护时增加MAT百分比,这可以是一个公式
 *
 * <ZzyFBF MDF: x>         ----魔抗----                              //装备加护时增加MDF,这可以是一个公式
 * <ZzyFBF MDFPer: x>                                                //装备加护时增加MDF百分比,这可以是一个公式
 *
 * <ZzyFBF AGI: x>         ----速度----                              //装备加护时增加AGI,这可以是一个公式
 * <ZzyFBF AGIPer: x>                                                //装备加护时增加AGI百分比,这可以是一个公式
 *
 * <ZzyFBF LUK: x>         ----幸运----                              //装备加护时增加LUK,这可以是一个公式
 * <ZzyFBF LUKPer: x>                                                //装备加护时增加LUK百分比,这可以是一个公式
 *
 * <ZzyFBF HIT: x>                   --命中--                       //装备加护时增加HIT,这可以是一个公式
 * <ZzyFBF HITPer: x>                --命中--                       //装备加护时增加HIT百分比,这可以是一个公式
 *
 * <ZzyFBF EVA: x>                   --闪避--                       //装备加护时增加EVA,这可以是一个公式
 * <ZzyFBF EVAPer: x>                --闪避--                       //装备加护时增加EVA百分比,这可以是一个公式
 *
 * <ZzyFBF CRI: x>                   --暴击--                       //装备加护时增加CRI,这可以是一个公式
 * <ZzyFBF CRIPer: x>                --暴击--                       //装备加护时增加CRI百分比,这可以是一个公式
 *
 * <ZzyFBF CEV: x>                 --暴击回避--                     //装备加护时增加CEV,这可以是一个公式
 * <ZzyFBF CEVPer: x>              --暴击回避--                     //装备加护时增加CEV百分比,这可以是一个公式
 *
 * <ZzyFBF MEV: x>                 --魔法回避--                     //装备加护时增加MEV,这可以是一个公式
 * <ZzyFBF MEVPer: x>              --魔法回避--                     //装备加护时增加MEV百分比,这可以是一个公式
 *
 * <ZzyFBF MRF: x>                 --魔法反射--                     //装备加护时增加MRF,这可以是一个公式
 * <ZzyFBF MRFPer: x>              --魔法反射--                     //装备加护时增加MRF百分比,这可以是一个公式
 *
 * <ZzyFBF CNT: x>                   --反击--                       //装备加护时增加CNT,这可以是一个公式
 * <ZzyFBF CNTPer: x>                --反击--                       //装备加护时增加CNT百分比,这可以是一个公式
 *
 * <ZzyFBF HRG: x>                --HP自动恢复--                    //装备加护时增加HRG,这可以是一个公式
 * <ZzyFBF HRGPer: x>             --HP自动恢复--                    //装备加护时增加HRG百分比,这可以是一个公式
 *
 * <ZzyFBF MRG: x>                --MP自动恢复--                    //装备加护时增加MRG,这可以是一个公式
 * <ZzyFBF MRGPer: x>             --MP自动恢复--                    //装备加护时增加MRG百分比,这可以是一个公式
 *
 * <ZzyFBF TRG: x>                --TP自动恢复--                    //装备加护时增加TRG,这可以是一个公式
 * <ZzyFBF TRGPer: x>             --TP自动恢复--                    //装备加护时增加TRG百分比,这可以是一个公式
 *
 * <ZzyFBF TGR: x>                --受到攻击几率--                    //装备加护时增加TGR,这可以是一个公式
 * <ZzyFBF TGRPer: x>             --受到攻击几率--                    //装备加护时增加TGR百分比,这可以是一个公式
 *
 * <ZzyFBF GRD: x>                --防御效果--                    //装备加护时增加GRD,这可以是一个公式
 * <ZzyFBF GRDPer: x>             --防御效果--                    //装备加护时增加GRD百分比,这可以是一个公式
 *
 * <ZzyFBF REC: x>                --恢复效果--                    //装备加护时增加REC,这可以是一个公式
 * <ZzyFBF RECPer: x>             --恢复效果--                    //装备加护时增加REC百分比,这可以是一个公式
 *
 * <ZzyFBF PHA: x>                --药理知识--                    //装备加护时增加PHA,这可以是一个公式
 * <ZzyFBF PHAPer: x>             --药理知识--                    //装备加护时增加PHA百分比,这可以是一个公式
 *
 * <ZzyFBF MCR: x>                --MP消耗率--                    //装备加护时增加MCR,这可以是一个公式
 * <ZzyFBF MCRPer: x>             --MP消耗率--                    //装备加护时增加MCR百分比,这可以是一个公式
 *
 * <ZzyFBF TCR: x>                --TP消耗率--                    //装备加护时增加TCR,这可以是一个公式
 * <ZzyFBF TCRPer: x>             --TP消耗率--                    //装备加护时增加TCR百分比,这可以是一个公式
 *
 * <ZzyFBF PDR: x>                --物理伤害--                    //装备加护时增加PDR,这可以是一个公式
 * <ZzyFBF PDRPer: x>             --物理伤害--                    //装备加护时增加PDR百分比,这可以是一个公式
 *
 * <ZzyFBF MDR: x>                --魔法伤害--                    //装备加护时增加MDR,这可以是一个公式
 * <ZzyFBF MDRPer: x>             --魔法伤害--                    //装备加护时增加MDR百分比,这可以是一个公式
 *
 *
 * <ZzyFBF FDR: x>                --地板伤害--                    //装备加护时增加FDR,这可以是一个公式
 * <ZzyFBF FDRPer: x>             --地板伤害--                    //装备加护时增加FDR百分比,这可以是一个公式
 *
 * <ZzyFBF EXP: x>                --经验值--                      //装备加护时增加战斗结算EXP,这可以是一个公式
 * <ZzyFBF EXPPer: x>             --经验值--                      //装备加护时增加战斗结算EXP百分比,这可以是一个公式
 *
 * <ZzyFBF GOLD: x>               --金币--                      //装备加护时增加战斗结算GOLD,这可以是一个公式
 * <ZzyFBF GOLDPer: x>            --金币--                      //装备加护时增加战斗结算GOLD百分比,这可以是一个公式
 *
 * <ZzyFBF DAR: x>               --伤害减免--                      //装备加护时战斗受到伤害DAR,这可以是一个公式
 * <ZzyFBF DARPer: x>            --伤害减免--                      //装备加护时战斗受到伤害DAR百分比,这可以是一个公式
 *
 * <ZzyFBF Element: x1 x2>       --元素伤害--                      //拥有战斗时技能元素造成伤害额外值,x1是元素ID,x2是伤害值,这可以是一个公式
 * <ZzyFBF ElementPer: x1 x2>    --元素伤害--                      //增加元素的百分比,x1是元素ID,x2是伤害值,这可以是一个公式
 *
 * <ZzyFBF ESCPer: x>            --逃跑概率--                      //装备加护时增加或者减少逃跑的概率,x填写20就代表增加20%,这可以是一个公式
 * <ZzyFBF SNAKPer: x>           --偷袭概率--                      //装备加护时遭遇战斗增加或减少先发制人的概率,x填写20就代表增加20%,这可以是一个公式
 * <ZzyFBF BSAKPer: x>           --被偷袭概率--                    //装备加护时遭遇战斗增加或减少被偷袭的的概率,x填写20就代表增加20%,这可以是一个公式
 *
 *
 * <ZzyFBF ENCT: x>              --遇敌步数--                      //装备加护时遭遇敌人所需要的倍数增加或减少,x填写10就代表额外10步后才有概率遭遇敌人
 * <ZzyFBF ENCTPer: x>           --遇敌步数--                      //装备加护时遭遇敌人所需要的倍数增加或减少,x填写10就代表额外10%步后才有概率遭遇敌人
 *
 *
 * <ZzyFBF Memory: x>                                               //修改加护的占用量 
 * <ZzyFBF NoInstall>                                               //这会使安装的加护无法通过界面方式进行拆卸
 *
 * <ZzyFBF Class: x>                                                //限定可以使用这个加护的职业ID,设置后则会限制在这个范围中
 * <ZzyFBF Class: x1,x2,x3...>                                      //限定可以使用这个加护的职业ID,可输入多个ID值
 * <ZzyFBF Actor: x>                                                //限定可以使用这个加护的角色ID,设置后则会限制在这个范围中,此优先级高于职业设置
 * <ZzyFBF Actor: x1,x2,x3...>                                      //限定可以使用这个加护的角色ID,可输入多个ID值
 * <ZzyFBF NoClass: x>                                              //限定不可以使用这个加护的职业ID
 * <ZzyFBF NoClass: x1,x2,x3...>                                    //限定不可以使用这个加护的职业ID,可输入多个ID值
 * <ZzyFBF NoActor: x>                                              //限定不可以使用这个加护的角色ID,此优先级高于职业设置
 * <ZzyFBF NoActor: x1,x2,x3...>                                    //限定不可以使用这个加护的角色ID,可输入多个ID值 
 *
 * <ZzyFBF Condition: x>                           //限定是否可以使用这个加护的公式,返回值为true代表可以使用,返回值为false不可使用,此优先级最高
 *
 *
 *
 *
 *
 *可以在 数据库 角色 备注 中添加以下内容:
 * <ZzyFBF FieldBless: x(true/false)>                             //这将控制这个角色是否拥有加护的能力,优先级高于插件参数设置
 * <ZzyFBF MaxCount: x>                                           //这将设置角色的加护槽最多为x,x可以是一个公式,也可以输入Infinite代表无上限
 * <ZzyFBF CurrentCount: x>                                       //通过目前的角色属性,来获得当前的加护槽,这可以是一个公式
 *
 *
 *
 *
 *可以在 数据库 护甲 武器 技能 职业 角色 添加以下内容:
 * <ZzyFBF Count: x>                                              //这将对相关这个角色的当前加护槽开放更多,注意x可以是一个公式
 * <ZzyFBF MCount: x>                                             //这将对相关这个角色的最大加护槽开放的上限,注意x可以是一个公式
 *
 *
 *
 *
 *----------------------------------------------------------
 *
 *
 * 我叫坂本：v1.08 拓展脚本函数
 * 我叫坂本：v1.07 修复一个bug，导致了与YEP独立物品以及部分插件无法兼容的问题
 * 我叫坂本：v1.06 添加与旧存档兼容
 * 我叫坂本：v1.05 优化,减少不必要的指令
 * 我叫坂本：v1.04 添加呼叫界面的插件指令,添加技能界面出现加护选项
 * 我叫坂本：v1.03 修复读档时,拆卸领域异常的bug,添加额外便签设置
 * 我叫坂本：v1.02 修复无法增加经验值bug,添加额外便签设置
 * 我叫坂本：v1.01 更新了元素相关的便签信息,更新了对于公式中更多的变量
 * 我叫坂本：v1.00 完成插件功能
 *
 *----------------------------------------------------------
 *
 *

 * @param ---菜单---
 * @default
  
 * @param EnableMenu
 * @text 激活菜单项
 * @parent ---菜单---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 在菜单栏中'加护'是否是激活状态
 * YES - true     NO - false
 * @default true
  
 * @param InsertMenu
 * @text 添加菜单项
 * @parent ---菜单---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 在菜单栏中是否添加'加护'
 * YES - true     NO - false
 * @default true 
 
 * @param MenuCommandName
 * @text 主菜单显示名称
 * @parent ---菜单---
 * @type text
 * @desc 在主菜单上显示选项的名称，默认名称'加护'
 * @default 加护
 *
 *
 * @param ---技能菜单---
 * @default
 *
 * @param EnableSMenu
 * @text 激活角色技能菜单项
 * @parent ---技能菜单---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 在技能菜单栏中'加护'是否是激活状态
 * YES - true     NO - false
 * @default false
  
 * @param InsertSMenu
 * @text 添加角色技能菜单项
 * @parent ---技能菜单---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 在角色技能菜单栏中是否添加'加护'选项
 * YES - true     NO - false
 * @default false 
 
 * @param SMenuCommandName
 * @text 角色技能菜单显示名称
 * @parent ---技能菜单---
 * @type text
 * @desc 在角色技能菜单上显示选项的名称，默认名称'加护'
 * @default 加护
 *
 * @param ---帮助窗口---
 * @default
 *
 *
 * @param HelpWindowX
 * @text 帮助窗口x位置
 * @parent ---帮助窗口---
 * @type text
 * @desc 出现帮助窗口x的位置,这可以是一段代码
 * @default 0
 *
 * @param HelpWindowY
 * @text 帮助窗口y位置
 * @parent ---帮助窗口---
 * @type text
 * @desc 出现帮助窗口y的位置,这可以是一段代码
 * @default 0
 *
 * @param HelpWindowW
 * @text 帮助窗口宽度
 * @parent ---帮助窗口---
 * @type text
 * @desc 出现帮助窗口宽度,这可以是一段代码
 * @default Graphics.boxWidth
 *
 * @param HelpWindowH
 * @text 帮助窗口行数
 * @parent ---帮助窗口---
 * @type number
 * @desc 出现帮助窗口行数,这决定出现帮助窗口的高度
 * @default 2
 *
 *
 *
 * @param ---加护窗口---
 * @default
 *
 *
 * @param FieldWindowX
 * @text 加护窗口x位置
 * @parent ---加护窗口---
 * @type text
 * @desc 出现加护窗口x的位置,这可以是一段代码
 * @default 0
 *
 * @param FieldWindowY
 * @text 加护窗口y位置
 * @parent ---加护窗口---
 * @type text
 * @desc 出现加护窗口y的位置,这可以是一段代码
 * @default this._helpWindow.height
 *
 * @param FieldWindowW
 * @text 加护窗口宽度
 * @parent ---加护窗口---
 * @type text
 * @desc 出现加护窗口宽度,这可以是一段代码
 * @default Graphics.boxWidth / 3
 *
 * @param FieldWindowH
 * @text 加护窗口高度
 * @parent ---加护窗口---
 * @type text
 * @desc 出现加护窗口行数,这决定出现加护窗口的高度
 * @default Graphics.boxHeight - this._helpWindow.height
 *
 *
 * @param UnlockText
 * @text 未解锁文字
 * @parent ---加护窗口---
 * @type text
 * @desc 未解锁是出现的文字内容
 * @default ---未解锁---
 *
 *
 * @param MemoryText
 * @text 占用文字
 * @parent ---加护窗口---
 * @type text
 * @desc 未解锁是出现的文字内容
 * @default ---占用---
 *
 *
 *
 * @param UnlockTextColor
 * @text 未解锁文字颜色
 * @parent ---加护窗口---
 * @type text
 * @desc 未解锁是出现的文字颜色
 * @default #cc2222
 *
 *
 * @param MemoryTextColor
 * @text 占用文字颜色
 * @parent ---加护窗口---
 * @type text
 * @desc 加护占用超过1格时,显示的占用文字的颜色
 * @default #888888
 *
 *
 *
 * @param NoUnInstallColor
 * @text 不可拆卸顔色
 * @parent ---加护窗口---
 * @type text
 * @desc 不可拆卸的领域的文字颜色
 * @default #999999
 *
 * @param UnlockHelpText
 * @text 未解锁帮助文字
 * @parent ---加护窗口---
 * @type text
 * @desc 选中未解锁文字时出现的帮助文本
 * @default 封印中暂未解锁
 *
 * @param LockHelpText
 * @text 解锁帮助文字
 * @parent ---加护窗口---
 * @type text
 * @desc 选中解锁文字时出现的帮助文本
 * @default 可添加加护
 *
 * @param FieldRectColor
 * @text 底矩形框颜色
 * @parent ---加护窗口---
 * @type text
 * @desc 底色框的颜色可以用rgba(x,x,x,x)或是#xxxxxx的方式来设置颜色
 * @default rgba(30,30,90,0.4)
 *
 *
 *
 *
 *
 *
 *
 * @param ---加护道具窗口---
 * @default
 *
 *
 * @param FieldItemWindowX
 * @text 加护道具窗口x位置
 * @parent ---加护道具窗口---
 * @type text
 * @desc 出现加护道具窗口x的位置,这可以是一段代码
 * @default Graphics.boxWidth / 3
 *
 * @param FieldItemWindowY
 * @text 加护道具窗口y位置
 * @parent ---加护道具窗口---
 * @type text
 * @desc 出现加护道具窗口y的位置,这可以是一段代码
 * @default this._helpWindow.height
 *
 * @param FieldItemWindowW
 * @text 加护道具窗口宽度
 * @parent ---加护道具窗口---
 * @type text
 * @desc 出现加护道具窗口宽度,这可以是一段代码
 * @default Graphics.boxWidth * 2 / 3
 *
 * @param FieldItemWindowH
 * @text 加护道具窗口高度
 * @parent ---加护道具窗口---
 * @type text
 * @desc 出现加护道具窗口行数,这决定出现加护道具窗口的高度
 * @default Graphics.boxHeight - this._helpWindow.height
 *
 *
 *
 *
 * @param ---数据信息---
 * @default
 *
 *
 * @param EnableActorFB
 * @text 角色是否具备加护
 * @parent ---数据信息---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 设置角色是否默认具有加护能力
 * YES - true     NO - false
 * @default true
 *
 *
 * @param MaxFieldCount
 * @text 最大加护槽数量
 * @parent ---数据信息---
 * @type text
 * @desc 默认拥有的最大槽数量,请输入公式或是Infinite(无限),默认值为Infinite
 * @default Infinite
 *
 * @param CurrentFieldCount
 * @text 目前加护槽数量
 * @parent ---数据信息---
 * @type text
 * @desc 角色通过自身属性,获取的目前加护槽的数量,这可以是一个公式
 * @default Math.max(1,Math.min(Math.round(level/2),30));
 *
 * @param MemoryCount
 * @text 占用量
 * @parent ---数据信息---
 * @type number
 * @desc 这是加护道具占用的卡槽数量,输入整数,默认值为1
 * @default 1
 *
 *
 *
 *
 *
 *
 * @param ---音效---
 * @default
 *
 *
 * @param NoFieldSound
 * @text 不存在加护音效
 * @parent ---音效---
 * @dir audio/se
 * @type file
 * @desc 不存在加护产生的声音,请填写audio/se文件夹中的文件名,不包含m4a.ogg的后缀名
 * @default Cancel2
 *
 * @param NoFieldVolume
 * @text 不存在加护音量
 * @parent ---音效---
 * @type number
 * @min 0
 * @desc 不存在加护产生的音量,默认值100
 * @default 100
 *
 * @param NoFieldPitch
 * @text 不存在加护音调
 * @parent ---音效---
 * @type number
 * @min 0
 * @desc 不存在加护产生的音调,默认值100
 * @default 100
 *
 * @param NoFieldPan
 * @text 不存在加护声道
 * @parent ---音效---
 * @type number
 * @desc 不存在加护产生的声道,默认值0
 * @default 0
 *
 *
 * @param UnableSound
 * @text 无法卸载加护音效
 * @parent ---音效---
 * @dir audio/se
 * @type file
 * @desc 无法卸载加护产生的声音,请填写audio/se文件夹中的文件名,不包含m4a.ogg的后缀名
 * @default Knock
 *
 * @param UnableVolume
 * @text 无法卸载加护音量
 * @parent ---音效---
 * @type number
 * @min 0
 * @desc 无法卸载加护产生的音量,默认值100
 * @default 100
 *
 * @param UnablePitch
 * @text 无法卸载加护音调
 * @parent ---音效---
 * @type number
 * @min 0
 * @desc 无法卸载加护产生的音调,默认值100
 * @default 100
 *
 * @param UnablePan
 * @text 无法卸载加护声道
 * @parent ---音效---
 * @type number
 * @desc 无法卸载加护产生的声道,默认值0
 * @default 0
 *
 *
 *
 * @param NoInstallSound
 * @text 无法安装加护音效
 * @parent ---音效---
 * @dir audio/se
 * @type file
 * @desc 无法安装加护产生的声音,请填写audio/se文件夹中的文件名,不包含m4a.ogg的后缀名
 * @default Buzzer1
 *
 * @param NoInstallVolume
 * @text 无法安装加护音量
 * @parent ---音效---
 * @type number
 * @min 0
 * @desc 无法安装加护产生的音量,默认值100
 * @default 100
 *
 * @param NoInstallPitch
 * @text 无法安装加护音调
 * @parent ---音效---
 * @type number
 * @min 0
 * @desc 无法安装加护产生的音调,默认值100
 * @default 100
 *
 * @param NoInstallPan
 * @text 无法安装加护声道
 * @parent ---音效---
 * @type number
 * @desc 无法安装加护产生的声道,默认值0
 * @default 0
 *
 *
 * @param InSuccessSound
 * @text 安装成功加护音效
 * @parent ---音效---
 * @dir audio/se
 * @type file
 * @desc 安装成功加护产生的声音,请填写audio/se文件夹中的文件名,不包含m4a.ogg的后缀名
 * @default Equip1
 *
 * @param InSuccessVolume
 * @text 安装成功加护音量
 * @parent ---音效---
 * @type number
 * @min 0
 * @desc 安装成功加护产生的音量,默认值100
 * @default 100
 *
 * @param InSuccessPitch
 * @text 安装成功加护音调
 * @parent ---音效---
 * @type number
 * @min 0
 * @desc 安装成功加护产生的音调,默认值100
 * @default 100
 *
 * @param InSuccessPan
 * @text 安装成功加护声道
 * @parent ---音效---
 * @type number
 * @desc 安装成功加护产生的声道,默认值0
 * @default 0
 *
 *
 * @param UnSuccessSound
 * @text 卸载成功加护音效
 * @parent ---音效---
 * @dir audio/se
 * @type file
 * @desc 卸载成功加护产生的声音,请填写audio/se文件夹中的文件名,不包含m4a.ogg的后缀名
 * @default Equip2
 *
 * @param UnSuccessVolume
 * @text 卸载成功加护音量
 * @parent ---音效---
 * @type number
 * @min 0
 * @desc 卸载成功加护产生的音量,默认值100
 * @default 100
 *
 * @param UnSuccessPitch
 * @text 卸载成功加护音调
 * @parent ---音效---
 * @type number
 * @min 0
 * @desc 卸载成功加护产生的音调,默认值100
 * @default 100
 *
 * @param UnSuccessPan
 * @text 卸载成功加护声道
 * @parent ---音效---
 * @type number
 * @desc 卸载成功加护产生的声道,默认值0
 * @default 0
 *
 */

var LiuYue = LiuYue || {};
LiuYue.LiuYue_FieldBless = true; //插件启动

var Zzy = Zzy || {};
Zzy.FBF = Zzy.FBF || {};
Zzy.FBF.version = 1.08;
Zzy.Parameters = PluginManager.parameters("LiuYue_FieldBless");
Zzy.Param = Zzy.Param || {};

Zzy.Param.FBFEnableMenu = eval(String(Zzy.Parameters["EnableMenu"]));
Zzy.Param.FBFInsertMenu = eval(String(Zzy.Parameters["InsertMenu"]));
Zzy.Param.FBFMenuCommandName = String(Zzy.Parameters["MenuCommandName"]);

Zzy.Param.FBFEnableSMenu = eval(String(Zzy.Parameters["EnableSMenu"]));
Zzy.Param.FBFInsertSMenu = eval(String(Zzy.Parameters["InsertSMenu"]));
Zzy.Param.FBFSMenuCommandName = String(Zzy.Parameters["SMenuCommandName"]);

Zzy.Param.FBFHelpWindowX = String(Zzy.Parameters["HelpWindowX"]); //帮助窗口x位置
Zzy.Param.FBFHelpWindowY = String(Zzy.Parameters["HelpWindowY"]); //帮助窗口y位置
Zzy.Param.FBFHelpWindowW = String(Zzy.Parameters["HelpWindowW"]); //帮助窗口宽度
Zzy.Param.FBFHelpWindowH = parseInt(Zzy.Parameters["HelpWindowH"]); //帮助窗口行数

Zzy.Param.FBFFieldWindowX = String(Zzy.Parameters["FieldWindowX"]); //加护窗口x位置
Zzy.Param.FBFFieldWindowY = String(Zzy.Parameters["FieldWindowY"]); //加护窗口y位置
Zzy.Param.FBFFieldWindowW = String(Zzy.Parameters["FieldWindowW"]); //加护窗口宽度
Zzy.Param.FBFFieldWindowH = String(Zzy.Parameters["FieldWindowH"]); //加护窗口高度

Zzy.Param.FBFFieldItemWindowX = String(Zzy.Parameters["FieldItemWindowX"]); //加护道具窗口x位置
Zzy.Param.FBFFieldItemWindowY = String(Zzy.Parameters["FieldItemWindowY"]); //加护道具窗口y位置
Zzy.Param.FBFFieldItemWindowW = String(Zzy.Parameters["FieldItemWindowW"]); //加护道具窗口宽度
Zzy.Param.FBFFieldItemWindowH = String(Zzy.Parameters["FieldItemWindowH"]); //加护道具窗口高度

Zzy.Param.FBFUnlockText = String(Zzy.Parameters["UnlockText"]); //未解锁文字
Zzy.Param.FBFUnlockTextColor = String(Zzy.Parameters["UnlockTextColor"]); //未解锁文字颜色
Zzy.Param.FBFMemoryText = String(Zzy.Parameters["MemoryText"]); //占用文字
Zzy.Param.FBFMemoryTextColor = String(Zzy.Parameters["MemoryTextColor"]); //占用文字颜色
Zzy.Param.FBFNoUnInstallColor = String(Zzy.Parameters["NoUnInstallColor"]); //不可拆卸的领域的文字颜色

Zzy.Param.FBFUnlockHelpText = String(Zzy.Parameters["UnlockHelpText"]); //未解锁帮助文字
Zzy.Param.FBFLockHelpText = String(Zzy.Parameters["LockHelpText"]); //解锁帮助文字
Zzy.Param.FBFFieldRectColor = String(Zzy.Parameters["FieldRectColor"]); //底矩形框颜色

Zzy.Param.FBFEnableActorFB = eval(String(Zzy.Parameters["EnableActorFB"])); //角色是否具备加护
Zzy.Param.FBFMaxFieldCount = String(Zzy.Parameters["MaxFieldCount"]); //最大加护槽数量
Zzy.Param.FBFCurrentFieldCount = String(Zzy.Parameters["CurrentFieldCount"]); //目前加护槽数量

Zzy.Param.FBFMemoryCount = parseInt(Zzy.Parameters["MemoryCount"]); //帮助窗口行数

//----------------------------------------------------声音----------------------------------------------------------

Zzy.FBF.MakeSE = function (seName, seVolume, sePitch, sePan) {
    if (!seName) return undefined;
    var se = {
        name: seName,
        volume: seVolume ? seVolume : 100,
        pitch: sePitch ? sePitch : 100,
        pan: sePan ? sePan : 0,
    };
    return se;
};

//SE
Zzy.Param.FBFNoFieldSound = String(Zzy.Parameters["NoFieldSound"]); //FBF音效
Zzy.Param.FBFNoFieldVolume = parseInt(Zzy.Parameters["NoFieldVolume"]); //FBF音量
Zzy.Param.FBFNoFieldPitch = parseInt(Zzy.Parameters["NoFieldPitch"]); //FBF音调
Zzy.Param.FBFNoFieldPan = parseInt(Zzy.Parameters["NoFieldPan"]); //FBF声道
Zzy.Param.FBFNoFieldSE = Zzy.FBF.MakeSE(
    Zzy.Param.FBFNoFieldSound,
    Zzy.Param.FBFNoFieldVolume,
    Zzy.Param.FBFNoFieldPitch,
    Zzy.Param.FBFNoFieldPan
);

Zzy.Param.FBFUnableSound = String(Zzy.Parameters["UnableSound"]); //FBF音效
Zzy.Param.FBFUnableVolume = parseInt(Zzy.Parameters["UnableVolume"]); //FBF音量
Zzy.Param.FBFUnablePitch = parseInt(Zzy.Parameters["UnablePitch"]); //FBF音调
Zzy.Param.FBFUnablePan = parseInt(Zzy.Parameters["UnablePan"]); //FBF声道
Zzy.Param.FBFUnableSE = Zzy.FBF.MakeSE(
    Zzy.Param.FBFUnableSound,
    Zzy.Param.FBFUnableVolume,
    Zzy.Param.FBFUnablePitch,
    Zzy.Param.FBFUnablePan
);

Zzy.Param.FBFNoInstallSound = String(Zzy.Parameters["NoInstallSound"]); //FBF音效
Zzy.Param.FBFNoInstallVolume = parseInt(Zzy.Parameters["NoInstallVolume"]); //FBF音量
Zzy.Param.FBFNoInstallPitch = parseInt(Zzy.Parameters["NoInstallPitch"]); //FBF音调
Zzy.Param.FBFNoInstallPan = parseInt(Zzy.Parameters["NoInstallPan"]); //FBF声道
Zzy.Param.FBFNoInstallSE = Zzy.FBF.MakeSE(
    Zzy.Param.FBFNoInstallSound,
    Zzy.Param.FBFNoInstallVolume,
    Zzy.Param.FBFNoInstallPitch,
    Zzy.Param.FBFNoInstallPan
);

Zzy.Param.FBFInSuccessSound = String(Zzy.Parameters["InSuccessSound"]); //FBF音效
Zzy.Param.FBFInSuccessVolume = parseInt(Zzy.Parameters["InSuccessVolume"]); //FBF音量
Zzy.Param.FBFInSuccessPitch = parseInt(Zzy.Parameters["InSuccessPitch"]); //FBF音调
Zzy.Param.FBFInSuccessPan = parseInt(Zzy.Parameters["InSuccessPan"]); //FBF声道
Zzy.Param.FBFInSuccessSE = Zzy.FBF.MakeSE(
    Zzy.Param.FBFInSuccessSound,
    Zzy.Param.FBFInSuccessVolume,
    Zzy.Param.FBFInSuccessPitch,
    Zzy.Param.FBFInSuccessPan
);

Zzy.Param.FBFUnSuccessSound = String(Zzy.Parameters["UnSuccessSound"]); //FBF音效
Zzy.Param.FBFUnSuccessVolume = parseInt(Zzy.Parameters["UnSuccessVolume"]); //FBF音量
Zzy.Param.FBFUnSuccessPitch = parseInt(Zzy.Parameters["UnSuccessPitch"]); //FBF音调
Zzy.Param.FBFUnSuccessPan = parseInt(Zzy.Parameters["UnSuccessPan"]); //FBF声道
Zzy.Param.FBFUnSuccessSE = Zzy.FBF.MakeSE(
    Zzy.Param.FBFUnSuccessSound,
    Zzy.Param.FBFUnSuccessVolume,
    Zzy.Param.FBFUnSuccessPitch,
    Zzy.Param.FBFUnSuccessPan
);

Zzy.Param.FBFAllSE = [];
Zzy.Param.FBFAllSE = [
    undefined,
    Zzy.Param.FBFNoFieldSE,
    Zzy.Param.FBFUnableSE,
    Zzy.Param.FBFNoInstallSE,
    Zzy.Param.FBFInSuccessSE,
    Zzy.Param.FBFUnSuccessSE,
];

//=============================================================================
//Game_System_initialize
//=============================================================================

Zzy.FBF.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function () {
    Zzy.FBF.Game_System_initialize.call(this);
    this.ZzyFBFInitData(); //初始化数据
    this.ZzyFBFSetData(); //设置数据
};

Game_System.prototype.ZzyFBFInitData = function () {
    this._ZzyFBFEnableMenu = Zzy.Param.FBFEnableMenu;
    this._ZzyFBFInsertMenu = Zzy.Param.FBFInsertMenu;
    this._ZzyFBFMenuCommandName = Zzy.Param.FBFMenuCommandName;

    this._ZzyFBFEnableSMenu = Zzy.Param.FBFEnableSMenu;
    this._ZzyFBFInsertSMenu = Zzy.Param.FBFInsertSMenu;
    this._ZzyFBFSMenuCommandName = Zzy.Param.FBFSMenuCommandName;

    this._ZzyFBFEnableActorFB = Zzy.Param.FBFEnableActorFB; //角色是否具备加护
    this._ZzyFBFMaxFieldCount = Zzy.Param.FBFMaxFieldCount; //最大加护槽数量
    this._ZzyFBFCurrentFieldCount = Zzy.Param.FBFCurrentFieldCount; //目前加护槽数量
    this._ZzyFBFMemoryCount = Zzy.Param.FBFMemoryCount; //占用量

    this._ZzyFBFFieldItemIdArr = []; //存在的加护
    this._ZzyFBFActorsUseArr = []; //使用中的加护
    this._ZzyFBFSelectActorIndex = 0; //选择角色的下标
    this._ZzyFBFActorsMaxCountArr = []; //角色未使用容量计数
};

Game_System.prototype.GetZzyFBFEnableMenu = function () {
    if (this._ZzyFBFEnableMenu === undefined) {
        this._ZzyFBFEnableMenu = Zzy.Param.FBFEnableMenu;
    }
    return this._ZzyFBFEnableMenu;
};

Game_System.prototype.SetZzyFBFEnableMenu = function (value) {
    this._ZzyFBFEnableMenu = value;
};

Game_System.prototype.GetZzyFBFInsertMenu = function () {
    if (this._ZzyFBFInsertMenu === undefined) {
        this._ZzyFBFInsertMenu = Zzy.Param.FBFInsertMenu;
    }
    return this._ZzyFBFInsertMenu;
};

Game_System.prototype.SetZzyFBFInsertMenu = function (value) {
    this._ZzyFBFInsertMenu = value;
};

Game_System.prototype.GetZzyFBFMenuCommandName = function () {
    if (this._ZzyFBFMenuCommandName === undefined) {
        this._ZzyFBFMenuCommandName = Zzy.Param.FBFMenuCommandName;
    }
    return this._ZzyFBFMenuCommandName;
};

Game_System.prototype.SetZzyFBFMenuCommandName = function (value) {
    this._ZzyFBFMenuCommandName = value;
};

Game_System.prototype.GetZzyFBFEnableSMenu = function () {
    if (this._ZzyFBFEnableSMenu === undefined) {
        this._ZzyFBFEnableSMenu = Zzy.Param.FBFEnableSMenu;
    }
    return this._ZzyFBFEnableSMenu;
};

Game_System.prototype.SetZzyFBFEnableSMenu = function (value) {
    this._ZzyFBFEnableSMenu = value;
};

Game_System.prototype.GetZzyFBFInsertSMenu = function () {
    if (this._ZzyFBFInsertSMenu === undefined) {
        this._ZzyFBFInsertSMenu = Zzy.Param.FBFInsertSMenu;
    }
    return this._ZzyFBFInsertSMenu;
};

Game_System.prototype.SetZzyFBFInsertSMenu = function (value) {
    this._ZzyFBFInsertSMenu = value;
};

Game_System.prototype.GetZzyFBFSMenuCommandName = function () {
    if (this._ZzyFBFSMenuCommandName === undefined) {
        this._ZzyFBFSMenuCommandName = Zzy.Param.FBFSMenuCommandName;
    }
    return this._ZzyFBFSMenuCommandName;
};

Game_System.prototype.SetZzyFBFSMenuCommandName = function (value) {
    this._ZzyFBFSMenuCommandName = value;
};

Game_System.prototype.GetZzyFBFEnableActorFB = function () {
    if (this._ZzyFBFEnableActorFB === undefined) {
        this._ZzyFBFEnableActorFB = Zzy.Param.FBFEnableActorFB;
    }
    return this._ZzyFBFEnableActorFB;
};

Game_System.prototype.SetZzyFBFEnableActorFB = function (value) {
    this._ZzyFBFEnableActorFB = value;
};

Game_System.prototype.GetZzyFBFMaxFieldCount = function () {
    if (this._ZzyFBFMaxFieldCount === undefined) {
        this._ZzyFBFMaxFieldCount = Zzy.Param.FBFMaxFieldCount;
    }
    return this._ZzyFBFMaxFieldCount;
};

Game_System.prototype.SetZzyFBFMaxFieldCount = function (value) {
    this._ZzyFBFMaxFieldCount = value;
};

Game_System.prototype.GetZzyFBFCurrentFieldCount = function () {
    if (this._ZzyFBFCurrentFieldCount === undefined) {
        this._ZzyFBFCurrentFieldCount = Zzy.Param.FBFCurrentFieldCount;
    }
    return this._ZzyFBFCurrentFieldCount;
};

Game_System.prototype.SetZzyFBFCurrentFieldCount = function (value) {
    this._ZzyFBFCurrentFieldCount = value;
};

Game_System.prototype.GetZzyFBFMemoryCount = function () {
    if (this._ZzyFBFMemoryCount === undefined) {
        this._ZzyFBFMemoryCount = Zzy.Param.FBFMemoryCount;
    }
    return this._ZzyFBFMemoryCount;
};

Game_System.prototype.SetZzyFBFMemoryCount = function (value) {
    this._ZzyFBFMemoryCount = value;
};

Game_System.prototype.GetZzyFBFFieldItemIdArr = function () {
    if (this._ZzyFBFFieldItemIdArr === undefined) {
        this._ZzyFBFFieldItemIdArr = [];
        this.ZzyFBFSetData(); //设置初始化的数据信息
    }
    return this._ZzyFBFFieldItemIdArr;
};

Game_System.prototype.GetZzyFBFActorsUseArr = function () {
    if (this._ZzyFBFActorsUseArr === undefined) {
        this._ZzyFBFActorsUseArr = [];
    }
    return this._ZzyFBFActorsUseArr;
};

Game_System.prototype.GetZzyFBFSelectActorIndex = function () {
    if (this._ZzyFBFSelectActorIndex === undefined) {
        this._ZzyFBFSelectActorIndex = 0;
    }
    return this._ZzyFBFSelectActorIndex;
};

Game_System.prototype.SetZzyFBFSelectActorIndex = function (value) {
    this._ZzyFBFSelectActorIndex = value;
};

Game_System.prototype.GetZzyFBFActorsMaxCountArr = function () {
    if (this._ZzyFBFActorsMaxCountArr === undefined) {
        this._ZzyFBFActorsMaxCountArr = [];
    }
    return this._ZzyFBFActorsMaxCountArr;
};

Game_System.prototype.SetZzyFBFActorsMaxCountArr = function (actorId, count) {
    this.GetZzyFBFActorsMaxCountArr()[actorId] = count;
};

Game_System.prototype.getZzyFBFActorsMaxCountArr = function (actorId) {
    var arr = this.GetZzyFBFActorsMaxCountArr();
    return arr[actorId];
};

Game_System.prototype.GetZzyFBFActorUseArr = function (
    actorId //角色的加护
) {
    if (!this.GetZzyFBFActorsUseArr()[actorId]) {
        this._ZzyFBFActorsUseArr[actorId] = [];
    }
    return this._ZzyFBFActorsUseArr[actorId];
};

Game_System.prototype.GetZzyFBFActorFieldUseArr = function (
    actorId //返回包括卡牌在内的存在值
) {
    var arr = this.GetZzyFBFActorUseArr(actorId);
    var reArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i]) {
            var item = $dataItems[arr[i]];

            reArr.push(item);
        }
    }
    return reArr;
};

Game_System.prototype.UpdateZzyFBFActorUseArr = function (
    actorId //更新角色的加护
) {
    var surplusArr = [];
    surplusArr = this.KeepZzyFBFCurrentMax(actorId); //超标卸载
    //重新放回背包中
    if (surplusArr && surplusArr.length) {
        for (var i = 0; i < surplusArr.length; i++) {
            $gameParty.gainItem(surplusArr[i], 1); //存储
        }
    }
};

Game_System.prototype.UpdateAllZzyFBFActorUseArr = function () //更新全部的角色加护
{
    var arr = $gameParty._actors;

    for (var i = 0; i < arr.length; i++) {
        this.UpdateZzyFBFActorUseArr(arr[i]);
    }
};

Game_System.prototype.KeepZzyFBFCurrentMax = function (
    actorId //保持小于最大长度
) {
    var tMax = this.GetZzyFBFActorFinalMaxCount(actorId);
    if (tMax === -1) return undefined;

    //计算目前卡片是否有超越
    var surplusArr = [];
    var fArr = this.GetZzyFBFActorUseArr(actorId);
    var len = fArr.length;
    if (len > tMax) {
        //超过位数
        //在位数位置向前遍历并t掉内容
        var len2 = tMax - 1;

        for (var i = len2; i >= 0; i--) {
            if (fArr[i]) {
                //并非undefined null false
                var item = $dataItems[fArr[i]];
                var count = this.GetZzyFBFFieldBlessMemory(item); //获取占用量
                if (count > tMax - i) {
                    //超过了占用量
                    surplusArr.push(this.UninstallZzyFBFField(fArr, i)); //卸载
                }
            }
        }
    }

    for (var i = tMax; i <= len - 1; i++) {
        if (fArr[i]) {
            surplusArr.push(this.UninstallZzyFBFField(fArr, i)); //卸载
        }
    }
    return surplusArr;
};

Game_System.prototype.UninstallZzyFBFField = function (
    arr,
    index //卸载指定下标
) {
    if (arr[index] === undefined || arr[index] === null || arr[index] === false || arr[index] === 0) {
        return;
    }

    var item = $dataItems[arr[index]];
    var count = this.GetZzyFBFFieldBlessMemory(item);

    for (var i = 0; i < count; i++) {
        arr[i + index] = undefined;
    }
    return item;
};

Game_System.prototype.ZzyFBFSetData = function () {
    var len = $dataItems.length;
    for (var i = 0; i < len; i++) {
        var item = $dataItems[i];

        if (item && item.zzyFBF && item.zzyFBF.enable) {
            this.PushZzyFBFFieldArr(item.id);
        }
    }
};

Game_System.prototype.PushZzyFBFFieldArr = function (itemId) {
    this.GetZzyFBFFieldItemIdArr().push(itemId);
};

Game_System.prototype.IsZzyFBFActorHaveFieldBless = function (
    actorId //通过角色ID返回角色是否具备加护能力
) {
    //判断角色是否拥有加护能力
    var data = $dataActors[actorId];
    if (data && data.zzyFBF) {
        if (data.zzyFBF.enable === true) {
            return true;
        } else if (data.zzyFBF.enable === false) {
            return false;
        }
    }
    return this.GetZzyFBFEnableActorFB();
};

Game_System.prototype.GetZzyFBFActorMaxCount = function (
    actorId //通过角色ID返回角色最大领域数量
) {
    var data = $dataActors[actorId];
    var maxCount = 0;
    if (data && data.zzyFBF) {
        if (data.zzyFBF.maxCount) {
            if (data.zzyFBF.maxCount === "Infinite") return -1;

            var actor = $gameActors.actor(actorId);
            maxCount = this.EvalZzyFBFFormula1(data.zzyFBF.maxCount, actor);
            maxCount = Zzy.FBF.KeepNumber(maxCount);
            return maxCount;
        }
    }

    var fieldCount = this.GetZzyFBFMaxFieldCount();

    if (fieldCount === "Infinite") {
        return -1;
    } //无限标记

    maxCount = this.EvalZzyFBFFormula1(fieldCount, undefined);
    maxCount = Zzy.FBF.KeepNumber(maxCount);
    return maxCount;
};

Game_System.prototype.GetZzyFBFActorFinalMaxCount = function (
    actorId //计算最终值-最大加护槽
) {
    var tempMaxCount = this.GetZzyFBFActorMaxCount(actorId);
    if (tempMaxCount === -1) return tempMaxCount;

    var actorData = $dataActors[actorId];
    var actor = $gameActors.actor(actorId);

    var actors = actorData; //角色加层
    var classs = $dataClasses[actors.classId]; //职业加层
    var equipsArr = actor.equips(); //武器,护甲加层
    var skillsArr = actor.skills(); //技能加层
    var tArr = [[actors], [classs], equipsArr, skillsArr];
    var totalMax = 0;
    for (var i = 0; i < tArr.length; i++) {
        totalMax += this.ZzyFBFCalculationMaxCount(tArr[i], actorId);
    }
    var result = Math.max(0, totalMax + tempMaxCount); //防止小于0

    return result;
};

Game_System.prototype.GetZzyFBFActorFinalCurrentCount = function (
    actorId //计算最终值-开启的加护槽
) {
    var tempCurrentCount = this.GetZzyFBFActorCurrentCount(actorId); //本身
    var maxCount = this.GetZzyFBFActorFinalMaxCount(actorId);

    var actorData = $dataActors[actorId];
    var actor = $gameActors.actor(actorId);

    var actors = actorData; //角色加层
    var classs = $dataClasses[actors.classId]; //职业加层
    var equipsArr = actor.equips(); //武器,护甲加层
    var skillsArr = actor.skills(); //技能加层
    var tArr = [[actors], [classs], equipsArr, skillsArr];
    var extraCount = 0;
    for (var i = 0; i < tArr.length; i++) {
        extraCount += this.ZzyFBFCalculationCurrentCount(tArr[i], actorId);
    }
    var result = 0;
    if (maxCount === -1) {
        result = Math.max(0, tempCurrentCount + extraCount);
        this.SetZzyFBFActorsMaxCountArr(actorId, result);
        return result;
    }
    result = Math.min(maxCount, Math.max(0, tempCurrentCount + extraCount));
    this.SetZzyFBFActorsMaxCountArr(actorId, result);
    return result;
};

Game_System.prototype.ZzyFBFCalculationCurrentCount = function (arr, actorId) {
    var len = arr.length;
    var totalValue = 0;
    var actor = $gameActors.actor(actorId);
    var count = 0;
    for (var i = 0; i < len; i++) {
        if (arr[i] && arr[i].zzyFBF) {
            if (arr[i].zzyFBF.eCount) {
                count = this.EvalZzyFBFFormula1(arr[i].zzyFBF.eCount, actor);

                totalValue += Zzy.FBF.KeepNumber(count);
            }
        }
    }
    return totalValue;
};

Game_System.prototype.ZzyFBFCalculationMaxCount = function (arr, actorId) {
    var len = arr.length;
    var totalValue = 0;
    var actor = $gameActors.actor(actorId);
    var count = 0;
    for (var i = 0; i < len; i++) {
        if (arr[i] && arr[i].zzyFBF) {
            if (arr[i].zzyFBF.emCount) {
                count = this.EvalZzyFBFFormula1(arr[i].zzyFBF.emCount, actor);

                totalValue += Zzy.FBF.KeepNumber(count);
            }
        }
    }
    return totalValue;
};

Game_System.prototype.GetZzyFBFActorCurrentCount = function (
    actorId //通过角色ID返回角色目前领域数量
) {
    var data = $dataActors[actorId];
    var actor = $gameActors.actor(actorId);

    //首先获取最大领域
    var maxCount = this.GetZzyFBFActorFinalMaxCount(actorId);
    var count = 0;
    if (data && data.zzyFBF) {
        if (data.zzyFBF.currentCount) {
            count = this.EvalZzyFBFFormula1(data.zzyFBF.maxCount, actor);
            count = Zzy.FBF.KeepNumber(count);
            if (maxCount !== 1) {
                count = count > maxCount ? maxCount : count;
            }
            return count;
        }
    }

    count = this.EvalZzyFBFFormula1(this.GetZzyFBFCurrentFieldCount(), actor);
    count = Zzy.FBF.KeepNumber(count);
    if (maxCount !== -1) {
        count = count > maxCount ? maxCount : count;
    }
    return count;
};

Game_System.prototype.EvalZzyFBFFormula1 = function (
    formula,
    infor,
    infor2 //转换
) {
    var actor = infor; //角色
    var a = actor;
    var target = infor2 ? infor2 : undefined; //目标
    var b = target;
    var variables = $gameVariables._data; //全局变量
    var switchs = $gameSwitches._data; //全局开关

    var v = variables;
    var V = variables;
    var s = switchs;
    var S = switchs;

    var level = actor ? actor.level : undefined; //等级
    var usecount = actor ? this.ZzyFBFUseFieldCount(actor.actorId()) : undefined;
    var nullcount = actor ? this.ZzyFBFNullFieldCount(actor.actorId()) : undefined;
    return eval(formula);
};

Game_System.prototype.GetZzyFBFFieldBlessMemory = function (
    item //返回对应的占用量
) {
    if (item && item.zzyFBF) {
        if (item.zzyFBF.memory !== undefined) {
            return item.zzyFBF.memory;
        }
    }
    return this.GetZzyFBFMemoryCount();
};

Game_System.prototype.GetZzyFBFFieldBlessNoInstall = function (item) {
    if (item && item.zzyFBF) {
        if (item.zzyFBF.noInstall) {
            return true;
        }
    }
    return false;
};

Game_System.prototype.EnableZzyFBFFieldOfActor = function (
    actorId,
    item //判断是否对这个角色有效
) {
    if (item && item.zzyFBF) {
        var actor = $gameActors.actor(actorId);
        var classId = actor._classId;
        if (item.zzyFBF.canUseEval) {
            return this.EvalZzyFBFFormula1(item.zzyFBF.canUseEval, actor);
        }

        //判断角色包含名单
        if (item.zzyFBF.canUseA) {
            if (item.zzyFBF.canUseA.contains(actorId)) {
                return true;
            } else {
                return false;
            }
        }

        if (item.zzyFBF.noCanUseA) {
            if (item.zzyFBF.noCanUseA.contains(actorId)) {
                return false;
            } else {
                return true;
            }
        }

        //判断职业包含名单
        if (item.zzyFBF.canUseC) {
            if (item.zzyFBF.canUseC.contains(classId)) {
                return true;
            } else {
                return false;
            }
        }

        if (item.zzyFBF.noCanUseC) {
            if (item.zzyFBF.noCanUseC.contains(classId)) {
                return false;
            } else {
                return true;
            }
        }

        return true;
    }
    return false;
};

Game_System.prototype.InstallZzyFBFField = function (
    actorId,
    index,
    item //安装加护
) {
    var actArr = this.GetZzyFBFActorUseArr(actorId);
    var memory = this.GetZzyFBFFieldBlessMemory(item);

    actArr[index] = item.id;
    if (memory > 1) {
        for (var i = 1; i < memory; i++) {
            actArr[index + i] = false;
        }
    }
};

Game_System.prototype.UnInstallZzyFBFField = function (
    actorId,
    index //卸载加护
) {
    var actArr = this.GetZzyFBFActorUseArr(actorId);
    var item = $dataItems[actArr[index]];
    var memory = this.GetZzyFBFFieldBlessMemory(item);
    actArr[index] = undefined;
    if (memory > 1) {
        for (var i = 1; i < memory; i++) {
            actArr[index + i] = undefined;
        }
    }
};

Game_System.prototype.ZzyFBFForceUnInstallAll = function (
    actorId //强制卸载所有加护
) {
    var items = this.GetZzyFBFActorFieldUseArr(actorId);

    for (var i = 0; i < items.length; i++) {
        var item = items[i];

        $gameParty.gainItem(item, 1);
    }

    var sarr = this.GetZzyFBFActorUseArr(actorId);
    for (var i = 0; i < sarr.length; i++) {
        if (sarr[i] || sarr[i] === false) {
            sarr[i] = undefined;
        }
    }
};

Game_System.prototype.ZzyFBFUseFieldCount = function (
    actorId //使用中槽数量
) {
    var items = this.GetZzyFBFActorFieldUseArr(actorId);
    var len = items.length;
    var count = 0;

    for (var i = 0; i < len; i++) {
        if (items[i]) {
            var memory = this.GetZzyFBFFieldBlessMemory(items[i]);
            count += memory;
        }
    }
    return count;
};

Game_System.prototype.ZzyFBFNullFieldCount = function (
    actorId //未使用中槽数量
) {
    var useCount = this.ZzyFBFUseFieldCount(actorId);
    var maxCount = this.getZzyFBFActorsMaxCountArr(actorId);
    maxCount = maxCount ? maxCount : 0;
    var count = maxCount - useCount;
    count = count > 0 ? count : 0;
    return count;
};

//=============================================================================
//Game_Interpreter
//=============================================================================
Zzy.FBF.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (
    command,
    args //插件命令
) {
    Zzy.FBF.Game_Interpreter_pluginCommand.call(this, command, args);

    if (command === "ZzyFBF") {
        this.ZzyFBFCommand(args);
    }
};

Game_Interpreter.prototype.ZzyFBFCommand = function (
    args //命令大全
) {
    var command = String(args[0]);

    switch (command) {
        case "EnableMenu":
            var enable = eval(String(args[1]));
            Zzy.FBF.EnableMenu(enable);

            //$gameSystem.SetZzyFBFEnableMenu(enable);
            break;

        case "InsertMenu":
            var enable = eval(String(args[1]));
            Zzy.FBF.InsertMenu(enable);

            //$gameSystem.SetZzyFBFInsertMenu(enable);
            break;

        case "CommandName":
            var commandText = String(args[1]);
            Zzy.FBF.CommandName(commandText);

            //$gameSystem.SetZzyFBFMenuCommandName(commandText);
            break;

        case "EnableSMenu":
            var enable = eval(String(args[1]));
            Zzy.FBF.EnableSMenu(enable);

            //$gameSystem.SetZzyFBFEnableSMenu(enable);
            break;

        case "InsertSMenu":
            var enable = eval(String(args[1]));
            Zzy.FBF.InsertSMenu(enable);

            //$gameSystem.SetZzyFBFInsertSMenu(enable);
            break;

        case "SCommandName":
            var commandText = String(args[1]);
            Zzy.FBF.SCommandName(commandText);

            //$gameSystem.SetZzyFBFSMenuCommandName(commandText);
            break;

        case "OpenActor":
            var actorId = parseInt(args[1]);
            Zzy.FBF.OpenActor(actorId);

            //Zzy.FBF.OpenFieldOfActor(actorId);
            break;

        case "OpenParty":
            var index = parseInt(args[1]);
            Zzy.FBF.OpenParty(index);

            //Zzy.FBF.OpenFieldOfParty(index);
            break;

        case "EnableActorFB":
            var enable = eval(String(args[1]));
            Zzy.FBF.EnableActorFB(enable);

            //$gameSystem.SetZzyFBFEnableActorFB(enable);
            break;

        case "MaxCount":
            var formula = String(args[1]);
            Zzy.FBF.MaxCount(formula);

            //$gameSystem.SetZzyFBFMaxFieldCount(formula);
            break;

        case "CurrentCount":
            var formula = String(args[1]);
            Zzy.FBF.CurrentCount(formula);

            //$gameSystem.SetZzyFBFCurrentFieldCount(formula);
            break;

        case "MemoryCount":
            var count = parseInt(args[1]);
            Zzy.FBF.MemoryCount(count);

            //$gameSystem.SetZzyFBFMemoryCount(count);
            break;

        case "ForceUnInstallAll":
            var actorId = parseInt(args[1]);
            Zzy.FBF.ForceUnInstallAll(actorId);

            //$gameSystem.ZzyFBFForceUnInstallAll(actorId);
            break;
    }
};

//=================================================================
//Window_MenuCommand
//=================================================================
Zzy.FBF.Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function () {
    Zzy.FBF.Window_MenuCommand_addOriginalCommands.call(this);
    var isEnable = $gameSystem.GetZzyFBFEnableMenu();
    var isInsert = $gameSystem.GetZzyFBFInsertMenu();
    if (isInsert) {
        this.addCommand($gameSystem.GetZzyFBFMenuCommandName(), "ZzyFBFBless", isEnable);
    }
};

//=================================================================
//Window_SkillType
//=================================================================
Zzy.FBF.Window_SkillType_makeCommandList = Window_SkillType.prototype.makeCommandList;
Window_SkillType.prototype.makeCommandList = function () {
    Zzy.FBF.Window_SkillType_makeCommandList.call(this);
    if (this._actor) {
        if (!!$gameSystem.GetZzyFBFInsertSMenu()) {
            var isEnable = $gameSystem.GetZzyFBFEnableSMenu();
            this.addCommand($gameSystem.GetZzyFBFSMenuCommandName(), "ZzyFBFBless", isEnable);
        }
    }
};

//=================================================================
//Scene_Skill
//=================================================================
Zzy.FBF.Scene_Skill_createSkillTypeWindow = Scene_Skill.prototype.createSkillTypeWindow;
Scene_Skill.prototype.createSkillTypeWindow = function () {
    Zzy.FBF.Scene_Skill_createSkillTypeWindow.call(this);
    this._skillTypeWindow.setHandler("ZzyFBFBless", this.ZzyFBFCallField.bind(this));
};

Scene_Skill.prototype.ZzyFBFCallField = function () {
    if (this.JudgZzyFBFHaveFieldBless()) {
        //判断角色是否具备领域
        this.setZzyFBFSelectActorId(); //选择中ID
        SceneManager.push(Scene_ZzyFBF);
        return; //压入场景
    } else {
        this.ReturnZzyFBFSkillWindow(); //返回技能场景
    }
};

Scene_Skill.prototype.JudgZzyFBFHaveFieldBless = function () {
    return $gameSystem.IsZzyFBFActorHaveFieldBless(this._actor.actorId());
};

Scene_Skill.prototype.ReturnZzyFBFSkillWindow = function () {
    this._skillTypeWindow.activate();
};
Scene_Skill.prototype.setZzyFBFSelectActorId = function () {
    $gameSystem.SetZzyFBFSelectActorIndex(this._actor.actorId());
};

//=================================================================
//Scene_Menu
//=================================================================
Zzy.FBF.Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function () {
    Zzy.FBF.Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler("ZzyFBFBless", this.commandPersonal.bind(this));
};

Zzy.FBF.Scene_Menu_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
Scene_Menu.prototype.onPersonalOk = function () {
    if (this._commandWindow.currentSymbol() === "ZzyFBFBless") {
        if (this.JudgZzyFBFHaveFieldBless()) {
            this.setZzyFBFSelectIndex();
            SceneManager.push(Scene_ZzyFBF);
            return; //压入场景
        } else {
            this.ReturnZzyFBFStatusWindow();
        }
    }
    Zzy.FBF.Scene_Menu_onPersonalOk.call(this);
};

Scene_Menu.prototype.setZzyFBFSelectIndex = function () {
    var index = this._statusWindow.index();
    $gameSystem.SetZzyFBFSelectActorIndex($gameParty._actors[index]);
};

Scene_Menu.prototype.JudgZzyFBFHaveFieldBless = function () {
    var index = this._statusWindow.index();
    var actorId = $gameParty._actors[index];
    return $gameSystem.IsZzyFBFActorHaveFieldBless(actorId);
};

Scene_Menu.prototype.ReturnZzyFBFStatusWindow = function () {
    this._statusWindow.activate();
};

//=================================================================
//Window_MenuStatus
//=================================================================
Zzy.FBF.Window_MenuStatus_processOk = Window_MenuStatus.prototype.processOk;
Window_MenuStatus.prototype.processOk = function () {
    if (this.isCurrentItemEnabled()) {
        if (SceneManager._scene instanceof Scene_Menu) {
            var pointer = SceneManager._scene._commandWindow;
            var index = SceneManager._scene._commandWindow._index;
            if (pointer.commandName(index) === $gameSystem.GetZzyFBFMenuCommandName()) {
                //处于加护内容
                if (!this.JudgZzyFBFHaveFieldBless()) {
                    //判断角色是否拥有加护能力
                    Zzy.FBF.PlaySE(1);
                    return;
                }
            }
        }
    }
    Zzy.FBF.Window_MenuStatus_processOk.call(this);
};

Window_MenuStatus.prototype.JudgZzyFBFHaveFieldBless = function () {
    var index = this.index();
    var actorId = $gameParty._actors[index];
    return $gameSystem.IsZzyFBFActorHaveFieldBless(actorId);
};

//=================================================================
//Scene_ZzyFBF
//=================================================================
//Scene_ZzyFBF场景，用于承载加护相关的窗口
function Scene_ZzyFBF() {
    this.initialize.apply(this, arguments);
}

Scene_ZzyFBF.prototype = Object.create(Scene_MenuBase.prototype);
Scene_ZzyFBF.prototype.constructor = Scene_ZzyFBF;

Scene_ZzyFBF.prototype.initialize = function () {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_ZzyFBF.prototype.create = function () //创造窗口
{
    Scene_MenuBase.prototype.create.call(this);
    this.createHelpWindow();
    this.CreateFieldWindow();
    this.CreateFieldItemWindow();

    this._fieldWindow.setFieldItemWindow(this._fieldItemWindow);
    this._fieldItemWindow.setFieldWindow(this._fieldWindow);
};

Scene_ZzyFBF.prototype.createHelpWindow = function () {
    this._helpWindow = new Window_ZzyFBFHelp(2);
    this._helpWindow.setText("");
    this.addWindow(this._helpWindow);
};

Scene_ZzyFBF.prototype.CreateFieldWindow = function () {
    this._fieldWindow = new Window_ZzyFBFField();
    this._fieldWindow.setHelpWindow(this._helpWindow);
    this._fieldWindow.InitPosition();

    this._fieldWindow.deactivate();
    this._fieldWindow.deselect();

    this._fieldWindow.setHandler("cancel", this.ZzyFBFPopField.bind(this));
    this._fieldWindow.setHandler("ok", this.OnZzyFBFSelectFieldBless.bind(this));
    this.addWindow(this._fieldWindow);
};

Scene_ZzyFBF.prototype.CreateFieldItemWindow = function () {
    this._fieldItemWindow = new Window_ZzyFBFItemField();
    this._fieldItemWindow.setHelpWindow(this._helpWindow);

    this._fieldItemWindow.InitPosition();
    this._fieldItemWindow.activate();
    this._fieldItemWindow.select(0);

    this._fieldItemWindow.setHandler("cancel", this.popScene.bind(this));
    this._fieldItemWindow.setHandler("ok", this.OnZzyFBFAddFieldBless.bind(this));
    this.addWindow(this._fieldItemWindow);
};

Scene_ZzyFBF.prototype.ZzyFBFPopField = function () {
    this._fieldWindow.deactivate();
    this._fieldWindow.deselect();
    this._fieldItemWindow.activate();
};

Scene_ZzyFBF.prototype.OnZzyFBFAddFieldBless = function () {
    var pointer = this._fieldItemWindow;

    if (pointer.active) {
        //保持活跃
        pointer.OnSelectField();
    } //触发选择

    this._fieldItemWindow.activate(); //保持活跃
    this._fieldWindow.deactivate(); //失去活跃
};

Scene_ZzyFBF.prototype.OnZzyFBFSelectFieldBless = function () {
    var pointer = this._fieldWindow;

    if (pointer.active) {
        //保持活跃
        pointer.OnSelectField();
    } //触发选择

    this._fieldWindow.activate(); //保持活跃
    this._fieldItemWindow.deactivate(); //失去活跃
};

//=================================================================
//Window_ZzyFBFField
//=================================================================

function Window_ZzyFBFField() {
    this.initialize.apply(this, arguments);
}

Window_ZzyFBFField.prototype = Object.create(Window_Selectable.prototype);
Window_ZzyFBFField.prototype.constructor = Window_ZzyFBFField;

Window_ZzyFBFField.prototype.initialize = function () {
    Window_Selectable.prototype.initialize.call(this, 0, 0);
    this._list = []; //列表
    this._fieldItemWindow = undefined;
};

Window_ZzyFBFField.prototype.InitPosition = function () {
    this.x = eval(Zzy.Param.FBFFieldWindowX);
    this.y = eval(Zzy.Param.FBFFieldWindowY);
    this.width = eval(Zzy.Param.FBFFieldWindowW);
    this.height = eval(Zzy.Param.FBFFieldWindowH);

    this.RefreshActorField(); //刷新角色加护

    this.refresh();
};

Window_ZzyFBFField.prototype.maxCols = function () {
    return 1;
};

Window_ZzyFBFField.prototype.drawItem = function (index) {
    var item = this._list[index];
    var rect = this.itemRect(index);

    this.drawDeepFillRect(rect, 2);

    var srcInfo = {};
    this.SaveZzyFBFContents(srcInfo);

    if (item) {
        //存在道具
        rect.width -= this.textPadding();

        if ($gameSystem.GetZzyFBFFieldBlessNoInstall(item)) {
            //未安装
            this.changeTextColor(Zzy.Param.FBFNoUnInstallColor);
        } else {
            if (item.zzyFBF) {
                if (item.zzyFBF.textColor) {
                    //存在设置的文字
                    this.changeTextColor(item.zzyFBF.textColor);
                }

                if (item.zzyFBF.borderColor) {
                    this.contents.outlineColor = item.zzyFBF.borderColor;
                }

                if (item.zzyFBF.borderWidth) {
                    this.contents.outlineWidth = item.zzyFBF.borderWidth;
                }

                if (item.zzyFBF.textSize) {
                    //字体大小
                    this.contents.fontSize = item.zzyFBF.textSize;
                }
            }
        }

        this.drawItemName(item, rect.x, rect.y, rect.width);
    } else if (item === null) {
        //不存在
        this.changeTextColor(Zzy.Param.FBFUnlockTextColor);
        this.drawText(Zzy.Param.FBFUnlockText, rect.x, rect.y, rect.width, "center");
    } else if (item === false) {
        this.changeTextColor(Zzy.Param.FBFMemoryTextColor);
        this.drawText(Zzy.Param.FBFMemoryText, rect.x, rect.y, rect.width, "center");
    }

    this.LoadZzyFBFContents(srcInfo);
};

Window_ZzyFBFField.prototype.SaveZzyFBFContents = function (srcInfo) {
    srcInfo.textColor = this.contents.textColor;
    srcInfo.outlineColor = this.contents.outlineColor;
    srcInfo.outlineWidth = this.contents.outlineWidth;
    srcInfo.fontSize = this.contents.fontSize;
};

Window_ZzyFBFField.prototype.LoadZzyFBFContents = function (srcInfo) {
    this.contents.textColor = srcInfo.textColor;
    this.contents.outlineColor = srcInfo.outlineColor;
    this.contents.outlineWidth = srcInfo.outlineWidth;
    this.contents.fontSize = srcInfo.fontSize;
};

Window_ZzyFBFField.prototype.drawItemName = function (item, x, y, width) {
    width = width || 312;
    if (item) {
        var iconBoxWidth = Window_Base._iconWidth + 4;
        //this.resetTextColor();
        this.drawIcon(item.iconIndex, x + 2, y + 2);
        this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
    }
};

Window_ZzyFBFField.prototype.drawDeepFillRect = function (rect, dis) {
    this.contents.fillRect(rect.x + dis, rect.y + dis, rect.width - dis * 2, rect.height - dis * 2, this.deepColor());
};

Window_ZzyFBFField.prototype.deepColor = function () {
    return Zzy.Param.FBFFieldRectColor;
};

Window_ZzyFBFField.prototype.processTouch = function () {
    if (!this.active && this.checkActive()) {
        this.activate(); //设置为活跃
        this._fieldItemWindow.deactivate();
        return;
    }

    Window_Selectable.prototype.processTouch.call(this);
};

Window_ZzyFBFField.prototype.checkActive = function () {
    if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
        return true;
    }
    return false;
};

Window_ZzyFBFField.prototype.setFieldItemWindow = function (pointer) {
    this._fieldItemWindow = pointer;
};

Window_ZzyFBFField.prototype.refresh = function () {
    this.createContents();
    this.drawAllItems();
};

Window_ZzyFBFField.prototype.drawAllItems = function () {
    var topIndex = this.topIndex();
    for (var i = 0; i < this.maxPageItems(); i++) {
        var index = topIndex + i;
        if (index < this.maxItems()) {
            this.drawItem(index);
        }
    }
};

Window_ZzyFBFField.prototype.item = function () {
    var index = this.index();
    return this._list && index >= 0 ? this._list[index] : false;
};

Window_ZzyFBFField.prototype.updateHelp = function () {
    this.setHelpWindowItem(this.item());
};

Window_ZzyFBFField.prototype.maxItems = function () {
    return this._list ? this._list.length : 0;
};

Window_ZzyFBFField.prototype.RefreshActorField = function () //刷新槽
{
    //判断角色领域是否为无限
    var actorId = $gameSystem.GetZzyFBFSelectActorIndex();
    $gameSystem.UpdateZzyFBFActorUseArr(actorId); //更新角色的加护
    var tMax = $gameSystem.GetZzyFBFActorFinalMaxCount(actorId); //最大格子数
    var currentCount = $gameSystem.GetZzyFBFActorFinalCurrentCount(actorId);

    if (tMax !== -1) {
        currentCount = currentCount > tMax ? tMax : currentCount;
    }
    for (
        var i = 0;
        i < currentCount;
        i++ //拷贝
    ) {
        this._list[i] = undefined;
    }

    //计算拥有的加护格子数
    var arr = $gameSystem.GetZzyFBFActorUseArr(actorId);
    var arrLen = arr.length;
    arrLen = arrLen > currentCount ? currentCount : arrLen;
    for (
        var i = 0;
        i < arrLen;
        i++ //拷贝
    ) {
        this._list[i] = $dataItems[arr[i]];
    }

    var addLen = 0;
    if (tMax === -1) {
        addLen = this.maxPageRows();
    } else {
        addLen = tMax - currentCount;
    }

    //添加额外
    var last = this._list.length;
    for (
        var i = 0;
        i < addLen;
        i++ //添加到_list列表中
    ) {
        this._list[last + i] = null;
    }

    //赋予内容
    var useArr = $gameSystem.GetZzyFBFActorUseArr(actorId);
    for (var i = 0; i < useArr.length; i++) {
        if (this._list[i] === null) continue;
        if (useArr[i] === false) {
            this._list[i] = false;
        } else {
            this._list[i] = $dataItems[useArr[i]];
        }
    }
};

Window_ZzyFBFField.prototype.maxPageRows = function () {
    var pageHeight = this.height - this.padding * 2;
    return Math.floor(pageHeight / this.itemHeight());
};

Window_ZzyFBFField.prototype.IsCanInstall = function (index, installItem) {
    var max = this._list.length - 1;
    if (index > max) return false;
    if (this._list[index] === false || this._list[index] === null) {
        return false;
    }
    if ($gameSystem.GetZzyFBFFieldBlessNoInstall(this._list[index])) {
        return false;
    }

    var count = $gameSystem.GetZzyFBFFieldBlessMemory(this._list[index]); //检测容量是否超标
    var iCount = $gameSystem.GetZzyFBFFieldBlessMemory(installItem);

    if (this._list[index]) {
        if (iCount > count) {
            for (var i = count; i < iCount; i++) {
                if (this._list[index + i] !== undefined) {
                    return false;
                }
            }
        }
    }

    if (this._list[index] === undefined) {
        for (var i = 1; i < iCount; i++) {
            if (this._list[index + i] || this._list[index + i] === false || this._list[index + i] === null) {
                return false;
            }
        }
    }

    return true;
};

Window_ZzyFBFField.prototype.IsCanUnInstall = function (index, installItem) {
    var max = this._list.length - 1;
    if (index > max) return true;
    if (this._list[index] === false || this._list[index] === null) {
        return true;
    }
    if ($gameSystem.GetZzyFBFFieldBlessNoInstall(this._list[index])) {
        return true;
    } //不可卸载

    var count = $gameSystem.GetZzyFBFFieldBlessMemory(this._list[index]); //检测容量是否超标
    var iCount = $gameSystem.GetZzyFBFFieldBlessMemory(installItem);

    if (this._list[index]) {
        if (iCount > count) {
            for (var i = count; i < iCount; i++) {
                if (this._list[index + i] !== undefined) {
                    return true;
                }
            }
        }
    }

    if (this._list[index] === undefined) {
        for (var i = 1; i < iCount; i++) {
            if (this._list[index + i] || this._list[index + i] === false || this._list[index + i] === null) {
                return true;
            }
        }
    }

    return false;
};

Window_ZzyFBFField.prototype.processOk = function () {
    if (this.isCurrentItemEnabled()) {
        //this.playOkSound();
        this.updateInputData();
        //this.deactivate();
        this.callOkHandler();
    } else {
        this.playBuzzerSound();
    }
};

Window_ZzyFBFField.prototype.OnSelectField = function () {
    if (this.IsSatisfyUnInstall(this.index())) {
        //满足拆卸
        this.ExecuteUnInstallField();
    } else {
        //不满足拆卸
        Zzy.FBF.PlaySE(2);
    }
};

Window_ZzyFBFField.prototype.ExecuteUnInstallField = function () //卸载领域
{
    this._fieldItemWindow.ProcessGainItem(this.item());
    this._fieldItemWindow.refresh();

    var actorId = $gameSystem.GetZzyFBFSelectActorIndex();
    var fArr = $gameSystem.GetZzyFBFActorUseArr(actorId);

    var item = $dataItems[fArr[this.index()]];
    var memory = $gameSystem.GetZzyFBFFieldBlessMemory(item);

    for (var i = 0; i < memory; i++) {
        var index = this.index() + i;
        fArr[index] = undefined;
        this._list[index] = undefined;
    }

    Zzy.FBF.PlaySE(5);
    this.refresh();
};

Window_ZzyFBFField.prototype.IsSatisfyUnInstall = function (index) {
    var max = this._list.length - 1;
    if (index > max) return false;
    if (this._list[index] === false || this._list[index] === null || this._list[index] === undefined) {
        return false;
    }
    if ($gameSystem.GetZzyFBFFieldBlessNoInstall(this._list[index])) {
        return false;
    }
    if (this._list[index]) {
        return true;
    }
    return false;
};

Window_ZzyFBFField.prototype.ExecuteInstallItem = function (index, item) {
    //首先拆卸原来

    var memory = $gameSystem.GetZzyFBFFieldBlessMemory(item);

    if (this._list[index]) {
        //存在内容
        var oldItem = this._list[index]; //卸载旧的
        var oldMemory = $gameSystem.GetZzyFBFFieldBlessMemory(oldItem);
        for (var i = 0; i < oldMemory; i++) {
            this._list[index + i] = undefined;
        }

        this._list[index] = item; //安装新的
        for (var i = 1; i < memory; i++) {
            this._list[index + i] = false; //占位
        }

        this.refresh();
        return oldItem;
    } else {
        this._list[index] = item;
        for (var i = 1; i < memory; i++) {
            this._list[index + i] = false; //占位
        }

        this.refresh();
        return undefined;
    }
};

//=================================================================
//Window_ZzyFBFItemField
//=================================================================

function Window_ZzyFBFItemField() {
    this.initialize.apply(this, arguments);
}

Window_ZzyFBFItemField.prototype = Object.create(Window_Selectable.prototype);
Window_ZzyFBFItemField.prototype.constructor = Window_ZzyFBFItemField;

Window_ZzyFBFItemField.prototype.initialize = function () {
    Window_Selectable.prototype.initialize.call(this, 0, 0);

    //创建完成后,读取有效的内容
    this._list = [];
    this._fieldWindow = undefined;
    this.EarnFieldItemList();
    this.refresh();
};

Window_ZzyFBFItemField.prototype.EarnFieldItemList = function () {
    var items = $gameParty.items();
    var enableArr = $gameSystem.GetZzyFBFFieldItemIdArr();
    var len = items.length;
    for (var i = 0; i < len; i++) {
        var item = items[i];

        if (enableArr.contains(item.id)) {
            this._list.push(item);
        }
    }
    //asd
};

Window_ZzyFBFItemField.prototype.InitPosition = function () {
    this.x = eval(Zzy.Param.FBFFieldItemWindowX);
    this.y = eval(Zzy.Param.FBFFieldItemWindowY);
    this.width = eval(Zzy.Param.FBFFieldItemWindowW);
    this.height = eval(Zzy.Param.FBFFieldItemWindowH);
    this.refresh();
};

Window_ZzyFBFItemField.prototype.maxCols = function () {
    return 2;
};

Window_ZzyFBFItemField.prototype.drawItem = function (index) {
    var item = this._list[index];
    if (item) {
        var numberWidth = this.numberWidth();
        var rect = this.itemRect(index);
        rect.width -= this.textPadding();

        if (this.IsEnable(item)) {
            var srcInfo = {};
            this.SaveZzyFBFContents(srcInfo);

            if (item.zzyFBF) {
                if (item.zzyFBF.textColor) {
                    //存在设置的文字
                    this.changeTextColor(item.zzyFBF.textColor);
                }

                if (item.zzyFBF.borderColor) {
                    this.contents.outlineColor = item.zzyFBF.borderColor;
                }

                if (item.zzyFBF.borderWidth) {
                    this.contents.outlineWidth = item.zzyFBF.borderWidth;
                }

                if (item.zzyFBF.textSize) {
                    //字体大小
                    this.contents.fontSize = item.zzyFBF.textSize;
                }
            }

            this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth);
            this.drawItemNumber(item, rect.x, rect.y, rect.width);

            this.LoadZzyFBFContents(srcInfo);
        } else {
            this.changePaintOpacity(false);
            this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth);
            this.drawItemNumber(item, rect.x, rect.y, rect.width);
        }
        this.changePaintOpacity(1);
    }
};

Window_ZzyFBFItemField.prototype.drawItemName = function (item, x, y, width) {
    width = width || 312;
    var iconBoxWidth = Window_Base._iconWidth + 4;
    this.drawIcon(item.iconIndex, x + 2, y + 2);
    this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
};

Window_ZzyFBFItemField.prototype.drawItemNumber = function (item, x, y, width) {
    this.drawText(":", x, y, width - this.textWidth("00"), "right");
    this.drawText($gameParty.numItems(item), x, y, width, "right");
};

Window_ZzyFBFItemField.prototype.SaveZzyFBFContents = function (srcInfo) {
    srcInfo.textColor = this.contents.textColor;
    srcInfo.outlineColor = this.contents.outlineColor;
    srcInfo.outlineWidth = this.contents.outlineWidth;
    srcInfo.fontSize = this.contents.fontSize;
};

Window_ZzyFBFItemField.prototype.LoadZzyFBFContents = function (srcInfo) {
    this.contents.textColor = srcInfo.textColor;
    this.contents.outlineColor = srcInfo.outlineColor;
    this.contents.outlineWidth = srcInfo.outlineWidth;
    this.contents.fontSize = srcInfo.fontSize;
};

Window_ZzyFBFItemField.prototype.IsEnable = function (item) {
    var actorId = $gameSystem.GetZzyFBFSelectActorIndex();
    var enable = $gameSystem.EnableZzyFBFFieldOfActor(actorId, item);
    return enable;
};

Window_ZzyFBFItemField.prototype.IsEnableOfIndex = function (index) {
    var item = this.item();
    return this.IsEnable(item);
};

Window_ZzyFBFItemField.prototype.numberWidth = function () {
    return this.textWidth("000");
};

Window_ZzyFBFItemField.prototype.maxItems = function () {
    return this._list ? this._list.length : 0;
};

Window_ZzyFBFItemField.prototype.refresh = function () {
    this.createContents();
    this.drawAllItems();
};

Window_ZzyFBFItemField.prototype.item = function () {
    var index = this.index();
    return this._list && index >= 0 ? this._list[index] : null;
};

Window_ZzyFBFItemField.prototype.updateHelp = function () {
    this.setHelpWindowItem(this.item());
};

Window_ZzyFBFItemField.prototype.setFieldWindow = function (pointer) {
    this._fieldWindow = pointer;
};

Window_ZzyFBFItemField.prototype.processTouch = function () {
    if (!this.active && this.checkActive()) {
        this.activate(); //设置为活跃
        this._fieldWindow.deactivate();
        return;
    }

    Window_Selectable.prototype.processTouch.call(this);
};

Window_ZzyFBFItemField.prototype.checkActive = function () {
    if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
        return true;
    }
    return false;
};

Window_ZzyFBFItemField.prototype.processOk = function () {
    if (this.isCurrentItemEnabled()) {
        //this.playOkSound();
        this.updateInputData();
        //this.deactivate();
        this.callOkHandler();
    } else {
        this.playBuzzerSound();
    }
};

Window_ZzyFBFItemField.prototype.OnSelectField = function () {
    //激活
    var index = this.index();
    var isValid = this.IsEnableOfIndex(index);
    if (isValid) {
        this.ExecuteInstallField();
    } else {
        Zzy.FBF.PlaySE(3);
    }
};

Window_ZzyFBFItemField.prototype.ExecuteInstallField = function () //执行安装加护
{
    var installItem = this.item();
    var index = this._fieldWindow.index();
    var tList = this._fieldWindow._list;
    if (index >= 0) {
        //防止-1
        if (this._fieldWindow.IsCanUnInstall(index, installItem)) {
            Zzy.FBF.PlaySE(3);
            return false;
        }
    } //遍历
    else {
        var len = tList.length;
        var isCan = false;
        for (var i = 0; i < len; i++) {
            if (this._fieldWindow.IsCanInstall(i, installItem)) {
                //可以安装
                index = i;
                isCan = true;

                break;
            }
        }
        if (!isCan) {
            Zzy.FBF.PlaySE(3);
            return false;
        }
    }

    var oldItem = this._fieldWindow.ExecuteInstallItem(index, installItem); //执行安装
    //目标向后跳跃
    var memory = $gameSystem.GetZzyFBFFieldBlessMemory(installItem); //获取内存大小
    this._fieldWindow.select(index + memory);

    //减少道具
    this.ProcessLoseItem(installItem);
    this.ProcessGainItem(oldItem);

    var actorId = $gameSystem.GetZzyFBFSelectActorIndex();

    if (oldItem) {
        $gameSystem.UnInstallZzyFBFField(actorId, index);
    }
    $gameSystem.InstallZzyFBFField(actorId, index, installItem);

    Zzy.FBF.PlaySE(4);
    this.refresh();
    return true;
};

Window_ZzyFBFItemField.prototype.ProcessGainItem = function (item) {
    if (!item) return; //获取道具
    //item = $dataItems[6];

    $gameParty.gainItem(item, 1);
    //判断卸下来的是否拥有
    if (!this.IsListHaveOfItem(item)) {
        this._list.push(item);
    }
};

Window_ZzyFBFItemField.prototype.ProcessLoseItem = function (item) {
    if (!item) return;
    $gameParty.loseItem(item, 1); //减少道具
    for (var i = 0; i < this._list.length; i++) {
        if (this._list[i].id === item.id) {
            var count = $gameParty._items[item.id];
            if (!count) {
                //不存在数量,需要移除这个内容
                this.DeleteListOfIndex(i); //移除元素
                return;
            }
        }
    }
};

Window_ZzyFBFItemField.prototype.DeleteListOfIndex = function (index) {
    var len = this._list.length;

    for (var i = index; i < len; i++) {
        this._list[i] = this._list[i + 1];
    }
    this._list[len - 1] = undefined;
    this._list.length--;
};

Window_ZzyFBFItemField.prototype.IsListHaveOfItem = function (item) {
    for (var i = 0; i < this._list.length; i++) {
        if (this._list[i].id === item.id) {
            return true;
        }
    }
    return false;
};

//=================================================================
//Window_ZzyFBFHelp
//=================================================================

function Window_ZzyFBFHelp() {
    this.initialize.apply(this, arguments);
}

Window_ZzyFBFHelp.prototype = Object.create(Window_Help.prototype);
Window_ZzyFBFHelp.prototype.constructor = Window_ZzyFBFHelp;

Window_ZzyFBFHelp.prototype.initialize = function (numLines) {
    numLines = this.DefaultNumLines();
    Window_Help.prototype.initialize.call(this, numLines);

    this.x = eval(Zzy.Param.FBFHelpWindowX);
    this.y = eval(Zzy.Param.FBFHelpWindowY);
    this.width = eval(Zzy.Param.FBFHelpWindowW);
};

Window_ZzyFBFHelp.prototype.DefaultNumLines = function () {
    return Zzy.Param.FBFHelpWindowH;
};

Window_ZzyFBFHelp.prototype.setText = function (text) {
    if (this._text !== text) {
        this._text = text;
        this.refresh();
    }
};

Window_ZzyFBFHelp.prototype.clear = function () {
    this.setText("");
};

Window_ZzyFBFHelp.prototype.setItem = function (item) {
    if (item === null) {
        this.setText(Zzy.Param.FBFUnlockHelpText);
    } else if (item === undefined) {
        this.setText(Zzy.Param.FBFLockHelpText);
    } else {
        this.setText(item ? item.description : "");
    }
};

Window_ZzyFBFHelp.prototype.refresh = function () {
    this.contents.clear();
    this.drawTextEx(this._text, this.textPadding(), 0);
};

//================================================================
//DataManager
//================================================================
Zzy.FBF.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function () {
    if (!Zzy.FBF.DataManager_isDatabaseLoaded.call(this)) return false;

    //添加标签内容
    this.ZzyFBFLoadNoteCase1($dataItems); //物品

    this.ZzyFBFLoadNoteCase2($dataActors); //角色

    this.ZzyFBFLoadNoteCase3($dataArmors); //护甲
    this.ZzyFBFLoadNoteCase3($dataWeapons); //武器
    this.ZzyFBFLoadNoteCase3($dataSkills); //技能
    this.ZzyFBFLoadNoteCase3($dataClasses); //职业
    this.ZzyFBFLoadNoteCase3($dataActors); //角色
    return true;
};

DataManager.ZzyFBFLoadNoteCase3 = function (objArr) {
    for (var i = 1; i < objArr.length; i++) {
        var obj = objArr[i];
        var noteData = obj.note.split(/[\r\n]+/);

        obj.zzyFBF = obj.zzyFBF || {};

        for (var j = 0; j < noteData.length; j++) {
            var lineStr = noteData[j];

            if (lineStr.match(/<ZZYFBF COUNT:[ ](.*)>/i)) {
                //增添卡槽
                var count = String(RegExp.$1);
                obj.zzyFBF["eCount"] = count;
            } else if (lineStr.match(/<ZZYFBF MCOUNT:[ ](.*)>/i)) {
                //增添最大卡槽
                var count = String(RegExp.$1);
                obj.zzyFBF["emCount"] = count;
            }
        }
    }
};

DataManager.ZzyFBFLoadNoteCase2 = function (
    objArr //加载标签
) {
    for (var i = 1; i < objArr.length; i++) {
        var obj = objArr[i];
        var noteData = obj.note.split(/[\r\n]+/);

        obj.zzyFBF = obj.zzyFBF || {};

        for (var j = 0; j < noteData.length; j++) {
            var lineStr = noteData[j];

            if (lineStr.match(/<ZZYFBF FIELDBLESS:[ ](.*)>/i)) {
                //作为卡片
                var enable = eval(String(RegExp.$1));
                obj.zzyFBF["enable"] = enable;
            } else if (lineStr.match(/<ZZYFBF MAXCOUNT:[ ](.*)>/i)) {
                var count = String(RegExp.$1);
                obj.zzyFBF["maxCount"] = count;
            } else if (lineStr.match(/<ZZYFBF CURRENTCOUNT:[ ](.*)>/i)) {
                var count = String(RegExp.$1);
                obj.zzyFBF["currentCount"] = count;
            }
        }
    }
};

DataManager.ZzyFBFLoadNoteCase1 = function (
    objArr //加载标签
) {
    for (var i = 1; i < objArr.length; i++) {
        var obj = objArr[i];
        var noteData = obj.note.split(/[\r\n]+/);

        obj.zzyFBF = obj.zzyFBF || {};
        //基本参数
        obj.zzyFBF["param"] = [];
        obj.zzyFBF["paramPer"] = [];
        //额外参数
        obj.zzyFBF["exParam"] = [];
        obj.zzyFBF["exParamPer"] = [];
        //特殊参数
        obj.zzyFBF["spParam"] = [];
        obj.zzyFBF["spParamPer"] = [];
        //元素参数
        obj.zzyFBF["elParam"] = [];
        obj.zzyFBF["elParamPer"] = [];

        //0生命 1魔法 2攻击 3防御 4魔攻 5魔抗 6速度 7幸运

        //0命中 1闪避 2暴击 3暴击回避 4魔法回避 5魔法反射
        //6反击 7HP自动回复 8MP自动回复 9TP自动恢复

        //1受击几率 2防御效果 3恢复效果 4药理知识 5MP消耗率 6TP消耗率
        //7物理伤害 8魔法伤害 9地形伤害 10经验值 11金币概率 12伤害减免
        //13逃跑概率 14先发制人概率 15被偷袭概率 16遇敌步数

        for (var j = 0; j < noteData.length; j++) {
            var lineStr = noteData[j];

            if (lineStr.match(/<ZZYFBF ENABLE>/i)) {
                //作为卡片
                obj.zzyFBF["enable"] = true;
            } else if (lineStr.match(/<ZZYFBF TEXTCOLOR:[ ](.*)>/i)) {
                obj.zzyFBF["textColor"] = String(RegExp.$1);
            } else if (lineStr.match(/<ZZYFBF BORDERWIDTH:[ ](.*)>/i)) {
                obj.zzyFBF["borderWidth"] = parseInt(RegExp.$1);
            } else if (lineStr.match(/<ZZYFBF BORDERCOLOR:[ ](.*)>/i)) {
                obj.zzyFBF["borderColor"] = String(RegExp.$1);
            } else if (lineStr.match(/<ZZYFBF TEXTSIZE:[ ](.*)>/i)) {
                obj.zzyFBF["textSize"] = parseInt(RegExp.$1);
            } else if (lineStr.match(/<ZZYFBF HP:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["param"][0] = value;
            } else if (lineStr.match(/<ZZYFBF HPPER:[ ](.*)>/i)) {
                var per = String(RegExp.$1);
                obj.zzyFBF["paramPer"][0] = per;
            } else if (lineStr.match(/<ZZYFBF MP:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["param"][1] = value;
            } else if (lineStr.match(/<ZZYFBF MPPER:[ ](.*)>/i)) {
                var per = String(RegExp.$1);
                obj.zzyFBF["paramPer"][1] = per;
            } else if (lineStr.match(/<ZZYFBF ATK:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["param"][2] = value;
            } else if (lineStr.match(/<ZZYFBF ATKPER:[ ](.*)>/i)) {
                var per = String(RegExp.$1);
                obj.zzyFBF["paramPer"][2] = per;
            } else if (lineStr.match(/<ZZYFBF DEF:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["param"][3] = value;
            } else if (lineStr.match(/<ZZYFBF DEFPER:[ ](.*)>/i)) {
                var per = String(RegExp.$1);
                obj.zzyFBF["paramPer"][3] = per;
            } else if (lineStr.match(/<ZZYFBF MAT:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["param"][4] = value;
            } else if (lineStr.match(/<ZZYFBF MATPER:[ ](.*)>/i)) {
                var per = String(RegExp.$1);
                obj.zzyFBF["paramPer"][4] = per;
            } else if (lineStr.match(/<ZZYFBF MDF:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["param"][5] = value;
            } else if (lineStr.match(/<ZZYFBF MDFPER:[ ](.*)>/i)) {
                var per = String(RegExp.$1);
                obj.zzyFBF["paramPer"][5] = per;
            } else if (lineStr.match(/<ZZYFBF AGI:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["param"][6] = value;
            } else if (lineStr.match(/<ZZYFBF AGIPER:[ ](.*)>/i)) {
                var per = String(RegExp.$1);
                obj.zzyFBF["paramPer"][6] = per;
            } else if (lineStr.match(/<ZZYFBF LUK:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["param"][7] = value;
            } else if (lineStr.match(/<ZZYFBF LUKPER:[ ](.*)>/i)) {
                var per = String(RegExp.$1);
                obj.zzyFBF["paramPer"][7] = per;
            } else if (lineStr.match(/<ZZYFBF HIT:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["exParam"][0] = value;
            } else if (lineStr.match(/<ZZYFBF HITPER:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["exParamPer"][0] = value;
            } else if (lineStr.match(/<ZZYFBF EVA:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["exParam"][1] = value;
            } else if (lineStr.match(/<ZZYFBF EVAPER:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["exParamPer"][1] = value;
            } else if (lineStr.match(/<ZZYFBF CRI:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["exParam"][2] = value;
            } else if (lineStr.match(/<ZZYFBF CRIPER:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["exParamPer"][2] = value;
            } else if (lineStr.match(/<ZZYFBF CEV:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["exParam"][3] = value;
            } else if (lineStr.match(/<ZZYFBF CEVPER:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["exParamPer"][3] = value;
            } else if (lineStr.match(/<ZZYFBF MEV:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["exParam"][4] = value;
            } else if (lineStr.match(/<ZZYFBF MEVPER:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["exParamPer"][4] = value;
            } else if (lineStr.match(/<ZZYFBF MRF:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["exParam"][5] = value;
            } else if (lineStr.match(/<ZZYFBF MRFPER:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["exParamPer"][5] = value;
            } else if (lineStr.match(/<ZZYFBF CNT:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["exParam"][6] = value;
            } else if (lineStr.match(/<ZZYFBF CNTPER:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["exParamPer"][6] = value;
            } else if (lineStr.match(/<ZZYFBF HRG:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["exParam"][7] = value;
            } else if (lineStr.match(/<ZZYFBF HRGPER:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["exParamPer"][7] = value;
            } else if (lineStr.match(/<ZZYFBF MRG:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["exParam"][8] = value;
            } else if (lineStr.match(/<ZZYFBF MRGPER:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["exParamPer"][8] = value;
            } else if (lineStr.match(/<ZZYFBF TRG:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["exParam"][9] = value;
            } else if (lineStr.match(/<ZZYFBF TRGPER:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["exParamPer"][9] = value;
            } else if (lineStr.match(/<ZZYFBF MEMORY:[ ](\d+)>/i)) {
                var memory = parseInt(RegExp.$1);
                obj.zzyFBF["memory"] = memory;
            } else if (lineStr.match(/<ZZYFBF NOINSTALL>/i)) {
                obj.zzyFBF["noInstall"] = true;
            } else if (lineStr.match(/<ZZYFBF CLASS:[ ](.*)>/i)) {
                var str = String(RegExp.$1);
                var intArr = Zzy.FBF.StringToIntArr(str);
                obj.zzyFBF["canUseC"] = intArr;
            } else if (lineStr.match(/<ZZYFBF ACTOR:[ ](.*)>/i)) {
                var str = String(RegExp.$1);
                var intArr = Zzy.FBF.StringToIntArr(str);
                obj.zzyFBF["canUseA"] = intArr;
            } else if (lineStr.match(/<ZZYFBF NOCLASS:[ ](.*)>/i)) {
                var str = String(RegExp.$1);
                var intArr = Zzy.FBF.StringToIntArr(str);
                obj.zzyFBF["noCanUseC"] = intArr;
            } else if (lineStr.match(/<ZZYFBF NOACTOR:[ ](.*)>/i)) {
                var str = String(RegExp.$1);
                var intArr = Zzy.FBF.StringToIntArr(str);
                obj.zzyFBF["noCanUseA"] = intArr;
            } else if (lineStr.match(/<ZZYFBF CONDITION:[ ](.*)>/i)) {
                var evalStr = String(RegExp.$1);
                obj.zzyFBF["canUseEval"] = evalStr;
            } else if (lineStr.match(/<ZZYFBF TGR:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["spParam"][1] = value;
            } else if (lineStr.match(/<ZZYFBF TGRPER:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["spParamPer"][1] = value;
            } else if (lineStr.match(/<ZZYFBF GRD:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["spParam"][2] = value;
            } else if (lineStr.match(/<ZZYFBF GRDPER:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["spParamPer"][2] = value;
            } else if (lineStr.match(/<ZZYFBF REC:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["spParam"][3] = value;
            } else if (lineStr.match(/<ZZYFBF RECPER:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["spParamPer"][3] = value;
            } else if (lineStr.match(/<ZZYFBF PHA:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["spParam"][4] = value;
            } else if (lineStr.match(/<ZZYFBF PHAPER:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["spParamPer"][4] = value;
            } else if (lineStr.match(/<ZZYFBF MCR:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["spParam"][5] = value;
            } else if (lineStr.match(/<ZZYFBF MCRPER:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["spParamPer"][5] = value;
            } else if (lineStr.match(/<ZZYFBF TCR:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["spParam"][6] = value;
            } else if (lineStr.match(/<ZZYFBF TCRPER:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["spParamPer"][6] = value;
            } else if (lineStr.match(/<ZZYFBF PDR:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["spParam"][7] = value;
            } else if (lineStr.match(/<ZZYFBF PDRPER:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["spParamPer"][7] = value;
            } else if (lineStr.match(/<ZZYFBF MDR:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["spParam"][8] = value;
            } else if (lineStr.match(/<ZZYFBF MDRPER:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["spParamPer"][8] = value;
            } else if (lineStr.match(/<ZZYFBF FDR:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["spParam"][9] = value;
            } else if (lineStr.match(/<ZZYFBF FDRPER:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["spParamPer"][9] = value;
            } else if (lineStr.match(/<ZZYFBF EXP:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["spParam"][10] = value;
            } else if (lineStr.match(/<ZZYFBF EXPPER:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["spParamPer"][10] = value;
            } else if (lineStr.match(/<ZZYFBF GOLD:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["spParam"][11] = value;
            } else if (lineStr.match(/<ZZYFBF GOLDPER:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["spParamPer"][11] = value;
            } else if (lineStr.match(/<ZZYFBF DAR:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["spParam"][12] = value;
            } else if (lineStr.match(/<ZZYFBF DARPER:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["spParamPer"][12] = value;
            } else if (lineStr.match(/<ZZYFBF ELEMENT:[ ](.*)[ ](.*)>/i)) {
                var elId = parseInt(RegExp.$1);
                var value = String(RegExp.$2);
                obj.zzyFBF["elParam"][elId] = value;
            } else if (lineStr.match(/<ZZYFBF ELEMENTPER:[ ](.*)[ ](.*)>/i)) {
                var elId = parseInt(RegExp.$1);
                var value = String(RegExp.$2);
                obj.zzyFBF["elParamPer"][elId] = value;
            } else if (lineStr.match(/<ZZYFBF ESCPER:[ ](.*)>/i)) {
                var per = String(RegExp.$1);
                obj.zzyFBF["spParam"][13] = per;
            } else if (lineStr.match(/<ZZYFBF SNAKPER:[ ](.*)>/i)) {
                var per = String(RegExp.$1);
                obj.zzyFBF["spParam"][14] = per;
            } else if (lineStr.match(/<ZZYFBF BSAKPER:[ ](.*)>/i)) {
                var per = String(RegExp.$1);
                obj.zzyFBF["spParam"][15] = per;
            } else if (lineStr.match(/<ZZYFBF ENCT:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["spParam"][16] = value;
            } else if (lineStr.match(/<ZZYFBF ENCTPER:[ ](.*)>/i)) {
                var value = String(RegExp.$1);
                obj.zzyFBF["spParamPer"][16] = value;
            }
        }
    }
};

//=============================================================================
//Game_Actor
//=============================================================================

Zzy.FBF.Game_Actor_paramPlus = Game_Actor.prototype.paramPlus;
Game_Actor.prototype.paramPlus = function (paramId) {
    var value = Zzy.FBF.Game_Actor_paramPlus.call(this, paramId);
    var useArr = $gameSystem.GetZzyFBFActorFieldUseArr(this.actorId());
    value += this.ZzyFBFCalculationValue(useArr, paramId); //计算增益数值

    return Math.floor(value);
};

Game_Actor.prototype.ZzyFBFCalculationValue = function (
    itemArr,
    paramId //增益
) {
    var formula = undefined;

    var value = 0;
    var valuePer = 0;
    var srcValue = this.paramBase(paramId);

    for (
        var i = 0;
        i < itemArr.length;
        i++ //计算拥有的实量和百分比
    ) {
        var item = itemArr[i];
        if (item.zzyFBF.param[paramId] !== undefined) {
            formula = item.zzyFBF.param[paramId];
            value += $gameSystem.EvalZzyFBFFormula1(formula, this);
            value = value ? value : 0;
        }

        if (item.zzyFBF.paramPer[paramId] !== undefined) {
            formula = item.zzyFBF.paramPer[paramId];
            valuePer += $gameSystem.EvalZzyFBFFormula1(formula, this);
            valuePer = valuePer ? valuePer : 0;
        }
    }

    return value + srcValue * valuePer * 0.01;
};

//经验值
Zzy.FBF.Game_Actor_finalExpRate = Game_Actor.prototype.finalExpRate;
Game_Actor.prototype.finalExpRate = function () {
    var expRate = Zzy.FBF.Game_Actor_finalExpRate.call(this);
    var exExpRate = Zzy.FBF.SpParamPerValueOfActor(this, 10, expRate);

    return expRate + exExpRate;
};
Zzy.FBF.Game_Actor_gainExp = Game_Actor.prototype.gainExp;
Game_Actor.prototype.gainExp = function (exp) {
    var exExp = Zzy.FBF.SpParamValueOfActor(this, 10);
    exp += exExp; //添加额外经验值
    Zzy.FBF.Game_Actor_gainExp.call(this, exp);
};

//地板伤害
Zzy.FBF.Game_Actor_basicFloorDamage = Game_Actor.prototype.basicFloorDamage;
Game_Actor.prototype.basicFloorDamage = function () {
    var damage = Zzy.FBF.Game_Actor_basicFloorDamage.call(this);
    var exDamage = Zzy.FBF.SpParamPerValueOfActor(this, 9, damage);
    return Math.floor(damage + exDamage);
};

Zzy.FBF.Game_Actor_executeFloorDamage = Game_Actor.prototype.executeFloorDamage;
Game_Actor.prototype.executeFloorDamage = function () {
    Zzy.FBF.Game_Actor_executeFloorDamage.call(this);
    var exDamage = Zzy.FBF.SpParamValueOfActor(this, 9); //地板额外伤害
    exDamage = Math.min(exDamage, this.maxFloorDamage());
    this.gainHp(-exDamage);
    if (exDamage > 0) {
        this.performMapDamage();
    }
};

//===========================================================================
//Game_Action
//===========================================================================
Zzy.FBF.Game_Action_calcElementRate = Game_Action.prototype.calcElementRate;
Game_Action.prototype.calcElementRate = function (
    target //元素概率
) {
    var srcRate = Zzy.FBF.Game_Action_calcElementRate.call(this, target);
    var exRate = 0;
    if (target.isEnemy()) {
        var actor = this.subject();
        if (actor && actor.isActor()) {
            var elementId = this.item().damage.elementId;
            exRate = BattleManager.ZzyFBFElParamPerValueOfActor(elementId, actor, target);
        }
    }
    return srcRate + exRate;
};

Zzy.FBF.Game_Action_itemHit = Game_Action.prototype.itemHit;
Game_Action.prototype.itemHit = function (target) {
    var value = Zzy.FBF.Game_Action_itemHit.call(this, target);

    var exValue = 0;
    if (this.isPhysical() && this.subject() && this.subject().isActor()) {
        //物理命中
        exValue = BattleManager.ZzyFBFSetExParamValueOfActor(0, this.subject(), value, target);
    }
    return value + exValue;
};

Zzy.FBF.Game_Action_itemEva = Game_Action.prototype.itemEva;
Game_Action.prototype.itemEva = function (target) {
    var value = Zzy.FBF.Game_Action_itemEva.call(this, target);
    var exValue = 0;

    if (target && target.isActor()) {
        if (this.isPhysical()) {
            //物理闪避
            exValue = BattleManager.ZzyFBFSetExParamValueOfActor(1, target, value, this.subject());
        } else if (this.isMagical()) {
            //魔法闪避
            exValue = BattleManager.ZzyFBFSetExParamValueOfActor(4, target, value, this.subject());
        }
    }

    return value + exValue;
};

Zzy.FBF.Game_Action_itemCri = Game_Action.prototype.itemCri;
Game_Action.prototype.itemCri = function (target) {
    var value = Zzy.FBF.Game_Action_itemCri.call(this, target);
    var exValue = 0;
    if (this.item().damage.critical) {
        //存在暴击
        if (this.subject() && this.subject().isActor()) {
            //攻击者
            exValue = BattleManager.ZzyFBFSetExParamValueOfActor(2, this.subject(), value, target);
            return value + exValue;
        } else if (target && target.isActor()) {
            //防御者
            exValue = BattleManager.ZzyFBFSetExParamValueOfActor(3, target, value, target);
            return Math.max(0, value - exValue);
        }
    } else {
        return value;
    }
    return value;
};

Zzy.FBF.Game_Action_itemMrf = Game_Action.prototype.itemMrf;
Game_Action.prototype.itemMrf = function (target) {
    var value = Zzy.FBF.Game_Action_itemMrf.call(this, target);
    var exValue = 0;

    if (this.isMagical() && target && target.isActor()) {
        exValue = BattleManager.ZzyFBFSetExParamValueOfActor(5, target, value, this.subject());
    }
    return value + exValue;
};

Zzy.FBF.Game_Action_itemCnt = Game_Action.prototype.itemCnt;
Game_Action.prototype.itemCnt = function (target) {
    var value = Zzy.FBF.Game_Action_itemCnt.call(this, target);
    var exValue = 0;

    if (this.isPhysical() && target.canMove() && target && target.isActor()) {
        exValue = BattleManager.ZzyFBFSetExParamValueOfActor(6, target, value, this.subject());
    }
    return value + exValue;
};

//恢复效果 物理伤害 魔法伤害

Zzy.FBF.Game_Action_makeDamageValue = Game_Action.prototype.makeDamageValue;
Game_Action.prototype.makeDamageValue = function (target, critical) {
    var value = Zzy.FBF.Game_Action_makeDamageValue.call(this, target, critical);
    var item = this.item();
    var isRecover = false;
    if (target.isActor()) {
        var baseValue = this.evalDamageFormula(target);
        if (this.isPhysical()) {
            var exValue1 = Zzy.FBF.SpParamValueOfActor(target, 7, this.subject());
            var exValue2 = Zzy.FBF.SpParamPerValueOfActor(target, 7, value, this.subject());
            value += exValue1 + exValue2;
        }
        if (this.isMagical()) {
            var exValue1 = Zzy.FBF.SpParamValueOfActor(target, 8, this.subject());
            var exValue2 = Zzy.FBF.SpParamPerValueOfActor(target, 8, value, this.subject());
            value += exValue1 + exValue2;
        }
        if (baseValue < 0) {
            isRecover = true;
            var exValue1 = Zzy.FBF.SpParamValueOfActor(target, 3, this.subject());
            var exValue2 = Zzy.FBF.SpParamPerValueOfActor(target, 3, value, this.subject());
            value -= exValue1 + exValue2;
        }

        if (!isRecover) {
            //计算伤害减免
            var exValue1 = Zzy.FBF.SpParamValueOfActor(target, 12, this.subject());
            var exValue2 = Zzy.FBF.SpParamPerValueOfActor(target, 12, value, this.subject());

            value -= exValue1 + exValue2;
            value = value > 0 ? value : 0;
        }

        //value = this.applyVariance(value, item.damage.variance);
        //value = this.applyGuard(value, target);
    } else if (target.isEnemy()) {
        var actor = this.subject();
        if (actor && actor.isActor()) {
            //插入元素直接伤害
            var baseValue = this.evalDamageFormula(actor);

            var elementId = this.item().damage.elementId;
            var exValue = BattleManager.ZzyFBFElParamValueOfActor(elementId, actor);
            if (baseValue < 0) {
                value -= exValue;
                value = value < 0 ? value : 0;
            } else {
                value += exValue;
                value = value > 0 ? value : 0;
            }
        }
    }

    value = Math.round(value);

    return value;
};

//TP补充率
Zzy.FBF.Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function (target) {
    Zzy.FBF.Game_Action_applyItemUserEffect.call(this, target);
    if (target.isActor()) {
        var value = Math.floor(this.item().tpGain * this.subject().tcr);
        var exValue1 = Zzy.FBF.SpParamValueOfActor(target, 6, this.subject());
        var exValue2 = Zzy.FBF.SpParamPerValueOfActor(target, 6, value, this.subject());
        this.subject().gainSilentTp(exValue1 + exValue2);
    }
};

Zzy.FBF.Game_Action_itemEffectRecoverHp = Game_Action.prototype.itemEffectRecoverHp;
Game_Action.prototype.itemEffectRecoverHp = function (target, effect) {
    Zzy.FBF.Game_Action_itemEffectRecoverHp.call(this, target, effect);

    if (target.isActor() && this.isItem()) {
        var value = (target.mhp * effect.value1 + effect.value2) * target.rec;
        var exValue1 = Zzy.FBF.SpParamValueOfActor(target, 4, this.subject());
        var exValue2 = Zzy.FBF.SpParamPerValueOfActor(target, 4, value, this.subject());
        value += exValue1 + exValue2;
    }
    value = Math.floor(value);
    if (value !== 0) {
        target.gainHp(value);
        this.makeSuccess(target);
    }
};

Zzy.FBF.Game_Action_itemEffectRecoverMp = Game_Action.prototype.itemEffectRecoverMp;
Game_Action.prototype.itemEffectRecoverMp = function (target, effect) {
    Zzy.FBF.Game_Action_itemEffectRecoverMp.call(this, target, effect);

    if (target.isActor() && this.isItem()) {
        var value = (target.mmp * effect.value1 + effect.value2) * target.rec;
        var exValue1 = Zzy.FBF.SpParamValueOfActor(target, 4, this.subject());
        var exValue2 = Zzy.FBF.SpParamPerValueOfActor(target, 4, value, this.subject());
        value += exValue1 + exValue2;
    }
    value = Math.floor(value);
    if (value !== 0) {
        target.gainMp(value);
        this.makeSuccess(target);
    }
};

Zzy.FBF.Game_Action_applyGuard = Game_Action.prototype.applyGuard;
Game_Action.prototype.applyGuard = function (damage, target) {
    if (target.isActor()) {
        var exValue1 = Zzy.FBF.SpParamValueOfActor(target, 2, this.subject());
        var exValue2 = Zzy.FBF.SpParamPerValueOfActor(target, 2, target.grd, this.subject());
        var result = exValue1 + exValue2 + target.grd;
        return damage / (damage > 0 && target.isGuard() ? 2 * result : 1);
    }
    return Zzy.FBF.Game_Action_applyGuard.call(this, damage, target);
};

//=============================================================================
//Game_Unit
//=============================================================================

Game_Unit.prototype.tgrSum = function () {
    return this.aliveMembers().reduce(function (r, member) {
        var exValue1 = Zzy.FBF.SpParamValueOfActor(member, 1);
        var exValue2 = Zzy.FBF.SpParamPerValueOfActor(member, 1, member.tgr);
        return r + member.tgr + exValue1 + exValue2;
    }, 0);
};

Game_Unit.prototype.randomTarget = function () {
    var tgrRand = Math.random() * this.tgrSum();
    var target = null;
    this.aliveMembers().forEach(function (member) {
        var exValue1 = Zzy.FBF.SpParamValueOfActor(member, 1);
        var exValue2 = Zzy.FBF.SpParamPerValueOfActor(member, 1, member.tgr);

        tgrRand -= member.tgr + exValue1 + exValue2;
        if (tgrRand <= 0 && !target) {
            target = member;
        }
    });
    return target;
};

//=============================================================================
//Game_Player
//=============================================================================
Zzy.FBF.Game_Player_makeEncounterCount = Game_Player.prototype.makeEncounterCount;
Game_Player.prototype.makeEncounterCount = function () //遇敌人步数
{
    Zzy.FBF.Game_Player_makeEncounterCount.call(this);

    var totalV1 = 0;
    var totalV2 = 0;
    for (var i = 0; i < $gameParty._actors.length; i++) {
        var actorId = $gameParty._actors[i];
        var actor = $gameActors.actor(actorId);

        totalV1 += Zzy.FBF.SpParamValueOfActor(actor, 16);
        totalV2 += Zzy.FBF.SpParamPerValueOfActor(actor, 16, this._encounterCount);
    }

    this._encounterCount += totalV1;
    this._encounterCount += totalV2;
};

//=============================================================================
//BattleManager
//=============================================================================

BattleManager.ZzyFBFElParamPerValueOfActor = function (elementId, target, enemy) {
    var actor = target;
    //遍历所有领域
    var formula = undefined;
    var useArr = $gameSystem.GetZzyFBFActorFieldUseArr(actor.actorId());
    var exPer = 0;

    for (var i = 0; i < useArr.length; i++) {
        var item = useArr[i];

        if (item.zzyFBF.elParamPer[elementId] !== undefined) {
            formula = item.zzyFBF.elParamPer[elementId];
            exPer += $gameSystem.EvalZzyFBFFormula1(formula, actor, enemy);
            exPer = exPer ? exPer : 0;
        }
    }
    return exPer * 0.01;
};

BattleManager.ZzyFBFElParamValueOfActor = function (elementId, target) {
    var actor = target;
    //遍历所有领域
    var formula = undefined;
    var useArr = $gameSystem.GetZzyFBFActorFieldUseArr(actor.actorId());
    var exValue = 0;

    for (var i = 0; i < useArr.length; i++) {
        var item = useArr[i];
        if (item.zzyFBF.elParam[elementId] !== undefined) {
            formula = item.zzyFBF.elParam[elementId];
            exValue += $gameSystem.EvalZzyFBFFormula1(formula, actor);
            exValue = exValue ? exValue : 0;
        }
    }
    return exValue;
};

//增加金币
Zzy.FBF.BattleManager_gainGold = BattleManager.gainGold;
BattleManager.gainGold = function () {
    Zzy.FBF.BattleManager_gainGold.call(this);

    var gold = this._rewards.gold; //原始金币
    var totalV1 = 0;
    var totalV2 = 0;

    for (var i = 0; i < $gameParty._actors.length; i++) {
        var actorId = $gameParty._actors[i];
        var actor = $gameActors.actor(actorId);

        totalV1 += Zzy.FBF.SpParamValueOfActor(actor, 11);
        totalV2 += Zzy.FBF.SpParamPerValueOfActor(actor, 11, gold);
    }

    $gameParty.gainGold(totalV1 + totalV2);
};

BattleManager.ZzyFBFSetExParamValueOfActor = function (exParamId, target, exSrcValue, enemy) {
    exSrcValue = exSrcValue ? exSrcValue : 0;

    var actor = target;
    //遍历所有领域
    var formula = undefined;
    var useArr = $gameSystem.GetZzyFBFActorFieldUseArr(actor.actorId());
    var exValue = 0;
    var exValuePer = 0;

    for (var i = 0; i < useArr.length; i++) {
        var item = useArr[i];
        if (item.zzyFBF.exParam[exParamId] !== undefined) {
            formula = item.zzyFBF.exParam[exParamId];
            exValue += $gameSystem.EvalZzyFBFFormula1(formula, actor, enemy);
            exValue = exValue ? exValue : 0;
        }

        if (item.zzyFBF.exParamPer[exParamId] !== undefined) {
            formula = item.zzyFBF.exParamPer[exParamId];
            exValuePer += $gameSystem.EvalZzyFBFFormula1(formula, actor, enemy);
            exValuePer = exValuePer ? exValuePer : 0;
        }
    }
    return exValue + exSrcValue * exValuePer * 0.01;
};

//逃跑
Zzy.FBF.BattleManager_BattleManager = BattleManager.makeEscapeRatio;
BattleManager.makeEscapeRatio = function () {
    Zzy.FBF.BattleManager_BattleManager.call(this);
    //改变逃跑概率
    var actorArr = $gameParty.battleMembers();
    for (var i = 0; i < actorArr.length; i++) {
        var value = Zzy.FBF.SpParamValueOfActor(actorArr[i], 13);
        this._escapeRatio += value * 0.01;
    }
};

//先发制人
Zzy.FBF.BattleManager_ratePreemptive = BattleManager.ratePreemptive;
BattleManager.ratePreemptive = function () //先发制人概率
{
    var rate = Zzy.FBF.BattleManager_ratePreemptive.call(this);
    var exRate = 0;
    var actorArr = $gameParty.battleMembers();
    for (var i = 0; i < actorArr.length; i++) {
        var value = Zzy.FBF.SpParamValueOfActor(actorArr[i], 14);
        exRate += value * 0.01;
    }
    return rate + exRate;
};

//被偷袭
Zzy.FBF.BattleManager_rateSurprise = BattleManager.rateSurprise;
BattleManager.rateSurprise = function () {
    var rate = Zzy.FBF.BattleManager_rateSurprise.call(this);
    var exRate = 0;
    var actorArr = $gameParty.battleMembers();
    for (var i = 0; i < actorArr.length; i++) {
        var value = Zzy.FBF.SpParamValueOfActor(actorArr[i], 15);
        exRate += value * 0.01;
    }
    return rate + exRate;
};

//=============================================================================
//Game_BattlerBase
//=============================================================================
Zzy.FBF.Game_BattlerBase_skillMpCost = Game_BattlerBase.prototype.skillMpCost;
Game_BattlerBase.prototype.skillMpCost = function (skill) {
    var value = Zzy.FBF.Game_BattlerBase_skillMpCost.call(this, skill);
    if (this.isActor() && skill.id !== 1 && skill.id !== 2) {
        //排除攻击和防御
        var exValue1 = Zzy.FBF.SpParamValueOfActor(this, 5);
        var exValue2 = Zzy.FBF.SpParamPerValueOfActor(this, 5, value);
        return Math.floor(value + exValue1 + exValue2);
    }
    return value;
};

//=============================================================================
//Game_Battler
//=============================================================================

//TP补充率

Zzy.FBF.Game_Battler_chargeTpByDamage = Game_Battler.prototype.chargeTpByDamage;
Game_Battler.prototype.chargeTpByDamage = function (damageRate) {
    Zzy.FBF.Game_Battler_chargeTpByDamage.call(this, damageRate);
    if (this.isActor()) {
        var value = Math.floor(50 * damageRate * this.tcr);
        var exValue1 = Zzy.FBF.SpParamValueOfActor(this, 6);
        var exValue2 = Zzy.FBF.SpParamPerValueOfActor(this, 6, value);
        this.gainSilentTp(exValue1 + exValue2);
    }
};

Zzy.FBF.Game_Battler_regenerateHp = Game_Battler.prototype.regenerateHp; //HP自动恢复
Game_Battler.prototype.regenerateHp = function () {
    Zzy.FBF.Game_Battler_regenerateHp.call(this);
    var exValue = 0;
    var exSrcValue = Math.floor(this.mhp);
    if (this.isActor()) {
        exValue = BattleManager.ZzyFBFSetExParamValueOfActor(7, this, exSrcValue);
        if (exValue !== 0) {
            this.gainHp(exValue);
        }
    }
};

Zzy.FBF.Game_Battler_regenerateMp = Game_Battler.prototype.regenerateMp; //MP自动恢复
Game_Battler.prototype.regenerateMp = function () {
    Zzy.FBF.Game_Battler_regenerateMp.call(this);
    var exValue = 0;

    var exSrcValue = Math.floor(this.mmp);

    if (this.isActor()) {
        exValue = BattleManager.ZzyFBFSetExParamValueOfActor(8, this, exSrcValue);

        if (exValue !== 0) {
            this.gainMp(exValue);
        }
    }
};

Zzy.FBF.Game_Battler_regenerateTp = Game_Battler.prototype.regenerateTp; //TP自动恢复
Game_Battler.prototype.regenerateTp = function () {
    Zzy.FBF.Game_Battler_regenerateTp.call(this);
    var exValue = 0;
    var exSrcValue = Math.floor(100);
    if (this.isActor()) {
        exValue = BattleManager.ZzyFBFSetExParamValueOfActor(9, this, exSrcValue);
        if (exValue !== 0) {
            this.gainSilentTp(exValue);
        }
    }
};

//-----------------------------------------------Zzy.FBF.Function------------------------------------------
Zzy.FBF.OpenFieldOfActor = function (
    actorId //调用打开一个角色的领域
) {
    if (!$gameActors.actor(actorId)) {
        console.log("Error:来自LiuYue_FileBless,检查Open指令填写角色ID是否正确");
        return;
    }
    if (!(SceneManager._scene instanceof Scene_Map)) {
        console.log("Error:来自LiuYue_FileBless,请在地图界面使用Open指令");
        return;
    }

    $gameSystem.SetZzyFBFSelectActorIndex(actorId);
    SceneManager.push(Scene_ZzyFBF); //压入场景
};

Zzy.FBF.OpenFieldOfParty = function (index) {
    var actorId = $gameParty._actors[index];
    if (!actorId) {
        console.log("Error:来自LiuYue_FileBless,检查Open指令填写队伍队员ID是否正确");
        return;
    }
    Zzy.FBF.OpenFieldOfActor(actorId);
};

Zzy.FBF.PlaySE = function (
    soundID //播放声音
) {
    var se = Zzy.Param.FBFAllSE[soundID];

    if (se && se.name) {
        AudioManager.playSe(se);
    }
};

Zzy.FBF.KeepNumber = function (num) {
    if (num === undefined || num === NaN) {
        return 0;
    }
    return num;
};

Zzy.FBF.StringToIntArr = function (str) {
    var strArr = str.split("str");
    var len = strArr.length;
    var intArr = [];
    for (var i = 0; i < len; i++) {
        intArr[i] = parseInt(strArr[i]);
    }
    return intArr;
};

Zzy.FBF.SpParamValueOfActor = function (actor, spParamId, target) {
    var formula = undefined;
    var useArr = $gameSystem.GetZzyFBFActorFieldUseArr(actor.actorId());
    var spValue = 0;

    for (var i = 0; i < useArr.length; i++) {
        var item = useArr[i];
        if (item.zzyFBF.spParam[spParamId] !== undefined) {
            formula = item.zzyFBF.spParam[spParamId];
            spValue += $gameSystem.EvalZzyFBFFormula1(formula, actor, target);
            spValue = spValue ? spValue : 0;
        }
    }
    return spValue;
};

Zzy.FBF.SpParamPerValueOfActor = function (actor, spParamId, srcParam, target) {
    srcParam = srcParam ? srcParam : 0;
    var formula = undefined;
    var useArr = $gameSystem.GetZzyFBFActorFieldUseArr(actor.actorId());
    var spValuePer = 0;

    for (var i = 0; i < useArr.length; i++) {
        var item = useArr[i];
        if (item.zzyFBF.spParamPer[spParamId] !== undefined) {
            formula = item.zzyFBF.spParamPer[spParamId];
            spValuePer += $gameSystem.EvalZzyFBFFormula1(formula, actor, target);
            spValuePer = spValuePer ? spValuePer : 0;
        }
    }
    return srcParam * spValuePer * 0.01;
};

//-----------------------------------------------Zzy.FBF.Function------------------------------------------

Zzy.FBF.EnableMenu = function (enable) {
    $gameSystem.SetZzyFBFEnableMenu(enable);
};

Zzy.FBF.InsertMenu = function (enable) {
    $gameSystem.SetZzyFBFInsertMenu(enable);
};

Zzy.FBF.CommandName = function (commandText) {
    $gameSystem.SetZzyFBFMenuCommandName(commandText);
};

Zzy.FBF.EnableSMenu = function (enable) {
    $gameSystem.SetZzyFBFEnableSMenu(enable);
};

Zzy.FBF.InsertSMenu = function (enable) {
    $gameSystem.SetZzyFBFInsertSMenu(enable);
};

Zzy.FBF.SCommandName = function (commandText) {
    $gameSystem.SetZzyFBFSMenuCommandName(commandText);
};

Zzy.FBF.OpenActor = function (actorId) {
    Zzy.FBF.OpenFieldOfActor(actorId);
};

Zzy.FBF.OpenParty = function (index) {
    Zzy.FBF.OpenFieldOfParty(index);
};

Zzy.FBF.EnableActorFB = function (enable) {
    $gameSystem.SetZzyFBFEnableActorFB(enable);
};

Zzy.FBF.MaxCount = function (formula) {
    $gameSystem.SetZzyFBFMaxFieldCount(formula);
};

Zzy.FBF.CurrentCount = function (formula) {
    $gameSystem.SetZzyFBFCurrentFieldCount(formula);
};

Zzy.FBF.MemoryCount = function (count) {
    $gameSystem.SetZzyFBFMemoryCount(count);
};

Zzy.FBF.ForceUnInstallAll = function (actorId) {
    $gameSystem.ZzyFBFForceUnInstallAll(actorId);
};
