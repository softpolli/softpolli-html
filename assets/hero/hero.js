const softpolliSwiper = new Swiper(".softpolliSwiper", {
  direction: window.matchMedia("(max-width: 768px)").matches ? "horizontal" : "vertical",
  loop: false,              // <-- loop off
  speed: 1200,
  effect: "fade",
  fadeEffect: { crossFade: true },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: false,
  },
  pagination: {
    el: ".softpolliSwiper .swiper-pagination",
    clickable: true,
  },
  navigation: { nextEl: ".soft-next", prevEl: ".soft-prev" },
});

const mobileHeroQuery = window.matchMedia("(max-width: 768px)");
mobileHeroQuery.addEventListener("change", (event) => {
  softpolliSwiper.changeDirection(event.matches ? "horizontal" : "vertical");
});
