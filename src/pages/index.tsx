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

const Home = () => {
  return (
    <main>
      <Head>
        <title>Petro411</title>
      </Head>
      <SiteHeader />
      <Hero />
      <MineralOwnerFilter />
      <div className="flex flex-col gap-20">
        <About />
        <OurCompany />
        <MineralOwnersByState />
        <HowItWorks />
        <Testimonials/>
        <Faqs/>
      </div>
      <Footer/>
    </main>
  );
};

export default Home;
