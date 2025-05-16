import SiteHeader from "@/components/SiteHeader";
import Head from "next/head";
import React from "react";
import About from "@/components/home/About";
import OurCompany from "@/components/home/OurCompany";
import MineralOwnersByState from "@/components/home/MineralOwnersByState";
import HowItWorks from "@/components/home/HowItWorks";
import Hero from "@/components/home/Hero";
import Testimonials from "@/components/home/Testimonials";
import Faqs from "@/components/home/Faqs";
import Footer from "@/components/Footer";
import MineralOwnerFilter from "@/components/home/MineralOwnerFilter";
import { Flex } from "@radix-ui/themes";
import NewsLetter from "@/components/NewsLetter";
import Label from "@/config/Label";
import { GetStaticProps } from "next";
import baseApi, { endpoints } from "@/services/api";

type Props = {
  faqs:any[] | []
}

const Home = ({faqs}:Props) => {
  return (
    <main>
      <Head>
        <title>Petro411</title>
      </Head>
      <SiteHeader />
      <Hero />
      <MineralOwnerFilter
        className="py-10 md:-translate-y-24"
        title={Label.SearchMineralOwners}
        paragraph={Label.FindMineralOwners}
        dropDownClasses={"w-full lg:w-[180px]"}
      />
      <Flex direction={"column"} gap={"9"}>
        <About />
        <OurCompany />
        <MineralOwnersByState />
        <HowItWorks />
        <Testimonials />
        <NewsLetter />
        <Faqs faqs={faqs} />
      </Flex>
      <Footer />
    </main>
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

export default Home;
