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
      <PageHeader
        title="About Us"
        description={`Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod error enim amet, dicta et iure similique nesciunt soluta ullam itaqueLorem ipsum dolor, sit amet consectetur adipisicing elit. Quod error enim amet, dicta et iure similique nesciunt soluta ullam itaque?`}
      />
      <Flex direction={"column"} gap={"9"} className="pt-20">
        <About />
        <TextImageColumn
          imageFirst={true}
          title="Our Mission"
          image="/industries/land-3.jpg"
          text1="Unlike all the people search sources mentioned, Petro411 will be County specific and based
on government tax listings, which will align the phone contact numbers with data sources
currently being utilized by oil and gas land and title professionals throughout the United
States. Therefore, the data sources within Petro411 will coincide with existing land practices
utilized to assess the feasibility of oil and gas land-based projects."
          text2="Petro411.com provides individual mineral owner searches and Mineral Owner Listings with
Phone Numbers and Emails throughout the United States, appends phone numbers to
existing lists provided by the client, prepares customized orders based on how it’s requested
from the client, phone number verification, cell phone numbers and landline phone
numbers."
        />
                <OurCompany />
        <Container className="py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gradientBg p-8 sm:p-16 2xl:p-20 rounded-xl gap-12 2xl:gap-0">
            <div className="flex flex-col gap-8 text-white">
              <Heading size={"8"}>Our vision</Heading>
              <Flex direction={"column"} gap={"4"}>
                <Text size={"3"}>
                 Petro411.com intends to become the primary data source for oil and gas land professionals to
contact mineral owners.
                </Text>
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
