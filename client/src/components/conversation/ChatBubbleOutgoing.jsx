"use client";

import Image from "next/image";
import { getProfileImageUrl } from "@/utils/conversation.utils";
import moment from "moment";

const ChatBubbleOutgoing = ({ message }) => {
  return (
    <div className="w-auto my-1 max-w-[80%]">
      <div className="grid grid-cols-10 items-end gap-2">
        <div className="col-span-9 flex justify-end ">
          <h4 className="text-white shadow shadow-black/10 rounded-2xl rounded-br-none bg-[#2941a0] px-4 py-2.5 w-fit text-sm font-medium">
            {message?.text}
          </h4>
        </div>
        {/* image */}
        <div className="col-span-1">
          <Image
            alt=""
            height={100}
            width={100}
            className="rounded-full object-cover h-[50px] w-[50px]   mt-1"
            src={getProfileImageUrl(message?.sender)}
          />
        </div>
      </div>
      <div className="flex justify-end mt-3 mr-14">
        <p className="text-xs font-medium">{moment(message?.createdAt).fromNow()}</p>
      </div>
    </div>
  );
};

export default ChatBubbleOutgoing;
