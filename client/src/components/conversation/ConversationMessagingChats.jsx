"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useGetSingleConversationQuery, useSendMessageMutation } from "@/redux/features/conversations/conversationApi";
import { getUserInfo } from "@/hooks/services/auth.service";
import { useCallback, useEffect, useRef, useState } from "react";
import ChatBubbleIncoming from "./ChatBubbleIncoming";
import ChatBubbleOutgoing from "./ChatBubbleOutgoing";
import { getParticipantName, getProfileImageUrl } from "@/utils/conversation.utils";
import { io } from "socket.io-client";
import { Notification, useToaster } from "rsuite";
import { Controller, useForm } from "react-hook-form";
import { IoMdSend } from "react-icons/io";
import { IoImages } from "react-icons/io5";

const ConversationMessagingChats = () => {
  const toaster = useToaster();
  const useSearch = useSearchParams();
  const conversationId = useSearch.get("chat");
  const myDetails = getUserInfo();
  // form
  const { control, handleSubmit, reset: resetForm } = useForm();

  // ! getting data from api
  const {
    data: dataResponse,
    isError,
    isLoading,
    isSuccess,
    error,
    refetch,
  } = useGetSingleConversationQuery(
    {
      conversationId,
    },
    {
      skip: !conversationId,
    },
  );

  // !

  // socket
  const [socketConnected, setSocketConnected] = useState(false);

  const ENDPOINT = "http://localhost:4000";
  let socket;

  //

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", myDetails);
    socket.on("connection", () => setSocketConnected(true));

    if (dataResponse && !isLoading && !isError && isSuccess && conversationId && myDetails) {
      socket.emit("join chat", { conversationId, userId: myDetails?.userId });
    }
  }, [isLoading, isError, isSuccess, conversationId, dataResponse, myDetails]);

  //
  // Memoize the event listener function using useCallback
  const handleMessageReceived = useCallback(
    (newMessageReceived) => {
      if (conversationId !== newMessageReceived?.data?.conversationId) {
        // give notification
      } else if (isLoading || isSuccess) {
        console.log("Shafin");
        refetch(); // Only refetch if the query has been started
      }
    },
    [isLoading, isSuccess, conversationId, refetch],
  );

  useEffect(() => {
    socket.on("message received", handleMessageReceived);

    // Cleanup function to remove the event listener
    return () => {
      socket.off("message received", handleMessageReceived);
    };
  }, [socket, handleMessageReceived]);

  // ! send message ---------------------

  // api
  const [
    sendMessage,
    { data: sendMessageData, isLoading: isLoadingSend, isSuccess: isSuccessSend, isError: isErrorSend, error: errorSend, reset: sendReset },
  ] = useSendMessageMutation();

  const handleMessageSubmit = async (updatedData) => {
    // creating form data
    const { files, ...restData } = updatedData;
    const formData = new FormData();

    // // Handle files
    files?.forEach((file) => {
      formData.append("files", file.blobFile);
    });

    // Prepare data object

    if (restData) {
      formData.append("data", JSON.stringify(restData));
    }

    await sendMessage({
      conversationId,
      data: formData,
    });
  };
  //  -------------------- after send

  useEffect(() => {
    if (isSuccessSend && !isErrorSend && !isLoadingSend) {
      toaster.push(
        <Notification type="success" header="success" closable>
          <div>
            <p className="text-lg font-semibold mb-2">{sendMessageData?.message || "Message sent"}</p>
          </div>
        </Notification>,
        {
          placement: "bottomStart",
        },
      );

      if (socket && !isLoading && sendMessageData) {
        socket.emit("new message", sendMessageData);
      }
      sendReset();
      resetForm({
        text: "",
      });
    }
    if (isErrorSend && !isSuccessSend && errorSend && !isLoadingSend) {
      toaster.push(
        <Notification type="error" header="error" closable>
          <div>
            <p className="text-lg font-semibold mb-2">{error?.message || "Failed to Sent"}</p>
          </div>
        </Notification>,
        {
          placement: "bottomStart",
        },
      );
    }
  }, [isErrorSend, isSuccessSend, errorSend, isLoadingSend, sendReset, resetForm]);

  // ! scrolling -------------------------------------------------------------
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
            <form onSubmit={handleSubmit(handleMessageSubmit)}>
              <div className=" w-full border-t pt-2  items-end  grid grid-cols-10 pl-3">
                <div className="col-span-9">
                  <Controller
                    name="text"
                    control={control}
                    rules={{
                      min: {
                        value: 0,
                        message: "Num of Bed must be greater than 0",
                      },
                    }}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper ">
                        <div className="relative">
                          <div className="absolute top-4 left-3">
                            <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>
                          </div>
                          <textarea
                            style={{
                              resize: "none",
                            }}
                            rows={4}
                            className="w-full p-2 bg-black/5 rounded-2xl focus:outline-none"
                            {...field}
                            size="lg"
                            placeholder="Write Message...."
                          />
                        </div>
                      </div>
                    )}
                  />
                </div>
                <div className="col-span-1 flex flex-col gap-5 justify-between items-center">
                  <div className="">
                    <button type="button" size="lg" className="">
                      <IoImages size={30} />
                    </button>
                  </div>
                  <div className="">
                    <button loading={isLoading} type="submit" size="lg" className="">
                      <IoMdSend size={30} />
                    </button>
                  </div>
                </div>
              </div>
            </form>
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
