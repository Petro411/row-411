"use client"

import type React from "react"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { getItem } from "@/utils/Localstorage"
import toast from "react-simple-toasts"
import baseApi, { endpoints } from "@/services/api"

// Dynamically import PayPalButtons to avoid hydration issues
const PayPalButtons = dynamic(
    () => import("@paypal/react-paypal-js").then((mod) => mod.PayPalButtons),
    { ssr: false, loading: () => <div>Loading PayPal Buttons...</div> }
)

// Dynamically import PayPalScriptProvider
const PayPalScriptProvider = dynamic(
    () => import("@paypal/react-paypal-js").then((mod) => mod.PayPalScriptProvider),
    { ssr: false }
)

interface PayPalButtonProps {
    plan: {
        _id: string
        priceId: string
        amount: number
        title: string
    }
    onSuccess?: () => void
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ plan, onSuccess }) => {
    const [loading, setLoading] = useState(false)
    const [mounted, setMounted] = useState(false)

    // Prevent hydration error
    useEffect(() => {
        setMounted(true)
    }, [])

    const createOrder = async () => {
        try {
            setLoading(true)
            const { data } = await baseApi.post(endpoints.createPayPalOrder, {
                priceId: plan.priceId,
                token: getItem("token"),
            })

            if (!data.success) {
                throw new Error(data.message)
            }

            return data.orderId
        } catch (error: any) {
            toast(error.message || "Failed to create PayPal order")
            console.error("Create order error:", error)
            throw error
        } finally {
            setLoading(false)
        }
    }


    const onApprove = async (data: any) => {
        try {
            setLoading(true)
            const { data: result } = await baseApi.post(endpoints.capturePayPalOrder, {
                orderId: data.orderID,
                token: getItem("token"),
            })

            if (result.success) {
                toast("Payment successful! Your subscription is now active.")
                onSuccess?.()
                window.location.reload()
            } else {
                throw new Error(result.message)
            }
        } catch (error: any) {
            toast(error.message || "Payment processing failed")
            console.error("Approve order error:", error)
        } finally {
            setLoading(false)
        }
    }

    const onError = (error: any) => {
        console.error("PayPal error:", error)
        toast("PayPal payment failed. Please try again.")
        setLoading(false)
    }

    const onCancel = () => {
        toast("Payment cancelled")
        setLoading(false)
    }

    if (!mounted) return null

    return (
       
            <div className="mt-3">
                <PayPalButtons
                    disabled={loading}
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                    onCancel={onCancel}
                    style={{
                        layout: "horizontal",
                        color: "blue",
                        shape: "rect",
                        label: "pay",
                        height: 40,
                    }}
                />
            </div>
        
    )
}

export default PayPalButton