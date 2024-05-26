"use client";

import Image from "next/image";
import moment from "moment";
import { getProfileImageUrl } from "@/utils/conversation.utils";

const ChatBubbleIncoming = ({ message }) => {
  return (
    <div className="w-auto my-2 max-w-[80%]  ">
      <div className="grid grid-cols-10 items-end gap-2">
        <div className="lg:col-span-1 max-lg:hidden    ">
          <Image alt="" height={300} width={300} className="rounded-full w-7 h-7 object-cover mt-1" src={getProfileImageUrl(message?.sender)} />
        </div>
        <div className="col-span-10 lg:col-span-9">
          <h4 className=" w-fit text-black shadow text-sm font-medium  shadow-black/20 rounded-2xl rounded-bl-none bg-[#e6e7e9] px-4 py-2.5">
            {message?.text}
          </h4>
        </div>
      </div>
      <div className="flex justify-start mt-2 ml-2 lg:ml-14">
        <p className="text-[10px] font-medium">{moment(message?.createdAt).fromNow()}</p>
      </div>
    </div>
  );
};

export default ChatBubbleIncoming;
