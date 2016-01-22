/**
 * Created by Administrator on 2014/9/10.
 */
class Menu extends egret.DisplayObjectContainer
{
    public static mainAdBaner:egret.Bitmap;
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initMainUI, this);
    }
    // 菜单精灵
    private sprMenu:egret.Sprite;

    // 开始按钮
    private btnStart:egret.Bitmap;
    // 开始按钮字
    private strStart:egret.TextField;
    // 关于按钮
    private btnAbout:egret.Bitmap;
    // 关于按钮字
    private strAbout:egret.TextField;
    // 关于显示信息
    private strShow:egret.TextField;

    // 屏幕宽
    private winWidth:number;
    // 屏幕高
    private winHeight:number;
    // 游戏名称
    private strGameName:egret.TextField;
    // 游戏规则
    private strGameRule:egret.TextField;

    private initMainUI():void
    {
        // 获取屏幕大小（未认证）
        this.winWidth = this.stage.stageWidth;
        this.winHeight = this.stage.stageHeight;

        // 生成背景精灵
        this.sprMenu = new egret.Sprite();
        this.addChild(this.sprMenu);

        // 书写游戏名称
        this.strGameName = new egret.TextField();
        this.strGameName.x = this.winWidth * 0.5;
        this.strGameName.y = this.winHeight * 0.1;;
        this.strGameName.anchorX = 0.5;
        this.strGameName.anchorY = 0.5;
        this.strGameName.size = 40;
        this.strGameName.textAlign = egret.HorizontalAlign.CENTER;
        this.strGameName.textColor = 0xFFFF00;
        this.strGameName.text = "数字饼干";
        this.strGameName.strokeColor = 0xFF0000;
        this.strGameName.stroke = 2;
        this.sprMenu.addChild(this.strGameName);

        // 书写游戏规则
        this.strGameRule = new egret.TextField();
        this.strGameRule.x = this.winWidth * 0.5;
        this.strGameRule.y = this.winHeight * 0.2;
        this.strGameRule.anchorX = 0.5;
        this.strGameRule.anchorY = 0.5;
        this.strGameRule.size = 25;
        this.strGameRule.textAlign = egret.HorizontalAlign.CENTER;
        this.strGameRule.textColor = 0x000000;
        this.strGameRule.text = "游戏规则:\n根据要求，吃掉所有满足要求的饼干";
        this.sprMenu.addChild(this.strGameRule);

        // 绘制开始按钮
        this.btnStart = new egret.Bitmap();
        this.btnStart.texture = RES.getRes("button");
        this.btnStart.x = this.winWidth * 0.5;
        this.btnStart.y = this.winHeight * 0.7;
        this.btnStart.anchorX = 0.5;
        this.btnStart.anchorY = 0.5;
        this.btnStart.scaleX = 3.5;
        this.btnStart.scaleY = 2.5;
        this.btnStart.touchEnabled = true;
        this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGameStart, this);
        this.sprMenu.addChild(this.btnStart);

        // 绘制开始按钮字体
        this.strStart = new egret.TextField();
        this.strStart.x = this.winWidth * 0.5;
        this.strStart.y = this.winHeight * 0.7;
        this.strStart.anchorX = 0.5;
        this.strStart.anchorY = 0.5;
        this.strStart.size = 25;
        this.strStart._textAlign = egret.HorizontalAlign.CENTER;
        this.strStart.textColor = 0x000000;
        this.strStart.text = "开始游戏";
        this.sprMenu.addChild(this.strStart);

        // 绘制关于按钮
        this.btnAbout = new egret.Bitmap();
        this.btnAbout.texture = RES.getRes("button");
        this.btnAbout.x = this.winWidth * 0.5;
        this.btnAbout.y = this.winHeight * 0.8;
        this.btnAbout.anchorX = 0.5;
        this.btnAbout.anchorY = 0.5;
        this.btnAbout.scaleX = 3.5;
        this.btnAbout.scaleY = 2.5;
        this.btnAbout.touchEnabled = true;
        this.btnAbout.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGameAboutShow, this);
        this.btnAbout.addEventListener(egret.TouchEvent.TOUCH_END, this.onGameAboutHide, this);
        this.sprMenu.addChild(this.btnAbout);

        // 绘制关于按钮字体
        this.strAbout = new egret.TextField();
        this.strAbout.x = this.winWidth * 0.5;
        this.strAbout.y = this.winHeight * 0.8;
        this.strAbout.anchorX = 0.5;
        this.strAbout.anchorY = 0.5;
        this.strAbout.size = 25;
        this.strAbout._textAlign = egret.HorizontalAlign.CENTER;
        this.strAbout.textColor = 0x000000;
        this.strAbout.text = "关于我们";
        this.sprMenu.addChild(this.strAbout);

        // 绘制关于信息
        this.strShow = new egret.TextField();
        this.strShow.x = this.winWidth * 0.5;
        this.strShow.y = this.winHeight * 0.5;
        this.strShow.anchorX = 0.5;
        this.strShow.anchorY = 0.5;
        this.strShow.size = 20;
        this.strShow._textAlign = egret.HorizontalAlign.CENTER;
        this.strShow.textColor = 0x000000;
        this.strShow.strokeColor = 0xFFFFFF;
        this.strShow.stroke = 3;
        this.strShow.alpha = 0.0;
        this.strShow.text = "如果程序出现问题，请联系作者。\n我们尽快予以修复。\n在此感谢一切宝贵的意见。\nQQ：伞伊漆凌伊依衣散衣\n酝酿以堪"
        this.sprMenu.addChild(this.strShow);

        //广告
        var adBaner:egret.Bitmap = new egret.Bitmap();
        adBaner.texture = RES.getRes("Ad");  //获取资源
        adBaner.x = this.winWidth * 0.5;
        adBaner.y =  this.winHeight * 0.9;
        adBaner.anchorX = 0.5;
        adBaner.anchorY = 0;
        adBaner.touchEnabled = true;
        adBaner.addEventListener(egret.TouchEvent.TOUCH_TAP,this.switchToDownloadPage,this);  //跳转到下载页面
        this.sprMenu.addChild(adBaner);

        WeixinApi.ready(function (api:WeixinApi) {

            var info:WeixinShareInfo = new WeixinShareInfo();

            info.title = "专属吃货的福利-数字饼干";
            info.desc = "根据要求吃掉对应的饼干，分享给好友，一起寻找身边的终极吃货吧！";
            info.link = "http://101.251.194.57/MathCookys/index.html";
            info.imgUrl = "http://101.251.194.57/MathCookys/gameIcon/Cooky.png";

            api.shareToFriend(info);
            api.shareToTimeline(info);
        })
    }

    // 广告
    private switchToDownloadPage() {
//            window.location.href = "http://106.186.27.20/AdManager/hsxdshortlink.php";
//        window.location.href = "http://shop33649836.m.taobao.com";
        window.open("http://shop33649836.m.taobao.com", "newwindow", "fullscreen=yes");
    }

    // 游戏开始
    private onGameStart()
    {
        this.removeChild(this.sprMenu);
        var game:Game = new Game();
        this.addChild(game);
    }

    // 游戏关于信息显示
    private onGameAboutShow()
    {
        this.strShow.alpha = 1.0;
    }

    // 游戏关于信息隐藏
    private onGameAboutHide()
    {
        this.strShow.alpha = 0.0;
    }
}
