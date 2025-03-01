import { PencilLine } from "lucide-react";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { useKanStore } from "@/store/store";
import PlannedList from "./planned-list/planned-list";
import OngoingList from "./ongoing-list/ongoing-list";
import CompletedList from "./completed-list/completed-list";
import PendingList from "./pending-list/pending-list";

const Board = () => {
  const { projectBoard, setStoreProjectName } = useKanStore();
  const [projectName, setProjectName] = useState(projectBoard.name);
  const [availableChange, setAvailableChange] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const changeProjectNameHandler = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    console.log(e.target.value);
    setProjectName(e.target.value);
  };

  const saveProjectNameHandler = () => {
    setStoreProjectName(projectName);
    setAvailableChange(false);
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
    <div className="h-full pt-24 md:pt-36">
      <div className="flex flex-row text-2xl font-bold gap-5 items-center">
        <input
          className="bg-[#f8f8f8] outline-none"
          ref={inputRef}
          value={projectName}
          onChange={changeProjectNameHandler}
          disabled={!availableChange}
          onBlur={saveProjectNameHandler}
        ></input>
        <button onClick={() => setAvailableChange(true)}>
          <PencilLine />
        </button>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-5 h-screen pt-8">
        <PlannedList />
        <OngoingList />
        <CompletedList />
        <PendingList />
      </div>
    </div>
  );
};

export default Board;
