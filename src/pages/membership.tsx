import Layout from '@/components/dashboard/Layout';
import withAuth from '@/utils/withAuth';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react'

const Membership = () => {
  return (
    <Layout>
        <Head>
            <title>Membership</title>
        </Head>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return withAuth(context);
  };
  

export default Membership