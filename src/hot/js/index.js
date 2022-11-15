import "../css/pc.scss";
import "../css/mb.scss";

const controller = new ScrollMagic.Controller({
  globalSceneOptions: {
    reverse: true,
  },
});

const utls = {
  isPc: $(window).width() > 768,

  computeOffset(num) {
    return utls.isPc ? (num / 1920) * window.innerWidth : (num / 720) * window.innerWidth;
  },

  computeTrans(num) {
    return utls.isPc ? (num / 1920) * window.innerWidth : (num / 720) * window.innerWidth;
  },

  computeDuration(num) {
    return num * window.innerHeight;
  },
};

var overview = {
  sec1: function () {
    var mermaidScroll = new TimelineMax()
      .from(".sec1 .inner", 0.7, { y: 150 }, "a")

      .to(".sec1 .inner", 0.7, { y: 150, opacity: 1 }, "a");

    console.log("aaa");
  },
};

$(function () {
  overview.sec1();
});
