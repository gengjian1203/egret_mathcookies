var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by Administrator on 2014/9/10.
*/
var NewMain = (function (_super) {
    __extends(NewMain, _super);
    function NewMain() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    NewMain.prototype.onAddToStage = function (event) {
        // 设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        // 初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigCompelete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    };

    /**
    * 配置文件加载完成,开始预加载preload资源组。
    */
    NewMain.prototype.onConfigCompelete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigCompelete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadCompelete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    };

    /**
    * preload资源组加载完成
    */
    NewMain.prototype.onResourceLoadCompelete = function (event) {
        if ("preload" == event.groupName) {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadCompelete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
        }
    };

    /**
    * preload资源组加载进度
    */
    NewMain.prototype.onResourceProgress = function (event) {
        if ("preload" == event.groupName) {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };

    /**
    * 创建游戏场景
    */
    NewMain.prototype.createGameScene = function () {
        this.bgContain = new egret.Bitmap();
        this.bgContain.texture = RES.getRes("bgContain");
        this.bgContain.x = this.stage.stageWidth * 0.5;
        this.bgContain.y = this.stage.stageHeight * 0.5;
        this.bgContain.anchorX = 0.5;
        this.bgContain.anchorY = 0.5;
        this.bgContain.width = this.bgContain.width + this.stage.stageWidth;
        this.bgContain.height = this.bgContain.height + this.stage.stageHeight;

        this.bgContain.fillMode = egret.BitmapFillMode.REPEAT;
        this.addChild(this.bgContain);

        var menu = new Menu();
        this.addChild(menu);
    };
    return NewMain;
})(egret.DisplayObjectContainer);
NewMain.prototype.__class__ = "NewMain";
