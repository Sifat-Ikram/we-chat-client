import { useState } from "react";
import SidebarTop from "./components/sidebar/SidebarTop";
import useAllChats from "./hooks/useAllChats";
import { NavLink, Outlet } from "react-router-dom";

const App = () => {
  const [chats] = useAllChats();
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  console.log(searchValue);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getFilteredChats = () => {
    if (!searchValue) {
      return chats;
    } else {
      return chats.filter((chat) => chat.creator.name === searchValue);
    }
  };
  const filteredChats = getFilteredChats();

  return (
    <div className="flex flex-col md:flex-row justify-center min-h-screen">
      <div className="w-full md:w-1/4 min-h-screen px-3 fixed left-0 border-2 border-orange-500">
        <div>
          <SidebarTop onSearchChange={handleSearchChange} />
        </div>
        <div className="mt-5">
          {filteredChats.map((chat) => (
            <NavLink
              to={`/messages/${chat.id}`}
              key={chat.id}
              style={({ isActive }) => ({
                background: isActive ? "#3459c9" : "",
              })}
              className="w-full flex items-center gap-3 hover:bg-[#3459c9] hover:text-white p-3 rounded-2xl"
            >
              <div className="w-14">
                <img
                  src=""
                  alt="chat"
                  className="h-14 w-14 rounded-full border-2 border-orange-500"
                />
              </div>
              <div className="flex-1 w-full">
                <div className="flex justify-between items-center">
                  <h1>{chat.creator.name}</h1>
                  <h1>{formatTime(chat.updated_at)}</h1>
                </div>
                <div>
                  <h1>{chat.creator.email.slice(0, 20)}</h1>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
      <div className="flex-1 min-h-screen ml-80">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
