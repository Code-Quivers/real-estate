"use client";

import Link from "next/link";

const TenantChatPerson = ({ personName, chatId }) => {
  return (
    <div className="">
      <Link
        href={{
          query: { chat: chatId },
        }}
      >
        <h2>{personName}</h2>
      </Link>
    </div>
  );
};

export default TenantChatPerson;
