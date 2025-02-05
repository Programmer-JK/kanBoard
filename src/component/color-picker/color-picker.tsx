import { useState } from "react";
import { TAG_COLORS } from "@/const/common";
import { ColorPickerProps } from "@/type/common";
import { getTagColorClass } from "@/util/common";

const ColorPicker = ({ onColorSelect }: ColorPickerProps) => {
  const [selectedColor, setSelectedColor] = useState("");

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    onColorSelect(color);
  };

  return (
    <div className="flex flex-wrap gap-4 px-1">
      {TAG_COLORS.map((color) => (
        <button
          key={color}
          onClick={() => handleColorClick(color)}
          className={`
            ${getTagColorClass(color)} 
            px-4 py-2 
            rounded-md 
            outline
            transition-all 
            duration-200 
            ${
              selectedColor === color
                ? "scale-110 shadow-lg ring-2 ring-offset-2"
                : "hover:scale-105"
            }
          `}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
