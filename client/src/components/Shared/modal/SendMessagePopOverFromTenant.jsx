"use client";

import { useStartNewConversationMutation } from "@/redux/features/conversations/conversationApi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
        placement="autoVertical"
        trigger="click"
        speaker={
          <Popover arrow={true} as="div" className=" w-[450px] !rounded-md overflow-y-auto mb-5">
            <div className="p-5 ">
              <div>
                <h2>Send Message </h2>
              </div>
              <div>
                <Input
                  onChange={(e) => {
                    setTextMessage(e);
                  }}
                  as="textarea"
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
                  Submit
                </Button>
              </div>
            </div>
          </Popover>
        }
      >
        <button className="bg-primary text-white px-2 py-1 w-full">Contact</button>
      </Whisper>
    </div>
  );
};

export default SendMessagePopOverFromTenant;
