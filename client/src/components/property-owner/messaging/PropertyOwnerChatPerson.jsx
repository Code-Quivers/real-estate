"use client";

import Link from "next/link";

const PropertyOwnerChatPerson = ({ personName, chatId }) => {
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

export default PropertyOwnerChatPerson;