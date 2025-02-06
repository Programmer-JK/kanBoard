import BTheEggImage from "@/assets/svg/btheegg.svg";
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
      <BTheEggImage />
      <HeaderUser />
    </header>
  );
}

export default Header;
