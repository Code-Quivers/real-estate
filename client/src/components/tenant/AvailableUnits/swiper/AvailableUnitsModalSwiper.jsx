"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "./AvailableUnitsModalSwiper.module.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";
import { fileUrlKey } from "@/configs/envConfig";

const AvailableUnitsModalSwiper = ({ unitImage }) => {
  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {unitImage?.images?.map((image, index) => {
        return (
          <SwiperSlide key={index}>
            {console.log("image", image)}
            <Image
              width={1000}
              height={1000}
              className="w-full h-[200px] object-center object-cover"
              src={`${fileUrlKey()}/${image}`}
              alt="Unit Image"
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default AvailableUnitsModalSwiper;
