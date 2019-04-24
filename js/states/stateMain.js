var StateMain = {
    preload: function () {
    },
    create: function () {
        //reset the score
        score = 0;


        this.secs=6;
        this.scoreText=game.add.text(game.world.centerX,0,"0");
        this.scoreText.anchor.set(0.5,0.5);
        this.scoreText.fontSize=120;
        this.scoreText.fill="#FFFFFF";
        this.scoreText.y=(this.scoreText.height/2)+15;

        this.timeText=game.add.text(game.world.centerX,0,"0");
        this.timeText.anchor.set(0.5,0.5);
        this.timeText.fontSize=32;
        this.timeText.fill="#FFFFFF";
        this.timeText.y=this.timeText.height/2;


        this.buttonGroup=game.add.group();
        this.card=game.add.sprite(game.worldcenterX,game.world.centerY, "cards");
        this.card.anchor.set(0.5,0.5);
        //this.pickRandCard();
        this.btnYes=game.add.sprite(0,0,"gameButtons");
        this.btnNo=game.add.sprite(this.btnYes.width+20,0,"gameButtons");
        this.btnNo.frame=1;
        this.btnYes.inputEnabled=true;
        this.btnNo.inputEnabled=true;
        this.btnYes.events.onInputUp.add(this.sayYes, this);
        this.btnNo.events.onInputUp.add(this.sayNo,this);
        this.buttonGroup.add(this.btnYes);
        this.buttonGroup.add(this.btnNo);
        this.buttonGroup.y=this.card.y+this.card.height/2;
        this.resizeObj(this.buttonGroup,.6);
        this.buttonGroup.x=game.world.centerX-this.buttonGroup.width/2;
        this.resizeObj(this.card,.5);
        this.buttonGroup.visible=true;
        this.pickRandCard();
        this.delaySlideOut();
        this.rightCard=this.currentCard;

               game.time.events.loop(Phaser.Timer.SECOND,this.tick, this);


   },
   tick:function(){
       this.secs--;
       this.timeText.text="Time-Left:"+this.secs+"s";
       if (this.secs==0) {
           game.state.start("StartOver");
       }
   },
   resizeObj:function(obj,per){
       while(obj.width>game.width*per){
           obj.scale.x-=.01;
       }
       obj.scale.y=obj.scale.x;
   },
   delaySlideOut:function(){
       game.time.events.add(Phaser.Timer.SECOND*3,this.slideCardOut, this);
   },
   slideCardIn:function(){
       var tween=game.add.tween(this.card).to( { x: game.world.centerX }, 3000, Phaser.Easing.Linear.None, true);
       tween.onComplete.add(this.slideDone, this);
   },
   slideCardOut:function(){
       var tween=game.add.tween(this.card).to( { x: -this.card.width }, 3000, Phaser.Easing.Linear.None, true);
   },
   slideDone:function(){
       this.pickRandCard();
       this.buttonGroup.visible=false;
 
   },
    pickRandCard:function(){ //randomly select frame
        var per=game.rnd.integerInRange(0,100);
        if (per < 30) {
            this.currentCard=this.rightCard; 
        }
        else{
            this.currentCard=game.rnd.integerInRange(0,23);
        }
        this.card.frame=this.currentCard;
        this.card.x=game.width+this.card.width;
        this.slideCardIn();
    },
    update: function () {
    },
    upScore:function(){
        score++;
        this.scoreText.text=score;
        this.rightCard=this.currentCard;
        //this.pickRandCard();
        this.slideCardOut();
    },
    sayYes: function () {
        //play sound by passing it to game media
        //gameMedia.playSound(this.elephant);
        //console.log("Say yes");
        if (this.currentCard == this.rightCard) {
        }
        else{
            game.state.start("StateOver");
        }
    },
    sayNo: function () {
         //console.log("Say no");
        //this.backgroundMusic.stop();
        // game.state.start("StateOver");
        if (this.currentCard != this.rightCard) {
            this.upScore();
        }
        else{
            game.state.start("StateOver");
        }
    }
}