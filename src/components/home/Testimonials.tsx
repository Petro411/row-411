import React, { memo } from "react";
import Container from "../Container";
import { Flex, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { demoReviews } from "@/config/dummy";
import { StarFilledIcon } from "@radix-ui/react-icons";

const Testimonials = () => {
  return (
    <Container className="flex flex-col items-center gap-10 py-14">
      <Flex direction={"column"} gap={"4"} align={"center"}>
        <Heading size={"8"} className="text-center">
          Testimonials
        </Heading>
      </Flex>
      <Swiper
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        centeredSlides={true}
        modules={[Pagination]}
        breakpoints={{
          400: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 2,
          },
        }}
        className=""
      >
        {demoReviews.map((item, index) => (
          <SwiperSlide key={index} className="px-5 pb-14">
            <div className="border p-10 border-gray-100 shadow-lg rounded-xl min-h-[38vh] gap-8 flex flex-col">
              <Flex direction={"column"} gap={"4"}>
                <Text color="gray" size={"4"}>
                  {item.review}
                </Text>
                <Flex
                  direction={"row"}
                  align={"center"}
                  justify={"center"}
                  gap={"1"}
                >
                  {Array.from({ length: item.rating }).map((_, id) => (
                    <StarFilledIcon
                      key={id}
                      className="text-yellow-400"
                      height={18}
                      width={18}
                    />
                  ))}
                </Flex>
              </Flex>

              <Flex direction={"column"} gap={"3"}>
                <div className="h-20 w-20 rounded-xl overflow-hidden mx-auto">
                  <Image
                    alt=""
                    src={"/assets/images/reviewimg.webp"}
                    className="w-full h-full object-cover"
                    width={100}
                    height={100}
                  />
                </div>
                <Heading size={"4"}>{item.name}</Heading>
              </Flex>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default memo(Testimonials);
