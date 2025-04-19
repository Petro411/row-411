import React, { memo } from "react";
import Container from "../Container";
import { Flex, Heading, Text } from "@radix-ui/themes";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const settings = {
  className: "center",
  centerMode: true,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        centerPadding: "40px",
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        centerPadding: "20px",
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        centerMode: false,
        centerPadding: "0px",
      },
    },
  ],
};

const Testimonials = () => {
  return (
    <Container className="flex flex-col items-center gap-10 py-14">
      <Flex direction={"column"} gap={"4"} align={"center"}>
        <Heading size={"8"} className="text-center">
          Testimonials
        </Heading>
      </Flex>
      <div className="slider-container w-full">
        <Slider {...settings} className="">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="my-5 flex items-center justify-center my-slide"
            >
              <Flex direction={"column"} gap={"4"}>
                <Flex direction={"row"} align={"center"} gap={"4"}>
                  <Image
                    src={"/assets/images/reviewimg.webp"}
                    alt=""
                    height={60}
                    width={60}
                    className="rounded overflow-hidden"
                  />
                  <Flex direction={"column"} gap={""}>
                    <Heading size={"4"}>User name here</Heading>
                    <Text size={"2"} color="gray">
                      User name here
                    </Text>
                  </Flex>
                </Flex>
                <Text color="gray" size={"3"}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptates, vel facilis! Sit maiores corporis, totam tempora
                  ratione error quae voluptatibus?
                </Text>
              </Flex>
            </div>
          ))}
        </Slider>
      </div>
    </Container>
  );
};

export default memo(Testimonials);
