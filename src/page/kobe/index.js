
import './index.css'

$(document).ready(function() {
  $('body').css('visibility','visible');

    var music = document.getElementById("music");
    var audio = document.createElement("audio");
    var count = 0;
    var timer;
    audio.setAttribute("controls", "controls");
    audio.setAttribute("loop", "loop");
    audio.src = "assets/resouce/amazing-grace.mp3";
    
    music.classList.add("playing");
    music.onclick = function() {
      if (audio !== null) {
        if (audio.paused) {
          audio.play();
          music.classList.add("playing");
          timer = setInterval(() => {
            count++;
            music.style.transform = "rotatez(" + count + "deg)";
          }, 10);
        } else {
          audio.pause(); // 这个就是暂停
          music.classList.remove("playing");
          clearInterval(timer);
        }
      }
    };
    
    var ball = document.getElementById("ball");
    var plane = document.getElementById("plane");
    var isPlayBall = false;
    ball.onclick = function() {
      if (isPlayBall) {
        return;
      }
      isPlayBall = true;
      const mask = document.getElementsByClassName("index");
      const musicButton = document.getElementById("music-button");
      var w = document.documentElement.offsetWidth || document.body.offsetWidth;
      var h = document.documentElement.offsetHeight || document.body.offsetHeight;
      const ballWrapper = document.getElementById("ball-wrapper");
      const planeWrapper = document.getElementById("plane-wrapper");
      ball.classList.remove("ball-rotate");
      var range = 0,
        xRange = 0,
        yRnage = 0;
      var ballTimer = setInterval(() => {
        xRange += (w - 120) / 40;
        yRnage += (h - 120) / 40;
        planeWrapper.style.left = `${xRange}px`;
        ballWrapper.style.left = `${xRange}px`;
        ballWrapper.style.bottom = `${yRnage}px`;
        ballWrapper.style.transform = "rotatez(" + range + "deg)";
      }, 50);
  
      setTimeout(() => {
        clearInterval(ballTimer);
        const mamba = document.getElementById("mamba");
        mamba.innerText = "Mamba Never Out";
        ballTimer = null;
        ballWrapper.classList.add("hidden");
        planeWrapper.classList.add("hidden");
        mask[0].classList.remove("mask-index");
        musicButton.classList.remove("show");
        audio.play();
        timer = setInterval(() => {
          count++;
          music.style.transform = "rotatez(" + count + "deg)";
        }, 10);
        startText();
      }, 2000);
    };
  
    // 弹幕
    var stage = $("#stage");
  
    function getWidth() {
      var width = $("#stage").width() - 10 + "px";
      return width;
    }
   
    // //随机颜色
    // function getColor() {
    //   var red = parseInt(Math.random() * 255);
    //   var green = parseInt(Math.random() * 255);
    //   var blue = parseInt(Math.random() * 255);
    //   // return "rgb(" + red + "," + green + "," + blue + ")";
    //   return 'white';
    // }
  
    //随机顶部距离
    function getTop() {
      var top = parseInt(Math.random() * (stage.height() - parseInt($("#stage").css("font-size"))));
      return top + "px";
    }
  
    //随机速度动画
    function getAnimate() {
      return 'move' + ' ' + (parseInt(Math.random() * 4 + 6)) + 's' + ' ' + 'infinite' + ' ' + 'linear';
    }
  
    //获取浏览器支持的动画事件名称
    function getAnimationEventNames() {
      var el = document.createElement('tmpEl');
      var animationEventNames = {
        'webkitAnimation': 'webkitAnimationIteration',
        'mozAnimation': 'mozAnimationIteration',
        'MSAnimation': 'MSAnimationIteration',
        'oAnimation': 'oAnimationIteration',
        'animation': 'animationIteration'
      }
  
      for(var x in animationEventNames) {
        if(el.style[x] != undefined) {
          el.remove();
          return animationEventNames[x];
        }
      }
    }
  
      const kobeWords = [
      "What I’m doing right now, I’m chasing perfection.",
      "Love me or hate me, it's one or the other. Always has been.",
      "My biggest enemy is yourself.",
      "I can accept failure, but I can't accept giving up.",
      "Should seize every opportunity to prove to everyone that you, prove that you are able to meet the challenge.",
      "Stick to out of the road to your dreams.",
      "I know that the appearance of Los Angeles at four o 'clock in the morning every day.",
      "I know I played like crap, but you don't know me in order to let oneself have less like shit, how much effort.",
      "If you love a thing you will overcome all difficulties - Kobe for it!",
      "If you want to success, you want to sacrifice a lot of.",
      "Get everything, you have to pay all, conquer all things.",
      "If you fear failure, you will fail.",
      "Friends come and go, but the championship banner has been there, blowing in the wind.",
      "There is always a person want to win, that is why can't I!",
      "When I retire, I want to look back the way I walked past, every day, I have paid my all!",
      "My hearing is getting worse, hear boos in each stadium.",
      "If you fear of failure, that means you have lost.",
      "Everything I do now, is in pursuit of more perfect.",
      "If I feel something is wrong, I will stay in that constantly training, until I do it right.",
      "Bowed their heads and not give up, it is to see his own way; Please not proud, is to see their own sky.",
      "You, you are not my opponent.",
      "Catch prey animals and how to care about tiny worms.",
      "I don't want to do the second Jordan, I only want to make the first kobe Bryant.",
      "Pressure and challenges, all the negative things are to be able to succeed I catalyst.",
      "Hate me, because I desire your great, great, need at all costs.",
      "When you want to give up, think about what makes you insist on here.",
      "Second place means you is the number one loser!",
      "Heroes are temporary, but the legend is forever.",
      "Even Jesus, people often bears a grudge against him, I don't need to explain anything.",
      "If the lakers are now the Titanic, I'll sink together with him.",
      "Sure someone wants to win, is that why can't I?",
      "I'm doing right now, it is in pursuit of a more perfect!",
      "Friends always come and go, but a champion flag will never fall.",
      "Cheetahs hunt when they care about insects?",
      "What I do, just keep repeating.",
      "Seize today, don't believe tomorrow."
    ];
  
    let wordCount = 1;
   
    function startText(){
      kobeWords.forEach((word,index)=>{
      let timerId =   setTimeout(()=>{
          writeText(word);
          clearTimeout(timerId)
          timerId = null;
          if(index === kobeWords.length - 1){
            if(wordCount<50){
                startText();
                wordCount++;
            }
          }
        },index*1000)
      });
    }
  
    function writeText(text){
      var t = document.createElement("p"); //创建p元素
      t.innerText = text; //给p元素赋值
      t.style.color = 'white'; //随机颜色
      t.style.position = 'absolute'; //设置位置为绝对位置
      t.style.top = getTop(); //随机位置
      t.style.left = getWidth(); //从右边开始
      t.style.animation = getAnimate(); //随机动画
      t.style.whiteSpace = 'nowrap'; //不换行
      t.style.fontFamily = 'sans-serif'; //设置字体
      t.style.fontSize = '18px'; //设置字体大小
      stage.append(t); //装载文字
      //绑定动画周期监听
      t.addEventListener(getAnimationEventNames(), function() {
        $(this).remove();
      });
    }
  });