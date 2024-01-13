"use client";

import ServiceProviderChatPerson from "@/components/service-provider/messaging/ServiceProviderChatPerson";
import ServiceProviderChats from "@/components/service-provider/messaging/ServiceProviderChats";
import { useSearchParams } from "next/navigation";

const ServiceProviderMessagingPage = () => {
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
          incoming: false,
        },
        {
          id: 2,
          text: "How can I help you?",
          sender: "Property Owner 1",
          timestamp: "2024-01-06T12:35:00",
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
  const useSearch = useSearchParams();
  const paramsChatId = useSearch.get("chat");
  return (
    <section className="max-w-[1050px]    mb-5  xl:mx-auto md:px-3 lg:px-5 px-5    2xl:px-0 ">
      {/* section title */}
      <div className="flex justify-center">
        <h1 className="text-xl font-medium">Messages</h1>
      </div>
      {/* conversations */}
      <div className="mt-5">
        <div className="mb-2">
          <h2 className="font-semibold text-2xl">Conversations</h2>
        </div>
        {/* messages */}
        <div className="grid grid-cols-6 h-[80vh]">
          <div className="col-span-2 border border-black overflow-y-scroll  ">
            {conversations.map((singleConversation, index) => (
              <div
                key={Math.random()}
                className={`py-3 px-3  cursor-pointer hover:bg-[#29429f] hover:text-white
                ${
                  index !== conversations.length - 1 && "border-b border-black "
                }
                ${
                  Number(paramsChatId) === singleConversation.id &&
                  "bg-[#29429f] text-white"
                }
                
                `}
              >
                <ServiceProviderChatPerson
                  personName={singleConversation?.user?.name}
                  chatId={singleConversation?.id}
                />
              </div>
            ))}
          </div>
          <div className="col-span-4 border border-l-0 border-black">
            <ServiceProviderChats />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceProviderMessagingPage;