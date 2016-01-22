/**
 * Created by Administrator on 2014/9/11.
 */
class  GroupCooky extends egret.Sprite {
    private winWidth:number;
    private winHeight:number;
    private tmpHeight:number;

    // 提示信息对象
    private tip:GroupTip;

    public constructor(nWidth:number, nHeight:number) {
        super();
        this.winWidth = nWidth;
        this.winHeight = nHeight;
        this.tmpHeight = (nHeight - nWidth) / 5 * 3;
        this.createCookys();
    }

    private _Cookys:Array<Cooky>;
    private _CoX:Array<number> = [0.3, 0.7, 0.1, 0.5, 0.9, 0.1, 0.5, 0.9, 0.3, 0.7];
    private _CoY:Array<number> = [0.9, 0.9, 0.65, 0.65, 0.65, 0.3, 0.3, 0.3, 0.05, 0.05];

    private createCookys()
    {
        // 绘制提示
        this.tip = new GroupTip(this.winWidth, this.winHeight);
        this.tip.x = this.winWidth * 0.5;
        this.tip.y = this.winHeight * 0.15;
        this.tip.anchorX = 0.5;
        this.tip.anchorY = 0.5;
        this.tip.scaleX = 0.0;
        this.tip.scaleY = 0.0;
        this.addChild(this.tip);
        var tw = egret.Tween.get( this.tip );
        tw.to( {scaleX:1.0, scaleY:1.0}, 1000);

        this._Cookys = [];
        for (var i = 0; i < 10; i++) {
            var cooky:Cooky = new Cooky(Math.floor(Math.random() * 99) + 1);
            this._Cookys.push(cooky);
            cooky.x = 0.15 * this.winWidth + 0.7 * this.winWidth * this._CoX[i];
            cooky.y = 0.15 * this.winWidth + 0.7 * this.winWidth * this._CoY[i] + this.tmpHeight;
            //cooky.x = (Math.random() * 0.5 + 0.25) * this.winWidth;
            //cooky.y = (Math.random() * 0.5 + 0.25) * this.winWidth + this.tmpHeight;
            var rand:number;
            rand = Math.random() * 120;
            if (rand > 60)
            {
                cooky.rotation = 360 - rand / 2;
            }
            else
            {
                cooky.rotation = rand;
            }

            cooky.anchorX = 0.5;
            cooky.anchorY = 0.5;
            this.addChild(cooky);

            // 饼干整体动画
            var tw = egret.Tween.get(cooky, {loop: true});
            tw.to({x: cooky.x + 2}, 50).to({y: cooky.y + 2}, 50).to({x: cooky.x - 4}, 50).to({y: cooky.y - 4}, 50).to({x: cooky.x + 4}, 50).to({y: cooky.y + 2}, 50).to({x: cooky.x - 2}, 50).wait(Math.floor(Math.random() * 8000) + 3000);

            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickCooky, this);
        }
    }

    private onClickCooky(evt:egret.TouchEvent) {
        console.log(String(evt.target.nSign));
        if (this.isClickRight(evt.target.nSign))
        {
            this.dispatchEventWith("clickTrue");
            evt.target.nSign = Math.floor(Math.random() * 99) + 1;
            evt.target.strSign.text = String(evt.target.nSign);

            evt.target.alpha = 0.0;
            evt.target.scaleX = 0.0;
            evt.target.scaleY = 0.0;
            evt.target.x = (Math.random() * 0.5 + 0.25) * this.winWidth;
            evt.target.y = (Math.random() * 0.5 + 0.25) * this.winWidth + this.tmpHeight;

            var rand:number;
            rand = Math.random() * 120;
            if (rand > 60)
            {
                evt.target.rotation = 360 - rand;
            }
            else
            {
                evt.target.rotation = rand - 60;
            }

            var twCooky = egret.Tween.get(evt.target);
            twCooky.wait(Math.floor(Math.random() * 2000) + 3000).to( {x:100, scaleX:1.0, scaleY:1.0, alpha:1.0}, 500);

        }
        else {
            this.dispatchEventWith("clickFalse");
            evt.target.SignFalse.alpha = 1.0;
            var tw = egret.Tween.get(evt.target.SignFalse);
            tw.to({alpha: 0.0}, 500).to({alpha: 1.0}, 500).to({alpha: 0.0}, 500);
        }

    }

    // 判断是否点击是否正确
    private isClickRight(num:number):boolean
    {
        return this.tip.isTipRight(num);
    }
}