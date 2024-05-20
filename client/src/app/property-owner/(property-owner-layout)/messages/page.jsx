"use client";

import ConversationChatPerson from "@/components/conversation/ConversationChatPerson";
import ConversationMessagingChats from "@/components/conversation/ConversationMessagingChats";
import { getUserInfo } from "@/hooks/services/auth.service";
import useSocket from "@/hooks/useSocket";
import { useGetMyAllConversationsQuery } from "@/redux/features/conversations/conversationApi";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Placeholder } from "rsuite";

const PropertyOwnerMessaging = () => {
  const { data: allConversations, isLoading, isError, isSuccess, refetch } = useGetMyAllConversationsQuery();
  const useSearch = useSearchParams();
  const paramsChatId = useSearch.get("chat");
  const socket = useSocket();
  const myDetails = getUserInfo();
  // socket
  const [size, setSize] = useState(10);
  const handleRefreshSize = () => {
    setSize(10);
  };

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
    <section className="max-w-[1200px] my-5   xl:mx-auto md:px-1 lg:px-2 xl:px-5 px-1    2xl:px-0 ">
      {/* section title */}
      <div className="flex  justify-center  ">
        <h1 className="text-xl font-medium">Messages</h1>
      </div>
      {/* conversations */}
      <div className="mt-3">
        <div className="mb-2">
          <h2 className="font-semibold text-2xl">Conversations</h2>
        </div>
        {/* messages */}
        {/* conversation */}
        <div className="grid grid-cols-6 gap-1 lg:gap-2 h-[80vh]  2xl:h-[85vh]">
          <div className="col-span-1 lg:col-span-2 border p-2 rounded-lg rounded-t-lg bg-white shadow-lg custom-scrollbar overflow-y-scroll space-y-2 lg:space-y-1 ">
            {!isLoading &&
              allConversations?.data?.data?.length > 0 &&
              allConversations?.data?.data?.map((singleConversation) => (
                <div key={singleConversation?.conversationId}>
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
                  <span className="md:hidden">N/A</span>
                  <span className="max-md:hidden">No Conversation Found</span>
                </h2>
              </div>
            )}
          </div>
          <div className="col-span-5 lg:col-span-4 ">
            <ConversationMessagingChats setSize={setSize} size={size} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyOwnerMessaging;
