/**
 * Created by Administrator on 2014/9/11.
 */
class Cooky extends egret.DisplayObjectContainer
{
    // 标记数字
    public nSign:number;
    //  对象饼干
    public bmpCooky:egret.Bitmap;
    // 数字对象
    public strSign:egret.TextField;
    // 下划线对象
    private strLine:egret.TextField;
    // 错误标记
    public SignFalse:egret.Bitmap;

    public constructor(nNum:number)
    {
        super();
        this.nSign = nNum;
        this.touchEnabled = true;
        this.draw();
    }

    private draw()
    {
        console.log("One Cooky draw!!!");

        // 生成背景精灵
        //this.sprCooky = new egret.Sprite();
        //this.sprCooky.anchorX = 0.5;
        //this.sprCooky.anchorY = 0.5;
        //this.addChild(this.sprCooky);

        // 绘制饼干
        this.bmpCooky = new egret.Bitmap();
        this.bmpCooky.texture = RES.getRes("Cooky");
        this.bmpCooky.scaleX = 0.0;
        this.bmpCooky.scaleY = 0.0;
        //this.bmpCooky.anchorX = 0.5;
        //this.bmpCooky.anchorY = 0.5;
        this.addChild(this.bmpCooky);

        // 饼干生成动画
        var tw = egret.Tween.get( this.bmpCooky/*, {loop:true} */);
        tw.to( {scaleX:2.2, scaleY:2.2}, 100).to( {scaleX:2.0, scaleY:2.0}, 100 );

        // 数字对象
        this.strSign = new egret.TextField();
        this.strSign.text = String(this.nSign);
        this.strSign.x = this.bmpCooky.width;
        this.strSign.y = this.bmpCooky.height;
        this.strSign.anchorX = 0.5;
        this.strSign.anchorY = 0.5;
        this.addChild(this.strSign);

        // 下划线对象
        this.strLine = new egret.TextField();
        this.strLine.text = "__";
        this.strLine.bold = true;
        this.strLine.x = this.bmpCooky.width;
        this.strLine.y = this.bmpCooky.height;
        this.strLine.anchorX = 0.5;
        this.strLine.anchorY = 0.5;
        this.addChild(this.strLine);

        // 错误标记
        this.SignFalse = new egret.Bitmap();
        this.SignFalse.texture = RES.getRes("False");
        this.SignFalse.x = this.bmpCooky.width;
        this.SignFalse.y = this.bmpCooky.height;
        this.SignFalse.alpha = 0.0;
        this.SignFalse.anchorX = 0.5;
        this.SignFalse.anchorY = 0.5;
        this.addChild(this.SignFalse);
    }

}