import { CardProps, TagTypes } from "@/type/common";
import { getTagColorClass } from "@/util/common";
import Modal from "../modal/modal";
import { useState } from "react";
import CardInfoModal from "../card_info-modal/card_info-modal";
import { X } from "lucide-react";
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
        draggable
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
