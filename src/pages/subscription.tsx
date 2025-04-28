import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import siteConfig from "@/config/site-config";
import withAuth from "@/utils/withAuth";
import { Flex, Heading, Separator, Text } from "@radix-ui/themes";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";

const Subscription = () => {
  return (
    <>
      <Head>
        <title>Subscription</title>
      </Head>
      <PageHeader
        title="Subscription"
        description="Choose the plan that fits your needs. Petro411 offers flexible pricing with access to accurate mineral owner data to streamline your land acquisition process."
      />
      <Container>
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
          {siteConfig.subscription.map((item, index) => (
            <Flex
              key={index}
              direction={"column"}
              className={`min-h-[20vh] border rounded-xl p-6 ${
                item?.recommended ? "bg-blue-500/5 border-yellow" : ""
              }`}
            >
              <Heading size={"4"} align={"left"} className="mb-5">
                {item.name}
              </Heading>
              <Heading size={"8"} align={"left"} className="mb-2">
                {item.price}
              </Heading>
              <Heading size={"3"} color="gray" align={"left"}>
                {item.billingCycle}
              </Heading>

              <button
                className={`!mt-5 !border rounded-xl py-3 !border-primary ${
                  item?.recommended
                    ? "!bg-primary !text-white"
                    : "!bg-transparent !text-black hover:!bg-primary hover:!text-white"
                }`}
              >
                Buy
              </button>

              <Heading size={"3"} color="gray" className="mt-5 mb-1">
                Features
              </Heading>
              <Separator className="!w-full mb-2" />

              <Flex direction={"row"} align={"center"} gap={"3"}>
                <Text size={"3"} color="gray">
                  Countr{item.features.noOfCounties > 1 ? "ies" : "y"} (
                  {item.features.noOfCounties})
                </Text>
              </Flex>
              <Flex direction={"row"} align={"center"} gap={"3"}>
                <Text size={"3"} color="gray">
                  User{item.features.noOfUsers > 1 ? "s" : ""} (
                  {item.features.noOfUsers})
                </Text>
              </Flex>
              <Flex direction={"row"} align={"center"} gap={"3"}>
                <Text size={"3"} color="gray">
                  Download{item.features.noOfDownloads > 1 ? "s" : ""} (
                  {item.features.noOfDownloads})
                </Text>
              </Flex>
              <Separator className="!w-full mt-2" />

              <Text size={"3"} color="gray" className="mt-3">
                {item.summary}
              </Text>
            </Flex>
          ))}
        </div>
      </Container>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  return withAuth(context);
};

export default Subscription;
