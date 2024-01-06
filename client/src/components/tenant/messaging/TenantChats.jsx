"use client";
const conversations = [
  {
    id: 1,
    user: {
      name: "Property Owner 1",
    },
    messages: [
      {
        id: 1,
        text: "Hi there!",
        sender: "Property Owner 1",
        timestamp: "2024-01-06T12:30:00",
        incoming: true,
      },
      {
        id: 2,
        text: "How can I help you? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo aut voluptatem odio excepturi officia numquam et enim ipsum neque. Nisi odio debitis cupiditate libero quos unde laborum, in illo doloremque.",
        sender: "Property Owner 1",
        timestamp: "2024-01-06T12:35:00",
        incoming: false,
      },
      {
        id: 3,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo doloremque ullam dolorum odio odit soluta quas tempore pariatur ut facilis.",
        sender: "Property Owner 1",
        timestamp: "2024-01-06T12:30:00",
        incoming: true,
      },
      {
        id: 3,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo doloremque ullam dolorum odio odit soluta quas tempore pariatur ut facilis.",
        sender: "Property Owner 1",
        timestamp: "2024-01-06T12:30:00",
        incoming: false,
      },
    ],
  },
  {
    id: 2,
    user: {
      name: "Property Owner 2",
    },
    messages: [
      {
        id: 3,
        text: "Hello!",
        sender: "You",
        timestamp: "2024-01-06T13:00:00",
        incoming: true,
      },
      {
        id: 4,
        text: "I'm interested in your property.",
        sender: "You",
        timestamp: "2024-01-06T13:05:00",
        incoming: true,
      },
    ],
  },
  {
    id: 3,
    user: {
      name: "Property Owner 3",
    },
    messages: [
      {
        id: 5,
        text: "You're welcome!",
        sender: "Property Owner 3",
        timestamp: "2024-01-06T14:00:00",
        incoming: false,
      },
      {
        id: 6,
        text: "If you have any more questions, feel free to ask.",
        sender: "Property Owner 3",
        timestamp: "2024-01-06T14:05:00",
        incoming: false,
      },
      {
        id: 6,
        text: "Please ",
        sender: "Property Owner 3",
        timestamp: "2024-01-06T14:05:00",
        incoming: false,
      },
    ],
  },
  {
    id: 4,
    user: {
      name: "Service Provider",
    },
    messages: [
      {
        id: 6,
        text: "You're welcome!",
        sender: "Property Owner 3",
        timestamp: "2024-01-06T14:00:00",
        incoming: false,
      },
      {
        id: 7,
        text: "If you have any more questions, feel free to ask.",
        sender: "Property Owner 3",
        timestamp: "2024-01-06T14:05:00",
        incoming: false,
      },
    ],
  },
  {
    id: 4,
    user: {
      name: "Service Provider",
    },
    messages: [
      {
        id: 6,
        text: "You're welcome!",
        sender: "Property Owner 3",
        timestamp: "2024-01-06T14:00:00",
        incoming: false,
      },
      {
        id: 7,
        text: "If you have any more questions, feel free to ask.",
        sender: "Property Owner 3",
        timestamp: "2024-01-06T14:05:00",
        incoming: false,
      },
    ],
  },
  {
    id: 4,
    user: {
      name: "Service Provider",
    },
    messages: [
      {
        id: 6,
        text: "You're welcome!",
        sender: "Property Owner 3",
        timestamp: "2024-01-06T14:00:00",
        incoming: false,
      },
      {
        id: 7,
        text: "If you have any more questions, feel free to ask.",
        sender: "Property Owner 3",
        timestamp: "2024-01-06T14:05:00",
        incoming: false,
      },
    ],
  },
  {
    id: 4,
    user: {
      name: "Service Provider",
    },
    messages: [
      {
        id: 6,
        text: "You're welcome!",
        sender: "Property Owner 3",
        timestamp: "2024-01-06T14:00:00",
        incoming: false,
      },
      {
        id: 7,
        text: "If you have any more questions, feel free to ask.",
        sender: "Property Owner 3",
        timestamp: "2024-01-06T14:05:00",
        incoming: false,
      },
    ],
  },
  {
    id: 4,
    user: {
      name: "Service Provider",
    },
    messages: [
      {
        id: 6,
        text: "You're welcome!",
        sender: "Property Owner 3",
        timestamp: "2024-01-06T14:00:00",
        incoming: false,
      },
      {
        id: 7,
        text: "If you have any more questions, feel free to ask.",
        sender: "Property Owner 3",
        timestamp: "2024-01-06T14:05:00",
        incoming: false,
      },
    ],
  },
  {
    id: 4,
    user: {
      name: "Service Provider",
    },
    messages: [
      {
        id: 6,
        text: "You're welcome!",
        sender: "Property Owner 3",
        timestamp: "2024-01-06T14:00:00",
        incoming: false,
      },
      {
        id: 7,
        text: "If you have any more questions, feel free to ask.",
        sender: "Property Owner 3",
        timestamp: "2024-01-06T14:05:00",
        incoming: false,
      },
    ],
  },
  {
    id: 4,
    user: {
      name: "Service Provider",
    },
    messages: [
      {
        id: 6,
        text: "You're welcome!",
        sender: "Property Owner 3",
        timestamp: "2024-01-06T14:00:00",
        incoming: false,
      },
      {
        id: 7,
        text: "If you have any more questions, feel free to ask.",
        sender: "Property Owner 3",
        timestamp: "2024-01-06T14:05:00",
        incoming: false,
      },
    ],
  },
  {
    id: 4,
    user: {
      name: "Service Provider",
    },
    messages: [
      {
        id: 6,
        text: "You're welcome!",
        sender: "Property Owner 3",
        timestamp: "2024-01-06T14:00:00",
        incoming: false,
      },
      {
        id: 7,
        text: "If you have any more questions, feel free to ask.",
        sender: "Property Owner 3",
        timestamp: "2024-01-06T14:05:00",
        incoming: false,
      },
    ],
  },
  {
    id: 4,
    user: {
      name: "Service Provider",
    },
    messages: [
      {
        id: 6,
        text: "You're welcome!",
        sender: "Property Owner 3",
        timestamp: "2024-01-06T14:00:00",
        incoming: false,
      },
      {
        id: 7,
        text: "If you have any more questions, feel free to ask.",
        sender: "Property Owner 3",
        timestamp: "2024-01-06T14:05:00",
        incoming: false,
      },
    ],
  },
  {
    id: 4,
    user: {
      name: "Service Provider",
    },
    messages: [
      {
        id: 6,
        text: "You're welcome!",
        sender: "Property Owner 3",
        timestamp: "2024-01-06T14:00:00",
        incoming: false,
      },
      {
        id: 7,
        text: "If you have any more questions, feel free to ask.",
        sender: "Property Owner 3",
        timestamp: "2024-01-06T14:05:00",
        incoming: false,
      },
    ],
  },
  {
    id: 4,
    user: {
      name: "Service Provider",
    },
    messages: [
      {
        id: 6,
        text: "You're welcome!",
        sender: "Property Owner 3",
        timestamp: "2024-01-06T14:00:00",
        incoming: false,
      },
      {
        id: 7,
        text: "If you have any more questions, feel free to ask.",
        sender: "Property Owner 3",
        timestamp: "2024-01-06T14:05:00",
        incoming: false,
      },
    ],
  },
  {
    id: 4,
    user: {
      name: "Service Provider",
    },
    messages: [
      {
        id: 6,
        text: "You're welcome!",
        sender: "Property Owner 3",
        timestamp: "2024-01-06T14:00:00",
        incoming: false,
      },
      {
        id: 7,
        text: "If you have any more questions, feel free to ask.",
        sender: "Property Owner 3",
        timestamp: "2024-01-06T14:05:00",
        incoming: false,
      },
    ],
  },
  {
    id: 4,
    user: {
      name: "Service Provider",
    },
    messages: [
      {
        id: 6,
        text: "You're welcome!",
        sender: "Property Owner 3",
        timestamp: "2024-01-06T14:00:00",
        incoming: false,
      },
      {
        id: 7,
        text: "If you have any more questions, feel free to ask.",
        sender: "Property Owner 3",
        timestamp: "2024-01-06T14:05:00",
        incoming: false,
      },
    ],
  },
  {
    id: 4,
    user: {
      name: "Service Provider",
    },
    messages: [
      {
        id: 6,
        text: "You're welcome!",
        sender: "Property Owner 3",
        timestamp: "2024-01-06T14:00:00",
        incoming: false,
      },
      {
        id: 7,
        text: "If you have any more questions, feel free to ask.",
        sender: "Property Owner 3",
        timestamp: "2024-01-06T14:05:00",
        incoming: false,
      },
    ],
  },
  {
    id: 4,
    user: {
      name: "Service Provider",
    },
    messages: [
      {
        id: 6,
        text: "You're welcome!",
        sender: "Property Owner 3",
        timestamp: "2024-01-06T14:00:00",
        incoming: false,
      },
      {
        id: 7,
        text: "If you have any more questions, feel free to ask.",
        sender: "Property Owner 3",
        timestamp: "2024-01-06T14:05:00",
        incoming: false,
      },
    ],
  },
  {
    id: 4,
    user: {
      name: "Service Provider",
    },
    messages: [
      {
        id: 6,
        text: "You're welcome!",
        sender: "Property Owner 3",
        timestamp: "2024-01-06T14:00:00",
        incoming: false,
      },
      {
        id: 7,
        text: "If you have any more questions, feel free to ask.",
        sender: "Property Owner 3",
        timestamp: "2024-01-06T14:05:00",
        incoming: false,
      },
    ],
  },
  {
    id: 4,
    user: {
      name: "Service Provider",
    },
    messages: [
      {
        id: 6,
        text: "You're welcome!",
        sender: "Property Owner 3",
        timestamp: "2024-01-06T14:00:00",
        incoming: false,
      },
      {
        id: 7,
        text: "If you have any more questions, feel free to ask.",
        sender: "Property Owner 3",
        timestamp: "2024-01-06T14:05:00",
        incoming: false,
      },
    ],
  },
  {
    id: 4,
    user: {
      name: "Service Provider",
    },
    messages: [
      {
        id: 6,
        text: "You're welcome!",
        sender: "Property Owner 3",
        timestamp: "2024-01-06T14:00:00",
        incoming: false,
      },
      {
        id: 7,
        text: "If you have any more questions, feel free to ask.",
        sender: "Property Owner 3",
        timestamp: "2024-01-06T14:05:00",
        incoming: false,
      },
    ],
  },
  // Add more conversation objects with messages as needed
];
import { useSearchParams } from "next/navigation";
import TenantChatBubbleOutgoing from "./TenantChatBubbleOutgoing";
import TenantChatBubbleIncoming from "./TenantChatBubbleIncoming";
import { Button, Input, InputGroup } from "rsuite";
import SendIcon from "@rsuite/icons/Send";
import Image from "next/image";
import { useGetTenantMyProfileQuery } from "@/redux/features/tenant/tenantsApi";
import { fileUrlKey } from "@/configs/envConfig";
import profileLogo from "@/assets/propertyOwner/profilePic.png";

const TenantChats = () => {
  const useSearch = useSearchParams();
  const chatId = useSearch.get("chat");
  const chatObj = conversations.find(
    (conversation) => conversation.id === parseInt(chatId),
  );
  const {
    data: dataResponse,
    isError,
    isLoading,
    error,
  } = useGetTenantMyProfileQuery();

  const { data } = dataResponse || {};
  return (
    <div className="flex flex-col h-[80vh]">
      <div className="bg-white shadow-lg px-3  sticky top-0 flex items-center gap-3 my-0.5">
        <div className="">
          <Image
            height={50}
            width={50}
            className="rounded-full"
            src={
              data?.profileImage
                ? `${fileUrlKey()}/${data?.profileImage}`
                : profileLogo
            }
          />
        </div>
        <div>
          <h2 className=" font-medium ">{chatObj?.user?.name ?? "--"}</h2>
        </div>
      </div>
      <div className="flex-1 overflow-y-scroll  pt-3">
        <div className="space-y-5 px-3">
          {chatObj?.messages?.map((message) => (
            <div
              key={Math.random()}
              className={`flex w-full ${
                message?.incoming === true ? "justify-start" : "justify-end"
              }`}
            >
              {message?.incoming === true ? (
                <TenantChatBubbleIncoming message={message} />
              ) : (
                <TenantChatBubbleOutgoing message={message} />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-6  sticky bottom-0  px-2 bg-black/20 py-2 shadow-xl gap-2 ">
        <div className="col-span-5">
          <Input
            size="lg"
            placeholder="Write Message...."
            className="bg-black"
          />
        </div>
        <div className="col-span-1">
          <Button size="lg" block className="w-full flex gap-2">
            <SendIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TenantChats;
