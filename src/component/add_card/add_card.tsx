import { Plus } from "lucide-react";

const AddCard = () => {
  const handleClickEvent = () => {
    console.log("click");
  };

  return (
    <button
      className="flex flex-col break-words justify-center items-center w-full h-32 gap-2 my-1 p-2 bg-white rounded-md shadow-md shadow-black/40"
      onClick={handleClickEvent}
    >
      지금 바로 추가해보세요.
      <span className="bg-gray-200 w-12 h-8 rounded-2xl font-bold flex items-center justify-center">
        <Plus size={14} />
      </span>
    </button>
  );
};

export default AddCard;
