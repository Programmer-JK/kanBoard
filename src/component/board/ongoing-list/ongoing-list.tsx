import Card from "@/component/card/card";
import AddCardModal from "@/component/modal/add-card-modal/add-card-modal";
import Modal from "@/component/modal/modal";
import { useKanStore } from "@/store/store";
import { StateType } from "@/type/common";
import { Plus } from "lucide-react";
import { useState } from "react";

const OngoingList = () => {
  const state: StateType = "ongoing";

  const { projectBoard, moveColumn } = useKanStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onGoingCount = (projectBoard?.columns?.ongoing || []).length;

  const openCreateCardHandler = () => {
    setIsModalOpen(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const columnId = e.dataTransfer.getData("columnId");
    const fromState = e.dataTransfer.getData("fromState") as StateType;

    if (fromState === state) return;
    moveColumn(fromState, state, columnId);
  };

  return (
    <div
      className="col-span-1 bg-blue-300 p-2"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
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
