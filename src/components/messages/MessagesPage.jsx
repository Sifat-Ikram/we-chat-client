import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { FaPhoneFlip } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import useAllChats from "../../hooks/useAllChats";
import { HiOutlineDotsVertical } from "react-icons/hi";
import background from "../../assets/background.jpg";
import { GoPencil } from "react-icons/go";
import { CiBellOff, CiVideoOn } from "react-icons/ci";
import { IoCheckmarkCircleOutline, IoHandLeftOutline } from "react-icons/io5";
import { BsFlag } from "react-icons/bs";
import { TfiGift } from "react-icons/tfi";
import { MdDeleteOutline } from "react-icons/md";

const MessagesPage = () => {
  const { id } = useParams();
  const [chats] = useAllChats();

  const selectedChat = chats.find((chat) => chat.id == id);

  const {
    data: messages = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["message"],
    queryFn: async () => {
      const res = await axios.get(
        `https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${id}`
      );
      return res.data.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching messages</div>;

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="fixed top-0 md:w-3/4 w-full flex justify-between items-center px-4 bg-white shadow z-50">
        <div className="flex justify-center items-center gap-5">
          <div className="w-14">
            <img
              src=""
              alt="chat"
              className="h-14 w-14 rounded-full border-2 border-gray-500"
            />
          </div>
          <div className="flex-1 w-full">
            <div className="flex flex-col">
              <h1>{selectedChat?.creator.name}</h1>
              <h1>Last seen 07/15/2024</h1>
            </div>
            <div></div>
          </div>
        </div>
        <div className="flex justify-evenly items-center pr-10 space-x-5">
          <FaSearch className="text-gray-500 text-2xl font-semibold mx-2" />
          <FaPhoneFlip className="text-gray-500 text-2xl font-semibold mx-2" />
          <div className="dropdown dropdown-left">
            <HiOutlineDotsVertical
              tabIndex={0}
              role="button"
              className="text-gray-500 text-4xl font-semibold mx-2 p-2 hover:bg-gray-300 rounded-full"
            />
            <ul
              tabIndex={0}
              className="dropdown-content bg-base-100 mt-12 -mr-8 rounded-box z-[1] w-72 p-2 shadow"
            >
              <li className="flex gap-4 items-center px-4 text-gray-600 text-base font-semibold py-2 cursor-pointer">
                <GoPencil />
                <a>Edit</a>
              </li>
              <li className="flex gap-4 items-center px-4 text-gray-600 text-base font-semibold py-2 cursor-pointer">
                <CiVideoOn />
                <a>Video Call</a>
              </li>
              <li className="flex gap-4 items-center px-4 text-gray-600 text-base font-semibold py-2 cursor-pointer">
                <CiBellOff className="text-xl" />
                <a>Mute...</a>
              </li>
              <li className="flex gap-4 items-center px-4 text-gray-600 text-base font-semibold py-2 cursor-pointer">
                <IoCheckmarkCircleOutline />
                <a>Select Messages</a>
              </li>
              <li className="flex gap-4 items-center px-4 text-gray-600 text-base font-semibold py-2 cursor-pointer">
                <BsFlag />
                <a>Report</a>
              </li>
              <li className="flex gap-4 items-center px-4 text-gray-600 text-base font-semibold py-2 cursor-pointer">
                <TfiGift />
                <a>Gift Premium</a>
              </li>
              <li className="flex gap-4 items-center px-4 text-gray-600 text-base font-semibold py-2 cursor-pointer">
                <IoHandLeftOutline />
                <a>Block User</a>
              </li>
              <li className="text-red-600 py-3 flex gap-4 items-center px-4 border-t-[1px] cursor-pointer border-gray-600">
                <MdDeleteOutline />
                <a>Delete chat</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className="px-10 z-10"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {messages.map((message) => (
          <div key={message.id}>
            <div className="chat chat-start">
              <div className="chat-bubble">{message.message}</div>
            </div>
            <div className="chat chat-end mt-2">
              <div className="chat-bubble">You underestimate my power!</div>
            </div>
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 w-full p-3 bg-white z-50">
        <div className="flex justify-center -ml-40">
          <textarea
            className="textarea textarea-bordered w-1/2"
            placeholder="Give A Reply"
          ></textarea>
          <button className="btn btn-primary mr-32 px-8 text-lg font-bold">
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
