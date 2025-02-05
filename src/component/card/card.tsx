import { CardProps, TagTypes } from "@/type/common";
import { getTagColorClass } from "@/util/common";
import Modal from "../modal/modal";
import AddColumnModal from "../modal/add-column-modal/add-column-modal";
// import { useKanStore } from "@/store/store";
import { useState } from "react";

const Card = ({ column }: CardProps) => {
  // const { projectBoard } = useKanStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openCreateColumnHandler = () => {
    setIsModalOpen(true);
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("columnId", column.id);
    e.dataTransfer.setData("fromState", column.state);
  };

  return (
    <div>
      <div
        className="
    w-full my-3 p-2 
    bg-white rounded-md shadow-md shadow-black/40
    "
        onClick={openCreateColumnHandler}
        draggable
        onDragStart={handleDragStart}
      >
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
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddColumnModal onClose={() => {}} />
      </Modal>
    </div>
  );
};

export default Card;
