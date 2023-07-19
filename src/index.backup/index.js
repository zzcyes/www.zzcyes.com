import "./index.css";

// 自动打字
$(function () {
  let inputStr =
    "<p>Dear Basketball,</p>" +
    "<br>" +
    "<p class='indent'>From the moment I started rolling my dad's tube socks And shooting imaginary Game-winning shots In the Great Western Forum I knew one thing was real:</p>" +
    "<br>" +
    "<p class='indent'>I fell in love with you. A love so deep I gave you my all - From my mind & body To my spirit & soul. As a six-year-old boy Deeply in love with you I never saw the end of the tunnel. I only saw myself Running out of one. And so I ran. I ran up and down every court After every loose ball for you. You asked for my hustle I gave you my heart Because it came with so much more. I played through the sweat and hurt Not because challenge called me But because YOU called me. I did everything for YOU Because that's what you do When someone makes you feel as Alive as you've made me feel. You gave a six-year-old boy his Laker dream And I'll always love you for it. But I can't love you obsessively for much longer. This season is all I have left to give. My heart can take the pounding My mind can handle the grind But my body knows it's time to say goodbye. And that's OK. I'm ready to let you go. I want you to know now So we both can savor every moment we have left together. The good and the bad. We have given each other All that we have. And we both know, no matter what I do next I'll always be that kid With the rolled up socks Garbage can in the corner :05 seconds on the clockBall in my hands. 5 … 4 … 3 … 2 … 1</p>" +
    "<br>" +
    "<p class='indent'>Love you always, Kobe</p>";

  function insertStr(soure, start, newStr) {
    if (!newStr) {
      return soure;
    }
    return soure.slice(0, start) + newStr + soure.slice(start);
  }

  let count = 0;

  //自动打字
  let timer = setInterval(() => {
    if (count >= inputStr.length) {
      $("#content").html(
        `${insertStr(inputStr, -4, '<span id="wink">|</span>')}`
      );
      $("#wink").css("animation", "Twinkle 0.2s infinite");
      clearInterval(timer);
      timer = null;
      return false;
    }

    if (inputStr[count] === "<") {
      if (inputStr[count + 2] === ">") {
        count = count + 2; // <p>
      } else if (inputStr[count + 3] === ">") {
        count = count + 3; // </p>
      } else if (inputStr[count + 17] === ">") {
        count = count + 17; // <p class='indent'>
      }
      $("#content").html(`${inputStr.slice(0, count)}<span id="wink">|</span>`);
    } else {
      $("#content").html(
        `${inputStr.slice(0, count++)}<span id="wink">|</span>`
      );
    }
    $("#wink").css("animation", "Twinkle 0.2s infinite");

    const nScrollHight = $("#content")[0] && $("#content")[0].scrollHeight;
    const nScrollTop = $("#content")[0] && $("#content")[0].scrollTop;
    if (nScrollTop < nScrollHight) {
      $("#content")[0].scrollTop = nScrollTop + nScrollHight;
    }
  }, 50);

  // 点击清空！！！
  $("#content").click(function () {
    clearInterval(timer);
    timer = null;
    $("#content").html(inputStr);
  });

  $("#content p").click(function () {
    clearInterval(timer);
    timer = null;
    $("#content").html(inputStr);
  });
});

// 切换主题
$(document).ready(function () {
  $("#home-wrapper").css("display", "flex");
  $("#home-wrapper").addClass("home-wrapper");
  $(".loading").css("display", "none");
  $(".photo-head").on("click", function () {
    if (Array.from($("#main-page")[0].classList).includes("gold-theme")) {
      $("#banner")[0].classList.add("hidden");
      $("#main-page")[0].classList.remove("gold-theme");
    } else {
      $("#banner")[0].classList.remove("hidden");
      $("#main-page")[0].classList.add("gold-theme");
    }
  });
});

var os = (function () {
  var ua = navigator.userAgent,
    isWindowsPhone = /(?:Windows Phone)/.test(ua),
    isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
    isAndroid = /(?:Android)/.test(ua),
    isFireFox = /(?:Firefox)/.test(ua),
    isChrome = /(?:Chrome|CriOS)/.test(ua),
    isTablet =
      /(?:iPad|PlayBook)/.test(ua) ||
      (isAndroid && !/(?:Mobile)/.test(ua)) ||
      (isFireFox && /(?:Tablet)/.test(ua)),
    isPhone = /(?:iPhone)/.test(ua) && !isTablet,
    isPc = !isPhone && !isAndroid && !isSymbian;
  return {
    isTablet: isTablet,
    isPhone: isPhone,
    isAndroid: isAndroid,
    isPc: isPc,
  };
})();

if (os.isAndroid || os.isPhone) {
  $(".social-share-element.social-luck").css("display", "none");
}
