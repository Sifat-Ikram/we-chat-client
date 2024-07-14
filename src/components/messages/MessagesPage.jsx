import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { FaPhoneFlip } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import useAllChats from "../../hooks/useAllChats";
import { HiOutlineDotsVertical } from "react-icons/hi";

const MessagesPage = () => {
  const { id } = useParams();
  const [chats] = useAllChats();

  // console.log(id);
  // console.log(chats);

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
    <div>
      <div className="fixed">
        <div className="flex justify-between items-center px-10 ml-4 w-full">
          <div className="flex justify-center items-center bg-green-600 text-white">
            <div className="w-14">
              <img
                src=""
                alt="chat"
                className="h-14 w-14 rounded-full border-2 border-orange-500"
              />
            </div>
            <div className="flex-1 w-full">
              <div className="flex justify-between items-center">
                <h1>{selectedChat?.creator.name}</h1>
              </div>
              <div></div>
            </div>
          </div>
          <div className="flex justify-evenly items-center">
            <FaSearch />
            <FaPhoneFlip />
            <HiOutlineDotsVertical />
          </div>
        </div>
      </div>
      <div className="mx-20 absolute">
        {messages.map((message) => (
          <div key={message.id}>
            <div className="chat chat-start">
              <div className="chat-bubble">{message.message}</div>
            </div>
            <div className="chat chat-end">
              <div className="chat-bubble">You underestimate my power!</div>
            </div>
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 w-full p-5 bg-white ml-5">
        <div className="flex justify-center">
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
