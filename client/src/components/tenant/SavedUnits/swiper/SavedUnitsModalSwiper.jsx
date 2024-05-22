"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "./SavedUnitsModalSwiper.module.css";
import Image from "next/image";
import { fileUrlKey } from "@/configs/envConfig";

const SavedUnitsModalSwiper = ({ propertyImages }) => {
  return (
    <div className="md:hidden">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {propertyImages?.map((image, index) => (
          <SwiperSlide key={index}>
            <Image width={1000} height={1000} className="w-full h-[250px] object-cover" src={`${fileUrlKey()}/${image}`} alt="Unit Image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SavedUnitsModalSwiper;
