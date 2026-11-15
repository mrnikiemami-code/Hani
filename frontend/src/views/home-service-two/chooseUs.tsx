"use client";
import { useState } from "react";
import ImageWithBasePath from "../../components/image-with-base-path";
import Link from "next/link";
import CircularText from '../../components/circular-text/circularText'
import VideoModal from "../../components/video-modal/videoModal";

const ChooseUs = () => {
  const [showModal, setShowModal] = useState(false);
  const videoUrl = "https://youtu.be/NSAOrGb9orM";
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  return (
    <>
      {/* why choose */}
      <section className="section why-choose-nine">
        <div className="container">
          <div className="section-head-nine text-center wow fadeInUp">
            <h2>
              Why <span>Choose</span> Us
            </h2>
            <span>Everything you need for the perfect journey</span>
          </div>
          <div className="row row-gap-4">
            <div className="col-lg-3 col-md-6 d-flex wow fadeInUp">
              <div className="why-choose-item bg-transparent-primary">
                <div className="why-choose-icon choose-one">
                  <ImageWithBasePath
                    src="./assets/img/icons/why-choose-1.svg"
                    alt="img"
                  />
                </div>
                <div className="home-nine-title mb-2">
                  Global Travel Support
                </div>
                <p>24/7 customer support in multiple languages</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 d-flex wow fadeInUp">
              <div className="why-choose-item bg-purple-transparent">
                <div className="why-choose-icon choose-two">
                  <ImageWithBasePath
                    src="./assets/img/icons/why-choose-4.svg"
                    alt="img"
                  />
                </div>
                <div className="home-nine-title mb-2">Expert Local Guides</div>
                <p>Connect with certified local guides for experiences</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 d-flex wow fadeInUp">
              <div className="why-choose-item bg-transparent-cyan">
                <div className="why-choose-icon choose-three">
                  <ImageWithBasePath
                    src="./assets/img/icons/why-choose-2.svg"
                    alt="img"
                  />
                </div>
                <div className="home-nine-title mb-2">Visa Assistance</div>
                <p>Hassle free visa processing and travel document support</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 d-flex wow fadeInUp">
              <div className="why-choose-item bg-teal-transparent">
                <div className="why-choose-icon choose-four">
                  <ImageWithBasePath
                    src="./assets/img/icons/why-choose-3.svg"
                    alt="img"
                  />
                </div>
                <div className="home-nine-title mb-2">Luxury Cruises</div>
                <p>Sail the seas with cruise packages for every budget</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* why choose */}
      <>
        {/* adventure */}
        <section className="adventure-sec">
          <img
            src="./assets/img/bg/adventure-bg.png"
            alt="img"
            className="adventure-bg wow fadeInUp"
          />
          <div
            className="horizontal-slide d-flex"
            data-direction="right"
            data-speed="slow"
          >
            <div className="slide-list d-flex">
              <div className="adventure-item">
                <h3>Adventures</h3>
              </div>
            </div>
          </div>
          <div
            className="animate-button"
          >
            <CircularText text="Play Video . Play Video ." />
            <Link
              href="#"
              className="button-circle"
              data-fancybox=""
              onClick={handleOpenModal}
            >
              <i className="isax isax-play" />
            </Link>
            <VideoModal
              show={showModal}
              handleClose={handleCloseModal}
              videoUrl={videoUrl}
            />
          </div>
        </section>
        {/* adventure */}
      </>
    </>
  );
};

export default ChooseUs;
