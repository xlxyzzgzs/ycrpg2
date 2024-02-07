# YCrpg2
异常生物见闻录 rpg 第二版 仓库

## 使用者锁


## 使用流程
1. 在你进行你的内容更新之前，先执行一次拉取操作。正常情况下不会提示内容冲突，如果有，则VS code右上角点击文件，选择关闭文件夹。然后再把你本地那个同步文件夹删掉，重新从Github克隆。
1. 正常拉取最新内容之后，检查本文件的<b>使用者-锁</b>下面是否有名字，如果没有就继续，如果有任一群友的名字表明他正在操作，你可以摸会儿鱼。<del>（记得去催一把进度）</del>
1. <b>使用者-锁</b>一栏下没有名字时，在本文件的<b>使用者-锁</b> 下面添加你的名字，然后Ctrl+s保存本文件的修改，提交更改，并同步到github上。一般不会提示冲突，如果有冲突，那就撤销本次提交，然后你就可以摸鱼了。
1. 正常进行上述内容同步之后，打开仓库网页，你能看到对<b>使用者-锁</b>一栏下多出了你的名字，这时候，你就可以放心的修改你电脑里的同步文件了。
1. 在电脑的同步文件里完成你计划的更新之后，保存好，关闭RM mv。再打开VS code把本文件 <b>使用者-锁</b> 下面你的名字删了。并且在更新记录下边写入新的记录。然后Ctrl+s保存本文件的修改。
1. 正常执行所有修改内容的提交，并推到github上，完成本次更新。

## 发布新版本
最后一次提交的注释以`#publish`开头来发布新版本

## 更新记录编辑方式
1. 每次编辑更新记录都应该在<b>更新记录</b>部分的最上方写入
1. 更新记录格式为：“加粗日期”接“加粗群名”接“更新内容”，各项之间以中文分号隔断
例如：<b>2022/7/23</b>；<b>面具</b>；写入南宫三八技能


## 更新记录
- **2024/2/7**；**枪兵**；去艾欧前剧情；
- **2024/2/7**；**乐子人**；数值修改完成；2.8 新增祝福；改动部分事件BUG；替换插件；
- **2024/1/31**；**枪兵**；名字和地图；
- **2024/1/27**；**乐子人**；改南宫五月、南宫三八、伊扎克斯数值，修复莉莉三段普攻寻敌异常的问题；1.28改莉莉数值；1.28 继续改滚郝籽诺兰数值；1.29 改白火数值，更新插件；1.30改完技能数值；
- **2024/1/22**；**乐子人**；初步改数值；1.23 接着改数值；1.25 改薇薇安数值；
- **2024/1/20**；**枪兵**；一点点剧情，草原地图；
- **2024/1/20**；**乐子人**；写入天赋，微调数值；1.21, 0点再次写入天赋; 1.21 13点再次写入天赋；1.21 17点再次写入天赋；
- **2024/1/10**；**乐子人**；更新插件，改动内容；1.16配置加护插件，微调数值；
- **2024/1/10**；**乐子人**；新增白火天赋石；1.11细节修改；
- **2024/1/8**；**乐子人**；更新多个插件并写入相应新内容；
- **2024/1/2**；**乐子人**；更新装备核心插件；
- **2023/12/30**；**乐子人**；技能优化，新增战斗统计；修改部分技能冷却机制；新增技能点和技能学习系统；
- **2023/12/24**；**乐子人**；配置主界面UI，开场效果优化；
- **2023/12/11**；**乐子人**；一些数值削弱和BUG修复；
- **2023/12/07**；**乐子人**；精准机制再次测试，优化精英怪事件避免被卡BUG；
- **2023/12/06**；**乐子人**；排查两个BUG，恢复一些为了测试而做出的改动；
- **2023/12/05**；**乐子人**；更新外包魔改后的插件；写入精准机制和吸血机制的新注释；
- **2023/12/04**；**枪兵**；女王立绘；
- **2023/12/1**；**乐子人**；写入新怪物和新装备；
- **2023/11/30**；**乐子人**；写入新怪物，重做精准机制，引入暴击控制插件；
- **2023/11/29**；**乐子人**；写入新装备，加入额外收集任务；薇薇安数值微调；
- **2023/11/28**；**乐子人**；数值调整，写入十字岛副本怪物；
- **2023/11/27**；**乐子人**；降低海妖城怪物等级，给鸡鹅彩蛋添加等级限制；
- **2023/11/25**；**乐子人**；细节优化，神鹅技能调整，无效化伤害的提示优化；数值调整；
- **2023/11/25**；**乐子人**；更新状态叠加脚本和伤害格挡/加深机制，并调整相应技能；全体技能强度下调；
- **2023/11/23**；**枪兵**；发现bug；
- **2023/11/22**；**乐子人**；优化vva和滚技能组；
- **2023/11/19**；**乐子人**；优化主角团技能组；
- **2023/11/19**；**乐子人**；白火技能组细节调整；更新图标；薇薇安技能组半重做；更新伊丽莎白立绘；新增属性吸收；重做流血效果；
- **2023/11/18**；**乐子人**；辅助技能强度调整；重做白火技能组；修改普攻和技能特效实现方式；
- **2023/11/17**；**枪兵**；修bug可以打女王了
- **2023/11/16**；**枪兵**；修bug老王可以启动了
- **2023/11/14**；**乐子人**；修技能bug，更改状态自然结束时间判定；
- **2023/11/12**；**乐子人**；修伊丽莎白技能bug，优化技能显示层面表现；
- **2023/11/11**；**乐子人**；修伊丽莎白技能bug；
- **2023/11/08**；**枪兵**；修bug；
- **2023/11/04**；**乐子人**；技能优化并修复狗莉注释BUG，将SF_ExportSaveFile和SF_ReserveMemberExp配置；
- **2023/11/02**；**乐子人**；引入YEP_ElementCore并修改细节；
- **2023/10/29**；**乐子人**；修改诺兰一个技能；
- **2023/10/28**；**乐子人**；薇薇安加强，重做反击机制和诺兰被动，取消怪物释放技能的前置动画，补充战斗资料库；
- **2023/10/27**；**枪兵**；修bug；
- **2023/10/21**；**乐子人**；细节修改；
- **2023/10/14**；**枪兵**；修复海底事件前的bug；
- **2023/10/14**；**乐子人**；重做诺兰技能组，新增状态狂躁诅咒；
- **2023/10/10**；**乐子人**；怪物数值加强，修复部分剧情BUG，新增装备限制；
- **2023/10/9**；**乐子人**；怪物数值加强，修复部分剧情BUG；
- **2023/10/8**；**乐子人**；完成女王BOSS战，补充支线任务，规范经验数值，等；
- **2023/10/8**；**乐子人**；测试与修BUG；
- **2023/10/5**；**乐子人**；新增装备；
- **2023/10/5**；**乐子人**；技能优化，完成神鹅副本；
- **2023/10/4**；**乐子人**；修复流血机制的BUG，完成鸡神副本，三八技能效果实现方式优化；
- **2023/10/3**；**乐子人**；重新规划数值；
- **2023/9/7**；**乐子人**；技能细节修改；
- **2023/9/6**；**乐子人**；技能细节修改；
- **2023/9/3**；**乐子人**；重做南宫三八一个技能，补充伊丽莎白技能组细节；
- **2023/9/3**；**乐子人**；怪物数值重做，补充技能和动画；
- **2023/9/3**；**乐子人**；细节修改；
- **2023/9/2**；**乐子人**；郝仁的审查官配枪改为被动，新增法球效果“恐惧侵蚀”；
- **2023/9/2**；**乐子人**；优化莉莉的核心技能实现方式使之更稳定；
- **2023/9/2**；**乐子人**；将角色和怪物受伤修饰的所有状态进行集成化；
- **2023/8/30**；**乐子人**；完成伊丽莎白技能组重做，补充动画，等；
- **2023/6/9**；**乐子人**；用状态核心做免死和复活技能，等；
- **2023/6/7**；**乐子人**；补充伤害免疫和治疗溢出转化为护盾的效果，等；
- **2023/5/7**；**不明枪兵**；豆豆星大海画了一半
- **2023/5/6**；**乐子人**；技能和剧情表现优化
- **2023/5/5**；**不明枪兵**；修改海妖篇开启模式，修了一点点bug
- **2023/5/1**；**乐子人**；优化爪子类装备效果，回档Iconset.png，怪物图标bug提前量修正
- **2023/4/30**；**乐子人**；完成战斗资料库
- **2023/4/30**；**乐子人**；完善血条插件和实景小地图插件显示效果
- **2023/4/29**；**乐子人**；用YEP_MessageCore完善战斗资料库
- **2023/4/29**；**乐子人**；高级箱子插件，文本颜色，技能优化等等
- **2023/4/29**；**乐子人**；测试文本颜色修改、配置合成插件、物品说明应用YEP_MessageCore、新图标应用
- **2023/4/28**；**不明枪兵**；一些图标
- **2023/4/28**；**乐子人**；优化滚、老王、五月的技能组
- **2023/4/26**；**乐子人**；所有队员技能说明里应用YEP_MessageCore
- **2023/4/17**；**乐子人**；BUG修复
- **2023/4/17**；**不明枪兵**；冰火爪动画，秒杀动画，研究站bud调整
- **2023/4/16**；**乐子人**；YEP_MessageCore应用和BUG修复，优化开局剧情
- **2023/4/15**；**乐子人**；新增YEP_MessageCore插件,，并在郝仁的技能说明中应用
- **2023/4/9**；**不明枪兵**；试玩版bug调整
- **2023/4/7**；**乐子人**；修改老王机制，修改技能显示，解决红月颜色bug
- **2023/4/9**；**不明枪兵**；海妖立绘调整
- **2023/4/7**；**乐子人**；增加战斗被动复活机制，更换状态图标等
- **2023/4/7**；**乐子人**；淘汰状态叠加和状态替换插件，精简状态数量，优化部分技能机制
- **2023/4/1**；**乐子人**；新增插件，完善技能效果
- **2023/3/31**；**乐子人**；完善缴械机制和控制对技能的封禁
- **2023/3/31**；**不明枪兵**；添加火山怪和硫酸怪高等级免战即死
- **2023/3/29**；**不明枪兵**；解决硫酸史莱姆事件和研究站bug
- **2023/3/28**；**乐子人**；解决一些技能bug
- **2023/3/9**；**乐子人**；优化脑怪战斗剧情，重做郝籽机制
- **2023/2/18**；**乐子人**；诺兰的技能树
- **2022/11/20**；**不明枪兵**；推进一点点剧情
- **2022/11/14**；**乐子人**；BGM添加，技能添加，白火职业完善
- **2022/11/13**；**乐子人**；职业技能列表、亚菲莉丝事件、MP4文件清理
- **2022/10/28**；**不明枪兵**；制作伊娃之战
- **2022/10/23**；**咸鱼**；加载 ogg 音频文件 #10
- **2022/10/17**；**不明枪兵**；彩蛋完成
- **2022/10/16**；**不明枪兵**；推进剧情
- **2022/10/16**；**乐子人**；优化地图，确认内容丢失情况
- **2022/10/07**；**不明枪兵**；前置剧情完成
- **2022/10/07**；**不明枪兵**；把异常一的音效复制过来了，调整了飞船事件。
- **2022/10/05**；**乐子人**；补充怪物，补充开场释放的技能
- **2022/10/04**；**乐子人**；写入实现新插件功能需要做的备注，写入部分武器和防具
- **2022/10/02**；**不明枪兵**；现有文案制作完成。。
- **2022/9/26**；**不明枪兵**；剧情格式更改完成，开始制作前言。
- **2022/9/24**；**咸鱼**；添加了状态叠加插件 #2
- **2022/9/24**；**咸鱼**；添加了状态覆盖插件 #1
- **2022/9/17**；**咸鱼**；修改了 Galv_MessageBusts 支持了预先扫描文件来获取相关信息
- **2022/9/17**；**咸鱼**；添加了普攻替换插件 #3
- **2022/9/7**；**面具**；数值整理，素材整理，添加怪物
- **2022/8/30**；**不明枪兵**；更新海上的剧情
- **2022/8/25**；**不明枪兵**；更新海滩前的剧情
- **2022/8/7**；**不明枪兵**；更新三分钟剧情
- **2022/8/7**；**面具**；将system.json和MapInfos.josn回退到历史版本
- **2022/8/7**；**不明枪兵**；增加尖叫技能动画
- **2022/8/7**；**面具**；技能细节优化，角色补充等
- **2022/8/6**；**不明枪兵**；增加星港地图，调整碰撞，增加传送事件调整地图联系
- **2022/8/6**；**不明枪兵**；增加纳萨托恩特效
- **2022/8/5**；**不明枪兵**；增加梦位面宇宙背景图
- **2022/8/5**；**面具**；技能优化和角色平衡，怪物技能写入部分
- **2022/8/2**；**面具**；写入郝籽技能，等
- **2022/8/1**；**面具**；写入猫娘技能，等
- **2022/7/31**；**面具**；写入狗莉技能，等
- **2022/7/24**；**面具**；写入老王父女技能，等
- **2022/7/24**；**咸鱼**；添加`Test_Quests.json`来能启动测试。
- <b>2022/7/23</b>；<b>面具</b>；写入南宫三八技能，优化旧技能并整理装备类型
