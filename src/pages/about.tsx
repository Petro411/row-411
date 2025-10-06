import TextImageColumn from "@/components/TextImageColumn";
import { Flex, Heading, Text } from "@radix-ui/themes";
import OurCompany from "@/components/home/OurCompany";
import baseApi, { endpoints } from "@/services/api";
import SiteHeader from "@/components/SiteHeader";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/Container";
import About from "@/components/home/About";
import Faqs from "@/components/home/Faqs";
import Footer from "@/components/Footer";
import { GetStaticProps } from "next";
import { label } from "@/branding";
import Image from "next/image";
import Head from "next/head";
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
      <PageHeader title="About Us" description={label.AboutUsPageSecOneDes} />
      <Flex direction={"column"} gap={"9"} className="pt-20">
        <About />
        <TextImageColumn
          imageFirst={true}
          title="Our Mission"
          image="/industries/land-3.jpg"
          text1={label.AboutUsPageSecTwoTextOne}
          text2={label.AboutUsPageSecTwoTextTwo}
        />
        <OurCompany />
        <Container className="py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gradientBg p-8 sm:p-16 2xl:p-20 rounded-xl gap-12 2xl:gap-0">
            <div className="flex flex-col gap-8 text-white">
              <Heading size={"8"}>{label.OurVision}</Heading>
              <Flex direction={"column"} gap={"4"}>
                <Text size={"3"}>{label.OurVisionDes}</Text>
              </Flex>
            </div>
            <div className={`flex flex-row justify-center lg:justify-end`}>
              <Image
                alt=""
                src={"/industries/land-6.png"}
                height={450}
                width={450}
                className="rounded-lg overflow-x-hidden"
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
      revalidate: 60,
    };
  } catch (error) {
    return {
      props: {
        faqs: [],
      },
      revalidate: 60,
    };
  }
};

export default AboutUs;
