
export const paypalConfig = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
  clientSecret: process.env.PAYPAL_SECRET!,
  baseUrl: process.env.NODE_ENV === "production" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com",
  webhookId: process.env.PAYPAL_WEBHOOK_ID,
}

export interface PayPalOrder {
  id: string
  status: string
  purchase_units: Array<{
    amount: {
      currency_code: string
      value: string
    }
    custom_id?: string
  }>
  payer?: {
    email_address: string
    payer_id: string
  }
}

export interface PayPalSubscription {
  id: string
  status: string
  subscriber: {
    email_address: string
    payer_id: string
  }
  billing_info: {
    next_billing_time: string
    cycle_executions: Array<{
      tenure_type: string
      sequence: number
      cycles_completed: number
      cycles_remaining: number
    }>
  }
  plan_id: string
}