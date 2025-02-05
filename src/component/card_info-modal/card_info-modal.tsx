import ColorPicker from "@/component/color-picker/color-picker";
import { useKanStore } from "@/store/store";
import { ChildrenModalProps, TagTypes } from "@/type/common";
import { useState } from "react";

const CardInfoModal = ({ columnData, onClose }: ChildrenModalProps) => {
  const { updateColumn } = useKanStore();
  const [color, setColor] = useState("");
  const [tagName, setTagName] = useState("");
  const [tags, setTags] = useState(columnData?.tags || ([] as TagTypes[]));
  const [content, setContent] = useState(columnData?.content || "");

  const handleColorSelect = (selectedColor: string) => {
    setColor(selectedColor);
  };

  const handleAddTag = () => {
    if (tagName && color) {
      setTags([...tags, { text: tagName, color: color }]);
      setTagName("");
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, idx) => idx !== index));
  };

  const handleModifyColumn = () => {
    if (!columnData) return;
    const newColumn = {
      id: columnData.id,
      state: columnData.state,
      tags: tags,
      content: content,
    };
    updateColumn(columnData.state, columnData.id, newColumn);
    onClose();
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* column 추가 */}
      <h2 className="text-lg font-bold mb-4">Column 추가</h2>

      {/* 태그 관련 항목들 */}
      <div className="space-y-2 ml-2">
        <div className="font-bold text-gray-600">태그 이름</div>
        <input
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          className="w-full rounded-md p-2 outline-none"
        ></input>
        <div className="font-bold text-gray-600">태그 색깔</div>
        <ColorPicker onColorSelect={handleColorSelect} />
        <div className="flex justify-end">
          <button
            onClick={handleAddTag}
            className="
            bg-blue-400 hover:bg-blue-500 
            text-white px-4 py-1 rounded
            "
          >
            추가
          </button>
        </div>
      </div>
      <div>
        <div className="font-bold mb-2">태그 : </div>
        <div className="w-full rounded-md p-2 bg-white">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className={`
                w-fit my-0.5 mx-1 rounded px-1 
                font-bold 
                bg-${tag.color}-300/30 
                text-${tag.color}-700
                `}
            >
              {tag.text}
              <button
                onClick={() => handleRemoveTag(idx)}
                className="ml-1 hover:text-red-500"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
      <div>
        <div className="font-bold mb-2">column 내용 : </div>
        <input
          className="w-full rounded-md p-2 outline-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {/* 하단 버튼들 */}
      <div className="flex justify-end space-x-2">
        <button
          className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          취소
        </button>
        <button
          className="
        bg-orange-400 hover:bg-orange-500 
        text-white px-4 py-2 rounded
        "
          onClick={handleModifyColumn}
        >
          수정
        </button>
      </div>
    </div>
  );
};
export default CardInfoModal;
