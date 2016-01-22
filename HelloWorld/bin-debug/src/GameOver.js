var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by lenovo on 2014-09-15.
*/
var MathCookys;
(function (MathCookys) {
    var GameOver = (function (_super) {
        __extends(GameOver, _super);
        function GameOver(score) {
            _super.call(this);
            MathCookys.GameOver.scoreResult = score;

            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.createUI, this);
        }
        GameOver.prototype.createUI = function () {
            var winWidth = this.stage.stageWidth;
            var winHeight = this.stage.stageHeight;

            this.bgContain = new egret.Sprite();
            this.bgContain.graphics.beginFill(0xf06060);
            this.bgContain.graphics.drawRect(0, 0, winWidth, winHeight);
            this.bgContain.graphics.endFill();
            this.addChild(this.bgContain);

            // 提示信息
            this.scoreLabel = new egret.TextField();
            this.scoreLabel.x = winWidth * 0.5;
            this.scoreLabel.y = winHeight * 0.2;
            this.scoreLabel.anchorX = 0.5;
            this.scoreLabel.anchorY = 0.5;
            this.scoreLabel.size = 25;
            this.scoreLabel.textAlign = egret.HorizontalAlign.CENTER;
            this.scoreLabel.textColor = 0x000000;
            this.scoreLabel.text = "这位英雄，\n你一口气干掉了" + MathCookys.GameOver.scoreResult + "块饼干，\n难道你不口渴么？？\n~ (¯(∞)¯) ";
            this.bgContain.addChild(this.scoreLabel);

            // 重玩按钮
            var reStartBtn = new egret.Bitmap();
            reStartBtn = new egret.Bitmap();
            reStartBtn.texture = RES.getRes("button");
            reStartBtn.x = winWidth * 0.5;
            reStartBtn.y = winHeight * 0.7;
            reStartBtn.anchorX = 0.5;
            reStartBtn.anchorY = 0.5;
            reStartBtn.scaleX = 3.5;
            reStartBtn.scaleY = 2.5;
            reStartBtn.touchEnabled = true;
            reStartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startNewGame, this); //点击按钮开始游戏
            this.bgContain.addChild(reStartBtn);

            // 按钮文本
            this.btnLabel = new egret.TextField();
            this.btnLabel.x = winWidth * 0.5;
            this.btnLabel.y = winHeight * 0.7;
            this.btnLabel.anchorX = 0.5;
            this.btnLabel.anchorY = 0.5;
            this.btnLabel.size = 25;
            this.btnLabel.textAlign = egret.HorizontalAlign.CENTER;
            this.btnLabel.textColor = 0xFFFFFF;
            this.btnLabel.text = "再来一次";
            this.bgContain.addChild(this.btnLabel);

            //广告
            var adBaner = new egret.Bitmap();
            adBaner.texture = RES.getRes("Ad"); //获取资源
            adBaner.x = winWidth * 0.5;
            adBaner.y = winHeight * 0.9;
            adBaner.anchorX = 0.5;
            adBaner.anchorY = 0;
            adBaner.touchEnabled = true;
            adBaner.addEventListener(egret.TouchEvent.TOUCH_TAP, this.switchToDownloadPage, this); //跳转到下载页面
            this.bgContain.addChild(adBaner);

            WeixinApi.ready(function (api) {
                var info = new WeixinShareInfo();

                info.title = "口干舌燥，怒吃" + MathCookys.GameOver.scoreResult + "块饼干，" + "我是吃货，跪求一虐，跪求超越！";
                info.desc = "根据要求吃掉对应的饼干，分享给好友，一起寻找身边的终极吃货吧！~~";
                info.link = "http://101.251.194.57/MathCookys/index.html";
                info.imgUrl = "http://101.251.194.57/MathCookys/gameIcon/Cooky.png";

                api.shareToFriend(info);

                var timelineInfo = new WeixinShareInfo();

                timelineInfo.desc = "口干舌燥，怒吃" + MathCookys.GameOver.scoreResult + "块饼干，" + "我是吃货，跪求一虐，跪求超越！~~~~~~";
                timelineInfo.title = "数字饼干";
                timelineInfo.link = "http://101.251.194.57/MathCookys/index.html";
                timelineInfo.imgUrl = "http://101.251.194.57/MathCookys/gameIcon/Cooky.png";
                api.shareToTimeline(timelineInfo);
            });
        };

        // 广告
        GameOver.prototype.switchToDownloadPage = function () {
            //            window.location.href = "http://106.186.27.20/AdManager/hsxdshortlink.php";
            //            window.location.href = "http://shop33649836.m.taobao.com";
            window.open("http://shop33649836.m.taobao.com", "newwindow", "fullscreen=yes");
        };

        GameOver.prototype.startNewGame = function () {
            this.removeChild(this.bgContain);
            var newGame = new Game();
            this.addChild(newGame);
        };
        return GameOver;
    })(egret.DisplayObjectContainer);
    MathCookys.GameOver = GameOver;
    GameOver.prototype.__class__ = "MathCookys.GameOver";
})(MathCookys || (MathCookys = {}));
