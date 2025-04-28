import withAuth from '@/utils/withAuth';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react'

const Dashboard = () => {
  return (
    <>
    <Head>
      <title>Dashboard</title>
    </Head>
    <div>Dashboard</div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return withAuth(context);
};

export default Dashboard