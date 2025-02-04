import { ChildrenModalProps, ColumnTypes } from "@/type/common";
import { getTagColorClass } from "@/util/common";
import { useState } from "react";

const AddCardModal = ({ onClose }: ChildrenModalProps) => {
  const [selectedColumn, setSelectedColumn] = useState({} as ColumnTypes);
  const demoColumnList = [
    {
      tags: [
        {
          color: "purple",
          text: "관리자페이지",
        },
        {
          color: "purple",
          text: "관리자페이지",
        },
        {
          color: "blue",
          text: "문서화",
        },
      ],
      content: "회원을 블랙리스트로 지정할 수 있는 기능을 제작합니다.",
    },
    {
      tags: [
        {
          color: "blue",
          text: "문서화",
        },
      ],
      content: "디자인시스템 2.1 버전로그를 작성합니다.",
    },
    {
      tags: [
        {
          color: "blue",
          text: "문서화",
        },
      ],
      content: "디자인시스템 2.1 버전로그를 작성합니다.",
    },
    {
      tags: [
        {
          color: "blue",
          text: "문서화",
        },
      ],
      content: "디자인시스템 2.1 버전로그를 작성합니다.",
    },
    {
      tags: [
        {
          color: "blue",
          text: "문서화",
        },
      ],
      content: "디자인시스템 2.1 버전로그를 작성합니다.",
    },
  ];
  return (
    <div className="flex flex-col gap-2 w-full max-w-lg">
      <h2 className="text-lg font-bold mb-4">카드 추가</h2>
      <div className="font-bold">column list : </div>
      {/* 카드 내용 입력 영역 */}
      <div className="flex flex-col gap-2 bg-white rounded-lg p-4 h-52 overflow-y-scroll">
        {demoColumnList.map((column, idx) => (
          <div
            key={idx}
            className="flex flex-col hover:bg-gray-200 p-1 rounded-md border border-gray-200"
            onClick={() => setSelectedColumn(column)}
          >
            <div className="flex flex-row">
              {column.tags &&
                column.tags.map((item, idx) => (
                  <span
                    key={idx}
                    className={`w-fit my-0.5 mx-1 rounded px-1 font-bold ${getTagColorClass(
                      item.color
                    )}`}
                  >
                    {item.text}
                  </span>
                ))}
            </div>
            {column.content}
          </div>
        ))}
      </div>
      <div className="font-bold">선택한 column : </div>
      <div className="flex flex-col bg-white w-full h-fit content-center rounded-md px-2 py-1">
        <div className="flex flex-row">
          {selectedColumn.tags &&
            selectedColumn.tags.map((tag, idx) => (
              <span
                key={idx}
                className={`w-fit my-0.5 mx-1 rounded px-1 font-bold ${getTagColorClass(
                  tag.color
                )}`}
              >
                {tag.text}
              </span>
            ))}
        </div>
        {selectedColumn.content}
      </div>

      {/* 버튼 영역 */}
      <div className="flex justify-end space-x-2">
        <button
          className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          취소
        </button>
        <button className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded">
          추가
        </button>
      </div>
    </div>
  );
};
export default AddCardModal;
