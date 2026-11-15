import type { SwiperOptions } from "swiper/types";

/**
 * Slider presets transcribed 1:1 from `html/assets/js/carousels.js`
 * (owl-style presets use `responsive`, slick-style ones use `max-width` breakpoints).
 */
export interface NavIcons {
  prev: string;
  next: string;
}

export interface SliderPreset {
  /** Root classes used by the HTML template for this slider */
  rootClass: string;
  loop?: boolean;
  spaceBetween: number;
  speed: number;
  /** Swiper root `slidesPerView` (the owl `0` breakpoint) */
  slidesPerView: number;
  /** Swiper `min-width` breakpoints */
  breakpoints?: SwiperOptions["breakpoints"];
  slidesPerGroup?: number;
  autoplay?: boolean;
  direction?: "vertical" | "horizontal";
  effect?: "fade";
  /** Render the in-root `.swiper-button-prev/next` buttons with these icon classes */
  nav?: NavIcons;
  /** Selectors of external prev/next buttons (slick-derived sliders) */
  externalNav?: { prev: string; next: string };
  dots?: boolean;
  watchSlidesProgress?: boolean;
}

const FA_CHEVRON: NavIcons = { prev: "fa-solid fa-chevron-left", next: "fa-solid fa-chevron-right" };
const ISAX_ARROW: NavIcons = { prev: "isax isax-arrow-left-2", next: "isax isax-arrow-right-3" };
const AUTOPLAY_DELAY = 3000;

/** owlCarousel `responsive` map -> Swiper base + breakpoints */
const owl = (
  items: Record<number, number>,
  base: Omit<SliderPreset, "rootClass" | "slidesPerView" | "breakpoints" | "speed"> & { speed?: number },
): SliderPreset => {
  const points = Object.keys(items).map(Number).sort((a, b) => a - b);
  const breakpoints: NonNullable<SwiperOptions["breakpoints"]> = {};
  let slidesPerView = 1;
  points.forEach((bp) => {
    if (bp === 0) slidesPerView = items[bp];
    else breakpoints[bp] = { slidesPerView: items[bp], spaceBetween: base.spaceBetween };
  });
  return { rootClass: "", speed: 2000, ...base, slidesPerView, breakpoints };
};

/** slick `responsive` (max-width) array -> Swiper min-width breakpoints, as `slickResponsiveToBreakpoints` */
const slick = (
  slidesToShow: number,
  responsive: Array<[number, number]>,
  base: Omit<SliderPreset, "rootClass" | "slidesPerView" | "breakpoints" | "speed" | "spaceBetween" | "loop">,
): SliderPreset => {
  const breakpoints: NonNullable<SwiperOptions["breakpoints"]> = {};
  responsive
    .slice()
    .sort((a, b) => a[0] - b[0])
    .forEach(([bp, show]) => {
      if (bp === 0) return;
      breakpoints[bp] = { slidesPerView: show, slidesPerGroup: 1, spaceBetween: 24 };
    });
  return { rootClass: "", loop: true, speed: 2000, spaceBetween: 24, slidesPerView: slidesToShow, slidesPerGroup: 1, breakpoints, ...base };
};

const ROOT_CLASSES: Record<string, string> = {"banner-slider": "banner-slider banner-sec owl-carousel", "destination-slider": "owl-carousel destination-slider nav-center", "cruise-slider": "owl-carousel cruise-slider nav-center", "experts-slider": "owl-carousel experts-slider nav-center", "client-slider": "owl-carousel client-slider", "testimonial-slider": "owl-carousel testimonial-slider", "tour-gallery-slider": "tour-gallery-slider owl-carousel", "tours-slider": "owl-carousel tours-slider", "cars-slider": "owl-carousel cars-slider owl-dot-bottom", "activity-slider": "activity-slider owl-carousel", "place-slider": "owl-carousel place-slider nav-center", "img-slider": "img-slider image-slide owl-carousel nav-center", "blog-slider": "blog-slider owl-carousel nav-center", "travelers-slider": "travelers-slider owl-carousel", "client-slider-two": "owl-carousel client-slider-two", "offer-slider": "offer-slider owl-carousel", "location-slider": "owl-carousel location-slider owl-dot-bottom", "testimonial-slider-three": "owl-carousel testimonial-slider-three owl-dot-bottom", "popular-hotel-slider": "popular-hotel-slider owl-carousel", "room-slider": "owl-carousel room-slider nav-center mb-4", "categories-slider-six": "categories-slider-six owl-carousel", "providers-slider": "providers-slider owl-carousel owl-dot-bottom", "partners-slider": "partners-slider", "blog-ten-slider": "blog-ten-slider", "activities-slider-twelve": "activities-slider-twelve", "trending-list-slider": "trending-list-slider", "explore-slider": "explore-slider", "destinations-slider": "destinations-slider", "testimonial-slider-nine": "testimonial-slider-nine", "blog-nine-slider": "blog-nine-slider", "clients-slider": "clients-slider", "service-carousel": "owl-carousel service-carousel nav-center mb-4", "slider-nav-thumbnails": "owl-carousel slider-nav-thumbnails nav-center", "vertical-for": "slider-for nav-center", "vertical-nav": "slider-nav nav-center", "home-vertical-nav": "slider-nav nav-center"};

const definePresets = <T extends Record<string, SliderPreset>>(presets: T): { [K in keyof T]: SliderPreset } =>
  Object.fromEntries(
    Object.entries(presets).map(([name, preset]) => [name, { ...preset, rootClass: ROOT_CLASSES[name] ?? name }]),
  ) as { [K in keyof T]: SliderPreset };

export const SLIDER_PRESETS = definePresets({
  "banner-slider": owl({ 0: 1, 550: 1, 1200: 1 }, { loop: true, spaceBetween: 0, dots: true, direction: "vertical" }),
  "destination-slider": owl({ 0: 1, 576: 2, 992: 3, 1200: 4 }, { loop: true, spaceBetween: 24, nav: FA_CHEVRON }),
  "cruise-slider": owl({ 0: 2, 576: 3, 992: 3, 1200: 6 }, { loop: true, spaceBetween: 24, nav: FA_CHEVRON }),
  "experts-slider": owl({ 0: 1, 576: 2, 992: 3, 1200: 4 }, { loop: true, spaceBetween: 24, nav: FA_CHEVRON }),
  "client-slider": owl({ 0: 2, 576: 3, 992: 4, 1200: 5, 1400: 7 }, { loop: true, spaceBetween: 24, autoplay: true }),
  "testimonial-slider": owl({ 0: 1, 768: 2, 1200: 3 }, { loop: true, spaceBetween: 24, nav: ISAX_ARROW }),
  "tour-gallery-slider": owl({ 0: 2, 550: 4, 992: 4, 1200: 5, 1400: 6 }, { loop: false, spaceBetween: 8, speed: 300 }),
  "tours-slider": owl({ 0: 1, 576: 3, 992: 4, 1200: 5 }, { loop: true, spaceBetween: 24, nav: FA_CHEVRON }),
  "cars-slider": owl({ 0: 1, 550: 1, 769: 2, 993: 3, 1200: 3, 1400: 4 }, { loop: false, spaceBetween: 24, dots: true }),
  "activity-slider": owl({ 0: 1.5, 550: 1.5, 769: 2.5, 993: 4.5, 1200: 4.5, 1400: 5.5 }, { loop: false, spaceBetween: 12 }),
  "place-slider": owl({ 0: 1, 550: 1, 768: 2, 992: 3, 1200: 3, 1400: 4 }, { loop: false, spaceBetween: 24, nav: ISAX_ARROW }),
  "img-slider": owl({ 0: 1, 550: 1, 768: 1, 1000: 1 }, { loop: true, spaceBetween: 20, nav: FA_CHEVRON, dots: true }),
  "blog-slider": owl({ 0: 1, 576: 2, 992: 3, 1200: 3 }, { loop: true, spaceBetween: 24, nav: FA_CHEVRON }),
  "travelers-slider": owl({ 0: 1, 576: 2, 992: 3, 1300: 4, 1400: 5 }, { loop: true, spaceBetween: 24, nav: FA_CHEVRON }),
  "client-slider-two": owl({ 0: 2, 576: 3, 992: 4, 1200: 5, 1400: 6 }, { loop: true, spaceBetween: 24, autoplay: true }),
  "offer-slider": owl({ 0: 1, 576: 1, 1400: 1 }, { loop: true, spaceBetween: 24, nav: FA_CHEVRON }),
  "location-slider": owl({ 0: 1, 576: 2, 992: 3, 1200: 5 }, { loop: true, spaceBetween: 24, dots: true }),
  "testimonial-slider-three": owl({ 0: 1, 768: 2, 1200: 3.5 }, { loop: true, spaceBetween: 24, dots: true }),
  "popular-hotel-slider": owl({ 0: 1, 576: 1, 991: 3, 1300: 3, 1400: 4 }, { loop: true, spaceBetween: 24 }),
  "room-slider": owl({ 0: 1 }, { loop: true, spaceBetween: 0, nav: FA_CHEVRON }),
  "categories-slider-six": owl({ 0: 1, 768: 2, 1300: 4, 1400: 5 }, { loop: true, spaceBetween: 24, dots: true }),
  "providers-slider": owl({ 0: 1, 768: 2, 1300: 3, 1400: 4 }, { loop: true, spaceBetween: 24, dots: true }),

  "partners-slider": slick(5, [[1400, 5], [1200, 4], [992, 3], [768, 3], [576, 2]], { autoplay: true }),
  "blog-ten-slider": slick(3, [[1400, 3], [1200, 3], [992, 2], [768, 1], [576, 1]], {
    externalNav: { prev: ".blog-ten-prev", next: ".blog-ten-next" },
  }),
  "activities-slider-twelve": slick(1, [[1400, 3], [1200, 3], [992, 2], [768, 1], [576, 1]], {
    externalNav: { prev: ".activities-twelve-prev", next: ".activities-twelve-next" },
  }),
  "trending-list-slider": slick(4, [[1400, 3], [1200, 2], [768, 1]], {
    externalNav: { prev: ".restaurant-prev", next: ".restaurant-next" },
  }),
  "explore-slider": slick(4, [[1200, 4], [992, 2], [576, 1]], {
    externalNav: { prev: ".restaurant-prev", next: ".restaurant-next" },
  }),
  "destinations-slider": slick(4, [[1200, 4], [992, 3], [700, 2], [400, 1]], {
    externalNav: {
      prev: ".destinations-sec-nine .restaurant-prev",
      next: ".destinations-sec-nine .restaurant-next",
    },
  }),
  "testimonial-slider-nine": slick(2, [[992, 2]], {
    externalNav: {
      prev: ".testimonials-nine .restaurant-prev",
      next: ".testimonials-nine .restaurant-next",
    },
  }),
  "blog-nine-slider": slick(2, [[992, 2]], {}),
  "clients-slider": slick(6, [[1400, 5], [1200, 4], [991, 3], [768, 2]], {}),

  /** `.service-carousel` main gallery synced with `.slider-nav-thumbnails` */
  "service-carousel": { rootClass: "", loop: true, speed: 2000, spaceBetween: 0, slidesPerView: 1, nav: FA_CHEVRON },
  "slider-nav-thumbnails": {
    rootClass: "",
    speed: 2000,
    spaceBetween: 10,
    slidesPerView: 5,
    watchSlidesProgress: true,
    nav: FA_CHEVRON,
  },
  /** `.vertical-slider` / `.home-vertical-slider`: fade "for" slide + vertical thumbs rail */
  "vertical-for": { rootClass: "", effect: "fade", speed: 300, spaceBetween: 0, slidesPerView: 1 },
  "vertical-nav": verticalNav(4, { prev: "fa-solid fa-chevron-up", next: "fa-solid fa-chevron-down" }),
  "home-vertical-nav": verticalNav(3),
});

function verticalNav(maxThumbs: number, nav?: NavIcons): SliderPreset {
  return {
    rootClass: "",
    speed: 300,
    spaceBetween: 0,
    slidesPerView: maxThumbs,
    watchSlidesProgress: true,
    direction: "vertical",
    nav,
    breakpoints: {
      0: { direction: "horizontal", slidesPerView: 1 },
      580: { direction: "vertical", slidesPerView: Math.min(2, maxThumbs) },
      768: { direction: "vertical", slidesPerView: Math.min(3, maxThumbs) },
      992: { direction: "vertical", slidesPerView: maxThumbs },
    },
  };
}

export type SliderPresetName = keyof typeof SLIDER_PRESETS;
export { AUTOPLAY_DELAY };
