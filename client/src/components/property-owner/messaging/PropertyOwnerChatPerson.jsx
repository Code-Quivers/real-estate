"use client";

import { getParticipantName } from "@/utils/conversation.utils";
import Link from "next/link";

const ConversationChatPerson = ({ participant, conversationId }) => {
  return (
    <div className="">
      <Link
        href={{
          query: { chat: conversationId },
        }}
      >
        <h2>{getParticipantName(participant)}</h2>
      </Link>
    </div>
  );
};

export default ConversationChatPerson;
