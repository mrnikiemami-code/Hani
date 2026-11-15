"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";

const BusFilter = () => {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    if (expanded) {
      content.style.height = content.scrollHeight + "px"; // Expand to full height
    } else {
      content.style.height = "148px"; // Collapse height
    }
  }, [expanded]);

  return (
    <div>
      {/* Content Box */}
      <div
        className="more-content"
        ref={contentRef}
        style={{
          overflow: "hidden",
          height: "148px",
          transition: "height 0.3s ease",
        }}
      >
        <div className="form-check d-flex align-items-center ps-0 mb-2">
          <input className="form-check-input ms-0 mt-0" type="checkbox" id="bus1" />
          <label className="form-check-label ms-2" htmlFor="bus1">
            Volvo Buses
          </label>
        </div>

        <div className="form-check d-flex align-items-center ps-0 mb-2">
          <input className="form-check-input ms-0 mt-0" type="checkbox" id="bus2" />
          <label className="form-check-label ms-2" htmlFor="bus2">
            Ashok Leyland
          </label>
        </div>

        <div className="form-check d-flex align-items-center ps-0 mb-2">
          <input className="form-check-input ms-0 mt-0" type="checkbox" id="bus3" />
          <label className="form-check-label ms-2" htmlFor="bus3">
            Tata Motors
          </label>
        </div>

        <div className="form-check d-flex align-items-center ps-0 mb-2">
          <input className="form-check-input ms-0 mt-0" type="checkbox" id="bus4" defaultChecked />
          <label className="form-check-label ms-2" htmlFor="bus4">
            BharatBenz
          </label>
        </div>

        <div className="form-check d-flex align-items-center ps-0 mb-2">
          <input className="form-check-input ms-0 mt-0" type="checkbox" id="bus5" />
          <label className="form-check-label ms-2" htmlFor="bus5">
            Eicher Motors
          </label>
        </div>

        <div className="form-check d-flex align-items-center ps-0 mb-2">
          <input className="form-check-input ms-0 mt-0" type="checkbox" id="bus6" />
          <label className="form-check-label ms-2" htmlFor="bus6">
            Isuzu Motors
          </label>
        </div>
      </div>

      {/* Toggle Button */}
      <Link
        href="#"
        className="more-view fw-medium fs-14"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Show Less" : "Show More"}
      </Link>
    </div>
  );
};

export default BusFilter;
