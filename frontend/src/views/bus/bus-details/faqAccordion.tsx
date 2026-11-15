"use client";
import { useState } from "react";

const FaqAccordion = () => {
  const [openFaq, setOpenFaq] = useState("faq1"); // Only faq1 open by default

  const toggleFaq = (key:any) => {
    setOpenFaq((prev) => (prev === key ? "" : key)); // Close if same, open if different
  };

  return (
    <div className="accordion faq-accordion" id="accordionFaq">
      {/* FAQ 1 */}
      <div className="accordion-item mb-2">
        <div className="accordion-header">
          <button
            className={`accordion-button fw-medium ${openFaq === "faq1" ? "" : "collapsed"}`}
            type="button"
            onClick={() => toggleFaq("faq1")}
          >
            How early should I arrive before departure?
          </button>
        </div>
        <div className={`accordion-collapse collapse ${openFaq === "faq1" ? "show" : ""}`}>
          <div className="accordion-body">
            <p className="mb-0">
            We recommend arriving at least 30 minutes before the scheduled departure time to ensure a smooth and stress-free boarding experience. Arriving early allows you to check in your luggage, confirm your seat, and settle in comfortably before departure.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ 2 */}
      <div className="accordion-item mb-2">
        <div className="accordion-header">
          <button
            className={`accordion-button fw-medium ${openFaq === "faq2" ? "" : "collapsed"}`}
            type="button"
            onClick={() => toggleFaq("faq2")}
          >
            Can I choose my seat while booking?
          </button>
        </div>
        <div className={`accordion-collapse collapse ${openFaq === "faq2" ? "show" : ""}`}>
          <div className="accordion-body">
            <p className="mb-0">Some rides may assign seats automatically if you don’t explicitly pick one. As one site says: “If you have not reserved a seat, but have been assigned a seat on your ticket, please sit in the indicated seat.”</p>
          </div>
        </div>
      </div>

      {/* FAQ 3 */}
      <div className="accordion-item mb-2">
        <div className="accordion-header">
          <button
            className={`accordion-button fw-medium ${openFaq === "faq3" ? "" : "collapsed"}`}
            type="button"
            onClick={() => toggleFaq("faq3")}
          >
            Is Wi-Fi available on the bus?
          </button>
        </div>
        <div className={`accordion-collapse collapse ${openFaq === "faq3" ? "show" : ""}`}>
          <div className="accordion-body">
            <p className="mb-0">It depends on the bus service you’re referring to — some long-distance, tourist, or premium intercity buses do offer free Wi-Fi, while many city or local buses usually don’t.</p>
          </div>
        </div>
      </div>

      {/* FAQ 4 */}
      <div className="accordion-item mb-2">
        <div className="accordion-header">
          <button
            className={`accordion-button fw-medium ${openFaq === "faq4" ? "" : "collapsed"}`}
            type="button"
            onClick={() => toggleFaq("faq4")}
          >
            Are food or drinks provided during the trip?
          </button>
        </div>
        <div className={`accordion-collapse collapse ${openFaq === "faq4" ? "show" : ""}`}>
          <div className="accordion-body">
            <p className="mb-0">On many regular bus services, food or drinks are not provided as part of the fare. For example, for IntrCity SmartBus services it states: “Consumption of food and drinks is not allowed onboard … passengers are encouraged to use rest-stops for meals and refreshments.”ded..On many regular bus services, food or drinks are not provi.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqAccordion;
