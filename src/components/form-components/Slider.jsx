import React from "react";
import Slider from "@material-ui/core/Slider";

function valuetext(value) {
  return `${value}°C`;
}

export default function DiscreteSlider() {
  return (
    <Slider
        defaultValue={30}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        marks
        min={10}
        max={100}
    />
  );
}