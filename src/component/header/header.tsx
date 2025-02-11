import LogoImage from "@/assets/svg/logo.svg";
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
      <LogoImage className="w-10 h-10" />
      <HeaderUser />
    </header>
  );
}

export default Header;
