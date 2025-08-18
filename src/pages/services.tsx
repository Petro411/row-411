import WhatDrives from "@/components/services/WhatDrives";
import Testimonials from "@/components/home/Testimonials";
import WithPetro from "@/components/services/WithPetro";
import baseApi, { endpoints } from "@/services/api";
import SiteHeader from "@/components/SiteHeader";
import PageHeader from "@/components/PageHeader";
import NewsLetter from "@/components/NewsLetter";
import Container from "@/components/Container";
import Card from "@/components/services/Card";
import { serviceCards } from "@/config/dummy";
import Faqs from "@/components/home/Faqs";
import Footer from "@/components/Footer";
import { Flex } from "@radix-ui/themes";
import { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";


type Props = {
  faqs: any[] | [];
  locations: any[] | [];
};

const Services = ({ faqs, locations }: Props) => {
  return (
    <>
      <Head>
        <title>Services</title>
      </Head>
      <SiteHeader />
      <PageHeader
        title="Services"
        description={`At Petro411, we provide reliable access to comprehensive mineral ownership data across the United States. From detailed property records to ownership information, our platform is designed to help investors, landmen, and energy professionals make informed decisions. With easy search tools, subscription-based downloads, and state-by-state insights, Petro411 delivers the data you need—when you need it.`}
      />
      <Flex direction={"column"} gap={"9"}>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-20">
            {serviceCards.map((item, index) => (
              <Card key={index} {...item} />
            ))}
          </div>
        </Container>
        <WithPetro locations={locations} />
        <WhatDrives />
        <Testimonials />
        <NewsLetter />
        <Faqs faqs={faqs} />
      </Flex>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps<any> = async () => {
  try {
    const res = await baseApi.get(endpoints.getFaqs);
    const locsQuery = await baseApi.get(endpoints.getLocations);
    return {
      props: {
        faqs: res?.data?.faqs ?? [],
        locations: locsQuery?.data?.locations ?? [],
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      props: {
        faqs: [],
        locations: [],
      },
      revalidate: 60,
    };
  }
};
export default Services;
