import Container from "@/components/Container";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import SiteHeader from "@/components/SiteHeader";
import { dbConnect } from "@/lib/mongodb/dbConnect";
import Page from "@/lib/mongodb/models/Page";
import baseApi, { endpoints } from "@/services/api";
import { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";

type Props = {
  content: any;
};

const Privacy = ({ content }: Props) => {
  return (
    <>
      <Head>
        <title>Privacy Policy</title>
      </Head>
      <SiteHeader />
      <PageHeader
        title="Privacy Policy"
        className="!min-h-[40vh]"
        containerClassname="!min-h-[40vh]"
      />
      <Container className="py-20">
        <div
          className="w-full mx-auto 2xl:w-8/12 editor"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Container>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps<any> = async () => {
  try {
    await dbConnect();
    const page = await Page.findById("6826f8fc085ff4359aea69f5").select([
      "content",
    ]);
    return {
      props: {
        content: page?.content ?? "",
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      props: {
        content: "",
      },
      revalidate: 60,
    };
  }
};

export default Privacy;
