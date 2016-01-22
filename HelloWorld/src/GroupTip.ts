/**
 * Created by lenovo on 2014-09-15.
 */
class  GroupTip extends egret.Sprite
{
    private winWidth:number;
    private winHeight:number;
    private tmpHeight:number;

    private bgTip:egret.Bitmap;

    public strText:Array<string>=["质数饼干","可被2整除的饼干","可被3整除的饼干" ,"个位是3的饼干","十位是6的饼干","十位与个位数字相同的饼干","大于60的饼干","小于40的饼干"];
    public strTip1:egret.TextField;
    public nTip1:number;
    public strTip2:egret.TextField;
    public nTip2:number;

    public constructor(nWidth:number, nHeight:number) {
        super();
        this.winWidth = nWidth;
        this.winHeight = nHeight;
        this.tmpHeight = (nHeight - nWidth) / 2;
        this.createTips();
    }

    private createTips()
    {
        var rand;
        // 绘制出提示面板
        this.bgTip = new egret.Bitmap();
        this.bgTip.texture = RES.getRes("Tip");
        this.bgTip.scaleX = 3.5;
        this.bgTip.scaleY = 2.0;
        this.addChild(this.bgTip);

        rand = Math.floor(Math.random() * 8);
        // 绘制第一个提示语句
        this.strTip1 = new egret.TextField();
        this.nTip1 = rand;
        this.strTip1.text = this.strText[this.nTip1];
        this.strTip1.x = this.width * 0.5;
        this.strTip1.y = this.height * 0.25;
        this.strTip1.anchorX = 0.5;
        this.strTip1.anchorY = 0.5;
        this.strTip1.size = 25;
        this.strTip1.textAlign = egret.HorizontalAlign.CENTER;
        this.strTip1.textColor = 0x000000;
        this.addChild(this.strTip1);

        // 绘制第二个提示语句
        this.strTip2 = new egret.TextField();
        this.nTip2 = (rand + 1) % 8;
        this.strTip2.text = this.strText[this.nTip2];
        this.strTip2.x = this.width * 0.5;
        this.strTip2.y = this.height * 0.6;
        this.strTip2.anchorX = 0.5;
        this.strTip2.anchorY = 0.5;
        this.strTip2.size = 25;
        this.strTip2.textAlign = egret.HorizontalAlign.CENTER;
        this.strTip2.textColor = 0x000000;
        this.addChild(this.strTip2);
    }
    // 翻译是否满足
    public isTipRight(num:number):boolean
    {
        var bTip1:boolean;
        var bTip2:boolean;
        bTip1 = this.isSureTip1(num);
        bTip2 = this.isSureTip2(num);

        return ( bTip1 || bTip2 );
    }

    // 判断是否满足条件1
    private isSureTip1(num:number):boolean
    {
        var bTemp:boolean;
        switch (this.nTip1)
        {
            case 0:
            {
                bTemp = this.FunTip0(num);
                break;
            }
            case 1:
            {
                bTemp = this.FunTip1(num);
                break;
            }
            case 2:
            {
                bTemp = this.FunTip2(num);
                break;
            }
            case 3:
            {
                bTemp = this.FunTip3(num);
                break;
            }
            case 4:
            {
                bTemp = this.FunTip4(num);
                break;
            }
            case 5:
            {
                bTemp = this.FunTip5(num);
                break;
            }
            case 6:
            {
                bTemp = this.FunTip6(num);
                break;
            }
            case 7:
            {
                bTemp = this.FunTip7(num);
                break;
            }
            default :
            {
                bTemp = false;
            }
        }
        if(bTemp)
        {
            var rand:number;
            this.strTip1.alpha = 0.0;
            this.strTip1.scaleX = 0.0;
            this.strTip1.scaleY = 0.0;
            do{
                rand = Math.floor(Math.random() * 8);
            }while(rand == this.nTip2);
            this.nTip1 = rand;
            this.strTip1.text = this.strText[this.nTip1];

            var tw = egret.Tween.get( this.strTip1);
            tw.wait(200).to( {scaleX:1.0, scaleY:1.0, alpha:1.0}, 500);
        }
        return bTemp;
    }

    // 判断是否满足条件2
    private isSureTip2(num:number):boolean
    {
        var bTemp:boolean;
        switch (this.nTip2)
        {
            case 0:
            {
                bTemp = this.FunTip0(num);
                break;
            }
            case 1:
            {
                bTemp = this.FunTip1(num);
                break;
            }
            case 2:
            {
                bTemp = this.FunTip2(num);
                break;
            }
            case 3:
            {
                bTemp = this.FunTip3(num);
                break;
            }
            case 4:
            {
                bTemp = this.FunTip4(num);
                break;
            }
            case 5:
            {
                bTemp = this.FunTip5(num);
                break;
            }
            case 6:
            {
                bTemp = this.FunTip6(num);
                break;
            }
            case 7:
            {
                bTemp = this.FunTip7(num);
                break;
            }
            default :
            {
                bTemp = false;
            }
        }
        if(bTemp)
        {
            var rand:number;
            this.strTip2.alpha = 0.0;
            this.strTip2.scaleX = 0.0;
            this.strTip2.scaleY = 0.0;
            do{
                rand = Math.floor(Math.random() * 8);
            }while(rand == this.nTip1);
            this.nTip2 = rand;
            this.strTip2.text = this.strText[this.nTip2];

            var tw = egret.Tween.get( this.strTip2);
            tw.wait(200).to( {scaleX:1.0, scaleY:1.0, alpha:1.0}, 500);
        }
        return bTemp;
    }

    // Tip0  质数饼干
    private FunTip0(num:number):boolean
    {
        var nTemp:Array<number> = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
        for(var i = 0; i < 25; i++)
        {
            if(nTemp[i] == num)
            {
                return true;
            }
        }
        return false;
    }

    // Tip1  可被2整除的饼干
    private FunTip1(num:number):boolean
    {
        return !(num % 2);
    }

    // Tip2  可被3整除的饼干
    private FunTip2(num:number):boolean
    {
        return !(num % 3);
    }

    // Tip3 个位是3的饼干
    private  FunTip3(num:number):boolean
    {
        var nTemp:Array<number> = [3, 13, 23, 33, 43, 53, 63, 73, 83, 93];
        for(var i = 0; i < 10; i++)
        {
            if(nTemp[i] == num)
            {
                return true;
            }
        }
        return false;
    }

    // Tip4 十位是6的饼干
    private  FunTip4(num:number):boolean
    {
        var nTemp:Array<number> = [60, 61, 62, 63, 64, 65, 66, 67, 68, 69];
        for(var i = 0; i < 10; i++)
        {
            if(nTemp[i] == num)
            {
                return true;
            }
        }
        return false;
    }

    // Tip5 十位与个位数字相同的饼干
    private FunTip5(num:number):boolean
    {
        var nTemp:Array<number> = [11, 22, 33, 44, 55, 66, 77, 88, 99];
        for(var i = 0; i < 9; i++)
        {
            if(nTemp[i] == num)
            {
                return true;
            }
        }
        return false;
    }

    // Tip6 大于60的饼干
    private  FunTip6(num:number):boolean
    {
        return (num > 60);
    }

    // Tip7 小于40的饼干
    private  FunTip7(num:number):boolean
    {
        return (num < 40);
    }
}