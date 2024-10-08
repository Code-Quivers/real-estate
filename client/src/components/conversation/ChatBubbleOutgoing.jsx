"use client";

import Image from "next/image";
import { getProfileImageUrl } from "@/utils/conversation.utils";
import moment from "moment";

const ChatBubbleOutgoing = ({ message }) => {
  return (
    <div className="w-auto my-2 max-w-[80%]">
      <div className="grid grid-cols-10 items-end gap-2">
        <div className="col-span-10 lg:col-span-9 flex justify-end ">
          <h4 className="text-white shadow shadow-black/10 rounded-xl md:rounded-2xl rounded-br-none bg-[#2941a0] px-2 py-1.5 md:px-4 md:py-2.5 w-fit text-sm font-medium text-balance">
            {message?.text}
          </h4>
        </div>
        {/* image */}
        <div className="lg:col-span-1 max-lg:hidden">
          <Image alt="" height={300} width={300} className="rounded-full object-cover w-7 h-7 mt-1" src={getProfileImageUrl(message?.sender)} />
        </div>
      </div>
      <div className="flex  justify-end mt-2 lg:mt-1.5 mr-1 lg:mr-14">
        <p className="text-[10px] font-medium">{moment(message?.createdAt).fromNow()}</p>
      </div>
    </div>
  );
};

export default ChatBubbleOutgoing;
