import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Faqs from "@/components/home/Faqs";
import Testimonials from "@/components/home/Testimonials";
import NewsLetter from "@/components/NewsLetter";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/services/Card";
import WhatDrives from "@/components/services/WhatDrives";
import WithPetro from "@/components/services/WithPetro";
import SiteHeader from "@/components/SiteHeader";
import { serviceCards } from "@/config/dummy";
import baseApi, { endpoints } from "@/services/api";
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
        description={`Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod error enim amet, dicta et iure similique nesciunt soluta ullam itaqueLorem ipsum dolor, sit amet consectetur adipisicing elit. Quod error enim amet, dicta et iure similique nesciunt soluta ullam itaque?`}
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
