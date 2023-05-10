/*:
 * @plugindesc v1.03 LiuYue_SimpleFunction 简易函数调用
 * @author 流逝的岁月
 *
 * @help
 * ============================================================================
 * 介绍
 * ============================================================================ *
 *
 * 提供基于原版的函数功能提供拓展,更方便调用脚本函数来实现想要的效果
 * 
 *
 *
 *
 *---------------------------------------------------------
 *
 *使用条例：本插件完全免费，随意魔改
 *
 *---------------------------------------------------------
 *
 *
 * 注意括号不要输入中文,会不被识别的！
 *
 *
 *
 *以下是可以调用的插件指令
 *---------------------Plugin Command---------------------
 *
 *
 *
 *
 *
 * 以下是拓展脚本函数的介绍,注意可以使用 中文,英文 两种方法来调用
 * 调用方式即为写入'脚本'中
 * 
 *
 * 设置角色血量值(角色ID,数值)                                     //修改一个角色的血量为某值         actorId要求填写角色ID值            value要求填写想更改的数值
 * Zzy.SFF.SetActorHP(actorId , value)                             //修改一个角色的血量为某值         actorId要求填写角色ID值            value要求填写想更改的数值
 *
 * 变量设置角色血量值(角色ID,变量ID)                               //修改一个角色的血量为某个变量值   actorId要求填写角色ID值            variableId要求填写变量ID值
 * Zzy.SFF.SetActorHPV(actorId , variableId)                       //修改一个角色的血量为某个变量值   actorId要求填写角色ID值            variableId要求填写变量ID值
 *
 * 设置角色最大血量值(角色ID,数值)                                 //修改一个角色的最大血量为某值
 * Zzy.SFF.SetActorMaxHp(actorId , value)                          //修改一个角色的最大血量为某值
 * 
 * 变量设置角色最大血量值(角色ID,变量ID)                           //修改一个角色的最大血量为某个变量值
 * Zzy.SFF.SetActorMaxHpV(actorId , variableId)                    //修改一个角色的最大血量为某个变量值
 *
 * 设置角色蓝量值(角色ID,数值)                                     //修改一个角色的蓝量为某值
 * Zzy.SFF.SetActorMP(actorId , value)                             //修改一个角色的蓝量为某值
 *  
 * 变量设置角色蓝量值(角色ID,变量ID)                               //修改一个角色的蓝量为某个变量值
 * Zzy.SFF.SetActorMPV(actorId , variableId)                       //修改一个角色的蓝量为某个变量值
 * 
 * 设置角色最大蓝量值(角色ID,数值)                                 //修改一个角色的最大蓝量为某值
 * Zzy.SFF.SetActorMaxMp(actorId , value)                          //修改一个角色的最大蓝量为某值
 * 
 * 变量设置角色最大蓝量值(角色ID,变量ID)                           //修改一个角色的最大蓝量为某个变量值
 * Zzy.SFF.SetActorMaxMpV(actorId , variableId)                    //修改一个角色的最大蓝量为某个变量值
 *
 * 设置角色攻击值(角色ID,数值)                                     //修改一个角色的攻击力为某值    
 * Zzy.SFF.SetActorATK(actorId , value)                            //修改一个角色的攻击力为某值
 *
 * 变量设置角色攻击值(角色ID,变量ID)                               //修改一个角色的攻击力为某个变量值
 * Zzy.SFF.SetActorATKV(actorId , variableId)                      //修改一个角色的攻击力为某个变量值
 *
 * 设置角色防御值(角色ID,数值)                                     //修改一个角色的防御力为某值
 * Zzy.SFF.SetActorDEF(actorId , value)                            //修改一个角色的防御力为某值
 *
 * 变量设置角色防御值(角色ID,变量ID)                               //修改一个角色的防御力为某个变量值
 * Zzy.SFF.SetActorDEFV(actorId , variableId)                      //修改一个角色的防御力为某个变量值
 *
 * 设置角色魔攻值(角色ID,数值)                                     //修改一个角色的魔攻为某值
 * Zzy.SFF.SetActorMAT(actorId , value)                            //修改一个角色的魔攻为某值
 * 
 * 变量设置角色魔攻值(角色ID,变量ID)                               //修改一个角色的魔攻为某个变量值
 * Zzy.SFF.SetActorMATV(actorId , variableId)                      //修改一个角色的魔攻为某个变量值
 * 
 * 设置角色魔防值(角色ID,数值)                                     //修改一个角色的魔防为某值
 * Zzy.SFF.SetActorMDF(actorId , value)                            //修改一个角色的魔防为某值
 *
 * 变量设置角色魔防值(角色ID,变量ID)                               //修改一个角色的魔防为某个变量值
 * Zzy.SFF.SetActorMDFV(actorId , variableId)                      //修改一个角色的魔防为某个变量值
 *
 * 设置角色速度值(角色ID,数值)                                     //修改一个角色的速度为某值
 * Zzy.SFF.SetActorAGI(actorId , value)                            //修改一个角色的速度为某值
 * 
 * 变量设置角色速度值(角色ID,变量ID)                               //修改一个角色的速度为某个变量值
 * Zzy.SFF.SetActorAGIV(actorId , variableId)                      //修改一个角色的速度为某个变量值
 * 
 * 设置角色幸运值(角色ID,数值)                                     //修改一个角色的幸运为某值                    
 * Zzy.SFF.SetActorLUK(actorId , value)                            //修改一个角色的幸运为某值
 * 
 * 变量设置角色幸运值(角色ID,变量ID)                               //修改一个角色的幸运为某个变量值
 * Zzy.SFF.SetActorLUKV(actorId , variableId)                      //修改一个角色的幸运为某个变量值
 * 
 *
 *
 * 增加角色命中率(角色ID,数值)                                     //增加一个角色的命中率,其中数值将会对等百分比,如输入50,则角色命中率会增加50%
 * Zzy.SFF.AddActorHIT(actorId , value)                            //增加一个角色的命中率,其中数值将会对等百分比,如输入50,则角色命中率会增加50%
 *
 * 减少角色命中率(角色ID,数值)                                     //减少一个角色的命中率
 * Zzy.SFF.SubActorHIT(actorId , value)                            //减少一个角色的命中率
 *
 * 变量增加角色命中率(角色ID,变量ID)                               //增加一个角色的命中率
 * Zzy.SFF.AddActorHITV(actorId , variableId)                      //增加一个角色的命中率
 *
 * 变量减少角色命中率(角色ID,变量ID)                               //减少一个角色的命中率
 * Zzy.SFF.SubActorHITV(actorId , variableId)                      //减少一个角色的命中率
 *
 *
 *
 * 增加角色回避率(角色ID,数值)                                     //增加一个角色的回避率
 * Zzy.SFF.AddActorEVA(actorId , value)                            //增加一个角色的回避率
 * 
 * 减少角色回避率(角色ID,数值)                                     //减少一个角色的回避率
 * Zzy.SFF.SubActorEVA(actorId , value)                            //减少一个角色的回避率
 *
 * 变量增加角色回避率(角色ID,变量ID)                               //增加一个角色的回避率
 * Zzy.SFF.AddActorEVAV(actorId , variableId)                      //增加一个角色的回避率
 *
 * 变量减少角色回避率(角色ID,变量ID)                               //减少一个角色的回避率
 * Zzy.SFF.SubActorEVAV(actorId , variableId)                      //减少一个角色的回避率
 *
 *
 *
 *
 * 增加角色暴击率(角色ID,数值)                                     //增加一个角色的暴击率
 * Zzy.SFF.AddActorCRI(actorId , value)                            //增加一个角色的暴击率
 * 
 * 减少角色暴击率(角色ID,数值)                                     //减少一个角色的暴击率
 * Zzy.SFF.SubActorCRI(actorId , value)                            //减少一个角色的暴击率
 *
 * 变量增加角色暴击率(角色ID,变量ID)                               //增加一个角色的暴击率
 * Zzy.SFF.AddActorCRIV(actorId , variableId)                      //增加一个角色的暴击率
 *
 * 变量减少角色暴击率(角色ID,变量ID)                               //减少一个角色的暴击率
 * Zzy.SFF.SubActorCRIV(actorId , variableId)                      //减少一个角色的暴击率
 *
 *
 *
 *
 * 增加角色暴击回避(角色ID,数值)                                   //增加一个角色的暴击回避
 * Zzy.SFF.AddActorCEV(actorId , value)                            //增加一个角色的暴击回避
 * 
 * 减少角色暴击回避(角色ID,数值)                                   //减少一个角色的暴击回避
 * Zzy.SFF.SubActorCEV(actorId , value)                            //减少一个角色的暴击回避
 *
 * 变量增加角色暴击回避(角色ID,变量ID)                             //增加一个角色的暴击回避
 * Zzy.SFF.AddActorCEVV(actorId , variableId)                      //增加一个角色的暴击回避
 *
 * 变量减少角色暴击回避(角色ID,变量ID)                             //减少一个角色的暴击回避
 * Zzy.SFF.SubActorCEVV(actorId , variableId)                      //减少一个角色的暴击回避
 *
 *
 *
 * 增加角色魔法回避(角色ID,数值)                                   //增加一个角色的魔法回避
 * Zzy.SFF.AddActorMEV(actorId , value)                            //增加一个角色的魔法回避
 * 
 * 减少角色魔法回避(角色ID,数值)                                   //减少一个角色的魔法回避
 * Zzy.SFF.SubActorMEV(actorId , value)                            //减少一个角色的魔法回避
 *
 * 变量增加角色魔法回避(角色ID,变量ID)                             //增加一个角色的魔法回避
 * Zzy.SFF.AddActorMEVV(actorId , variableId)                      //增加一个角色的魔法回避
 *
 * 变量减少角色魔法回避(角色ID,变量ID)                             //减少一个角色的魔法回避
 * Zzy.SFF.SubActorMEVV(actorId , variableId)                      //减少一个角色的魔法回避
 *
 *
 *
 *
 * 增加角色魔法反射(角色ID,数值)                                   //增加一个角色的魔法反射
 * Zzy.SFF.AddActorMRF(actorId , value)                            //增加一个角色的魔法反射
 * 
 * 减少角色魔法反射(角色ID,数值)                                   //减少一个角色的魔法反射
 * Zzy.SFF.SubActorMRF(actorId , value)                            //减少一个角色的魔法反射
 *
 * 变量增加角色魔法反射(角色ID,变量ID)                             //增加一个角色的魔法反射
 * Zzy.SFF.AddActorMRFV(actorId , variableId)                      //增加一个角色的魔法反射
 *
 * 变量减少角色魔法反射(角色ID,变量ID)                             //减少一个角色的魔法反射
 * Zzy.SFF.SubActorMRFV(actorId , variableId)                      //减少一个角色的魔法反射
 *
 *
 *
 *
 * 增加角色反击(角色ID,数值)                                       //增加一个角色的反击
 * Zzy.SFF.AddActorCNT(actorId , value)                            //增加一个角色的反击
 * 
 * 减少角色反击(角色ID,数值)                                       //减少一个角色的反击
 * Zzy.SFF.SubActorCNT(actorId , value)                            //减少一个角色的反击
 *
 * 变量增加角色角色反击(角色ID,变量ID)                             //增加一个角色的角色反击
 * Zzy.SFF.AddActorCNTV(actorId , variableId)                      //增加一个角色的角色反击
 *
 * 变量减少角色角色反击(角色ID,变量ID)                             //减少一个角色的角色反击
 * Zzy.SFF.SubActorCNTV(actorId , variableId)                      //减少一个角色的角色反击
 *
 *
 *
 *
 * 增加角色HP自动恢复(角色ID,数值)                                 //增加一个角色的HP自动恢复
 * Zzy.SFF.AddActorHRG(actorId , value)                            //增加一个角色的HP自动恢复
 * 
 * 减少角色HP自动恢复(角色ID,数值)                                 //减少一个角色的HP自动恢复
 * Zzy.SFF.SubActorHRG(actorId , value)                            //减少一个角色的HP自动恢复
 *
 * 变量增加角色HP自动恢复(角色ID,变量ID)                           //增加一个角色的HP自动恢复
 * Zzy.SFF.AddActorHRGV(actorId , variableId)                      //增加一个角色的HP自动恢复
 *
 * 变量减少角色HP自动恢复(角色ID,变量ID)                           //减少一个角色的HP自动恢复
 * Zzy.SFF.SubActorHRGV(actorId , variableId)                      //减少一个角色的HP自动恢复
 *
 *
 *
 *
 * 增加角色MP自动恢复(角色ID,数值)                                 //增加一个角色的MP自动恢复
 * Zzy.SFF.AddActorMRG(actorId , value)                            //增加一个角色的MP自动恢复
 * 
 * 减少角色MP自动恢复(角色ID,数值)                                 //减少一个角色的MP自动恢复
 * Zzy.SFF.SubActorMRG(actorId , value)                            //减少一个角色的MP自动恢复
 *
 * 变量增加角色MP自动恢复(角色ID,变量ID)                             //增加一个角色的MP自动恢复
 * Zzy.SFF.AddActorMRGV(actorId , variableId)                      //增加一个角色的MP自动恢复
 *
 * 变量减少角色MP自动恢复(角色ID,变量ID)                             //减少一个角色的MP自动恢复
 * Zzy.SFF.SubActorMRGV(actorId , variableId)                      //减少一个角色的MP自动恢复
 *
 *
 *
 *
 * 增加角色TP自动恢复(角色ID,数值)                                 //增加一个角色的TP自动恢复
 * Zzy.SFF.AddActorTRG(actorId , value)                            //增加一个角色的TP自动恢复
 * 
 * 减少角色TP自动恢复(角色ID,数值)                                 //减少一个角色的TP自动恢复
 * Zzy.SFF.SubActorTRG(actorId , value)                            //减少一个角色的TP自动恢复
 *
 * 变量增加角色TP自动恢复(角色ID,变量ID)                             //增加一个角色的TP自动恢复
 * Zzy.SFF.AddActorTRGV(actorId , variableId)                      //增加一个角色的TP自动恢复
 *
 * 变量减少角色TP自动恢复(角色ID,变量ID)                             //减少一个角色的TP自动恢复
 * Zzy.SFF.SubActorTRGV(actorId , variableId)                      //减少一个角色的TP自动恢复
 *
 *
 *
 * 增加角色受到攻击几率(角色ID,数值)                               //增加一个角色的受到攻击几率
 * Zzy.SFF.AddActorTGR(actorId , value)                            //增加一个角色的受到攻击几率
 * 
 * 减少角色受到攻击几率(角色ID,数值)                               //减少一个角色的受到攻击几率
 * Zzy.SFF.SubActorTGR(actorId , value)                            //减少一个角色的受到攻击几率
 *
 * 变量增加角色受到攻击几率(角色ID,变量ID)                         //增加一个角色的受到攻击几率
 * Zzy.SFF.AddActorTGRV(actorId , variableId)                      //增加一个角色的受到攻击几率
 *
 * 变量减少角色受到攻击几率(角色ID,变量ID)                         //减少一个角色的受到攻击几率
 * Zzy.SFF.SubActorTGRV(actorId , variableId)                      //减少一个角色的受到攻击几率
 *
 *
 *
 *
 * 增加角色防御效果(角色ID,数值)                                   //增加一个角色的防御效果
 * Zzy.SFF.AddActorGRD(actorId , value)                            //增加一个角色的防御效果
 * 
 * 减少角色防御效果(角色ID,数值)                                   //减少一个角色的防御效果
 * Zzy.SFF.SubActorGRD(actorId , value)                            //减少一个角色的防御效果
 *
 * 变量增加角色防御效果(角色ID,变量ID)                             //增加一个角色的防御效果
 * Zzy.SFF.AddActorGRDV(actorId , variableId)                      //增加一个角色的防御效果
 *
 * 变量减少角色防御效果(角色ID,变量ID)                             //减少一个角色的防御效果
 * Zzy.SFF.SubActorGRDV(actorId , variableId)                      //减少一个角色的防御效果
 *
 *
 *
 *
 * 增加角色恢复效果(角色ID,数值)                                   //增加一个角色的恢复效果
 * Zzy.SFF.AddActorREC(actorId , value)                            //增加一个角色的恢复效果
 * 
 * 减少角色恢复效果(角色ID,数值)                                   //减少一个角色的恢复效果
 * Zzy.SFF.SubActorREC(actorId , value)                            //减少一个角色的恢复效果
 *
 * 变量增加角色恢复效果(角色ID,变量ID)                             //增加一个角色的恢复效果
 * Zzy.SFF.AddActorRECV(actorId , variableId)                      //增加一个角色的恢复效果
 *
 * 变量减少角色恢复效果(角色ID,变量ID)                             //减少一个角色的恢复效果
 * Zzy.SFF.SubActorRECV(actorId , variableId)                      //减少一个角色的恢复效果
 *
 *
 *
 *
 * 增加角色药理知识(角色ID,数值)                                   //增加一个角色的药理知识
 * Zzy.SFF.AddActorPHA(actorId , value)                            //增加一个角色的药理知识
 * 
 * 减少角色药理知识(角色ID,数值)                                   //减少一个角色的药理知识
 * Zzy.SFF.SubActorPHA(actorId , value)                            //减少一个角色的药理知识
 *
 * 变量增加角色药理知识(角色ID,变量ID)                             //增加一个角色的药理知识
 * Zzy.SFF.AddActorPHAV(actorId , variableId)                      //增加一个角色的药理知识
 *
 * 变量减少角色药理知识(角色ID,变量ID)                             //减少一个角色的药理知识
 * Zzy.SFF.SubActorPHAV(actorId , variableId)                      //减少一个角色的药理知识
 *
 *
 *
 *
 * 增加角色MP消耗率(角色ID,数值)                                   //增加一个角色的MP消耗率
 * Zzy.SFF.AddActorMCR(actorId , value)                            //增加一个角色的MP消耗率
 * 
 * 减少角色MP消耗率(角色ID,数值)                                   //减少一个角色的MP消耗率
 * Zzy.SFF.SubActorMCR(actorId , value)                            //减少一个角色的MP消耗率
 *
 * 变量增加角色MP消耗率(角色ID,变量ID)                             //增加一个角色的MP消耗率
 * Zzy.SFF.AddActorMCRV(actorId , variableId)                      //增加一个角色的MP消耗率
 *
 * 变量减少角色MP消耗率(角色ID,变量ID)                             //减少一个角色的MP消耗率
 * Zzy.SFF.SubActorMCRV(actorId , variableId)                      //减少一个角色的MP消耗率
 *
 *
 *
 *
 * 增加角色TP消耗率(角色ID,数值)                                   //增加一个角色的TP消耗率
 * Zzy.SFF.AddActorTCR(actorId , value)                            //增加一个角色的TP消耗率
 * 
 * 减少角色TP消耗率(角色ID,数值)                                   //减少一个角色的TP消耗率
 * Zzy.SFF.SubActorTCR(actorId , value)                            //减少一个角色的TP消耗率
 *
 * 变量增加角色TP消耗率(角色ID,变量ID)                             //增加一个角色的TP消耗率
 * Zzy.SFF.AddActorTCRV(actorId , variableId)                      //增加一个角色的TP消耗率
 *
 * 变量减少角色TP消耗率(角色ID,变量ID)                             //减少一个角色的TP消耗率
 * Zzy.SFF.SubActorTCRV(actorId , variableId)                      //减少一个角色的TP消耗率
 *
 *
 *
 *
 * 增加角色物理伤害率(角色ID,数值)                                 //增加一个角色的物理伤害率
 * Zzy.SFF.AddActorPDR(actorId , value)                            //增加一个角色的物理伤害率
 * 
 * 减少角色物理伤害率(角色ID,数值)                                 //减少一个角色的物理伤害率
 * Zzy.SFF.SubActorPDR(actorId , value)                            //减少一个角色的物理伤害率
 *
 * 变量增加角色物理伤害率(角色ID,变量ID)                           //增加一个角色的物理伤害率
 * Zzy.SFF.AddActorPDRV(actorId , variableId)                      //增加一个角色的物理伤害率
 *
 * 变量减少角色物理伤害率(角色ID,变量ID)                           //减少一个角色的物理伤害率
 * Zzy.SFF.SubActorPDRV(actorId , variableId)                      //减少一个角色的物理伤害率
 *
 *
 *
 *
 * 增加角色魔法伤害率(角色ID,数值)                                 //增加一个角色的魔法伤害率
 * Zzy.SFF.AddActorMDR(actorId , value)                            //增加一个角色的魔法伤害率
 * 
 * 减少角色魔法伤害率(角色ID,数值)                                 //减少一个角色的魔法伤害率
 * Zzy.SFF.SubActorMDR(actorId , value)                            //减少一个角色的魔法伤害率
 *
 * 变量增加角色魔法伤害率(角色ID,变量ID)                           //增加一个角色的魔法伤害率
 * Zzy.SFF.AddActorMDRV(actorId , variableId)                      //增加一个角色的魔法伤害率
 *
 * 变量减少角色魔法伤害率(角色ID,变量ID)                           //减少一个角色的魔法伤害率
 * Zzy.SFF.SubActorMDRV(actorId , variableId)                      //减少一个角色的魔法伤害率
 *
 *
 *
 *
 * 增加角色地板伤害率(角色ID,数值)                                 //增加一个角色的地板伤害率
 * Zzy.SFF.AddActorFDR(actorId , value)                            //增加一个角色的地板伤害率
 * 
 * 减少角色地板伤害率(角色ID,数值)                                 //减少一个角色的地板伤害率
 * Zzy.SFF.SubActorFDR(actorId , value)                            //减少一个角色的地板伤害率
 *
 * 变量增加角色地板伤害率(角色ID,变量ID)                           //增加一个角色的地板伤害率
 * Zzy.SFF.AddActorMFDV(actorId , variableId)                      //增加一个角色的地板伤害率
 *
 * 变量减少角色地板伤害率(角色ID,变量ID)                           //减少一个角色的地板伤害率
 * Zzy.SFF.SubActorMFDV(actorId , variableId)                      //减少一个角色的地板伤害率
 *
 *
 *
 *
 * 增加角色经验值率(角色ID,数值)                                   //增加一个角色的经验值率
 * Zzy.SFF.AddActorEXP(actorId , value)                            //增加一个角色的经验值率
 * 
 * 减少角色经验值率(角色ID,数值)                                   //减少一个角色的经验值率
 * Zzy.SFF.SubActorEXP(actorId , value)                            //减少一个角色的经验值率
 *
 * 变量增加角色经验值率(角色ID,变量ID)                             //增加一个角色的经验值率
 * Zzy.SFF.AddActorEXPV(actorId , variableId)                      //增加一个角色的经验值率
 *
 * 变量减少角色经验值率(角色ID,变量ID)                             //减少一个角色的经验值率
 * Zzy.SFF.SubActorEXPV(actorId , variableId)                      //减少一个角色的经验值率
 * 
 *
 *
 * 缓存角色基本属性(角色ID)                                        //存储这一时刻角色的血量,蓝量,最大血量,最大蓝量,攻击力,防御力,魔攻,魔防,速度,幸运
 * Zzy.SFF.SaveActor(actorId)                                      //存储这一时刻角色的血量,蓝量,最大血量,最大蓝量,攻击力,防御力,魔攻,魔防,速度,幸运
 *  
 * 读取角色基本属性(角色ID)                                        //将角色的血量,蓝量,最大血量,最大蓝量,攻击力,防御力,魔攻,魔防,速度,幸运读取到之前存储的信息中
 * Zzy.SFF.LoadActor(actorId)                                      //将角色的血量,蓝量,最大血量,最大蓝量,攻击力,防御力,魔攻,魔防,速度,幸运读取到之前存储的信息中
 *
 * 缓存队伍物品()                                                  //存储这一时刻队伍所有角色的金币,物品,武器,与装备
 * Zzy.SFF.SaveParty()                                             //存储这一时刻队伍所有角色的金币,物品,武器,与装备
 *
 * 读取队伍物品()                                                  //读取上次存储时刻队伍所有角色的金币,物品,武器,与装备并替换 
 * Zzy.SFF.LoadParty()                                             //读取上次存储时刻队伍所有角色的金币,物品,武器,与装备并替换 
 *
 * 缓存全局变量()                                                  //存储这一时刻所有的全局变量的数值
 * Zzy.SFF.SaveVariables()                                         //存储这一时刻所有的全局变量的数值
 *
 * 读取全局变量()                                                  //读取上次存储时刻的全局变量的数值设置
 * Zzy.SFF.LoadVariables()                                         //读取上次存储时刻的全局变量的数值设置
 *
 * 缓存全局开关()                                                  //存储这一时刻所有的全局开关的数值
 * Zzy.SFF.SaveSwitches()                                          //存储这一时刻所有的全局开关的数值
 *
 * 读取全局开关()                                                  //读取上次存储时刻的全局开关的数值设置
 * Zzy.SFF.LoadSwitches()                                          //读取上次存储时刻的全局开关的数值设置
 *
 * 删除地图所有独立开关(地图ID)                                    //这将会重置一个地图中所有事件的独立开关               mapId要求填写地图的ID值
 * Zzy.SFF.ResetSelfSwitchesOfMap(mapId)                           //这将会重置一个地图中所有事件的独立开关               mapId要求填写地图的ID值
 *
 *
 *
 * 获取金币数量(变量ID)                                            //获取金币数量存放到变量值中
 * Zzy.SFF.GetGold(variableId)
 *
 * 修改金币数量(数量)                                              //修改队伍的金币为某值
 * Zzy.SFF.SetGold(count)                                          //修改队伍的金币为某值
 *
 * 变量修改金币数量(变量ID)                                        //修改队伍的金币为某个变量值
 * Zzy.SFF.SetGoldV(variableId)                                    //修改队伍的金币为某个变量值
 *
 * 增加金币百分比(百分比)                                               //对现有金币增加百分比的额外数值,输入10代表10%
 * Zzy.SFF.AddGoldPer(per)                                              //对现有金币增加百分比的额外数值,输入10代表10%
 *
 * 减少金币百分比(百分比)                                               //对现有金币减少百分比的额外数值,范围0~100
 * Zzy.SFF.SubGoldPer(per)                                              //对现有金币减少百分比的额外数值,范围0~100
 *
 *
 *
 * 获取道具数量(道具ID,变量ID)                                     //将读取到的道具数量存放到某个变量值
 * Zzy.SFF.GetItemCount(itemId,variableId)                         //将读取到的道具数量存放到某个变量值
 *
 * 修改道具数量(道具ID,数量)                                       //修改队伍的道具数量为某值
 * Zzy.SFF.SetItem(itemId,count)                                   //修改队伍的道具数量为某值                     itemId要求填写物品ID值    count要求填写数量
 *
 * 变量修改道具数量(道具ID,变量ID)                                 //修改队伍的道具数量为某个变量值 
 * Zzy.SFF.SetItemV(itemId,variableId)                             //修改队伍的道具数量为某个变量值               itemId要求填写物品ID值    variableId要求填写变量ID值
 *
 * 增加道具数量百分比(道具ID,百分比)                               //对现有道具数量增加百分比的额外数值,输入10代表10%
 * Zzy.SFF.AddItemCountPer(itemId,per)                             //对现有道具数量增加百分比的额外数值,输入10代表10%
 *
 * 减少道具数量百分比(道具ID,百分比)                               //对现有道具数量减少百分比的额外数值,范围0~100
 * Zzy.SFF.SubItemCountPer(itemId,per)                             //对现有道具数量减少百分比的额外数值,范围0~100
 *
 *
 * 修改武器数量(武器ID,数量)                                       //修改队伍的武器数量为某值
 * Zzy.SFF.SetWeapon(weaponId,count)                               //修改队伍的武器数量为某值
 *
 * 变量修改武器数量(武器ID,变量ID)                                 //修改队伍的武器数量为某个变量值
 * Zzy.SFF.SetWeaponV(weaponId,variableId)                         //修改队伍的武器数量为某个变量值
 *
 *
 * 修改护甲数量(护甲ID,数量)                                       //修改队伍的护甲数量为某值
 * Zzy.SFF.SetArmor(armorId,count)                                 //修改队伍的护甲数量为某值
 *
 * 变量修改护甲数量(护甲ID,数量)                                   //修改队伍的护甲数量为某个变量值                      
 * Zzy.SFF.SetArmorV(armorId,variableId)                           //修改队伍的护甲数量为某个变量值
 *
 *
 *
 *
 * 
 * 打开菜单界面()                                                  //这会强制打开菜单界面
 * Zzy.SFF.CallMenu()                                              //这会强制打开菜单界面
 *
 * 打开物品界面()                                                  //这会强制打开物品界面
 * Zzy.SFF.CallItemMenu()                                          //这会强制打开物品界面
 *
 * 打开技能界面(角色ID)                                            //这会强制打开技能界面,需要输入打开角色的ID值,需要保证角色ID的角色目前在队伍中
 * Zzy.SFF.CallSkillMenu(actorId)                                  //这会强制打开技能界面,需要输入打开角色的ID值,需要保证角色ID的角色目前在队伍中
 *
 * 打开装备界面(角色ID)                                            //这会强制打开装备界面,需要输入打开角色的ID值,需要保证角色ID的角色目前在队伍中
 * Zzy.SFF.CallEquipMenu(actorId)                                  //这会强制打开装备界面,需要输入打开角色的ID值,需要保证角色ID的角色目前在队伍中
 *
 * 打开状态界面(角色ID)                                            //这会强制打开状态界面,需要输入打开角色的ID值,需要保证角色ID的角色目前在队伍中
 * Zzy.SFF.CallStatusMenu(actorId)                                 //这会强制打开状态界面,需要输入打开角色的ID值,需要保证角色ID的角色目前在队伍中
 *
 * 打开设置界面()                                                  //这会强制打开设置界面
 * Zzy.SFF.CallOptionsMenu()                                       //这会强制打开设置界面
 *
 * 打开存档界面()                                                  //这会强制打开存档界面
 * Zzy.SFF.CallSaveMenu()                                          //这会强制打开存档界面
 *
 * 打开读档界面()                                                  //这会强制打开读档界面
 * Zzy.SFF.CallLoadMenu()                                          //这会强制打开读档界面
 *
 * 打开游戏结束界面()                                              //这会强制打开游戏结束界面
 * Zzy.SFF.CallGameEndMenu()                                       //这会强制打开游戏结束界面
 *
 *
 * 存档(存档ID)                                                    //这会进行存档,需要设置存档ID
 * Zzy.SFF.Save(saveID)                                            //这会进行存档,需要设置存档ID
 *
 * 读档(读档ID)                                                    //这会进行读档,需要设置存档ID
 * Zzy.SFF.Load(loadID)                                            //这会进行读档,需要设置存档ID
 *
 *
 * 截图(路径,名称)                                                 //将目前的界面进行截图,需要输入路径和截图名称,截图格式为.png
 * Zzy.SFF.SnapToLocal(path,fileName)
 * -例: 截图('img/faces','图片1')
 * -例: 截图('img/custom','截图1')                 //其中custom是一个自定义文件夹,需保证项目中拥有此文件夹
 * 注意输入文本要加引号
 *
 *
 * 截图到照片文件夹(名称)                                          //将截图存储到img/pictures文件夹中,截图格式为.png
 * Zzy.SFF.SnapToPictures(fileName)
 * -例: 截图到照片文件夹('记录')
 * 注意输入文本要加引号
 *
 *
 * 截图到系统文件夹(名称)                                          //将截图存储到img/system文件夹中,截图格式为.png
 * Zzy.SFF.SnapToSystem(fileName) 
 * -例: 截图到系统文件夹('save')
 * 注意输入文本要加引号
 * 
 *
 * 变速齿轮(倍率)                                                  //修改游戏的速度,标准速度为1,最小值为0,如果小于1,则被视为减速倍率,大于1被视为加速倍率
 * Zzy.SFF.ChangeDeltaTimeRatio(value)                             //修改游戏的速度,标准速度为1,最小值为0,如果小于1,则被视为减速倍率,大于1被视为加速倍率
 * -例: 变速齿轮(3)                //提升游戏3倍速度
 * -例: 变速齿轮(0.5)              //游戏减缓2倍速度,既为0.5倍速度
 *
 *
 * 调用公共事件(公共事件ID)                                        //这会调用公共事件
 * Zzy.SFF.CallCommonEvent(commonId)                               //这会调用公共事件
 *
 * 延迟调用公共事件(公共事件ID,延迟时长)                           //这会延迟一段时长来调用公共事件,参数延迟时长单位为毫秒
 * Zzy.SFF.DelayCallCommonEvent(commonId,delay)                    //这会延迟一段时长来调用公共事件,参数延迟时长单位为毫秒
 * -例: 延迟调用公共事件(10,3000)              //3秒后调用公共事件10号
 *
 *
 *
 * 经历帧数存储到变量(变量ID)                                      //将游戏经历的总帧数,存储到变量中,需填写变量ID值
 * Zzy.SFF.FrameCountToVariable(variableId)                        //将游戏经历的总帧数,存储到变量中,需填写变量ID值
 *
 * 目前秒数存储到变量(变量ID)                                      //将游戏秒数存储到变量中,需填写变量ID值,秒数的范围会在0~59
 * Zzy.SFF.CurrentSecondToVariable(variableId)                     //将游戏秒数存储到变量中,需填写变量ID值,秒数的范围会在0~59
 * 
 * 目前分数存储到变量(变量ID)                                      //将游戏分数存储到变量中,需填写变量ID值,分数的范围会在0~59
 * Zzy.SFF.CurrentMinuteToVariable(variableId)                     //将游戏分数存储到变量中,需填写变量ID值,分数的范围会在0~59
 * 
 * 目前时数存储到变量(变量ID)                                      //将游戏时数存储到变量中,需填写变量ID值
 * Zzy.SFF.CurrentHourToVariable(variableId)                       //将游戏时数存储到变量中,需填写变量ID值
 *
 *
 * 批量设置变量(变量字符串,数值)                                   //这会批量设置全局变量的数值
 * Zzy.SFF.SetVariables(variableStr,value)                         //这会批量设置全局变量的数值
 * -变量字符串:可用逗号和~号代表多个与范围ID选择
 * -数值:输入要设置的数值
 * 注意输入文本要加引号
 * 例: 批量设置变量('1~100',20)                     //将1~100号变量设置值为20
 * 例: 批量设置变量('10~20,40~50,100,101',92)       //将10~20,40~50,100~101号变量设置值为92
 *
 * 变量批量设置变量(变量字符串,变量ID)                             //这会批量设置全局变量的数值
 * Zzy.SFF.SetVariablesV(variableStr,variableId)                   //这会批量设置全局变量的数值
 *
 * 批量相加变量(变量字符串,数值)                                   //这会批量设置全局变量的相加数值
 * Zzy.SFF.AddVariables(variableStr,value)                         //这会批量设置全局变量的相加数值
 *
 * 变量批量相加变量(变量字符串,变量ID)                             //这会批量设置全局变量的相加数值
 * Zzy.SFF.AddVariablesV(variableStr,variableId)                   //这会批量设置全局变量的相加数值
 *
 * 批量相减变量(变量字符串,数值)                                   //这会批量设置全局变量的相减数值
 * Zzy.SFF.SubVariables(variableStr,value)                         //这会批量设置全局变量的相减数值
 *
 * 变量批量相减变量(变量字符串,变量ID)                             //这会批量设置全局变量的相减数值
 * Zzy.SFF.SubVariablesV(variableStr,variableId)                   //这会批量设置全局变量的相减数值
 *
 * 批量相乘变量(变量字符串,数值)                                   //这会批量设置全局变量的相乘数值
 * Zzy.SFF.MulVariables(variableStr,value)                         //这会批量设置全局变量的相乘数值
 *
 * 变量批量相乘变量(变量字符串,变量ID)                             //这会批量设置全局变量的相乘数值
 * Zzy.SFF.MulVariablesV(variableStr,variableId)                   //这会批量设置全局变量的相乘数值
 *
 * 批量相除变量(变量字符串,数值,模式可选:四舍五入/向下截取/向上截取)//这会批量设置全局变量的相除数值
 * Zzy.SFF.DivVariables(variableStr,value,mode)                     //这会批量设置全局变量的相除数值
 * -模式:选填参数,可选择与变量相除之后的小数部分,代表剩余小数是否会进位,默认值为四舍五入
 * 注意输入文本要加引号
 *
 * 变量批量相除变量(变量字符串,变量ID,模式可选:四舍五入/向下截取/向上截取)    //这会批量设置全局变量的相除数值
 * Zzy.SFF.DivVariablesV(variableStr,variableId,mode)                         //这会批量设置全局变量的相除数值
 *
 * 设置随机数变量(变量ID,最小值,最大值)                               //这会将一个随机数存放到指定的变量ID中          
 * Zzy.SFF.SetRandomVariable(variableId,min,max)                      //这会将一个随机数存放到指定的变量ID中          
 * -变量ID:填写变量ID编号
 * -最小值:选填参数,输入一个整数,代表随机数的最小值,默认值为0
 * -最大值:选填参数,输入一个整数,代表随机的最大值,默认值为99
 * 例:设置随机数变量(5,0,9)                 //将0~9之间的一个随机数存到变量5中
 * 例:设置随机数变量(10)                    //将0~99之间的一个随机数存到变量10中
 *
 *
 * 批量设置随机数变量(变量字符串,最小值,最大值)                      //这会将批量随机数存放到指定的变量ID中          
 * Zzy.SFF.SetRandomVariables(variableStr,min,max)                   //这会将批量随机数存放到指定的变量ID中          
 * 例:批量设置随机数变量('10~20',100,150)               //将10~20编号的变量每个随机100~150之间的数值进行存放
 *
 *
 *
 * 传送(地图ID,位置x,位置y,方向可选:不变/左/上/右/下,过渡模式:黑屏/白屏/无)      //将玩家进行传送,其中方向可选和过渡模式为选填项,拥有默认值     
 * Zzy.SFF.TransferPlayer(mapId,x,y,dir,type)                                    //将玩家进行传送,其中方向可选和过渡模式为选填项,拥有默认值      
 * 例: 传送(3,5,5,'不变','白屏')              //进行传送
 * 例: 传送(5,10,0,'上')                      //未添参数会默认使用黑屏
 * 注意输入文本要加引号
 *
 *
 * 变量传送(变量ID1,变量ID2,变量ID3,方向可选:不变/左/上/右/下,过渡模式:黑屏/白屏/无)          //将地图ID,位置x,y替换为变量,用法相同
 * Zzy.SFF.TransferPlayerV(variableId1,variableId2,variableId3,dir,type)                      //将地图ID,位置x,y替换为变量,用法相同
 * 例: 变量传送(4,5,6,'不变','黑屏')
 * 例: 变量传送(10,11,12)
 * 注意输入文本要加引号
 *
 *
 *
 * 闪图(图片名称,时长,位置x,位置y)                                  //将图片出现在屏幕界面,持续一定时长后消失
 * Zzy.SFF.FlashPicture(name,frame,x,y)                             //将图片出现在屏幕界面,持续一定时长后消失  
 *
 * -图片名称:填写图片的名称,图片存放在img/pictures文件夹中,图片的名称不包含后缀名
 * -时长:选填参数,单位为帧数,默认MV中1秒钟对应60帧,默认值为10帧
 * -位置x:选填参数,填写出现图片的x位置数值,默认值为屏幕宽度的正中心
 * -位置y:选填参数,填写出现图片的y位置数值,默认值为屏幕高度的正中心
 *
 * 例: 闪图('道具1')                          //在屏幕中心显示名为'闪图'的图片,持续10帧后消失,位置在正中心
 * 例: 闪图('贴脸鬼图',60,100,100)            //在屏幕x100,y100的位置显示一张贴脸的鬼图,持续时间60帧后消失
 * 注意输入文本要加引号
 *
 *
 *
 * 获取地图ID(变量ID)                                                   //将地图ID的数值存放到变量中,需要输入存放的变量ID值 
 * Zzy.SFF.GetMapID(varId)                                              //将地图ID的数值存放到变量中,需要输入存放的变量ID值 
 *
 *
 * 获取角色等级(角色ID,变量ID)                                    //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
 * Zzy.SFF.GetActorLevel(actorId,varId)                           //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
 *
 * 获取角色最大血量(角色ID,变量ID)                                //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
 *  Zzy.SFF.GetActorMaxHp(actorId,varId)                          //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
 *
 * 获取角色最大蓝量(角色ID,变量ID)                                //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
 * Zzy.SFF.GetActorMaxMp(actorId,varId)                           //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
 *
 * 获取角色血量(角色ID,变量ID)                                    //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
 * Zzy.SFF.GetActorHp(actorId,varId)                              //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
 *
 * 获取角色蓝量(角色ID,变量ID)                                    //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
 * Zzy.SFF.GetActorMp(actorId,varId)                              //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
 *
 * 获取角色攻击(角色ID,变量ID)                                    //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
 * Zzy.SFF.GetActorAtk(actorId,varId)                             //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
 *
 * 获取角色防御(角色ID,变量ID)                                    //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
 * Zzy.SFF.GetActorDef(actorId,varId)                             //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
 *
 * 获取角色魔攻(角色ID,变量ID)                                    //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
 * Zzy.SFF.GetActorMat(actorId,varId)                             //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
 *
 * 获取角色魔抗(角色ID,变量ID)                                    //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
 * Zzy.SFF.GetActorMad(actorId,varId)                             //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
 *
 * 获取角色速度(角色ID,变量ID)                                    //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
 * Zzy.SFF.GetActorAgi(actorId,varId)                             //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
 *
 * 获取角色幸运(角色ID,变量ID)                                    //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
 * Zzy.SFF.GetActorLuk(actorId,varId)                             //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
 *
 *
 * 修改玩家移动速度(速度值)                                       //会修在玩家在地图中的移动速度,玩家移动速度默认数值为4
 * Zzy.SFF.SetPlayerMoveSpeed(moveSpeed)                          //会修在玩家在地图中的移动速度,玩家移动速度默认数值为4
 *
 * 设置玩家能否遇敌(true/false)                                   //填写后玩家在地图中将会/不会再遇敌而触发战斗,填写true/false,true代表开启,false代表关闭
 * Zzy.SFF.SetPlayerEncounter(enable)                             //填写后玩家在地图中将会/不会再遇敌而触发战斗,填写true/false,true代表开启,false代表关闭
 *
 *
 * 玩家跳跃到事件(事件ID,偏移X,偏移Y)                                 //使玩家跳跃到地图中事件的位置附近,需填写事件ID,正负偏移数值
 * Zzy.SFF.JumpToEvent(eventID,ofx,ofy)
 *
 * 事件跳跃到事件(事件1ID,事件2ID,偏移X,偏移Y)                       //地图中事件1跳跃到事件2的位置附近,需填写事件1,2ID,正负偏移数值
 * Zzy.SFF.EventJumpToEvent(event1ID,event2ID,ofx,ofy)               //地图中事件1跳跃到事件2的位置附近,需填写事件1,2ID,正负偏移数值
 *
 *
 *
 *
 *
 *
 *
 *
 *----------------------------------------------------------
 *
 *
 *
 * 我叫坂本：v1.03 更新函数功能
 * 我叫坂本：v1.02 更新函数功能
 * 我叫坂本：v1.01 更新函数功能
 * 我叫坂本：v1.00 完成插件功能
 *
 *----------------------------------------------------------
 *
 *
 *
 *
 *
 *
 *
 */



var LiuYue = LiuYue || {};
LiuYue.LiuYue_SimpleFunction = true;//插件启动

var Zzy = Zzy || {};
Zzy.SFF = Zzy.SFF || {};
Zzy.SFF.version = 1.03;  
Zzy.Parameters = PluginManager.parameters('LiuYue_SimpleFunction');
Zzy.Param = Zzy.Param || {};


Zzy.SFF.ActorParam = [];



//=================================================================
//DataManager
//=================================================================
Zzy.SFF.DataManager_loadGame = DataManager.loadGame;
DataManager.loadGame = function(savefileId) //旧存档兼容
{
	var result = Zzy.SFF.DataManager_loadGame.call(this,savefileId);
	
	this.ZzySFFInitData();

	return result;
}

DataManager.ZzySFFInitData = function()//初始化参数
{
	if(!$gameSystem.GetIsZzySFFLoaded())
	{
		//初始化
		$gameSystem.ZzySFFInitData();//初始化数据
		$gameSystem.SetIsZzySFFLoaded(true);
	}	
}


//=============================================================================
//Game_System
//=============================================================================

Zzy.SFF.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() 
{
    Zzy.SFF.Game_System_initialize.call(this);
	this.ZzySFFInitData();//初始化数据

	this._IsZzySFFLoaded = true;//是否载入完成
	
};
	
Game_System.prototype.GetIsZzySFFLoaded = function()
{
	if(this._IsZzySFFLoaded === undefined)
	{this._IsZzySFFLoaded = false;}
	return this._IsZzySFFLoaded;
}

Game_System.prototype.SetIsZzySFFLoaded = function(enable)
{
	this._IsZzySFFLoaded = enable;
}


Game_System.prototype.ZzySFFInitData = function()
{
	this._ZzySFFActorParam = [];
	this._ZzySFFPartyInfo = undefined;
	
	
	this._ZzySFFExParam = [];//额外参数
	this._ZzySFFSpParam = [];//特殊参数
	
	this._ZzySFFVariables = [];//变量
	this._ZzySFFSwitches = [];//开关
	
	
	this._ZzySFFSrcDeltaTime = SceneManager._deltaTime;//原始速度
	this._ZzySFFCurrentDeltaTime = this._ZzySFFSrcDeltaTime;//目前速度
	
	this._ZzySFFCommonArr = [];//延迟公共事件
	this._ZzySFFCommonIndex = 0;//下标
	
	
	this._ZzySFFFlashPicArr = [];//闪图
	
	this._IsZzySFFNoEncounter = false;//不会遇敌
	
}


Game_System.prototype.PushZzySFFCommonArr = function(commonId)
{
	this._ZzySFFCommonArr.push(commonId);
}

Game_System.prototype.PushZzySFFFlashPicArr = function(name,frame,x,y)//压入
{
	var info = {};
	info.name = name;
	info.frame = frame;
	info.x = x;
	info.y = y;
	info.cFrame = 0;
	info.isCom = false;
	this._ZzySFFFlashPicArr.push(info);
	return info;
}

Game_System.prototype.ClearZzySFFFlashPicArr = function()
{
	this._ZzySFFFlashPicArr = [];
}

Game_System.prototype.GetZzySFFExParam = function(ActorID)
{
	if(this._ZzySFFExParam[ActorID] === undefined)
	{this._ZzySFFExParam[ActorID] = [];}
	return this._ZzySFFExParam[ActorID];
}

Game_System.prototype.GetZzySFFSpParam = function(ActorID)
{
	if(this._ZzySFFSpParam[ActorID] === undefined)
	{this._ZzySFFSpParam[ActorID] = [];}
	return this._ZzySFFSpParam[ActorID];
}

Game_System.prototype.GetIsZzySFFNoEncounter = function()
{
	return this._IsZzySFFNoEncounter;
}

Game_System.prototype.SetIsZzySFFNoEncounter = function(enable)
{
	this._IsZzySFFNoEncounter = enable;
}





//=============================================================================
//Game_Player
//=============================================================================

Zzy.SFF.Game_Player_updateEncounterCount = Game_Player.prototype.updateEncounterCount;
Game_Player.prototype.updateEncounterCount = function() 
{
	if($gameSystem.GetIsZzySFFNoEncounter()){return false;}
	Zzy.SFF.Game_Player_updateEncounterCount.call(this);
};


//=============================================================================
//Scene_Map
//=============================================================================
Zzy.SFF.Scene_Map_initialize = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function()
{
	Zzy.SFF.Scene_Map_initialize.call(this);
	
	this._ZzySFFFlashSprArr = [];//缓存
}

Zzy.SFF.Scene_Map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function()
{
	Zzy.SFF.Scene_Map_start.call(this);
	
	//循环并加载
	this.LoadZzySFFlashInfo();
}


Scene_Map.prototype.LoadZzySFFlashInfo = function()
{
	var arr = $gameSystem._ZzySFFFlashPicArr;
	var isBeing = false;
	for(var i=0;i<arr.length;i++)
	{
		if(arr[i] && arr[i].isCom === false)
		{
			isBeing = true;
			this.CreateZzySFFFlashSpr(arr[i]);
		}
	}
	
	if(!isBeing)
	{
		$gameSystem.ClearZzySFFFlashPicArr();//如果没有缓存则清理
	}
	
}

Zzy.SFF.Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() 
{
	Zzy.SFF.Scene_Map_update.call(this);
	
	this.updateZzySFFCommon();
};


Scene_Map.prototype.RequestZzySFFFlashSpr = function()//创建缓存
{
	var len = this._ZzySFFFlashSprArr;
	for(var i=0;i<len;i++)
	{
		var spr1 = this._ZzySFFFlashSprArr[i];
		if(!spr1.visible)
		{
			spr1.visible = true;
			return spr1;
		}
	}
	var spr2 = new Sprite_ZzySFFFlash(this);
	this._ZzySFFFlashSprArr.push(spr2);
	this.addChild(spr2);
	return spr2;
}


Scene_Map.prototype.CreateZzySFFFlashSpr = function(info)//创造闪烁位图
{
	var spr1 = this.RequestZzySFFFlashSpr();
	spr1.ResetInfo(info);
}



Scene_Map.prototype.updateZzySFFCommon = function()
{
	
	if(!$gameSystem._ZzySFFCommonArr.length)return;
	var cArr = $gameSystem._ZzySFFCommonArr;
	if(!$gameTemp.isCommonEventReserved())//没有公共事件占位
	{
		var commonId = cArr[$gameSystem._ZzySFFCommonIndex];
		$gameTemp.reserveCommonEvent(commonId);//调用公共事件
		$gameSystem._ZzySFFCommonIndex++;
		if($gameSystem._ZzySFFCommonIndex >= cArr.length)
		{
			$gameSystem._ZzySFFCommonIndex = 0;
			$gameSystem._ZzySFFCommonArr = [];
		}
	}
}

//=======================================================================
//Sprite_ZzySFFFlash
//=======================================================================
function Sprite_ZzySFFFlash() {
    this.initialize.apply(this, arguments);
}

Sprite_ZzySFFFlash.prototype = Object.create(Sprite_Base.prototype);
Sprite_ZzySFFFlash.prototype.constructor = Sprite_ZzySFFFlash;

Sprite_ZzySFFFlash.prototype.initialize = function(pointer) 
{
    Sprite_Base.prototype.initialize.call(this);
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
    this.pointer = pointer;
	this.info = undefined;
};

Sprite_ZzySFFFlash.prototype.ResetInfo = function(info)
{
	this.info = info;
	this.bitmap = ImageManager.loadPicture(this.info.name);
	this.x = info.x;
	this.y = info.y;
}

Sprite_ZzySFFFlash.prototype.update = function()
{
	
	 Sprite_Base.prototype.update.call(this);
	if(!this.visible)return;
	
	 this.updateBeing();//更新存在
	 
}

Sprite_ZzySFFFlash.prototype.updateBeing = function()
{
	if(this.info.cFrame < this.info.frame)
	{
		this.info.cFrame++;
	}
	else
	{
		this.info.cFrame = 0;
		this.info.isCom = true;
		this.visible = false;
		this.pointer.removeChild(this);//移除
	}
}




//---------------------------------------Zzy.SFF.Script---------------------------------------------

//设置角色的生命值
Zzy.SFF.SetActorHP = function(actorId,value)
{
	var actor = $gameActors.actor(actorId);
	actor.setHp(value);
}
Zzy.SFF.SetActorHPV = function(actorId,variableId)
{Zzy.SFF.SetActorHP(actorId,$gameVariables.value(variableId));}

var 设置角色血量值 = function(actorId,value)
{Zzy.SFF.SetActorHP(actorId,value);}
var 变量设置角色血量值 = function(actorId,variableId)
{Zzy.SFF.SetActorHPV(actorId,variableId);}


//设置角色的魔法值
Zzy.SFF.SetActorMP = function(actorId,value)
{
	var actor = $gameActors.actor(actorId);
	actor.setMp(value);
}

Zzy.SFF.SetActorMPV = function(actorId,variableId)
{Zzy.SFF.SetActorMP(actorId,$gameVariables.value(variableId));}

var 设置角色蓝量值 = function(actorId,value)
{Zzy.SFF.SetActorMP(actorId,value);}
var 变量设置角色蓝量值 = function(actorId,variableId)
{Zzy.SFF.SetActorMPV(actorId,variableId);}



//设置角色最大血量值
Zzy.SFF.SetActorMaxHP = function(actorId,value)
{
	var actor = $gameActors.actor(actorId);
	var srcValue = actor.paramBase(0);
	actor._paramPlus[0] = value-srcValue;	
}

Zzy.SFF.SetActorMaxHpV = function(actorId,variableId)
{Zzy.SFF.SetActorMaxHP(actorId,$gameVariables.value(variableId));}

var 设置角色最大血量值 = function(actorId,value)
{Zzy.SFF.SetActorMaxHP(actorId,value);}
var 变量设置角色最大血量值 = function(actorId,variableId)
{Zzy.SFF.SetActorMaxHpV(actorId,variableId);}



//设置角色最大蓝量值
Zzy.SFF.SetActorMaxMP = function(actorId,value)
{
	var actor = $gameActors.actor(actorId);
	var srcValue = actor.paramBase(1);
	actor._paramPlus[1] = value-srcValue;	
}

Zzy.SFF.SetActorMaxMpV = function(actorId,variableId)
{Zzy.SFF.SetActorMaxMP(actorId,$gameVariables.value(variableId));}

var 设置角色最大蓝量值 = function(actorId,value)
{Zzy.SFF.SetActorMaxMP(actorId,value);}
var 变量设置角色最大蓝量值 = function(actorId,variableId)
{Zzy.SFF.SetActorMaxMpV(actorId,variableId);}




//设置角色的攻击力
Zzy.SFF.SetActorATK = function(actorId,value)
{
	var actor = $gameActors.actor(actorId);
	var srcValue = actor.paramBase(2);
	actor._paramPlus[2] = value-srcValue;
}

Zzy.SFF.SetActorATKV = function(actorId,variableId)
{Zzy.SFF.SetActorATK(actorId,$gameVariables.value(variableId));}

var 设置角色攻击值 = function(actorId,value)
{Zzy.SFF.SetActorATK(actorId,value);}
var 变量设置角色攻击值 = function(actorId,variableId)
{Zzy.SFF.SetActorATKV(actorId,variableId);}




//设置角色的防御
Zzy.SFF.SetActorDEF = function(actorId,value)
{
	var actor = $gameActors.actor(actorId);
	var srcValue = actor.paramBase(3);
	actor._paramPlus[3] = value-srcValue;
}

Zzy.SFF.SetActorDEFV = function(actorId,variableId)
{Zzy.SFF.SetActorDEF(actorId,$gameVariables.value(variableId));}

var 设置角色防御值 = function(actorId,value)
{Zzy.SFF.SetActorDEF(actorId,value);}
var 变量设置角色防御值 = function(actorId,variableId)
{Zzy.SFF.SetActorDEFV(actorId,variableId);}



//设置角色的魔攻
Zzy.SFF.SetActorMAT = function(actorId,value)
{
	var actor = $gameActors.actor(actorId);
	var srcValue = actor.paramBase(4);
	actor._paramPlus[4] = value-srcValue;
}

Zzy.SFF.SetActorMATV = function(actorId,variableId)
{Zzy.SFF.SetActorMAT(actorId,$gameVariables.value(variableId));}

var 设置角色魔攻值 = function(actorId,value)
{Zzy.SFF.SetActorMAT(actorId,value);}
var 变量设置角色魔攻值 = function(actorId,variableId)
{Zzy.SFF.SetActorMATV(actorId,variableId);}



//设置角色的魔抗
Zzy.SFF.SetActorMDF = function(actorId,value)
{
	var actor = $gameActors.actor(actorId);
	var srcValue = actor.paramBase(5);
	actor._paramPlus[5] = value-srcValue;
}

Zzy.SFF.SetActorMDFV = function(actorId,variableId)
{Zzy.SFF.SetActorMDF(actorId,$gameVariables.value(variableId));}

var 设置角色魔防值 = function(actorId,value)
{Zzy.SFF.SetActorMDF(actorId,value);}
var 变量设置角色魔防值 = function(actorId,variableId)
{Zzy.SFF.SetActorMDFV(actorId,variableId);}


//设置角色的速度
Zzy.SFF.SetActorAGI = function(actorId,value)
{
	var actor = $gameActors.actor(actorId);
	var srcValue = actor.paramBase(6);
	actor._paramPlus[6] = value-srcValue;
}

Zzy.SFF.SetActorAGIV = function(actorId,variableId)
{Zzy.SFF.SetActorAGI(actorId,$gameVariables.value(variableId));}

var 设置角色速度值 = function(actorId,value)
{Zzy.SFF.SetActorAGI(actorId,value);}
var 变量设置角色速度值 = function(actorId,variableId)
{Zzy.SFF.SetActorAGIV(actorId,variableId);}



//设置角色的幸运
Zzy.SFF.SetActorLUK = function(actorId,value)
{
	var actor = $gameActors.actor(actorId);
	var srcValue = actor.paramBase(7);
	actor._paramPlus[7] = value-srcValue;
}

Zzy.SFF.SetActorLUKV = function(actorId,variableId)
{Zzy.SFF.SetActorLUK(actorId,$gameVariables.value(variableId));}

var 设置角色幸运值 = function(actorId,value)
{Zzy.SFF.SetActorLUK(actorId,value);}
var 变量设置角色幸运值 = function(actorId,variableId)
{Zzy.SFF.SetActorLUKV(actorId,variableId);}




Zzy.SFF.AddActorHIT = function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFExParam(actorId);
	if(pArr[0] === undefined){pArr[0] = 0;}
	pArr[0] += value*0.01;
}

var 增加角色命中率 = function(actorId,value)
{Zzy.SFF.AddActorHit(actorId,value);}


Zzy.SFF.SubActorHIT = function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFExParam(actorId);
	if(pArr[0] === undefined){pArr[0] = 0;}
	pArr[0] -= value*0.01;
}

var 减少角色命中率 = function(actorId,value)
{Zzy.SFF.SubActorHIT(actorId,value);}

Zzy.SFF.AddActorHITV = function(actorId,variableId)
{Zzy.SFF.AddActorHIT(actorId,$gameVariables.value(variableId));}

var 变量增加角色命中率 = function(actorId,variableId)
{Zzy.SFF.AddActorHITV(actorId,variableId);}

Zzy.SFF.SubActorHITV = function(actorId,variableId)
{Zzy.SFF.SubActorHIT(actorId,$gameVariables.value(variableId));}

var 变量减少角色命中率 = function(actorId,variableId)
{Zzy.SFF.SubActorHITV(actorId,variableId);}





Zzy.SFF.AddActorEVA = function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFExParam(actorId);
	if(pArr[1] === undefined){pArr[1] = 0;}
	pArr[1] += value*0.01;
}

var 增加角色回避率 = function(actorId,value)
{Zzy.SFF.AddActorEVA(actorId,value);}


Zzy.SFF.SubActorEVA = function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFExParam(actorId);
	if(pArr[1] === undefined){pArr[1] = 0;}
	pArr[1] -= value*0.01;
}

var 减少角色回避率 = function(actorId,value)
{Zzy.SFF.SubActorEVA(actorId,value);}

Zzy.SFF.AddActorEVAV = function(actorId,variableId)
{Zzy.SFF.AddActorEVA(actorId,$gameVariables.value(variableId));}

var 变量增加角色回避率 = function(actorId,variableId)
{Zzy.SFF.AddActorEVAV(actorId,variableId);}

Zzy.SFF.SubActorEVAV = function(actorId,variableId)
{Zzy.SFF.SubActorEVA(actorId,$gameVariables.value(variableId));}

var 变量减少角色回避率 = function(actorId,variableId)
{Zzy.SFF.SubActorEVAV(actorId,variableId);}







Zzy.SFF.AddActorCRI = function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFExParam(actorId);
	if(pArr[2] === undefined){pArr[2] = 0;}
	pArr[2] += value*0.01;
}

var 增加角色暴击率 = function(actorId,value)
{Zzy.SFF.AddActorCRI(actorId,value);}

Zzy.SFF.SubActorCRI = function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFExParam(actorId);
	if(pArr[2] === undefined){pArr[2] = 0;}
	pArr[2] -= value*0.01;
}

var 减少角色暴击率 = function(actorId,value)
{Zzy.SFF.SubActorCRI(actorId,value);}

Zzy.SFF.AddActorCRIV = function(actorId,variableId)
{Zzy.SFF.AddActorCRI(actorId,$gameVariables.value(variableId));}

var 变量增加角色暴击率 = function(actorId,variableId)
{Zzy.SFF.AddActorCRIV(actorId,variableId);}

Zzy.SFF.SubActorCRIV = function(actorId,variableId)
{Zzy.SFF.SubActorCRI(actorId,$gameVariables.value(variableId));}

var 变量减少角色暴击率 = function(actorId,variableId)
{Zzy.SFF.SubActorCRIV(actorId,variableId);}





Zzy.SFF.AddActorCEV = function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFExParam(actorId);
	if(pArr[3] === undefined){pArr[3] = 0;}
	pArr[3] += value*0.01;
}

var 增加角色暴击回避 = function(actorId,value)
{Zzy.SFF.AddActorCEV(actorId,value);}

Zzy.SFF.SubActorCEV = function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFExParam(actorId);
	if(pArr[3] === undefined){pArr[3] = 0;}
	pArr[3] -= value*0.01;
}

var 减少角色暴击回避 = function(actorId,value)
{Zzy.SFF.SubActorCEV(actorId,value);}

Zzy.SFF.AddActorCEVV = function(actorId,variableId)
{Zzy.SFF.AddActorCEV(actorId,$gameVariables.value(variableId));}

var 变量增加角色暴击回避 = function(actorId,variableId)
{Zzy.SFF.AddActorCEVV(actorId,variableId);}

Zzy.SFF.SubActorCEVV = function(actorId,variableId)
{Zzy.SFF.SubActorCEV(actorId,$gameVariables.value(variableId));}

var 变量减少角色暴击回避 = function(actorId,variableId)
{Zzy.SFF.SubActorCEVV(actorId,variableId);}








Zzy.SFF.AddActorMEV = function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFExParam(actorId);
	if(pArr[4] === undefined){pArr[4] = 0;}
	pArr[4] += value*0.01;
}

var 增加角色魔法回避 = function(actorId,value)
{Zzy.SFF.AddActorMEV(actorId,value);}

Zzy.SFF.SubActorMEV= function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFExParam(actorId);
	if(pArr[4] === undefined){pArr[4] = 0;}
	pArr[4] -= value*0.01;
}

var 减少角色魔法回避 = function(actorId,value)
{Zzy.SFF.SubActorMEV(actorId,value);}

Zzy.SFF.AddActorMEVV = function(actorId,variableId)
{Zzy.SFF.AddActorMEV(actorId,$gameVariables.value(variableId));}

var 变量增加角色魔法回避 = function(actorId,variableId)
{Zzy.SFF.AddActorMEVV(actorId,variableId);}

Zzy.SFF.SubActorMEVV = function(actorId,variableId)
{Zzy.SFF.SubActorMEV(actorId,$gameVariables.value(variableId));}

var 变量减少角色魔法回避 = function(actorId,variableId)
{Zzy.SFF.SubActorMEVV(actorId,variableId);}






Zzy.SFF.AddActorMRF = function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFExParam(actorId);
	if(pArr[5] === undefined){pArr[5] = 0;}
	pArr[5] += value*0.01;
}

var 增加角色魔法反射 = function(actorId,value)
{Zzy.SFF.AddActorMRF(actorId,value);}

Zzy.SFF.SubActorMRF = function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFExParam(actorId);
	if(pArr[5] === undefined){pArr[5] = 0;}
	pArr[5] -= value*0.01;
}

var 减少角色魔法反射 = function(actorId,value)
{Zzy.SFF.SubActorMRF(actorId,value);}

Zzy.SFF.AddActorMRFV = function(actorId,variableId)
{Zzy.SFF.AddActorMRF(actorId,$gameVariables.value(variableId));}

var 变量增加角色魔法反射 = function(actorId,variableId)
{Zzy.SFF.AddActorMRFV(actorId,variableId);}

Zzy.SFF.SubActorMRFV = function(actorId,variableId)
{Zzy.SFF.SubActorMRF(actorId,$gameVariables.value(variableId));}

var 变量减少角色魔法反射 = function(actorId,variableId)
{Zzy.SFF.SubActorMRFV(actorId,variableId);}





Zzy.SFF.AddActorCNT = function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFExParam(actorId);
	if(pArr[6] === undefined){pArr[6] = 0;}
	pArr[6] += value*0.01;
}

var 增加角色反击 = function(actorId,value)
{Zzy.SFF.AddActorCNT(actorId,value);}

Zzy.SFF.SubActorCNT = function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFExParam(actorId);
	if(pArr[6] === undefined){pArr[6] = 0;}
	pArr[6] -= value*0.01;
}

var 减少角色反击 = function(actorId,value)
{Zzy.SFF.SubActorCNT(actorId,value);}

Zzy.SFF.AddActorCNTV = function(actorId,variableId)
{Zzy.SFF.AddActorCNT(actorId,$gameVariables.value(variableId));}

var 变量增加角色角色反击 = function(actorId,variableId)
{Zzy.SFF.AddActorCNTV(actorId,variableId);}

Zzy.SFF.SubActorCNTV = function(actorId,variableId)
{Zzy.SFF.SubActorCNT(actorId,$gameVariables.value(variableId));}

var 变量减少角色角色反击 = function(actorId,variableId)
{Zzy.SFF.SubActorCNTV(actorId,variableId);}





Zzy.SFF.AddActorHRG = function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFExParam(actorId);
	if(pArr[7] === undefined){pArr[7] = 0;}
	pArr[7] += value*0.01;
}

var 增加角色HP自动恢复 = function(actorId,value)
{Zzy.SFF.AddActorHRG(actorId,value);}

Zzy.SFF.SubActorHRG = function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFExParam(actorId);
	if(pArr[7] === undefined){pArr[7] = 0;}
	pArr[7] -= value*0.01;
}

var 减少角色HP自动恢复 = function(actorId,value)
{Zzy.SFF.SubActorHRG(actorId,value);}

Zzy.SFF.AddActorHRGV = function(actorId,variableId)
{Zzy.SFF.AddActorHRG(actorId,$gameVariables.value(variableId));}

var 变量增加角色HP自动恢复 = function(actorId,variableId)
{Zzy.SFF.AddActorHRGV(actorId,variableId);}

Zzy.SFF.SubActorHRGV = function(actorId,variableId)
{Zzy.SFF.SubActorHRG(actorId,$gameVariables.value(variableId));}

var 变量减少角色HP自动恢复 = function(actorId,variableId)
{Zzy.SFF.SubActorHRGV(actorId,variableId);}





Zzy.SFF.AddActorMRG = function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFExParam(actorId);
	if(pArr[8] === undefined){pArr[8] = 0;}
	pArr[8] += value*0.01;
}

var 增加角色MP自动恢复 = function(actorId,value)
{Zzy.SFF.AddActorMRG(actorId,value);}

Zzy.SFF.SubActorMRG = function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFExParam(actorId);
	if(pArr[8] === undefined){pArr[8] = 0;}
	pArr[8] -= value*0.01;
}

var 减少角色MP自动恢复 = function(actorId,value)
{Zzy.SFF.SubActorMRG(actorId,value);}

Zzy.SFF.AddActorMRGV = function(actorId,variableId)
{Zzy.SFF.AddActorMRG(actorId,$gameVariables.value(variableId));}

var 变量增加角色MP自动恢复 = function(actorId,variableId)
{Zzy.SFF.AddActorMRGV(actorId,variableId);}

Zzy.SFF.SubActorMRGV = function(actorId,variableId)
{Zzy.SFF.SubActorMRG(actorId,$gameVariables.value(variableId));}

var 变量减少角色MP自动恢复 = function(actorId,variableId)
{Zzy.SFF.SubActorMRGV(actorId,variableId);}







Zzy.SFF.AddActorTRG = function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFExParam(actorId);
	if(pArr[9] === undefined){pArr[9] = 0;}
	pArr[9] += value*0.01;
}

var 增加角色TP自动恢复 = function(actorId,value)
{Zzy.SFF.AddActorTRG(actorId,value);}

Zzy.SFF.SubActorTRG = function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFExParam(actorId);
	if(pArr[9] === undefined){pArr[9] = 0;}
	pArr[9] -= value*0.01;
}

var 减少角色TP自动恢复 = function(actorId,value)
{Zzy.SFF.SubActorTRG(actorId,value);}

Zzy.SFF.AddActorTRGV = function(actorId,variableId)
{Zzy.SFF.AddActorTRG(actorId,$gameVariables.value(variableId));}

var 变量增加角色TP自动恢复 = function(actorId,variableId)
{Zzy.SFF.AddActorTRGV(actorId,variableId);}

Zzy.SFF.SubActorTRGV = function(actorId,variableId)
{Zzy.SFF.SubActorTRG(actorId,$gameVariables.value(variableId));}

var 变量减少角色TP自动恢复 = function(actorId,variableId)
{Zzy.SFF.SubActorTRGV(actorId,variableId);}






Zzy.SFF.AddActorTGR = function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFSpParam(actorId);
	if(pArr[0] === undefined){pArr[0] = 0;}
	pArr[0] += value*0.01;
}

var 增加角色受到攻击几率 = function(actorId,value)
{Zzy.SFF.AddActorTGR(actorId,value);}

Zzy.SFF.SubActorTGR = function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFSpParam(actorId);
	if(pArr[0] === undefined){pArr[0] = 0;}
	pArr[0] -= value*0.01;
}

var 减少角色受到攻击几率 = function(actorId,value)
{Zzy.SFF.SubActorTGR(actorId,value);}

Zzy.SFF.AddActorTGRV = function(actorId,variableId)
{Zzy.SFF.AddActorTGR(actorId,$gameVariables.value(variableId));}

var 变量增加角色受到攻击几率 = function(actorId,variableId)
{Zzy.SFF.AddActorTGRV(actorId,variableId);}

Zzy.SFF.SubActorTGRV = function(actorId,variableId)
{Zzy.SFF.SubActorTGR(actorId,$gameVariables.value(variableId));}

var 变量减少角色受到攻击几率 = function(actorId,variableId)
{Zzy.SFF.SubActorTGRV(actorId,variableId);}






Zzy.SFF.AddActorGRD = function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFSpParam(actorId);
	if(pArr[1] === undefined){pArr[1] = 0;}
	pArr[1] += value*0.01;
}

var 增加角色防御效果 = function(actorId,value)
{Zzy.SFF.AddActorGRD(actorId,value);}

Zzy.SFF.SubActorGRD = function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFSpParam(actorId);
	if(pArr[1] === undefined){pArr[1] = 0;}
	pArr[1] -= value*0.01;
}

var 减少角色防御效果 = function(actorId,value)
{Zzy.SFF.SubActorGRD(actorId,value);}

Zzy.SFF.AddActorGRDV = function(actorId,variableId)
{Zzy.SFF.AddActorGRD(actorId,$gameVariables.value(variableId));}

var 变量增加角色防御效果 = function(actorId,variableId)
{Zzy.SFF.AddActorGRDV(actorId,variableId);}

Zzy.SFF.SubActorGRDV = function(actorId,variableId)
{Zzy.SFF.SubActorGRD(actorId,$gameVariables.value(variableId));}

var 变量减少角色防御效果 = function(actorId,variableId)
{Zzy.SFF.SubActorGRDV(actorId,variableId);}






Zzy.SFF.AddActorREC = function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFSpParam(actorId);
	if(pArr[2] === undefined){pArr[2] = 0;}
	pArr[2] += value*0.01;
}

var 增加角色恢复效果 = function(actorId,value)
{Zzy.SFF.AddActorREC(actorId,value);}

Zzy.SFF.SubActorREC = function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFSpParam(actorId);
	if(pArr[2] === undefined){pArr[2] = 0;}
	pArr[2] -= value*0.01;
}

var 减少角色恢复效果 = function(actorId,value)
{Zzy.SFF.SubActorREC(actorId,value);}

Zzy.SFF.AddActorRECV = function(actorId,variableId)
{Zzy.SFF.AddActorREC(actorId,$gameVariables.value(variableId));}

var 变量增加角色恢复效果 = function(actorId,variableId)
{Zzy.SFF.AddActorRECV(actorId,variableId);}

Zzy.SFF.SubActorRECV = function(actorId,variableId)
{Zzy.SFF.SubActorREC(actorId,$gameVariables.value(variableId));}

var 变量减少角色恢复效果 = function(actorId,variableId)
{Zzy.SFF.SubActorRECV(actorId,variableId);}




Zzy.SFF.AddActorPHA = function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFSpParam(actorId);
	if(pArr[3] === undefined){pArr[3] = 0;}
	pArr[3] += value*0.01;
}

var 增加角色药理知识 = function(actorId,value)
{Zzy.SFF.AddActorPHA(actorId,value);}

Zzy.SFF.SubActorPHA = function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFSpParam(actorId);
	if(pArr[3] === undefined){pArr[3] = 0;}
	pArr[3] -= value*0.01;
}

var 减少角色药理知识 = function(actorId,value)
{Zzy.SFF.SubActorPHA(actorId,value);}

Zzy.SFF.AddActorPHAV = function(actorId,variableId)
{Zzy.SFF.AddActorPHA(actorId,$gameVariables.value(variableId));}

var 变量增加角色药理知识 = function(actorId,variableId)
{Zzy.SFF.AddActorPHAV(actorId,variableId);}

Zzy.SFF.SubActorPHAV = function(actorId,variableId)
{Zzy.SFF.SubActorPHA(actorId,$gameVariables.value(variableId));}

var 变量减少角色药理知识 = function(actorId,variableId)
{Zzy.SFF.SubActorPHAV(actorId,variableId);}






Zzy.SFF.AddActorMCR = function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFSpParam(actorId);
	if(pArr[4] === undefined){pArr[4] = 0;}
	pArr[4] += value*0.01;
}

var 增加角色MP消耗率 = function(actorId,value)
{Zzy.SFF.AddActorMCR(actorId,value);}

Zzy.SFF.SubActorMCR = function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFSpParam(actorId);
	if(pArr[4] === undefined){pArr[4] = 0;}
	pArr[4] -= value*0.01;
}

var 减少角色MP消耗率 = function(actorId,value)
{Zzy.SFF.SubActorMCR(actorId,value);}

Zzy.SFF.AddActorMCRV = function(actorId,variableId)
{Zzy.SFF.AddActorMCR(actorId,$gameVariables.value(variableId));}

var 变量增加角色MP消耗率 = function(actorId,variableId)
{Zzy.SFF.AddActorMCRV(actorId,variableId);}

Zzy.SFF.SubActorMCRV = function(actorId,variableId)
{Zzy.SFF.SubActorMCR(actorId,$gameVariables.value(variableId));}

var 变量减少角色MP消耗率 = function(actorId,variableId)
{Zzy.SFF.SubActorMCRV(actorId,variableId);}








Zzy.SFF.AddActorTCR = function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFSpParam(actorId);
	if(pArr[5] === undefined){pArr[5] = 0;}
	pArr[5] += value*0.01;
}

var 增加角色TP消耗率 = function(actorId,value)
{Zzy.SFF.AddActorTCR(actorId,value);}

Zzy.SFF.SubActorTCR = function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFSpParam(actorId);
	if(pArr[5] === undefined){pArr[5] = 0;}
	pArr[5] -= value*0.01;
}

var 减少角色TP消耗率 = function(actorId,value)
{Zzy.SFF.SubActorTCR(actorId,value);}

Zzy.SFF.AddActorTCRV = function(actorId,variableId)
{Zzy.SFF.AddActorTCR(actorId,$gameVariables.value(variableId));}

var 变量增加角色TP消耗率 = function(actorId,variableId)
{Zzy.SFF.AddActorTCRV(actorId,variableId);}

Zzy.SFF.SubActorTCRV = function(actorId,variableId)
{Zzy.SFF.SubActorTCR(actorId,$gameVariables.value(variableId));}

var 变量减少角色TP消耗率 = function(actorId,variableId)
{Zzy.SFF.SubActorTCRV(actorId,variableId);}





Zzy.SFF.AddActorPDR = function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFSpParam(actorId);
	if(pArr[6] === undefined){pArr[6] = 0;}
	pArr[6] += value*0.01;
}

var 增加角色物理伤害率 = function(actorId,value)
{Zzy.SFF.AddActorPDR(actorId,value);}

Zzy.SFF.SubActorPDR = function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFSpParam(actorId);
	if(pArr[6] === undefined){pArr[6] = 0;}
	pArr[6] -= value*0.01;
}

var 减少角色物理伤害率 = function(actorId,value)
{Zzy.SFF.SubActorPDR(actorId,value);}

Zzy.SFF.AddActorPDRV = function(actorId,variableId)
{Zzy.SFF.AddActorPDR(actorId,$gameVariables.value(variableId));}

var 变量增加角色物理伤害率 = function(actorId,variableId)
{Zzy.SFF.AddActorPDRV(actorId,variableId);}

Zzy.SFF.SubActorPDRV = function(actorId,variableId)
{Zzy.SFF.SubActorPDR(actorId,$gameVariables.value(variableId));}

var 变量减少角色物理伤害率 = function(actorId,variableId)
{Zzy.SFF.SubActorPDRV(actorId,variableId);}





Zzy.SFF.AddActorMDR = function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFSpParam(actorId);
	if(pArr[7] === undefined){pArr[7] = 0;}
	pArr[7] += value*0.01;
}

var 增加角色魔法伤害率 = function(actorId,value)
{Zzy.SFF.AddActorMDR(actorId,value);}

Zzy.SFF.SubActorMDR = function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFSpParam(actorId);
	if(pArr[7] === undefined){pArr[7] = 0;}
	pArr[7] -= value*0.01;
}

var 减少角色魔法伤害率 = function(actorId,value)
{Zzy.SFF.SubActorMDR(actorId,value);}

Zzy.SFF.AddActorMDRV = function(actorId,variableId)
{Zzy.SFF.AddActorMDR(actorId,$gameVariables.value(variableId));}

var 变量增加角色魔法伤害率 = function(actorId,variableId)
{Zzy.SFF.AddActorMDRV(actorId,variableId);}

Zzy.SFF.SubActorMDRV = function(actorId,variableId)
{Zzy.SFF.SubActorMDR(actorId,$gameVariables.value(variableId));}

var 变量减少角色魔法伤害率 = function(actorId,variableId)
{Zzy.SFF.SubActorMDRV(actorId,variableId);}





Zzy.SFF.AddActorFDR = function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFSpParam(actorId);
	if(pArr[8] === undefined){pArr[8] = 0;}
	pArr[8] += value*0.01;
}

var 增加角色地板伤害率 = function(actorId,value)
{Zzy.SFF.AddActorFDR(actorId,value);}

Zzy.SFF.SubActorFDR = function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFSpParam(actorId);
	if(pArr[8] === undefined){pArr[8] = 0;}
	pArr[8] -= value*0.01;
}

var 减少角色地板伤害率 = function(actorId,value)
{Zzy.SFF.SubActorFDR(actorId,value);}

Zzy.SFF.AddActorFDRV = function(actorId,variableId)
{Zzy.SFF.AddActorFDR(actorId,$gameVariables.value(variableId));}

var 变量增加角色地板伤害率 = function(actorId,variableId)
{Zzy.SFF.AddActorFDRV(actorId,variableId);}

Zzy.SFF.SubActorFDRV = function(actorId,variableId)
{Zzy.SFF.SubActorFDR(actorId,$gameVariables.value(variableId));}

var 变量减少角色地板伤害率 = function(actorId,variableId)
{Zzy.SFF.SubActorFDRV(actorId,variableId);}




Zzy.SFF.AddActorEXP = function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFSpParam(actorId);
	if(pArr[9] === undefined){pArr[9] = 0;}
	pArr[9] += value*0.01;
}

var 增加角色经验值率 = function(actorId,value)
{Zzy.SFF.AddActorEXP(actorId,value);}

Zzy.SFF.SubActorEXP = function(actorId,value)
{
	var pArr = $gameSystem.GetZzySFFSpParam(actorId);
	if(pArr[9] === undefined){pArr[9] = 0;}
	pArr[9] -= value*0.01;
}

var 减少角色经验值率 = function(actorId,value)
{Zzy.SFF.SubActorEXP(actorId,value);}

Zzy.SFF.AddActorEXPV = function(actorId,variableId)
{Zzy.SFF.AddActorMDR(actorId,$gameVariables.value(variableId));}

var 变量增加角色经验值率 = function(actorId,variableId)
{Zzy.SFF.AddActorEXPV(actorId,variableId);}

Zzy.SFF.SubActorEXPV = function(actorId,variableId)
{Zzy.SFF.SubActorMDR(actorId,$gameVariables.value(variableId));}

var 变量减少角色经验值率 = function(actorId,variableId)
{Zzy.SFF.SubActorEXPV(actorId,variableId);}






//=========================================================================
//Game_Actor
//=========================================================================
Zzy.SFF.Game_Actor_xparam = Game_Actor.prototype.xparam;
Game_Actor.prototype.xparam = function(xparamId) 
{
	var value = Zzy.SFF.Game_Actor_xparam.call(this,xparamId);
	var actorId = this.actorId();
	var pArr = $gameSystem.GetZzySFFExParam(actorId);
	if(pArr[xparamId])
	{value += pArr[xparamId];}//增加额外数值
	return value;
};


Zzy.SFF.Game_Actor_sparam = Game_Actor.prototype.sparam;
Game_Actor.prototype.sparam = function(sparamId) 
{
	var value = Zzy.SFF.Game_Actor_sparam.call(this,sparamId);
	var actorId = this.actorId();
	var pArr = $gameSystem.GetZzySFFSpParam(actorId);
	if(pArr[sparamId])
	{value += pArr[sparamId];}
	return value;
}



//记录角色的信息
Zzy.SFF.SaveActor = function(actorId)
{
	var actor = $gameActors.actor(actorId);
	if(!actor){console.log('不存在ID为:'+actorId+'值的这个角色');return;}
	var info = {};
	info.hp = actor.hp;
	info.mp = actor.mp;
	info.atk = actor.atk;
	info.def = actor.def;
	info.mat = actor.mat;
	info.mdf = actor.mdf;
	info.agi = actor.agi;
	info.luk = actor.luk;
	$gameSystem._ZzySFFActorParam[actorId] = info;
}

var 缓存角色基本属性 = function(actorId)
{Zzy.SFF.SaveActor(actorId);}



Zzy.SFF.LoadActor = function(actorId)
{
	var actor = $gameActors.actor(actorId);
	if(!actor){console.log('不存在ID为:'+actorId+'值的这个角色');return;}
	
	var info = $gameSystem._ZzySFFActorParam[actorId];
	if(!info){console.log('没有通过SaveActor对角色进行提前存储');return;}

	Zzy.SFF.SetActorHP(actorId,info.hp);
	Zzy.SFF.SetActorMP(actorId,info.mp);
	Zzy.SFF.SetActorATK(actorId,info.atk);
	Zzy.SFF.SetActorDEF(actorId,info.def);
	Zzy.SFF.SetActorMAT(actorId,info.mat);
	Zzy.SFF.SetActorMDF(actorId,info.mdf);
	Zzy.SFF.SetActorAGI(actorId,info.agi);
	Zzy.SFF.SetActorLUK(actorId,info.luk);
}

var 读取角色基本属性 = function(actorId)
{Zzy.SFF.LoadActor(actorId);}


Zzy.SFF.SaveParty = function()
{
	var info = {};
	info.gold = $gameParty.gold();
	info.items = {};
	info.weapons = {}; 
	info.armors = {};
	info.actors = [];
	
	var items = $gameParty._items;//道具
	var weapons = $gameParty._weapons;//武器
	var armors = $gameParty._armors;//护甲
	
	info.items = Zzy.SFF.Copy(items);
	info.weapons = Zzy.SFF.Copy(weapons);
	info.armors = Zzy.SFF.Copy(armors);
	info.actors = Zzy.SFF.CopyPartyActors();

	$gameSystem._ZzySFFPartyInfo = info;
}

var 缓存队伍物品 = function()
{Zzy.SFF.SaveParty();}



Zzy.SFF.LoadParty = function()
{
	var info = $gameSystem._ZzySFFPartyInfo;
	Zzy.SFF.SetGold(info.gold);//设置金币数值
	
	$gameParty._items = Zzy.SFF.Copy(info.items);
	$gameParty._weapons = Zzy.SFF.Copy(info.weapons);
	$gameParty._armors = Zzy.SFF.Copy(info.armors);
	
	
	for(var i=0;i<info.actors.length;i++)
	{
		var aInfo = info.actors[i];
		//查找是否有相同的角色
		// if($gameParty._actors.contains(aInfo.actorId))
		// {
			// var actor = $gameActors.actor(aInfo.actorId);
		// }
		var actor = $gameActors.actor(aInfo.actorId);
		actor._equips = [];
		for(var j=0;j<aInfo.aEqu.length;j++)
		{
			if(aInfo.aEqu[j])
			{
				var tgi = new Game_Item();
				tgi._dataClass = aInfo.aEqu[j].typeId;
				tgi._itemId = aInfo.aEqu[j].itemId;
				actor._equips[j] = tgi;
			}
			else
			{
				actor._equips[j] = undefined;
			}
		}
	}
}

var 读取队伍物品 = function()
{Zzy.SFF.LoadParty();}


Zzy.SFF.SaveVariables = function()
{
	$gameSystem._ZzySFFVariables = [];
	var vArr1 = $gameSystem._ZzySFFVariables;
	var vArr2 = $gameVariables._data;
	if(vArr2)
	{
		for(var i=0;i<vArr2.length;i++)
		{vArr1[i] = vArr2[i];}
	}
}
var 缓存全局变量 = function()
{Zzy.SFF.SaveVariables();}


Zzy.SFF.LoadVariables = function()
{
	$gameVariables._data = [];
	var vArr1 = $gameSystem._ZzySFFVariables;
	var vArr2 = $gameVariables._data;
	if(vArr1)
	{
		for(var i=0;i<vArr1.length;i++)
		{vArr2[i] = vArr1[i];}
	}
}

var 读取全局变量 = function()
{Zzy.SFF.LoadVariables();}


Zzy.SFF.SaveSwitches = function()
{
	$gameSystem._ZzySFFSwitches = [];
	var sArr1 = $gameSystem._ZzySFFSwitches;
	var sArr2 = $gameSwitches._data;
	if(sArr2)
	{
		for(var i=0;i<sArr2.length;i++)
		{sArr1[i] = sArr2[i];}
	}
}

var 缓存全局开关 = function()
{Zzy.SFF.SaveSwitches();}


Zzy.SFF.LoadSwitches = function()
{
	$gameSwitches._data = [];
	var sArr1 = $gameSystem._ZzySFFSwitches;
	var sArr2 = $gameSwitches._data;
	if(sArr1)
	{
		for(var i=0;i<sArr1.length;i++)
		{sArr2[i] = sArr1[i];}		
	}
}

var 读取全局开关 = function()
{Zzy.SFF.LoadSwitches();}



Zzy.SFF.SetGold = function(value)//设置金币
{
	$gameParty._gold = value;
}

var 修改金币数量 = function(value)
{Zzy.SFF.SetGold(value);}

Zzy.SFF.SetGoldV = function(variableId)
{Zzy.SFF.SetGold($gameVariables.value(variableId));}

var 变量修改金币数量 = function(variableId)
{Zzy.SFF.SetGoldV(variableId);}



Zzy.SFF.SetItem = function(itemId,count)//设置道具
{
	var items = $gameParty._items;
	for(it in items)
	{
		if(parseInt(it) === itemId)
		{
			items[it] = count;
			return;
		}
	}
	items[itemId] = count;
}

var 修改道具数量 = function(itemId,count)
{Zzy.SFF.SetItem(itemId,count);}

Zzy.SFF.SetItemV = function(itemId,variableId)
{Zzy.SFF.SetItem(itemId,$gameVariables.value(variableId));}

var 变量修改道具数量 = function(itemId,variableId)
{Zzy.SFF.SetItemV(itemId,variableId);}



Zzy.SFF.SetWeapon = function(weaponId,count)//设置武器
{
	var weapons = $gameParty._weapons;
	for(we in weapons)
	{
		if(parseInt(we) === weaponId)
		{
			weapons[we] = count;
			return;
		}
	}
	weapons[weaponId] = count;
}

var 修改武器数量 = function(weaponId,count)
{Zzy.SFF.SetWeapon(weaponId,count);}

Zzy.SFF.SetWeaponV = function(weaponId,variableId)
{Zzy.SFF.SetWeapon(weaponId,$gameVariables.value(variableId));}

var 变量修改武器数量 = function(weaponId,variableId)
{Zzy.SFF.SetWeaponV(weaponId,variableId);}




Zzy.SFF.SetArmor = function(armorId,count)//设置护甲
{
	var armors = $gameParty._armors;
	for(ar in armors)
	{
		if(parseInt(ar) === armorId)
		{
			armors[ar] = count;
			return;
		}
	}
	armors[armorId] = count;
}

var 修改护甲数量 = function(armorId,count)
{Zzy.SFF.SetArmor(armorId,count);}

Zzy.SFF.SetArmorV = function(armorId,variableId)
{Zzy.SFF.SetArmor(armorId,$gameVariables.value(variableId));}

var 变量修改护甲数量 = function(armorId,variableId)
{Zzy.SFF.SetArmorV(armorId,variableId);}



Zzy.SFF.Copy = function(objs)
{
	var arr = {};
	for(v in objs)
	{
		var c = objs[v];
		arr[v] = c;
	}
	return arr;
}

Zzy.SFF.CopyPartyActors = function()
{
	var actorsInfo = [];
	var pIndexArr = $gameParty._actors;
	for(var i=0;i<pIndexArr.length;i++)
	{
		var actor = $gameActors.actor(pIndexArr[i]);
		var aEquInfo = {};
		aEquInfo.actorId = pIndexArr[i];
		aEquInfo.aEqu = [];
		for(var j=0;j<actor._equips.length;j++)
		{
			var item = actor._equips[j];
			if(item)
			{
				var tItem = {};
				tItem.typeId = item._dataClass;
				tItem.itemId = item._itemId;
				aEquInfo.aEqu.push(tItem);
			}
			else
			{
				aEquInfo.aEqu.push(undefined);
			}
		}
		actorsInfo[i] = aEquInfo;
	}
	return actorsInfo;
}




//重置一个地图中所有事件的独立开关
Zzy.SFF.ResetSelfSwitchesOfMap = function(mapId)
{
	for(key in $gameSelfSwitches._data)
	{
		var dArr = key.split(',');
		
		if(mapId === parseInt(dArr[0]))
		{
			delete $gameSelfSwitches._data[key];
		}
		
	}
}

var 删除地图所有独立开关 = function(mapId)
{Zzy.SFF.ResetSelfSwitchesOfMap(mapId);}




Zzy.SFF.CallMenu = function()
{
	if(SceneManager._scene instanceof Scene_Map)
	{SceneManager._scene.callMenu();}
	else
	{
		SoundManager.playOk();
		SceneManager.push(Scene_Menu);
		Window_MenuCommand.initCommandPosition();
		$gameTemp.clearDestination();		
	}
}

var 打开菜单界面 = function()
{Zzy.SFF.CallMenu();}


Zzy.SFF.CallItemMenu = function()
{
	SoundManager.playOk();
	SceneManager.push(Scene_Item);
	Window_MenuCommand.initCommandPosition();
	$gameTemp.clearDestination();		
}

var 打开物品界面 = function()
{Zzy.SFF.CallItemMenu();}


Zzy.SFF.CallSkillMenu = function(actorId)
{
	if(!actorId){console.log('执行失败:可能是因为没有输入角色ID值导致的');return;}
	var actor = $gameActors.actor(actorId);
	$gameParty.setMenuActor(actor);
	SoundManager.playOk();
	SceneManager.push(Scene_Skill);
	Window_MenuCommand.initCommandPosition();
	$gameTemp.clearDestination();	
}

var 打开技能界面 = function(actorId)
{Zzy.SFF.CallSkillMenu(actorId);}


Zzy.SFF.CallEquipMenu = function(actorId)
{
	if(!actorId){console.log('执行失败:可能是因为没有输入角色ID值导致的');return;}
	var actor = $gameActors.actor(actorId);
	$gameParty.setMenuActor(actor);
	SoundManager.playOk();
	SceneManager.push(Scene_Equip);
	Window_MenuCommand.initCommandPosition();
	$gameTemp.clearDestination();		
}

var 打开装备界面 = function(actorId)
{Zzy.SFF.CallEquipMenu(actorId);}

Zzy.SFF.CallStatusMenu = function(actorId)
{
	if(!actorId){console.log('执行失败:可能是因为没有输入角色ID值导致的');return;}
	var actor = $gameActors.actor(actorId);
	$gameParty.setMenuActor(actor);
	SoundManager.playOk();
	SceneManager.push(Scene_Status);
	Window_MenuCommand.initCommandPosition();
	$gameTemp.clearDestination();		
}

var 打开状态界面 = function(actorId)
{Zzy.SFF.CallStatusMenu(actorId);}



Zzy.SFF.CallOptionsMenu = function()
{
	SoundManager.playOk();
	SceneManager.push(Scene_Options);
	Window_MenuCommand.initCommandPosition();
	$gameTemp.clearDestination();	
}

var 打开设置界面 = function()
{Zzy.SFF.CallOptionsMenu();}


Zzy.SFF.CallSaveMenu = function()
{
	SoundManager.playOk();
	SceneManager.push(Scene_Save);
	Window_MenuCommand.initCommandPosition();
	$gameTemp.clearDestination();	
}

var 打开存档界面 = function()
{Zzy.SFF.CallSaveMenu();}


Zzy.SFF.CallLoadMenu = function()
{
	SoundManager.playOk();
	SceneManager.push(Scene_Load);
	Window_MenuCommand.initCommandPosition();
	$gameTemp.clearDestination();	
}

var 打开读档界面 = function()
{Zzy.SFF.CallLoadMenu();}


Zzy.SFF.CallGameEndMenu = function()
{
	SoundManager.playOk();
	SceneManager.push(Scene_GameEnd);
	Window_MenuCommand.initCommandPosition();
	$gameTemp.clearDestination();		
}

var 打开游戏结束界面 = function()
{Zzy.SFF.CallGameEndMenu();}



Zzy.SFF.Save = function(saveID)//这会进行存档,需要设置存档ID
{
	saveID = saveID ? saveID : 1;
	$gameSystem.onBeforeSave();
	DataManager.saveGame(saveID);
}
var 存档 = function(saveID)
{Zzy.SFF.Save(saveID);}

Zzy.SFF.Load = function(loadID)//这会进行读档,需要设置存档ID
{
	打开读档界面();
	loadID = loadID ? loadID : 1;
	DataManager.loadGame(loadID);
	SceneManager.pop();

}
var 读档 = function(loadID)
{Zzy.SFF.Load(loadID);}





Zzy.SFF.SnapToLocal = function(path,fileName)//截图到本地 path需要输入路径  fileName需要输入文件名
{
	path = path ? path : '';
	fileName = fileName ? fileName : 'default';
	var snapBitmap = SceneManager.snap();//屏幕截图
	
	if(!snapBitmap)
	{console.log("Error:(来自LiuYue_GameCore)未知错误:执行SceneManager.snap()失败");return false;}
	
	var url = snapBitmap._canvas.toDataURL('image/png');//转换为URL
	var base64Data = url.replace(/^data:image\/\w+;base64,/,"");//正则表达式
	var dataBuffer = new Buffer(base64Data,'base64');//转换成缓冲
	
	var path = './'+path+'/'+fileName+'.png';
	const fs = require('fs');
	
	var pointer = fs.writeFile(path,dataBuffer,function(err){
		if(err)
		{console.log(err);}
	});
	return true;
}

Zzy.SFF.SnapToPictures = function(fileName)//截图到pcitures文件夹中
{
	return Zzy.SFF.SnapToLocal('img/pictures',fileName);
}

Zzy.SFF.SnapToSystem = function(fileName)//截图到system文件夹中
{
	return Zzy.SFF.SnapToLocal('img/system',fileName);
}


var 截图 = function(path,fileName)
{Zzy.SFF.SnapToLocal(path,fileName);}

var 截图到照片文件夹 = function(fileName)
{Zzy.SFF.SnapToPictures(fileName);}

var 截图到系统文件夹 = function(fileName)
{Zzy.SFF.SnapToSystem(fileName);}


Zzy.SFF.ChangeDeltaTimeRatio = function(value)
{
	$gameSystem._ZzySFFCurrentDeltaTime = $gameSystem._ZzySFFSrcDeltaTime / value;
	SceneManager._deltaTime = $gameSystem._ZzySFFCurrentDeltaTime;
}

var 变速齿轮 = function(value)
{Zzy.SFF.ChangeDeltaTimeRatio(value);}



Zzy.SFF.CallCommonEvent = function(commonId)
{
	$gameSystem.PushZzySFFCommonArr(commonId);
}
调用公共事件 = function(commonId)
{Zzy.SFF.CallCommonEvent(commonId);}


Zzy.SFF.DelayCallCommonEvent = function(commonId,delay)
{
	setTimeout(function(){
		$gameSystem.PushZzySFFCommonArr(commonId)
	},delay);
}

var 延迟调用公共事件 = function(commonId,delay)
{Zzy.SFF.DelayCallCommonEvent(commonId,delay);}


Zzy.SFF.FrameCountToVariable = function(variableId)
{
	var value = Graphics.frameCount;
	$gameVariables.setValue(variableId,value);
}

var 经历帧数存储到变量 = function(variableId)
{Zzy.SFF.FrameCountToVariable(variableId);}


Zzy.SFF.CurrentSecondToVariable = function(variableId)
{
	var value = Math.floor(Graphics.frameCount / 60);
	value = value % 60;
	$gameVariables.setValue(variableId,value);
}

var 目前秒数存储到变量 = function(variableId)
{Zzy.SFF.CurrentSecondToVariable(variableId);}


Zzy.SFF.CurrentMinuteToVariable = function(variableId)
{
	var value = Math.floor(Graphics.frameCount / 60);
	value = Math.floor(value / 60) % 60;
	$gameVariables.setValue(variableId,value);
}

var 目前分数存储到变量 = function(variableId)
{Zzy.SFF.CurrentMinuteToVariable(variableId);}


Zzy.SFF.CurrentHourToVariable = function(variableId)
{
	var value = Math.floor(Graphics.frameCount / 60);
	value = Math.floor(value / 60 / 60);
	$gameVariables.setValue(variableId,value);
}

var 目前时数存储到变量 = function(variableId)
{Zzy.SFF.CurrentHourToVariable(variableId);}


Zzy.SFF.TransferPlayer = function(mapId,x,y,dir,type)//传送
{
	$gamePlayer.reserveTransfer(mapId, x, y, dir, type);
}

var 传送 = function(mapId,x,y,dir,type)
{
	dir = Zzy.SFF.DirToValue(dir);
	type = Zzy.SFF.TypeToValue(type);
	Zzy.SFF.TransferPlayer(mapId,x,y,dir,type);
}

Zzy.SFF.TransferPlayerV = function(variableId1,variableId2,variableId3,dir,type)
{
	var mapId = $gameVariables.value(variableId1);
	var x = $gameVariables.value(variableId2);
	var y = $gameVariables.value(variableId3);
	传送(mapId,x,y,dir,type);
}

var 变量传送 = function(variableId1,variableId2,variableId3,dir,type)
{Zzy.SFF.TransferPlayerV(variableId1,variableId2,variableId3,dir,type);}





Zzy.SFF.FlashPicture = function(name,frame,x,y)
{
	frame = frame === undefined ? 10 : frame;
	x = x === undefined ? Graphics.boxWidth/2 : x;
	y = y === undefined ? Graphics.boxHeight/2 : y;
	
	var info = $gameSystem.PushZzySFFFlashPicArr(name,frame,x,y);
	
	if(Zzy.SFF.IsMapScene())
	{
		SceneManager._scene.CreateZzySFFFlashSpr(info);
	}
}

var 闪图 = function(name,frame,x,y)
{Zzy.SFF.FlashPicture(name,frame,x,y);}


Zzy.SFF.SetVariables = function(variableStr,value)
{
	var arr = Zzy.SFF.IDStrToArr(variableStr);
	for(var i=0;i<arr.length;i++)
	{
		$gameVariables.setValue(arr[i],value);
	}
}
var 批量设置变量 = function(variableStr,value)
{Zzy.SFF.SetVariables(variableStr,value);}


Zzy.SFF.SetVariablesV = function(variableStr,variableId)
{
	Zzy.SFF.SetVariables(variableStr,$gameVariables.value(variableId));
}
var 变量批量设置变量 = function(variableStr,variableId)
{Zzy.SFF.SetVariablesV(variableStr,variableId);}



Zzy.SFF.AddVariables = function(variableStr,value)
{
	var arr = Zzy.SFF.IDStrToArr(variableStr);
	for(var i=0;i<arr.length;i++)
	{
		var id = arr[i];
		var srcValue = $gameVariables.value(id);
		$gameVariables.setValue(id,srcValue+value);
	}	
}

var 批量相加变量 = function(variableStr,value)
{Zzy.SFF.AddVariables(variableStr,value);}

Zzy.SFF.AddVariablesV = function(variableStr,variableId)
{
	Zzy.SFF.AddVariables(variableStr,$gameVariables.value(variableId));
}

var 变量批量相加变量 = function(variableStr,variableId)
{Zzy.SFF.AddVariablesV(variableStr,variableId);}



Zzy.SFF.SubVariables = function(variableStr,value)
{
	var arr = Zzy.SFF.IDStrToArr(variableStr);
	for(var i=0;i<arr.length;i++)
	{
		var id = arr[i];
		var srcValue = $gameVariables.value(id);
		$gameVariables.setValue(id,srcValue-value);
	}		
}

var 批量相减变量 = function(variableStr,value)
{Zzy.SFF.SubVariables(variableStr,value);}

Zzy.SFF.SubVariablesV = function(variableStr,variableId)
{
	Zzy.SFF.SubVariables(variableStr,$gameVariables.value(variableId));
}

var 变量批量相减变量 = function(variableStr,variableId)
{Zzy.SFF.SubVariablesV(variableStr,variableId);}




Zzy.SFF.MulVariables = function(variableStr,value)
{
	var arr = Zzy.SFF.IDStrToArr(variableStr);
	for(var i=0;i<arr.length;i++)
	{
		var id = arr[i];
		var srcValue = $gameVariables.value(id);
		$gameVariables.setValue(id,srcValue*value);
	}		
}

var 批量相乘变量 = function(variableStr,value)
{Zzy.SFF.MulVariables(variableStr,value);}

Zzy.SFF.MulVariablesV = function(variableStr,variableId)
{
	Zzy.SFF.MulVariables(variableStr,$gameVariables.value(variableId));
}

var 变量批量相乘变量 = function(variableStr,variableId)
{Zzy.SFF.MulVariablesV(variableStr,variableId);}




Zzy.SFF.DivVariables = function(variableStr,value,mode)
{
	var modeId = Zzy.SFF.CauModeValue(mode);
	
	var arr = Zzy.SFF.IDStrToArr(variableStr);
	for(var i=0;i<arr.length;i++)
	{
		var id = arr[i];
		var srcValue = $gameVariables.value(id);
		
		var result = srcValue/value;
		
		switch(modeId)
		{
			case 0:
			result = Math.round(result);
			break;
			case 1:
			result = Math.floor(result);
			break;
			case 2:
			result = Math.ceil(result);
			break;
		}
		
		$gameVariables.setValue(id,result);
	}		
}

var 批量相除变量 = function(variableStr,value,mode)
{Zzy.SFF.DivVariables(variableStr,value);}

Zzy.SFF.DivVariablesV = function(variableStr,variableId,mode)
{
	Zzy.SFF.DivVariables(variableStr,$gameVariables.value(variableId));
}

var 变量批量相除变量 = function(variableStr,variableId,mode)
{Zzy.SFF.DivVariablesV(variableStr,variableId,mode);}




Zzy.SFF.SetRandomVariable = function(variableId,min,max)
{
	min = min === undefined ? 0 : min;
	max = max === undefined ? 99 : max;
	
	var dis = Math.abs(max - min) + 1;
	var r = Math.floor(Math.random() * dis)+min;
	$gameVariables.setValue(variableId,r);
}

var 设置随机数变量 = function(variableId,min,max)
{Zzy.SFF.SetRandomVariable(variableId,min,max);}


Zzy.SFF.SetRandomVariables = function(variableStr,min,max)
{
	min = min === undefined ? 0 : min;
	max = max === undefined ? 99 : max;
	var dis = Math.abs(max - min) + 1;

	var arr = Zzy.SFF.IDStrToArr(variableStr);
	for(var i=0;i<arr.length;i++)
	{
		var r = Math.floor(Math.random() * dis)+min;
		var id = arr[i];
		$gameVariables.setValue(id,r);
	}
}

var 批量设置随机数变量 = function(variableStr,min,max)
{Zzy.SFF.SetRandomVariables(variableStr,min,max);}



Zzy.SFF.AddGoldPer = function(per)
{
	var g = $gameParty.gold() * (1+(per*0.01));
	$gameParty._gold = Math.round(g);
}
var 增加金币百分比 = function(per)
{Zzy.SFF.AddGoldPer(per);}



Zzy.SFF.SubGoldPer = function(per)
{
	var g = $gameParty.gold() * (1-(per*0.01));
	$gameParty._gold = Math.round(g);
}
var 减少金币百分比 = function(per)
{Zzy.SFF.SubGoldPer(per);}



Zzy.SFF.GetMapID = function(varId)
{
	var mpId = $gameMap.mapId();
	$gameVariables.setValue(varId,mpId);
}

var 获取地图ID = function(varId)
{Zzy.SFF.GetMapID(varId);}


Zzy.SFF.GetGold = function(varId)
{
	var g = $gameParty.gold();
	$gameVariables.setValue(varId,g);
}
var 获取金币数量 = function(varId)
{Zzy.SFF.GetGold(varId);}


Zzy.SFF.GetItemCount = function(itemId,varId)                         //将读取到的道具数量存放到某个变量值
{
	var item = $dataItems[itemId];
	var count = $gameParty.numItems(item);
	$gameVariables.setValue(varId,count);
}
var 获取道具数量 = function(itemId,varId)                                     //将读取到的道具数量存放到某个变量值
{Zzy.SFF.GetItemCount(itemId,varId);}


Zzy.SFF.AddItemCountPer = function(itemId,per)                                    //对现有道具数量增加百分比的额外数值,输入10代表10%
{
	var item = $dataItems[itemId];
	var count = Math.round($gameParty.numItems(item) * per * 0.01);
	$gameParty.gainItem(item,count);
}
var 增加道具数量百分比 = function(itemId,per)                                      //对现有道具数量增加百分比的额外数值,输入10代表10%
{Zzy.SFF.AddItemCountPer(itemId,per);}


Zzy.SFF.SubItemCountPer = function(itemId,per)                                    //对现有道具数量减少百分比的额外数值,范围0~100
{
	var item = $dataItems[itemId];
	var count = Math.round($gameParty.numItems(item) * per * 0.01);
	$gameParty.gainItem(item,-count);	
}
var 减少道具数量百分比 = function(per)                                      //对现有道具数量减少百分比的额外数值,范围0~100
{Zzy.SFF.SubItemCountPer(per);}



Zzy.SFF.GetActorLevel = function(actorId,varId)                           //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
{
	var actor = actorId ? $gameActors.actor(actorId) : $gameParty.leader();
	var value = actor.level;
	$gameVariables.setValue(varId,value);
}
var 获取角色等级 = function(actorId,varId)                                    //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
{Zzy.SFF.GetActorLevel(actorId,varId);}


Zzy.SFF.GetActorMaxHp = function(actorId,varId)                           //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
{
	var actor = actorId ? $gameActors.actor(actorId) : $gameParty.leader();
	var value = actor.mhp;
	$gameVariables.setValue(varId,value);	
}
var 获取角色最大血量 = function(actorId,varId)                                //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
{Zzy.SFF.GetActorMaxHp(actorId,varId);}


Zzy.SFF.GetActorMaxMp = function(actorId,varId)                           //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
{
	var actor = actorId ? $gameActors.actor(actorId) : $gameParty.leader();
	var value = actor.mmp;
	$gameVariables.setValue(varId,value);		
}
var 获取角色最大蓝量 = function(actorId,varId)                                //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
{Zzy.SFF.GetActorMaxMp(actorId,varId);}


Zzy.SFF.GetActorHp = function(actorId,varId)                              //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
{
	var actor = actorId ? $gameActors.actor(actorId) : $gameParty.leader();
	var value = actor.hp;
	$gameVariables.setValue(varId,value);			
}
var 获取角色血量 = function(actorId,varId)                                    //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
{Zzy.SFF.GetActorHp(actorId,varId);}

Zzy.SFF.GetActorMp = function(actorId,varId)                              //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
{
	var actor = actorId ? $gameActors.actor(actorId) : $gameParty.leader();
	var value = actor.mp;
	$gameVariables.setValue(varId,value);		
}
var 获取角色蓝量 = function(actorId,varId)                                    //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
{Zzy.SFF.GetActorMp(actorId,varId);}

Zzy.SFF.GetActorAtk = function(actorId,varId)                             //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
{
	var actor = actorId ? $gameActors.actor(actorId) : $gameParty.leader();
	var value = actor.atk;
	$gameVariables.setValue(varId,value);		
}
var 获取角色攻击 = function(actorId,varId)                                    //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
{Zzy.SFF.GetActorAtk(actorId,varId);}

Zzy.SFF.GetActorDef = function(actorId,varId)                             //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
{
	var actor = actorId ? $gameActors.actor(actorId) : $gameParty.leader();
	var value = actor.def;
	$gameVariables.setValue(varId,value);		
}
var 获取角色防御 = function(actorId,varId)                                    //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
{Zzy.SFF.GetActorDef(actorId,varId);}

Zzy.SFF.GetActorMat = function(actorId,varId)                             //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
{
	var actor = actorId ? $gameActors.actor(actorId) : $gameParty.leader();
	var value = actor.mat;
	$gameVariables.setValue(varId,value);	
}
var 获取角色魔攻 = function(actorId,varId)                                    //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
{Zzy.SFF.GetActorMat(actorId,varId);}

Zzy.SFF.GetActorMad = function(actorId,varId)                             //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
{
	var actor = actorId ? $gameActors.actor(actorId) : $gameParty.leader();
	var value = actor.mad;
	$gameVariables.setValue(varId,value);		
}
var 获取角色魔抗 = function(actorId,varId)                                    //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
{Zzy.SFF.GetActorMad(actorId,varId);}

Zzy.SFF.GetActorAgi = function(actorId,varId)                             //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
{
	var actor = actorId ? $gameActors.actor(actorId) : $gameParty.leader();
	var value = actor.agi;
	$gameVariables.setValue(varId,value);		
}
var 获取角色速度 = function(actorId,varId)                                    //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
{Zzy.SFF.GetActorAgi(actorId,varId);}

Zzy.SFF.GetActorLuk = function(actorId,varId)                             //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
{
	var actor = actorId ? $gameActors.actor(actorId) : $gameParty.leader();
	var value = actor.luk;
	$gameVariables.setValue(varId,value);	
}
var 获取角色幸运 = function(actorId,varId)                                    //将指定的角色的等级存放到变量中,需要输入存放的变量ID值,如果角色ID输入0,则获取队长的信息
{Zzy.SFF.GetActorLuk(actorId,varId);}



Zzy.SFF.SetPlayerMoveSpeed = function(moveSpeed)
{
	$gamePlayer._moveSpeed = moveSpeed;
}
var 修改玩家移动速度 = function(moveSpeed)
{Zzy.SFF.SetPlayerMoveSpeed(moveSpeed);}


Zzy.SFF.SetPlayerEncounter = function(enable)                             //填写后玩家在地图中将会/不会再遇敌而触发战斗,填写true/false
{
	enable = enable ? false : true;
	$gameSystem.SetIsZzySFFNoEncounter(enable);
}
var 设置玩家能否遇敌 = function(enable)                                        //填写后玩家在地图中将会/不会再遇敌而触发战斗
{Zzy.SFF.SetPlayerEncounter(enable);}



Zzy.SFF.JumpToEvent = function(eventID,ofx,ofy)
{
	ofx = ofx ? ofx : 0;
	ofy = ofy ? ofy : 0;
	
	var ev = Zzy.SFF.GetObjOfEvent(eventID);
	var pr = $gamePlayer;
	
	var dx = ev.x - pr.x + ofx;
	var dy = ev.y - pr.y + ofy;
	
	pr.jump(dx,dy);
}
var 玩家跳跃到事件 = function(eventID,ofx,ofy)
{Zzy.SFF.JumpToEvent(eventID,ofx,ofy);}


Zzy.SFF.EventJumpToEvent = function(event1ID,event2ID,ofx,ofy)
{
	ofx = ofx ? ofx : 0;
	ofy = ofy ? ofy : 0;

	var ev1 = Zzy.SFF.GetObjOfEvent(event1ID);
	var ev2 = Zzy.SFF.GetObjOfEvent(event2ID);
	
	var dx = ev2.x - ev1.x + ofx;
	var dy = ev2.y - ev1.y + ofy;	
	
	ev1.jump(dx,dy);
}
var 事件跳跃到事件 = function(event1ID,event2ID,ofx,ofy)
{Zzy.SFF.EventJumpToEvent(event1ID,event2ID,ofx,ofy);}




//---------------------------------------Zzy.SFF.Function---------------------------------------------

Zzy.SFF.GetObjOfEvent = function(eventID)
{
	eventID = eventID ? eventID : 0;
	if(eventID){return $gameMap.event(eventID);}
	return $gamePlayer;
}





Zzy.SFF.IsMapScene = function()
{
	return (SceneManager._scene instanceof Scene_Map) ? true : false;
}


Zzy.SFF.IDStrToArr = function(str)
{
	var IDArr = [];
	var IDStrArr = str.split(',');
	
		for(var j=0;j<IDStrArr.length;j++)
		{
			var tArr = IDStrArr[j].split('~');
			
			if(tArr.length > 1)
			{
				var min = parseInt(tArr[0]);
				var max = parseInt(tArr[1]);
				for(var k=min;k<=max;k++)
				{
					IDArr.push(k);
				}
			}
			else
			{
				var value = parseInt(tArr[0]);
				IDArr.push(value);
			}
		}
	return IDArr;
}

Zzy.SFF.DirToValue = function(dir)
{
	if(dir)
	{
		switch(dir)
		{
			case '不变':return 0;
			case '下':return 2;
			case '左':return 4;
			case '右':return 6;
			case '上':return 8;
		}
	}
	return 0;	
}

Zzy.SFF.TypeToValue = function(type)
{
	if(type)
	{
		switch(type)
		{
			case '黑屏':return 0;
			case '白屏':return 1;
			case '无':return 2;
		}
	}
	return 0;
}


Zzy.SFF.CauModeValue = function(mode)
{
	if(mode)
	{
		switch(type)
		{
			case '四舍五入':return 0;
			case '向上截取':return 1;
			case '向下截取':return 2;
		}
	}
	return 0;
}