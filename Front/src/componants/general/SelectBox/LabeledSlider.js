import React from "react";
import Colors from '@constants/AppColors';
import Slider  from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

const MuiLabeledSlider = styled(Slider)({
  color: Colors.green,
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: Colors.green,
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

const LabeledSlider = ({defaultValue,step}) => {
  return (
    <MuiLabeledSlider
      valueLabelDisplay="auto"
      aria-label="slider"
      defaultValue={defaultValue}
      step={step}
    />
  );
};

export default LabeledSlider;
