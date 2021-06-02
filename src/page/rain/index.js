import './index.css'
const makeItRain = function() {
    //clear out everything
    $('.rain').empty();
  
    var increment = 0;
    var drops = "";
    var backDrops = "";
  
    while (increment < 100) {
      //couple random numbers to use for various randomizations
      //random number between 98 and 1
      var randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
      //random number between 5 and 2
      var randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
      //increment
      increment += randoFiver;
      //add in a new raindrop with various randomizations to certain CSS properties
      drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
      backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
    }
  
    $('.rain.front-row').append(drops);
    $('.rain.back-row').append(backDrops);
  }
  

  $('.splat-toggle.toggle').toggleClass('active');
  makeItRain();

  $('.splat-toggle.toggle').on('click', function() {
    $('body').toggleClass('splat-toggle');
    $('.splat-toggle.toggle').toggleClass('active');
    makeItRain();
  });
  
  $('.back-row-toggle.toggle').on('click', function() {
    $('body').toggleClass('back-row-toggle');
    $('.back-row-toggle.toggle').toggleClass('active');
    makeItRain();
  });
  
  $('.single-toggle.toggle').on('click', function() {
    $('body').toggleClass('single-toggle');
    $('.single-toggle.toggle').toggleClass('active');
    makeItRain();
  });
  

  $(document).ready(function() {
    $('body').css('visibility','visible');
 
    const audio = document.createElement("audio");
    audio.setAttribute("controls", "controls");
    audio.setAttribute("loop", "loop");
    audio.src = "assets/resouce/rain.mp3";

    $('#music').on('click', function() {
        makeItRain();
        $('#mask').css('display','none')
        if (audio !== null) {
            if (audio.paused) {
              audio.play();
              music.classList.add("active");
            } else {
              audio.pause(); 
              music.classList.remove("active");
            }
          }
    });

    $('#ct0').on('change',function(){
        const isNight = $(this)[0].checked;
        console.log("$('#ct0')", isNight)
        if(isNight){
            $('#container')[0].classList.add("dark");
            $('#container')[0].classList.remove("bright");
        }else{
            $('#container')[0].classList.add("bright");
            $('#container')[0].classList.remove("dark");
        }
    })
  })
