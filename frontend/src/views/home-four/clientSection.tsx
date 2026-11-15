"use client";

import ImageWithBasePath from '../../components/image-with-base-path'
import AppSwiper from '../../components/app-swiper'

const ClientSection = () => {


    return (
        <>
            {/* Client Section */}
            <section
                className="section client-section-four aos" 
               data-aos="fade-up"
            >
                <div className="container">
                    <div className="client-sec">
                        <div className="section-header text-center  aos" data-aos="fade-up">
                            <h6 className="text-white">We are working with 50+ Clients</h6>
                        </div>
                        
                            <AppSwiper preset="client-slider">
                                <div className="client-img">
                                    <ImageWithBasePath src="assets/img/clients/client-08.svg" alt="img" />
                                </div>
                                <div className="client-img">
                                    <ImageWithBasePath src="assets/img/clients/client-09.svg" alt="img" />
                                </div>
                                <div className="client-img">
                                    <ImageWithBasePath src="assets/img/clients/client-10.svg" alt="img" />
                                </div>
                                <div className="client-img">
                                    <ImageWithBasePath src="assets/img/clients/client-11.svg" alt="img" />
                                </div>
                                <div className="client-img">
                                    <ImageWithBasePath src="assets/img/clients/client-12.svg" alt="img" />
                                </div>
                                <div className="client-img">
                                    <ImageWithBasePath src="assets/img/clients/client-13.svg" alt="img" />
                                </div>
                                <div className="client-img">
                                    <ImageWithBasePath src="assets/img/clients/client-14.svg" alt="img" />
                                </div>
                                <div className="client-img">
                                    <ImageWithBasePath src="assets/img/clients/client-10.svg" alt="img" />
                                </div>
                            </AppSwiper>
                    </div>
                </div>
            </section>
            {/* /Client Section */}
        </>

    )
}

export default ClientSection
