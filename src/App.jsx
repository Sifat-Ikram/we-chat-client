import { useState } from "react";
import { Outlet } from "react-router-dom";
import SidebarTop from "./components/sidebar/SidebarTop";
import useAllChats from "./hooks/useAllChats";
import { NavLink } from "react-router-dom";
import useWindowSize from "./hooks/useWindowSize";
import background from "./assets/background.jpg";

const App = () => {
  const [chats] = useAllChats();
  const [searchValue, setSearchValue] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const size = useWindowSize();

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

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

  const handleChatSelect = (chat) => {
    setSelectedMessage(chat);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center min-h-screen">
      <div className="w-full md:w-1/4 min-h-screen px-3 fixed left-0">
        <div>
          <SidebarTop onSearchChange={handleSearchChange} />
        </div>
        <div className="mt-5">
          {filteredChats.map((chat) => (
            <NavLink
              to={`/messages/${chat.id}`}
              key={chat.id}
              onClick={() => handleChatSelect(chat)}
              style={({ isActive }) => ({
                background: isActive ? "#3459c9" : "",
                color: isActive ? "white" : "",
              })}
              className="w-full flex items-center gap-3 hover:bg-gray-300 p-3 rounded-2xl"
            >
              <div className="w-14">
                <img
                  src=""
                  alt="image"
                  className="h-14 w-14 rounded-full border-2 border-gray-500"
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
      <div className="flex-1 min-h-screen ml-96">
        {size.width >= 768 && (
          <div>
            {selectedMessage ? (
              <div>
                <Outlet />
              </div>
            ) : (
              <div
                className="w-full min-h-screen flex items-center relative justify-center"
                style={{
                  backgroundImage: `url(${background})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <h1 className="text-5xl font-bold text-center text-white">
                  Select a chat to start messaging
                </h1>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
