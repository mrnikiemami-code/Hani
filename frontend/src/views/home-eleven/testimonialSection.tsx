"use client";
import Link from "next/link";
import ImageWithBasePath from "../../components/image-with-base-path"


const TestimonialSection = () => {
  return (
    <>
  {/* testimonials */}
  <section className="testimonials-eleven">
    <div className="container">
      <div className="section-header-eleven wow fadeInUp">
        <span className="section-title">
          <ImageWithBasePath
            src="./assets/img/icons/compass.svg"
            alt="compass"
            className="me-1"
          />
          What Travelers Say
        </span>
        <h2>Real experiences from real adventurers</h2>
      </div>
      <div className="row row-gap-4">
        <div className="col-xl-3 col-md-6 d-flex wow fadeInUp">
          <div className="testimonials-item">
            <div className="testimonials-text">
              <div className="rating d-flex align-items-center mb-4">
                <i className="fa-solid fa-star filled  text-primary me-1 fs-14" />
                <i className="fa-solid fa-star filled  text-primary me-1 fs-14" />
                <i className="fa-solid fa-star filled  text-primary me-1 fs-14" />
                <i className="fa-solid fa-star filled  text-primary me-1 fs-14" />
                <i className="fa-solid fa-star filled  text-primary me-1 fs-14" />
                <span className="ms-1">5.0</span>
              </div>
              <p>
                “The most incredible travel experience of my life. Every detail
                was carefully planned, and the destinations were breathtaking. I
                highly recommend this adventure to anyone seeking moments.”
              </p>
            </div>
            <div className="d-flex align-items-center testimonials-text-bottom">
              <Link href="#" className="avatar avatar-lg  flex-shrink-0">
                <ImageWithBasePath
                  src="assets/img/users/user-06.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </Link>
              <div className="ms-2">
                <div className="fs-18 fw-semibold text-gray-9 mb-0">
                  <Link href="#">Sarah Johnson</Link>
                </div>
                <p className="fs-14">Mountain Hiking</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6 d-flex wow fadeInUp">
          <div className="testimonials-item">
            <div className="testimonials-text">
              <div className="rating d-flex align-items-center mb-4">
                <i className="fa-solid fa-star filled  text-primary me-1 fs-14" />
                <i className="fa-solid fa-star filled  text-primary me-1 fs-14" />
                <i className="fa-solid fa-star filled  text-primary me-1 fs-14" />
                <i className="fa-solid fa-star filled  text-primary me-1 fs-14" />
                <i className="fa-solid fa-star filled  text-primary me-1 fs-14" />
                <span className="ms-1">5.0</span>
              </div>
              <p>
                “We booked several activities through this platform, and every
                one exceeded expectations. The timing was perfect, transport was
                smooth, and the overall experience felt seamless.”
              </p>
            </div>
            <div className="d-flex align-items-center testimonials-text-bottom">
              <Link href="#" className="avatar avatar-lg  flex-shrink-0">
                <ImageWithBasePath
                  src="assets/img/users/user-27.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </Link>
              <div className="ms-2">
                <div className="fs-18 fw-semibold text-gray-9 mb-0">
                  <Link href="#">David Lee</Link>
                </div>
                <p className="fs-14">Hot Air Ballon Ride</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6 d-flex wow fadeInUp">
          <div className="testimonials-item">
            <div className="testimonials-text">
              <div className="rating d-flex align-items-center mb-4">
                <i className="fa-solid fa-star filled  text-primary me-1 fs-14" />
                <i className="fa-solid fa-star filled  text-primary me-1 fs-14" />
                <i className="fa-solid fa-star filled  text-primary me-1 fs-14" />
                <i className="fa-solid fa-star filled  text-primary me-1 fs-14" />
                <i className="fa-solid fa-star filled  text-primary me-1 fs-14" />
                <span className="ms-1">5.0</span>
              </div>
              <p>
                “The desert safari was the highlight of our Dubai trip. Dune
                bashing and sunset views were unforgettable. Everything was well
                organized, making the entire experience smooth.”
              </p>
            </div>
            <div className="d-flex align-items-center testimonials-text-bottom">
              <Link href="#" className="avatar avatar-lg  flex-shrink-0">
                <ImageWithBasePath
                  src="assets/img/users/user-22.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </Link>
              <div className="ms-2">
                <div className="fs-18 fw-semibold text-gray-9 mb-0">
                  <Link href="#">Mark jane</Link>
                </div>
                <p className="fs-14">Dessert Safari</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6 d-flex wow fadeInUp">
          <div className="testimonials-item">
            <div className="testimonials-text">
              <div className="rating d-flex align-items-center mb-4">
                <i className="fa-solid fa-star filled  text-primary me-1 fs-14" />
                <i className="fa-solid fa-star filled  text-primary me-1 fs-14" />
                <i className="fa-solid fa-star filled  text-primary me-1 fs-14" />
                <i className="fa-solid fa-star filled  text-primary me-1 fs-14" />
                <i className="fa-solid fa-star filled  text-primary me-1 fs-14" />
                <span className="ms-1">5.0</span>
              </div>
              <p>
                “Skydiving over Palm Jumeirah was a dream come true. The team
                made us feel safe and confident throughout. It was thrilling,
                professionally managed, and truly unforgettable moments.”
              </p>
            </div>
            <div className="d-flex align-items-center testimonials-text-bottom">
              <Link href="#" className="avatar avatar-lg  flex-shrink-0">
                <ImageWithBasePath
                  src="assets/img/users/user-38.jpg"
                  className="rounded-circle"
                  alt="img"
                />
              </Link>
              <div className="ms-2">
                <div className="fs-18 fw-semibold text-gray-9 mb-0">
                  <Link href="#">Japper</Link>
                </div>
                <p className="fs-14">Sky Dive</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="testimonials-image">
      <ImageWithBasePath src="./assets/img/bg/testimonials-bg-04.png" alt="img" />
    </div>
  </section>
  {/* testimonials */}
  <>
  {/* experience */}
  <section className="section experience-sec">
    <div className="container">
      <div className="experience-box">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="experience-image wow zoomIn">
              <ImageWithBasePath src="./assets/img/bg/exp-bg.png" alt="img" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="experience-content wow fadeInUp">
              <h2>Ready for Your Next Experience?</h2>
              <p>
                Don't just travel—create unforgettable memories. Book your
                perfect activity today and discover why thousands trust us for
                their adventures.
              </p>
              <Link href="#" className="btn btn-light">
                Contact Us
                <i className="isax isax-arrow-right-3 ms-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* experience */}
</>

</>

  )
}

export default TestimonialSection