import { PencilLine, Plus } from "lucide-react";
import AddCard from "../add_card/add_card";
import Card from "../card/card";
import { useEffect, useRef, useState } from "react";
import Modal from "../modal/modal";
import AddCardModal from "../modal/add-card-modal/add-card-modal";
import AddColumnModal from "../modal/add-column-modal/add-column-modal";

const Board = () => {
  const demoColumnList = [
    // {
    //   tag: [
    //     {
    //       color: "purple",
    //       text: "관리자페이지",
    //     },
    //     {
    //       color: "purple",
    //       text: "관리자페이지",
    //     },
    //     {
    //       color: "blue",
    //       text: "문서화",
    //     },
    //   ],
    //   contents: "회원을 블랙리스트로 지정할 수 있는 기능을 제작합니다.",
    // },
    // {
    //   tag: [
    //     {
    //       color: "blue",
    //       text: "문서화",
    //     },
    //   ],
    //   contents: "디자인시스템 2.1 버전로그를 작성합니다.",
    // },
  ];
  const [availableChange, setAvailableChange] = useState(false);
  const [projectTitle, setProjectTitle] = useState("Project No.1");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputRef = useRef(null);
  const [modalType, setModalType] = useState("");

  const openCreateColumnHandler = () => {
    console.log("openCreateColumnHandler");
    setModalType("column");
    setIsModalOpen(true);
  };

  const openCreateCardHandler = () => {
    console.log("openCreateCardHandler");
    setModalType("card");
    setIsModalOpen(true);
  };

  const renderModalContent = () => {
    switch (modalType) {
      case "card":
        return <AddCardModal onClose={() => {}} />;
      case "column":
        return <AddColumnModal onClose={() => {}} />;
      default:
        return <></>;
    }
  };

  const changeProjectTitleHandler = (e) => {
    setProjectTitle(e.target.value);
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
          value={projectTitle}
          onChange={changeProjectTitleHandler}
          disabled={!availableChange}
          onBlur={() => setAvailableChange(false)}
        ></input>
        <button onClick={() => setAvailableChange(true)}>
          <PencilLine />
        </button>
      </div>
      <div className="grid grid-cols-5 h-screen pt-8">
        <div className="col-span-1 bg-red-300 p-2">
          <div className="w-full my-1 p-2 text-xl font-bold">시작 전</div>
          {demoColumnList.length !== 0 ? (
            demoColumnList.map((item, idx) => (
              <Card
                key={idx.toString()}
                tag={item.tag}
                contents={item.contents}
              ></Card>
            ))
          ) : (
            <AddCard onClick={openCreateCardHandler} />
          )}
        </div>
        <div className="col-span-1 bg-blue-300 p-2">
          <div className="w-full my-1 p-2 text-xl font-bold">진행 중</div>
        </div>
        <div className="col-span-1 bg-green-300 p-2">
          <div className="w-full my-1 p-2 text-xl font-bold">완료</div>
        </div>
        <div className="flex flex-col col-span-2 bg-purple-300 p-2 mr-16">
          <button
            className="w-fit my-1 p-2 flex flex-row justify-center items-center gap-2 bg-gray-100 text-gray-500 rounded-lg font-medium text-sm hover:bg-gray-200 hover:outline-gray-400"
            onClick={openCreateColumnHandler}
          >
            <Plus size={14} /> Add another list
          </button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default Board;
