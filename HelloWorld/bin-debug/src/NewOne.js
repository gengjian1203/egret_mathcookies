var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by Administrator on 2014/9/4.
*/
var NewOne = (function (_super) {
    __extends(NewOne, _super);
    function NewOne() {
        _super.call(this);
        console.log("修改了文档类，新的文档类为NewOne");

        var spr = new egret.Sprite();
        spr.graphics.lineStyle(5, 0xff00000);
        spr.graphics.beginFill(0xffffff);
        spr.graphics.drawRect(0, 0, 100, 100);
        spr.graphics.endFill();
        this.addChild(spr);
    }
    return NewOne;
})(egret.DisplayObjectContainer);
NewOne.prototype.__class__ = "NewOne";
