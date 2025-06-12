import Layout from "@/components/dashboard/Layout";
import withAuth from "@/utils/withAuth";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";

const Dashboard = ({user}:any) => {
  console.log(user)
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Layout>

        content

      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return withAuth(context);
};

export default Dashboard;
