"use client";

import ConversationMessagingChats from "@/components/conversation/ConversationMessagingChats";
import ConversationChatPerson from "@/components/property-owner/messaging/PropertyOwnerChatPerson";
import { getUserInfo } from "@/hooks/services/auth.service";
import { useGetMyAllConversationsQuery } from "@/redux/features/conversations/conversationApi";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";

const PropertyOwnerMessaging = () => {
  const { data: allConversations, isLoading, isError, isSuccess, refetch } = useGetMyAllConversationsQuery();
  const useSearch = useSearchParams();
  const paramsChatId = useSearch.get("chat");

  const myDetails = getUserInfo();
  // socket
  const [socketConnected, setSocketConnected] = useState(false);

  const ENDPOINT = "http://localhost:4000";
  let socket;

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", myDetails);
    socket.on("connection", () => setSocketConnected(true));

    if (allConversations && !isLoading && !isError && isSuccess && myDetails) {
      socket.emit("join chat", { userId: myDetails?.userId });
    }
  }, [isLoading, isError, isSuccess, allConversations, myDetails]);

  //
  const handleMessageReceived = useCallback(
    (newMessageReceived) => {
      if (isLoading || isSuccess) {
        console.log("Messenger Updated");
        refetch(); // Only refetch if the query has been started
      }
    },
    [isLoading, isSuccess, refetch],
  );

  useEffect(() => {
    socket.on("message received", handleMessageReceived);

    // Cleanup function to remove the event listener
    return () => {
      socket.off("message received", handleMessageReceived);
    };
  }, [socket, handleMessageReceived]);

  // !

  return (
    <section className="max-w-[1050px]    mb-5  xl:mx-auto md:px-3 lg:px-5 px-5    2xl:px-0 ">
      {/* section title */}
      <div className="flex justify-center">
        <h1 className="text-xl font-medium">Messages</h1>
      </div>
      {/* conversations */}
      <div className="mt-5">
        <div className="mb-2">
          <h2 className="font-semibold text-2xl">Conversations</h2>
        </div>
        {/* messages */}
        <div className="grid grid-cols-6 h-[80vh]">
          <div className="col-span-2 border border-black overflow-y-scroll  ">
            {allConversations?.data?.data?.map((singleConversation, index) => (
              <div
                key={singleConversation?.conversationId}
                className={`py-3 px-3  cursor-pointer hover:bg-[#29429f] hover:text-white
                ${index !== allConversations?.data?.meta?.total && "border-b border-black "}
                ${paramsChatId === singleConversation?.conversationId && "bg-[#29429f] text-white"}
                
                `}
              >
                <ConversationChatPerson participant={singleConversation?.perticipants[0]} conversationId={singleConversation?.conversationId} />
              </div>
            ))}
          </div>
          <div className="col-span-4 border border-l-0 border-black">
            <ConversationMessagingChats />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyOwnerMessaging;
