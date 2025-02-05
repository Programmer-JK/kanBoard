import { useState } from "react";
import { Plus } from "lucide-react";
import Card from "@/component/card/card";
import Modal from "@/component/modal/modal";
import AddCardModal from "@/component/modal/add-card-modal/add-card-modal";
import { useKanStore } from "@/store/store";
import { StateType } from "@/type/common";

const CompletedList = () => {
  const curState: StateType = "completed";

  const { projectBoard, moveCard } = useKanStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const completedCount = (projectBoard?.columns?.completed || []).length;

  const openCreateCardHandler = () => {
    setIsModalOpen(true);
  };

  const dragOverHandler = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const dropHandler = (e: React.DragEvent) => {
    e.preventDefault();
    const columnId = e.dataTransfer.getData("columnId");
    const fromState = e.dataTransfer.getData("fromState") as StateType;

    const container = e.currentTarget as HTMLElement;
    const cards = container.querySelectorAll(".card");
    const dropY = e.clientY;

    let dropIndex = projectBoard.columns[curState].length;

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const rect = card.getBoundingClientRect();
      const cardMiddle = rect.top + rect.height / 2;

      if (dropY < cardMiddle) {
        dropIndex = i;
        break;
      }
    }

    moveCard(fromState, curState, columnId, dropIndex);
  };

  return (
    <div
      className="col-span-1 bg-red-300 p-2"
      onDragOver={dragOverHandler}
      onDrop={dropHandler}
    >
      <div
        className="
          flex flex-row justify-between items-center 
          w-full my-1 p-2 
          text-xl font-bold
        "
      >
        <div className="flex flex-row items-center gap-2">
          <span>완료 </span>
          <span
            className="
              flex items-center justify-center 
              min-w-5 h-5 p-1 bg-gray-200 rounded-full
              text-sm
            "
          >
            {completedCount}
          </span>
        </div>
        <button
          className="
            flex items-center justify-center
            w-7 h-5 bg-gray-200 rounded-full
          "
          onClick={openCreateCardHandler}
        >
          <Plus size={16} />
        </button>
      </div>
      {completedCount !== 0 &&
        projectBoard.columns.completed.map((column) => (
          <Card key={column.id} column={column}></Card>
        ))}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddCardModal onClose={() => {}} targetState={curState} />
      </Modal>
    </div>
  );
};

export default CompletedList;
