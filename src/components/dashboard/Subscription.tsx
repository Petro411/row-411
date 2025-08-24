"use client"

import { Badge, Button, Flex, Heading, Separator, Text } from "@radix-ui/themes"
import { memo, useCallback, useEffect, useMemo, useState } from "react"
import GetApiErrorMessage from "@/utils/GetApiErrorMessage"
import baseApi, { endpoints } from "@/services/api"
import { getUser } from "@/context/AuthContext"
import { loadStripe } from "@stripe/stripe-js"
import { getItem } from "@/utils/Localstorage"
import toast from "react-simple-toasts"
import moment from "moment"
import PayPalButton from "./PaypalButton"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ?? "")

const Subscription = () => {
  const authContext = getUser()
  const user = authContext?.user
  const userSubscription = authContext?.user?.subscription
  const [isLoading, setIsLoading] = useState(false)
  const [plans, setPlans] = useState<any[]>([])

  const currentPlan = useMemo(() => {
    return plans?.find((item: any) => (item?.priceId === userSubscription?.priceId ? true : false))
  }, [authContext?.user, userSubscription])

  const isCurrentPlan = useCallback(
    (priceId: string) => {
      return currentPlan?.priceId === priceId
    },
    [currentPlan, user],
  )

  const handleSubscription = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await baseApi.get(endpoints.portal)
      window.location.href = res.data?.session
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      toast(GetApiErrorMessage(error))
    }
  }, [])

  useEffect(() => {
    if (!plans?.length) {
      const fetchPlans = async () => {
        try {
          const res = await baseApi.get(endpoints.getPlans)
          setPlans(res?.data?.plans)
        } catch (error) {
          toast(GetApiErrorMessage(error))
        }
      }
      fetchPlans()
    }
  }, [user])

  return (
    <>
      <Flex direction={"row"} align={"center"} justify={"between"} mt={"6"}>
        <Heading size={"5"} mb={"2"}>
          Subscription
        </Heading>
        {user?.subscription && (
          <Button
            onClick={handleSubscription}
            loading={isLoading}
            disabled={isLoading}
            size={"3"}
            className="!bg-btnPrimary"
          >
            <Text size={"2"}>
              {userSubscription?.cancel_at && userSubscription?.canceled_at ? "Renew subscription" : "Manage Billing"}
            </Text>
          </Button>
        )}
      </Flex>
      {plans?.length ? (
        <div className="pt-2 pb-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 w-full gap-5">
          {plans?.map((item, index) => (
            <Flex
              key={index}
              direction={"column"}
              className={`min-h-[20vh] relative border rounded-xl p-6 ${
                isCurrentPlan(item?.priceId) ? "bg-blue-500/5 border-yellow" : ""
              }`}
            >
              {isCurrentPlan(item?.priceId) && (
                <Badge size={"3"} radius="large" className="absolute top-1 right-1" color="red">
                  <Text size={"1"}>Expires at {moment(user?.subscription?.expires_at)?.format("YYYY-MM-DD")}</Text>
                </Badge>
              )}
              <Heading size={"4"} align={"left"} className="mb-5">
                {item?.title}
              </Heading>
              <Heading size={"8"} align={"left"} className="mb-2">
                ${item?.amount}
              </Heading>
              <Heading size={"3"} color="gray" align={"left"}>
                {item?.subtitle}
              </Heading>

              {!user?.subscription && <CheckoutButton item={item} />}

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
      ) : (
        ""
      )}
    </>
  )
}

const CheckoutButton = memo(({ item }: any) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleStripeSubscription = async () => {
    try {
      setIsLoading(true)
      const res = await baseApi.post(endpoints.checkout, {
        priceId: item?.priceId,
        token: getItem("token"),
        returnUrl: getReturnUrl(),
      })
      const stripe = await stripePromise
      await stripe?.redirectToCheckout({ sessionId: res?.data.session })
      setIsLoading(false)
    } catch (error) {
      toast(GetApiErrorMessage(error))
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-5 space-y-3">
      <div className="flex flex-col gap-3">
        {/* Stripe Button */}
        <Button
          onClick={handleStripeSubscription}
          disabled={!item?.priceId || isLoading}
          loading={isLoading && item.priceId}
          variant="outline"
          color="yellow"
          size={"4"}
          className={`!rounded-xl py-3 w-full ${
            item?.recommended
              ? "!bg-primary !text-white"
              : "!bg-transparent !text-black hover:!bg-primary hover:!text-white"
          }`}
        >
          <Text size={"3"}>Buy with Card</Text>
        </Button>

        {/* PayPal Button */}
        <div className="w-full">
          <PayPalButton plan={item} />
        </div>
      </div>
    </div>
  )
})

function getReturnUrl() {
  return typeof window !== "undefined" ? [window.location.origin, window.location.pathname].join("") : undefined
}

export default Subscription
