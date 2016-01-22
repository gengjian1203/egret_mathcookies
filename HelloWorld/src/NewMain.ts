/**
 * Created by Administrator on 2014/9/10.
 */
class NewMain extends egret.DisplayObjectContainer
{
    private loadingView:LoadingUI;

    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage , this);
    }

    private onAddToStage(event:egret.Event)
    {
        // 设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        // 初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigCompelete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    }
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    private onConfigCompelete(event:RES.ResourceEvent):void
    {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigCompelete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadCompelete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    }
    /**
     * preload资源组加载完成
     */
    private onResourceLoadCompelete(event:RES.ResourceEvent):void
    {
        if("preload" == event.groupName)
        {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadCompelete, this)
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
        }
    }
    /**
     * preload资源组加载进度
     */
    private onResourceProgress(event:RES.ResourceEvent):void
    {
        if("preload" == event.groupName)
        {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }
    // 背景图片
    private bgContain:egret.Bitmap;

    /**
     * 创建游戏场景
     */
    private createGameScene():void
    {
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

        var menu:Menu = new Menu();
        this.addChild(menu);
    }
}