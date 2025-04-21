import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Faqs from "@/components/home/Faqs";
import NewsLetter from "@/components/NewsLetter";
import PageHeader from "@/components/PageHeader";
import SiteHeader from "@/components/SiteHeader";
import { Button, Flex, TextArea, TextField } from "@radix-ui/themes";
import Head from "next/head";
import React from "react";

const Contact = () => {
  return (
    <>
      <Head>
        <title>Services</title>
      </Head>
      <SiteHeader />
      <PageHeader
        title="Contact Us"
        description={`Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod error enim amet, dicta et iure similique nesciunt soluta ullam itaqueLorem ipsum dolor, sit amet consectetur adipisicing elit. Quod error enim amet, dicta et iure similique nesciunt soluta ullam itaque?`}
      />
      <Container>
        <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border mt-16 md:mt-0 md:-translate-y-16 w-full lg:w-8/12 2xl:w-6/12 mx-auto">
          <form className="flex flex-col gap-6">
            <TextField.Root size={"3"} placeholder="Name" className="" />
            <TextField.Root size={"3"} placeholder="Email address" />
            <TextField.Root size={"3"} placeholder="Phone number" />
            <TextArea size={"3"} placeholder="Message" rows={8} />
            <Button size={"4"}>Submit</Button>
          </form>
        </div>
      </Container>
      <Flex direction={"column"} gap={"9"} className="pt-20">
        <NewsLetter />
        <Faqs />
      </Flex>
      <Footer />
    </>
  );
};

export default Contact;
