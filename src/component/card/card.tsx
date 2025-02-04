import { CardProps } from "@/type/common";
import { getTagColorClass } from "@/util/common";

const Card = ({ tag, contents }: CardProps) => {
  return (
    <div
      className="
    w-full my-3 p-2 
    bg-white rounded-md shadow-md shadow-black/40
    "
    >
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
      <div className="mt-3">{contents}</div>
    </div>
  );
};

export default Card;
