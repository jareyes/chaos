"use strict";

class Color {
  constructor(red, green, blue) {
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  from_hex(hexColor) {
    const hex = hexColor.replace("#", "")
    const int = parseInt(hex, 16);

    const red = (int >> 16) & 255;
    const green = (int >> 8) & 255;
    const blue = int & 255;
    return new Color(red, green, blue);
  }
}

class ColorScale {
  constructor(min, max, start_color, end_color) {
    this.red_scale = new Scale(min, max, start_color.red, end_color.red);
    this.green_scale = new Scale(min, max, start_color.green, end_color.green);
    this.blue_scale = new Scale(min, max, start_color.blue, end_color.blue);
  }

  lerp(val) {
    const red = Math.round(this.red_scale.lerp(val));
    const green = Math.round(this.green_scale.lerp(val));
    const blue = Math.round(this.blue_scale.lerp(val));
    return new Color(red, green, blue);
  }
}

class ColorGradient {
  constructor(min, max, colors) {
    const range = max - min;
    const n_scales = colors.length - 1;

    this.interval = range / n_scales;
    this.color_scales = new Array(n);
    for(
      let i = 0, scale_min = min, scale_max = min + interval;
      i < n_scales;
      i++, scale_min += interval, scale_max += interval
    ) {
      const color_scale = new ColorScale(
        scale_min,
        scale_max,
        colors[i],
        colors[i+1],
      );
      this.color_scales[i] = color_scale;
    }
  }

  lerp(val) {
    const i = Math.trunc(val / this.interval);
    const scale = this.color_scales[i];
    return scale.lerp(val);
  }
}

exports.Color = Color;
exports.Gradient = ColorGradient;
exports.Scale = ColorScale;
