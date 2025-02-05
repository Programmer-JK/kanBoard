import AddCard from "@/component/add_card/add_card";
import Card from "@/component/card/card";
import AddCardModal from "@/component/modal/add-card-modal/add-card-modal";
import Modal from "@/component/modal/modal";
import { useKanStore } from "@/store/store";
import { Plus } from "lucide-react";
import { useState } from "react";

const PlannedList = () => {
  const { projectBoard } = useKanStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const plannedCount = (projectBoard?.columns?.planned || []).length;

  const openCreateCardHandler = () => {
    console.log("openCreateCardHandler");
    setIsModalOpen(true);
  };

  const checkPendingListEmpty = () => {
    return plannedCount === 0;
  };

  return (
    <div className="col-span-1 bg-green-300 p-2">
      <div
        className="
      flex flex-row justify-between items-center 
      w-full my-1 p-2 text-xl 
      font-bold
      "
      >
        <div className="flex flex-row items-center gap-2">
          <span>시작 전</span>
          <span
            className="
          min-w-5 h-5 p-1 
          flex items-center justify-center 
          text-sm bg-gray-200 rounded-full
          "
          >
            {plannedCount}
          </span>
        </div>
        {!checkPendingListEmpty() && (
          <button
            className="flex bg-gray-200 rounded-full w-7 h-5 items-center justify-center"
            onClick={openCreateCardHandler}
          >
            <Plus size={16} />
          </button>
        )}
      </div>
      {!checkPendingListEmpty() ? (
        projectBoard.columns.planned.map((column) => (
          <Card key={column.id} column={column}></Card>
        ))
      ) : (
        <AddCard onClick={openCreateCardHandler} />
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddCardModal onClose={() => {}} targetState="planned" />
      </Modal>
    </div>
  );
};

export default PlannedList;
