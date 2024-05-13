"use client";

import ConversationChatPerson from "@/components/conversation/ConversationChatPerson";
import ConversationMessagingChats from "@/components/conversation/ConversationMessagingChats";
import { getUserInfo } from "@/hooks/services/auth.service";
import useSocket from "@/hooks/useSocket";
import { useGetMyAllConversationsQuery } from "@/redux/features/conversations/conversationApi";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Placeholder } from "rsuite";

const ServiceProviderMessagingPage = () => {
  const { data: allConversations, isLoading, isError, isSuccess, refetch } = useGetMyAllConversationsQuery();
  const useSearch = useSearchParams();
  const paramsChatId = useSearch.get("chat");
  const [size, setSize] = useState(10);
  const handleRefreshSize = () => {
    setSize(10);
  };
  const myDetails = getUserInfo();
  const socket = useSocket();

  // socket

  useEffect(() => {
    if (allConversations && !isLoading && !isError && isSuccess && myDetails) {
      if (socket) {
        socket.emit("join chat", { userId: myDetails?.userId });
      }
    }
  }, [isLoading, isError, isSuccess, allConversations, myDetails]);

  //
  const handleMessageReceived = useCallback(() => {
    if (isLoading || isSuccess) {
      refetch(); // Only refetch if the query has been started
    }
  }, [isLoading, isSuccess, refetch]);

  useEffect(() => {
    if (socket) {
      socket.on("message received", handleMessageReceived);

      // Cleanup function to remove the event listener
      return () => {
        socket.off("message received", handleMessageReceived);
      };
    }
  }, [socket, handleMessageReceived]);

  // !

  return (
    <section className="max-w-[1050px]  mb-5  xl:mx-auto md:px-3 lg:px-5 px-1.5    2xl:px-0 ">
      {/* section title */}
      <div className="flex justify-center mt-3">
        <h1 className=" text-lg md:text-xl font-medium">Messages</h1>
      </div>
      {/* conversations */}
      <div className="mt-5">
        <div className="mb-2">
          <h2 className="font-semibold text-2xl">Conversations</h2>
        </div>
        {/* messages */}
        <div className="grid grid-cols-6 gap-1 lg:gap-2 h-[80vh]  2xl:h-[85vh]">
          <div className="col-span-1 lg:col-span-2 border p-2 rounded-lg rounded-t-lg bg-white shadow-lg custom-scrollbar overflow-y-scroll   ">
            {!isLoading &&
              allConversations?.data?.data?.length > 0 &&
              allConversations?.data?.data?.map((singleConversation) => (
                <div key={singleConversation?.conversationId} className="space-y-10">
                  <ConversationChatPerson
                    handleRefreshSize={handleRefreshSize}
                    singleConversation={singleConversation}
                    paramsChatId={paramsChatId}
                    participant={singleConversation?.perticipants[0]}
                    conversationId={singleConversation?.conversationId}
                  />
                </div>
              ))}
            {isLoading && (
              <div className="space-y-3">
                <Placeholder active />
                <Placeholder active />
                <Placeholder active />
                <Placeholder active />
              </div>
            )}
            {!isLoading && !allConversations?.data?.data?.length > 0 && (
              <div className="space-y-3 flex justify-center items-center min-h-[60vh] max-md:text-center">
                <h2 className="max-md:text-sm ">
                  <span className="md:hidden">Not</span>
                  <span className="max-md:hidden">No Conversation</span> Found
                </h2>
              </div>
            )}
          </div>
          <div className="col-span-5 lg:col-span-4 ">
            <ConversationMessagingChats size={size} setSize={setSize} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceProviderMessagingPage;
