import Layout from "@/components/dashboard/Layout";
import ChangeEmailForm from "@/components/settings/ChangeEmailForm";
import ChangePassworForm from "@/components/settings/ChangePasswordForm";
import withAuth from "@/utils/withAuth";
import { Tabs } from "@radix-ui/themes";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";

const Settings = () => {
  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <Layout>
        <Tabs.Root defaultValue="email">
          <Tabs.List>
            <Tabs.Trigger value="email">Email</Tabs.Trigger>
            <Tabs.Trigger value="password">Change Password</Tabs.Trigger>
          </Tabs.List>

          <div className="pt-8">
            <Tabs.Content value="email">
              <ChangeEmailForm/>
            </Tabs.Content>

            <Tabs.Content value="password">
              <ChangePassworForm/>
            </Tabs.Content>

          </div>
        </Tabs.Root>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return withAuth(context);
};

export default Settings;
