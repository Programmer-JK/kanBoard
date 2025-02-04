import { CardProps } from "@/type/common";
import { getTagColorClass } from "@/util/common";
import { X } from "lucide-react";

const PendingCard = ({ tag, contents }: CardProps) => {
  return (
    <div
      className="
    flex flex-col items-end 
    w-full my-1 p-2 
    bg-white rounded-md 
    shadow-md shadow-black/40
    "
    >
      <X size={16} />
      <div className="w-full flex flex-col items-start">
        <div className="flex flex-wrap whitespace-nowrap">
          {tag &&
            tag.map((item, idx) => (
              <span
                key={idx}
                className={`
                  w-fit my-0.5 mx-1 rounded px-1 
                  font-bold 
                  ${getTagColorClass(item.color)}
                `}
              >
                {item.text}
              </span>
            ))}
        </div>
        <div>{contents}</div>
      </div>
    </div>
  );
};

export default PendingCard;
