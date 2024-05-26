"use client";

import { useStartNewConversationMutation } from "@/redux/features/conversations/conversationApi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSolidMessageRounded } from "react-icons/bi";
import { FaRegMessage } from "react-icons/fa6";
import { FiMessageSquare } from "react-icons/fi";
import { LuMessageCircle } from "react-icons/lu";
import { Button, Input, Notification, Popover, Whisper, useToaster } from "rsuite";

const SendMessagePopOverFromTenant = ({ receiverId }) => {
  const [startNewConversation, { data, isLoading, isSuccess, isError, error }] = useStartNewConversationMutation();
  const [textMessage, setTextMessage] = useState("");

  const handleStartConversation = async () => {
    //
    const messageData = {
      text: textMessage,
    };

    await startNewConversation({
      data: messageData,
      receiverId,
    });
  };

  // !
  const toaster = useToaster();
  const router = useRouter();
  useEffect(() => {
    if (isSuccess && !isError && !isLoading) {
      toaster.push(
        <Notification type="success" header="success" closable>
          <div>
            <p className="text-lg font-semibold mb-2">{data?.message || "Message sent"}</p>
          </div>
        </Notification>,
        {
          placement: "bottomStart",
        },
      );
      router.push(`/tenant/messages?chat=${data?.data?.conversationId}`);
    }
    if (isError && !isSuccess && error && !isLoading) {
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
  }, [isSuccess, isError, error, isLoading, data, toaster]);

  return (
    <div>
      <Whisper
        placement="bottomEnd"
        trigger="click"
        speaker={
          <Popover arrow={true} className="w-60 md:w-[450px] !rounded-md   mb-5">
            <div className="p-1">
              <div>
                <h2>Send Message </h2>
              </div>
              <div>
                <Input
                  onChange={(e) => {
                    setTextMessage(e);
                  }}
                  as="textarea"
                  className="!resize-none"
                  rows={5}
                />
              </div>
              <div className="flex justify-end items-center gap-3 mt-5">
                <Button
                  onClick={handleStartConversation}
                  disabled={!textMessage}
                  type="submit"
                  className="!bg-primary  !text-white !px-3 !py-1 !text-base !rounded-2xl "
                >
                  Send
                </Button>
              </div>
            </div>
          </Popover>
        }
      >
        <button className="bg-indigo-100 border hover:bg-indigo-200 text-sm py-2 px-2 rounded-full shadow-sm p-3">
          <BiSolidMessageRounded size={24} className="text-primary" />
        </button>
      </Whisper>
    </div>
  );
};

export default SendMessagePopOverFromTenant;
