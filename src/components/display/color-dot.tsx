import React, { FC } from "react";

export interface ColorDotProps {
  colorName?: string;
  colorCode: string;
}

export const ColorDot: FC<ColorDotProps> = ({ colorName, colorCode }) => {
  return (
    <div className="inline-flex items-center gap-2">
      <div
        className="rounded-full w-5 h-5 border-2 border-neutral"
        style={{ backgroundColor: colorCode }}
      />
      {colorName && <div>{colorName}</div>}
    </div>
  );
};
