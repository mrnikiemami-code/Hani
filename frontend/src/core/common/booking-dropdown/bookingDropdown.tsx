import { useState } from "react";

type Location = {
  value: string;
  subValue?: string;
};

type Props = {
  label: string;
  defaultValue: string;
  defaultSubValue: string;
  locations: Location[];
};

export default function BookingDropdown({
  label,
  defaultValue,
  defaultSubValue,
  locations,
}: Props) {
  const [value, setValue] = useState(defaultValue);
  const [subValue, setSubValue] = useState(defaultSubValue);

  const handleSelect = (loc: Location) => {
    setValue(loc.value);
    setSubValue(loc.subValue??"");
  };

  return (
    <div className="booking-dropdown">

      <label className="form-label fs-14 text-default mb-1">{label}</label>

      <input
        type="text"
        className="form-control value-input"
        value={value}
        readOnly
      />
    {subValue ? (
      <p className="fs-12 mb-0">{subValue}</p>
    ):(<p className="fs-12 mb-0">{defaultSubValue}</p>)}

      <div className="dropdown-menu dropdown-md p-0">
      
        <ul>
          {locations.map((loc, i) => (
            <li className="border-bottom" key={i}>
              <a
                href="#"
                className="dropdown-item"
                onClick={(e) => {
                  e.preventDefault();
                  handleSelect(loc);
                }}
              >
                <div className="fs-16 fw-medium text-dark">
                  {loc.value}
                </div>
                <p>{loc.subValue}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}