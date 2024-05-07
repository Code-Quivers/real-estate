"use client";

import { getParticipantName, getProfileImageUrl } from "@/utils/conversation.utils";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { Text } from "rsuite";

const ConversationChatPerson = ({ singleConversation, paramsChatId, participant, conversationId }) => {
  return (
    <Link
      href={{
        query: { chat: conversationId },
      }}
      className={`lg:py-2  lg:px-3 group cursor-pointer  hover:bg-[#f3f4f6]  rounded-md
      ${paramsChatId === conversationId && "bg-[#f3f4f6]"} grid grid-cols-5 justify-between gap-2 items-center`}
    >
      <div className="col-span-5 lg:col-span-4 lg:grid   lg:grid-cols-5 lg:gap-2 items-center">
        <div className="lg:col-span-1">
          <Image
            alt=""
            height={50}
            width={50}
            className="rounded-full object-cover w-[50px] h-[50px] "
            src={getProfileImageUrl(singleConversation?.perticipants[0])}
          />
        </div>
        <div className="space-y-1 max-lg:hidden col-span-4">
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
      <div className="col-span-1 max-lg:hidden ">
        <p className="text-[11px]">{moment(singleConversation?.updatedAt).format("hh:mm A")}</p>
      </div>
    </Link>
  );
};

export default ConversationChatPerson;
