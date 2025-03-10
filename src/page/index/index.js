import "./index.css";

const LOADING_DELAY_TIME = 500;
const LOADING_FADE_OUT_TIME = LOADING_DELAY_TIME - 200;

// 页面加载完成后处理
$(window).on('load', function() {
  // 更新版权年份
  $("#current-year").text(new Date().getFullYear());
  
  // 添加一个小延迟，确保加载动画有足够的时间显示
  setTimeout(function() {
    // 隐藏加载动画，显示主内容
    $(".loading").fadeOut(LOADING_FADE_OUT_TIME, function() {
      $(this).css("display", "none");
      $("#home-wrapper").css("display", "flex").addClass("home-wrapper");
      
      // 初始化头像动画
      initAvatarAnimation();
    });
  }, LOADING_DELAY_TIME);
});

// 初始化头像动画
function initAvatarAnimation() {
  const avatar = $(".img-wrapper")[0];
  const photoHead = $(".photo-head")[0];
  const net = $(".net")[0];
  
  // 创建主时间线
  const mainTimeline = gsap.timeline({ 
    repeat: -1,
    repeatDelay: 1
  });
  
  // 篮网动画
  function animateNet() {
    gsap.to(net, {
      duration: 0.4,
      keyframes: [
        { transform: "rotateX(10deg) scaleY(1)", ease: "power1.in" },
        { transform: "rotateX(20deg) scaleY(1.2)", ease: "power1.out" },
        { transform: "rotateX(15deg) scaleY(1.1)", ease: "elastic.out(1, 0.3)" },
        { transform: "rotateX(10deg) scaleY(1)", ease: "elastic.out(1, 0.2)" }
      ],
      stagger: 0.1
    });
  }
  
  // 点击时添加额外的篮球旋转效果和主题切换
  $(avatar).click(function() {
    if (!gsap.isTweening(this)) {
      // 暂停CSS动画
      photoHead.style.animationPlayState = 'paused';
      
      // 切换主题
      const $mainPage = $(".page-wrapper");
      const $banner = $("#banner");
      
      if ($mainPage.hasClass("gold-theme")) {
        $banner.addClass("hidden");
        $mainPage.removeClass("gold-theme");
      } else {
        $banner.removeClass("hidden");
        $mainPage.addClass("gold-theme");
      }
      
      // 使用GSAP创建更动态的旋转
      gsap.to(photoHead, {
        duration: 0.8,
        rotation: "+=360",
        scale: 1.2,
        ease: "power1.out",
        onComplete: () => {
          gsap.to(photoHead, {
            duration: 0.4,
            scale: 1,
            ease: "bounce.out",
            onComplete: () => {
              // 恢复CSS动画
              photoHead.style.animationPlayState = 'running';
              
              // 触发篮网动画
              animateNet();
            }
          });
        }
      });
    }
  });
  
  // 鼠标悬停时暂停/恢复动画
  $(photoHead).hover(
    function() {
      this.style.animationPlayState = 'paused';
    },
    function() {
      this.style.animationPlayState = 'running';
    }
  );
}

// 自动打字
$(function () {
  const inputStr =
    "<p>Dear Basketball,</p>" +
    "<br>" +
    "<p class='indent'>From the moment I started rolling my dad's tube socks And shooting imaginary Game-winning shots In the Great Western Forum I knew one thing was real:</p>" +
    "<br>" +
    "<p class='indent'>I fell in love with you. A love so deep I gave you my all - From my mind & body To my spirit & soul. As a six-year-old boy Deeply in love with you I never saw the end of the tunnel. I only saw myself Running out of one. And so I ran. I ran up and down every court After every loose ball for you. You asked for my hustle I gave you my heart Because it came with so much more. I played through the sweat and hurt Not because challenge called me But because YOU called me. I did everything for YOU Because that's what you do When someone makes you feel as Alive as you've made me feel. You gave a six-year-old boy his Laker dream And I'll always love you for it. But I can't love you obsessively for much longer. This season is all I have left to give. My heart can take the pounding My mind can handle the grind But my body knows it's time to say goodbye. And that's OK. I'm ready to let you go. I want you to know now So we both can savor every moment we have left together. The good and the bad. We have given each other All that we have. And we both know, no matter what I do next I'll always be that kid With the rolled up socks Garbage can in the corner :05 seconds on the clockBall in my hands. 5 … 4 … 3 … 2 … 1</p>" +
    "<br>" +
    "<p class='indent'>Love you always, Kobe</p>";

  const TYPING_SPEED = 50;
  const SCROLL_SPEED = 100;
  let isTyping = true;
  const $content = $("#content");
  
  class TypeWriter {
    constructor(element, text, speed) {
      this.element = element;
      this.text = text;
      this.speed = speed;
      this.cursor = this.createCursor();
      this.currentIndex = 0;
      this.isTyping = true;
    }

    createCursor() {
      return $('<span id="wink">|</span>').css({
        animation: "Twinkle 1s ease-in-out infinite",
        color: "#fff",
        fontWeight: "bold",
        display: "inline",
        position: "relative",
        verticalAlign: "baseline"
      });
    }

    parseHTML(startIndex) {
      if (this.text[startIndex] !== '<') return { tag: null, endIndex: startIndex };
      
      const endIndex = this.text.indexOf('>', startIndex);
      if (endIndex === -1) return { tag: null, endIndex: startIndex };
      
      const tag = this.text.substring(startIndex, endIndex + 1);
      return { tag, endIndex: endIndex + 1 };
    }

    smoothScroll() {
      const scrollHeight = this.element[0].scrollHeight;
      const currentScroll = this.element[0].scrollTop;
      const targetScroll = scrollHeight - this.element[0].clientHeight;
      
      if (currentScroll < targetScroll) {
        this.element[0].scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
      }
    }

    type() {
      if (!this.isTyping || this.currentIndex >= this.text.length) {
        if (this.isTyping) {
          // 打字结束，显示完整文本，不添加光标
          this.element.html(this.text);
          this.isTyping = false;
          // 打字完成后滚动到底部
          setTimeout(() => {
            this.element[0].scrollTop = this.element[0].scrollHeight;
          }, 0);
        }
        return;
      }

      const { tag, endIndex } = this.parseHTML(this.currentIndex);
      let currentText = this.text.slice(0, tag ? endIndex : this.currentIndex + 1);
      
      // 处理换行情况
      currentText = currentText.replace(/<br>/g, '<br><span class="cursor-wrapper">');
      
      if (tag) {
        this.element.html(currentText + this.cursor.prop('outerHTML') + '</span>');
        setTimeout(() => {
          this.currentIndex = endIndex;
          this.type();
        }, this.speed / 2);
      } else {
        this.element.html(currentText + this.cursor.prop('outerHTML') + '</span>');
        setTimeout(() => {
          this.currentIndex++;
          this.type();
        }, this.speed);
      }

      this.smoothScroll();
    }

    stop() {
      this.isTyping = false;
      // 立即显示所有文本，不添加光标
      this.element.html(this.text);
      // 立即滚动到底部
      setTimeout(() => {
        this.element[0].scrollTop = this.element[0].scrollHeight;
      }, 0);
    }
  }

  // 初始化打字效果
  const typeWriter = new TypeWriter($content, inputStr, TYPING_SPEED);
  typeWriter.type();

  // 点击事件处理
  $content.on("click", () => typeWriter.stop());
});

// 设备检测
const os = (() => {
  const ua = navigator.userAgent;
  return {
    isTablet: /(?:iPad|PlayBook)/.test(ua) || (/(?:Android)/.test(ua) && !/(?:Mobile)/.test(ua)) || (/(?:Firefox)/.test(ua) && /(?:Tablet)/.test(ua)),
    isPhone: /(?:iPhone)/.test(ua) && !/(?:iPad|PlayBook)/.test(ua),
    isAndroid: /(?:Android)/.test(ua),
    isPc: !(/(?:iPhone|Android|Windows Phone|SymbianOS)/.test(ua))
  };
})();

// 移动设备隐藏幸运抽奖
if (os.isAndroid || os.isPhone) {
  $(".social-share-element.social-luck").css("display", "none");
}
