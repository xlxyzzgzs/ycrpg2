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
- **2023/4/16**；**乐子人**；YEP_MessageCore应用和BUG修复
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
