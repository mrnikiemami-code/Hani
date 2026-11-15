"use client";
import { img_path } from "../../../environment";
import React, { useState } from "react";
import type { Swiper as SwiperClass } from "swiper";
import AppSwiper from "../../../components/app-swiper";
import Lightbox from "yet-another-react-lightbox";
import ImageWithBasePath from "../../../components/image-with-base-path";

const BusSlider: React.FC = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const largeImages = [
    "assets/img/bus/bus-large-01.jpg",
    "assets/img/bus/bus-large-02.jpg",
    "assets/img/bus/bus-large-03.jpg",
    "assets/img/bus/bus-large-04.jpg",
    "assets/img/bus/bus-large-05.jpg",
    "assets/img/bus/bus-large-02.jpg",
  ];

  return (
    <div className="service-wrap mb-4">
      <div className="slider-wrap position-relative">
        {/* Main Slider */}
        <AppSwiper preset="service-carousel" className="mb-4" thumbsSwiper={thumbsSwiper} onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}>
          {largeImages.map((img, idx) => (
            <div className="service-img" key={idx}>
              <ImageWithBasePath src={img} className="img-fluid" alt={`Slider Img ${idx}`} />
            </div>
          ))}
        </AppSwiper>

        {/* See All Button */}
        <button
          className="btn btn-white btn-xs view-btn position-absolute"
          onClick={() => setLightboxOpen(true)}
        >
          <i className="isax isax-image me-1"></i>See All
        </button>

        {/* Lightbox */}
        <Lightbox
          open={lightboxOpen}
          index={currentSlide}
          close={() => setLightboxOpen(false)}
          slides={largeImages.map((src) => ({ src: `${img_path}${src}` }))}
        // plugins={[Thumbnails]}
        // thumbnails={{ width: 100, position: "bottom" }}
        />
      </div>


      {/* Thumbnail Slider */}
      <AppSwiper preset="slider-nav-thumbnails" className="mt-3" onSwiper={setThumbsSwiper}>
        {largeImages.map((img, idx) => (
          <div key={idx}>
            <ImageWithBasePath src={img.replace("large", "thumb")} className="img-fluid" alt={`Thumb ${idx}`} />
          </div>
        ))}
      </AppSwiper>
    </div>
  );
};

export default BusSlider;
