import {
  HiOutlineMenuAlt2,
  HiOutlineShoppingBag,
  HiOutlineSearch,
} from "react-icons/hi";
import { Link } from "react-router-dom";

const Header = ({ handleSideNav, handleSearch }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-[#ececec] z-10 h-[5.8rem]">
      <nav className="grid px-[0.6rem] grid-cols-[25%_1fr_25%] gap-x-[5%] bg-white items-center h-[100%]">
        <div>
          <button className="p-3.5" onClick={handleSideNav}>
            <HiOutlineMenuAlt2 size={"2.4rem"} />
          </button>
        </div>
        <div className="h-[100%]">
          <Link
            to={"/"}
            className="relative h-[100%] block before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:h-[100%] before:w-[76%] before:bg-center before:bg-no-repeat before:bg-contain before:bg-[url('../assets/images/logo.png')] "
          ></Link>
        </div>
        <div className="flex justify-end gap-2">
          <button className="p-3.5" onClick={handleSearch}>
            <HiOutlineSearch size={"2.4rem"} className="scale-x-[-1]" />
          </button>
          <button className="p-3.5">
            <HiOutlineShoppingBag size={"2.4rem"} />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
