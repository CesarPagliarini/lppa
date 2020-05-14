(function(){
    'use strict';
    window.addEventListener('load',init,false);
    var canvas=null,ctx=null;
    var mousex=0,mousey=0;
    var lastUpdate=0;
    var pause=true;
    var gameover=true;
    var score=0;
    var eTimer=0;
    var player=new Circle(0,0,5);
    var bombs=[];

    function random(max){
        return ~~(Math.random()*max);
    }

    function init(){
        canvas=document.getElementById('canvas');
        ctx=canvas.getContext('2d');
        canvas.width=300;
        canvas.height=200;
        
        enableInputs();
        run();
    }

    function run(){
        requestAnimationFrame(run);
            
        var now=Date.now();
        var deltaTime=(now-lastUpdate)/1000;
        if(deltaTime>1)deltaTime=0;
        lastUpdate=now;
        
        act(deltaTime);
        paint(ctx);
    }

    function reset(){
        score=0;
        eTimer=0;
        bombs.length=0;
        gameover=false;
    }

    function act(deltaTime){
        if(!pause){
            // GameOver Reset
            if(gameover)
                reset();
            
            // Move player
            player.x=mousex;
            player.y=mousey;
            
            // Keep player in canvas
            if(player.x<0)
                player.x=0;
            if(player.x>canvas.width)
                player.x=canvas.width;
            if(player.y<0)
                player.y=0;
            if(player.y>canvas.height)
                player.y=canvas.height;
            
            // Generate new bomb
            eTimer-=deltaTime;
            if(eTimer<0){
                var bomb=new Circle(random(2)*canvas.width,random(2)*canvas.height,10);
                bomb.timer=1.5+random(2.5);
                bomb.speed=100+(random(score))*10;
                bombs.push(bomb);
                eTimer=0.5+random(2.5);
            }
            
            // Bombs
            for(var i=0,l=bombs.length;i<l;i++){
                if(bombs[i].timer<0){
                    score++;
                    bombs.splice(i--,1);
                    l--;
                    continue;
                }
                
                bombs[i].timer-=deltaTime;
                var angle=bombs[i].getAngle(player);
                bombs[i].move(angle,bombs[i].speed*deltaTime);
                
                if(bombs[i].timer<0){
                    bombs[i].radius*=2;
                    if(bombs[i].distance(player)<0){
                        gameover=true;
                        pause=true;
                    }
                }
            }
        }
    }

    function paint(ctx){
        ctx.fillStyle='#000';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        
        for(var i=0,l=bombs.length;i<l;i++){
            if(bombs[i].timer<0){
                ctx.fillStyle='#fff';
                bombs[i].fill(ctx);
            }
            else{
                if(bombs[i].timer<1&&~~(bombs[i].timer*10)%2==0)
                    ctx.strokeStyle='#fff';
                else
                    ctx.strokeStyle='#f00';
                bombs[i].stroke(ctx);
            }
        }
        ctx.strokeStyle='#0f0';
        player.stroke(ctx);
        
        ctx.fillStyle='#fff';
        //ctx.fillText('Distance: '+player.distance(bombs[0]).toFixed(1),10,10);
        //ctx.fillText('Angle: '+(player.getAngle(bombs[0])*(180/Math.PI)).toFixed(1),10,20);
        ctx.fillText('Score: '+score,10,10);
        if(pause){
            ctx.textAlign='center';
            if(gameover)
                ctx.fillText('GAME OVER',150,100);
            else
                ctx.fillText('PAUSE',150,100);
            ctx.textAlign='left';
        }
    }

    function enableInputs(){
        document.addEventListener('mousemove',function(evt){
            mousex=evt.pageX-canvas.offsetLeft;
            mousey=evt.pageY-canvas.offsetTop;
        },false);
        canvas.addEventListener('mousedown',function(evt){
            pause=!pause;
        },false);
    }

    function Circle(x,y,radius){
        this.x=(x==null)?0:x;
        this.y=(y==null)?0:y;
        this.radius=(radius==null)?0:radius;
        this.timer=0;
        this.speed=0;
    }

    Circle.prototype.distance=function(circle){
        if(circle!=null){
            var dx=this.x-circle.x;
            var dy=this.y-circle.y;
            return (Math.sqrt(dx*dx+dy*dy)-(this.radius+circle.radius));
        }
    }

    Circle.prototype.getAngle=function(circle){
        if(circle!=null)
            return (Math.atan2(circle.y-this.y,circle.x-this.x));
    }

    Circle.prototype.move=function(angle,speed){
        if(speed!=null){
            this.x+=Math.cos(angle)*speed;
            this.y+=Math.sin(angle)*speed;
        }
    }

    Circle.prototype.stroke=function(ctx){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
        ctx.stroke();
    }

    Circle.prototype.fill=function(ctx){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
        ctx.fill();
    }

    window.requestAnimationFrame=(function(){
        return window.requestAnimationFrame || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame || 
            function(callback){window.setTimeout(callback,17);};
    })();
})();
