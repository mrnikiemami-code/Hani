"use client";
import  { useEffect, useState } from 'react'
import Link from "next/link";
import { useBodyClass } from '../../../hooks/useBodyClass'
import ImageWithBasePath from '../../../components/image-with-base-path'

const ComingSoon = () => {

    const [seconds, setSeconds] = useState(60);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (seconds > 0) {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }
        }, 1000);
        return () => clearInterval(intervalId);
    }, [seconds]);

    const formatTime = (time: number) => {
        // Add leading zero for single-digit numbers
        return time < 10 ? `0${time}` : time;
    };
    useBodyClass("coming-soon-bg");

    return (
        <div>
            <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
                <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap ">
                    <div className="col-md-5 mx-auto">
                        <div className="comming-soon-pg">
                            <div className="p-4 text-center">
                                <ImageWithBasePath
                                    src="assets/img/logo-dark.svg"
                                    alt="logo"
                                    className="img-fluid"
                                />
                            </div>
                            <div className="text-center">
                                <h1>Coming Soon</h1>
                                <ul className="d-inline-flex align-items-center justify-content-center counting-box">
                                    <li>
                                        <div className="counts-card">
                                            <h3 className="days">48</h3>
                                            <p>Days</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="counts-card">
                                            <h3 className="hours">5</h3>
                                            <p>Hours</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="counts-card">
                                            <h3 className="minutes">48</h3>
                                            <p>Minutes</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="counts-card">
                                            <h3 className="seconds">{formatTime(seconds)}</h3>
                                            <p>Seconds</p>
                                        </div>
                                    </li>
                                </ul>
                                <p className="text-white">
                                    We’re working on something exciting to elevate your experience. Stay
                                    tuned for our upcoming launch!
                                </p>
                                <div>
                                    <div className="subscribe-form">
                                        <div className="mb-3 position-relative">
                                            <h6 className="text-center text-white mb-3">
                                                Subscribe to get notified
                                            </h6>
                                            <div className="bg-transparent border  p-2 d-flex align-items-center rounded-pill ps-0">
                                                <input
                                                    type="email"
                                                    className="form-control bg-transparent border-0"
                                                    placeholder="Enter Your Email"
                                                />
                                                <Link href="#" className="btn btn-primary">
                                                    Subscribe
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-wrap justify-content-center align-items-center pb-4">
                                        <Link
                                            href="#"
                                            className="btn btn-primary rounded-circle btn-icon btn-sm me-2 d-flex align-items-center justify-content-center"
                                        >
                                            <i className="fa-brands fa-facebook" />
                                        </Link>
                                        <Link
                                            href="#"
                                            className="btn btn-primary rounded-circle btn-icon btn-sm me-2 d-flex align-items-center justify-content-center"
                                        >
                                            <i className="fa-brands fa-x-twitter" />
                                        </Link>
                                        <Link
                                            href="#"
                                            className="btn btn-primary rounded-circle btn-icon btn-sm me-2 d-flex align-items-center justify-content-center"
                                        >
                                            <i className="fa-brands fa-instagram" />
                                        </Link>
                                        <Link
                                            href="#"
                                            className="btn btn-primary rounded-circle btn-icon btn-sm d-flex align-items-center justify-content-center"
                                        >
                                            <i className="fa-brands fa-linkedin" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ComingSoon
