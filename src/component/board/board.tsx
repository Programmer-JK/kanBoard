import { PencilLine } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useKanStore } from "@/store/store";
import OngoingList from "./ongoing-list/ongoing-list";
import CompletedList from "./completed-list/completed-list";
import PlannedList from "./planned-list/planned-list";
import PendingList from "./pending-list/pending-list";

const Board = () => {
  const { projectBoard, setProjectName } = useKanStore();
  const [availableChange, setAvailableChange] = useState(false);
  const inputRef = useRef(null);

  const changeProjectTitleHandler = (e) => {
    setProjectName(e.target.value);
  };

  useEffect(() => {
    if (availableChange) {
      if (!inputRef.current) return;
      else {
        inputRef.current.focus();
      }
    }
  }, [availableChange]);

  return (
    <div className="h-full pt-36">
      <div className="flex flex-row text-2xl font-bold gap-5 items-center">
        <input
          className="bg-[#f8f8f8] outline-none"
          ref={inputRef}
          value={projectBoard.name}
          onChange={changeProjectTitleHandler}
          disabled={!availableChange}
          onBlur={() => setAvailableChange(false)}
        ></input>
        <button onClick={() => setAvailableChange(true)}>
          <PencilLine />
        </button>
      </div>
      <div className="grid grid-cols-5 h-screen pt-8">
        <PlannedList />
        <OngoingList />
        <CompletedList />
        <PendingList />
      </div>
    </div>
  );
};

export default Board;
