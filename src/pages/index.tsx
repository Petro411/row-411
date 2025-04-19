import SiteHeader from "@/components/SiteHeader";
import Head from "next/head";
import React from "react";
import Container from "@/components/Container";
import MineralOwnerFilter from "@/components/MineralOwnerFilter";
import About from "@/components/home/About";
import OurCompany from "@/components/home/OurCompany";
import MineralOwnersByState from "@/components/home/MineralOwnersByState";
import HowItWorks from "@/components/home/HowItWorks";

const Home = () => {
  return (
    <main>
      <Head>
        <title>Petro411</title>
      </Head>
      <SiteHeader />
      <div className={`h-[70vh] bg-[#2792A8] HomeBackground text-white`}>
        <Container className="h-full">
          <div className="w-[50%] h-full flex flex-col justify-center gap-5">
            <h1 className="font-bold text-5xl">Lorem ipsum dolor.</h1>
            <p className="!text-[16px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              exercitationem autem voluptate officia eius corrupti perferendis
              totam obcaecati similique dolorum.
            </p>
          </div>
        </Container>
      </div>
      <MineralOwnerFilter />
      <div className="flex flex-col gap-28">
        <About />
        <OurCompany />
        <MineralOwnersByState/>
        <HowItWorks/>
      </div>
    </main>
  );
};

export default Home;
