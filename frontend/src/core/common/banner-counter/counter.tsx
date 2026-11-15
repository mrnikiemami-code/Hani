import React, { useState } from "react";

interface BannerCounterProps {
  value?: number;
  setValue?: React.Dispatch<React.SetStateAction<number>>;
}

const BannerCounter = ({ value, setValue }: BannerCounterProps) => {

  const [internalValue, setInternalValue] = useState(value ?? 0);

  // decide which value to use
  const currentValue = value !== undefined ? value : internalValue;
  const updateValue = setValue ?? setInternalValue;

  const handleIncrement = () => {
    if (currentValue < 99) {
      updateValue(currentValue + 1);
    }
  };

  const handleDecrement = () => {
    if (currentValue > 0) {
      updateValue(currentValue - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 0 && val <= 99) {
      updateValue(val);
    }
  };

  return (
    <div className="custom-increment">
      <div className="input-group">

        <span className="input-group-btn float-start">
          <button
            type="button"
            className="quantity-left-minus btn btn-light btn-number"
            onClick={handleDecrement}
          >
            <i className="isax isax-minus" />
          </button>
        </span>

        <input
          type="text"
          className="input-number text-center"
          value={currentValue}
          onChange={handleChange}
        />

        <span className="input-group-btn float-end">
          <button
            type="button"
            className="quantity-right-plus btn btn-light btn-number"
            onClick={handleIncrement}
          >
            <i className="isax isax-add" />
          </button>
        </span>

      </div>
    </div>
  );
};

export default BannerCounter;