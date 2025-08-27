import { paypalConfig } from "./config"
import axios from "axios"

class PayPalClient {
  private async getAccessToken(): Promise<string> {
    if (!paypalConfig.clientId || !paypalConfig.clientSecret || !paypalConfig.baseUrl) {
      throw new Error("PayPal configuration is incomplete.")
    }

    const auth = Buffer.from(
      `${paypalConfig.clientId}:${paypalConfig.clientSecret}`
    ).toString("base64")

    const response = await axios.post(
      `${paypalConfig.baseUrl}/v1/oauth2/token`,
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )

    if (!response.data?.access_token) {
      throw new Error("PayPal did not return an access_token.")
    }

    return response.data.access_token
  }

  async createOrder(amount: number, currency = "USD", customId?: string) {
    const accessToken = await this.getAccessToken()
    const value = amount.toFixed(2)

    const response = await axios.post(
      `${paypalConfig.baseUrl}/v2/checkout/orders`,
      {
        intent: "CAPTURE",
        payment_source: {
          card: {
            experience_context: {
              payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
              landing_page: "BILLING",
              shipping_preference: "NO_SHIPPING",
              user_action: "PAY_NOW",
              return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/profile?payment=success`,
              cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/profile?payment=cancelled`,
            },
          },
        },
        purchase_units: [
          {
            amount: { currency_code: currency, value },
            custom_id: customId?.slice(0, 127),
          },
        ],
      },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )

    return response.data
  }

  async captureOrder(orderId: string) {
    const accessToken = await this.getAccessToken()

    const response = await axios.post(
      `${paypalConfig.baseUrl}/v2/checkout/orders/${orderId}/capture`,
      {},
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )

    return response.data
  }

  async createSubscription(planId: string, customId?: string) {
    const accessToken = await this.getAccessToken()

    const response = await axios.post(
      `${paypalConfig.baseUrl}/v1/billing/subscriptions`,
      {
        plan_id: planId,
        custom_id: customId,
        application_context: {
          return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/profile?payment=success`,
          cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/profile?payment=cancelled`,
        },
      },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )

    return response.data
  }

  async getSubscription(subscriptionId: string) {
    const accessToken = await this.getAccessToken()

    const response = await axios.get(
      `${paypalConfig.baseUrl}/v1/billing/subscriptions/${subscriptionId}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )

    return response.data
  }

  async cancelSubscription(subscriptionId: string, reason = "User requested cancellation") {
    const accessToken = await this.getAccessToken()

    const response = await axios.post(
      `${paypalConfig.baseUrl}/v1/billing/subscriptions/${subscriptionId}/cancel`,
      { reason },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )

    return response.status === 204
  }
}

export const paypalClient = new PayPalClient()
