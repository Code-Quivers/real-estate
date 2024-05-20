"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "./AvailableUnitsModalSwiper.module.css";
// import "swiper/css";
// import "swiper/css/pagination";

import Image from "next/image";
import { fileUrlKey } from "@/configs/envConfig";

const AvailableUnitsModalSwiper = ({ unitImage }) => {
  return (
    <div className="md:hidden">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {unitImage?.images?.map((image, index) => (
          <SwiperSlide key={index}>
            <Image width={1000} height={1000} className="w-full h-[250px] object-cover" src={`${fileUrlKey()}/${image}`} alt="Unit Image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AvailableUnitsModalSwiper;
