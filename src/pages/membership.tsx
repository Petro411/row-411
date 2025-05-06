import Layout from "@/components/dashboard/Layout";
import siteConfig from "@/config/site-config";
import { getUser } from "@/context/AuthContext";
import baseApi, { endpoints } from "@/services/api";
import GetApiErrorMessage from "@/utils/GetApiErrorMessage";
import withAuth from "@/utils/withAuth";
import {
  Badge,
  Button,
  Flex,
  Heading,
  Separator,
  Text,
} from "@radix-ui/themes";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useCallback, useMemo, useState } from "react";
import toast from "react-simple-toasts";

// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ?? ""
// );

const Membership = () => {
  const authContext = getUser();
  const user = authContext?.user;
  const userSubscription = authContext?.user?.subscription;
  const [isLoading, setIsLoading] = useState(false);

  const currentPlan = useMemo(() => {
    return siteConfig?.subscription?.find((item) =>
      item.stripePriceId === userSubscription?.priceId ? true : false
    );
  }, [authContext?.user]);

  const isCurrentPlan = useCallback(
    (priceId: string) => {
      return currentPlan?.stripePriceId === priceId;
    },
    [currentPlan]
  );

  const handleSubscription = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await baseApi.get(endpoints.portal);
      window.location.href = res.data?.session;
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast(GetApiErrorMessage(error));
    }
  }, []);

  return (
    <Layout hideTitle={true}>
      <Head>
        <title>Subscription</title>
      </Head>
      <Flex direction={"row"} align={"center"} justify={"between"}>
        <Heading size={"5"} mb={"2"}>
          Subscription
        </Heading>
        <Button
          onClick={handleSubscription}
          loading={isLoading}
          disabled={isLoading}
          size={"3"}
          className="!bg-btnPrimary"
        >
          <Text size={"2"}>Manage Billing</Text>
        </Button>
      </Flex>
      <div className="pt-2 pb-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 w-full gap-5">
        {siteConfig.subscription.map((item, index) => (
          <Flex
            key={index}
            direction={"column"}
            className={`min-h-[20vh] relative border rounded-xl p-6 ${
              isCurrentPlan(item.stripePriceId)
                ? "bg-blue-500/5 border-yellow"
                : ""
            }`}
          >
            {isCurrentPlan(item.stripePriceId) && (
              <Badge
                size={"3"}
                radius="large"
                className="absolute top-0 right-0"
                color="green"
              >
                <Text size={"1"}>Current</Text>
              </Badge>
            )}
            <Heading size={"2"} align={"left"} className="mb-3">
              {item.name}
            </Heading>
            <Heading size={"6"} align={"left"} className="mb-2">
              {item.price}
            </Heading>
            <Heading size={"2"} color="gray" align={"left"}>
              {item.billingCycle}
            </Heading>
            <Heading size={"3"} color="gray" className="mt-5 mb-1">
              Features
            </Heading>
            <Separator className="!w-full mb-2" />

            <Flex direction={"row"} align={"center"} gap={"3"}>
              <Text size={"2"} color="gray">
                Countr{item.features.noOfCounties > 1 ? "ies" : "y"} (
                {item.features.noOfCounties})
              </Text>
            </Flex>
            <Flex direction={"row"} align={"center"} gap={"3"}>
              <Text size={"2"} color="gray">
                User{item.features.noOfUsers > 1 ? "s" : ""} (
                {item.features.noOfUsers})
              </Text>
            </Flex>
            <Flex direction={"row"} align={"center"} gap={"3"}>
              <Text size={"2"} color="gray">
                Download{item.features.noOfDownloads > 1 ? "s" : ""} (
                {item.features.noOfDownloads})
              </Text>
            </Flex>
            <Separator className="!w-full mt-2" />

            <Text size={"2"} color="gray" className="mt-3">
              {item.summary}
            </Text>
          </Flex>
        ))}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return withAuth(context);
};

export default Membership;
