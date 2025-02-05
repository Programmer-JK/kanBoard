import { useState } from "react";
import { X } from "lucide-react";
import Modal from "@/component/modal/modal";
import CardInfoModal from "@/component/card_info-modal/card_info-modal";
import { getStateColorClass, getTagColorClass } from "@/util/common";
import { CardProps, TagTypes } from "@/type/common";
import { useKanStore } from "@/store/store";

const PendingCard = ({ column }: CardProps) => {
  const { removeColumn } = useKanStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openCreateColumnHandler = () => {
    setIsModalOpen(true);
  };

  const deleteColumnHandler = () => {
    removeColumn(column.state, column.id);
  };

  return (
    <div>
      <div
        className="
          flex flex-col items-end gap-2
          w-full my-1 p-2 
          bg-white rounded-md 
          shadow-md shadow-black/40
        "
      >
        <div className="flex flex-row justify-between w-full">
          <div
            className={`
              px-2 py-0.5 
              rounded-md border 
              text-sm ${getStateColorClass(column.state)}
            `}
          >
            {column.state}
          </div>
          <X size={16} onClick={deleteColumnHandler} />
        </div>

        <div
          className="w-full flex flex-col items-start"
          onClick={openCreateColumnHandler}
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
          <div>{column.content}</div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CardInfoModal columnData={column} onClose={() => {}} />
      </Modal>
    </div>
  );
};

export default PendingCard;
