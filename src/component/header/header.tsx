// 방법 1: 임포트할 때 이름 변경
import BTheEggImage from "@/assets/svg/BTheEgg.svg?react";
import HeaderUser from "./header-user/header-user";

function Header() {
  return (
    <header
      className="
    fixed w-full flex flex-row py-5 px-28
    bg-white justify-center 
    md:justify-between text-black
    "
    >
      <BTheEggImage className="hidden md:block" />
      <HeaderUser />
    </header>
  );
}

export default Header;
