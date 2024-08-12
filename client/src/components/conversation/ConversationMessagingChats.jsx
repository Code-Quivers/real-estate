"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useGetMessagesQuery, useSendMessageMutation } from "@/redux/features/conversations/conversationApi";
import { getUserInfo } from "@/hooks/services/auth.service";
import { useCallback, useEffect, useRef, useState } from "react";
import ChatBubbleIncoming from "./ChatBubbleIncoming";
import ChatBubbleOutgoing from "./ChatBubbleOutgoing";
import { getParticipantName, getParticipantRole, getProfileImageUrl } from "@/utils/conversation.utils";
import { useToaster } from "rsuite";
import { Controller, useForm } from "react-hook-form";
import { IoMdSend } from "react-icons/io";
import useSocket from "../../hooks/useSocket";
import { SendMessageErrorMessage } from "../toasts/notifications/ToastNotificationMessages";
import moment from "moment";
import { GrRefresh } from "react-icons/gr";

const ConversationMessagingChats = ({ size, setSize }) => {
  const toaster = useToaster();
  const useSearch = useSearchParams();
  const conversationId = useSearch.get("chat");
  const myDetails = getUserInfo();
  const socket = useSocket();

  // ! getting data from api

  const query = {};
  const [page, setPage] = useState(1);
  const messagesContainerRef = useRef(null);
  const [shouldScroll, setShouldScroll] = useState(true);

  //
  query["limit"] = size;
  query["page"] = page;

  const {
    data: dataResponse,
    isError,
    isLoading,
    isSuccess,
    error,
    refetch,
    isFetching,
  } = useGetMessagesQuery({ conversationId, ...query }, { skip: !conversationId });

  // ! socket---------------------
  // join chat
  useEffect(() => {
    if (dataResponse && !isError && myDetails && socket && conversationId && myDetails) {
      socket.emit("join chat", { conversationId, userId: myDetails?.userId });
    }
  }, [isLoading, isError, isSuccess, conversationId, dataResponse, myDetails]);

  // Memoize the event listener function using useCallback
  const handleMessageReceived = useCallback(
    (newMessageReceived) => {
      if (conversationId !== newMessageReceived?.data?.conversationId) {
        // give notification
      } else if (isLoading || isSuccess) {
        refetch(); // Only refetch if the query has been started
      }
    },
    [isLoading, isSuccess, conversationId, refetch],
  );
  //
  useEffect(() => {
    if (socket) {
      socket.on("message received", handleMessageReceived);

      // Cleanup function to remove the event listener
      return () => {
        socket.off("message received", handleMessageReceived);
      };
    }
  }, [socket, handleMessageReceived]);

  // ! send message ---------------------

  // form
  const {
    control,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm();

  // api
  const [
    sendMessage,
    { data: sendMessageData, isLoading: isLoadingSend, isSuccess: isSuccessSend, isError: isErrorSend, error: errorSend, reset: sendReset },
  ] = useSendMessageMutation();
  // submit
  const handleMessageSubmit = async (updatedData) => {
    // creating form data
    const { files, ...restData } = updatedData;
    const formData = new FormData();

    // Handle files
    files?.forEach((file) => {
      formData.append("files", file.blobFile);
    });

    // Prepare data object
    if (restData) {
      formData.append("data", JSON.stringify(restData));
    }

    // Send message
    await sendMessage({
      conversationId,
      data: formData,
    });

    // Reset typing state
    sendReset();
    resetForm({
      text: "",
    });
    setShouldScroll(true);
  };

  // ! -------------------- after send
  useEffect(() => {
    if (isSuccessSend && !isErrorSend && !isLoadingSend) {
      if (socket && !isLoading && sendMessageData) {
        socket.emit("new message", sendMessageData);
      }
      sendReset();
      resetForm({
        text: "",
      });
    }
    if (isErrorSend && !isSuccessSend && errorSend && !isLoadingSend) {
      toaster.push(SendMessageErrorMessage(error), {
        placement: "bottomStart",
      });
    }
  }, [isErrorSend, isSuccessSend, errorSend, isLoadingSend, sendReset, resetForm]);

  // ! scrolling -------------------------------------------------------------

  // Function to scroll to the bottom of the messages container
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  // Scroll to bottom
  useEffect(() => {
    if (!isLoading && shouldScroll) {
      scrollToBottom();
      setShouldScroll(false);
    }

    if (!isLoading && isSuccess && shouldScroll) {
      scrollToBottom();
      setShouldScroll(false);
    }
  }, [isLoading, isSuccess, shouldScroll, setShouldScroll]);

  return (
    <div className="flex flex-col h-[80vh]  2xl:h-[85vh] border  rounded-lg  bg-white shadow-md">
      {conversationId && !isError ? (
        <>
          <div className="  py-2  border-b px-3  sticky top-0 flex justify-between items-center   ">
            <div className="flex items-center gap-3">
              <div className="">
                <Image
                  alt=""
                  height={300}
                  width={300}
                  className="rounded-full h-7 w-7"
                  src={getProfileImageUrl(dataResponse?.data?.perticipants[0])}
                />
              </div>
              <div>
                <h2 className="line-clamp-1 text-xs md:text-base">{getParticipantName(dataResponse?.data?.perticipants[0])}</h2>
                <p className="text-[10px] font-medium">{getParticipantRole(dataResponse?.data?.perticipants[0])}</p>
              </div>
            </div>
            <div>
              <button onClick={() => refetch()} disabled={isFetching} className="hover:bg-primary p-1 rounded-full hover:text-white duration-300">
                <GrRefresh size={25} className={`${isFetching && "animate-spin"}`} />
              </button>
            </div>
          </div>
          {/* messages */}
          <div className="flex-1 m-1 overflow-y-scroll custom-scrollbar py-3  rounded-md bg-[#02020200]" ref={messagesContainerRef}>
            {dataResponse?.meta?.total > size ? (
              <div className="flex justify-center mb-2">
                {isFetching ? (
                  "Loading.."
                ) : (
                  <button type="button" onClick={() => setSize((prevSize) => prevSize + 10)} className="bg-slate-600 rounded-full px-2 text-white">
                    See Previous Messages
                  </button>
                )}
              </div>
            ) : (
              <div className="flex justify-center">
                <div>
                  <div className="flex justify-center">
                    <Image
                      width={500}
                      height={500}
                      className="w-24 h-24 object-cover rounded-full"
                      src={getProfileImageUrl(dataResponse?.data?.perticipants[0])}
                    />
                  </div>
                  <div>
                    <div className="text-center mb-3 mt-1">
                      <h2 className="text-lg font-medium">{getParticipantName(dataResponse?.data?.perticipants[0])}</h2>
                      <p className="text-sm font-medium">{getParticipantRole(dataResponse?.data?.perticipants[0])}</p>
                      <p className="text-xs mt-1">Conversation Started on {moment(dataResponse?.data?.createdAt).format("lll")}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3 xl:space-y-4 2xl:space-y-5 flex duration-300 transition-all flex-col-reverse px-3">
              {dataResponse?.data?.messages?.map((message) => (
                <div
                  key={Math.random()}
                  className={`flex  w-full   ${message?.sender?.userId !== myDetails?.userId ? "justify-start" : "justify-end"}`}
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
              <div className="w-full border-t py-2  items-end  grid grid-cols-10 pl-3">
                <div className="col-span-9">
                  <Controller
                    name="text"
                    control={control}
                    rules={{
                      required: "Message is Required",
                    }}
                    render={({ field }) => (
                      <input
                        type="text"
                        className="w-full p-3 bg-black/5 rounded-2xl focus:outline-none"
                        {...field}
                        size="lg"
                        placeholder="Write Message...."
                        autoComplete="off"
                      />
                    )}
                  />
                </div>
                <div className="col-span-1 flex flex-col gap-5 justify-between items-center">
                  <div className="">
                    <button disabled={errors?.text} loading={isLoading} type="submit" size="lg" className="">
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
