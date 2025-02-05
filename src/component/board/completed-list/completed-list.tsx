import Card from "@/component/card/card";
import { useKanStore } from "@/store/store";
import { Plus } from "lucide-react";

const CompletedList = () => {
  const { projectBoard } = useKanStore();
  const completedCount = (projectBoard?.columns?.completed || []).length;
  return (
    <div className="col-span-1 bg-red-300 p-2">
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
          min-w-5 h-5 p-1 bg-gray-200 rounded-full
          flex items-center justify-center 
          text-sm
          "
          >
            {completedCount}
          </span>
        </div>
        {completedCount === 0 && (
          <button
            className="
          w-7 h-5 rounded-full bg-gray-200
          flex items-center justify-center
          "
          >
            <Plus size={16} />
          </button>
        )}
      </div>
      {completedCount !== 0 &&
        projectBoard.columns.completed.map((column) => (
          <Card column={column}></Card>
        ))}
    </div>
  );
};

export default CompletedList;
