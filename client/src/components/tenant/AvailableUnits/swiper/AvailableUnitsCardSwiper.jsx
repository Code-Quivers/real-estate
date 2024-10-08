"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "./AvailableUnitsCardSwiper.module.css";

import Image from "next/image";
import { fileUrlKey } from "@/configs/envConfig";
const AvailableUnitsCardSwiper = ({ unitImage }) => {
  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {unitImage?.map((image, index) => {
        return (
          <SwiperSlide key={index}>
            <Image
              width={1000}
              height={1000}
              className="w-full h-[200px] object-center object-cover rounded-t-lg"
              src={`${fileUrlKey()}/${image}`}
              alt="Unit Image"
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default AvailableUnitsCardSwiper;
