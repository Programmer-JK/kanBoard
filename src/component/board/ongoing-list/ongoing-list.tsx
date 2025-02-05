import Card from "@/component/card/card";
import AddCardModal from "@/component/modal/add-card-modal/add-card-modal";
import Modal from "@/component/modal/modal";
import { useKanStore } from "@/store/store";
import { Plus } from "lucide-react";
import { useState } from "react";

const OngoingList = () => {
  const { projectBoard } = useKanStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onGoingCount = (projectBoard?.columns?.ongoing || []).length;

  const openCreateCardHandler = () => {
    console.log("openCreateCardHandler");
    setIsModalOpen(true);
  };

  return (
    <div className="col-span-1 bg-blue-300 p-2">
      <div
        className="
      flex flex-row justify-between items-center 
      w-full my-1 p-2 
      text-xl font-bold
      "
      >
        <div className="flex flex-row items-center gap-2">
          <span>진행 중</span>
          <span
            className="
          min-w-5 h-5 p-1 rounded-full
          flex items-center justify-center 
          text-sm bg-gray-200
          "
          >
            {onGoingCount}
          </span>
        </div>
        {onGoingCount === 0 && (
          <button
            className="
          w-7 h-5 rounded-full
          flex items-center justify-center
          bg-gray-200
          "
            onClick={openCreateCardHandler}
          >
            <Plus size={16} />
          </button>
        )}
      </div>
      {onGoingCount !== 0 &&
        projectBoard.columns.ongoing.map((column) => (
          <Card key={column.id} column={column}></Card>
        ))}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddCardModal onClose={() => {}} targetState="ongoing" />
      </Modal>
    </div>
  );
};

export default OngoingList;
