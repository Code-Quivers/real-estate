"use client";

import { useStartNewConversationMutation } from "@/redux/features/conversations/conversationApi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Input, Notification, Popover, Whisper, useToaster } from "rsuite";

const SendMessagePopOverFromPropertyOwner = ({ receiverId }) => {
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
      router.push(`/property-owner/messages?chat=${data?.data?.conversationId}`);
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
        preventOverflow
        placement="autoVerticalEnd"
        trigger="click"
        speaker={
          <Popover arrow={true} as="div" className="w-[350px] max-h-[400px] !rounded-md  mb-5">
            <div className="p-5 ">
              <div>
                <h2>Send Message </h2>
              </div>
              <div>
                <Input
                  className="!resize-none"
                  onChange={(e) => {
                    setTextMessage(e);
                  }}
                  as="textarea"
                  rows={4}
                />
              </div>
              <div className="flex justify-end items-center gap-3 mt-3">
                <Button
                  onClick={handleStartConversation}
                  disabled={!textMessage}
                  type="submit"
                  className="!bg-primary  !text-white !px-3 !py-1 !text-base !rounded-2xl "
                >
                  Submit
                </Button>
              </div>
            </div>
          </Popover>
        }
      >
        <button className="text-primary w-full text-sm py-1.5 px-3 font-semibold rounded-md bg-[#E8F0FE] hover:bg-[#d4e3f0]">Contact</button>
      </Whisper>
    </div>
  );
};

export default SendMessagePopOverFromPropertyOwner;
