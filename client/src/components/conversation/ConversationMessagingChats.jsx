"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useGetSingleConversationQuery } from "@/redux/features/conversations/conversationApi";
import { getUserInfo } from "@/hooks/services/auth.service";
import SendMessageForm from "@/components/conversation/SendMessageForm";
import { useEffect, useRef } from "react";
import ChatBubbleIncoming from "./ChatBubbleIncoming";
import ChatBubbleOutgoing from "./ChatBubbleOutgoing";
import { getParticipantName, getProfileImageUrl } from "@/utils/conversation.utils";

const ConversationMessagingChats = () => {
  const useSearch = useSearchParams();
  const conversationId = useSearch.get("chat");
  const myDetails = getUserInfo();
  // ! getting data from api
  const {
    data: dataResponse,
    isError,
    isLoading,
    error,
  } = useGetSingleConversationQuery(
    {
      conversationId,
    },
    {
      skip: !conversationId,
    },
  );

  // ! scrolling
  const messagesContainerRef = useRef(null);

  // Function to scroll to the bottom of the messages container
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  // Scroll to bottom on initial render using useEffect
  useEffect(() => {
    scrollToBottom();
  }, [dataResponse]);

  return (
    <div className="flex flex-col h-[80vh]">
      {conversationId && !isError ? (
        <>
          <div className="bg-white shadow-lg px-3  sticky top-0 flex items-center gap-3 my-0.5">
            <div className="">
              <Image alt="" height={50} width={50} className="rounded-full" src={getProfileImageUrl(dataResponse?.data?.perticipants[0])} />
            </div>
            <div>
              <h2>{getParticipantName(dataResponse?.data?.perticipants[0])}</h2>
            </div>
          </div>
          <div className="flex-1 overflow-y-scroll  py-3" ref={messagesContainerRef}>
            <div className="space-y-5 flex flex-col-reverse px-3">
              {dataResponse?.data?.messages?.map((message) => (
                <div
                  key={Math.random()}
                  className={`flex  w-full ${message?.sender?.userId !== myDetails?.userId ? "justify-start" : "justify-end"}`}
                >
                  {message?.sender?.userId !== myDetails?.userId ? (
                    <ChatBubbleIncoming message={message} />
                  ) : (
                    <ChatBubbleOutgoing message={message} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* send message */}
          <div>
            <SendMessageForm conversationId={conversationId} />
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center min-h-[80vh]">
          <h2>No Chat Selected Yet</h2>
        </div>
      )}
    </div>
  );
};

export default ConversationMessagingChats;
