"use client";
import { getMsgEndPoint } from "@/configs/envConfig";
import { getUserInfo } from "@/hooks/services/auth.service";
import { useSendMessageMutation } from "@/redux/features/conversations/conversationApi";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoMdSend } from "react-icons/io";
import { IoImages } from "react-icons/io5";
import { Notification, useToaster } from "rsuite";
import { io } from "socket.io-client";

const SendMessageForm = ({ conversationId }) => {
  // form
  const { control, handleSubmit, reset: resetForm } = useForm();
  // api
  const [sendMessage, { data, isLoading, isSuccess, isError, error, reset }] = useSendMessageMutation();

  // ! send message
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

  // !----------------------------
  const userDetails = getUserInfo();
  // socket
  // eslint-disable-next-line no-unused-vars
  const [socketConnected, setSocketConnected] = useState(false);

  const ENDPOINT = getMsgEndPoint();
  let socket;

  //

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userDetails);
    socket.on("connection", () => setSocketConnected(true));

    // after sending message
    if (socket && isSuccess && !isError && !isLoading && data) {
      socket.emit("new message", data);
    }
  }, [isSuccess, isError, isLoading, data]);

  //

  // ! --------------------
  const toaster = useToaster();
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
      reset();
      resetForm({
        text: "",
      });
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
  }, [isSuccess, isError, error, isLoading, data, toaster, reset]);

  return (
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
  );
};

export default SendMessageForm;
