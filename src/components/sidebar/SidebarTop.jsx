import { IoMdMenu } from "react-icons/io";
import { FaSearch, FaRegBookmark } from "react-icons/fa";
import { IoPersonOutline, IoSettingsOutline } from "react-icons/io5";
import { AiOutlinePlayCircle, AiOutlineQuestionCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { GoBug, GoMoon } from "react-icons/go";
import { CiCirclePlus } from "react-icons/ci";
import { SlSymbleFemale } from "react-icons/sl";
import sign from "../../assets/k-letter.svg";

const SidebarTop = ({ onSearchChange }) => {
  const navButton = (
    <>
      <li>
        <Link className="w-full gap-5 text-base font-bold">
          <FaRegBookmark className="text-xl font-bold text-gray-600" />
          Saved Messages
        </Link>
      </li>
      <li>
        <Link className="w-full gap-5 text-base font-bold">
          <IoPersonOutline className="text-xl font-bold text-gray-600" />
          Contacts
        </Link>
      </li>
      <li>
        <Link className="w-full gap-5 text-base font-bold">
          <AiOutlinePlayCircle className="text-xl font-bold text-gray-600" />
          My Stories
        </Link>
      </li>
      <li>
        <Link className="w-full gap-5 text-base font-bold">
          <IoSettingsOutline className="text-xl font-bold text-gray-600" />
          Settings
        </Link>
      </li>
      <li>
        <Link className="w-full gap-5 text-base font-bold">
          <GoMoon className="text-xl font-bold text-gray-600" />
          Night Mode
        </Link>
      </li>
      <li>
        <Link className="w-full gap-5 text-base font-bold">
          <SlSymbleFemale className="text-xl font-bold text-gray-600" />
          Animations
        </Link>
      </li>
      <li>
        <Link className="w-full gap-5 text-base font-bold">
          <AiOutlineQuestionCircle className="text-xl font-bold text-gray-600" />
          Telegram Features
        </Link>
      </li>
      <li>
        <Link className="w-full gap-5 text-base font-bold">
          <GoBug className="text-xl font-bold text-gray-600" />
          Report a Bug
        </Link>
      </li>
      <li>
        <Link className="w-full gap-5 text-base font-bold">
          <img src={sign} alt="K-sign" className="h-5 w-5 rounded-full" />
          Switch to K Version
        </Link>
      </li>
      <li>
        <Link className="w-full gap-5 text-base font-bold">
          <CiCirclePlus className="text-xl font-bold text-gray-600" />
          Install App
        </Link>
      </li>
    </>
  );

  const handleSearch = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="flex justify-center items-center gap-5 bg-white pt-2">
      <div className="dropdown">
        <button tabIndex={0} role="button">
          <IoMdMenu className="h-10 w-10 rounded-full text-gray-600 bg-white hover:bg-gray-200 p-2" />
        </button>
        <ul
          tabIndex={0}
          className="menu dropdown-content bg-base-100 rounded-box z-[1] w-72 p-2 shadow"
        >
          {navButton}
        </ul>
      </div>
      <div className="relative flex justify-center items-center">
        <FaSearch className="absolute left-4 text-gray-400 mt-1" />
        <input
          onChange={handleSearch}
          type="text"
          placeholder="Search"
          className="pl-12 py-3 rounded-3xl bg-gray-100 w-64 border-0"
        />
      </div>
    </div>
  );
};

export default SidebarTop;
