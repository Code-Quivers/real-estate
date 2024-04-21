"use client";

import ConversationMessagingChats from "@/components/conversation/ConversationMessagingChats";
import ConversationChatPerson from "@/components/property-owner/messaging/PropertyOwnerChatPerson";
import { getUserInfo } from "@/hooks/services/auth.service";
import useSocket from "@/hooks/useSocket";
import { useGetMyAllConversationsQuery } from "@/redux/features/conversations/conversationApi";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

const PropertyOwnerMessaging = () => {
  const { data: allConversations, isLoading, isError, isSuccess, refetch } = useGetMyAllConversationsQuery();
  const useSearch = useSearchParams();
  const paramsChatId = useSearch.get("chat");
  const socket = useSocket();
  const myDetails = getUserInfo();
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
    <section className="max-w-[1200px] my-5  xl:mx-auto md:px-3 lg:px-5 px-5    2xl:px-0 ">
      {/* section title */}
      <div className="flex  justify-center">
        <h1 className="text-xl font-medium">Messages</h1>
      </div>
      {/* conversations */}
      <div className="mt-5">
        <div className="mb-2">
          <h2 className="font-semibold text-2xl">Conversations</h2>
        </div>
        {/* messages */}
        <div className="grid grid-cols-6 gap-3 h-[80vh]">
          <div className="col-span-2 border p-2 rounded-lg rounded-t-lg bg-white shadow-lg custom-scrollbar overflow-y-scroll  ">
            {allConversations?.data?.data?.map((singleConversation) => (
              <div key={singleConversation?.conversationId}>
                <ConversationChatPerson
                  singleConversation={singleConversation}
                  paramsChatId={paramsChatId}
                  participant={singleConversation?.perticipants[0]}
                  conversationId={singleConversation?.conversationId}
                />
              </div>
            ))}
          </div>
          <div className="col-span-4 ">
            <ConversationMessagingChats />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyOwnerMessaging;
