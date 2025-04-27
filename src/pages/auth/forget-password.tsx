import AuthLayout from '@/components/auth/AuthLayout'
import Label from '@/config/Label'
import Head from 'next/head'
import React from 'react'

const ForgetPassword = () => {
  return (
   <>
   <Head>
    <title>Forget password</title>
   </Head>
   <AuthLayout title={Label.ForgetPassword}>

   </AuthLayout>
   </>
  )
}

export default ForgetPassword