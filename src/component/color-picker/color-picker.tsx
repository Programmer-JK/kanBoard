import { ColorPickerProps } from "@/type/common";
import { getTagColorClass } from "@/util/common";
import { useState } from "react";

const ColorPicker = ({ onColorSelect }: ColorPickerProps) => {
  const [selectedColor, setSelectedColor] = useState("");

  const colors = [
    "red",
    "orange",
    "yellow",
    "blue",
    "green",
    "purple",
    "gray",
    "pink",
  ];

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    onColorSelect(color);
  };

  return (
    <div className="flex flex-wrap gap-4 px-1">
      {colors.map((name) => (
        <button
          key={name}
          onClick={() => handleColorClick(name)}
          className={`
            ${getTagColorClass(name)} 
            px-4 py-2 
            rounded-md 
            outline
            transition-all 
            duration-200 
            ${
              selectedColor === name
                ? "scale-110 shadow-lg ring-2 ring-offset-2"
                : "hover:scale-105"
            }
          `}
        ></button>
      ))}
    </div>
  );
};

export default ColorPicker;
