"use client";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";

import { img_path } from "../../../environment";

// Import images
const busThumb1 = `${img_path}assets/img/bus/bus-thumb-01.jpg`;
const busThumb2 = `${img_path}assets/img/bus/bus-thumb-02.jpg`;
const busThumb3 = `${img_path}assets/img/bus/bus-thumb-03.jpg`;
const busThumb4 = `${img_path}assets/img/bus/bus-thumb-04.jpg`;
const busThumb5 = `${img_path}assets/img/bus/bus-thumb-05.jpg`;

const busLarge1 = `${img_path}assets/img/bus/bus-large-01.jpg`;
const busLarge2 = `${img_path}assets/img/bus/bus-large-02.jpg`;
const busLarge3 = `${img_path}assets/img/bus/bus-large-03.jpg`;
const busLarge4 = `${img_path}assets/img/bus/bus-large-04.jpg`;
const busLarge5 = `${img_path}assets/img/bus/bus-large-05.jpg`;

const BusGallery = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const images = [
    { src: busLarge1, title: "Bus 1" },
    { src: busLarge2, title: "Bus 2" },
    { src: busLarge3, title: "Bus 3" },
    { src: busLarge4, title: "Bus 4" },
    { src: busLarge5, title: "Bus 5" },
  ];

  const thumbnails = [busThumb1, busThumb2, busThumb3, busThumb4, busThumb5];

  return (
    <div id="accordion_collapse_four" className="accordion-collapse collapse show">
      <div className="accordion-body pt-0">
        <div className="row row-cols-lg-6 row-cols-sm-4 row-cols-2 g-2">
          {images.map((_img, i) => (
            <div className="col" key={i}>
              <div
                className="galley-wrap"
                onClick={() => {
                  setIndex(i);
                  setOpen(true);
                }}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={thumbnails[i]}
                  alt={`bus-${i + 1}`}
                  className="img-fluid"
                />
              </div>
            </div>
          ))}

          <div className="col">
            <div className="galley-wrap more-gallery d-flex align-items-center justify-content-center">
              <button
                className="btn btn-white btn-xs"
                onClick={() => {
                  setIndex(0);
                  setOpen(true);
                }}
              >
                <i className="isax isax-image5 me-1" />
                See All
              </button>
            </div>
          </div>
        </div>
      </div>

      <Lightbox
        open={open}
        index={index}
        close={() => setOpen(false)}
        slides={images}
        plugins={[Captions]}
        captions={{ showToggle: false }}
      />
    </div>
  );
};

export default BusGallery;
