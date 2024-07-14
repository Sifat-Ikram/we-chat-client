import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAllChats = () => {
  const { refetch: refetchChats, data: chats = [] } = useQuery({
    queryKey: ["chat"],
    queryFn: async () => {
      const res = await axios.get(
        "https://devapi.beyondchats.com/api/get_all_chats?page=2"
      );
      return res.data.data.data;
    },
  });
  return [chats, refetchChats];
};

export default useAllChats;
