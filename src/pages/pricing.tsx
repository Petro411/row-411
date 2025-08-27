"use client"

import Container from "@/components/Container";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import SiteHeader from "@/components/SiteHeader";
import baseApi, { endpoints } from "@/services/api";
import { getItem } from "@/utils/Localstorage";
import { Flex, Heading, Separator, Text } from "@radix-ui/themes";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PayPalButton from "@/components/dashboard/PaypalButton";

const Pricing = ({ plans }: any) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubscribe = () => {
    if (isLoggedIn) {
      router.push("/dashboard");
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <>
      <Head>
        <title>Pricing</title>
      </Head>
      <SiteHeader />
      <PageHeader
        title="Pricing"
        description="Choose the plan that fits your needs. Petro411 offers flexible pricing with access to accurate mineral owner data to streamline your land acquisition process."
      />
      <Container>
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 2xl:w-10/12 mx-auto gap-5">
          {plans?.map((item: any, index: number) => (
            <Flex
              key={index}
              direction={"column"}
              className={`min-h-[20vh] border rounded-xl p-6 ${
                item?.recommended ? "bg-blue-500/5 border-yellow" : ""
              }`}
            >
              <Heading size={"4"} align={"left"} className="mb-5">
                {item?.title}
              </Heading>
              <Heading size={"8"} align={"left"} className="mb-2">
                ${item?.amount}
              </Heading>
              <Heading size={"3"} color="gray" align={"left"}>
                {item?.subtitle}
              </Heading>

              {/* Stripe button (always shown) */}
              <button
                onClick={handleSubscribe}
                className={`!mt-5 !border rounded-xl py-3 !border-primary ${
                  item?.recommended
                    ? "!bg-primary !text-white"
                    : "!bg-transparent !text-black hover:!bg-primary hover:!text-white"
                }`}
              >
                Buy with Stripe
              </button>

              {/* PayPal button only if logged in */}
              {isLoggedIn && (
                <div className="!mt-3">
                  <PayPalButton
                    plan={{
                      _id: item._id,
                      priceId: item.priceId,
                      amount: item.amount,
                      title: item.title,
                    }}
                    onSuccess={() => {
                      router.push("/dashboard");
                    }}
                  />
                </div>
              )}

              <Heading size={"3"} color="gray" className="mt-5 mb-1">
                Features
              </Heading>
              <Separator className="!w-full mb-2" />

              {item?.features?.map((feat: string, id: number) => (
                <Flex key={id} direction={"row"} align={"center"} gap={"3"}>
                  <Text size={"3"} color="gray">
                    {feat}
                  </Text>
                </Flex>
              ))}
              <Separator className="!w-full mt-2" />

              <Text size={"3"} color="gray" className="mt-3">
                {item?.description}
              </Text>
            </Flex>
          ))}
        </div>
      </Container>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps<any> = async () => {
  try {
    const res = await baseApi.get(endpoints.getPlans);
    return {
      props: {
        plans: res?.data?.plans ?? [],
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      props: {
        plans: [],
      },
      revalidate: 60,
    };
  }
};

export default Pricing;
