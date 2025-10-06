import MineralOwnersByState from "@/components/home/MineralOwnersByState";
import MineralOwnerFilter from "@/components/home/MineralOwnerFilter";
import Testimonials from "@/components/home/Testimonials";
import HowItWorks from "@/components/home/HowItWorks";
import baseApi, { endpoints } from "@/services/api";
import SiteHeader from "@/components/SiteHeader";
import NewsLetter from "@/components/NewsLetter";
import Hero from "@/components/home/Hero";
import Faqs from "@/components/home/Faqs";
import Footer from "@/components/Footer";
import { Flex } from "@radix-ui/themes";
import { GetStaticProps } from "next";
import { label } from "@/branding";
import Head from "next/head";
import React from "react";


type Props = {
  faqs: any[] | [];
  locations: any[] | [];
};

const Home = ({ faqs, locations }: Props) => {
  return (
    <main>
      <Head>
        <title>{label.SiteName}</title>
      </Head>
      <SiteHeader />
      <Hero />
      <MineralOwnerFilter
        className="py-10 md:-translate-y-24"
        title={label.SearchMineralOwners}
        paragraph={label.FindMineralOwners}
        dropDownClasses={"w-full lg:w-[180px]"}
        locations={locations}
      />
      <Flex direction={"column"} gap={"9"}>
        <MineralOwnersByState locations={locations} />
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
    const faqsQuery = await baseApi.get(endpoints.getFaqs);
    const locsQuery = await baseApi.get(endpoints.getLocations);
    return {
      props: {
        faqs: faqsQuery?.data?.faqs ?? [],
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

export default Home;
