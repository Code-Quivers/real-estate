"use client";

import Image from "next/image";
import moment from "moment";
import { getProfileImageUrl } from "@/utils/conversation.utils";

const ChatBubbleIncoming = ({ message }) => {
  return (
    <div className="w-auto max-w-[80%]">
      <div className="flex items-end gap-2">
        <div className="w-[50px]">
          <div className="relative w-12  h-12">
            <Image alt="" priority height={100} width={100} className="rounded-full mt-1" src={getProfileImageUrl(message?.sender)} />
          </div>
        </div>
        <div className="flex-1 shadow-xl shadow-black/20 rounded-2xl rounded-bl-none bg-white px-4 py-2.5">
          <h4 className="text-black text-sm font-semibold">{message?.text}</h4>
        </div>
      </div>
      <div className="flex justify-start mt-3 ml-14">
        <p className="text-xs font-semibold">{moment(message?.createdAt).fromNow()}</p>
      </div>
    </div>
  );
};

export default ChatBubbleIncoming;
