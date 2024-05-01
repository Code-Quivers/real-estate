"use client";

import Image from "next/image";
import moment from "moment";
import { getProfileImageUrl } from "@/utils/conversation.utils";

const ChatBubbleIncoming = ({ message }) => {
  return (
    <div className="w-auto max-w-[80%] ">
      <div className="grid grid-cols-10 items-end gap-2">
        <div className="md:col-span-1 max-md:hidden    ">
          <Image alt="" height={100} width={100} className="rounded-full   object-cover   mt-1" src={getProfileImageUrl(message?.sender)} />
        </div>
        <div className="col-span-10 md:col-span-9">
          <h4 className=" w-fit text-black shadow text-sm font-medium  shadow-black/20 rounded-2xl rounded-bl-none bg-[#e6e7e9] px-4 py-2.5">
            {message?.text}
          </h4>
        </div>
      </div>
      <div className="flex justify-start mt-3 ml-2 md:ml-14">
        <p className="text-xs font-medium">{moment(message?.createdAt).fromNow()}</p>
      </div>
    </div>
  );
};

export default ChatBubbleIncoming;
