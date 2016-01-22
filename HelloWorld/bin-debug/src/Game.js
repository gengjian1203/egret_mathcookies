var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by Administrator on 2014/9/10.
*/
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.readyGame, this);
        //this.touchEnabled = true;
        //this.touchChildren = true;
    }
    Game.prototype.readyGame = function () {
        // 获取屏幕大小（未认证）
        this.winWidth = this.stage.stageWidth;
        this.winHeight = this.stage.stageHeight;

        // 生成游戏精灵
        this.sprGame = new egret.Sprite();
        this.addChild(this.sprGame);

        // 书写游戏得分
        this.nGameScore = 0;
        this.strGameScore = new egret.TextField();
        this.strGameScore.x = this.winWidth * 0.25;
        this.strGameScore.y = this.winHeight * 0.05;
        this.strGameScore.anchorX = 0.5;
        this.strGameScore.anchorY = 0.5;
        this.strGameScore.size = 30;
        this.strGameScore.textAlign = egret.HorizontalAlign.CENTER;
        this.strGameScore.textColor = 0xFFFFFF;
        this.strGameScore.text = "得分：" + String(this.nGameScore);
        this.strGameScore.strokeColor = 0xFF0000;
        this.strGameScore.stroke = 2;
        this.sprGame.addChild(this.strGameScore);

        // 书写游戏时间
        this.nGameTime = 60;
        this.strGameTime = new egret.TextField();
        this.strGameTime.x = this.winWidth * 0.7;
        this.strGameTime.y = this.winHeight * 0.05;
        this.strGameTime.anchorX = 0.5;
        this.strGameTime.anchorY = 0.5;
        this.strGameTime.size = 30;
        this.strGameTime.textAlign = egret.HorizontalAlign.CENTER;
        this.strGameTime.textColor = 0xFFFFFF;
        this.strGameTime.text = "时间：" + String(this.nGameTime);
        this.strGameTime.strokeColor = 0xFF0000;
        this.strGameTime.stroke = 2;
        this.sprGame.addChild(this.strGameTime);

        // 绘制盘子
        this.bgPanzi = new egret.Bitmap();
        this.bgPanzi.texture = RES.getRes("bgPanzi");
        this.bgPanzi.x = this.winWidth * 0.5;
        this.bgPanzi.y = this.winHeight * 0.55;
        this.bgPanzi.anchorX = 0.5;
        this.bgPanzi.anchorY = 0.5;
        this.bgPanzi.scaleX = 2.3;
        this.bgPanzi.scaleY = 2.3;
        this.sprGame.addChild(this.bgPanzi);

        // 准备字符
        this.strReadyGo = new egret.TextField();
        this.strReadyGo.x = this.winWidth * 0.5;
        this.strReadyGo.y = this.winHeight * 0.5;
        this.strReadyGo.anchorX = 0.5;
        this.strReadyGo.anchorY = 0.5;
        this.strReadyGo.size = 300;
        this.strReadyGo.textAlign = egret.HorizontalAlign.CENTER;
        this.strReadyGo.textColor = 0x00FF00;

        //this.strReadyGo.strokeColor = 0x990099;
        //this.strReadyGo.stroke = 2;
        this.strReadyGo.text = "Ready";
        this.strReadyGo.alpha = 0.0;
        this.sprGame.addChild(this.strReadyGo);

        var tw = egret.Tween.get(this.strReadyGo);
        tw.to({ alpha: 1.0, scaleX: 0.1, scaleY: 0.1 }, 500).wait(300);
        tw.call(this.ShowGo, this);

        //广告
        var adBaner = new egret.Bitmap();
        adBaner.texture = RES.getRes("Ad"); //获取资源
        adBaner.x = this.winWidth * 0.5;
        adBaner.y = this.winHeight * 0.9;
        adBaner.anchorX = 0.5;
        adBaner.anchorY = 0;
        adBaner.touchEnabled = true;
        adBaner.addEventListener(egret.TouchEvent.TOUCH_TAP, this.switchToDownloadPage, this); //跳转到下载页面
        this.sprGame.addChild(adBaner);
    };

    // 广告
    Game.prototype.switchToDownloadPage = function () {
        //            window.location.href = "http://106.186.27.20/AdManager/hsxdshortlink.php";
        //        window.location.href = "http://shop33649836.m.taobao.com";
        window.open("http://shop33649836.m.taobao.com", "newwindow", "fullscreen=yes");
    };

    Game.prototype.ShowGo = function () {
        this.strReadyGo.text = "Go ! ! !";
        var tw = egret.Tween.get(this.strReadyGo);
        tw.to({ alpha: 0.0, scaleX: 0.2, scaleY: 0.2 }, 500);
        tw.call(this.startGame, this);
    };

    Game.prototype.startGame = function () {
        console.log("startGame");

        this.sprGame.removeChild(this.strReadyGo);

        // 设置剩余时间计时器
        this.leftTimer = new egret.Timer(1000, 60);
        this.leftTimer.start();
        this.leftTimer.addEventListener(egret.TimerEvent.TIMER, this.LeftTimerFunc, this);

        this.group = new GroupCooky(this.winWidth, this.winHeight);

        this.sprGame.addChild(this.group);
        this.group.addEventListener("clickTrue", this.onClickTrue, this);
        this.group.addEventListener("clickFalse", this.onClickFalse, this);
    };

    // 定时器每秒刷新剩余时间
    Game.prototype.LeftTimerFunc = function () {
        this.nGameTime--;
        if (this.nGameTime <= 0) {
            this.leftTimer.stop();
            console.log("Time Up!");
            this.removeChild(this.sprGame);
            var scene = new MathCookys.GameOver(this.nGameScore);
            this.addChild(scene);
        } else {
            console.log("LeftTime = " + this.nGameTime);
            this.strGameTime.text = "时间：" + String(this.nGameTime);
        }
    };

    // 点击正确消息响应
    Game.prototype.onClickTrue = function () {
        this.nGameScore++;
        this.strGameScore.text = "得分：" + String(this.nGameScore);
        console.log("Click True");
    };

    // 点击错误消息响应
    Game.prototype.onClickFalse = function () {
        this.nGameTime -= 5;
        if (this.nGameTime < 5) {
            this.nGameTime = 0;
        }
        this.strGameTime.text = "时间：" + String(this.nGameTime);
        console.log("Click False");
    };
    return Game;
})(egret.DisplayObjectContainer);
Game.prototype.__class__ = "Game";
