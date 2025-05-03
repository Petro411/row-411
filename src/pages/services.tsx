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
import { Flex } from "@radix-ui/themes";
import { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";

const Services = () => {
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
        <WithPetro />
        <WhatDrives />
        <Testimonials/>
        <NewsLetter/>
        <Faqs />
      </Flex>
      <Footer/>
    </>
  );
};

export const getStaticProps: GetStaticProps<any> = async () => {
  return {
    props: {
    },
  };
};

export default Services;
