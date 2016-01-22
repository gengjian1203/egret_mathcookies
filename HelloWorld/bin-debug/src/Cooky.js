var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by Administrator on 2014/9/11.
*/
var Cooky = (function (_super) {
    __extends(Cooky, _super);
    function Cooky(nNum) {
        _super.call(this);
        this.nSign = nNum;
        this.touchEnabled = true;
        this.draw();
    }
    Cooky.prototype.draw = function () {
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
        var tw = egret.Tween.get(this.bmpCooky);
        tw.to({ scaleX: 2.2, scaleY: 2.2 }, 100).to({ scaleX: 2.0, scaleY: 2.0 }, 100);

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
    };
    return Cooky;
})(egret.DisplayObjectContainer);
Cooky.prototype.__class__ = "Cooky";
