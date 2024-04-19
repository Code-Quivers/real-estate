"use client";

import Image from "next/image";
import { getProfileImageUrl } from "@/utils/conversation.utils";
import moment from "moment";

const ChatBubbleOutgoing = ({ message }) => {
  return (
    <div className="w-auto max-w-[80%]">
      <div className="flex items-end gap-2">
        <div className="w-[90%] shadow-xl shadow-black/10 rounded-2xl rounded-br-none bg-black px-4 py-2.5">
          <h4 className="text-white text-sm">{message?.text}</h4>
        </div>
        <div className="w-[50px]">
          <div className="relative w-12  h-12">
            <Image layout="fill" className="rounded-full mt-1" src={getProfileImageUrl(message?.sender)} />
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-3 mr-14">
        <p className="text-xs font-semibold">{moment(message?.createdAt).fromNow()}</p>
      </div>
    </div>
  );
};

export default ChatBubbleOutgoing;
