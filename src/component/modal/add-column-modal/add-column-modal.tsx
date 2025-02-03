import { ChildrenModalProps } from "@/type/common";

const AddColumnModal = ({ onClose }: ChildrenModalProps) => {
  return (
    <div className="p-4">
      <div className="space-y-4">
        {/* column 추가 */}
        <h2 className="text-lg font-bold mb-4">Column 추가</h2>

        {/* 태그 관련 항목들 */}
        <div className="space-y-2 ml-2">
          <div className="text-sm text-gray-600">태그 이름</div>
          <input></input>
          <div className="text-sm text-gray-600">태그 색깔</div>
          <div className="h-8 bg-red-300 rounded"></div>
        </div>

        {/* 취소/추가 버튼 */}
        <div className="flex space-x-2">
          <button className="bg-red-300 text-white px-4 py-1 rounded">
            취소
          </button>
          <button className="bg-red-300 text-white px-4 py-1 rounded">
            추가
          </button>
        </div>

        {/* column 내용 추가 */}
        <div>
          <div className="text-sm">column 내용 추가</div>
          <div className="h-8 bg-blue-200 rounded my-2"></div>
        </div>

        {/* 하단 버튼들 */}
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
    </div>
  );
};
export default AddColumnModal;
