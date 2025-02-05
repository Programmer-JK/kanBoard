import { useState } from "react";
import { Plus } from "lucide-react";
import Modal from "@/component/modal/modal";
import AddColumnModal from "@/component/modal/add-column-modal/add-column-modal";
import PendingCard from "@/component/pendind-card/pending-card";
import { useKanStore } from "@/store/store";

const PendingList = () => {
  const { projectBoard } = useKanStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openCreateColumnHandler = () => {
    setIsModalOpen(true);
  };
  return (
    <div
      className="
        flex flex-col col-span-2 
      bg-purple-300 p-2 mr-16
      "
    >
      <div className="w-full p-2 ">
        <button
          className="
          w-fit my-1 p-2
          flex flex-row justify-center items-center gap-2
        bg-gray-100 text-gray-500 rounded-lg 
          font-medium text-sm 
        hover:bg-gray-200 hover:outline-gray-400
        "
          onClick={openCreateColumnHandler}
        >
          <Plus size={14} /> Add another list
        </button>
      </div>

      {(projectBoard?.columns?.pending || []).map((column) => (
        <PendingCard key={column.id} column={column}></PendingCard>
      ))}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddColumnModal onClose={() => {}} />
      </Modal>
    </div>
  );
};

export default PendingList;
