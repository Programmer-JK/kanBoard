import AddColumnModal from "@/component/modal/add-column-modal/add-column-modal";
import Modal from "@/component/modal/modal";
import PendingCard from "@/component/pendind-card/pending-card";
import { useKanStore } from "@/store/store";
import { Plus } from "lucide-react";
import { useState } from "react";

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
      {(projectBoard?.columns?.pending || []).map((column) => (
        <PendingCard
          key={column.id}
          tag={column.tags}
          contents={column.content}
        ></PendingCard>
      ))}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddColumnModal onClose={() => {}} />
      </Modal>
    </div>
  );
};

export default PendingList;
