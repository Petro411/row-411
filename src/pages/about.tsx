import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Faqs from "@/components/home/Faqs";
import PageHeader from "@/components/PageHeader";
import SiteHeader from "@/components/SiteHeader";
import TextImageColumn from "@/components/TextImageColumn";
import baseApi, { endpoints } from "@/services/api";
import { Flex, Heading, Text } from "@radix-ui/themes";
import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";

type Props = {
  faqs: any[] | [];
};

const AboutUs = ({ faqs }: Props) => {
  return (
    <>
      <Head>
        <title>About Us</title>
      </Head>
      <SiteHeader />
      <PageHeader
        title="About Us"
        description={`Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod error enim amet, dicta et iure similique nesciunt soluta ullam itaqueLorem ipsum dolor, sit amet consectetur adipisicing elit. Quod error enim amet, dicta et iure similique nesciunt soluta ullam itaque?`}
      />
      <Flex direction={"column"} gap={"9"} className="pt-20">
        <TextImageColumn
          title="Our Mission"
          text1="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti sed magni impedit quas eos vero omnis velit sint quam rerum."
          text2="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti sed magni impedit quas eos vero omnis velit sint quam rerum."
        />
        <TextImageColumn
          imageFirst={true}
          title="What we offer"
          text1="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti sed magni impedit quas eos vero omnis velit sint quam rerum."
          text2="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti sed magni impedit quas eos vero omnis velit sint quam rerum."
        />
        <Container className="py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gradientBg p-8 sm:p-16 2xl:p-20 rounded-xl gap-12 2xl:gap-0">
            <div className="flex flex-col gap-8 text-white">
              <Heading size={"8"}>Our vision</Heading>
              <Flex direction={"column"} gap={"4"}>
                <Text size={"3"}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
                  porro, distinctio sapiente doloremque nam deserunt eius ipsum
                  esse labore? Quia quo deleniti, cupiditate vitae distinctio
                  officiis quam adipisci quos repudiandae consequatur pariatur,
                  dolore a labore aliquid aliquam reprehenderit accusantium
                  ullam.
                </Text>
                <Text size={"3"}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                  nostrum omnis libero nobis autem cupiditate tenetur quod
                  ducimus ad natus!
                </Text>
              </Flex>
            </div>
            <div className={`flex flex-row justify-center lg:justify-end`}>
              <Image
                alt=""
                src={"/assets/images/empty-img.jpg"}
                height={450}
                width={450}
              />
            </div>
          </div>
        </Container>

        <Faqs faqs={faqs} />
      </Flex>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps<any> = async () => {
  try {
    const res = await baseApi.get(endpoints.getFaqs);
    return {
      props: {
        faqs: res?.data?.faqs ?? [],
      },
    };
  } catch (error) {
    return {
      props: {
        faqs: [],
      },
    };
  }
};

export default AboutUs;
