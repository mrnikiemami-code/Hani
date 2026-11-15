"use client";

import Link from "next/link";
import  { useState, useEffect } from "react";

const BackToTop = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Add event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling animation
    });
  };
  return (
    <div className="back-to-top">
      <Link
        className={`back-to-top-icon align-items-center justify-content-center d-flex ${
          scrolled ? "show" : ""
        }`}
        href="#"
        onClick={scrollToTop}
      >
        <i className="fa-solid fa-arrow-up" />
      </Link>
    </div>
  );
};

export default BackToTop;
