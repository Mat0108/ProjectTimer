import React, { useState } from "react";
import Slider from "@mui/material/Slider";

const minDistance = 10;

const RangeSlider = () => {
  const [value, setValue] = useState([20, 37]);

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue);
    }
  };

  return (
    <Slider
      getAriaLabel={() => "Minimum distance shift"}
      value={value}
      onChange={handleChange}
      valueLabelDisplay="auto"
      disableSwap
    />
  );
};
export default RangeSlider;
