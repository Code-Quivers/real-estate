"use client";

import { getParticipantName, getProfileImageUrl } from "@/utils/conversation.utils";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { Text } from "rsuite";

const ConversationChatPerson = ({ singleConversation, paramsChatId, participant, conversationId, handleRefreshSize }) => {
  return (
    <Link
      href={{
        query: { chat: conversationId },
      }}
      onClick={handleRefreshSize}
      className={`lg:py-2  lg:px-1.5 group cursor-pointer  hover:bg-[#f3f4f6]  rounded md:rounded-md
      ${paramsChatId === conversationId && "bg-[#e7eaf0] md:bg-[#f3f4f6]"} flex  lg:grid space-y-1 p-1 grid-cols-7 justify-center  items-start `}
    >
      <div className="col-span-6 lg:grid   lg:grid-cols-5 lg:gap-1 xl:gap-2 items-center">
        <div className="lg:col-span-1">
          <Image
            alt=""
            height={100}
            width={100}
            className="rounded-full object-cover lg:!w-[30px] lg:!h-[30px] xl:!w-[50px] xl:!h-[50px] "
            src={getProfileImageUrl(singleConversation?.perticipants[0])}
          />
        </div>
        <div className="space-y-1 max-lg:hidden lg:col-span-4">
          <h2
            className={`font-semibold group-hover:text-[#29429f] text-[15px] ${paramsChatId === conversationId ? "text-[#29429f]" : "text-black"} `}
          >
            {getParticipantName(participant)}
          </h2>
          <Text size="sm" maxLines={1} weight="medium">
            {singleConversation?.lastMessage}
          </Text>
        </div>
      </div>
      {/*  */}
      <div className="col-span-1 max-lg:hidden  ">
        <p className="text-[11px]">{moment(singleConversation?.updatedAt).format("h:mm a")}</p>
      </div>
    </Link>
  );
};

export default ConversationChatPerson;
