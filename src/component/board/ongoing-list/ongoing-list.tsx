import Card from "@/component/card/card";
import { useKanStore } from "@/store/store";
import { Plus } from "lucide-react";

const OngoingList = () => {
  const { projectBoard } = useKanStore();
  const onGoingCount = (projectBoard?.columns?.ongoing || []).length;
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
          >
            <Plus size={16} />
          </button>
        )}
      </div>
      {onGoingCount !== 0 &&
        projectBoard.columns.ongoing.map((column) => (
          <Card
            key={column.id}
            tag={column.tags}
            contents={column.content}
          ></Card>
        ))}
    </div>
  );
};

export default OngoingList;
