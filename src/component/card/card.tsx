import { useState } from "react";
import { X } from "lucide-react";
import Modal from "@/component/modal/modal";
import CardInfoModal from "@/component/card_info-modal/card_info-modal";
import { CardProps, TagTypes } from "@/type/common";
import { getTagColorClass, isMobile } from "@/util/common";
import { useKanStore } from "@/store/store";

const Card = ({ column }: CardProps) => {
  const { removeCard } = useKanStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCreateColumnHandler = () => {
    setIsModalOpen(true);
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("columnId", column.id);
    e.dataTransfer.setData("fromState", column.state);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    setTouchPos({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
    e.currentTarget.style.zIndex = "1000";
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile) return;
    e.preventDefault();
    const touch = e.touches[0];
    e.currentTarget.style.transform = `translate(${
      touch.clientX - touchPos.x
    }px, ${touch.clientY - touchPos.y}px)`;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isMobile) return;
    e.currentTarget.style.transform = "";
    e.currentTarget.style.zIndex = "";
  };

  const handleDeleteCard = () => {
    removeCard(column);
  };

  return (
    <div>
      <div
        className="
          card 
          flex flex-col items-end
          w-full my-3 p-2 
        bg-white rounded-md shadow-md shadow-black/40
        "
        onClick={openCreateColumnHandler}
        draggable={!isMobile}
        onDragStart={handleDragStart}
      >
        <X size={16} onClick={handleDeleteCard} className="mb-0.5" />
        <div className="w-full">
          <div className="flex flex-wrap whitespace-nowrap">
            {column.tags &&
              column.tags.map((item: TagTypes) => (
                <span
                  key={item.text}
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
          <div className="mt-3">{column.content}</div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CardInfoModal columnData={column} onClose={() => {}} />
      </Modal>
    </div>
  );
};

export default Card;
