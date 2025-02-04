import UserProfile from "@/assets/svg/UserProfile.svg?react";
import { useState } from "react";

function HeaderUser() {
  const list = ["박종권", "User", "김철수"];
  const [selectedName, setSelectedName] = useState("박종권");
  return (
    <div className="flex flex-row gap-2">
      <UserProfile />
      <div className="content-center w-36 text-lg">
        <select
          className="w-full rounded border-transparent px-2 pr-6"
          onChange={(e) => setSelectedName(e.target.value)}
          value={selectedName}
        >
          {/* 선택된 값을 보여주는 부분에만 "님" 추가 */}
          <option value={selectedName}>{selectedName + "님"}</option>
          {list
            .filter((item) => item !== selectedName)
            .map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
        </select>
      </div>

      {/* <div className="justify-center content-center">박종권님</div> */}
    </div>
  );
}

export default HeaderUser;
