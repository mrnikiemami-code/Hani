"use client";
import { Children, useEffect, useMemo, useState, type ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import type { SwiperOptions } from "swiper/types";
import { AUTOPLAY_DELAY, SLIDER_PRESETS, type SliderPresetName } from "./presets";

export interface AppSwiperProps {
  /** Named slider configuration, mirrors the HTML template's `carousels.js` */
  preset: SliderPresetName;
  /** Extra root classes added to the preset's own (`rootClass`) */
  className?: string;
  /** Every direct child becomes one `.swiper-slide` */
  children: ReactNode;
  /** Swiper of the synced thumbnail rail (main gallery only) */
  thumbsSwiper?: SwiperClass | null;
  /** Receives the Swiper instance (used to feed `thumbsSwiper` of the main slider) */
  onSwiper?: (swiper: SwiperClass) => void;
  /** Fires with the new instance state whenever the active slide changes */
  onSlideChange?: (swiper: SwiperClass) => void;
  /** Escape hatch for per-instance overrides */
  options?: SwiperOptions;
}

const THUMB_ACTIVE = "swiper-slide-thumb-active";

/**
 * Keeps a main gallery and its thumbnail rail in step, like Swiper's Thumbs module in carousels.js:
 * tapping a thumb shows that image, and sliding the gallery highlights / scrolls to the matching thumb.
 * Done by hand because the Thumbs module cannot re-bind when React re-creates the rail (StrictMode, HMR).
 */
const useThumbSync = (main: SwiperClass | null, thumbs: SwiperClass | null | undefined) => {
  useEffect(() => {
    if (!main || !thumbs || main.destroyed || thumbs.destroyed) return;

    const highlight = () => {
      if (main.destroyed || thumbs.destroyed) return;
      const index = main.realIndex;
      thumbs.slides.forEach((slide, i) => slide.classList.toggle(THUMB_ACTIVE, i === index));
      const visible = thumbs.slidesPerViewDynamic();
      if (index < thumbs.activeIndex || index >= thumbs.activeIndex + visible) thumbs.slideTo(index);
    };
    const onTap = () => {
      const index = thumbs.clickedIndex;
      if (index === undefined || index === null || main.destroyed) return;
      if (main.params.loop) main.slideToLoop(index);
      else main.slideTo(index);
    };

    thumbs.on("tap", onTap);
    main.on("slideChange", highlight);
    highlight();
    return () => {
      thumbs.off("tap", onTap);
      main.off("slideChange", highlight);
    };
  }, [main, thumbs]);
};

const AppSwiper = ({ preset, className, children, thumbsSwiper, onSwiper, onSlideChange, options }: AppSwiperProps) => {
  const config = SLIDER_PRESETS[preset];
  const [prevEl, setPrevEl] = useState<HTMLDivElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLDivElement | null>(null);
  const [instance, setInstance] = useState<SwiperClass | null>(null);
  useThumbSync(instance, thumbsSwiper);

  const slides = Children.toArray(children);
  // Same loop setting as carousels.js; only skipped when there are not even enough slides for the base view
  const loop = (config.loop ?? false) && slides.length > Math.ceil(config.slidesPerView);

  const navigation = useMemo(() => {
    if (config.externalNav) return { prevEl: config.externalNav.prev, nextEl: config.externalNav.next };
    if (config.nav) return { prevEl, nextEl };
    return false;
  }, [config, prevEl, nextEl]);

  return (
    <Swiper
      className={`${config.rootClass} ${className ?? ""}`.trim()}
      modules={[Autoplay, EffectFade, Navigation, Pagination]}
      loop={loop}
      speed={config.speed}
      slidesPerView={config.slidesPerView}
      slidesPerGroup={config.slidesPerGroup}
      spaceBetween={config.spaceBetween}
      breakpoints={config.breakpoints}
      direction={config.direction}
      effect={config.effect}
      watchSlidesProgress={config.watchSlidesProgress}
      autoplay={config.autoplay ? { delay: AUTOPLAY_DELAY, disableOnInteraction: false } : false}
      navigation={navigation}
      pagination={config.dots ? { clickable: true } : false}
      onSwiper={(swiper) => {
        setInstance(swiper);
        onSwiper?.(swiper);
      }}
      onSlideChange={onSlideChange}
      {...options}
    >
      {slides.map((child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
      {config.nav && (
        <div className="swiper-button-prev" ref={setPrevEl}>
          <i className={config.nav.prev} />
        </div>
      )}
      {config.nav && (
        <div className="swiper-button-next" ref={setNextEl}>
          <i className={config.nav.next} />
        </div>
      )}
    </Swiper>
  );
};

export default AppSwiper;
